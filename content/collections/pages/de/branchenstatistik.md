---
id: cf88daca-23f7-458b-953f-f9cad2f54cf3
blueprint: page
title: Branchenstatistik
show_job_teaser: false
open_graph_type: website
robots: index_follow
updated_by: ad7fe3d0-f296-4490-a384-26cbf688e223
updated_at: 1776164606
container_padding_top: true
container_padding_bottom: true
elements:
  -
    id: sr001
    type: statistics_report
    enabled: true
    title: 'Statistiques de la branche : un aperçu actualisé du secteur'
    lead: "Les dernières statistiques que nous avions publiées sur le marché de la gestion de fortune remontaient à notre Yearbook 2022, et à 2021 pour les données complètes. Elles reposaient sur des chiffres audités provenant des affiliés à notre OAR en 2020. Conformément à notre approche, nous avons toujours privilégié la publication de données vérifiées, représentatives et fondées sur des sources fiables. Il était donc nécessaire d'attendre que le nombre de gestionnaires autorisés et audités sous le nouveau régime soit suffisamment significatif pour garantir une nouvelle analyse robuste du marché. Cette édition marque ainsi le retour de statistiques consolidées et fiables."
    text_content:
      -
        type: heading
        attrs:
          level: 2
        content:
          -
            type: text
            text: 'Une structure de marché stable'
      -
        type: paragraph
        content:
          -
            type: text
            text: "Les résultats obtenus confirment les tendances observées ces dernières années. La FINMA avait communiqué de manière transparente, tout au long du processus d'autorisation, sur la taille et la typologie des sociétés. Les données actuelles montrent que la structure du secteur n'a pas connu de transformation notable depuis l'entrée en vigueur du nouveau dispositif de surveillance."
      -
        type: heading
        attrs:
          level: 2
        content:
          -
            type: text
            text: 'Évolution du nombre de gestionnaires'
      -
        type: paragraph
        content:
          -
            type: text
            text: "À ce jour, 1 427 gestionnaires sont autorisés, dont 1 340 supervisés par l'un des quatre organismes de surveillance (OS) et 87 directement par la FINMA en tant que sociétés de groupe. Le nombre total de sociétés de gestion a suscité de nombreux débats. Nous avons toujours considéré que la diminution observée au cours des cinq dernières années résultait principalement de départs naturels, non compensés durant la période de transition par l'arrivée de nouveaux acteurs. Depuis deux ans, la tendance s'est inversée : les créations de sociétés représentent la hausse et compensent largement les départs à la retraite, avec 230 nouveaux gestionnaires enregistrés. Cette dynamique témoigne d'un regain d'attractivité du secteur."
      -
        type: paragraph
        content:
          -
            type: text
            text: "La consolidation du marché a également été un thème récurrent dans plusieurs études, souvent présentée comme imminente mais encore peu tangible. Les chiffres confirment que seules une vingtaine d'opérations de consolidation ont effectivement eu lieu."
      -
        type: heading
        attrs:
          level: 2
        content:
          -
            type: text
            text: 'Effectifs, clientèle et AUM : des indicateurs stables'
      -
        type: paragraph
        content:
          -
            type: text
            text: "Les effectifs demeurent stables, avec une médiane de 3,3 collaborateurs et une moyenne de 5 ETP. Le nombre de clients, dont la médiane s'établit à 68, reste comparable aux données d'il y a cinq ans, confirmant la grande stabilité opérationnelle du secteur."
      -
        type: paragraph
        content:
          -
            type: text
            text: "Les avoirs sous gestion (AUM) affichent en revanche une progression notable, passant d'une médiane de 103 millions à 140 millions. Cette évolution s'explique principalement par la performance des portefeuilles sur la période."
      -
        type: heading
        attrs:
          level: 2
        content:
          -
            type: text
            text: 'Gestion et conseil : une distinction désormais mesurée'
      -
        type: paragraph
        content:
          -
            type: text
            text: "Les nouvelles données permettent pour la première fois de distinguer les avoirs sous gestion faisant l'objet d'une procuration et ceux relevant du conseil sans procuration. La médiane des avoirs conseillés s'élève à 42 millions, apportant un éclairage supplémentaire sur la diversité des modèles d'affaires."
      -
        type: heading
        attrs:
          level: 2
        content:
          -
            type: text
            text: 'Une estimation consolidée du marché'
      -
        type: paragraph
        content:
          -
            type: text
            text: "Sur la base de l'ensemble des données disponibles, on peut estimer que la branche gère aujourd'hui environ 440 milliards d'avoirs sous gestion, auxquels s'ajoutent quelque 80 milliards en conseil. Ces chiffres s'inscrivent dans la continuité des estimations publiées ces dernières années, qui situent la taille du marché autour de 500 milliards."
    stat_cards:
      -
        id: sc001
        type: stat_card
        enabled: true
        number: '1427'
        label: 'gestionnaires autorisés'
      -
        id: sc002
        type: stat_card
        enabled: true
        number: '3.3'
        label: collaborateurs
      -
        id: sc003
        type: stat_card
        enabled: true
        number: '68'
        label: 'clients (médiane)'
      -
        id: sc004
        type: stat_card
        enabled: true
        number: '42'
        label: 'avoirs conseillés (médiane)'
        suffix: Mio.
      -
        id: sc005
        type: stat_card
        enabled: true
        number: '500'
        label: 'marché total'
        suffix: Mrd.
        prefix: '~'
    tables:
      -
        id: tb001
        type: table_block
        enabled: true
        table_title: 'Tableau de comparaison'
        year_1: '2025'
        year_2: '2020'
        table_rows:
          -
            id: aDj3TkvN
            label: 'AUM Médiane'
            entry_1: '140 mio'
            entry_2: '103 mio'
          -
            id: gtnH1G3y
            label: 'AUA Médiane'
            entry_1: '42 mio'
          -
            id: 1HxFsIT1
            label: 'Collaborateurs Médiane'
            entry_1: '3.3'
            entry_2: '3.2'
    charts:
      -
        id: ch001
        type: chart_block
        enabled: true
        chart_title: 'Répartition des sociétés de gestion de fortune autorisées par organisme de surveillance (OS)'
        chart_entries:
          -
            id: ce001
            type: chart_entry
            enabled: true
            color: sky
            percentage: '47'
            label: 'AOOS – Schweizerische Aktiengesellschaft für Aufsicht'
          -
            id: ce002
            type: chart_entry
            enabled: true
            color: mist
            percentage: '33'
            label: 'OSFINcontrol AG'
          -
            id: ce003
            type: chart_entry
            enabled: true
            color: blush
            percentage: '13'
            label: 'SO-FIT Organisme de Surveillance pour Intermédiaires Financiers & Trustees'
          -
            id: ce004
            type: chart_entry
            enabled: true
            color: sand
            percentage: '7'
            label: 'ORGANISME DE SURVEILLANCE DES INSTITUTS FINANCIERS OSIF'
---
