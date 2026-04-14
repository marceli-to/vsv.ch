# Scroll-Driven Timeline — Implementation Spec

## Layout

- Full-width section with a **vertical line centered horizontally**
- Timeline items alternate **left/right**: odd items have the content card on the right and the date/label on the left; even items flip this
- Each item has a **dot/circle** on the center line at its entry point
- The dot appears filled/dark when "active"

---

## The Center Line

A single vertical element (e.g. `::before` pseudo or a `<div>`) runs the full height of the timeline section. It is rendered as **two layers**:

- **Background track:** light grey, full height
- **Progress fill:** dark/black, height driven by scroll position

The fill grows from top to bottom as the user scrolls through the section.

---

## Scroll-Driven Progress

### Pure CSS (modern browsers)

```css
@keyframes grow {
  from { height: 0%; }
  to   { height: 100%; }
}

.timeline-line-fill {
  animation: grow linear both;
  animation-timeline: scroll(root);
  animation-range: entry 0% exit 100%;
}
```

Alternatively, scope it to the section using `view-timeline` on the container.

### JavaScript fallback

```js
window.addEventListener('scroll', () => {
  const section = document.querySelector('.timeline');
  const rect = section.getBoundingClientRect();
  const progress = Math.min(1, Math.max(0,
    (window.innerHeight - rect.top) / (rect.height + window.innerHeight)
  ));
  document.querySelector('.timeline-line-fill').style.height = (progress * 100) + '%';
});
```

---

## Card Design

- Cards are **solid color blocks** (Phase 1 = red/crimson, Phase 2 = magenta/pink)
- Cards have a **small triangular notch/arrow** pointing toward the center line (CSS `clip-path` or border-triangle trick)
- Card sits slightly offset from the center line, not touching it
- The **date range + phase label** appears on the opposite side of the center line from the card
- Phase label ("Phase 1", "Phase 2") is bold, colored to match the card

---

## Dot Markers

- Small circle: `width: 16px; height: 16px; border-radius: 50%`
- Positioned **absolutely on the center line**, vertically aligned with the top of each card
- Grey by default, transitions to black/filled as scroll progress passes that item's position

---

## Spacing & Typography

- Large generous vertical padding between items
- Date range in bold black, approximately `1.2–1.4rem`
- Phase label in matching card color, bold, slightly larger or equal size
- Card body text is white, regular weight, with a bulleted list

---

## Key CSS Structure

```css
.timeline {
  position: relative;
}

/* Grey track */
.timeline::before {
  content: '';
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 2px;
  background: #ccc;
  transform: translateX(-50%);
}

/* Black fill — scroll-driven */
.timeline-fill {
  position: absolute;
  left: 50%;
  top: 0;
  width: 2px;
  height: 0%; /* animated */
  background: #111;
  transform: translateX(-50%);
}

.timeline-item {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: start;
  position: relative;
}

.timeline-dot {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #ccc;
  position: relative;
  z-index: 1;
  transition: background 0.3s;
}

.timeline-dot.active {
  background: #111;
}
```

---

## Mobile / Responsive

On small screens, collapse to a **single-column layout**:

- Move the vertical line to the **left edge** instead of center
- All cards stack on the right of the line
- Date/label moves above the card
- Dot remains on the line, vertically aligned with the card top
