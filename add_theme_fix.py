from pathlib import Path
p=Path('/mnt/data/theme_work/index.html')
s=p.read_text(encoding='utf-8')
css=r'''
<style id="v15-theme-contrast-definitive">
/* Definitive day/night text contrast: never use dark/navy text on dark night surfaces. */
:root[data-theme="day"]{
  --theme-text:#101828;
  --theme-heading:#061a3a;
  --theme-secondary:#475467;
  --theme-accent-text:#1457a6;
}
:root[data-theme="night"]{
  --theme-text:#e8eef7;
  --theme-heading:#f2f5f9;
  --theme-secondary:#b9c6d8;
  --theme-accent-text:#8fc7ff;
}

/* Global readable text on night-mode cards/pages. */
:root[data-theme="night"] body,
:root[data-theme="night"] .page,
:root[data-theme="night"] .card,
:root[data-theme="night"] .metric,
:root[data-theme="night"] .pax,
:root[data-theme="night"] .stay,
:root[data-theme="night"] .flight,
:root[data-theme="night"] .service,
:root[data-theme="night"] .invoice,
:root[data-theme="night"] .choicecard,
:root[data-theme="night"] .pcresult,
:root[data-theme="night"] .totalbox{color:var(--theme-text)!important}

/* Existing hard-coded navy/blue text from older UI layers. */
:root[data-theme="night"] [style*="color:#061a3a"],
:root[data-theme="night"] [style*="color:#06204a"],
:root[data-theme="night"] [style*="color:#0a2d62"],
:root[data-theme="night"] [style*="color:#0a3268"],
:root[data-theme="night"] [style*="color:#0b3973"],
:root[data-theme="night"] [style*="color:#1457a6"],
:root[data-theme="night"] [style*="color:var(--navy)"],
:root[data-theme="night"] [style*="color: var(--navy)"]{color:var(--theme-heading)!important}

:root[data-theme="night"] .pagehead h1,
:root[data-theme="night"] .section-title,
:root[data-theme="night"] .metric .v,
:root[data-theme="night"] .pax b,
:root[data-theme="night"] .row b,
:root[data-theme="night"] .choicecard h3,
:root[data-theme="night"] .invoice h2,
:root[data-theme="night"] .invoice h3,
:root[data-theme="night"] .table td strong,
:root[data-theme="night"] .pcgrand{color:var(--theme-heading)!important}

:root[data-theme="night"] .pagehead p,
:root[data-theme="night"] .muted,
:root[data-theme="night"] .rate,
:root[data-theme="night"] .choicecard p,
:root[data-theme="night"] .user-role{color:var(--theme-secondary)!important}

/* Badges/blue accents become a light readable accent in Night. */
:root[data-theme="night"] .badge{background:#183553!important;color:#9fd0ff!important}
:root[data-theme="night"] a{color:#9fd0ff!important}

/* Every tab has explicit readable text in both themes. */
.tabs button{color:#061a3a!important}
.tabs button.on{background:#061a3a!important;color:#fff!important}
:root[data-theme="night"] .tabs button{background:#18283d!important;color:#e8eef7!important;border-color:#38506d!important}
:root[data-theme="night"] .tabs button.on{background:linear-gradient(180deg,#0b3265,#06204a)!important;color:#f7d36b!important;border-color:#355d8b!important}

/* Steps, provider filters and other segmented controls. */
:root[data-theme="night"] .step:not(.active){color:#c8d4e3!important;background:#101c2d!important}
:root[data-theme="night"] .step.active{color:#f7d36b!important;background:#06204a!important}

/* Preserve intentional button text contrast. */
:root[data-theme="night"] .primary,
:root[data-theme="night"] .gold,
:root[data-theme="night"] .danger{color:#fff!important}
:root[data-theme="night"] .outline{color:#f1f5f9!important}

/* Table headings/cells: no dark blue text in Night. */
:root[data-theme="night"] .table th{color:#d4deea!important;background:#16263a!important}
:root[data-theme="night"] .table td{color:#dfe7f1!important}

/* Form labels and modal text. */
:root[data-theme="night"] .field label,
:root[data-theme="night"] .modalbox label{color:#c5d1df!important}
:root[data-theme="night"] .modalbox,
:root[data-theme="night"] .modalbox *{--night-inherit-text:initial}

/* Common icon/text spans that inherited the old navy palette. */
:root[data-theme="night"] .navicon,
:root[data-theme="night"] .stepicon{color:currentColor!important}
</style>
'''
# Append after the existing style/script layers so it wins the cascade.
s += '\n' + css + '\n'
p.write_text(s, encoding='utf-8')
