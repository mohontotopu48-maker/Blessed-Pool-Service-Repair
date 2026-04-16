"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Star,
  Shield,
  Droplets,
  Wrench,
  Sparkles,
  ThermometerSun,
  Waves,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Menu,
  X,
  Facebook,
  Quote,
  Send,
  Zap,
  Heart,
  Award,
  Users,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  ANIMATION HELPERS                                                  */
/* ------------------------------------------------------------------ */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: (i: number) => ({
    opacity: 1,
    transition: { delay: i * 0.1, duration: 0.6 },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

function SectionReveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={staggerContainer}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  NAVIGATION                                                         */
/* ------------------------------------------------------------------ */
const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Why Us", href: "#why-us" },
  { label: "Reviews", href: "#reviews" },
  { label: "Areas", href: "#areas" },
  { label: "Contact", href: "#contact" },
];

function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "glass shadow-lg shadow-black/5 py-3" : "bg-transparent py-5"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2.5 group">
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center shadow-lg shadow-teal-500/20 group-hover:shadow-teal-500/40 transition-shadow duration-300">
              <Droplets className="w-5 h-5 text-white" />
              <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-sky-400 rounded-full opacity-80 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-foreground leading-none">
                Blessed Pool
              </span>
              <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-muted-foreground">
                Service & Repair
              </span>
            </div>
          </a>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 rounded-lg hover:bg-teal-50"
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="tel:7145618301"
              className="flex items-center gap-2 text-sm font-semibold text-teal-700 hover:text-teal-800 transition-colors"
            >
              <Phone className="w-4 h-4" />
              (714) 561-8301
            </a>
            <Button
              asChild
              className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white shadow-lg shadow-teal-600/20 hover:shadow-teal-600/30 transition-all duration-300 rounded-xl"
            >
              <a href="#contact">Free Quote</a>
            </Button>
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </nav>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 glass pt-24 lg:hidden"
          >
            <div className="flex flex-col items-center gap-2 p-6">
              {navLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className="w-full text-center py-3 text-lg font-medium text-foreground hover:text-teal-700 hover:bg-teal-50 rounded-xl transition-all"
                >
                  {l.label}
                </a>
              ))}
              <Separator className="my-4" />
              <a
                href="tel:7145618301"
                className="flex items-center gap-2 text-lg font-semibold text-teal-700"
              >
                <Phone className="w-5 h-5" />
                (714) 561-8301
              </a>
              <Button
                asChild
                size="lg"
                className="w-full mt-2 bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-xl"
              >
                <a href="#contact" onClick={() => setMobileOpen(false)}>
                  Get Free Quote
                </a>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  HERO SECTION                                                       */
