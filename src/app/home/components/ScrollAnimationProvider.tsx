'use client';

import { useEffect } from 'react';

export default function ScrollAnimationProvider() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            if (el.classList.contains('reveal-hidden')) {
              el.classList.remove('reveal-hidden');
              el.classList.add('reveal-visible');
            }
            if (el.classList.contains('reveal-hidden-left')) {
              el.classList.remove('reveal-hidden-left');
              el.classList.add('reveal-visible-left');
            }
            // Stagger children
            const children = el.querySelectorAll('[data-stagger]');
            children.forEach((child, i) => {
              const c = child as HTMLElement;
              c.style.transitionDelay = `${i * 100}ms`;
              c.classList.remove('reveal-hidden');
              c.classList.add('reveal-visible');
            });
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );

    const targets = document.querySelectorAll(
      '.reveal-hidden, .reveal-hidden-left, [data-observe]'
    );
    targets.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return null;
}
