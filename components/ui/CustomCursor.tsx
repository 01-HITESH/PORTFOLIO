"use client";

import { useEffect, useRef } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = `${mouseX}px`;
      dot.style.top = `${mouseY}px`;
    };

    const animate = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      ring.style.left = `${ringX}px`;
      ring.style.top = `${ringY}px`;
      requestAnimationFrame(animate);
    };

    const onMouseEnterLink = () => {
      dot.style.transform = "translate(-50%, -50%) scale(2)";
      ring.style.transform = "translate(-50%, -50%) scale(1.5)";
      ring.style.borderColor = "var(--accent)";
      ring.style.opacity = "0.6";
    };

    const onMouseLeaveLink = () => {
      dot.style.transform = "translate(-50%, -50%) scale(1)";
      ring.style.transform = "translate(-50%, -50%) scale(1)";
      ring.style.borderColor = "rgba(255,255,255,0.3)";
      ring.style.opacity = "1";
    };

    window.addEventListener("mousemove", onMouseMove);
    animate();

    const links = document.querySelectorAll("a, button, [role='button']");
    links.forEach((el) => {
      el.addEventListener("mouseenter", onMouseEnterLink);
      el.addEventListener("mouseleave", onMouseLeaveLink);
    });

    // Hide default cursor
    document.body.style.cursor = "none";

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.body.style.cursor = "auto";
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-accent pointer-events-none z-[9999] mix-blend-difference"
        style={{
          transform: "translate(-50%, -50%)",
          transition: "transform 0.15s ease",
        }}
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9998]"
        style={{
          transform: "translate(-50%, -50%)",
          border: "1px solid rgba(255,255,255,0.3)",
          transition: "transform 0.3s ease, border-color 0.3s ease, opacity 0.3s ease",
        }}
      />
    </>
  );
}
