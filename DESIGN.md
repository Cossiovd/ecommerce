---
name: Clinical Care & Compassion
colors:
  surface: '#f7f9fb'
  surface-dim: '#d8dadc'
  surface-bright: '#f7f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#43474d'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#74777e'
  outline-variant: '#c4c6ce'
  surface-tint: '#49607e'
  primary: '#000f22'
  on-primary: '#ffffff'
  primary-container: '#0a2540'
  on-primary-container: '#768dad'
  inverse-primary: '#b0c8eb'
  secondary: '#00629d'
  on-secondary: '#ffffff'
  secondary-container: '#00a2fd'
  on-secondary-container: '#003558'
  tertiary: '#00111a'
  on-tertiary: '#ffffff'
  tertiary-container: '#002837'
  on-tertiary-container: '#3895bb'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d2e4ff'
  primary-fixed-dim: '#b0c8eb'
  on-primary-fixed: '#001c37'
  on-primary-fixed-variant: '#314865'
  secondary-fixed: '#cfe5ff'
  secondary-fixed-dim: '#98cbff'
  on-secondary-fixed: '#001d33'
  on-secondary-fixed-variant: '#004a77'
  tertiary-fixed: '#c0e8ff'
  tertiary-fixed-dim: '#7bd1fa'
  on-tertiary-fixed: '#001e2b'
  on-tertiary-fixed-variant: '#004d66'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
typography:
  display:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  h1:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.3'
  h2:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.4'
  h3:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: 0.01em
  caption:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.2'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 48px
  xl: 80px
  gutter: 24px
  margin: 32px
---

## Brand & Style

This design system establishes a visual language that balances clinical expertise with the warmth of pet ownership. The brand personality is empathetic, reliable, and approachable. It aims to evoke a sense of "trusted care" through a clean, airy aesthetic that reduces the cognitive load often associated with medical or pharmaceutical shopping.

The design style follows a **Modern / Minimalist** approach with subtle **Tactile** influences. By utilizing generous white space and a restricted color palette, the system allows high-quality photography of animals to provide the emotional core of the experience. The interface stays out of the way, serving as a sophisticated framework for products and health information.

## Colors

The palette is anchored by a deep navy to signal professional authority and medical trust. This is contrasted with a vibrant sky blue used for primary actions and highlights, creating a sense of optimism and health. 

- **Primary (Deep Navy):** Reserved for headers, primary buttons, and critical information.
- **Secondary (Sky Blue):** Used for interactive elements, progress indicators, and links.
- **Tertiary (Powder Blue):** Used for light backgrounds, subtle borders, and secondary badges.
- **Neutrals:** A range of cool grays and soft whites ensure the UI feels clean and surgical without being cold.

Backgrounds should primarily use soft whites (#FFFFFF or #F8FAFC) to maintain a high-contrast environment for readability.

## Typography

The design system utilizes **Plus Jakarta Sans** across all levels. This typeface was chosen for its modern, geometric construction and its naturally rounded terminals, which provide a friendly and welcoming tone without sacrificing legibility.

- **Headlines:** Use tighter letter-spacing for large displays to create a more "editorial" feel.
- **Body Text:** Maintain generous line heights to ensure that medical product descriptions and dosages are easy to read.
- **Labels:** Use the semi-bold weight for price tags, category labels, and navigation items to provide clear information architecture.

## Layout & Spacing

The layout follows a **Fixed Grid** model for desktop (centered at 1280px) to maintain a curated, premium feel. On tablet and mobile, the grid becomes fluid.

A strict 8px spacing rhythm ensures consistency across all components. Use larger padding (48px+) between major content sections to allow the design to "breathe" and to highlight high-quality pet photography. Navigation menus should utilize generous horizontal padding to feel accessible and intuitive.

## Elevation & Depth

This design system employs **Ambient Shadows** to create a sense of organized layering. Shadows should be highly diffused and low-opacity, utilizing a subtle blue tint (`hsla(210, 20%, 10%, 0.08)`) rather than pure black to keep the interface feeling "clean."

- **Level 1 (Product Cards):** Low-profile shadow that appears as a soft glow, making the card feel slightly lifted from the background.
- **Level 2 (Dropdowns/Modals):** More pronounced depth to separate interactive overlays from the content below.
- **Tonal Depth:** Use very light blue backgrounds (#F0F9FF) to define different content zones (e.g., the shopping cart sidebar) without needing heavy borders.

## Shapes

The shape language is defined by **Rounded** corners. This softens the "clinical" aspect of the veterinary field, making the website feel more like a lifestyle brand for pet lovers. 

- **Containers & Cards:** Use a 16px (1rem) radius to frame products softly.
- **Buttons:** Use fully rounded (pill-shaped) ends for primary calls to action to make them feel inviting and clickable.
- **Imagery:** Photos should also feature soft rounded corners to match the UI, avoiding sharp, aggressive angles.

## Components

### Buttons
Buttons are the primary creative element. **Primary Buttons** should be pill-shaped, using the Sky Blue background with white text and a subtle hover lift. **Secondary Buttons** use a Deep Navy outline with a transparent background.

### Product Cards
Cards are minimalist with no outer border, relying on Level 1 shadows. Product images should be on a very light gray or white background within the card. Include a "Quick Add" button that appears on hover for a seamless shopping experience.

### Input Fields
Forms should feel modern and spacious. Use a 12px corner radius and a subtle 1px border in a light gray. Focus states should transition the border to Sky Blue with a soft outer glow.

### Navigation
The navigation should be intuitive, featuring a mega-menu that uses icons for different animal types (Dogs, Cats, Birds, etc.). Use a "Sticky" header that reduces in height on scroll to keep the focus on product discovery.

### Specialty Components
- **Health Badges:** Small, rounded chips used on product images to denote "Vet Recommended" or "Prescription Required."
- **Pet Profile Toggle:** A creative UI element in the header that allows users to switch views based on their saved pets, filtering products automatically.
