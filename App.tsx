// FIX: Correct the React import statement to properly import React and its hooks.
import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { PORTFOLIO_ITEMS } from './constants';
import type { PortfolioItem } from './types';
import { PortfolioCategory } from './types';

// =================================================================================
// ANIMATION & SCROLL UTILITIES
// =================================================================================

const createRipple = (event: React.MouseEvent<HTMLElement>) => {
    const element = event.currentTarget;

    // Create the ripple element
    const circle = document.createElement("span");
    const diameter = Math.max(element.clientWidth, element.clientHeight);
    const radius = diameter / 2;
    circle.style.width = circle.style.height = `${diameter}px`;

    // Position the ripple at the click coordinates
    const rect = element.getBoundingClientRect();
    circle.style.left = `${event.clientX - rect.left - radius}px`;
    circle.style.top = `${event.clientY - rect.top - radius}px`;
    circle.classList.add("ripple");

    // Clean up previous ripples
    const existingRipple = element.querySelector(".ripple");
    if (existingRipple) {
        existingRipple.remove();
    }

    // Add the new ripple and set a timeout for removal
    element.appendChild(circle);
    setTimeout(() => circle.remove(), 600);
};

const handleSmoothScroll = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const href = event.currentTarget.getAttribute('href');
    if (!href || !href.startsWith('#')) return;

    const targetId = href.substring(1);
    const element = document.getElementById(targetId);

    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
};


// =================================================================================
// SVG ICONS (Recreated for a high-end, dynamic experience)
// =================================================================================
const InstagramIcon: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className, style }) => (
    <svg className={className} style={style} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
);
const TwitterIcon: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className, style }) => (
    <svg className={className} style={style} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
);
const FacebookIcon: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className, style }) => (
    <svg className={className} style={style} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
);
const LinkedInIcon: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className, style }) => (
    <svg className={className} style={style} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
);
const EmailIcon: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className, style }) => (
    <svg className={className} style={style} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
);

// Hyper-Realistic, Advanced Icons
const HyperRealisticDiamondIcon: React.FC = () => (
    <div className="relative w-20 h-20 diamond-shimmer">
        <svg className="w-full h-full" viewBox="0 0 100 100" style={{ animation: `slow-rotate 30s linear infinite` }}>
            <defs>
                <linearGradient id="diamond-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#fff" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#d1f0f9" stopOpacity="0.6" />
                </linearGradient>
                <linearGradient id="diamond-grad-2" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#a8d5e2" stopOpacity="0.7" />
                    <stop offset="100%" stopColor="#7ac5d8" stopOpacity="0.5" />
                </linearGradient>
                <filter id="diamond-glow"><feGaussianBlur stdDeviation="1" /></filter>
            </defs>

            {/* Main Body */}
            <path d="M 50 95 L 10 50 L 90 50 Z" fill="#7AC5D8" />
            <path d="M 10 50 L 30 50 L 50 20 Z" fill="url(#diamond-grad-2)" />
            <path d="M 90 50 L 70 50 L 50 20 Z" fill="url(#diamond-grad-2)" opacity="0.7" />
            <path d="M 50 95 L 30 50 L 70 50 Z" fill="#98d0df" />

            {/* Top Facets */}
            <path d="M 50 5 L 10 50 L 50 20 Z" fill="#e1f4f9" />
            <path d="M 50 5 L 90 50 L 50 20 Z" fill="#fff" />
            <path d="M 30 50 L 70 50 L 50 20 Z" fill="url(#diamond-grad-1)" />

            {/* Girdle */}
            <line x1="10" y1="50" x2="90" y2="50" stroke="#FFFFFF" strokeWidth="0.5" opacity="0.5" />

            {/* Animated Glint */}
            <path d="M 50 5 L 40 28 L 50 20 Z" fill="white" opacity="0" filter="url(#diamond-glow)" className="diamond-glint" />
        </svg>
    </div>
);


