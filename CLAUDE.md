# CLAUDE.md — Automatische Frontend Workflow

## Always Do First
1. **Check Environment:** Controleer of de map `node_modules` bestaat. Zo niet, voer direct `npm install` uit in de terminal.
2. **Invoke Design Skill:** Roep de `frontend-design` skill aan voor elke visuele taak.

## Local Server & Automatisering
- **Auto-Start:** Voordat je een screenshot maakt, controleer of er een server draait op `http://localhost:3000`. Zo niet, start `node serve.mjs` op de achtergrond.
- **Port:** Gebruik altijd poort 3000.

## Screenshot Workflow (Windows 11)
- **Paths:** - Project Root: `C:/Users/Gebruiker/Documents/SIR CHILL/MISS CHILL WEBSITE/`
  - Chrome Cache: `C:/Users/Gebruiker/.cache/puppeteer/`
- **Action:** Voer `node screenshot.mjs http://localhost:3000` uit.
- **Iteratie:** Maak minimaal 2 screenshots. Vergelijk de eerste met de opdracht, pas de code aan bij fouten, en maak een tweede screenshot ter controle.

## Sectie-gebaseerde Controle
- Gebruik voor elke grote sectie (Hero, Product, Story, etc.) een uniek ID in de HTML (bijv. `<section id="hero">`).
- **Verplichte Workflow:**
  1. Maak een screenshot van de volledige pagina (`node screenshot.mjs`).
  2. Maak screenshots van individuele secties voor detail-controle:
     - `node screenshot.mjs http://localhost:3000 #hero`
     - `node screenshot.mjs http://localhost:3000 #product`
  3. Analyseer de details (fonts, spacing, uitlijning) per sectie-screenshot voordat je de code definitief goedkeurt.
  
## Ontwerp Richtlijnen (Universeel & Hoogwaardig)
- **Geen Standaard:** Gebruik nooit standaard Tailwind kleuren (zoals blue-500).
- **Typografie:** Combineer altijd een Serif font (bijv. Cormorant Garamond) voor koppen met een Sans-Serif (bijv. Jost) voor tekst.
- **Contrast:** Gebruik gelaagde schaduwen met lage opacity en subtiele SVG-noise filters voor textuur.
- **Interactie:** Elke knop MOET een hover- en active-state hebben.

## Harde Regels
- Overschrijf nooit screenshots; gebruik de auto-increment (screenshot-1, screenshot-2, etc.).
- Stop pas als het ontwerp pixel-perfect is of de gebruiker zegt dat het klaar is.
- Gebruik alleen `transform` en `opacity` voor animaties (geen `transition-all`).