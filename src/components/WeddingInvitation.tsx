import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import groomImg from "@/assets/groom.jpeg";
import brideImg from "@/assets/bride.jpeg";

const GoldParticles = () => {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: Math.random() * 5,
    duration: 3 + Math.random() * 4,
    size: 3 + Math.random() * 5,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-gold/30"
          style={{ left: p.left, width: p.size, height: p.size }}
          animate={{
            y: ["100vh", "-10vh"],
            opacity: [0, 0.8, 0.8, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

const WeddingInvitation = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Phase 1: Title
  const titleOpacity = useTransform(scrollYProgress, [0, 0.06, 0.14], [1, 1, 0]);
  const titleScale = useTransform(scrollYProgress, [0, 0.14], [1, 0.92]);

  // Phase 2: Images slide in & settle
  const groomX = useTransform(scrollYProgress, [0.1, 0.28], ["-100%", "0%"]);
  const brideX = useTransform(scrollYProgress, [0.1, 0.28], ["100%", "0%"]);
  const imagesOpacity = useTransform(scrollYProgress, [0.1, 0.18], [0, 1]);

  // Phase 3: Names fade in
  const namesOpacity = useTransform(scrollYProgress, [0.26, 0.34], [0, 1]);
  const namesY = useTransform(scrollYProgress, [0.26, 0.34], [20, 0]);

  // Phase 4: Full card with all details
  const cardOpacity = useTransform(scrollYProgress, [0.38, 0.5], [0, 1]);
  const cardY = useTransform(scrollYProgress, [0.38, 0.5], [60, 0]);

  // Phase 5: Footer
  const footerOpacity = useTransform(scrollYProgress, [0.75, 0.85], [0, 1]);

  return (
    <div ref={containerRef} className="relative" style={{ height: "500vh" }}>
      <GoldParticles />

      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Background shimmer */}
        <div className="absolute inset-0 animate-shimmer opacity-15" />

        {/* ===== PHASE 1: Opening title ===== */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center z-30 pointer-events-none"
          style={{ opacity: titleOpacity, scale: titleScale }}
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="font-script text-gold text-3xl md:text-5xl text-center leading-relaxed px-6"
          >
            With the blessings of the Almighty
          </motion.p>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="w-20 h-[2px] gradient-gold mt-5 rounded-full"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="font-body text-muted-foreground text-[11px] md:text-sm mt-4 tracking-[0.25em] md:tracking-[0.4em] uppercase"
          >
            Scroll to reveal
          </motion.p>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mt-3"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-gold">
              <path d="M12 5v14M5 12l7 7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>
        </motion.div>

        {/* ===== PHASE 2 & 3: Images with names ===== */}
        <div className="absolute left-0 right-0 top-[9vh] md:top-[4vh] flex flex-row items-start justify-between z-10 px-[2.5%] md:px-[3%]">
          {/* Bride - left side, cropped tight */}
          <motion.div
            className="order-1 relative h-[46vh] md:h-[66vh] w-[47%] md:w-[41%] overflow-hidden rounded-b-2xl md:rounded-b-3xl"
            style={{ x: groomX, opacity: imagesOpacity }}
          >
            <img
              src={brideImg}
              alt="Shalin Thomas - Bride"
              className="w-full h-full object-cover"
              style={{ mixBlendMode: "multiply", objectPosition: "58% 8%" }}
            />
            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-background to-transparent" />
            <div className="absolute inset-0 md:hidden bg-[linear-gradient(to_bottom,hsl(var(--background))_0%,transparent_14%,transparent_84%,hsl(var(--background))_100%),linear-gradient(to_right,hsl(var(--background))_0%,transparent_10%,transparent_90%,hsl(var(--background))_100%)]" />
            <div className="hidden md:block absolute top-0 right-0 bottom-0 w-1/4 bg-gradient-to-l from-background to-transparent" />
          </motion.div>

          {/* Groom - right side, cropped tight */}
          <motion.div
            className="order-2 relative h-[46vh] md:h-[66vh] w-[47%] md:w-[41%] overflow-hidden rounded-b-2xl md:rounded-b-3xl"
            style={{ x: brideX, opacity: imagesOpacity }}
          >
            <img
              src={groomImg}
              alt="Ditto Jose - Groom"
              className="w-full h-full object-cover object-top"
              style={{ mixBlendMode: "multiply" }}
            />
            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-background to-transparent" />
            <div className="absolute inset-0 md:hidden bg-[linear-gradient(to_bottom,hsl(var(--background))_0%,transparent_14%,transparent_84%,hsl(var(--background))_100%),linear-gradient(to_right,hsl(var(--background))_0%,transparent_10%,transparent_90%,hsl(var(--background))_100%)]" />
            <div className="hidden md:block absolute top-0 left-0 bottom-0 w-1/4 bg-gradient-to-r from-background to-transparent" />
          </motion.div>
        </div>

        {/* ===== Names under images ===== */}
        <motion.div
          className="absolute top-[55vh] md:top-[62vh] left-0 right-0 z-20 hidden md:flex flex-row justify-between px-[5%] md:px-[8%] gap-1 md:gap-4"
          style={{ opacity: namesOpacity, y: namesY }}
        >
          <div className="order-1 text-center w-[47%] md:w-[41%] py-1.5 md:py-3 px-1 md:px-4">
            <p className="font-body text-gold text-[10px] md:text-xs tracking-[0.18em] md:tracking-[0.22em] uppercase">Bride</p>
            <p className="font-display text-base md:text-2xl font-semibold text-maroon leading-tight mt-0.5">Shalin Thomas</p>
          </div>
          <div className="order-2 text-center w-[47%] md:w-[41%] py-1.5 md:py-3 px-1 md:px-4">
            <p className="font-body text-gold text-[10px] md:text-xs tracking-[0.18em] md:tracking-[0.22em] uppercase">Groom</p>
            <p className="font-display text-base md:text-2xl font-semibold text-maroon leading-tight mt-0.5">Ditto Jose</p>
          </div>
        </motion.div>

        {/* ===== PHASE 4: Full invitation card ===== */}
        <motion.div
          className="absolute top-[58vh] md:top-auto md:bottom-8 left-1/2 z-30 w-[95vw] md:w-[92vw] max-w-[760px]"
          style={{
            x: "-50%",
            opacity: cardOpacity,
            y: cardY,
          }}
        >
          <div className="relative">

            {/* Top section */}
            <div className="text-center pt-3 md:pt-6 pb-3 md:pb-4 px-4 md:px-8">
              <p className="font-body text-muted-foreground text-[10px] md:text-xs uppercase tracking-[0.28em]">
                Engagement Ceremony
              </p>
              <p className="font-script text-gold text-base md:text-3xl mt-1.5">Together with their families</p>
              <div className="w-16 h-[1.5px] gradient-gold mx-auto my-2.5 rounded-full" />
              <h1 className="font-display text-2xl md:text-4xl font-semibold text-maroon tracking-tight">
                Shalin & Ditto
              </h1>
              <p className="font-script text-gold text-xs md:text-lg mt-1.5">
                request the honour of your presence
              </p>
            </div>

            {/* Divider */}
            <div className="flex items-center justify-center gap-3 px-4 md:px-6">
              <div className="flex-1 h-[1px] gradient-gold opacity-40" />
              <span className="font-script text-gold text-lg">✦</span>
              <div className="flex-1 h-[1px] gradient-gold opacity-40" />
            </div>

            {/* Date & Venue */}
            <div className="text-center py-3 md:py-4 px-4 md:px-8">
              <p className="font-display text-foreground font-semibold text-sm md:text-lg">
                April 13, 2026 · 12:00 PM
              </p>
              <p className="font-body text-muted-foreground text-xs md:text-base mt-0.5">
                Lourdes Matha Church, Paippad
              </p>
              <a
                href="https://maps.app.goo.gl/jfSdfsZfG3XeSQ5r5?g_st=ic"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 mt-1.5 font-body text-gold text-xs md:text-sm hover:text-gold-dark transition-colors underline underline-offset-4"
              >
                View on Map ↗
              </a>
            </div>

            {/* Divider */}
            <div className="hidden md:flex items-center justify-center gap-3 px-4 md:px-6">
              <div className="flex-1 h-[1px] gradient-gold opacity-40" />
              <span className="font-script text-gold text-lg">✦</span>
              <div className="flex-1 h-[1px] gradient-gold opacity-40" />
            </div>

            {/* Family Details - inside the card */}
            <div className="hidden md:flex flex-col md:flex-row justify-between items-center md:items-start px-4 md:px-10 py-3 md:py-4 pb-5 md:pb-6 gap-3 md:gap-0">
              <div className="flex-1 text-center">
                <p className="font-display text-sm md:text-lg font-semibold text-foreground">Shalin Thomas</p>
                <p className="font-body text-muted-foreground text-[11px] md:text-sm mt-1">
                  D/o Deenamma Thomas & Thomas M.T
                </p>
                <p className="font-body text-muted-foreground text-[11px] md:text-sm mt-1 leading-snug">
                  Muttathettu P.C, Kavala P.O<br />
                  Paippad, Changanacherry, Kottayam
                </p>
              </div>

              <div className="flex md:flex-col items-center justify-center gap-2 md:gap-1 mx-0 md:mx-3 py-1 md:pt-1">
                <div className="w-10 md:w-[1.5px] h-[1.5px] md:h-8 gradient-gold rounded-full opacity-50" />
                <span className="font-script text-gold text-base">&</span>
                <div className="w-10 md:w-[1.5px] h-[1.5px] md:h-8 gradient-gold rounded-full opacity-50" />
              </div>

              <div className="flex-1 text-center">
                <p className="font-display text-sm md:text-lg font-semibold text-foreground">Ditto Jose</p>
                <p className="font-body text-muted-foreground text-[11px] md:text-sm mt-1">
                  S/o Elsy Jose & Jose Joseph
                </p>
                <p className="font-body text-muted-foreground text-[11px] md:text-sm mt-1 leading-snug">
                  Padinjarekuttu House<br />
                  Mutholapuram P.O, Ernakulam
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          className="absolute bottom-1 left-1/2 -translate-x-1/2 text-center z-20"
          style={{ opacity: footerOpacity }}
        >
          <p className="font-script text-gold/50 text-sm md:text-base">
            "Two souls, one heart" ❤
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default WeddingInvitation;
