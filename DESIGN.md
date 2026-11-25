---
name: TANOL Media
description: Editoriale chiaro, titoli enormi, prodotti veri; l'arancione esiste solo per prenotare una call.
colors:
  paper: "#F8FAFC"
  surface: "#FFFFFF"
  ink: "#1E293B"
  ink-2: "#475569"
  line: "#E2E8F0"
  line-strong: "#CBD5E1"
  guide: "#2563EB"
  action: "#EA580C"
  action-hover: "#F97316"
  band-ink-2: "#CBD5E1"
  band-guide: "#93C5FD"
  placeholder-bg: "#FFFBEB"
  placeholder-tag: "#FDE68A"
  placeholder-tag-ink: "#78350F"
  error: "#B91C1C"
typography:
  display:
    fontFamily: "Plus Jakarta Sans, system-ui, sans-serif"
    fontSize: "clamp(2.125rem, 1.3rem + 3vw, 4rem)"
    fontWeight: 800
    lineHeight: 1.05
    letterSpacing: "-0.035em"
  section:
    fontFamily: "Plus Jakarta Sans, system-ui, sans-serif"
    fontSize: "clamp(1.75rem, 1.2rem + 1.8vw, 2.75rem)"
    fontWeight: 800
    lineHeight: 1.05
    letterSpacing: "-0.03em"
  item:
    fontFamily: "Plus Jakarta Sans, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 800
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  lead:
    fontFamily: "Plus Jakarta Sans, system-ui, sans-serif"
    fontSize: "clamp(1.0625rem, 1rem + 0.25vw, 1.1875rem)"
    fontWeight: 400
    lineHeight: 1.6
  body:
    fontFamily: "Plus Jakarta Sans, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Plus Jakarta Sans, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 600
    lineHeight: 1.4
rounded:
  field: "10px"
  card: "14px"
  photo: "20px"
  frame: "20px"
  pill: "999px"
spacing:
  gutter: "clamp(16px, 4vw, 40px)"
  max: "1240px"
  section: "clamp(88px, 11vw, 152px)"
  header: "72px"
components:
  button-action:
    backgroundColor: "{colors.action}"
    textColor: "#000000"
    rounded: "{rounded.pill}"
    padding: "12px 22px"
    height: "48px"
  button-action-hover:
    backgroundColor: "{colors.action-hover}"
  button-ink:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.pill}"
    padding: "12px 22px"
    height: "48px"
  button-ghost:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "12px 22px"
    height: "48px"
  chip:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink-2}"
    rounded: "{rounded.pill}"
    padding: "8px 16px"
    height: "44px"
  chip-pressed:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.field}"
    padding: "12px 14px"
    height: "48px"
  registry:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.card}"
    padding: "8px 24px"
---

# Design System: TANOL Media

## Overview

**Creative North Star: "Il catalogo è la prova"**

Un sito editoriale chiaro, dove i titoli fanno il lavoro e il prodotto si mostra invece di essere descritto. Fondo carta fredda, inchiostro ardesia, filetti sottili al posto delle scatole, e un solo colore che grida: l'arancione del pulsante «Prenota una call». Chi arriva deve capire in dieci secondi che TANOL ha nove software veri e un'IA che resta in azienda.

La struttura è tipografica: elenchi con filetto spesso in testa e filetti sottili tra le righe, titoli Plus Jakarta Sans 800 molto stretti, testo secondario ardesia. L'unico campo di colore pieno è la fascia IA, dove l'inchiostro diventa fondo e il confine tratteggiato «La tua azienda» mostra i dati che non escono.

**Key Characteristics:**
- Titoli enormi a peso 800, tracking negativo, punto finale riavvicinato alla parola.
- Elenchi a filetti (indice prodotti, catalogo, percorso, servizi) invece di griglie di card.
- Arancione riservato a un'unica azione; blu solo per link, settori e dettagli.
- Una fascia scura per pagina al massimo, sempre per l'IA.
- Segnaposto gialli tratteggiati e ben visibili per tutto ciò che manca.
- Foto vere (stock Unsplash finché non arrivano quelle aziendali) in riquadri da 20px, una per sezione, mai come sfondo sotto il testo.
- Movimento legato allo scroll: avanza scendendo e si riavvolge risalendo.

## Colors

