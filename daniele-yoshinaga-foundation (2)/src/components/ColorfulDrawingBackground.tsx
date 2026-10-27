import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';

interface DrawerBot {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  width: number;
  angle: number;
  angularSpeed: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  alpha: number;
  life: number;
  maxLife: number;
}

interface UserLineSegment {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color: string;
  width: number;
  alpha: number;
}

export default function ColorfulDrawingBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Mouse tracking
  const mouseRef = useRef({ x: 0, y: 0, lastX: 0, lastY: 0, isHovering: false });

  // Colors aligned with Daniele Yoshinaga Foundation brand (spiritual Gold, Indigo, Sky Blue, Magenta Joy)
  const COLORS = [
    '#38bdf8', // Sky blue
    '#f43f5e', // Rose/Magenta
    '#fbbf24', // Sunny Amber
    '#34d399', // Emerald Joy
    '#818cf8', // Indigo light
  ];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Set up ResizeObserver to size canvas accurately
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        setDimensions({ width, height });
      }
    });

    resizeObserver.observe(container);

    // Get initial bounding rect
    const rect = container.getBoundingClientRect();
    setDimensions({ width: rect.width, height: rect.height });

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    // Handle high DPI screens
    const dpr = window.devicePixelRatio || 1;
    canvas.width = dimensions.width * dpr;
    canvas.height = dimensions.height * dpr;
    ctx.scale(dpr, dpr);

    // Fill background initially empty (dark slate matches #0f172a)
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, dimensions.width, dimensions.height);

    // Initialize Auto-drawing wanderer bots
    const bots: DrawerBot[] = [];
    const botCount = Math.max(3, Math.min(5, Math.floor(dimensions.width / 350)));

    for (let i = 0; i < botCount; i++) {
      bots.push({
        x: Math.random() * dimensions.width,
        y: Math.random() * dimensions.height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        color: COLORS[i % COLORS.length],
        width: 1.2 + Math.random() * 1.5,
        angle: Math.random() * Math.PI * 2,
        angularSpeed: (Math.random() - 0.5) * 0.04,
      });
    }

    // Interactive user drawing lines segment queue (fades out)
    let userSegments: UserLineSegment[] = [];
    let particles: Particle[] = [];

    let animationId: number;

    const tick = () => {
      // Create a long exposure alpha-erase trail for that glowing drawn style
      ctx.fillStyle = 'rgba(15, 23, 42, 0.08)'; // #0f172a with transparency
      ctx.fillRect(0, 0, dimensions.width, dimensions.height);

      // Render & update automatic background drawer bots
      bots.forEach((bot) => {
        // Dynamic wander navigation behavior (sine & noise-like steering)
        bot.angle += bot.angularSpeed;
        if (Math.random() < 0.03) {
          bot.angularSpeed = (Math.random() - 0.5) * 0.06;
        }

        const speed = 1.0 + Math.random() * 0.8;
        bot.vx = Math.cos(bot.angle) * speed;
        bot.vy = Math.sin(bot.angle) * speed;

        const prevX = bot.x;
        const prevY = bot.y;

        bot.x += bot.vx;
        bot.y += bot.vy;

        // Soft bounce boundaries with smooth wrapping/turning
        if (bot.x < -10 || bot.x > dimensions.width + 10 || bot.y < -10 || bot.y > dimensions.height + 10) {
          bot.angle = Math.atan2(dimensions.height / 2 - bot.y, dimensions.width / 2 - bot.x) + (Math.random() - 0.5) * 1.5;
          bot.x = Math.max(0, Math.min(dimensions.width, bot.x));
          bot.y = Math.max(0, Math.min(dimensions.height, bot.y));
        }

        // Draw the auto ribbon segment with a nice outer neon glow
        ctx.beginPath();
        ctx.moveTo(prevX, prevY);
        ctx.lineTo(bot.x, bot.y);
        ctx.strokeStyle = bot.color;
        ctx.lineWidth = bot.width;
        ctx.lineCap = 'round';
        
        ctx.shadowBlur = 10;
        ctx.shadowColor = bot.color;
        ctx.stroke();
        ctx.shadowBlur = 0; // reset for performance

        // Occasionally emit tiny light sparks
        if (Math.random() < 0.05) {
          particles.push({
            x: bot.x,
            y: bot.y,
            vx: (Math.random() - 0.5) * 1,
            vy: (Math.random() - 0.5) * 1,
            color: bot.color,
            size: 1 + Math.random() * 1.5,
            alpha: 1,
            life: 0,
            maxLife: 30 + Math.random() * 25,
          });
        }
      });

      // Handle user mouse/touch drawing trails
      const mouse = mouseRef.current;
      if (mouse.isHovering) {
        const dx = mouse.x - mouse.lastX;
        const dy = mouse.y - mouse.lastY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // If the user's cursor moved, draw colorful trace sparks
        if (distance > 1) {
          const colorSelector = COLORS[Math.floor(Date.now() / 330) % COLORS.length];
          
          userSegments.push({
            x1: mouse.lastX,
            y1: mouse.lastY,
            x2: mouse.x,
            y2: mouse.y,
            color: colorSelector,
            width: 3.5,
            alpha: 1.0,
          });

          // Generate spark burst along the drawn path
          const sparkCount = Math.min(3, Math.floor(distance / 4) + 1);
          for (let k = 0; k < sparkCount; k++) {
            const ratio = k / sparkCount;
            const midX = mouse.lastX + dx * ratio;
            const midY = mouse.lastY + dy * ratio;

            particles.push({
              x: midX,
              y: midY,
              vx: (Math.random() - 0.5) * 2.2,
              vy: (Math.random() - 0.5) * 2.2 - 0.4, // float slightly upward
              color: colorSelector,
              size: 1.5 + Math.random() * 2.0,
              alpha: 1.0,
              life: 0,
              maxLife: 40 + Math.random() * 30,
            });
          }

          // Cycle last coordinate
          mouse.lastX = mouse.x;
          mouse.lastY = mouse.y;
        }
      }

      // Draw and fade user-drawn canvas segments
      userSegments.forEach((seg) => {
        ctx.beginPath();
        ctx.moveTo(seg.x1, seg.y1);
        ctx.lineTo(seg.x2, seg.y2);
        
        ctx.strokeStyle = seg.color;
        ctx.globalAlpha = seg.alpha;
        ctx.lineWidth = seg.width;
        ctx.lineCap = 'round';
        ctx.shadowBlur = 15;
        ctx.shadowColor = seg.color;
        ctx.stroke();

        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1.0; // Reset

        // Fade segments
        seg.alpha -= 0.04;
      });

      // Filter out completed invisible segments
      userSegments = userSegments.filter((seg) => seg.alpha > 0);

      // Render particles (sparks & child-like starry speckles)
      particles.forEach((p) => {
        p.life++;
        p.x += p.vx;
        p.y += p.vy;
        
        // Slight friction and gravity float
        p.vx *= 0.98;
        p.vy *= 0.98;
        p.vy -= 0.003; // soft upward drift like smoke/dreams

        const ageRatio = p.life / p.maxLife;
        p.alpha = Math.max(0, 1 - ageRatio);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.shadowBlur = 6;
        ctx.shadowColor = p.color;
        ctx.fill();

        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1.0;
      });

      // Remove dead particles
      particles = particles.filter((p) => p.life < p.maxLife);

      animationId = requestAnimationFrame(tick);
    };

    if (dimensions.width > 0 && dimensions.height > 0) {
      animationId = requestAnimationFrame(tick);
    }

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [dimensions]);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const mouse = mouseRef.current;
    if (!mouse.isHovering) {
      mouse.lastX = x;
      mouse.lastY = y;
      mouse.isHovering = true;
    }

    mouse.x = x;
    mouse.y = y;
  };

  const handlePointerLeave = () => {
    mouseRef.current.isHovering = false;
  };

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="absolute inset-0 w-full h-full overflow-hidden pointer-events-auto"
      id="colorful-drawing-bg-container"
    >
      {/* ========================================================================= */}
      {/* VIBRANT GLOWING NEON SOLIDARITY SVG BACKGROUND BACKDROP */}
      {/* Directly replicates the design motif from the user's Solidarity picture */}
      {/* ========================================================================= */}
      <svg
        className="absolute inset-0 w-full h-full select-none pointer-events-none mix-blend-screen opacity-75"
        viewBox="0 0 800 600"
        preserveAspectRatio="xMidYMax slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Intense Neon Glow Filters */}
          <filter id="neon-glow-cyan" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="blur1" />
            <feGaussianBlur stdDeviation="15" result="blur2" />
            <feMerge>
              <feMergeNode in="blur2" />
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="neon-glow-pink" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="5" result="blur1" />
            <feGaussianBlur stdDeviation="12" result="blur2" />
            <feMerge>
              <feMergeNode in="blur2" />
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="neon-glow-gold" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur1" />
            <feGaussianBlur stdDeviation="10" result="blur2" />
            <feMerge>
              <feMergeNode in="blur2" />
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="neon-glow-green" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur1" />
            <feGaussianBlur stdDeviation="10" result="blur2" />
            <feMerge>
              <feMergeNode in="blur2" />
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* 1. PEACE DOVE / BIRD FLYING ABOVE THE HANDS (Top Center, Glowing Pink-White) */}
        <motion.g
          animate={{
            y: [0, -12, 0],
            rotate: [0, -1.5, 1.5, 0],
          }}
          transition={{
            duration: 8,
            ease: "easeInOut",
            repeat: Infinity,
          }}
        >
          {/* Main Dove Line-Art */}
          <path
            d="M 400,160 
               C 388,145 372,130 360,132 
               C 350,133 346,142 355,152 
               C 365,162 376,168 395,172
               C 392,185 382,205 368,215
               C 385,215 400,202 405,188
               C 410,202 425,215 442,215
               C 428,205 418,185 415,172
               C 434,168 445,162 455,152
               C 464,142 460,133 450,132
               C 438,130 422,145 410,160
               Z"
            fill="none"
            stroke="#f472b6"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#neon-glow-pink)"
            className="text-[#f472b6]"
          />
          
          {/* Inner body line and dynamic stroke */}
          <path
            d="M 390,166 Q 400,152 410,166"
            fill="none"
            stroke="#ffffff"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* Floating Neon Red Heart Above Dove's Wings */}
          <motion.path
            d="M 400,105 C 395,95 383,95 383,105 C 383,115 400,125 400,125 C 400,125 417,115 417,105 C 417,95 405,95 400,105 Z"
            fill="none"
            stroke="#ef4444"
            strokeWidth="2.5"
            filter="url(#neon-glow-pink)"
            animate={{
              scale: [0.95, 1.15, 0.95],
              opacity: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 2.2,
              ease: "easeInOut",
              repeat: Infinity,
            }}
          />
        </motion.g>

        {/* 2. GENTLE NEON FLOATING BACKGROUND SPARKS & DREAMY CLOUDS */}
        <g stroke="#38bdf8" strokeWidth="1" strokeDasharray="3 3" opacity="0.3">
          {/* Stylized geometric background stars & clouds mirroring drawing theme */}
          <path d="M 240,160 Q 260,150 280,160 T 320,160" fill="none" />
          <path d="M 480,180 Q 500,170 520,180 T 560,180" fill="none" />
        </g>

        {/* ========================================================================= */}
        {/* THE RAISING COLOURED NEON HANDS (Solidarity semicircle group rising from bottom) */}
        {/* ========================================================================= */}
        <g id="neon-raise-hands-group">
          
          {/* HAND 1: Leftmost Amber/Orange Hand (Reaching angled right) */}
          <motion.path
            d="M 120,600 
               C 135,530 160,450 185,390 
               C 175,395 158,400 150,390 
               C 142,382 148,365 158,365
               C 172,365 190,378 196,380
               C 188,350 172,315 165,290
               C 160,280 172,275 180,285
               C 192,305 204,335 210,358
               C 208,325 198,285 192,260
               C 188,248 202,242 210,255
               C 220,272 232,320 230,360
               C 235,330 240,295 245,275
               C 248,265 258,268 258,280
               C 256,305 250,345 246,375
               C 255,355 268,335 278,328
               C 285,324 290,335 282,348
               C 272,365 258,390 255,415
               C 250,470 242,540 235,600"
            fill="none"
            stroke="#fb923c"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#neon-glow-gold)"
            animate={{
              rotate: [-1.5, 1.5, -1.5],
              y: [0, -3, 0],
            }}
            transition={{
              duration: 9,
              ease: "easeInOut",
              repeat: Infinity,
            }}
          />

          {/* HAND 2: Left-Center Indigo/Blue Hand (Graceful outspread) */}
          <motion.path
            d="M 280,600
               C 290,530 305,440 318,370
               C 305,372 288,375 280,362
               C 272,352 280,335 292,335
               C 308,335 322,350 328,352
               C 320,320 304,275 296,245
               C 290,232 305,225 315,240
               C 328,265 340,305 344,332
               C 342,295 332,250 326,220
               C 320,205 338,200 345,215
               C 356,238 368,295 365,335
               C 370,305 376,260 382,235
               C 385,222 398,225 396,240
               C 392,270 384,320 380,352
               C 390,332 405,310 415,302
               C 422,298 428,310 418,325
               C 405,345 390,375 386,402
               C 378,460 368,530 360,600"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="3.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#neon-glow-cyan)"
            animate={{
              rotate: [1, -1, 1],
              y: [0, -5, 0],
            }}
            transition={{
              duration: 11,
              ease: "easeInOut",
              repeat: Infinity,
            }}
          />

          {/* HAND 3: Solid Green Victory/Peace raised hand (Center-Right, Reaching tall) */}
          <motion.path
            d="M 440,600
               C 445,510 455,410 460,340
               C 450,345 435,340 435,325
               C 435,312 448,312 458,315
               C 464,318 468,322 472,320
               C 468,285 458,235 452,205
               C 448,192 462,185 470,200
               C 480,225 490,275 492,305
               C 490,265 486,220 482,190
               C 478,175 494,170 500,185
               C 512,210 522,270 520,310
               C 525,280 532,240 538,215
               C 542,202 555,205 552,220
               C 548,250 540,300 536,330
               C 545,310 558,290 568,282
               C 575,278 580,290 572,305
               C 560,325 545,355 542,382
               C 532,440 522,520 515,600"
            fill="none"
            stroke="#34d399"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#neon-glow-green)"
            animate={{
              rotate: [-1, 1, -1],
              y: [0, -4, 0],
            }}
            transition={{
              duration: 7.5,
              ease: "easeInOut",
              repeat: Infinity,
            }}
          />

          {/* HAND 4: Right Sunny Gold outspread hand (Angled left) */}
          <motion.path
            d="M 580,600
               C 570,520 555,445 540,385
               C 548,382 562,378 568,386
               C 574,394 568,408 558,408
               C 546,408 528,396 524,394
               C 534,365 550,332 556,310
               C 560,300 548,295 540,305
               C 530,322 520,352 514,372
               C 516,342 524,305 528,280
               C 532,268 518,262 510,275
               C 500,292 488,338 490,378
               C 485,348 480,315 475,295
               C 472,285 462,288 462,300
               C 464,325 470,365 474,395
               C 465,375 452,355 442,348
               C 435,344 430,355 438,368
               C 448,385 462,410 465,435
               C 470,490 478,550 485,600"
            fill="none"
            stroke="#eab308"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#neon-glow-gold)"
            animate={{
              rotate: [2, -2, 2],
              y: [0, -6, 0],
            }}
            transition={{
              duration: 9.5,
              ease: "easeInOut",
              repeat: Infinity,
            }}
          />

          {/* HAND 5: Rightmost magenta/rose hand (Rising elegantly) */}
          <motion.path
            d="M 680,600
               C 665,540 645,470 625,415
               C 633,410 648,405 654,412
               C 660,420 652,434 642,434
               C 630,434 614,424 610,422
               C 618,395 632,365 638,345
               C 642,335 632,330 624,338
               C 615,352 606,380 600,398
               C 602,372 610,342 614,320
               C 618,310 606,305 598,315
               C 588,330 578,372 580,410
               C 575,385 571,358 567,340
               C 564,330 555,332 555,342
               C 557,365 561,400 565,425
               C 558,408 548,390 540,385
               C 534,380 529,390 535,400
               C 543,415 554,435 556,458
               C 560,510 568,560 575,600"
            fill="none"
            stroke="#ec4899"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#neon-glow-pink)"
            animate={{
              rotate: [-2, 1.5, -2],
              y: [0, -4, 0],
            }}
            transition={{
              duration: 8.5,
              ease: "easeInOut",
              repeat: Infinity,
            }}
          />
        </g>

        {/* 3. MINI NEON HEARTS EMBELLISHMENTS & LOVE BURSTS (Floating between the hands) */}
        <g id="neon-ambient-hearts-array">
          <motion.path
            d="M 240,430 C 237,422 227,422 227,430 C 227,438 240,446 240,446 C 240,446 253,438 253,430 C 253,422 243,422 240,430 Z"
            fill="none"
            stroke="#fb7185"
            strokeWidth="2"
            filter="url(#neon-glow-pink)"
            animate={{
              scale: [0.8, 1.2, 0.8],
              opacity: [0.6, 1.0, 0.6],
              y: [0, -8, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <motion.path
            d="M 520,410 C 517,402 507,402 507,410 C 507,418 520,426 520,426 C 520,426 533,418 533,410 C 533,402 523,402 520,410 Z"
            fill="none"
            stroke="#f59e0b"
            strokeWidth="2"
            filter="url(#neon-glow-gold)"
            animate={{
              scale: [1.1, 0.8, 1.1],
              opacity: [0.9, 0.5, 0.9],
              y: [0, 6, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <motion.path
            d="M 380,310 C 377,302 367,302 367,310 C 367,318 380,326 380,326 C 380,326 393,318 393,310 C 393,302 383,302 380,310 Z"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="2.2"
            filter="url(#neon-glow-cyan)"
            animate={{
              scale: [0.9, 1.3, 0.9],
              opacity: [0.7, 1.0, 0.7],
              y: [0, -10, 0],
            }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </g>

        {/* 4. LOWER SILHOUETTE RAISING HANDS (Replicating bottom watercolor pattern) */}
        <g opacity="0.32" strokeWidth="1.5" fill="none">
          {/* Semicircle rows of mini-hands framing the bottom boundary for a perfect match */}
          <path d="M 50,600 Q 60,570 70,600 T 90,600 T 110,600 T 130,600 T 150,600 T 170,600" stroke="#f43f5e" />
          <path d="M 190,600 Q 200,565 210,600 T 230,600 T 250,600 T 270,600 T 290,600 T 310,600" stroke="#38bdf8" />
          <path d="M 330,600 Q 340,560 350,600 T 370,600 T 390,600 T 410,600 T 430,600 T 450,600" stroke="#34d399" />
          <path d="M 470,600 Q 480,565 490,600 T 510,600 T 530,600 T 550,600 T 570,600 T 590,600" stroke="#fbbf24" />
          <path d="M 610,600 Q 620,570 630,600 T 650,600 T 670,600 T 690,600 T 710,600 T 730,600" stroke="#ec4899" />
        </g>
      </svg>

      {/* ========================================================================= */}
      {/* INTERACTIVE GLOWING CANVAS (Allows the user to draw neon strokes directly) */}
      {/* ========================================================================= */}
      <canvas
        ref={canvasRef}
        style={{ width: '100%', height: '100%', display: 'block' }}
        className="absolute inset-0 opacity-45 mix-blend-screen transition-opacity duration-700 pointer-events-auto"
        id="colorful-drawing-canvas"
      />
    </div>
  );
}