const CinematicServicesIcons = {
    Video: () => (
        <div className="relative w-20 h-20">
            <svg className="w-full h-full text-gold" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1">
                <rect x="6" y="18" width="36" height="28" rx="2" />
                <rect x="42" y="24" width="16" height="16" rx="1" />
                <circle cx="50" cy="32" r="5" fill="currentColor" fillOpacity="0.2" />
                <circle cx="50" cy="32" r="7" style={{ animation: `lens-pulse 2.5s ease-in-out infinite` }} />
                <path d="M12 18 V 14 H 20" />
                <path d="M22, 14 L 28, 8 L 36, 8" />
                <circle cx="36" cy="22" r="1.5" fill="#ff4d4d" stroke="none">
                    <animate attributeName="opacity" values="0.3;1;0.3" dur="1.5s" repeatCount="indefinite" />
                </circle>
                <g clipPath="url(#lens-clip)">
                    <rect x="38" y="15" width="24" height="2" fill="rgba(255,255,255,0.7)" style={{ animation: `lens-flare-sweep 4s ease-in-out infinite 0.5s` }} />
                </g>
                <defs><clipPath id="lens-clip"><circle cx="50" cy="32" r="7" /></clipPath></defs>
            </svg>
        </div>
    ),
    Image: () => (
        <div className="relative w-20 h-20">
            <svg className="w-full h-full text-gold" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M20 8 L 44 8 M 8 20 L 8 44 M 20 56 L 44 56 M 56 20 L 56 44" strokeWidth="1" opacity="0.5" />
                <g opacity="0.1" strokeWidth="0.5" style={{ animation: `slow-rotate 20s linear infinite` }}>
                    {[...Array(6)].map((_, i) => <path key={i} d={`M32 32 L ${32 + 28 * Math.cos(2*Math.PI*i/6)} ${32 + 28 * Math.sin(2*Math.PI*i/6)}`} />)}
                </g>
                <rect x="12" y="12" width="40" height="40" rx="1" strokeWidth="1" />
                <g>
                    {[...Array(100)].map((_, i) => (
                        <rect key={i} x={(i % 10) * 4 + 12} y={Math.floor(i / 10) * 4 + 12} width="3" height="3" fill="currentColor" opacity="0" style={{ animation: `render-pixel 5s ease-in-out infinite ${Math.random() * 5}s` }} />
                    ))}
                </g>
            </svg>
        </div>
    ),
    Visuals: HyperRealisticDiamondIcon,
    CGI: () => (
        <div className="relative w-20 h-20">
            <svg className="w-full h-full text-gold" style={{ animation: `slow-rotate 25s linear infinite` }} viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.5">
                {[...Array(7)].map((_, i) => (<circle key={`o-${i}`} cx={50 + 48 * Math.cos(2*Math.PI*i/7)} cy={50 + 48 * Math.sin(2*Math.PI*i/7)} r="3" fill="currentColor" style={{ animation: `soft-pulse-shimmer 3s ease-in-out infinite ${i*.3}s` }} />))}
                {[...Array(5)].map((_, i) => (<circle key={`m-${i}`} cx={50 + 38 * Math.cos(2*Math.PI*i/5)} cy={50 + 38 * Math.sin(2*Math.PI*i/5)} r="2.5" fill="currentColor" style={{ animation: `soft-pulse-shimmer 3s ease-in-out infinite ${i*.5}s reverse` }} />))}
                {[...Array(7)].map((_, i) => (<path key={`p-${i}`} d={`M50 50 L ${50 + 48 * Math.cos(2*Math.PI*i/7)} ${50 + 48 * Math.sin(2*Math.PI*i/7)}`} strokeDasharray="100" strokeDashoffset="100" style={{ animation: `sequential-glow-path 2s ease-out forwards ${i * 0.2}s` }} />))}
                <circle cx="50" cy="50" r="10" fill="currentColor" fillOpacity="0.2" style={{ animation: `soft-pulse-shimmer 2s ease-in-out infinite reverse` }}/>
                <circle cx="50" cy="50" r="5" fill="currentColor" />
            </svg>
        </div>
    ),
};
const QualityIcon: React.FC = () => (
    <div className="relative w-20 h-20">
        <svg className="w-full h-full text-gold" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5">
            <g style={{ animation: `float-up-down 6s ease-in-out infinite` }}>
                {/* Loupe */}
                <circle cx="28" cy="28" r="14" strokeWidth="2" />
                <line x1="39" y1="39" x2="52" y2="52" strokeWidth="3" strokeLinecap="round" />

                {/* Gem inside loupe */}
                <g transform="translate(28, 28) scale(0.6)">
                    <g style={{ animation: `slow-rotate 15s linear infinite` }}>
                        <path d="M0 -18 L 17.1 -9 L 17.1 9 L 0 18 L -17.1 9 L -17.1 -9 Z" strokeWidth="2" />
                        <path d="M0 -18 L 0 18 M -17.1 9 L 17.1 -9 M -17.1 -9 L 17.1 9" strokeWidth="1.5" opacity="0.7" />
                    </g>
                </g>

                {/* Sparkle on gem */}
                <g transform="translate(36, 22)">
                    <path d="M0 -3 L-0.5 -0.5 L-3 0 L-0.5 0.5 L0 3 L0.5 0.5 L3 0 L0.5 -0.5 Z" fill="white" stroke="white" strokeWidth="0.5"
                          style={{ animation: `sparkle-effect 3s ease-in-out infinite 1s` }}/>
                </g>
            </g>
        </svg>
    </div>
);
const CinematicWhyChooseUsIcons = {
    Quality: QualityIcon,
    Creativity: () => (
        <div className="relative w-20 h-20">
            <svg className="w-full h-full text-gold" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="0.5">
                <path d="M48 52 C 54 44, 52 30, 42 22 C 32 14, 20 18, 14 28 C 8 38, 12 52, 22 56" strokeWidth="1" opacity="0.3" />
                <defs>
                    <filter id="glow-filter"><feGaussianBlur stdDeviation="1.5" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
                </defs>
                <g filter="url(#glow-filter)">
                    <path d="M20 30 C 25 22, 35 25, 40 32" strokeDasharray="50" strokeDashoffset="50" style={{ animation: `sequential-glow-path 4s ease-in-out infinite 0s`}} />
                    <path d="M40 32 C 45 38, 42 45, 36 50" strokeDasharray="50" strokeDashoffset="50" style={{ animation: `sequential-glow-path 4s ease-in-out infinite 1s`}} />
                    <path d="M36 50 C 30 55, 22 52, 22 45" strokeDasharray="50" strokeDashoffset="50" style={{ animation: `sequential-glow-path 4s ease-in-out infinite 2s`}} />
                    <path d="M22 45 C 18 40, 18 35, 20 30" strokeDasharray="50" strokeDashoffset="50" style={{ animation: `sequential-glow-path 4s ease-in-out infinite 3s`}} />
                </g>
                <circle cx="32" cy="38" r="5" fill="currentColor" style={{ animation: `soft-pulse-shimmer 4s ease-in-out infinite` }}/>
            </svg>
        </div>
    ),
    Partnership: () => (
        <div className="relative w-20 h-20">
            <svg className="absolute w-16 h-16 top-0 left-0 text-gold" style={{ animation: `slow-rotate 10s cubic-bezier(0.455, 0.03, 0.515, 0.955) infinite` }} viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M50 20 A 30 30 0 0 1 50 80 A 30 30 0 0 1 50 20 Z" />
                <circle cx="50" cy="50" r="10" />
                {[...Array(8)].map((_, i) => <path key={i} d={`M50 50 L ${50+40*Math.cos(i*Math.PI/4)} ${50+40*Math.sin(i*Math.PI/4)}`} />)}
            </svg>
             <svg className="absolute w-12 h-12 bottom-0 right-0 text-gold" style={{ animation: `slow-rotate 10s cubic-bezier(0.455, 0.03, 0.515, 0.955) infinite reverse` }} viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M50 25 A 25 25 0 0 1 50 75 A 25 25 0 0 1 50 25 Z" />
                <circle cx="50" cy="50" r="8" />
                 {[...Array(6)].map((_, i) => <path key={i} d={`M50 50 L ${50+32*Math.cos(i*Math.PI/3)} ${50+32*Math.sin(i*Math.PI/3)}`} />)}
            </svg>
            <div className="absolute top-[28px] left-[28px] w-6 h-6 bg-gold rounded-full" style={{ animation: `soft-pulse-shimmer 2s ease-in-out infinite`, filter: 'blur(5px)' }}></div>
        </div>
    ),
};
const CinematicProcessIcons = {
    Discovery: () => (
        <div className="relative w-20 h-20">
            <svg className="w-full h-full text-gold" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1">
                {/* Loupe */}
                <g className="transition-transform duration-500 ease-cinematic group-hover:rotate-[-15deg]">
                    <circle cx="28" cy="28" r="14" strokeWidth="1.5" />
                    <line x1="38" y1="38" x2="50" y2="50" strokeWidth="2.5" strokeLinecap="round" />
                </g>
                {/* Abstract Crystal */}
                <g transform="translate(28, 28) scale(0.5)">
                     <g className="transition-transform duration-500 ease-cinematic group-hover:scale-110">
                        <path d="M0 -14 L 12 -7 L 12 7 L 0 14 L -12 7 L -12 -7 Z" strokeWidth="1.5" />
                        <path d="M0 -14 L 0 14 M -12 7 L 12 -7 M -12 -7 L 12 7" strokeWidth="1" opacity="0.6" />
                    </g>
                </g>
                 {/* Glint effect */}
                <path d="M22 22 L 25 25" stroke="white" strokeWidth="1.5" strokeLinecap="round"
                      className="opacity-0 transition-opacity duration-500 ease-cinematic group-hover:opacity-100"
                      style={{ filter: 'drop-shadow(0 0 3px white)' }} />
            </svg>
        </div>
    ),
    Ideation: () => (
         <div className="relative w-20 h-20">
            <svg className="w-full h-full text-gold" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="0.8">
                {/* Abstract head shape */}
                <path d="M32,8 C18,8 12,24, 18,36 C24,48 40,48 46,36 C52,24 46,8 32,8 Z" strokeWidth="1" />

                {/* Glowing core idea */}
                <defs>
                    <filter id="ideation-glow"><feGaussianBlur stdDeviation="2" /></filter>
                </defs>
                <circle cx="32" cy="26" r="4" fill="currentColor" filter="url(#ideation-glow)"
                        className="transition-all duration-500 ease-cinematic group-hover:r-6"
                        style={{ animation: `soft-pulse-shimmer 3s ease-in-out infinite` }}/>

                {/* Energy pathways */}
                <g className="opacity-60">
                    <path d="M32 26 C 26 28, 24 34, 26 38" strokeDasharray="2 3" className="transition-all duration-500 ease-cinematic group-hover:stroke-dashoffset-10" />
                    <path d="M32 26 C 38 28, 40 34, 38 38" strokeDasharray="2 3" className="transition-all duration-500 ease-cinematic group-hover:stroke-dashoffset-10" />
                     <path d="M32 26 C 28 22, 22 20, 20 24" strokeDasharray="2 3" className="transition-all duration-500 ease-cinematic group-hover:stroke-dashoffset-10" />
                     <path d="M32 26 C 36 22, 42 20, 44 24" strokeDasharray="2 3" className="transition-all duration-500 ease-cinematic group-hover:stroke-dashoffset-10" />
                </g>
            </svg>
        </div>
    ),
    Production: () => (
        <div className="relative w-20 h-20">
            <svg className="w-full h-full text-gold" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1">
                {/* Interlocking Rings (Gimbal) */}
                <g className="origin-center" style={{ animation: `slow-rotate 20s linear infinite` }}>
                    <circle cx="32" cy="32" r="28" strokeDasharray="4 8" opacity="0.5" className="transition-opacity duration-500 group-hover:opacity-100" />
                </g>
                 <g className="origin-center" style={{ animation: `slow-rotate 15s linear infinite reverse` }}>
                    <ellipse cx="32" cy="32" rx="20" ry="28" strokeDasharray="4 4" opacity="0.7" className="transition-opacity duration-500 group-hover:opacity-100" />
                </g>
                <g className="origin-center" style={{ animation: `slow-rotate 10s linear infinite` }}>
                     <ellipse cx="32" cy="32" rx="28" ry="12" className="transition-opacity duration-500 group-hover:opacity-100" />
                </g>

                {/* Central core */}
                <circle cx="32" cy="32" r="4" fill="currentColor"
                        className="transition-all duration-500 ease-cinematic group-hover:r-6"
                        style={{ animation: `soft-pulse-shimmer 2s ease-in-out infinite`, filter: 'drop-shadow(0 0 8px currentColor)' }}/>
            </svg>
        </div>
    ),
    Delivery: () => (
        <div className="relative w-20 h-20">
            <svg className="w-full h-full text-gold" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5">
                {/* Box base */}
                <path d="M12 32 L 32 42 L 52 32 L 32 22 Z" fill="currentColor" fillOpacity="0.1" />
                <path d="M12 32 V 48 L 32 58 V 42 Z" fill="currentColor" fillOpacity="0.2" />
                <path d="M52 32 V 48 L 32 58 V 42 Z" fill="currentColor" fillOpacity="0.3" />

                {/* Box lid */}
                <g className="origin-bottom transition-transform duration-500 ease-cinematic group-hover:translate-y-[-8px] group-hover:rotate-[-5deg]">
                     <path d="M10 31 L 32 21 L 54 31 L 32 41 Z" />
                </g>

                {/* Inner glow */}
                 <defs>
                    <radialGradient id="delivery-glow-gradient" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#bfa669" stopOpacity="1"/>
                        <stop offset="100%" stopColor="#bfa669" stopOpacity="0"/>
                    </radialGradient>
                </defs>
                <circle cx="32" cy="32" r="10" fill="url(#delivery-glow-gradient)" stroke="none"
                        className="opacity-70 transition-all duration-500 ease-cinematic group-hover:opacity-100 group-hover:scale-125"
                        style={{ filter: 'blur(5px)' }}/>
            </svg>
        </div>
    ),
};
const ChevronLeftIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
);
const ChevronRightIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
);
const CloseIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
);
const QuoteIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} width="100" height="100" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-9.57v7.214c-2.78 .48-3.975 2.59-3.975 5.752v4zM1.017 21v-7.391c0-5.704 3.731-9.57 8.983-9.57v7.214c-2.78 .48-3.975 2.59-3.975 5.752v4z"/></svg>
);

