import { useEffect, useRef, useState } from "react";
import canvasimages from "./canvasimages";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

function Canvas({ details }) {
    const { startIndex, numImages, duration, size, top, left, zIndex } = details;
    const [index, setIndex] = useState(startIndex);
    const canvasRef = useRef(null);
    
    // Calculate smooth scroll speed based on zIndex for depth effect
    // Objects with higher zIndex move slower (negative speed), creating parallax depth
    const scrollSpeed = zIndex > 1 ? -(0.2 + (zIndex * 0.1)) : 0.3 + (zIndex * 0.15);

    // Correctly animate the "index" using GSAP and update React state
    useGSAP(() => {
        if (!canvasRef.current) return;
        
        // Fade in animation for canvas
        gsap.from(canvasRef.current, {
            opacity: 0,
            scale: 0.7,
            duration: 0.8,
            ease: "power2.inOut",
        });
        
        // Use a simple object to store the current value (not state)
        let obj = { value: startIndex };
        gsap.to(obj, {
            value: startIndex + numImages - 1,
            duration: duration,
            ease: "linear",
            repeat: -1,
            modifiers: {
                value: v => {
                    // Loop back within range
                    const val = Math.round(Number(v));
                    if (val > startIndex + numImages - 1) return startIndex;
                    return val;
                },
            },
            onUpdate: () => {
                setIndex(Math.round(obj.value));
            },
        });
    }, [startIndex, numImages, duration]); // Only recreate animation if these change

    useEffect(() => {
        const scale = window.devicePixelRatio || 1;
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const img = new Image();
        img.src = canvasimages[index];

        img.onload = () => {
            // Always set style width and height for css and attribute width/height for pixel
            const displayWidth = size * 1.2;
            const displayHeight = size * 1.2;

            // Set display size (css pixels).
            canvas.style.width = `${displayWidth}px`;
            canvas.style.height = `${displayHeight}px`;

            // Set actual size in memory (scaled to account for extra pixel density).
            canvas.width = displayWidth * scale;
            canvas.height = displayHeight * scale;

            ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset any scale and transforms before scaling
            ctx.scale(scale, scale);

            ctx.clearRect(0, 0, displayWidth, displayHeight);
            ctx.drawImage(img, 0, 0, displayWidth, displayHeight);
        };
    }, [index, size]);

    return (
        <canvas
            data-scroll
            data-scroll-speed={scrollSpeed.toFixed(2)}
            ref={canvasRef}
            className="absolute"
            style={{
                width: `${size * 1.4}px`,
                height: `${size * 1.4}px`,
                top: `${top}%`,
                left: `${left}%`,
                zIndex: zIndex,
            }}
        />
    );
}

export default Canvas;