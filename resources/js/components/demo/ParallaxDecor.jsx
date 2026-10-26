import React, { useEffect, useState, useRef } from 'react';

/**
 * ParallaxDecor Component
 * Creates gentle floating botanical leaves and soft light orbs in the background
 * that move at differing scroll ratios (0.08x - 0.2x), creating cinematic layered depth
 * without hijacking or interfering with natural user scroll.
 */
export default function ParallaxDecor({ theme }) {
    const [offsetY, setOffsetY] = useState(0);
    const containerRef = useRef(null);

    useEffect(() => {
        const findScrollParent = (node) => {
            if (!node) return null;
            let parent = node.parentElement;
            while (parent && parent !== document.body) {
                const overflowY = window.getComputedStyle(parent).overflowY;
                if (overflowY === 'auto' || overflowY === 'scroll') {
                    return parent;
                }
                parent = parent.parentElement;
            }
            return window;
        };

        const scroller = findScrollParent(containerRef.current);
        let ticking = false;

        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const top = scroller === window ? window.scrollY : scroller.scrollTop;
                    setOffsetY(top);
                    ticking = false;
                });
                ticking = true;
            }
        };

        if (scroller === window) {
            window.addEventListener('scroll', handleScroll, { passive: true });
        } else if (scroller) {
            scroller.addEventListener('scroll', handleScroll, { passive: true });
        }

        return () => {
            if (scroller === window) {
                window.removeEventListener('scroll', handleScroll);
            } else if (scroller) {
                scroller.removeEventListener('scroll', handleScroll);
            }
        };
    }, []);

    const accentColor = theme?.accent || '#8C6D46';

    return (
        <div
            ref={containerRef}
            className="absolute inset-0 pointer-events-none overflow-hidden z-0"
            aria-hidden="true"
        >
            {/* Parallax Layer 1: Floating Rose Petal Top-Right (Moves at 0.12x) */}
            <div
                className="absolute top-[18%] -right-8 w-24 h-24 rounded-full opacity-35 blur-xl transition-transform ease-out duration-75"
                style={{
                    backgroundColor: `${accentColor}30`,
                    transform: `translate3d(0, ${offsetY * 0.12}px, 0)`,
                }}
            />

            {/* Parallax Layer 2: Soft Botanical Leaf Silhouette Left (Moves at 0.18x) */}
            <div
                className="absolute top-[38%] -left-10 w-28 h-28 rounded-full opacity-25 blur-2xl transition-transform ease-out duration-75"
                style={{
                    backgroundColor: `${accentColor}25`,
                    transform: `translate3d(0, ${-offsetY * 0.1}px, 0)`,
                }}
            />

            {/* Parallax Layer 3: Warm Champagne Light Orb Center-Right (Moves at 0.15x) */}
            <div
                className="absolute top-[62%] -right-12 w-36 h-36 rounded-full opacity-30 blur-3xl transition-transform ease-out duration-75"
                style={{
                    backgroundColor: 'rgba(212, 175, 55, 0.18)',
                    transform: `translate3d(0, ${offsetY * 0.15}px, 0)`,
                }}
            />

            {/* Parallax Layer 4: Deep Floral Mist Bottom-Left (Moves at 0.08x) */}
            <div
                className="absolute top-[82%] -left-6 w-32 h-32 rounded-full opacity-25 blur-2xl transition-transform ease-out duration-75"
                style={{
                    backgroundColor: `${accentColor}20`,
                    transform: `translate3d(0, ${-offsetY * 0.08}px, 0)`,
                }}
            />
        </div>
    );
}