interface PortfolioProgressDotsProps {
    count: number;
    currentIndex: number;
    isPaused: boolean;
    onDotClick: (index: number) => void;
    currentItemType?: 'video' | 'image';
}

const PortfolioProgressDots: React.FC<PortfolioProgressDotsProps> = ({ count, currentIndex, isPaused, onDotClick, currentItemType }) => {
    return (
        <div className="flex justify-center items-center flex-wrap gap-3 mt-8">
            {Array.from({ length: count }).map((_, index) => (
                <button
                    key={index}
                    aria-label={`Go to item ${index + 1}`}
                    onClick={() => onDotClick(index)}
                    className={`portfolio-nav-dot ${currentIndex === index ? 'active' : ''}`}
                >
                    <svg className="progress-ring" width="24" height="24" viewBox="0 0 24 24">
                        <circle className="progress-ring__circle-bg" cx="12" cy="12" r="10" />
                        <circle
                            className={`progress-ring__circle ${currentItemType === 'video' ? 'duration-video' : 'duration-image'}`}
                            cx="12"
                            cy="12"
                            r="10"
                            style={{ animationPlayState: (currentIndex === index && !isPaused) ? 'running' : 'paused' }}
                        />
                    </svg>
                </button>
            ))}
        </div>
    );
};


// =================================================================================
// BUG FIX: Portfolio Item Components to handle video state reliably
// =================================================================================
const VideoItem: React.FC<{ item: PortfolioItem; isCurrent: boolean }> = ({ item, isCurrent }) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const videoElement = videoRef.current;
        if (!videoElement) return;

        if (isCurrent) {
            videoElement.currentTime = 0;
            const playPromise = videoElement.play();
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    if (error.name !== 'AbortError') {
                        console.error("Video play failed:", error);
                    }
                });
            }
        } else {
            videoElement.pause();
        }

        return () => {
            if (videoElement && !videoElement.paused) {
                videoElement.pause();
            }
        };
    }, [isCurrent, item.id, item.src]);

    return (
        <video
            ref={videoRef}
            key={item.src}
            loop={true}
            muted
            playsInline
            preload="metadata"
            className="w-full h-full object-contain transition-transform duration-500 ease-cinematic group-hover:scale-105"
            src={item.src}
        >
            Your browser does not support the video tag.
        </video>
    );
};

const ImageItem: React.FC<{ item: PortfolioItem; }> = ({ item }) => {
    return <img loading="lazy" src={item.src} alt={item.title} className="w-full h-full object-contain transition-transform duration-500 ease-cinematic group-hover:scale-105" />;
};


// =================================================================================
// CUSTOM HOOKS & UTILITY COMPONENTS
// =================================================================================

const useInView = (options?: IntersectionObserverInit): [React.RefObject<HTMLDivElement>, boolean] => {
    const [isInView, setIsInView] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsInView(true);
                observer.disconnect();
            }
        }, options);

        observer.observe(el);
        return () => observer.disconnect();
    }, [options]);

    return [ref, isInView];
};

