# Services Page Documentation

## Overview

The Services page is a stunning, interactive portfolio section featuring rich 3D animations and modern materials. It showcases your professional services (Web Development, Android Development, and AI/ML) with an immersive, user-friendly experience.

## Design Principles

### Vision
- **Professional yet approachable**: Technical expertise presented in an understandable, tactile format
- **3D as a tool**: 3D elements enhance information delivery without overwhelming the content
- **Performance-first**: Lazy loading, mobile optimization, and accessibility considerations

### Color Palette
- **Primary**: `#0B76FF` (Blue) - Trust and technology
- **Accent**: `#FF7B6B` (Coral) - Warmth and action
- **Success**: `#9AE66E` (Lime) - Achievement and growth
- **Background Light**: `#F6F8FA`
- **Background Dark**: `#0B1020`

### UI Tokens
- **Spacing**: xs(6px), s(12px), m(24px), l(40px), xl(64px)
- **Border Radius**: sm(8px), md(16px), lg(24px)
- **Shadows**: 
  - soft: `0 8px 24px rgba(2,6,23,0.08)`
  - deep: `0 20px 60px rgba(2,6,23,0.18)`

## Page Structure

### 1. Hero Section
**Features:**
- Large, engaging 3D scene (laptop + smartphone + AI network)
- Auto-rotating 3D objects with mouse tracking
- Responsive fallback to 2D on mobile or reduced motion preference
- Clear call-to-action buttons

**3D Elements:**
- Laptop model with blue metallic material
- Smartphone model with coral material
- AI network with animated nodes and connections
- Smooth ambient and directional lighting

### 2. Services Grid
**Features:**
- 3-column grid (responsive: 2 columns on tablet, 1 on mobile)
- 3-layer depth structure for each card:
  - Background plate (far depth)
  - Content layer (middle)
  - Icon layer (front)
- Hover interactions:
  - Card lifts up (`translateY(-12px)`)
  - Scale increase (1.02x)
  - Icon rotation
  - Shadow expansion

**Services Included:**
1. **Full-stack Web Development**
   - Modern, performant frontends
   - Robust backend systems
   - KPI: LCP improvement, 2x engagement
   - Duration: 4-12 weeks

2. **Android Native Apps**
   - Jetpack Compose
   - Modern architecture
   - KPI: Fast feature delivery
   - Duration: 6-16 weeks

3. **AI Model Development & Ops**
   - Data → Model → Deployment
   - Production-focused ML
   - KPI: Prototype to production in months
   - Duration: 8-20 weeks

### 3. Case Studies Section
**Features:**
- Rotating 3D plates showcasing project images
- Auto-rotation every 5 seconds
- Manual selection via click
- Floating KPI/duration/role badges
- Navigation dots for easy access

**Case Studies:**
1. **Ameba** - Japan's leading blog SNS
2. **BuzzFeed Japan** - Localized content platform
3. **ITmedia** - Modernized tech media platform

### 4. Process Workflow
**Features:**
- 4-step visualization with 3D tokens
- Auto-advancing steps (every 3 seconds)
- Scroll-triggered animations
- Interactive step selection
- Connection arrows between steps

**Steps:**
1. **Consult** - Clarify goals and metrics
2. **Design** - Architect the solution
3. **Implement** - Ship reliable features
4. **Operate** - Ongoing support and optimization

### 5. FAQ Section
**Features:**
- Modern card-based layout
- Icon indicators for each question
- Hover effects with shadow
- Clear, concise answers

**Questions:**
- How long does a typical project take?
- Do you provide maintenance?
- How do you handle accessibility and performance?

### 6. Final CTA Section
**Features:**
- Gradient background with decorative 3D blur effects
- Trust indicators (8+ years, 30+ projects, 24h response, 100% satisfaction)
- Multiple CTA buttons
- Large, impactful design

## Technical Implementation

### Dependencies
```json
{
  "@react-three/fiber": "^9.3.0",
  "@react-three/drei": "^10.7.6",
  "three": "latest",
  "framer-motion": "^12.23.24"
}
```

### 3D Components

#### `HeroScene.tsx`
- Main hero 3D scene with laptop, smartphone, and AI network
- Auto-rotation with OrbitControls
- Ambient and directional lighting
- Performance optimized

#### `ServiceCard3D.tsx`
- Individual service cards with 3-layer depth
- Hover-triggered animations
- Custom materials and lighting
- Integrated with service data

#### `CaseStudy3D.tsx`
- Rotating plates for case study display
- Floating badge elements
- Active state management
- Image background integration

#### `ProcessWorkflow3D.tsx`
- 4-step workflow visualization
- 3D token spheres with colors
- Connection arrows
- Step progression animation

### Performance Optimizations

1. **Lazy Loading**: 3D scenes loaded on demand
2. **Reduced Motion**: Respects `prefers-reduced-motion` media query
3. **Mobile Fallbacks**: Static images or simplified animations on mobile
4. **Canvas Settings**: Antialias and alpha transparency optimized
5. **Frame Rate**: 60fps targeting with requestAnimationFrame

### Accessibility Features

1. **Keyboard Navigation**: All interactive elements accessible via keyboard
2. **Screen Reader Support**: Proper ARIA labels and semantic HTML
3. **Motion Preferences**: Automatic detection and respect for reduced motion
4. **High Contrast**: Color choices meet WCAG AA standards
5. **Focus Indicators**: Clear visual indicators for focused elements

## Responsive Behavior

### Desktop (≥1024px)
- 3-column service grid
- Full 3D animations
- Side-by-side hero layout

### Tablet (768px - 1023px)
- 2-column service grid
- Reduced 3D complexity
- Stacked hero on smaller tablets

### Mobile (<768px)
- 1-column layout
- Static images or simple 2D parallax
- Touch-optimized interactions
- Simplified workflow display

## Browser Support

- **Modern Browsers**: Full 3D support (Chrome, Firefox, Safari, Edge)
- **WebGL Required**: 3D features require WebGL 1.0 or 2.0
- **Fallbacks**: Graceful degradation to 2D on unsupported browsers

## Future Enhancements

1. **GLTF Model Loading**: Replace primitive shapes with detailed 3D models
2. **Particle Systems**: Add particle effects for more immersive experience
3. **Custom Shaders**: Implement advanced shader effects
4. **AR Integration**: WebXR support for augmented reality previews
5. **Performance Monitoring**: Real-time FPS and performance metrics
6. **A/B Testing**: Track user engagement with different 3D variations

## Usage

```tsx
import ServicesPage from './components/ServicesPage';

// The page is fully self-contained
<ServicesPage />
```

## Customization

### Updating Services
Edit the `services` array in `ServicesPage.tsx`:

```tsx
const services = [
  {
    id: 'web',
    title: 'Your Service Title',
    subtitle: 'Your subtitle',
    icon: YourIcon,
    kpi: 'Your KPI',
    duration: 'Your duration'
  }
];
```

### Changing Colors
Update `tailwind.config.js`:

```js
colors: {
  primary: '#0B76FF',
  accent: '#FF7B6B',
  // Add your colors
}
```

### Modifying 3D Scenes
Each 3D component is in `src/components/3D/`:
- Adjust materials, lighting, or geometry
- Change animation speeds and behaviors
- Add new 3D elements

## Credits

**Design**: Based on modern 3D web design principles
**Development**: React, Three.js, react-three-fiber
**Inspiration**: Professional portfolio best practices

---

Built with ❤️ for an exceptional user experience.

