import Canvas from './Canvas';
import './index.css'
import data from './data'; // This data is an array of arrays of objects
import { useEffect, useRef, useState } from 'react';
import LocomotiveScroll from 'locomotive-scroll';
import 'locomotive-scroll/dist/locomotive-scroll.css';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

function App() {
  const scrollRef = useRef(null);
  const headingref = useRef(null);
  const growingSpan = useRef(null);
  const locomotiveScrollRef = useRef(null);
  const animateGrowingSpanRef = useRef(null);
  const [showCanvas, setShowCanvas] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState('black');
  const [textColor, setTextColor] = useState('white');

  // Handle heading click
  const handleHeadingClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    // Trigger the growing animation if available
    if (animateGrowingSpanRef.current) {
      animateGrowingSpanRef.current(e);
    }

    // Toggle showCanvas and change background color at the same time
    setShowCanvas(prev => {
      const newValue = !prev;
      // Change background color immediately when toggling
      if (newValue) {
        setBackgroundColor('#fd2c2a');
        setTextColor('black')
      } else {
        setBackgroundColor('black');
        setTextColor('white');
      }
      console.log('Toggling showCanvas from', prev, 'to', newValue);
      return newValue;
    });
  };

  // Apply background color change to body using CSS variable
  useEffect(() => {
    document.documentElement.style.setProperty('--bg-color', backgroundColor);
  }, [backgroundColor]);

  useGSAP(() => {
    const span = growingSpan.current;

    if (!span) return;

    // Store the animation function in a ref so handleHeadingClick can call it
    animateGrowingSpanRef.current = (e) => {
      // Set initial position to click coordinates
      gsap.set(span, {
        top: e.clientY,
        left: e.clientX,
        scale: 0,
        opacity: 1,
      });

      // Animate the span to grow
      gsap.to(span, {
        scale: 1000,
        opacity: 0,
        duration: 1,
        ease: "power2.inOut",
      });
    };
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      let locomotiveScroll = null;
      let cleanupFunctions = [];

      // Wait a bit for DOM to be fully ready
      const timeoutId = setTimeout(() => {
        locomotiveScroll = new LocomotiveScroll({
          el: scrollRef.current,
          smooth: true,
          smoothMobile: true,
          resetNativeScroll: true,
          reloadOnContentChange: true,
          getDirection: true,
          multiplier: 1,
          class: 'is-revealed'
        });

        locomotiveScrollRef.current = locomotiveScroll;

        // Update scroll on resize
        const handleResize = () => {
          locomotiveScroll.update();
        };

        window.addEventListener('resize', handleResize);
        cleanupFunctions.push(() => window.removeEventListener('resize', handleResize));

        // Initial update after DOM is ready and content is loaded
        const updateScroll = () => {
          locomotiveScroll.update();
        };

        // Update after images/content load
        setTimeout(updateScroll, 100);
        setTimeout(updateScroll, 500);

        // Update when scrolling reaches boundaries (fixes bottom-to-top issue)
        locomotiveScroll.on('scroll', (instance) => {
          const scroll = instance.scroll;
          const limit = instance.limit;
          // Update when near top or bottom to fix calculation issues
          if (scroll <= 10 || scroll >= limit - 10) {
            locomotiveScroll.update();
          }
        });
      }, 100);

      return () => {
        clearTimeout(timeoutId);
        cleanupFunctions.forEach(fn => fn());
        if (locomotiveScroll) {
          locomotiveScroll.destroy();
        }
      };
    }
  }, []);

  return (
    <>
      <span
        ref={growingSpan}
        className='growing block fixed top-0 left-0 w-5 h-5 rounded-full pointer-events-none z-[9999]'
        style={{
          backgroundColor: '#e73939',
          opacity: 0,
          scale: 0
        }}
      ></span>
      <div ref={scrollRef} data-scroll-container className="w-full relative" style={{ minHeight: '100vh', fontFamily: "'Inter', sans-serif" }}>
        {showCanvas && data[0].map((item, index) => (
          <Canvas details={item} key={index} />
        ))}
        <div className="w-full h-screen relative z-[1]" style={{ color: textColor }}>
          <nav className="w-full flex items-center justify-between p-3 z-50 relative">
            <div className="brand text-2xl font-regular" style={{ color: textColor, fontFamily: "'Space Grotesk', sans-serif" }}>thirtysixstudio</div>
            <ul className="flex items-center justify-end space-x-8 text-lg font-semibold">
              {[
                { name: "Home", href: "#" },
                { name: "Gallery", href: "#gallery" },
                { name: "About", href: "#about" },
                { name: "Contact", href: "#contact" },
              ].map((link, idx) => (
                <li key={idx}>
                  <a href={link.href} className="hover:underline hover:text-red-400 text-md transition duration-150" style={{ color: textColor }}>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="textcontainer w-full px-[20%]">
            <div className='text w-[50%]'>
              <h3 className='text-3xl leading-[1.2]' style={{ color: textColor }}>At Thirtysixstudio, we build digital assets and immersive experiences for purposeful brands.</h3>
              <p className='text-lg w-[80%] mt-10 font-normal' style={{ color: textColor }}>
                We're a boutique production studio focused on design, animation, and technology, constantly rethinking what digital craft can do for present-day ads and campaigns.
              </p>
              <p className='text-md mt-5' style={{ color: textColor }}>scroll</p>
            </div>
          </div>
          <div className="w-full absolute left-0 mt-32 overflow-hidden px-4">
            <h1
              ref={headingref}
              onClick={handleHeadingClick}
              className='text-[clamp(4rem,15vw,16rem)] font-normal tracking-light leading-[0.8] cursor-pointer select-none'
              style={{
                pointerEvents: 'auto',
                userSelect: 'none',
                WebkitUserSelect: 'none',
                color: textColor,
                fontFamily: "'Space Grotesk', sans-serif",
                letterSpacing: '-0.05em',
                maxWidth: '100%',
              }}
            >
              Thirtysixstudio
            </h1>
          </div>
        </div>
        <div className="w-full relative h-screen mt-32 px-10" style={{ color: textColor }}>
          {data[1].map((item, index) => (
            <Canvas details={item} key={index} />
          ))}
          <div className="relative z-[1]">
            <h1 className='text-8xl tracking-tighter' style={{ color: textColor, fontFamily: "'Space Grotesk', sans-serif" }}>about the brands</h1>
            <p className='text-4xl leading-[1.8] w-[80%] mt-10 font-light' style={{ color: textColor }}>We provide you with captivating design, interactive animations, reliable code,and immaculate project coordination.
              Whether you need a campaign built from scratch or assistance at a specific phase, we've got you covered.</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default App;