// FIX: Change `el` prop type to `React.ElementType` to correctly handle dynamic component rendering.
const TypewriterTitle: React.FC<{ text: string; className?: string; el?: React.ElementType }> = ({ text, className, el: Wrapper = 'h2' }) => {
    const [ref, isInView] = useInView({ threshold: 0.5 });

    return (
        <div ref={ref} className="min-h-[1.5em] md:min-h-[1.5em]">
            <Wrapper
                className={`${className} transition-all duration-1000 ${isInView ? 'animate-dramatic-settle-in' : 'opacity-0'}`}
                spellCheck={false}
            >
                {text}
            </Wrapper>
        </div>
    );
};

const useParallax = (speed: number) => {
    const [offsetY, setOffsetY] = useState(0);
    const handleScroll = () => setOffsetY(window.pageYOffset);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return { transform: `translateY(${offsetY * speed}px)` };
};

// FIX: Add 'slide-in-from-right' to AnimationType to resolve type error.
type AnimationType = 'fade-in' | 'slide-in-left' | 'slide-in-bottom' | 'zoom-in' | 'settle-in' | 'slide-in-from-right';
interface AnimatedWrapperProps {
    children: React.ReactNode;
    className?: string;
    animation?: AnimationType;
    stagger?: boolean;
    animationClass?: string;
    style?: React.CSSProperties;
    threshold?: number;
    onClick?: () => void;
    onKeyDown?: (e: React.KeyboardEvent) => void;
    role?: string;
    tabIndex?: number;
}
const AnimatedWrapper: React.FC<AnimatedWrapperProps> = ({ children, className = '', animation = 'fade-in', stagger = false, animationClass, style, threshold = 0.2, ...rest }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [isInView, setIsInView] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) { setIsInView(true); observer.disconnect(); }
        }, { threshold });
        if (ref.current) observer.observe(ref.current);
        return () => { if (ref.current) observer.disconnect(); };
    }, [threshold]);

    // FIX: Add mapping for 'slide-in-from-right' to its corresponding CSS animation class.
    const getAnimationClass = (type: AnimationType): string => ({
        'slide-in-left': 'animate-slide-in-left',
        'slide-in-from-right': 'animate-slide-in-from-right',
        'slide-in-bottom': 'animate-slide-in-bottom',
        'zoom-in': 'animate-zoom-in-fade',
        'settle-in': 'animate-settle-in',
        'fade-in': 'animate-zoom-in-fade'
    }[type] || 'animate-zoom-in-fade');

    if (stagger) {
        return (
            <div ref={ref} className={className} style={style} {...rest}>
                {React.Children.map(children, (child, index) =>
                    React.isValidElement<{ className?: string; style?: React.CSSProperties }>(child) ?
                    React.cloneElement(child, {
                        className: `${child.props.className || ''} transition-all duration-500 ${isInView ? getAnimationClass(animation) : 'opacity-0'}`,
                        style: { ...(child.props.style || {}), animationDelay: `${isInView ? index * 150 : 0}ms` },
                    }) : child
                )}
            </div>
        );
    }

    const resolvedAnimationClass = isInView ? (animationClass || getAnimationClass(animation)) : 'opacity-0';
    return <div ref={ref} className={`${className} transition-opacity duration-700 ${resolvedAnimationClass}`} style={style} {...rest}>{children}</div>;
};

const AnimatedWords: React.FC<{
    text: string;
    // FIX: Change `el` prop type to `React.ElementType` to correctly handle dynamic component rendering.
    el?: React.ElementType;
    className?: string;
    animationName?: string;
    duration?: number;
    stagger?: number;
    delay?: number;
}> = ({
    text,
    el: Wrapper = 'div',
    className,
    animationName = 'floatIn',
    duration = 1,
    stagger = 0.1,
    delay = 0,
}) => (
    <Wrapper className={className}>
        {text.split(' ').map((word, i) => (
            <span key={i} className="inline-block" style={{
                animation: `${animationName} ${duration}s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay + (i * stagger)}s forwards`,
                opacity: 0,
                transformOrigin: 'bottom'
            }}>
                {word}&nbsp;
            </span>
        ))}
    </Wrapper>
);

const ParticleBackground: React.FC<{
    count?: number;
    className?: string;
    minSpeed?: number;
    maxSpeed?: number;
    minSize?: number;
    maxSize?: number;
}> = ({
    count = 15,
    className = '',
    minSpeed = 10,
    maxSpeed = 25,
    minSize = 1,
    maxSize = 4,
}) => (
    <div className={`absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0 ${className}`}>
        {[...Array(count)].map((_, i) => {
            const size = Math.random() * (maxSize - minSize) + minSize;
            return (
                <div
                    key={i}
                    className="particle"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        width: `${size}px`,
                        height: `${size}px`,
                        animationDelay: `${Math.random() * 5}s`,
                        animationDuration: `${Math.random() * (maxSpeed - minSpeed) + minSpeed}s`,
                        '--end-x': `${Math.random() * 200 - 100}px`,
                        '--end-y': `${Math.random() * 200 - 100}px`,
                    } as React.CSSProperties}
                />
            );
        })}
    </div>
);

// =================================================================================
// LAYOUT COMPONENTS
// =================================================================================

const Header: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    const navLinks = [
        { label: "About", href: "#about" },
        { label: "Services", href: "#services" },
        { label: "Why Us", href: "#why-us" },
        { label: "Process", href: "#process" },
        { label: "Portfolio", href: "#portfolio" },
        { label: "Contact", href: "#contact" },
    ];
    return (
        <header id="main-header" className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-black/80 backdrop-blur-sm shadow-lg shadow-gold/10' : 'bg-transparent'}`}>
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <a href="#home" onClick={handleSmoothScroll} className="focus-visible-ring" aria-label="LuxAiCreations Home">
                    <img src="/assets/images/logo1.png" alt="LuxAiCreations Logo" className="h-32 w-auto"/>
                </a>
                <nav className="hidden md:flex items-center space-x-8">
                    {navLinks.map(({label, href}) => (
                        <a key={label} href={href} onClick={handleSmoothScroll} className="text-white hover:text-gold transition-colors duration-300 focus-visible-ring nav-link-hover-effect">{label}</a>
                    ))}
                </nav>
            </div>
        </header>
    );
};

