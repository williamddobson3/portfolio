# Senior Developer Portfolio - 3D Portfolio Website

A stunning, modern portfolio website built with React, TypeScript, and Three.js featuring 3D effects, smooth animations, and a comprehensive showcase of 25+ projects.

## ✨ Features

- **3D Particle Background** - Dynamic Three.js particle system
- **Smooth Animations** - Framer Motion powered transitions
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Project Showcase** - 25+ projects with detailed information
- **Interactive UI** - Hover effects, glass morphism, and modern design
- **TypeScript** - Full type safety and better development experience
- **Performance Optimized** - Lazy loading, code splitting, and optimized assets

## 🎨 Design Features

- **Gentle Color Palette** - Soft blues, purples, and warm whites
- **Glass Morphism** - Modern glass effect cards and components
- **3D Effects** - Floating cards, depth layers, and particle systems
- **Smooth Transitions** - Client-friendly animations throughout
- **Professional Layout** - Clean, modern, and user-friendly interface

## 🚀 Technologies Used

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **3D Graphics**: Three.js, React Three Fiber
- **Animations**: Framer Motion, GSAP
- **Build Tool**: Vite
- **Icons**: Lucide React
- **Routing**: React Router DOM

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navbar.tsx      # Navigation component
│   ├── ProjectCard.tsx # Project card component
│   ├── LoadingScreen.tsx # Loading screen
│   └── ParticleBackground.tsx # 3D particle system
├── pages/              # Page components
│   ├── Home.tsx        # Landing page
│   ├── Projects.tsx    # Projects listing
│   ├── About.tsx       # About page
│   ├── Contact.tsx     # Contact page
│   └── ProjectDetail.tsx # Individual project page
├── data/               # Data files
│   └── projects.ts     # Project data and types
└── main.tsx           # App entry point
```

## 🛠️ Installation & Setup

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd senior-developer-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 📊 Project Data

The portfolio showcases 25 projects across different categories:

- **Social Platforms** (10 projects)
- **Blockchain Solutions** (4 projects)
- **Enterprise Applications** (4 projects)
- **Mobile Applications** (4 projects)
- **AI & ML Projects** (1 project)
- **Web Development** (2 projects)

Each project includes:
- Project images (3 per project)
- Detailed descriptions
- Technology stack
- Key features
- Project impact
- Duration and role information

## 🎯 Customization

### Adding New Projects

1. Edit `src/data/projects.ts`
2. Add your project data following the `Project` interface
3. Place project images in the `public/projects/` directory

### Modifying Colors

1. Edit `tailwind.config.js` to customize the color palette
2. Update CSS variables in `src/index.css`

### Changing Animations

1. Modify animation configurations in `tailwind.config.js`
2. Update Framer Motion variants in components

## 🌟 Key Features Explained

### 3D Particle Background
- Uses Three.js for real-time 3D graphics
- 5000+ particles with smooth animations
- Performance optimized with proper cleanup

### Glass Morphism
- Custom CSS classes for glass effects
- Backdrop blur and transparency
- Consistent across all components

### Responsive Design
- Mobile-first approach
- Breakpoint-specific layouts
- Touch-friendly interactions

### Performance Optimizations
- Lazy loading for pages
- Image optimization
- Code splitting
- Efficient re-renders

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Three.js for 3D graphics
- Framer Motion for animations
- Tailwind CSS for styling
- Lucide for icons
- React community for inspiration

## 📞 Contact

For questions or support, please reach out through the contact form on the website.

---

**Built with ❤️ using modern web technologies**
