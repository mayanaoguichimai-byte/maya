import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Preloader } from "@/components/Preloader";
import { CursorFollower } from "@/components/CursorFollower";
import { Reveal } from "@/components/Reveal";
import { GooHero } from "@/components/GooHero";
import { HorizontalScroll } from "@/components/HorizontalScroll";
import { RotatingRock } from "@/components/RotatingRock";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";

// ─────────────────────────────────────────────────────────────────────────────
// Work & Life image cards.
// To replace an image later, swap the `image` import below with your own file
// placed in src/assets/. Keep the 4/5 aspect ratio for a consistent layout.
// ─────────────────────────────────────────────────────────────────────────────
import lifeData from "@/assets/life-data.jpg"; // TODO: replace with a real screenshot of your dashboard / BI / data workspace
import lifeAI from "@/assets/life-ai.jpg"; // TODO: replace with a real screenshot of an AI tool / prototype you built
import lifeUsers from "@/assets/life-users.jpg"; // TODO: replace with a real user-feedback / insight board collage
import lifeLife from "@/assets/life-life.jpg"; // TODO: replace with a personal life photo (street / cafe / travel / desk)

// route meta removed for standalone preview

type Card = {
  image: string;
  title: string;
  meta: string;
  description: string;
  imageDirection: string; // future guidance for swapping the image
};

const cards: Card[] = [
  {
    image: lifeData,
    title: "Building with Data",
    meta: "DATA / BUSINESS / INSIGHT",
    description: "I turn scattered data into clearer business decisions.",
    imageDirection:
      "Dark dashboard, PowerBI/Excel charts, KPI cards, SKU analysis, real workspace — not raw white spreadsheets.",
  },
  {
    image: lifeAI,
    title: "Designing with AI",
    meta: "AI TOOLS / PRODUCT THINKING",
    description: "I explore how AI can become a practical tool, not just a concept.",
    imageDirection:
      "AI assistant UI, data-upload page, AI insight panel, product flow, Lovable/Cursor/Trae screens, prototype mockup.",
  },
  {
    image: lifeUsers,
    title: "Reading User Signals",
    meta: "USER FEEDBACK / OBSERVATION",
    description: "I like finding real needs hidden inside messy feedback.",
    imageDirection:
      "Review cards + tag system + insight summary collage; competitor notes; pain-point board.",
  },
  {
    image: lifeLife,
    title: "Life Beyond Work",
    meta: "DAILY LIFE / CURIOSITY",
    description: "I collect small moments, questions, and details outside the screen.",
    imageDirection:
      "Real life photo — street, cafe, exhibition, desk, travel. Calm, observational, not influencer-style.",
  },
];

const thoughts = [
  { tag: "ON DATA", line: "A number only matters once you know which question it answers." },
  { tag: "ON AI", line: "Good AI tools disappear into the work — you stop noticing them." },
  { tag: "ON PEOPLE", line: "Most feedback is a feeling looking for the right words." },
  { tag: "ON LIFE", line: "Curiosity is a small daily habit, not a personality trait." },
];