const Footer: React.FC = () => {
    const socialLinks = [
      { label: "Instagram", href: "https://instagram.com", icon: InstagramIcon },
      { label: "Twitter", href: "https://twitter.com", icon: TwitterIcon },
      { label: "Facebook", href: "https://facebook.com", icon: FacebookIcon },
      { label: "LinkedIn", href: "https://linkedin.com", icon: LinkedInIcon },
      { label: "Email", href: "mailto:contact@luxaicreations.com", icon: EmailIcon }
    ];
    const navLinks = [
        { label: "Home", href: "#home" }, { label: "About", href: "#about" }, { label: "Services", href: "#services" },
        { label: "Why Us", href: "#why-us" }, { label: "Process", href: "#process" }, { label: "Portfolio", href: "#portfolio" }, { label: "Contact", href: "#contact" },
    ];
    return (
    <footer className="bg-black border-t border-gray-800 py-12">
        <div className="container mx-auto px-6 text-center text-gray-400">
            <div className="flex justify-center space-x-6 mb-6">
                {socialLinks.map(({ label, href, icon: Icon }, index) => (
                    <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="hover:text-gold transition-colors duration-300 group focus-visible-ring rounded-full">
                        <Icon className="w-6 h-6 transition-all duration-300 ease-cinematic neon-glow-on-hover" style={{ animation: `draw-in 1.5s ease-out forwards ${index * 0.1}s, float-up-down 4s ease-in-out infinite ${1.5 + index * 0.1}s`, strokeDasharray: 100, strokeDashoffset: 100 }} />
                    </a>
                ))}
            </div>
            <div className="flex justify-center flex-wrap gap-x-6 gap-y-2 mb-6">
                {navLinks.map(({label, href}) => (
                     <a key={label} href={href} onClick={handleSmoothScroll} className="hover:text-gold focus-visible-ring nav-link-hover-effect">{label}</a>
                ))}
            </div>
            <div className="mt-4 text-sm text-gray-500">
                <span className="shimmer-text" spellCheck="false">&copy; 2025 LuxAiCreations.</span>
                <a href="privacy.html" className="ml-4 hover:text-gold transition-colors duration-300 focus-visible-ring" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
            </div>
        </div>
    </footer>
    );
};

// =================================================================================
// SECTION COMPONENTS
// =================================================================================
const Section: React.FC<{id: string, children: React.ReactNode, className?: string}> = ({ id, children, className = ''}) => (
    <section id={id} className={`py-20 md:py-32 overflow-hidden ${className}`}><div className="container mx-auto px-6">{children}</div></section>
);

const HeroSection: React.FC = () => {
    const parallaxStyle = useParallax(-0.15);
    const [titleAnimationComplete, setTitleAnimationComplete] = useState(false);

    const titleText = "Luxury AI Content Studio";
    const titleWords = titleText.split(' ');
    const animationDuration = 1.5;
    const animationStagger = 0.4;
    const totalAnimationTime = (titleWords.length - 1) * animationStagger + animationDuration;

    const subtitleText = "We create cinematic visuals, videos, and portfolio-ready content for high-end brands";
    const subtitleDelay = 1.8;
    const subtitleStagger = 0.08;
    const subtitleDuration = 1.0;
    const subtitleAnimationEndTime = subtitleDelay + (subtitleText.split(' ').length - 1) * subtitleStagger + subtitleDuration;

    useEffect(() => {
        const timer = setTimeout(() => {
            setTitleAnimationComplete(true);
        }, totalAnimationTime * 1000 + 100); // Add a small buffer

        return () => clearTimeout(timer);
    }, [totalAnimationTime]);

    return (
        <section id="home" className="h-screen w-full relative flex items-center justify-center text-center text-white overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full" style={parallaxStyle}>
                <video
                    preload="metadata"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute top-0 left-0 w-full h-full object-cover z-0"
                    src="/assets/videos/modelfacecloseup.mp4"
                >
                </video>
            </div>
            <ParticleBackground count={50} />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent z-10"></div>
            <div className="relative z-20 p-4">
                <h1 className={`text-4xl md:text-6xl t-7xl font-playfair font-extrabold mb-4 transition-colors duration-1000 ${titleAnimationComplete ? 'text-gold animate-title-glow' : 'text-shadow-lg'}`} spellCheck="false">
                    {titleWords.map((word, i) => (
                        <span key={i} className="inline-block" style={{
                            animation: `floatIn ${animationDuration}s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${i * animationStagger}s forwards`,
                            opacity: 0,
                            transformOrigin: 'bottom'
                        }}>
                            {word}&nbsp;
                        </span>
                    ))}
                </h1>
                 <AnimatedWords
                    text={subtitleText}
                    el="p"
                    className="text-lg md:text-2xl mb-8 max-w-3xl mx-auto font-light"
                    animationName="subtleFloatIn"
                    duration={subtitleDuration}
                    stagger={subtitleStagger}
                    delay={subtitleDelay}
                />
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <AnimatedWrapper animation="slide-in-bottom" style={{ animationDelay: `${subtitleAnimationEndTime}s` }}>
                        <a
                            href="#portfolio"
                            onClick={(e) => { createRipple(e); handleSmoothScroll(e); }}
                            className="btn-primary ripple-btn animate-pulse-glow font-bold py-3 px-8 rounded-full text-lg focus-visible-ring"
                        >
                            View Portfolio
                        </a>
                    </AnimatedWrapper>
                    <AnimatedWrapper animation="slide-in-bottom" style={{ animationDelay: `${subtitleAnimationEndTime + 0.2}s` }}>
                        <a
                            href="#contact"
                            onClick={(e) => { createRipple(e); handleSmoothScroll(e); }}
                            className="btn-secondary ripple-btn text-white font-bold py-3 px-8 rounded-full text-lg focus-visible-ring"
                        >
                            Contact Us
                        </a>
                    </AnimatedWrapper>
                </div>
            </div>
        </section>
    );
};

const AboutSection: React.FC = () => {
    const parallaxFast = useParallax(0.1);
    const parallaxSlow = useParallax(0.05);
    const keyPoints = ["Cinematic Videos", "Hyper-Realistic CGI Ads", "AI Portfolio Images", "Luxury Brand Visuals"];

    return (
        <Section id="about" className="bg-black relative perspective">
            <ParticleBackground
                count={10}
                minSpeed={40}
                maxSpeed={80}
                minSize={0.5}
                maxSize={2}
                className="opacity-50"
            />
            <div className="relative z-10">
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
                    <div className="text-center md:text-left">
                         <div className="mb-6">
                            <TypewriterTitle
                                text="About LuxAiCreations"
                                el="h2"
                                className="text-4xl md:text-5xl font-playfair font-bold text-gold"
                            />
                        </div>
                        <AnimatedWrapper animation="settle-in">
                            <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-6">
                                We merge state-of-the-art AI with artistic mastery to produce visuals that captivate and inspire. Our studio specializes in crafting hyper-realistic CGI and cinematic content that captures the essence of luxury, elevating your brand's narrative to unprecedented heights.
                            </p>
                        </AnimatedWrapper>
                         <AnimatedWrapper stagger animation="settle-in">
                            {keyPoints.map((point) => (
                               <div key={point} className="flex items-center gap-3 group mb-2">
                                    <svg className="w-5 h-5 text-gold flex-shrink-0 transition-all duration-300 ease-cinematic neon-glow-on-hover" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                   <span className="transition-colors group-hover:text-white">{point}</span>
                               </div>
                            ))}
                        </AnimatedWrapper>
                    </div>
                    <div className="grid grid-cols-2 gap-4 h-full">
                        <AnimatedWrapper animation="slide-in-left" threshold={0.3}>
                            <div className="rounded-lg shadow-xl" style={{ ...parallaxFast, transform: `${parallaxFast.transform} rotateY(-5deg)` }}>
                                <img loading="lazy" src="/assets/images/icedout reveal.png" alt="Luxury golden bracelet on a marble surface" className="w-full h-full object-cover" />
                            </div>
                        </AnimatedWrapper>
                         <AnimatedWrapper animationClass="animate-slide-in-from-right" threshold={0.3} style={{animationDelay: '200ms'}}>
                            <div className="rounded-lg shadow-xl mt-8" style={{ ...parallaxSlow, transform: `${parallaxSlow.transform} rotateY(5deg)` }}>
                                <img loading="lazy" src="/assets/images/desertqueen.png" alt="Woman in a pink dress in a field of flowers" className="w-full h-full object-cover" />
                            </div>
                        </AnimatedWrapper>
                    </div>
                </div>
            </div>
        </Section>
    );
};