/* ------------------------------------------------------------------ */
function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section id="home" ref={ref} className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background image with parallax */}
      <motion.div style={{ y }} className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-110"
          style={{ backgroundImage: "url('/hero-pool.png')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-teal-950/90 via-teal-900/70 to-sky-900/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </motion.div>

      {/* Animated wave at bottom */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg viewBox="0 0 1440 120" className="w-full h-auto" preserveAspectRatio="none">
          <path
            className="wave-animation"
            d="M0,60 C360,120 720,0 1080,60 C1260,90 1380,45 1440,60 L1440,120 L0,120 Z"
            fill="hsl(0 0% 100% / 0.05)"
          />
          <path
            className="wave-animation"
            style={{ animationDelay: "-2s" }}
            d="M0,80 C240,40 480,100 720,60 C960,20 1200,80 1440,40 L1440,120 L0,120 Z"
            fill="hsl(0 0% 100% / 0.03)"
          />
        </svg>
      </div>

      {/* Floating bubbles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white/10"
          style={{
            width: 4 + i * 3,
            height: 4 + i * 3,
            left: `${15 + i * 14}%`,
            bottom: "-5%",
          }}
          animate={{
            y: [0, -300 - i * 100],
            opacity: [0, 0.6, 0],
            scale: [0.5, 1, 0.8],
          }}
          transition={{
            duration: 4 + i * 0.8,
            repeat: Infinity,
            delay: i * 0.7,
            ease: "easeOut",
          }}
        />
      ))}

      {/* Content */}
      <motion.div style={{ opacity }} className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Badge className="bg-white/15 text-white border-white/20 backdrop-blur-sm hover:bg-white/20 mb-6 px-4 py-1.5 text-sm font-medium">
              <Sparkles className="w-3.5 h-3.5 mr-1.5" />
              Trusted by hundreds of homeowners
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight"
          >
            Crystal Clear{" "}
            <span className="relative">
              Pools
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="absolute -bottom-2 left-0 right-0 h-1.5 bg-gradient-to-r from-teal-400 to-sky-400 rounded-full origin-left"
              />
            </span>
            ,{" "}
            <br className="hidden sm:block" />
            Every Single Time
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-6 text-lg sm:text-xl text-white/80 max-w-xl leading-relaxed"
          >
            Professional pool cleaning, maintenance, and repair services in Glendale and the Greater Los
            Angeles area. Your pool, our passion.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-10 flex flex-col sm:flex-row gap-4"
          >
            <Button
              asChild
              size="lg"
              className="bg-white text-teal-800 hover:bg-white/90 shadow-xl shadow-black/10 rounded-xl text-base font-semibold px-8 h-13 group"
            >
              <a href="#contact" className="flex items-center gap-2">
                Get Free Estimate
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm rounded-xl text-base font-medium px-8 h-13"
            >
              <a href="#services" className="flex items-center gap-2">
                Our Services
                <ChevronDown className="w-4 h-4" />
              </a>
            </Button>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-14 flex flex-wrap gap-8"
          >
            {[
              { icon: Shield, label: "Licensed & Insured" },
              { icon: Clock, label: "Same-Day Service" },
              { icon: Star, label: "5-Star Rated" },
              { icon: Heart, label: "Family Owned" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-white/70">
                <item.icon className="w-4 h-4 text-teal-400" />
                <span className="text-sm font-medium">{item.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-1.5"
        >
          <motion.div
            animate={{ opacity: [0.3, 1, 0.3], y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1.5 h-1.5 rounded-full bg-white/60"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  SERVICES                                                           */
/* ------------------------------------------------------------------ */
const services = [
  {
    icon: Droplets,
    title: "Pool Cleaning",
    description:
      "Weekly, bi-weekly, or one-time deep cleaning. We vacuum, brush, skim, and balance your water chemistry to perfection.",
    features: ["Debris Removal", "Water Testing", "Filter Cleaning"],
  },
  {
    icon: Wrench,
    title: "Equipment Repair",
    description:
      "Expert diagnosis and repair of pumps, filters, heaters, timers, and automation systems. All brands serviced.",
    features: ["Pump Repair", "Heater Service", "Leak Detection"],
  },
  {
    icon: Waves,
    title: "Pool Maintenance",
    description:
      "Comprehensive maintenance plans to keep your pool running efficiently all year long. Prevent problems before they start.",
    features: ["Chemical Balance", "Equipment Check", "Seasonal Care"],
  },
  {
    icon: ThermometerSun,
    title: "Heater Services",
    description:
      "Gas, electric, and solar heater installation, maintenance, and repair. Stay comfortable year-round.",
    features: ["Installation", "Efficiency Check", "Thermostat Repair"],
  },
  {
    icon: Sparkles,
    title: "Tile & Surface",
    description:
      "Professional tile cleaning, acid washing, and surface restoration to keep your pool looking brand new.",
    features: ["Tile Cleaning", "Acid Wash", "Surface Repair"],
  },
  {
    icon: Zap,
    title: "Emergency Service",
    description:
      "Pool problems don't wait. Our rapid response team is available for urgent repairs and green pool recovery.",
    features: ["Same-Day Call", "Green Pool Fix", "Storm Recovery"],
  },
];

function ServicesSection() {
  return (
    <section id="services" className="py-24 sm:py-32 relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-teal-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-50" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-sky-50 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 opacity-50" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          {/* Header */}
          <motion.div variants={fadeUp} custom={0} className="text-center max-w-2xl mx-auto mb-16">
            <Badge className="bg-teal-50 text-teal-700 border-teal-200 hover:bg-teal-100 mb-4">
              <Droplets className="w-3.5 h-3.5 mr-1.5" />
              Our Services
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
              Everything Your Pool{" "}
              <span className="text-gradient-water">Needs</span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              From routine cleaning to complex repairs, we provide comprehensive pool services tailored to
              your needs.
            </p>
          </motion.div>

          {/* Service cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <motion.div key={i} variants={fadeUp} custom={i + 1}>
                <Card className="group relative h-full border-0 shadow-sm hover:shadow-xl hover:shadow-teal-500/5 transition-all duration-500 bg-white overflow-hidden">
                  <CardContent className="p-6 pt-7">
                    {/* Icon */}
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-teal-50 to-sky-50 flex items-center justify-center mb-5 group-hover:from-teal-500 group-hover:to-teal-600 transition-all duration-500 shadow-sm">
                      <service.icon className="w-6 h-6 text-teal-600 group-hover:text-white transition-colors duration-500" />
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold mb-2 group-hover:text-teal-700 transition-colors duration-300">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                      {service.description}
                    </p>

                    {/* Features */}
                    <div className="flex flex-wrap gap-2">
                      {service.features.map((f, j) => (
                        <span
                          key={j}
                          className="inline-flex items-center text-xs font-medium text-teal-600 bg-teal-50 rounded-lg px-2.5 py-1"
                        >
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                          {f}
                        </span>
                      ))}
                    </div>
                  </CardContent>

                  {/* Hover gradient line at top */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-500 to-sky-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </Card>
              </motion.div>
            ))}
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  WHY CHOOSE US                                                      */
/* ------------------------------------------------------------------ */
const stats = [
  { value: 15, suffix: "+", label: "Years Experience" },
  { value: 500, suffix: "+", label: "Happy Customers" },
  { value: 1000, suffix: "+", label: "Pools Serviced" },
  { value: 4.9, suffix: "", label: "Average Rating", decimals: 1 },
];

const reasons = [
  {
    icon: Shield,
    title: "Licensed & Fully Insured",
    desc: "Complete peace of mind with full liability coverage and professional licensing.",
  },
  {
    icon: Clock,
    title: "Reliable & On Time",
    desc: "We respect your schedule. Consistent service days and prompt arrivals guaranteed.",
  },
  {
    icon: Heart,
    title: "Family-Owned & Operated",
    desc: "Personal service you can trust. We treat every pool like it's our own.",
  },
  {
    icon: Award,
    title: "Upfront Pricing",
    desc: "No hidden fees or surprise charges. Transparent quotes every time.",
  },
];

function WhyUsSection() {
  const countersRef = useRef(null);
  const isInView = useInView(countersRef, { once: true, margin: "-100px" });

  return (
    <section id="why-us" className="py-24 sm:py-32 bg-gradient-to-b from-teal-50/50 to-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <motion.div variants={fadeUp} custom={0} className="text-center max-w-2xl mx-auto mb-16">
            <Badge className="bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100 mb-4">
              <Star className="w-3.5 h-3.5 mr-1.5" />
              Why Choose Us
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
              The <span className="text-gradient-water">Blessed</span> Difference
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Reliability, efficiency, and personal integrity combine to create a five-star experience for
              every customer.
            </p>
          </motion.div>
        </SectionReveal>

        {/* Stats */}
        <div ref={countersRef} className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, i) => (
            <SectionReveal key={i}>
              <motion.div
                variants={scaleIn}
                custom={i}
                className="relative bg-white rounded-2xl p-6 sm:p-8 text-center shadow-sm hover:shadow-lg hover:shadow-teal-500/5 transition-all duration-300"
              >
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-gradient-water">
                  {isInView ? (
                    <Counter target={stat.value} suffix={stat.suffix} decimals={stat.decimals || 0} />
                  ) : (
                    "0"
                  )}
                </div>
                <p className="mt-2 text-sm text-muted-foreground font-medium">{stat.label}</p>
              </motion.div>
            </SectionReveal>
          ))}
        </div>

        {/* Reasons grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reasons.map((r, i) => (
            <SectionReveal key={i}>
              <motion.div
                variants={fadeUp}
                custom={i}
                className="flex gap-5 p-6 rounded-2xl bg-white shadow-sm hover:shadow-lg hover:shadow-teal-500/5 transition-all duration-300 group"
              >
                <div className="shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-teal-50 to-teal-100 flex items-center justify-center group-hover:from-teal-500 group-hover:to-teal-600 transition-all duration-500">
                  <r.icon className="w-6 h-6 text-teal-600 group-hover:text-white transition-colors duration-500" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">{r.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{r.desc}</p>
                </div>
              </motion.div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Counter({
  target,
  suffix = "",
  decimals = 0,
}: {
  target: number;
  suffix?: string;
  decimals?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * target;
      setCount(current);
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [inView, target]);

  return (
    <span ref={ref}>
      {decimals > 0 ? count.toFixed(decimals) : Math.floor(count)}
      {suffix}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  PROCESS                                                            */
/* ------------------------------------------------------------------ */
const steps = [
  {
    step: "01",
    icon: Phone,
    title: "Call or Book Online",
    desc: "Reach out via phone, email, or our contact form. Tell us about your pool and what you need.",
  },
  {
    step: "02",
    icon: Users,
    title: "Free Assessment",
    desc: "We visit your property to evaluate your pool's condition and provide a transparent, no-obligation quote.",
  },
  {
    step: "03",
    icon: Zap,
    title: "Expert Service",
    desc: "Our trained technicians perform the work with precision, using professional-grade equipment and products.",
  },
  {
    step: "04",
    icon: Heart,
    title: "Ongoing Care",
    desc: "Enjoy a sparkling clean pool with our scheduled maintenance. We handle everything so you don't have to.",
  },
];

function ProcessSection() {
  return (
    <section className="py-24 sm:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(20,184,166,0.06),transparent_60%)]" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <motion.div variants={fadeUp} custom={0} className="text-center max-w-2xl mx-auto mb-16">
            <Badge className="bg-teal-50 text-teal-700 border-teal-200 hover:bg-teal-100 mb-4">
              <Zap className="w-3.5 h-3.5 mr-1.5" />
              How It Works
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
              Simple as <span className="text-gradient-water">1, 2, 3... 4</span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Getting started with Blessed Pool Service is easy and hassle-free.
            </p>
          </motion.div>
        </SectionReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((s, i) => (
            <SectionReveal key={i}>
              <motion.div variants={fadeUp} custom={i + 1} className="relative text-center group">
                {/* Connector line */}
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-[calc(50%+40px)] right-[calc(-50%+40px)] h-px bg-gradient-to-r from-teal-300 to-transparent" />
                )}

                {/* Step number */}
                <div className="relative inline-flex mb-6">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center shadow-lg shadow-teal-500/20 group-hover:shadow-teal-500/30 transition-shadow duration-300 group-hover:scale-105 transition-transform">
                    <s.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center">
                    <span className="text-xs font-bold text-teal-600">{s.step}</span>
                  </div>
                </div>

                <h3 className="text-lg font-bold mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">{s.desc}</p>
              </motion.div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  TESTIMONIALS                                                       */
/* ------------------------------------------------------------------ */
const reviews = [
  {
    name: "Maria G.",
    location: "Glendale, CA",
    rating: 5,
    text: "Reliability, efficiency, and high personal integrity combine to make Paul and his staff a Five Star experience. I've been using them for over 3 years and couldn't be happier!",
    date: "2 months ago",
  },
  {
    name: "David K.",
    location: "Burbank, CA",
    rating: 5,
    text: "Best pool service we've ever had. They show up on time, every time, and our pool has never looked better. The communication is excellent and pricing is fair.",
    date: "3 months ago",
  },
  {
    name: "Jennifer L.",
    location: "Pasadena, CA",
    rating: 5,
    text: "After switching from another company, the difference was night and day. Blessed Pool Service truly cares about their customers. Highly recommend!",
    date: "1 month ago",
  },
  {
    name: "Robert M.",
    location: "Garden Grove, CA",
    rating: 5,
    text: "Paul fixed our heater issue the same day we called. He explained everything clearly and the price was very reasonable. A truly blessed experience!",
    date: "5 months ago",
  },
  {
    name: "Sarah T.",
    location: "Silver Lake, CA",
    rating: 5,
    text: "We had a green pool emergency and they came out within hours. By the next day our pool was crystal clear. Lifesavers! Will definitely use their weekly service.",
    date: "2 weeks ago",
  },
];

function ReviewsSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const next = useCallback(() => setActiveIndex((p) => (p + 1) % reviews.length), []);
  const prev = useCallback(
    () => setActiveIndex((p) => (p - 1 + reviews.length) % reviews.length),
    []
  );

  return (
    <section id="reviews" className="py-24 sm:py-32 bg-gradient-to-b from-white to-teal-50/30 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <motion.div variants={fadeUp} custom={0} className="text-center max-w-2xl mx-auto mb-16">
            <Badge className="bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100 mb-4">
              <Star className="w-3.5 h-3.5 mr-1.5" />
              Testimonials
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
              What Our <span className="text-gradient-water">Customers</span> Say
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Real reviews from real customers. Our reputation speaks for itself.
            </p>
          </motion.div>
        </SectionReveal>

        {/* Featured review */}
        <SectionReveal>
          <div className="relative max-w-3xl mx-auto mb-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.98 }}
                transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="bg-white rounded-3xl p-8 sm:p-10 shadow-lg shadow-black/5 relative"
              >
                {/* Quote icon */}
                <div className="absolute -top-4 left-8 sm:left-10 w-10 h-10 rounded-full bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center shadow-lg shadow-teal-500/20">
                  <Quote className="w-5 h-5 text-white" />
                </div>

                {/* Stars */}
                <div className="flex gap-1 mb-6 pt-2">
                  {[...Array(reviews[activeIndex].rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>

                {/* Text */}
                <p className="text-lg sm:text-xl leading-relaxed text-foreground mb-6 font-medium">
                  &ldquo;{reviews[activeIndex].text}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-teal-500 to-sky-500 flex items-center justify-center text-white font-bold text-sm">
                    {reviews[activeIndex].name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold">{reviews[activeIndex].name}</p>
                    <p className="text-sm text-muted-foreground">
                      {reviews[activeIndex].location} · {reviews[activeIndex].date}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation arrows */}
            <button
              onClick={prev}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 sm:-translate-x-6 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-teal-50 transition-colors z-10"
              aria-label="Previous review"
            >
              <ChevronDown className="w-5 h-5 -rotate-90" />
            </button>
            <button
              onClick={next}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 sm:translate-x-6 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-teal-50 transition-colors z-10"
              aria-label="Next review"
            >
              <ChevronDown className="w-5 h-5 rotate-90" />
            </button>
          </div>
        </SectionReveal>

        {/* Dots */}
        <div className="flex justify-center gap-2 mb-14">
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === activeIndex ? "w-8 bg-teal-500" : "w-2 bg-teal-200 hover:bg-teal-300"
              }`}
              aria-label={`Go to review ${i + 1}`}
            />
          ))}
        </div>

        {/* Review cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {reviews
            .filter((_, i) => i !== activeIndex)
            .slice(0, 3)
            .map((review, i) => (
              <SectionReveal key={i}>
                <motion.div
                  variants={fadeIn}
                  custom={i}
                  onClick={() => setActiveIndex(reviews.indexOf(review))}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 shadow-sm hover:shadow-md cursor-pointer transition-all duration-300 border border-transparent hover:border-teal-200"
                >
                  <div className="flex gap-0.5 mb-3">
                    {[...Array(review.rating)].map((_, j) => (
                      <Star key={j} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-sm text-foreground/80 line-clamp-3 mb-3">
                    &ldquo;{review.text}&rdquo;
                  </p>
                  <p className="text-xs font-semibold">{review.name}</p>
                  <p className="text-xs text-muted-foreground">{review.location}</p>
                </motion.div>
              </SectionReveal>
            ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  SERVICE AREAS                                                      */
/* ------------------------------------------------------------------ */
const areas = [
  "Glendale",
  "Burbank",
  "Pasadena",
  "Garden Grove",
  "Silver Lake",
  "Los Feliz",
  "Eagle Rock",
  "Highland Park",
  "South Pasadena",
  "San Marino",
  "Alhambra",
  "Montebello",
  "La Crescenta",
  "La Canada",
  "Monrovia",
  "Arcadia",
];

function AreasSection() {
  return (
    <section id="areas" className="py-24 sm:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-teal-950 to-teal-900" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(20,184,166,0.15),transparent_60%)]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <motion.div variants={fadeUp} custom={0} className="text-center max-w-2xl mx-auto mb-16">
            <Badge className="bg-white/10 text-teal-300 border-white/20 hover:bg-white/20 mb-4 backdrop-blur-sm">
              <MapPin className="w-3.5 h-3.5 mr-1.5" />
              Service Areas
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
              Serving Greater{" "}
              <span className="bg-gradient-to-r from-teal-300 to-sky-300 bg-clip-text text-transparent">
                Los Angeles
              </span>
            </h2>
            <p className="mt-4 text-lg text-teal-200/70">
              Proudly serving communities throughout Los Angeles County and Orange County.
            </p>
          </motion.div>
        </SectionReveal>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {areas.map((area, i) => (
            <SectionReveal key={i}>
              <motion.div
                variants={fadeUp}
                custom={i + 1}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 text-center hover:bg-white/10 hover:border-teal-400/30 transition-all duration-300 cursor-default group"
              >
                <MapPin className="w-4 h-4 text-teal-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium text-white/90">{area}</span>
              </motion.div>
            </SectionReveal>
          ))}
        </div>

        <SectionReveal>
          <motion.div variants={fadeUp} custom={18} className="text-center mt-12">
            <p className="text-teal-300/60 text-sm mb-4">
              Don&apos;t see your area? Contact us — we may still serve you!
            </p>
            <Button
              asChild
              className="bg-white/10 text-white border border-white/20 hover:bg-white/20 backdrop-blur-sm rounded-xl"
            >
              <a href="#contact">Ask About Your Area</a>
            </Button>
          </motion.div>
        </SectionReveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  CONTACT / CTA                                                      */
/* ------------------------------------------------------------------ */
function ContactSection() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate submission
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-24 sm:py-32 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-teal-50 rounded-full blur-3xl -translate-y-1/2 opacity-50" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <motion.div variants={fadeUp} custom={0} className="text-center max-w-2xl mx-auto mb-16">
            <Badge className="bg-teal-50 text-teal-700 border-teal-200 hover:bg-teal-100 mb-4">
              <Send className="w-3.5 h-3.5 mr-1.5" />
              Get In Touch
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
              Ready for a{" "}
              <span className="text-gradient-water">Crystal Clear</span> Pool?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Get your free, no-obligation estimate today. We respond within 24 hours.
            </p>
          </motion.div>
        </SectionReveal>

        <div className="grid lg:grid-cols-5 gap-10 max-w-6xl mx-auto">
          {/* Contact info */}
          <SectionReveal className="lg:col-span-2">
            <motion.div variants={fadeUp} custom={1} className="space-y-6">
              <Card className="border-0 shadow-sm bg-gradient-to-br from-teal-600 to-teal-700 text-white overflow-hidden">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-2">Let&apos;s Talk</h3>
                  <p className="text-teal-100 text-sm mb-8">
                    Reach out and we&apos;ll get back to you fast.
                  </p>

                  <div className="space-y-5">
                    <a
                      href="tel:7145618301"
                      className="flex items-center gap-4 group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center group-hover:bg-white/25 transition-colors">
                        <Phone className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs text-teal-200">Call Us</p>
                        <p className="font-semibold text-lg">(714) 561-8301</p>
                      </div>
                    </a>

                    <a
                      href="mailto:blessedpoolservice@gmail.com"
                      className="flex items-center gap-4 group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center group-hover:bg-white/25 transition-colors">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs text-teal-200">Email Us</p>
                        <p className="font-semibold text-sm break-all">
                          blessedpoolservice@gmail.com
                        </p>
                      </div>
                    </a>

                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs text-teal-200">Service Area</p>
                        <p className="font-semibold">Glendale, CA & Surrounding</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center">
                        <Clock className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs text-teal-200">Hours</p>
                        <p className="font-semibold">Mon - Sat: 7AM - 6PM</p>
                      </div>
                    </div>
                  </div>

                  <Separator className="my-8 bg-white/20" />

                  {/* Social links */}
                  <div className="flex items-center gap-3">
                    <a
                      href="https://www.facebook.com/ablessedpoolservice/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center hover:bg-white/25 transition-colors"
                      aria-label="Facebook"
                    >
                      <Facebook className="w-5 h-5" />
                    </a>
                    <a
                      href="https://www.yelp.com/biz/blessed-pool-service-garden-grove"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center hover:bg-white/25 transition-colors"
                      aria-label="Yelp"
                    >
                      <Star className="w-5 h-5" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </SectionReveal>

          {/* Contact form */}
          <SectionReveal className="lg:col-span-3">
            <motion.div variants={fadeUp} custom={2}>
              <Card className="border-0 shadow-sm bg-white">
                <CardContent className="p-8">
                  <AnimatePresence mode="wait">
                    {submitted ? (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-center py-12"
                      >
                        <div className="w-16 h-16 rounded-full bg-teal-50 flex items-center justify-center mx-auto mb-6">
                          <CheckCircle2 className="w-8 h-8 text-teal-600" />
                        </div>
                        <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                        <p className="text-muted-foreground">
                          Thank you for reaching out. We&apos;ll get back to you within 24 hours.
                        </p>
                        <Button
                          onClick={() => {
                            setSubmitted(false);
                            setFormData({ name: "", email: "", phone: "", message: "" });
                          }}
                          variant="outline"
                          className="mt-6 rounded-xl"
                        >
                          Send Another Message
                        </Button>
                      </motion.div>
                    ) : (
                      <motion.form
                        key="form"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onSubmit={handleSubmit}
                        className="space-y-5"
                      >
                        <div className="grid sm:grid-cols-2 gap-5">
                          <div>
                            <label className="text-sm font-medium mb-1.5 block">
                              Full Name <span className="text-destructive">*</span>
                            </label>
                            <Input
                              required
                              placeholder="John Smith"
                              value={formData.name}
                              onChange={(e) =>
                                setFormData({ ...formData, name: e.target.value })
                              }
                              className="rounded-xl h-11"
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium mb-1.5 block">
                              Email <span className="text-destructive">*</span>
                            </label>
                            <Input
                              required
                              type="email"
                              placeholder="john@example.com"
                              value={formData.email}
                              onChange={(e) =>
                                setFormData({ ...formData, email: e.target.value })
                              }
                              className="rounded-xl h-11"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="text-sm font-medium mb-1.5 block">
                            Phone Number
                          </label>
                          <Input
                            type="tel"
                            placeholder="(714) 000-0000"
                            value={formData.phone}
                            onChange={(e) =>
                              setFormData({ ...formData, phone: e.target.value })
                            }
                            className="rounded-xl h-11"
                          />
                        </div>

                        <div>
                          <label className="text-sm font-medium mb-1.5 block">
                            How can we help? <span className="text-destructive">*</span>
                          </label>
                          <Textarea
                            required
                            placeholder="Tell us about your pool and what services you're interested in..."
                            value={formData.message}
                            onChange={(e) =>
                              setFormData({ ...formData, message: e.target.value })
                            }
                            className="rounded-xl min-h-[140px] resize-none"
                          />
                        </div>

                        <Button
                          type="submit"
                          disabled={loading}
                          className="w-full bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white shadow-lg shadow-teal-600/20 hover:shadow-teal-600/30 rounded-xl h-12 text-base font-semibold group"
                        >
                          {loading ? (
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                            />
                          ) : (
                            <>
                              Send Message
                              <Send className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                            </>
                          )}
                        </Button>

                        <p className="text-xs text-center text-muted-foreground">
                          We&apos;ll never share your information. Response time is typically under 24
                          hours.
                        </p>
                      </motion.form>
                    )}
                  </AnimatePresence>
                </CardContent>
              </Card>
            </motion.div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  FOOTER                                                             */
/* ------------------------------------------------------------------ */
function Footer() {
  return (
    <footer className="bg-teal-950 text-white pt-16 pb-8 relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal-500/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center">
                <Droplets className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold">Blessed Pool Service</span>
            </div>
            <p className="text-teal-300/60 text-sm leading-relaxed mb-6">
              Professional pool cleaning, maintenance, and repair services. Keeping pools crystal clear
              since 2009.
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.facebook.com/ablessedpoolservice/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://www.yelp.com/biz/blessed-pool-service-garden-grove"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="Yelp"
              >
                <Star className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-sm mb-4 tracking-wide uppercase text-teal-300/80">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-sm text-teal-200/50 hover:text-white transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-sm mb-4 tracking-wide uppercase text-teal-300/80">
              Services
            </h4>
            <ul className="space-y-3">
              {services.slice(0, 6).map((s, i) => (
                <li key={i}>
                  <a
                    href="#services"
                    className="text-sm text-teal-200/50 hover:text-white transition-colors"
                  >
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-sm mb-4 tracking-wide uppercase text-teal-300/80">
              Contact
            </h4>
            <ul className="space-y-3 text-sm text-teal-200/50">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 shrink-0 text-teal-400" />
                <a href="tel:7145618301" className="hover:text-white transition-colors">
                  (714) 561-8301
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 shrink-0 text-teal-400" />
                <a
                  href="mailto:blessedpoolservice@gmail.com"
                  className="hover:text-white transition-colors break-all"
                >
                  blessedpoolservice@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 shrink-0 text-teal-400 mt-0.5" />
                <span>Glendale, CA 91221, United States</span>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="bg-white/10 mb-8" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-teal-300/40">
          <p>&copy; {new Date().getFullYear()} Blessed Pool Service. All rights reserved.</p>
          <p>
            Licensed & Insured · Serving Greater Los Angeles
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/*  MAIN PAGE                                                          */
/* ------------------------------------------------------------------ */
export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <ServicesSection />
      <ProcessSection />
      <WhyUsSection />
      <ReviewsSection />
      <AreasSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
