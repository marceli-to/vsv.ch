<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Str;
use Statamic\Facades\Entry;

class ImportEvents extends Command
{
    protected $signature = 'import:events {file=.data/events-2025.json : Path to the JSON file}';
    protected $description = 'Import events from a JSON file into the events collection';

    // Map German language names to blueprint select values
    private array $languageMap = [
        'Deutsch' => 'de',
        'Französisch' => 'fr',
        'Italienisch' => 'it',
        'Englisch' => 'en',
    ];

    public function handle()
    {
        $file = base_path($this->argument('file'));

        if (!file_exists($file)) {
            $this->error("File not found: {$file}");
            return 1;
        }

        $events = json_decode(file_get_contents($file), true);

        if (json_last_error() !== JSON_ERROR_NONE) {
            $this->error('Invalid JSON: ' . json_last_error_msg());
            return 1;
        }

        $this->info("Importing " . count($events) . " events...");

        $created = 0;

        foreach ($events as $event) {
            $this->createEvent($event);
            $created++;
        }

        $this->info("Successfully imported {$created} events (DE + FR entries each).");

        return 0;
    }

    private function createEvent(array $event): void
    {
        $slug = Str::slug($event['title_de']);
        $date = $event['date'];

        // Map language
        $language = [];
        if (!empty($event['language']) && isset($this->languageMap[$event['language']])) {
            $language[] = $this->languageMap[$event['language']];
        }

        // Determine type based on location
        $type = [];
        if (strtolower($event['location']) === 'webinar') {
            $type[] = 'webinar';
        } else {
            $type[] = 'in_person';
        }

        // Build link value (Statamic link field format)
        $link = null;
        if (!empty($event['link'])) {
            $link = $event['link'];
        }

        // Create DE entry
        $deEntry = Entry::make()->collection('events');
        $deEntry->locale('de')
            ->slug($slug)
            ->date($date)
            ->data([
                'title' => $event['title_de'],
                'speakers' => $event['speakers'] ?? null,
                'location' => $event['location'] ?? null,
                'link' => $link,
                'type' => $type,
                'language' => $language,
                'updated_at' => now()->timestamp,
            ]);

        $deEntry->save();

        // Create FR entry (origin = DE entry)
        $frEntry = Entry::make()->collection('events');
        $frEntry->locale('fr')
            ->origin($deEntry)
            ->slug(Str::slug($event['title_fr']))
            ->date($date)
            ->data([
                'title' => $event['title_fr'],
            ]);

        $frEntry->save();

        $this->line("  Created: {$event['title_de']} ({$date})");
    }
}
