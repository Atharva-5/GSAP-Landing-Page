# Thirtysixstudio - Interactive Portfolio Website

A modern, interactive portfolio website built with React, GSAP, and Locomotive Scroll. Features smooth animations, parallax scrolling effects, and an immersive user experience.

![React](https://img.shields.io/badge/React-19.2.0-61DAFB?logo=react)
![GSAP](https://img.shields.io/badge/GSAP-3.13.0-88CE02?logo=greensock)
![Vite](https://img.shields.io/badge/Vite-7.2.4-646CFF?logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.17-38B2AC?logo=tailwind-css)

## ✨ Features

- **Smooth Scrolling**: Powered by Locomotive Scroll for buttery-smooth page transitions
- **Parallax Effects**: Canvas elements move at different speeds creating depth
- **Interactive Animations**: GSAP-powered animations with click interactions
- **Dynamic Color Transitions**: Background and text colors change on interaction
- **Canvas Image Sequences**: Animated canvas elements with image sequences
- **Responsive Design**: Fully responsive layout with modern typography
- **Modern Typography**: Space Grotesk and Inter fonts for a professional look

## 🚀 Technologies Used

- **React 19.2.0** - UI library
- **GSAP 3.13.0** - Animation library
- **Locomotive Scroll 5.0.0** - Smooth scrolling
- **Vite 7.2.4** - Build tool and dev server
- **Tailwind CSS 4.1.17** - Utility-first CSS framework
- **Canvas API** - For rendering animated image sequences

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/gsap.git
cd gsap
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎨 Project Structure

```
gsap/
├── public/
│   └── vite.svg
├── src/
│   ├── App.jsx          # Main application component
│   ├── Canvas.jsx        # Canvas component with GSAP animations
│   ├── main.jsx          # Application entry point
│   ├── index.css         # Global styles
│   ├── data.js           # Canvas data configuration
│   └── canvasimages.js   # Canvas image assets
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 🎯 Key Features Explained

### Interactive Heading
Click on the "Thirtysixstudio" heading to:
- Toggle canvas elements visibility
- Change background color from black to red (#fd2c2a)
- Change text color from white to black
- Trigger a growing circle animation from click position

### Smooth Scrolling
Locomotive Scroll provides:
- Smooth scroll behavior
- Parallax effects on canvas elements
- Boundary detection for optimal performance

### Canvas Animations
Each canvas element:
- Displays animated image sequences
- Moves at different speeds based on z-index (parallax effect)
- Fades in with scale animation on mount

## 🎨 Customization

### Changing Colors
Edit the color values in `src/App.jsx`:
```javascript
setBackgroundColor('#fd2c2a'); // Background color
setTextColor('black');          // Text color
```

### Modifying Animations
Adjust GSAP animations in:
- `src/App.jsx` - Main page animations
- `src/Canvas.jsx` - Canvas element animations

### Updating Content
- Edit text content in `src/App.jsx`
- Modify canvas data in `src/data.js`
- Update images in `src/canvasimages.js`

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📝 License

This project is private and proprietary.

## 👤 Author

Thirtysixstudio

## 🙏 Acknowledgments

- [GSAP](https://greensock.com/gsap/) for powerful animation capabilities
- [Locomotive Scroll](https://github.com/locomotivemtl/locomotive-scroll) for smooth scrolling
- [Google Fonts](https://fonts.google.com/) for Space Grotesk and Inter fonts

---

Made with ❤️ using React, GSAP, and Vite
