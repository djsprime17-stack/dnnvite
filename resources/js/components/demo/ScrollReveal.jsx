import React, { useEffect, useRef, useState } from 'react';

/**
 * ScrollReveal Component
 * High-performance, two-way scroll animation wrapper.
 * Automatically discovers its parent scroll container (e.g. smartphone simulator container or window)
 * and animates elements in when scrolling down AND gracefully re-triggers when scrolling back up.
 * Guarantees identical smooth animation experience on both mobile devices and desktop.
 */
export default function ScrollReveal({
    children,
    animation = 'fade-up', // 'fade-up' | 'zoom-in' | 'fade-left' | 'fade-right' | 'fade'
    duration = 0.85,
    delay = 0,
    threshold = 0.05,
    className = '',
    style = {},
    staggerChildren = false,
    staggerDelay = 0.1,
}) {
    const elementRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const el = elementRef.current;
        if (!el) return;

        // Auto-detect closest scrollable parent container (for frame mockup mode)
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
            return null;
        };

        const scrollParent = findScrollParent(el);

        // Immediate visibility test on mount and during scroll
        const checkVisibility = () => {
            if (!el) return;
            const rect = el.getBoundingClientRect();
            const windowH = window.innerHeight || document.documentElement.clientHeight;
            const inWindow = rect.top < windowH - 20 && rect.bottom > 20;

            if (scrollParent) {
                const pRect = scrollParent.getBoundingClientRect();
                const inParent = rect.top < pRect.bottom + 40 && rect.bottom > pRect.top - 40;
                setIsVisible(inWindow && inParent);
            } else {
                setIsVisible(inWindow);
            }
        };

        // Immediate check on mount
        checkVisibility();

        let observer = null;
        if (typeof IntersectionObserver !== 'undefined') {
            try {
                observer = new IntersectionObserver(
                    ([entry]) => {
                        // Two-way scroll trigger: true when entering, false when leaving
                        setIsVisible(entry.isIntersecting);
                    },
                    {
                        root: scrollParent || null,
                        threshold: Math.max(0.01, Math.min(threshold, 0.2)),
                        rootMargin: '40px 0px 40px 0px',
                    }
                );
                observer.observe(el);
            } catch (err) {
                console.warn('IntersectionObserver error in ScrollReveal:', err);
                setIsVisible(true);
            }
        }

        // Passive scroll listeners for active 2-way tracking on mobile touch and desktop wheel
        let ticking = false;
        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    checkVisibility();
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', handleScroll, { passive: true });
        if (scrollParent) {
            scrollParent.addEventListener('scroll', handleScroll, { passive: true });
        }

        return () => {
            if (observer) {
                observer.disconnect();
            }
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleScroll);
            if (scrollParent) {
                scrollParent.removeEventListener('scroll', handleScroll);
            }
        };
    }, [threshold]);

    // Define CSS transform transitions based on animation variant
    const getTransform = () => {
        if (isVisible) {
            return 'translate3d(0, 0, 0) scale(1) rotate(0deg)';
        }

        switch (animation) {
            case 'zoom-in':
                return 'translate3d(0, 24px, 0) scale(0.92)';
            case 'fade-left':
                return 'translate3d(-35px, 0, 0) scale(0.98)';
            case 'fade-right':
                return 'translate3d(35px, 0, 0) scale(0.98)';
            case 'fade':
                return 'translate3d(0, 0, 0)';
            case 'fade-up':
            default:
                return 'translate3d(0, 36px, 0) scale(0.98)';
        }
    };

    const transitionStyle = {
        opacity: isVisible ? 1 : 0,
        transform: getTransform(),
        transition: `opacity ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, transform ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
        willChange: 'opacity, transform',
        ...style,
    };

    return (
        <div ref={elementRef} className={className} style={transitionStyle}>
            {children}
        </div>
    );
}
