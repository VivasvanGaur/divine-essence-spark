
import { useEffect, useState } from 'react';

const CursorEffect = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVisible, setCursorVisible] = useState(false);
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; size: number; opacity: number; }[]>([]);
  const [nextParticleId, setNextParticleId] = useState(0);

  useEffect(() => {
    // Only initialize on client-side to avoid SSR issues
    if (typeof window === 'undefined') return;

    // Update mouse position
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!cursorVisible) setCursorVisible(true);
    };

    // Handle mouse leave
    const handleMouseLeave = () => {
      setCursorVisible(false);
    };

    // Handle mouse enter
    const handleMouseEnter = () => {
      setCursorVisible(true);
    };

    // Add event listeners
    window.addEventListener('mousemove', updateMousePosition);
    document.body.addEventListener('mouseleave', handleMouseLeave);
    document.body.addEventListener('mouseenter', handleMouseEnter);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [cursorVisible]);

  // Create particles
  useEffect(() => {
    if (!cursorVisible) return;

    const createParticle = () => {
      // Random offset around the cursor
      const offset = {
        x: (Math.random() - 0.5) * 20,
        y: (Math.random() - 0.5) * 20,
      };

      // Create particle
      const newParticle = {
        id: nextParticleId,
        x: mousePosition.x + offset.x,
        y: mousePosition.y + offset.y,
        size: Math.random() * 5 + 2, // Size between 2-7px
        opacity: Math.random() * 0.5 + 0.5, // Opacity between 0.5-1
      };

      // Update state
      setParticles(prev => [...prev, newParticle]);
      setNextParticleId(prev => prev + 1);

      // Remove particle after 1 second
      setTimeout(() => {
        setParticles(prev => prev.filter(p => p.id !== newParticle.id));
      }, 1000);
    };

    // Create a particle every 50ms
    const intervalId = setInterval(createParticle, 50);

    // Cleanup
    return () => clearInterval(intervalId);
  }, [cursorVisible, mousePosition, nextParticleId]);

  // If not visible, don't render anything
  if (!cursorVisible) return null;

  return (
    <div className="cursor-dot" aria-hidden="true">
      {particles.map(particle => (
        <div
          key={particle.id}
          className="cursor-dot-particle"
          style={{
            left: particle.x,
            top: particle.y,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity,
            boxShadow: `0 0 ${particle.size * 2}px rgba(234, 197, 79, ${particle.opacity})`,
          }}
        />
      ))}
    </div>
  );
};

export default CursorEffect;