interface Service {
    icon: JSX.Element;
    title: string;
    description: string;
    videoSrc: string;
}

const services: Service[] = [
    {
        icon: <CinematicServicesIcons.Video />,
        title: "Cinematic Videos",
        description: "Bespoke cinematic videos and product reveals that captivate your audience.",
        videoSrc: "/assets/videos/rollsroyals.mp4"
    },
    {
        icon: <CinematicServicesIcons.Image />,
        title: "AI Portfolio Images",
        description: "Photorealistic images for campaigns and portfolios in any aspect ratio.",
        videoSrc: "/assets/videos/modelfacecloseup.mp4"
    },
    {
        icon: <CinematicServicesIcons.Visuals />,
        title: "Luxury Brand Visuals",
        description: "High-end visual content that embodies your brand’s unique identity and story.",
        videoSrc: "/assets/videos/transformation.mp4"
    },
    {
        icon: <CinematicServicesIcons.CGI />,
        title: "Bespoke AI Concepts & CGI Ads",
        description: "From concept to creation, we develop stunning CGI ads and unique visual identities that defy convention.",
        videoSrc: "/assets/videos/transform1.mp4"
    },
];

const ServiceCard: React.FC<{ service: Service; onServiceSelect: (title: string) => void }> = ({ service, onServiceSelect }) => {
    const cardRef = useRef<HTMLButtonElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isInView, setIsInView] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            setIsInView(entry.isIntersecting);
        }, { threshold: 0.4 });

        const currentRef = cardRef.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.disconnect();
            }
        };
    }, []);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        if (isInView) {
            video.play().catch(err => {
                if (err.name !== 'AbortError') console.error("Video play failed", err);
            });
        } else {
            video.pause();
        }
    }, [isInView]);

    return (
        <button
            ref={cardRef}
            onClick={(e) => {
                createRipple(e);
                onServiceSelect(service.title);
            }}
            className="group focus-visible-ring rounded-xl cursor-pointer text-left w-full ripple-btn"
        >
            <div className="relative overflow-hidden rounded-xl min-h-[450px] shadow-lg shadow-black/50 flex flex-col justify-end transition-all duration-500 ease-cinematic group-hover:-translate-y-4 group-hover:scale-[1.02] group-hover:shadow-[0_10px_40px_-10px_rgba(191,166,105,0.4)]">
                <div className="service-card-visual-wrapper">
                    <div className="service-card-border-completer"></div>
                </div>
                <video
                    ref={videoRef}
                    key={service.videoSrc}
                    loop muted playsInline
                    preload="metadata"
                    className="absolute top-0 left-0 w-full h-full object-cover -z-10 transition-all duration-500 ease-cinematic group-hover:scale-110"
                    src={service.videoSrc}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent transition-all duration-500 group-hover:bg-black/60"></div>

                <div className="relative z-10 text-center p-8">
                    <div className="flex justify-center items-center h-24 w-24 mb-6 mx-auto transition-transform duration-500 ease-cinematic group-hover:scale-110">
                        {service.icon}
                    </div>
                    <h3 className="text-xl font-playfair font-bold mb-4" spellCheck="false">{service.title}</h3>
                    <p className="text-gray-400 mb-6 text-sm">{service.description}</p>
                    <span className="font-bold text-gold text-sm cta-shimmer-text">Inquire Now &rarr;</span>
                </div>
            </div>
        </button>
    );
};

const ServicesSection: React.FC<{ onServiceSelect: (serviceTitle: string) => void }> = ({ onServiceSelect }) => {
    return (
        <Section id="services" className="bg-gradient-to-br from-black via-gray-900 to-black relative">
            <ParticleBackground count={20} />
            <div className="text-center mb-20 relative z-10">
                <TypewriterTitle
                    text="Our Services"
                    el="h2"
                    className="text-4xl md:text-5xl font-playfair font-bold text-gold"
                />
            </div>
            <div className="max-w-7xl mx-auto relative z-10">
                <AnimatedWrapper stagger animation="settle-in" className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
                    {services.map((service) => (
                      <ServiceCard key={service.title} service={service} onServiceSelect={onServiceSelect} />
                    ))}
                </AnimatedWrapper>
            </div>
        </Section>
    );
};

const WhyChooseUsSection: React.FC<{ onInquiry: (reasonTitle: string) => void }> = ({ onInquiry }) => {
    const reasons = [
        { icon: <CinematicWhyChooseUsIcons.Quality />, title: "Uncompromising Quality", description: "We deliver pixel-perfect, high-fidelity content that meets the most demanding standards of luxury branding." },
        { icon: <CinematicWhyChooseUsIcons.Creativity />, title: "Boundless Creativity", description: "Our blend of human artistry and AI power allows us to explore and execute concepts previously unimaginable." },
        { icon: <CinematicWhyChooseUsIcons.Partnership />, title: "Dedicated Partnership", description: "We work closely with you as a creative partner, ensuring your vision is realized to its fullest potential." },
    ];
    return (
        <Section id="why-us" className="bg-black">
            <div className="text-center mb-20">
                <TypewriterTitle
                    text="Why Choose Us"
                    el="h2"
                    className="text-4xl md:text-5xl font-playfair font-bold text-gold"
                />
            </div>
            <AnimatedWrapper stagger animation="settle-in" className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12 text-center">
                {reasons.map((reason) => (
                    <button key={reason.title} onClick={() => onInquiry(reason.title)} className="group focus-visible-ring rounded-xl ripple-btn">

                        <div className="flex justify-center items-center h-24 w-24 mb-6 mx-auto transition-transform duration-500 ease-cinematic group-hover:scale-110 group-hover:[&>div]:animate-[icon-shimmer_3s_ease-in-out_infinite]">
                          {reason.icon}
                        </div>
                        <h3 className="text-2xl font-playfair font-bold mb-4" spellCheck="false">{reason.title}</h3>
                        <p className="text-gray-400 leading-relaxed">{reason.description}</p>

                    </button>
                ))}
            </AnimatedWrapper>
        </Section>
    );
};