### Primary
- **Azione (#EA580C):** solo il pulsante «Prenota una call», sempre con testo nero (contrasto 5,9:1). Hover #F97316.

### Secondary
- **Guida (#2563EB):** link, nomi di settore, icone, numeri di sequenza, lingua attiva, focus. Su fondo scuro diventa #93C5FD.

### Neutral
- **Carta (#F8FAFC):** fondo di pagina e testo sulla fascia scura.
- **Superficie (#FFFFFF):** riquadri dati, cornici, campi.
- **Inchiostro (#1E293B):** testo, filetti spessi, pulsante scuro, fondo della fascia IA.
- **Inchiostro 2 (#475569):** testo secondario (7,2:1 sulla carta).
- **Filetto (#E2E8F0) / Filetto forte (#CBD5E1):** separatori e bordi dei controlli.

### Named Rules
**The One Orange Rule.** L'arancione compare solo su «Prenota una call» e sue traduzioni. «Richiedi una demo» e «Invia» usano il pulsante inchiostro.

**The Visible Gap Rule.** Il contenuto mancante si mostra con il segnaposto giallo (#FFFBEB, etichetta #FDE68A su #78350F), mai con dati inventati. Il giallo esiste solo per questo e sparisce prima del lancio.

## Typography

**Font:** Plus Jakarta Sans (variabile, subset latin e latin-ext per il ceco), servito in locale da next/font.

### Hierarchy
- **Display** (800, fino a 4rem, interlinea 1,05, -0,035em): un solo h1 per pagina e il titolo di chiusura.
- **Section** (800, fino a 2,75rem, -0,03em): titoli di sezione.
- **Item** (800, 1,25rem, -0,02em): nomi di prodotto, voci di elenco.
- **Lead** (400, fino a 1,19rem, inchiostro 2, max 46-52ch): frase sotto i titoli.
- **Body** (400, 1rem, interlinea 1,6).
- **Label** (600-700, 0,875rem): settori, etichette di campo, didascalie.

### Named Rules
**The Tight Stop Rule.** Nei titoli display e di sezione il punto e la virgola finali sono avvolti in `.punct` (margin-left -0,06em): a peso 800 il punto di Plus Jakarta resta altrimenti staccato.

**The Photo Frame Rule.** Ogni foto sta in un riquadro `.photo` con raggio 20px e alt vuoto (decorativa); l'apertura sovrappone l'indice dei software in una scheda bianca. Fonti in `static/img-sources.txt`.

**The No Kicker Rule.** Niente etichette sopra i titoli. Il settore di un prodotto va sotto il nome, non sopra.

## Layout

Contenitore massimo 1240px con margine laterale fluido (16-40px). Ritmo verticale delle sezioni 88-152px, chiusura 104-184px. Griglie a frazioni: 7/5 nell'apertura della Home, 5/6 per le sezioni divise, catalogo a 1, 2 e 3 colonne (768 e 1024px). Il menu completo appare da 1152px; sotto c'è il pulsante menu. Tutti i controlli sono alti almeno 44px.

## Elevation & Depth

Profondità quasi assente: la struttura la danno i filetti. Un'unica ombra morbida (`0 1px 2px rgba(15,23,42,.04), 0 12px 32px -12px rgba(15,23,42,.14)`) sulle cornici delle schermate; la chat dell'esempio IA ha un'ombra più profonda perché siede sulla fascia scura. Il vetro (sfocatura 14px) esiste solo sulla barra di navigazione.

## Shapes

Pillole per pulsanti, chip e settori; 10px per i campi; 14px per riquadri e cornici; 16px per la scheda indice sopra la foto; 20px per foto e confine tratteggiato IA. Filetto spesso 1,5px in inchiostro in testa agli elenchi, filetti da 1px tra le righe.

## Components

### Buttons
- **Azione:** arancione, testo nero, pillola, freccia che scivola di 3px all'hover. Una o due volte per pagina.
- **Inchiostro:** per demo e invio form.
- **Fantasma:** bianco con bordo #CBD5E1, per l'azione secondaria accanto all'arancione.

### Chips
Filtro per settore: pillola bianca con bordo, stato premuto in inchiostro pieno, `aria-pressed`.

### Cards / Containers
Un solo riquadro bianco ricorrente: i dati societari (`dl`) con righe a filetto. Le cornici delle schermate hanno una barra superiore con tre punti grigi.

### Inputs / Fields
Bordo 1,5px #CBD5E1, focus con bordo blu e alone #BFDBFE, errore in #B91C1C con messaggio sotto il campo collegato via `aria-describedby`.

### Navigation
Barra adesiva in vetro, marchio solo testuale «**TANOL** Media», selettore IT · EN · CS che porta alla stessa pagina nell'altra lingua.

### Perimeter (componente distintivo)
Il confine tratteggiato «La tua azienda · i tuoi server»: fonti a sinistra, freccia, chat bianca con domanda, risposta e citazione del documento in blu. Sempre marcato «Esempio illustrativo».

## Do's and Don'ts

### Do:
- **Do** usare elenchi a filetti per prodotti, passi e servizi.
- **Do** mostrare i dati societari reali dove serve fiducia.
- **Do** marcare con il segnaposto giallo ogni contenuto mancante.
- **Do** legare il movimento allo scroll (`animation-timeline: view()`): blocchi che salgono, foto che si aprono da una maschera, domanda e risposta dell'esempio IA in sequenza; tutto si riavvolge risalendo. Senza supporto, comparsa singola via IntersectionObserver; con movimento ridotto, niente.
- **Do** nascondere la barra di navigazione scendendo e mostrarla risalendo, con il pulsante «torna su» dopo 900px.

### Don't:
- **Don't** usare l'arancione per qualunque cosa che non sia prenotare una call.
- **Don't** costruire sezioni con card uguali con icona, titolo e testo.
- **Don't** mettere etichette o numeri di sezione sopra i titoli; i numeri vanno solo dove c'è una sequenza vera (percorso, fasi).
- **Don't** usare vetro o sfocatura fuori dalla barra di navigazione.
- **Don't** inventare schermate, clienti, numeri o prezzi.
