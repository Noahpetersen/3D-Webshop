import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { Link } from '@tanstack/react-router'
import heroImage from '../../assets/images/Hero.png'

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-reveal', {
        y: '105%',
        duration: 1,
        stagger: 0.13,
        ease: 'power3.out',
        delay: 0.15,
      })
      gsap.from('.hero-sub', {
        y: 18,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
        delay: 0.75,
      })
      gsap.from('.hero-cta', {
        y: 18,
        opacity: 0,
        duration: 0.7,
        ease: 'power2.out',
        delay: 1.0,
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="relative h-full overflow-hidden">
      {/* Full-bleed background image */}
      <img
        src={heroImage}
        alt="Bike wheel"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* Left gradient overlay for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />

      {/* Left-side text content */}
      <div className="relative h-full flex flex-col justify-center px-16 xl:px-24 overflow-hidden ml-20">
        <h1 className="text-7xl font-bold tracking-tight text-white leading-[1.05]">
          <div className="overflow-hidden">
            <span className="hero-reveal block">Your Ride.</span>
          </div>
          <div className="overflow-hidden mt-2">
            <span className="hero-reveal block">Your Rules.</span>
          </div>
        </h1>

        <p className="hero-sub mt-8 text-sm text-white/60 max-w-xs leading-relaxed">
          Premium 3D printed cycling components, configured to your exact material, color, and tolerance.
        </p>

        <div className="hero-cta mt-10">
          <Link
            to="/products"
            className="inline-block bg-white text-neutral-950 font-semibold text-sm px-8 py-4 rounded-full hover:bg-zinc-900 hover:text-white transition-colors duration-300 hover:scale-[1.02]"
          >
            Browse bikes
          </Link>
        </div>
      </div>
    </div>
  )
}