const CreativeProcessSection: React.FC = () => {
    const steps = [
        { icon: <CinematicProcessIcons.Discovery />, title: "01. Discovery & Vision", description: "We begin by immersing ourselves in your brand's world to define the creative vision and objectives." },
        { icon: <CinematicProcessIcons.Ideation />, title: "02. AI-Powered Ideation", description: "Leveraging advanced AI, we generate and refine a multitude of concepts, pushing creative boundaries." },
        { icon: <CinematicProcessIcons.Production />, title: "03. Cinematic Production", description: "Our artists and technicians bring the chosen concept to life with meticulous attention to detail." },
        { icon: <CinematicProcessIcons.Delivery />, title: "04. Delivery & Impact", description: "We deliver the final assets, optimized for maximum impact across all your brand's platforms." },
    ];

    return (
        <Section id="process" className="bg-gradient-to-bl from-black via-gray-900 to-black relative">
             <ParticleBackground count={15} className="opacity-50" />
            <div className="text-center mb-20 relative z-10">
                <TypewriterTitle
                    text="Our Creative Process"
                    el="h2"
                    className="text-4xl md:text-5xl font-playfair font-bold text-gold"
                />
            </div>
            <AnimatedWrapper
                stagger
                animation="settle-in"
                className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10"
            >
                {steps.map((step) => (
                    <div
                        key={step.title}
                        className="group"
                    >
                        <div className="h-full bg-black/30 backdrop-blur-sm p-8 rounded-2xl border border-gold/10 transition-all duration-500 ease-cinematic process-card-hover">
                            <div className="flex justify-center items-center h-24 w-24 mb-6 mx-auto transition-transform duration-500 ease-cinematic group-hover:scale-110">
                                {step.icon}
                            </div>
                            <h3 className="text-xl font-playfair font-bold mb-4 text-center" spellCheck="false">{step.title}</h3>
                            <p className="text-gray-400 leading-relaxed text-center text-sm">{step.description}</p>
                        </div>
                    </div>
                ))}
            </AnimatedWrapper>
        </Section>
    );
};

interface PortfolioModalProps {
    item: PortfolioItem;
    onClose: () => void;
    onNext: () => void;
    onPrev: () => void;
}
const PortfolioModal: React.FC<PortfolioModalProps> = ({ item, onClose, onNext, onPrev }) => {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowRight') onNext();
            if (e.key === 'ArrowLeft') onPrev();
        };

        document.body.classList.add('body-no-scroll');
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            document.body.classList.remove('body-no-scroll');
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClose, onNext, onPrev]);

    return (
        <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="modal-title">
            <div className="modal-container" onClick={(e) => e.stopPropagation()}>
                <div className="modal-media-content">
                    {item.type === 'video' ? <VideoItem item={item} isCurrent={true} /> : <ImageItem item={item} />}
                </div>
                <div className="modal-title-overlay">
                     <h2 id="modal-title" className="text-2xl md:text-3xl font-playfair font-bold text-gold text-shadow-lg">{item.title}</h2>
                </div>
                <button aria-label="Close" onClick={onClose} className="modal-close-btn">
                    <CloseIcon className="w-6 h-6" />
                </button>
                <button aria-label="Previous Item" onClick={onPrev} className="modal-nav-btn left-4">
                    <ChevronLeftIcon className="w-8 h-8" />
                </button>
                <button aria-label="Next Item" onClick={onNext} className="modal-nav-btn right-4">
                    <ChevronRightIcon className="w-8 h-8" />
                </button>
            </div>
        </div>
    );
}

const PortfolioSection: React.FC = () => {
    const [activeCategory, setActiveCategory] = useState<PortfolioCategory>(PortfolioCategory.ALL);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [outgoingIndex, setOutgoingIndex] = useState<number | null>(null);
    const [isAnimating, setIsAnimating] = useState(false);
    const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(null);
    const [isHovered, setIsHovered] = useState(false);
    const autoplayIntervalRef = useRef<number | null>(null);

    const filteredItems = useMemo(() => {
        return activeCategory === PortfolioCategory.ALL
            ? PORTFOLIO_ITEMS
            : PORTFOLIO_ITEMS.filter(item => item.category === activeCategory);
    }, [activeCategory]);

    useEffect(() => {
        setCurrentIndex(0);
        setOutgoingIndex(null);
    }, [activeCategory]);

    const changeItem = useCallback((newIndex: number) => {
        if (newIndex === currentIndex || isAnimating || newIndex < 0 || newIndex >= filteredItems.length) return;

        setIsAnimating(true);
        setOutgoingIndex(currentIndex);
        setCurrentIndex(newIndex);

        setTimeout(() => {
            setOutgoingIndex(null);
            setIsAnimating(false);
        }, 1200);
    }, [currentIndex, isAnimating, filteredItems.length]);

    const navigate = useCallback((direction: 'next' | 'prev') => {
        if (!filteredItems.length) return;
        const newIndex = direction === 'next'
            ? (currentIndex + 1) % filteredItems.length
            : (currentIndex - 1 + filteredItems.length) % filteredItems.length;
        changeItem(newIndex);
    }, [currentIndex, filteredItems.length, changeItem]);

    const currentItem = useMemo(() => filteredItems[currentIndex], [currentIndex, filteredItems]);
    const outgoingItem = useMemo(() => (outgoingIndex !== null ? filteredItems[outgoingIndex] : null), [outgoingIndex, filteredItems]);

    useEffect(() => {
        const isPaused = isHovered || selectedItemIndex !== null || isAnimating;

        if (autoplayIntervalRef.current) {
            clearInterval(autoplayIntervalRef.current);
        }

        if (!isPaused && filteredItems.length > 1 && currentItem) {
            const duration = currentItem.type === 'video' ? 8000 : 5000;
            autoplayIntervalRef.current = window.setInterval(() => {
                navigate('next');
            }, duration);
        }

        return () => {
            if (autoplayIntervalRef.current) {
                clearInterval(autoplayIntervalRef.current);
            }
        };
    }, [navigate, isHovered, selectedItemIndex, isAnimating, filteredItems.length, currentItem]);

    // Preloading effect
    useEffect(() => {
        if (filteredItems.length <= 1) return;

        const nextIndex = (currentIndex + 1) % filteredItems.length;
        const nextItem = filteredItems[nextIndex];

        const existingLink = document.head.querySelector(`link[rel="preload"][href="${nextItem.src}"]`);
        if (existingLink) return;

        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = nextItem.src;
        link.as = nextItem.type;
        link.crossOrigin = "anonymous";
        document.head.appendChild(link);

        return () => {
            // Let the browser manage the resource, but remove the tag after a while to avoid clutter
            setTimeout(() => {
                if (document.head.contains(link)) {
                    document.head.removeChild(link);
                }
            }, 5000);
        };
    }, [currentIndex, filteredItems]);


    const goToIndex = useCallback((index: number) => {
        changeItem(index);
    }, [changeItem]);

    const handleModalNavigation = (direction: 'next' | 'prev') => {
        if (selectedItemIndex === null || !filteredItems.length) return;
        const newIndex = direction === 'next'
            ? (selectedItemIndex + 1) % filteredItems.length
            : (selectedItemIndex - 1 + filteredItems.length) % filteredItems.length;
        setSelectedItemIndex(newIndex);
    };

    if (!filteredItems.length) {
        return (
            <Section id="portfolio" className="bg-black">
                <div className="text-center mb-12">
                     <TypewriterTitle text="Our Portfolio" el="h2" className="text-4xl md:text-5xl font-playfair font-bold text-gold" />
                </div>
                 <AnimatedWrapper stagger animation="slide-in-bottom" className="flex justify-center flex-wrap gap-2 md:gap-4 mb-12">
                    {Object.values(PortfolioCategory).map(category => (
                        <button key={category} onClick={(e) => { createRipple(e); setActiveCategory(category); }} className={`btn-filter ripple-btn ${activeCategory === category ? 'active' : ''}`}>
                            {category}
                        </button>
                    ))}
                </AnimatedWrapper>
                <p className="text-center text-gray-400 mt-8">No portfolio items to display for this category.</p>
            </Section>
        );
    }

    return (
        <Section id="portfolio" className="bg-black">
            <div className="text-center mb-12">
                <TypewriterTitle
                    text="Our Portfolio"
                    el="h2"
                    className="text-4xl md:text-5xl font-playfair font-bold text-gold"
                />
            </div>
            <AnimatedWrapper stagger animation="slide-in-bottom" className="flex justify-center flex-wrap gap-2 md:gap-4 mb-12">
                {Object.values(PortfolioCategory).map(category => (
                    <button
                        key={category}
                        onClick={(e) => {
                            createRipple(e);
                            setActiveCategory(category);
                        }}
                        className={`btn-filter ripple-btn ${activeCategory === category ? 'active' : ''}`}
                    >
                        {category}
                    </button>
                ))}
            </AnimatedWrapper>

            <AnimatedWrapper animation="zoom-in" style={{ animationDelay: '200ms' }} className="max-w-5xl mx-auto">
                <div
                    className="relative aspect-video overflow-hidden rounded-lg shadow-lg shadow-gold/10 group"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {outgoingItem && (
                        <div className="absolute inset-0 w-full h-full animate-cinematic-crossfade-out" key={`outgoing-${outgoingItem.id}`}>
                            {outgoingItem.type === 'video'
                                ? <VideoItem item={outgoingItem} isCurrent={false} />
                                : <ImageItem item={outgoingItem} />
                            }
                        </div>
                    )}
                    {currentItem && (
                        <div className="absolute inset-0 w-full h-full animate-cinematic-crossfade-in" key={currentItem.id}>
                            {currentItem.type === 'video'
                                ? <VideoItem item={currentItem} isCurrent={selectedItemIndex === null} />
                                : <ImageItem item={currentItem} />
                            }
                        </div>
                    )}

                    <div className="absolute inset-0 z-10 rounded-lg pointer-events-none ring-2 ring-transparent transition-all duration-500 ease-cinematic group-hover:ring-gold group-hover:shadow-[0_0_25px_rgba(191,166,105,0.7)]"></div>

                    <button
                        onClick={() => setSelectedItemIndex(currentIndex)}
                        className="absolute inset-0 bg-transparent z-20 focus:outline-none focus-visible-ring"
                        aria-label={`View details for ${currentItem?.title}`}
                    >
                        <div className="absolute inset-0 flex items-end justify-center p-6 pb-12 text-white bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-cinematic pointer-events-none">
                            <h3 className="text-2xl md:text-3xl font-playfair font-bold text-shadow-lg text-center text-gold">{currentItem?.title}</h3>
                        </div>
                    </button>

                    <button aria-label="Previous Item" onClick={() => navigate('prev')} className="portfolio-nav-arrow left-4">
                        <ChevronLeftIcon className="w-6 h-6" />
                    </button>
                    <button aria-label="Next Item" onClick={() => navigate('next')} className="portfolio-nav-arrow right-4">
                        <ChevronRightIcon className="w-6 h-6" />
                    </button>
                </div>
            </AnimatedWrapper>
            <AnimatedWrapper animation="slide-in-bottom" style={{ animationDelay: '400ms' }}>
                <PortfolioProgressDots
                    count={filteredItems.length}
                    currentIndex={currentIndex}
                    isPaused={isHovered || selectedItemIndex !== null || isAnimating}
                    onDotClick={goToIndex}
                    currentItemType={currentItem?.type}
                />
            </AnimatedWrapper>

            {selectedItemIndex !== null && filteredItems[selectedItemIndex] && (
                <PortfolioModal
                    item={filteredItems[selectedItemIndex]}
                    onClose={() => setSelectedItemIndex(null)}
                    onNext={() => handleModalNavigation('next')}
                    onPrev={() => handleModalNavigation('prev')}
                />
            )}
        </Section>
    );
};