export function Home() {
  useSmoothScroll();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.55, 0.85], [1, 1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 3.5]);
  const overlayOpacity = useTransform(scrollYProgress, [0.5, 0.9], [0, 1]);

  return (
    <div className="min-h-screen bg-black text-white">
      <Preloader />
      <CursorFollower />

      {/* Nav */}
      <header className="fixed top-0 inset-x-0 z-50 mix-blend-difference text-white">
        <div className="flex items-center justify-between px-6 md:px-10 py-5">
          <a href="#home" className="label-xs font-medium">
            Yujing Zhu / 朱雨婧
          </a>
          <nav className="flex items-center gap-4 md:gap-6 label-xs">
            <a href="#home" className="hover:opacity-60 transition-opacity">
              Home
            </a>
            <a href="#about" className="hover:opacity-60 transition-opacity">
              About
            </a>
            <a href="#work" className="hover:opacity-60 transition-opacity">
              Work & Life
            </a>
            <a href="#thoughts" className="hover:opacity-60 transition-opacity">
              Thoughts
            </a>
            <a href="#contact" className="hover:opacity-60 transition-opacity">
              Contact
            </a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section id="home" ref={heroRef} className="relative h-[200vh]">
        <div className="sticky top-0 h-screen overflow-hidden bg-black">
          <motion.div
            style={{ scale: heroScale, opacity: heroOpacity, transformOrigin: "52% 58%" }}
            className="absolute inset-0 will-change-transform"
          >
            <GooHero />
          </motion.div>

          <motion.div
            style={{ opacity: heroOpacity }}
            className="relative z-10 flex flex-col justify-between h-screen px-6 md:px-10 pt-32 pb-10 pointer-events-none"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.6, duration: 1 }}
              className="max-w-6xl"
            >
              <h1 className="display-hero mix-blend-difference text-white">Hi, I'm Yujing Zhu.</h1>
              <p className="mt-6 max-w-2xl text-base md:text-lg text-white/80 mix-blend-difference">
                I build, observe, and turn messy ideas into clearer things.
              </p>
              <div className="mt-8 flex flex-wrap gap-3 pointer-events-auto">
                <a
                  href="#work"
                  data-cursor="Open"
                  className="label-xs border border-white/70 px-4 py-3 hover:bg-white hover:text-black transition-colors"
                >
                  Explore My Work →
                </a>
                <a
                  href="#thoughts"
                  data-cursor="Read"
                  className="label-xs border border-white/30 px-4 py-3 hover:bg-white hover:text-black transition-colors"
                >
                  Life Fragments
                </a>
                <a
                  href="#contact"
                  data-cursor="Hi"
                  className="label-xs border border-white/30 px-4 py-3 hover:bg-white hover:text-black transition-colors"
                >
                  Say Hi
                </a>
              </div>
            </motion.div>
            <div className="flex items-end justify-between label-xs mix-blend-difference text-white">
              <motion.span
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                Scroll Down ↓
              </motion.span>
              <span>Work · Thoughts · Life</span>
            </div>
          </motion.div>

          <motion.div
            style={{ opacity: overlayOpacity }}
            className="absolute inset-0 bg-black z-20 pointer-events-none"
          />
        </div>
      </section>

      {/* About */}
      <section
        id="about"
        className="relative bg-black text-white px-6 md:px-10 pt-32 pb-24 md:pt-48 md:pb-32"
      >
        <Reveal>
          <span className="label-xs text-white/50 mb-6 block text-center">— About —</span>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="display-hero max-w-5xl mx-auto text-center">
            A space for work,
            <br />
            thoughts, and the
            <br />
            small things in between.
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-10 max-w-2xl mx-auto text-center text-white/60 text-base md:text-lg leading-relaxed">
            I'm a Financial Engineering student who enjoys working with data, AI tools, and product
            ideas. I like making messy information easier to understand — whether it is business
            data, user feedback, or an early product concept. Outside work, I also care about daily
            observation, visual details, and keeping a sense of curiosity in ordinary life.
          </p>
        </Reveal>
      </section>

      {/* Work & Life — 4 large editorial cards */}
      <section id="work" className="border-t border-white/10">
        <div className="flex items-center justify-between px-6 md:px-10 py-6 label-xs text-white/60 border-b border-white/10">
          <span>Work & Life — Things I Build, Notice & Think About</span>
          <span className="hidden md:inline">{cards.length} fragments</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {cards.map((c, i) => (
            <LifeCard key={c.title} c={c} i={i} />
          ))}
        </div>
      </section>

      {/* Manifesto */}
      <section className="px-6 md:px-10 py-24 md:py-40 border-t border-white/10">
        <Reveal>
          <div className="label-xs text-white/50 mb-8">Approach</div>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="display-lg max-w-5xl">
            I like sitting between <span className="text-white/50">data, AI, and people</span> —
            taking something tangled and slowly turning it into something you can actually use,
            read, or feel.
          </p>
        </Reveal>
      </section>

      {/* Horizontal scroll — kept for the editorial motion */}
      <HorizontalScroll />

      {/* Thoughts */}
      <section id="thoughts" className="px-6 md:px-10 py-24 md:py-32 border-t border-white/10">
        <Reveal>
          <div className="label-xs text-white/50 mb-8">Thoughts — Notes to Self</div>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="display-lg max-w-4xl mb-16">
            Small ideas I keep <span className="text-white/50">coming back to.</span>
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
          {thoughts.map((t, i) => (
            <Reveal key={t.tag} delay={i * 0.06}>
              <div className="border-t border-white/10 pt-6">
                <div className="label-xs text-white/50 mb-4">{t.tag}</div>
                <p className="text-2xl md:text-3xl leading-snug">"{t.line}"</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Marquee */}
      <section className="border-y border-white/10 overflow-hidden py-8">
        <div className="marquee-track flex gap-16 whitespace-nowrap">
          {[...Array(2)].map((_, k) => (
            <div key={k} className="flex gap-16">
              {["Build.", "Notice.", "Question.", "Repeat."].map((t, i) => (
                <span key={i} className="display-lg">
                  {t} <span className="text-white/50">✶</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      <RotatingRock />

      {/* Contact */}
      <section id="contact" className="px-6 md:px-10 py-24 md:py-40 border-t border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <Reveal>
            <div className="label-xs text-white/50 mb-8">Say Hi — 01</div>
            <h2 className="display-hero">Say Hi.</h2>
            <p className="mt-6 max-w-md text-white/60 text-base md:text-lg leading-relaxed">
              If you're interested in my work, thoughts, or just want to start a conversation, feel
              free to reach out.
            </p>
            <a
              href="mailto:zhuyujing666666@163.com"
              data-cursor="Send"
              className="inline-block mt-10 label-xs border border-white px-6 py-4 hover:bg-white hover:text-black transition-colors"
            >
              Start a conversation →
            </a>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="space-y-10">
              <div>
                <div className="label-xs text-white/50 mb-3">Location</div>
                <p className="text-lg">Hangzhou</p>
              </div>
              <div>
                <div className="label-xs text-white/50 mb-3">Email</div>
                <a href="mailto:zhuyujing666666@163.com" className="text-lg hover:opacity-60">
                  zhuyujing666666@163.com
                </a>
              </div>
              <div>
                <div className="label-xs text-white/50 mb-3">Elsewhere</div>
                <p className="text-white/60 text-sm leading-relaxed max-w-sm">
                  Mostly here, sometimes quiet on the internet — but always happy to read a
                  thoughtful email.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <footer className="border-t border-white/10 px-6 md:px-10 py-6 flex flex-wrap items-center justify-between gap-4 label-xs text-white/50">
        <span>© {new Date().getFullYear()} Yujing Zhu / 朱雨婧</span>
        <span>A personal website — work, thoughts, life fragments.</span>
      </footer>
    </div>
  );
}

/** Large editorial Work & Life card with scroll parallax + hover zoom. */
function LifeCard({ c, i }: { c: Card; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);

  return (
    <motion.div
      ref={ref}
      className="group relative block overflow-hidden border-b border-white/10 md:[&:nth-child(odd)]:border-r"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.9, delay: (i % 2) * 0.12, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-white/5">
        <motion.img
          src={c.image}
          alt={c.title}
          loading="lazy"
          width={1024}
          height={1024}
          style={{ y }}
          className="w-full h-[115%] object-cover saturate-[0.7] transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
        />
        {/* Dark overlay to unify with black background */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/30 pointer-events-none" />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500 pointer-events-none" />

        {/* Index */}
        <div className="absolute top-5 left-5 label-xs text-white/70">
          {String(i + 1).padStart(2, "0")} / 04
        </div>

        {/* Hover View badge */}
        <div className="absolute top-5 right-5 label-xs text-white opacity-0 group-hover:opacity-100 translate-y-[-4px] group-hover:translate-y-0 transition-all duration-500">
          View ↗
        </div>

        {/* Text block */}
        <div className="absolute inset-x-0 bottom-0 p-6 md:p-10">
          <div className="label-xs text-white/60 mb-4 tracking-[0.18em]">{c.meta}</div>
          <h3 className="display-lg text-white max-w-xl">{c.title}</h3>
          <p className="mt-4 max-w-md text-white/70 text-sm md:text-base leading-relaxed opacity-90 translate-y-1 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
            {c.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
