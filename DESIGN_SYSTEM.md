# CheckFlow AI - Cyberpunk Design System

## Color Palette

### Primary Colors
- **Neon Lime**: `#CCFF00` - Main accent, CTAs, borders, highlights
- **Cyan**: `#00FFFF` - Secondary accent for gradients
- **Black**: `#000000` - Primary background

### Text Colors
- **White**: `#FFFFFF` - Primary text (headings, important content)
- **White 70%**: `rgba(255, 255, 255, 0.7)` - Secondary text
- **White 60%**: `rgba(255, 255, 255, 0.6)` - Tertiary text
- **Lime 400**: `#7ee8fa` gradient with lime - Accent text

### Borders & Glows
- **Lime 400/50**: `rgba(204, 255, 0, 0.5)` - Subtle borders
- **Lime 400/30**: `rgba(204, 255, 0, 0.3)` - Card borders
- **Lime Glow**: `0 0 20px rgba(204, 255, 0, 0.5)` - Neon effect

## Typography

### Font Stack
- **Headings**: Space Mono (monospace) - Bold, uppercase
- **Body**: Inter (sans-serif) - Regular weight
- **Code/Terminal**: Space Mono - For code snippets and technical text

### Text Styles
- **H1**: Space Mono, Bold, All Caps
- **H2**: Space Mono, Bold, All Caps
- **Buttons**: Space Mono, Bold, All Caps, Tracking Wide
- **Labels**: Space Mono, Bold, Uppercase, Tracking Wide

## Components

### Buttons
- **Primary CTA**: Lime green background (#CCFF00), black text, bold
- **Hover**: Slightly brighter lime (#DDFF33)
- **Glow Effect**: `box-shadow: 0 0 30px rgba(204, 255, 0, 0.8)`

### Cards/Containers
- **Background**: Pure black or slightly lighter (#0A0A0A)
- **Border**: Lime with 30-50% opacity
- **Hover**: Increased border opacity to 50%

### Input Fields
- **Background**: Black
- **Border**: Lime 400/50
- **Focus**: Lime 400 with glow effect
- **Text**: White

### Navigation
- **Background**: Black with transparency
- **Logo**: Lime green text with terminal-style box border
- **Links**: White/70%, hover to lime green

### Forms & Alerts
- **Error**: Red-900/30 background with red border
- **Success**: Lime border with lime text
- **Terminal Style**: Monospace font, bordered containers

## Decorative Elements

### Gradients
- **Hero Gradient**: `linear-gradient(135deg, #CCFF00 0%, #00FF88 100%)`
- **Neon Gradient**: `linear-gradient(90deg, #CCFF00 0%, #00FFFF 100%)`

### Blur/Glow Background
- **Large Blur Circles**: Lime & Cyan, 10% opacity, 128px blur
- **Layering**: Creates depth without overwhelming

### Borders & Dividers
- **Subtle**: Lime 500/20 opacity
- **Medium**: Lime 500/30 opacity
- **Strong**: 2px lime borders on important elements

## Responsive Design

### Mobile-First
- Full width inputs and buttons on mobile
- Stacked layout for cards
- Adjusted font sizes for readability

### Desktop Enhancements
- Multi-column grids for features
- Side-by-side forms
- Enhanced spacing and padding

## Accessibility

- High contrast between lime (#CCFF00) and black (#000000)
- Text shadows on neon text for readability
- Focus states clearly visible with glow effects
- Monospace fonts for technical content

## Files Modified

1. **app/globals.css** - Color tokens, component styles, scrollbar
2. **tailwind.config.ts** - New color palette, space-mono font
3. **app/layout.tsx** - Added Space_Mono font import
4. **app/components/landing/Navigation.tsx** - Cyberpunk styling
5. **app/components/landing/Hero.tsx** - Black background, neon accents
6. **app/components/landing/CTASection.tsx** - Lime buttons, form styling
7. **app/components/landing/Features.tsx** - Terminal-style cards
8. **app/components/landing/Footer.tsx** - Cyberpunk footer

## Design Principles

1. **High Contrast**: Neon lime on pure black for maximum visibility
2. **Minimalist**: Clean lines, no gradients, bold typography
3. **Technical Aesthetic**: Monospace fonts, terminal-style borders
4. **Glow Effects**: Subtle neon glow on interactive elements
5. **Uppercase & Bold**: Strong, commanding typography
6. **Cyberpunk Theme**: Tech-forward, futuristic feel

## Live Preview

To see the design changes:
1. Open the application in development
2. Navigate through all pages
3. Test hover states and interactions
4. Verify responsive behavior on mobile

---

**Design Transformation Complete** ✓
Transformed from modern Stripe-style purple (#635BFF) design to cyberpunk neon lime (#CCFF00) aesthetic
with pure black backgrounds, terminal typography, and glowing borders.