const ContactSection: React.FC<{ initialInquiry?: string }> = ({ initialInquiry }) => {
    const [status, setStatus] = useState('');
    const [formData, setFormData] = useState({ name: '', email: '', service: initialInquiry || 'General Inquiry', message: '' });

    useEffect(() => {
        if (initialInquiry) {
            setFormData(prev => ({ ...prev, service: initialInquiry, message: `I'm interested in learning more about your "${initialInquiry}" service.` }));
        }
    }, [initialInquiry]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('Submitting...');
        // Mock submission
        setTimeout(() => {
            setStatus(`Thank you, ${formData.name}! Your message has been sent. We'll be in touch shortly.`);
            setFormData({ name: '', email: '', service: 'General Inquiry', message: '' });
            setTimeout(() => setStatus(''), 5000);
        }, 1500);
    };

    const serviceOptions = [
        "General Inquiry",
        ...services.map(s => s.title),
        "Uncompromising Quality Inquiry",
        "Boundless Creativity Inquiry",
        "Dedicated Partnership Inquiry"
    ];

    return (
        <Section id="contact" className="bg-black">
            <div className="text-center mb-12">
                <TypewriterTitle
                    text="Start Your Project"
                    el="h2"
                    className="text-4xl md:text-5xl font-playfair font-bold text-gold"
                />
                <p className="max-w-2xl mx-auto text-gray-400 mt-4">
                    Ready to elevate your brand? Reach out to us to discuss your vision, and let's create something extraordinary together.
                </p>
            </div>
            <div className="max-w-3xl mx-auto">
                <AnimatedWrapper animation="settle-in">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required className="form-input" />
                            <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required className="form-input" />
                        </div>
                         <div>
                           <select name="service" value={formData.service} onChange={handleChange} required className="form-input form-select">
                                {serviceOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                           </select>
                         </div>
                        <div>
                            <textarea name="message" placeholder="Tell us about your project..." value={formData.message} onChange={handleChange} required rows={5} className="form-input"></textarea>
                        </div>
                        <div className="text-center">
                            <button type="submit" onClick={createRipple} className="btn-primary ripple-btn font-bold py-3 px-12 rounded-full text-lg focus-visible-ring">Send Message</button>
                        </div>
                    </form>
                    {status && <p className="mt-6 text-center text-gold">{status}</p>}
                </AnimatedWrapper>
            </div>
        </Section>
    );
};

// =================================================================================
// MAIN APP COMPONENT
// =================================================================================

const App: React.FC = () => {
    const [initialInquiry, setInitialInquiry] = useState<string>('');

    const handleInquiry = useCallback((title: string) => {
        setInitialInquiry(title);
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    }, []);

    return (
        <>
            <Header />
            <main>
                <HeroSection />
                <AboutSection />
                <ServicesSection onServiceSelect={handleInquiry} />
                <WhyChooseUsSection onInquiry={handleInquiry} />
                <CreativeProcessSection />
                <PortfolioSection />
                <ContactSection initialInquiry={initialInquiry} />
            </main>
            <Footer />
        </>
    );
};

export default App;
