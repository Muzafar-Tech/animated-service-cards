import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { Icon } from "@iconify/react";
import type { MouseEvent } from "react";
import logo from "./assets/muzafar-tech-logo-navbar.png";
function CardArt({
  variant,
}: {
  variant: "web" | "mobile" | "ai" | "business";
}) {
  const common = { stroke: "url(#g)", strokeWidth: 1.2, fill: "none" as const };
  return (
    <svg
      viewBox="0 0 300 300"
      className="absolute inset-0 h-full w-full opacity-[0.16] transition-all duration-700 ease-out group-hover:scale-110 group-hover:opacity-[0.32]"
    >
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#c084fc" />
          <stop offset="100%" stopColor="#ffffff" />
        </linearGradient>
      </defs>

      {variant === "web" && (
        <g {...common}>
          <path
            d="M90 90 L50 150 L90 210"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M210 90 L250 150 L210 210"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M165 70 L135 230" strokeLinecap="round" />
          {[60, 100, 140, 180, 220].map((y) => (
            <line key={y} x1="0" y1={y} x2="300" y2={y} strokeOpacity="0.25" />
          ))}
        </g>
      )}

      {variant === "mobile" && (
        <g {...common}>
          <rect x="95" y="35" width="110" height="230" rx="18" />
          <line x1="95" y1="70" x2="205" y2="70" />
          <line x1="95" y1="225" x2="205" y2="225" />
          {[0, 1, 2].map((r) =>
            [0, 1, 2].map((c) => (
              <rect
                key={`${r}-${c}`}
                x={112 + c * 30}
                y={90 + r * 42}
                width="20"
                height="20"
                rx="5"
                strokeOpacity="0.6"
              />
            )),
          )}
        </g>
      )}

      {variant === "ai" && (
        <g {...common}>
          {[
            [70, 80],
            [150, 50],
            [230, 90],
            [60, 170],
            [150, 150],
            [240, 180],
            [95, 240],
            [200, 240],
          ].map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r={i === 4 ? 9 : 5} />
          ))}
          <path
            d="M70 80 L150 150 L150 50 L230 90 L150 150 L60 170 L150 150 L95 240 M150 150 L200 240 M150 150 L240 180"
            strokeOpacity="0.55"
          />
        </g>
      )}

      {variant === "business" && (
        <g {...common}>
          {[
            { x: 60, h: 70 },
            { x: 105, h: 130 },
            { x: 150, h: 90 },
            { x: 195, h: 160 },
            { x: 240, h: 110 },
          ].map((b) => (
            <rect
              key={b.x}
              x={b.x}
              y={250 - b.h}
              width="28"
              height={b.h}
              rx="4"
            />
          ))}
          <path d="M50 250 L250 250" strokeOpacity="0.4" />
        </g>
      )}
    </svg>
  );
}
function AnimatedIcon({ icon }: { icon: string }) {
  return (
    <div className="relative mb-5 flex h-12 w-12 items-center justify-center">
      <motion.span
        className="absolute inset-0 rounded-xl bg-purple-500/20"
        initial={{ scale: 0.8, opacity: 0 }}
        variants={{ hover: { scale: 1.3, opacity: 1 } }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      />
      <motion.div
        className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/15"
        variants={{
          hover: {
            rotate: -8,
            scale: 1.08,
            backgroundColor: "rgba(168,85,247,0.28)",
          },
        }}
        transition={{ type: "spring", stiffness: 260, damping: 14 }}
      >
        <motion.div
          variants={{ hover: { rotate: 8, scale: 1.1 } }}
          transition={{ type: "spring", stiffness: 260, damping: 14 }}
        >
          <Icon icon={icon} width={22} className="text-purple-300" />
        </motion.div>
      </motion.div>
    </div>
  );
}

const services = [
  {
    icon: "mdi:code-tags",
    title: "Web Development",
    desc: "Corporate sites, dashboards, SaaS platforms — built full-stack.",
    variant: "web" as const,
  },
  {
    icon: "mdi:cellphone",
    title: "Mobile Apps",
    desc: "Cross-platform apps for booking, delivery, healthcare & more.",
    variant: "mobile" as const,
  },
  {
    icon: "mdi:robot-outline",
    title: "AI & Automation",
    desc: "Chatbots, workflow automation, WhatsApp & lead automation.",
    variant: "ai" as const,
  },
  {
    icon: "mdi:database-outline",
    title: "Business Systems",
    desc: "ERP, CRM, POS, inventory & management software.",
    variant: "business" as const,
  },
];


function ServiceCard({
  icon,
  title,
  desc,
  variant,
}: (typeof services)[number]) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mx = useMotionValue(50); // spotlight position %
  const my = useMotionValue(50);

  const rotateX = useSpring(useTransform(y, [-60, 60], [6, -6]), {
    stiffness: 200,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(x, [-60, 60], [-6, 6]), {
    stiffness: 200,
    damping: 20,
  });

  function handleMove(e: MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    x.set(px - rect.width / 2);
    y.set(py - rect.height / 2);
    mx.set((px / rect.width) * 100);
    my.set((py / rect.height) * 100);
  }

  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  const spotlight = useTransform(
    [mx, my],
    ([latMx, latMy]) =>
      `radial-gradient(220px circle at ${latMx}% ${latMy}%, rgba(192,132,252,0.18), transparent 70%)`,
  );

  return (
    <motion.div
      initial="rest"
      whileHover="hover"
      animate="rest"
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className="group relative w-72 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur-xl"
    >
      {/* animated conic-gradient border glow — appears only on hover */}
      <motion.div
        variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }}
        transition={{ duration: 0.35 }}
        className="pointer-events-none absolute -inset-px rounded-3xl"
        style={{
          background:
            "conic-gradient(from var(--angle,0deg), transparent 0%, rgba(192,132,252,0.7) 12%, transparent 24%)",
          padding: 1,
          WebkitMask:
            "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          animation: "spin-border 3.5s linear infinite",
        }}
      />

      {/* generative background art */}
      <CardArt variant={variant} />

      {/* cursor-tracked spotlight (Stripe-style) */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{ background: spotlight }}
      />

      {/* lift shadow on hover */}
      <motion.div
        variants={{ rest: { y: 0 }, hover: { y: -6 } }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="relative"
      >
        <AnimatedIcon icon={icon} />

        <motion.h3
          variants={{
            rest: { letterSpacing: "0em" },
            hover: { letterSpacing: "0.01em" },
          }}
          className="mb-2 text-lg font-semibold text-white"
        >
          {title}
        </motion.h3>
        <p className="text-sm leading-relaxed text-white/60">{desc}</p>

        <motion.div
          variants={{ rest: { width: 0 }, hover: { width: "40%" } }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="mt-4 h-px bg-gradient-to-r from-purple-400 to-transparent"
        />
      </motion.div>

      <style>{`
        @property --angle {
          syntax: '<angle>';
          initial-value: 0deg;
          inherits: false;
        }
        @keyframes spin-border {
          to { --angle: 360deg; }
        }
      `}</style>
    </motion.div>
  );
}

function LogoBadge() {
  return (
    <div className="relative mx-auto mb-8 w-fit">
      {/* Purple Glow */}
      <div className="absolute inset-0 rounded-full bg-purple-500/20 blur-3xl" />

      <motion.img
        src={logo}
        alt="Muzafar Tech"
        initial={{ opacity: 0, scale: 0.7, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{
          duration: 0.8,
          type: "spring",
          stiffness: 120,
        }}
        whileHover={{
          scale: 1.05,
          rotate: -2,
        }}
        className="relative z-10 mx-auto w-32 md:w-40 drop-shadow-[0_0_35px_rgba(168,85,247,0.45)]"
      />
    </div>
  );
}
function AnimatedHeading({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <motion.h1
      initial="hidden"
      animate="show"
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.08, delayChildren: 0.3 } },
      }}
      className="flex flex-wrap justify-center gap-x-2 text-2xl font-semibold md:text-3xl"
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          variants={{
            hidden: { opacity: 0, y: 16, filter: "blur(6px)" },
            show: { opacity: 1, y: 0, filter: "blur(0px)" },
          }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="bg-gradient-to-b from-white to-purple-300 bg-clip-text text-transparent"
        >
          {word}
        </motion.span>
      ))}
    </motion.h1>
  );
}

export default function App() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center gap-12 overflow-hidden bg-black px-6 py-16">
      <div className="pointer-events-none absolute left-1/2 top-16 h-72 w-72 -translate-x-1/2 rounded-full bg-purple-600/20 blur-[100px]" />

      <div className="relative z-10 text-center">
        <LogoBadge />
        <p className="mb-2 text-sm uppercase tracking-[0.3em] text-purple-400">
          What I Build
        </p>
        <AnimatedHeading text="Software Solutions, Not Just Websites" />
      </div>

      <div className="relative z-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {services.map((s) => (
          <ServiceCard key={s.title} {...s} />
        ))}
      </div>
    </div>
  );
}
