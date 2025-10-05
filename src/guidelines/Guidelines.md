# Global Design Guidelines for Blockchain Gaming Landing Page

## Theme
- **Dark mode first** with glassmorphism style
- Deep navy and black gradients with violet-blue neon accents
- Frosted glass aesthetic throughout

## Color Palette
- **Primary Colors**: Very dark background (#050510), near-black cards (#0f0f1e), violet-blue neon accents (#6366f1, #8b5cf6)
- **Accent Colors**: Neon pink (#ec4899) for highlights
- **Transparency**: Frosted glass cards using `rgba(255,255,255,0.05–0.15)` with backdrop blur
- **Sidebar**: Dark sidebar (#0a0a18) with subtle borders

## Visual Effects
- **Glassmorphism**: Use `backdrop-blur-md` or `backdrop-blur-lg` for all card components
- **Hover Effects**: 
  - Neon border glow using box-shadow
  - Subtle scaling (1.02-1.05)
  - Shimmer animations
- **Borders**: Subtle neon glow borders (`border-primary/30` or `border-secondary/20`)
- **Shadows**: Soft inner shadows for depth

## Animations & Transitions
- Use **Framer Motion** for all animations
- **Transition Style**: Smooth cubic-bezier or spring animations
- **Scroll Animations**: Fade-in and parallax effects on scroll
- **Hover**: Smooth scale and glow transitions

## Typography
- **Font Family**: Poppins or Inter (system fonts acceptable)
- **Headings**: Semi-bold weight
- **Body Text**: Light to regular weight
- **No manual font sizing**: Rely on default typography from globals.css unless specifically needed

## Layout & Responsiveness
- **Adaptive design**: Desktop, tablet, and mobile responsive
- **Flexbox and Grid**: Use for layouts, avoid absolute positioning unless necessary
- **Container**: Use consistent padding and max-width containers

## Component Standards

### Cards
- Frosted glass background with `bg-card/50` or `bg-white/5`
- `backdrop-blur-md` or `backdrop-blur-lg`
- Border with `border border-primary/30` or `border-border`
- Rounded corners with `rounded-2xl` or `rounded-3xl`

### Buttons
- Gradient backgrounds for primary actions: `bg-gradient-to-r from-primary to-secondary`
- Neon glow on hover
- Rounded full for CTA buttons
- Include hover scale and glow effects

### Forms
- Translucent input fields with `bg-input` or `bg-white/5`
- Neon border highlight on focus
- Backdrop blur for glass effect

### Navigation
- Semi-transparent navbar with blur
- Shrinks and increases blur on scroll
- Smooth transitions between routes using AnimatePresence

## Interactive Features
- **Scroll-triggered animations**: Elements fade in as user scrolls
- **Hover effects**: Cards lift with neon glow
- **Toast notifications**: For mock interactions (using Sonner)
- **Dark/Light mode toggle**: Smooth transition between themes

## Optional Enhancements
- Animated particle or wave backgrounds
- 3D tilt effects on NFT cards
- Cursor glow trail following mouse movement
- Gradient progress bars with animations

## Layout Structure
- **Sidebar Navigation**: Fixed left sidebar (desktop) with logo, navigation items, and logout
- **Top Bar**: Sticky top bar with search, notifications, theme toggle, and wallet connect
- **Main Content**: Content area with sidebar margin on desktop, full width on mobile
- **Responsive**: Mobile menu overlay for sidebar on smaller screens

## Pages Structure

### Home (/)
- Hero with animated background
- Core challenges/highlights section
- Game dashboard preview
- NFT marketplace preview
- About/documentation timeline
- Contact form

### Individual Sections
Each section should have:
- Consistent glassmorphic styling
- Scroll-triggered animations
- Neon accent highlights
- Responsive grid/flex layouts
- Proper spacing with sidebar layout (reduced top padding)

## Code Standards
- Keep components modular and in separate files
- Use Motion (Framer Motion) for animations
- Import from `motion/react` not `framer-motion`
- Use Lucide React for icons
- Use Recharts for data visualizations
- Leverage shadcn/ui components from `/components/ui`
