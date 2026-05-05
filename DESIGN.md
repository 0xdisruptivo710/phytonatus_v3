# DESIGN.md — Phytonatus

> Sistema vivo. Ao mudar tokens, atualizar este arquivo + `assets/css/style.css` em conjunto.

## 1. Tipografia

**Família única:** [Montserrat](https://fonts.google.com/specimen/Montserrat) (DNA Melbras) — pesos 300/400/500/600/700/800.

### Escala modular 1.3×
Espinha tipográfica do site. Definida em `:root` como CSS variables. Use os tokens, não valores literais.

| Token    | Valor        | Uso                                  |
|----------|--------------|--------------------------------------|
| `--t-xs`  | ~13–14px    | Labels, eyebrows, chips             |
| `--t-sm`  | ~14–15px    | Body padrão                         |
| `--t-md`  | ~16–19px    | Lead, destaque pequeno              |
| `--t-lg`  | ~24–29px    | h4, subtítulos                      |
| `--t-xl`  | ~31–39px    | h3                                   |
| `--t-2xl` | ~38–50px    | h2, títulos de seção                |
| `--t-3xl` | ~47–59px    | h1 padrão                           |
| `--t-4xl` | ~56–78px    | h1 hero subpáginas                  |
| `--t-hero`| ~64–136px   | h1 hero homepage (gigante)          |

### Pesos em uso
- `400` — body
- `500` — captions / labels secundárias
- `600` — eyebrow / dest tabs / .brand-block-name
- `700` — botões / nav-links / títulos
- `800` — hero homepage XL

## 2. Cores

Paleta **OKLCH-ready** (atualmente em HEX para compat — migrar quando refatorar). Tints e tons baseados em Pantones do briefing oficial.

### Núcleo
| Token             | HEX       | Uso                            |
|-------------------|-----------|--------------------------------|
| `--c-cream`       | `#DDD7C7` | Bege principal (Pantone 7527 C) — fundo padrão |
| `--c-cream-2`     | `#DCC9A0` | Bege contraste (Pantone 468 C) — seções alternadas |
| `--c-bg-escuro`   | `#264E36` | Verde escuro (Pantone 350 C) — header/footer/CTA |
| `--c-bg-escuro-2` | `#1F4030` | Verde mais escuro — pl-teaser, contato |
| `--c-bg-escuro-3` | `#173025` | Verde quase preto — privacidade |
| `--c-dark`        | `#2C1B0A` | Marrom chocolate (Pantone 4625 C) — texto principal |
| `--c-accent`      | `#264E36` | Verde Pantone 350 C — CTA primário |
| `--c-accent-light`| `#D2E3B4` | Verde claro Pantone 7485 C — eyebrow em fundos escuros |

### Cores por marca (multicolor categórico — DNA Melbras)
Cada submarca tem paleta dedicada, com fundo aplicado em gradient 3-stop (`accent → soft → cream`) na página de marcas.

**Phytonatus apicultor**
- `--c-phyto-apicultor` `#2C1B0A` (texto)
- `--c-phyto-apicultor-amarelo` `#F1B500` (gradient stop 1)

**Empório do Mel**
- `--c-mel-marrom` `#2C1B0A`
- `--c-mel-amarelo-1` `#F4ED7C`
- `--c-mel-amarelo-2` `#F8DD7B`

**Empório Nuts**
- `--c-nuts-vermelho` `#DC241F` (Pantone 485 C — texto e chips)
- `--c-nuts-bege-1` `#DDD7C7`
- `--c-nuts-bege-2` `#D9CDA5`

**Vida Gourmet**
- `--c-gourmet-vermelho` `#C8102E` (Pantone 186 C — texto e chips)
- `--c-gourmet-bege-1` `#F0E6C5`
- `--c-gourmet-bege-2` `#DCC9A0`

> Empório Nuts e Vida Gourmet têm **cores de acento diferentes** (485 C vs 186 C — vermelho fechado vs vermelho frio). Os fundos em gradient diferenciam mais ainda na percepção.

## 3. Layout

- **Largura máx:** `min(1280px, 94%)` (`.container`)
- **Header:** sticky, fixed top — 2 camadas (top bar institucional fina + main bar com nav e botão Loja)
- **Top bar:** 36px, fundo verde escuro, info SAC + e-mail + redes sociais (some em mobile <760px)
- **Main bar:** 76px, transparente sobre hero / branca após scroll
- **Padding seção:** `clamp(80px, 10vw, 140px)` (`.s-pad`) ou versão sm `48–80px` (`.s-pad-sm`)

## 4. Motion

- **Easing padrão:** `cubic-bezier(0.16, 1, 0.3, 1)` (var: `--ease-out` — quart-like, sem bounce)
- **Duração padrão:** 250–400ms para hovers, 700–900ms para reveal/parallax
- **Reveal por scroll:** translateY(110%) + scale com `.reveal-inner`
- **Parallax:** `data-parallax="0.1"` em imagens de marca
- **Lenis** smooth scroll global
- `prefers-reduced-motion`: cursor abelha some, animações ficam estáticas

## 5. Componentes-chave

### `.btn` (família)
Pílula 100px radius, padding 13×30, peso 700, letter-spacing 0.15em, uppercase. Variantes: `.btn-light`, `.btn-dark`, `.btn-accent`, `.btn-solid-accent`.

### `.nav-shop-cta` (Loja Online — header)
Botão **permanente** no header. Verde sólido em pill. Aparece à direita do nav-links, antes do hamburger mobile.

### `.heritage-stripe` (faixa "Phytonatus / Desde 1999")
Faixa fina (clamp 0.85–1.25rem padding) abaixo do hero da home — afirmação de tradição em texto sucinto.

### `.brand-block-full` (página Marcas)
Layout 50/50 imagem/info, hover-expandable (1.6fr/1fr quando hover na imagem ou info). Cada bloco tem `brand-tone-{marca}` para o gradient + cores de texto.

### `.cert-grid-3` (Certificações)
Grid 3-col responsivo. Cards quadrados 1:1 com selo + label uppercase. Hover: border accent + lift 3px + filter remove grayscale.

### `.lojas-grid` (Lojas Online — Amazon, Mercado Livre, Loja Phytonatus)
Grid 3-col (1-col em mobile). Cards limpos com nome em peso 700 + CTA "Comprar ↗".

## 6. Wave divider (transição entre seções)
SVG inline path: `M0,40 C240,0 480,80 720,40 C960,0 1200,80 1440,40 ...` — onda dupla suave. `wave-divider.wave-up` se sobrepõe à seção anterior. Substitui o "mountains shape divider" do Melbras com uma linguagem orgânica mais leve (água/onda em vez de montanha).

## 7. Cursor abelha
SVG inline animado por JS (`assets/js/main.js`). Trail de pontinhos amarelos com fade-out 1.2s. Hide automático em `(hover:none)` ou `max-width:760px`. Cursor nativo restaurado em mobile.

## 8. Anti-padrões (NÃO fazer)
- Side-stripe borders coloridos em cards
- Gradient text com `background-clip: text`
- Glassmorphism em produção (só preloader)
- Modais antes de exaurir progressive disclosure
- Em-dashes na copy de UI — usar vírgula, ponto, ou parêntese
- Cards idênticos em grid repetidos sem variação
- Container wrapping em coisas que não precisam

## 9. Status
**v1 (DNA Melbras)** — sistema base aplicado. Próximas iterações:
- Substituir placeholders de imagem pelo material oficial da Ana
- Vídeo institucional no hero (atualmente background image)
- Selos de certificação finais (substituir SVG placeholders por logos reais)
- Tabelas nutricionais e catálogo PDFs reais
