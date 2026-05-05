// ============================================================
// PHYTONATUS — assets/js/main.js
// GSAP · Lenis · Cursor Custom · Shared behaviors
// ============================================================

// ── CDN libs loaded via HTML: GSAP, ScrollTrigger, Lenis ─

document.addEventListener('DOMContentLoaded', () => {

    // ── Preloader ─────────────────────────────────────────
    const preloader = document.getElementById('preloader');
    const preloaderLine = document.querySelector('.preloader-line');
    if (preloader && preloaderLine) {
        setTimeout(() => { preloaderLine.style.width = '100%'; }, 100);
        setTimeout(() => { preloader.classList.add('done'); }, 1000);
    }

    // ── Lenis smooth scroll ────────────────────────────────
    let lenis;
    if (typeof Lenis !== 'undefined') {
        lenis = new Lenis({ lerp: 0.075, smooth: true });
        function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
        requestAnimationFrame(raf);
        if (typeof ScrollTrigger !== 'undefined') {
            lenis.on('scroll', ScrollTrigger.update);
            gsap.ticker.add((time) => { lenis.raf(time * 1000); });
            gsap.ticker.lagSmoothing(0);
        }
    }

    // ── Custom cursor (abelha) ─────────────────────────────
    const cursor = document.getElementById('cursor');
    const cursorDot = document.getElementById('cursor-dot');
    if (cursorDot) cursorDot.style.display = 'none';
    const isTouch = window.matchMedia('(hover: none)').matches || window.innerWidth < 760;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouch && cursor) cursor.style.display = 'none';

    if (cursor && !isTouch) {
        let cx = window.innerWidth / 2, cy = window.innerHeight / 2;
        let lastTrailX = cx, lastTrailY = cy;
        let trailLayer = null;
        if (!reduceMotion) {
            trailLayer = document.createElement('div');
            trailLayer.className = 'cursor-trail-layer';
            document.body.appendChild(trailLayer);
        }

        window.addEventListener('mousemove', e => {
            cx = e.clientX; cy = e.clientY;
            if (!trailLayer) return;
            const dx = cx - lastTrailX, dy = cy - lastTrailY;
            if (dx * dx + dy * dy > 4500) {
                spawnTrailDot(cx, cy);
                lastTrailX = cx; lastTrailY = cy;
            }
        }, { passive: true });

        function spawnTrailDot(x, y) {
            const dot = document.createElement('span');
            dot.className = 'cursor-trail-dot';
            dot.style.left = x + 'px';
            dot.style.top = y + 'px';
            trailLayer.appendChild(dot);
            requestAnimationFrame(() => dot.classList.add('fade'));
            setTimeout(() => dot.remove(), 900);
        }

        (function animateCursor() {
            const rect = cursor.getBoundingClientRect();
            const curX = rect.left + rect.width / 2;
            const curY = rect.top + rect.height / 2;
            const x = curX + (cx - curX) * 0.18;
            const y = curY + (cy - curY) * 0.18;
            cursor.style.left = x + 'px';
            cursor.style.top  = y + 'px';
            requestAnimationFrame(animateCursor);
        })();
        document.querySelectorAll('a, button, [data-hover]').forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
        });
    }

    // ── Header behaviors ──────────────────────────────────
    const header = document.getElementById('header');
    if (header) {
        const isLightPage = document.body.classList.contains('page-light');
        function updateHeader() {
            const scrolled = window.scrollY > 60;
            if (isLightPage) {
                header.classList.toggle('light', scrolled);
            } else {
                header.classList.toggle('scrolled', scrolled);
            }
        }
        window.addEventListener('scroll', updateHeader, { passive: true });
        updateHeader();
    }

    // ── Mobile menu ────────────────────────────────────────
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');
    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('open');
            mobileMenu.classList.toggle('open');
            document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
        });
        mobileMenu.querySelectorAll('a').forEach(a => {
            a.addEventListener('click', () => {
                hamburger.classList.remove('open');
                mobileMenu.classList.remove('open');
                document.body.style.overflow = '';
            });
        });
    }

    // ── GSAP Animations ───────────────────────────────────
    if (typeof gsap === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    // Hero title reveal (line by line)
    const heroLines = document.querySelectorAll('.hero-title .reveal-inner');
    if (heroLines.length) {
        gsap.set(heroLines, { yPercent: 110, rotate: 1 });
        gsap.to(heroLines, {
            yPercent: 0, rotate: 0, duration: 1.1, ease: 'expo.out',
            stagger: 0.12, delay: 1.4
        });
    }

    // Hero cinematic — sequência italic (sobe escalonada, vem ANTES do título)
    const tagInners = document.querySelectorAll('.hero-tag-sequence .tag-inner');
    if (tagInners.length) {
        gsap.set(tagInners, { yPercent: 110 });
        gsap.to(tagInners, {
            yPercent: 0, duration: 1.0, ease: 'expo.out',
            stagger: 0.18, delay: 0.8
        });
    }

    // Hero PROTAGONIST — line-inners do display gigante
    const heroDisplayLines = document.querySelectorAll('.hero-display .line-inner');
    if (heroDisplayLines.length) {
        gsap.set(heroDisplayLines, { yPercent: 110 });
        gsap.to(heroDisplayLines, {
            yPercent: 0, duration: 1.2, ease: 'expo.out',
            stagger: 0.12, delay: 1.1
        });
    }
    const protagEyebrow = document.querySelector('.hero-protagonist .hero-eyebrow');
    if (protagEyebrow) {
        gsap.from(protagEyebrow, { opacity: 0, x: -16, duration: 0.9, delay: 0.7, ease: 'power3.out' });
    }
    const heroPlate = document.querySelector('.hero-protagonist .hero-plate');
    if (heroPlate) {
        gsap.from(heroPlate, {
            scale: 1.15, opacity: 0,
            duration: 1.6, ease: 'expo.out',
            delay: 1.4
        });
    }
    const heroBottomLine = document.querySelector('.hero-protagonist .hero-bottom-line');
    if (heroBottomLine) {
        gsap.from(heroBottomLine, { opacity: 0, y: 18, duration: 1, delay: 2.4, ease: 'power3.out' });
    }

    // Year theatre — bg num parallax + h2 reveal
    const yearBgNum = document.querySelector('.year-theatre-bg .bg-num');
    if (yearBgNum && typeof ScrollTrigger !== 'undefined') {
        gsap.to(yearBgNum, {
            xPercent: -8,
            ease: 'none',
            scrollTrigger: {
                trigger: '.year-theatre',
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1
            }
        });
    }

    // Hero display number (1999—2026) — fade-in + slight scale após o título
    const heroDisplayNum = document.querySelector('.hero-display-num .reveal-inner');
    if (heroDisplayNum) {
        gsap.set(heroDisplayNum, { yPercent: 100, opacity: 0 });
        gsap.to(heroDisplayNum, {
            yPercent: 0, opacity: 1, duration: 1.4, ease: 'expo.out',
            delay: 2.2
        });
    }

    // Botanical corners — fade in suave
    document.querySelectorAll('.botanical-corner').forEach(el => {
        gsap.from(el, {
            opacity: 0, scale: 0.85,
            duration: 1.6, ease: 'power3.out',
            delay: 1.6
        });
    });


    // Hero footer fade
    const heroFooter = document.querySelector('.hero-footer');
    if (heroFooter) {
        gsap.fromTo(heroFooter,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: 1.5 }
        );
    }

    // Hero eyebrow
    const heroEyebrow = document.querySelector('.hero-eyebrow');
    if (heroEyebrow) {
        gsap.fromTo(heroEyebrow,
            { opacity: 0, x: -16 },
            { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out', delay: 0.6 }
        );
    }

    // Generic fade-in on scroll
    document.querySelectorAll('.fade-in').forEach(el => {
        gsap.to(el, {
            scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
            opacity: 1, y: 0, duration: 0.9, ease: 'power3.out'
        });
    });

    // Clip reveal (horizontal)
    document.querySelectorAll('.clip-reveal').forEach(el => {
        gsap.to(el, {
            scrollTrigger: { trigger: el, start: 'top 88%' },
            clipPath: 'inset(0 0% 0 0)', duration: 1.1, ease: 'expo.out'
        });
    });

    // Stagger children
    document.querySelectorAll('[data-stagger]').forEach(parent => {
        const children = parent.children;
        gsap.fromTo(children,
            { opacity: 0, y: 30 },
            {
                scrollTrigger: { trigger: parent, start: 'top 82%' },
                opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
                stagger: parseFloat(parent.dataset.stagger) || 0.1
            }
        );
    });

    // Section eyebrows slide in
    document.querySelectorAll('.section-eyebrow').forEach(el => {
        gsap.fromTo(el,
            { opacity: 0, x: -20 },
            {
                scrollTrigger: { trigger: el, start: 'top 90%' },
                opacity: 1, x: 0, duration: 0.7, ease: 'power3.out'
            }
        );
    });

    // Animated counters
    document.querySelectorAll('[data-count]').forEach(el => {
        const target = parseFloat(el.dataset.count);
        const suffix = el.dataset.suffix || '';
        const prefix = el.dataset.prefix || '';
        const decimals = el.dataset.decimals || 0;
        ScrollTrigger.create({
            trigger: el,
            start: 'top 85%',
            once: true,
            onEnter: () => {
                gsap.to({ val: 0 }, {
                    val: target,
                    duration: 1.8,
                    ease: 'power2.out',
                    onUpdate: function () {
                        el.textContent = prefix + parseFloat(this.targets()[0].val).toFixed(decimals) + suffix;
                    }
                });
            }
        });
    });

    // Parallax for brand images
    document.querySelectorAll('[data-parallax]').forEach(el => {
        const speed = parseFloat(el.dataset.parallax) || 0.15;
        gsap.to(el, {
            yPercent: speed * 100,
            ease: 'none',
            scrollTrigger: { trigger: el.parentElement, scrub: true }
        });
    });

    // ── Contact form tabs ─────────────────────────────────
    document.querySelectorAll('.dest-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.dest-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            const hidden = document.getElementById('dest-hidden');
            if (hidden) hidden.value = tab.dataset.dest;
        });
    });

    // ── Contact form submit ───────────────────────────────
    const BRAND_GREEN = '#009A44';

    function setupFormSubmit(formId) {
        const form = document.getElementById(formId);
        if (!form) return;
        form.addEventListener('submit', e => {
            e.preventDefault();
            const btn = form.querySelector('.btn-submit-full');
            const original = btn.textContent;
            btn.textContent = '✓ Mensagem enviada!';
            btn.style.background = BRAND_GREEN;
            btn.style.borderColor = BRAND_GREEN;
            setTimeout(() => {
                btn.textContent = original;
                btn.style.background = '';
                btn.style.borderColor = '';
                form.reset();
            }, 4000);
        });
    }

    setupFormSubmit('contact-form');
    setupFormSubmit('footer-contact-form');
    setupFormSubmit('footer-contact-form-marcas');
    setupFormSubmit('footer-contact-form-clientes');
    setupFormSubmit('footer-contact-form-pl');
    setupFormSubmit('footer-contact-form-contato');


    // ── File attachment ───────────────────────────────────
    const fileInput = document.getElementById('attach');
    const fileLabel = document.getElementById('attach-label');
    if (fileInput && fileLabel) {
        fileInput.addEventListener('change', () => {
            fileLabel.textContent = fileInput.files[0]?.name || 'Anexar arquivo (PDF, imagem, DOC)';
        });
    }

    // ── Magnetic hover (atração ao cursor em CTAs) ────────
    if (!isTouch && !reduceMotion) {
        document.querySelectorAll('.magnetic').forEach(el => {
            const strength = parseFloat(el.dataset.magnetic) || 0.35;
            el.addEventListener('mousemove', e => {
                const r = el.getBoundingClientRect();
                const x = e.clientX - (r.left + r.width / 2);
                const y = e.clientY - (r.top + r.height / 2);
                gsap.to(el, { x: x * strength, y: y * strength, duration: 0.5, ease: 'power3.out' });
            });
            el.addEventListener('mouseleave', () => {
                gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.6)' });
            });
        });
    }

    // ── Cursor 3 estados (idle / hover / pressed) ─────────
    if (cursor && !isTouch) {
        document.addEventListener('mousedown', () => cursor.classList.add('cursor-pressed'));
        document.addEventListener('mouseup',   () => cursor.classList.remove('cursor-pressed'));
        // Hover em campos de texto: cursor vira "I-beam"
        document.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], textarea').forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('cursor-text'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('cursor-text'));
        });
    }

    // ── Scene-pin activator (marcas.html) ─────────────────
    const scenes = document.querySelectorAll('.scene-pin');
    if (scenes.length && 'IntersectionObserver' in window) {
        const sceneObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-active');
                } else {
                    entry.target.classList.remove('is-active');
                }
            });
        }, { threshold: 0.35 });
        scenes.forEach(s => sceneObserver.observe(s));

        // Animação de entrada por cena (logo → tagline → body → chips)
        scenes.forEach(scene => {
            const logo = scene.querySelector('.scene-logo');
            const tagline = scene.querySelector('.scene-tagline');
            const body = scene.querySelector('.scene-body');
            const chips = scene.querySelectorAll('.scene-chips .product-chip');
            const button = scene.querySelector('.brand-block-actions');
            const counter = scene.querySelector('.scene-counter');
            const items = [counter, logo, tagline, body, ...chips, button].filter(Boolean);
            gsap.set(items, { opacity: 0, y: 24 });
            gsap.to(items, {
                scrollTrigger: { trigger: scene, start: 'top 70%' },
                opacity: 1, y: 0,
                duration: 0.85,
                ease: 'power3.out',
                stagger: 0.07
            });
        });
    }

    // ════════════════════════════════════════════════════════
    // CINEMATIC MAXIMALIST — R1 → R6
    // ════════════════════════════════════════════════════════

    // ── R1: Canvas particles (mel subindo) no hero ─────────
    const heroParticles = document.querySelector('.hero-particles');
    if (heroParticles && !reduceMotion) {
        const canvas = document.createElement('canvas');
        heroParticles.appendChild(canvas);
        const ctx = canvas.getContext('2d');
        const dpr = window.devicePixelRatio || 1;
        let particles = [];
        let raf;
        const resize = () => {
            canvas.width  = heroParticles.clientWidth  * dpr;
            canvas.height = heroParticles.clientHeight * dpr;
            canvas.style.width  = heroParticles.clientWidth  + 'px';
            canvas.style.height = heroParticles.clientHeight + 'px';
            ctx.scale(dpr, dpr);
        };
        resize();
        window.addEventListener('resize', () => { resize(); seedParticles(); }, { passive: true });

        function seedParticles() {
            const w = heroParticles.clientWidth, h = heroParticles.clientHeight;
            particles = Array.from({ length: Math.floor(w / 22) }, () => ({
                x: Math.random() * w,
                y: h + Math.random() * h,
                r: 1 + Math.random() * 2.6,
                vy: -0.25 - Math.random() * 0.6,
                vx: (Math.random() - 0.5) * 0.18,
                hue: 38 + Math.random() * 18,
                alpha: 0.35 + Math.random() * 0.4,
                phase: Math.random() * Math.PI * 2
            }));
        }
        seedParticles();

        function tick(t) {
            const w = heroParticles.clientWidth, h = heroParticles.clientHeight;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.y += p.vy;
                p.x += p.vx + Math.sin((t / 1400) + p.phase) * 0.18;
                if (p.y < -10) { p.y = h + 10; p.x = Math.random() * w; }
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = `hsla(${p.hue}, 90%, 60%, ${p.alpha})`;
                ctx.shadowBlur = 12;
                ctx.shadowColor = `hsla(${p.hue}, 90%, 60%, 0.8)`;
                ctx.fill();
            });
            raf = requestAnimationFrame(tick);
        }
        tick(0);

        document.addEventListener('visibilitychange', () => {
            if (document.hidden) cancelAnimationFrame(raf);
            else tick(0);
        });
    }

    // ── R1: Number morph 1999 → 2026 (scrubbado pelo scroll) ─
    const heroDisplayWrap = document.querySelector('.hero-display-num');
    if (heroDisplayWrap && typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.create({
            trigger: heroDisplayWrap,
            start: 'top top',
            end: '+=500',
            scrub: 0.8,
            onUpdate: (self) => {
                if (self.progress > 0.5) heroDisplayWrap.classList.add('is-2026');
                else heroDisplayWrap.classList.remove('is-2026');
            }
        });
    }

    // ── Marcas HORIZONTAL pin scroll (radical rewrite) ────
    const horizSection = document.querySelector('.scenes-horizontal');
    const horizTrack = document.querySelector('.scenes-horizontal-track');
    if (horizSection && horizTrack && window.innerWidth > 960 && typeof ScrollTrigger !== 'undefined') {
        const sceneItems = horizTrack.querySelectorAll('.scene-h');
        // Total scroll horizontal = (n - 1) viewport widths
        const horizonScroll = () => (sceneItems.length - 1) * window.innerWidth;

        gsap.to(horizTrack, {
            x: () => -horizonScroll(),
            ease: 'none',
            scrollTrigger: {
                trigger: horizSection,
                start: 'top top',
                end: () => '+=' + horizonScroll(),
                pin: true,
                scrub: 1,
                anticipatePin: 1,
                invalidateOnRefresh: true
            }
        });

        // Reveal staged dentro de cada scene-h conforme entra
        // (a primeira cena já está em viewport no load — animar imediatamente)
        sceneItems.forEach((scene, idx) => {
            const els = scene.querySelectorAll('.scene-h-counter, .scene-h-logo, .scene-h-tagline, .scene-h-body, .scene-h-chips, .btn');
            gsap.set(els, { opacity: 0, y: 40 });

            if (idx === 0) {
                // Cena 01: dispara no load com pequeno delay pós-preloader
                gsap.to(els, {
                    opacity: 1, y: 0,
                    duration: 0.95, stagger: 0.08, ease: 'expo.out',
                    delay: 1.0
                });
            }

            // Cenas seguintes (e refresh visual da primeira em onEnterBack) via ScrollTrigger
            ScrollTrigger.create({
                trigger: scene,
                containerAnimation: ScrollTrigger.getAll().find(t => t.vars.trigger === horizSection),
                start: 'left center',
                end: 'right center',
                onEnter: () => gsap.to(els, { opacity: 1, y: 0, duration: 0.85, stagger: 0.07, ease: 'expo.out' }),
                onEnterBack: () => gsap.to(els, { opacity: 1, y: 0, duration: 0.85, stagger: 0.07, ease: 'expo.out' }),
                onLeave: () => gsap.to(els, { opacity: 0.35, duration: 0.4 }),
                onLeaveBack: () => gsap.to(els, { opacity: 0.35, duration: 0.4 })
            });
        });
    } else if (horizSection && horizTrack && window.innerWidth <= 960) {
        // Mobile: scroll vertical empilhado, garantir tudo visível imediatamente
        horizTrack.querySelectorAll('.scene-h-counter, .scene-h-logo, .scene-h-tagline, .scene-h-body, .scene-h-chips, .btn')
            .forEach(el => { el.style.opacity = '1'; });
    }

    // ── R2: Marcas — REAL GSAP PIN (cada cena pinada) ──────
    const realScenes = document.querySelectorAll('.scene-pin');
    if (realScenes.length && typeof ScrollTrigger !== 'undefined' && window.innerWidth > 960) {
        // Color body shift conforme cena ativa (R6)
        const sceneColors = {
            'scene-mel'    : '#FFF8C5',
            'scene-nuts'   : '#F5EFDC',
            'scene-phyto'  : '#FFF6DC',
            'scene-gourmet': '#FAF3DD'
        };

        realScenes.forEach((scene, idx) => {
            ScrollTrigger.create({
                trigger: scene,
                start: 'top top',
                end: '+=80%',
                onEnter: () => {
                    scene.classList.add('is-active');
                    const tone = Object.keys(sceneColors).find(k => scene.classList.contains(k));
                    if (tone) document.body.style.backgroundColor = sceneColors[tone];
                },
                onEnterBack: () => {
                    scene.classList.add('is-active');
                    const tone = Object.keys(sceneColors).find(k => scene.classList.contains(k));
                    if (tone) document.body.style.backgroundColor = sceneColors[tone];
                },
                onLeave: () => { /* mantém a is-active enquanto não entra outra */ },
                onLeaveBack: () => scene.classList.remove('is-active')
            });
        });

        // Reset background quando sair completamente do bloco de cenas
        const sceneStack = document.querySelector('.scene-stack');
        if (sceneStack) {
            ScrollTrigger.create({
                trigger: sceneStack,
                start: 'top bottom',
                end: 'bottom top',
                onLeave: () => { document.body.style.backgroundColor = ''; },
                onLeaveBack: () => { document.body.style.backgroundColor = ''; }
            });
        }
    }

    // ── R2: 3D Tilt nos logos das cenas ────────────────────
    if (!isTouch && !reduceMotion) {
        document.querySelectorAll('.scene-pin').forEach(scene => {
            const logo = scene.querySelector('.scene-logo');
            if (!logo) return;
            scene.addEventListener('mousemove', e => {
                const r = scene.getBoundingClientRect();
                const cx = e.clientX - (r.left + r.width / 2);
                const cy = e.clientY - (r.top + r.height / 2);
                const rx = (cy / r.height) * -10;
                const ry = (cx / r.width)  *  10;
                logo.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(20px)`;
            });
            scene.addEventListener('mouseleave', () => {
                logo.style.transform = '';
            });
        });
    }

    // ── R3: Bee mascot following cursor (lag) ───────────────
    if (!isTouch && !reduceMotion) {
        const bee = document.createElement('div');
        bee.className = 'bee-mascot';
        bee.innerHTML = `
            <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
              <ellipse class="wing wing-l" cx="22" cy="22" rx="11" ry="6" fill="rgba(255,255,255,0.78)" stroke="rgba(74,37,20,0.45)" stroke-width="1"/>
              <ellipse class="wing wing-r" cx="42" cy="22" rx="11" ry="6" fill="rgba(255,255,255,0.78)" stroke="rgba(74,37,20,0.45)" stroke-width="1"/>
              <ellipse cx="32" cy="36" rx="14" ry="18" fill="#F1B500" stroke="#4A2514" stroke-width="2"/>
              <rect x="22" y="30" width="20" height="4" rx="2" fill="#4A2514" opacity="0.7"/>
              <rect x="22" y="38" width="20" height="4" rx="2" fill="#4A2514" opacity="0.7"/>
              <rect x="22" y="46" width="20" height="4" rx="2" fill="#4A2514" opacity="0.55"/>
              <ellipse cx="32" cy="20" rx="8" ry="7" fill="#4A2514"/>
              <circle cx="29" cy="19" r="1.6" fill="#fff"/>
              <circle cx="35" cy="19" r="1.6" fill="#fff"/>
            </svg>`;
        document.body.appendChild(bee);
        let bx = window.innerWidth / 2, by = window.innerHeight / 2;
        let lx = bx, ly = by;
        let mx = bx, my = by;
        window.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; }, { passive: true });
        (function flyBee() {
            // segue com lag maior que o cursor (sensação de mascote)
            bx += (mx + 60 - bx) * 0.04;
            by += (my - 80 - by) * 0.04;
            const dx = bx - lx, dy = by - ly;
            const angle = Math.atan2(dy, dx) * (180 / Math.PI);
            lx = bx; ly = by;
            bee.style.transform = `translate(${bx - 28}px, ${by - 28}px) rotate(${angle * 0.4}deg)`;
            requestAnimationFrame(flyBee);
        })();
    }

    // ── R3: Honey drops periódicos no hero ──────────────────
    const heroDropZone = document.querySelector('.hero-cinematic');
    if (heroDropZone && !reduceMotion) {
        function spawnDrop() {
            const drop = document.createElement('div');
            drop.className = 'honey-drop drip';
            drop.innerHTML = `<svg viewBox="0 0 28 38"><path d="M14 2 C14 14, 26 22, 26 28 A12 12 0 1 1 2 28 C2 22, 14 14, 14 2Z" fill="#F1B500" fill-opacity="0.85" stroke="rgba(74,37,20,0.4)" stroke-width="1"/></svg>`;
            drop.style.left = (10 + Math.random() * 80) + '%';
            drop.style.top  = '0';
            heroDropZone.appendChild(drop);
            setTimeout(() => drop.remove(), 1700);
        }
        let dropTimer = setInterval(spawnDrop, 3200);
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) clearInterval(dropTimer);
            else dropTimer = setInterval(spawnDrop, 3200);
        });
    }

    // ── R4: Tilt 3D nas brand-cards (home) e loja-cards ────
    if (!isTouch && !reduceMotion) {
        document.querySelectorAll('.brand-card, .loja-card').forEach(card => {
            card.classList.add('tilt-card');
            const shine = document.createElement('div');
            shine.className = 'tilt-card-shine';
            card.appendChild(shine);
            card.addEventListener('mousemove', e => {
                const r = card.getBoundingClientRect();
                const px = (e.clientX - r.left) / r.width;
                const py = (e.clientY - r.top)  / r.height;
                const rx = (py - 0.5) * -12;
                const ry = (px - 0.5) *  12;
                card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(8px)`;
                shine.style.setProperty('--mx', (px * 100) + '%');
                shine.style.setProperty('--my', (py * 100) + '%');
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
        });
    }

    // ── R4: Diagonal reveal observer ────────────────────────
    const diagEls = document.querySelectorAll('.diag-reveal');
    if (diagEls.length && 'IntersectionObserver' in window) {
        const diagObserver = new IntersectionObserver(entries => {
            entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('is-revealed'); });
        }, { threshold: 0.2 });
        diagEls.forEach(el => diagObserver.observe(el));
    }

    // ── R4: SVG line drawing on scroll ──────────────────────
    const lineEls = document.querySelectorAll('.line-draw');
    if (lineEls.length && 'IntersectionObserver' in window) {
        const lineObserver = new IntersectionObserver(entries => {
            entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('is-drawn'); });
        }, { threshold: 0.4 });
        lineEls.forEach(el => lineObserver.observe(el));
    }

    // ── R5: Scroll progress line ───────────────────────────
    const progressBar = document.querySelector('.scroll-progress-bar');
    if (progressBar) {
        const updateProgress = () => {
            const docH = document.documentElement.scrollHeight - window.innerHeight;
            const p = Math.min(1, Math.max(0, window.scrollY / docH));
            progressBar.style.height = (p * 100) + '%';
        };
        window.addEventListener('scroll', updateProgress, { passive: true });
        updateProgress();
    }

    // ── R5: Section indicators (vertical dots) ──────────────
    const indicatorBox = document.querySelector('.section-indicators');
    if (indicatorBox && typeof ScrollTrigger !== 'undefined') {
        const targets = document.querySelectorAll('[data-indicator]');
        targets.forEach((sec, i) => {
            const dot = document.createElement('button');
            dot.setAttribute('aria-label', `Ir para seção ${i+1}`);
            const label = sec.getAttribute('data-indicator');
            if (label) dot.dataset.label = label;
            dot.addEventListener('click', () => {
                if (lenis) lenis.scrollTo(sec, { offset: -80 });
                else sec.scrollIntoView({ behavior: 'smooth' });
            });
            indicatorBox.appendChild(dot);
            ScrollTrigger.create({
                trigger: sec,
                start: 'top 50%',
                end: 'bottom 50%',
                onToggle: self => dot.classList.toggle('is-active', self.isActive)
            });
        });
    }

    // ── R5: Ripple effect em todos os botões ────────────────
    document.querySelectorAll('.btn, .nav-shop-cta, .btn-submit-full').forEach(btn => {
        btn.classList.add('ripple-host');
        btn.addEventListener('click', e => {
            const r = btn.getBoundingClientRect();
            const rip = document.createElement('span');
            rip.className = 'ripple';
            rip.style.left = (e.clientX - r.left) + 'px';
            rip.style.top  = (e.clientY - r.top) + 'px';
            rip.style.width = rip.style.height = Math.max(r.width, r.height) + 'px';
            btn.appendChild(rip);
            setTimeout(() => rip.remove(), 700);
        });
    });

    // ── R5: Cursor 5 estados (link + shop) ──────────────────
    if (cursor && !isTouch) {
        document.querySelectorAll('a:not(.nav-shop-cta), button:not(.nav-shop-cta)').forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('cursor-link'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('cursor-link'));
        });
        document.querySelectorAll('.nav-shop-cta, .loja-card').forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('cursor-shop'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('cursor-shop'));
        });
    }

    // ── R5: Page transition curtain (entre páginas) ────────
    const curtain = document.querySelector('.page-curtain');
    if (curtain) {
        document.querySelectorAll('a[href]').forEach(a => {
            const href = a.getAttribute('href');
            if (!href) return;
            // Apenas links internos .html
            if (!href.match(/\.html(#.*)?$/) || href.startsWith('http')) return;
            if (a.target === '_blank') return;
            a.addEventListener('click', e => {
                e.preventDefault();
                curtain.classList.add('in');
                setTimeout(() => { window.location.href = href; }, 650);
            });
        });
        // Saída ao chegar
        window.addEventListener('pageshow', () => curtain.classList.remove('in'));
    }

    // ── Smooth anchor scroll ──────────────────────────────
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', e => {
            const id = link.getAttribute('href').slice(1);
            const target = document.getElementById(id);
            if (target) {
                e.preventDefault();
                if (lenis) { lenis.scrollTo(target, { offset: -80 }); }
                else { target.scrollIntoView({ behavior: 'smooth' }); }
            }
        });
    });

});
