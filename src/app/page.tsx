"use client";

import { useEffect, useRef, useState, useCallback, type ReactNode } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useInView,
} from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  CalendarCheck,
  ClipboardCheck,
  TrendingUp,
  Target,
  Building2,
  FileCheck,
  ShieldCheck,
  GraduationCap,
  Leaf,
  MessageCircle,
  Loader2,
  CheckCircle,
  Crown,
  Radio,
  CircleDot,
} from "lucide-react";

/* ================================================================== */
/*  TYPES                                                              */
/* ================================================================== */
type PageKey = "home" | "services" | "about" | "process" | "areas" | "contact";

/* ================================================================== */
/*  ANIMATION HELPERS                                                   */
/* ================================================================== */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
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
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const pageVariants = {
  initial: { opacity: 0, y: 30 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.3 },
  },
};

function SectionReveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
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

/* ================================================================== */
/*  COUNTER                                                             */
/* ================================================================== */
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
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const duration = 2000;
    const startTime = performance.now();
    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(eased * target);
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

/* ================================================================== */
/*  NAVIGATION                                                          */
/* ================================================================== */
const navLinks: { label: string; href: PageKey }[] = [
  { label: "Home", href: "home" },
  { label: "Services", href: "services" },
  { label: "About", href: "about" },
  { label: "Process", href: "process" },
  { label: "Areas", href: "areas" },
  { label: "Contact", href: "contact" },
];

function Navigation({
  currentPage,
  onNavigate,
}: {
  currentPage: PageKey;
  onNavigate: (page: PageKey) => void;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (page: PageKey) => {
    setMobileOpen(false);
    window.scrollTo({ top: 0 });
    onNavigate(page);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "glass shadow-lg shadow-black/5 py-3"
            : "bg-transparent py-5"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => handleNav("home")}
            className="flex items-center gap-2.5 group cursor-pointer"
          >
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center shadow-lg shadow-teal-500/20 group-hover:shadow-teal-500/40 transition-shadow duration-300">
              <Droplets className="w-5 h-5 text-white" />
              <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-sky-400 rounded-full opacity-80 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-foreground leading-none">
                Blessed Pool
              </span>
              <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-muted-foreground">
                Service &amp; Repair
              </span>
            </div>
          </button>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((l) => (
              <button
                key={l.href}
                onClick={() => handleNav(l.href)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 cursor-pointer ${
                  currentPage === l.href
                    ? "text-teal-700 bg-teal-50"
                    : "text-muted-foreground hover:text-foreground hover:bg-teal-50"
                }`}
              >
                {l.label}
              </button>
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
              onClick={() => handleNav("contact")}
              className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white shadow-lg shadow-teal-600/20 hover:shadow-teal-600/30 transition-all duration-300 rounded-xl cursor-pointer"
            >
              Free Quote
            </Button>
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
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
                <button
                  key={l.href}
                  onClick={() => handleNav(l.href)}
                  className={`w-full text-center py-3 text-lg font-medium rounded-xl transition-all cursor-pointer ${
                    currentPage === l.href
                      ? "text-teal-700 bg-teal-50"
                      : "text-foreground hover:text-teal-700 hover:bg-teal-50"
                  }`}
                >
                  {l.label}
                </button>
              ))}
              <div className="w-full border-t my-4" />
              <a
                href="tel:7145618301"
                className="flex items-center gap-2 text-lg font-semibold text-teal-700"
              >
                <Phone className="w-5 h-5" />
                (714) 561-8301
              </a>
              <Button
                size="lg"
                onClick={() => handleNav("contact")}
                className="w-full mt-2 bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-xl cursor-pointer"
              >
                Get Free Quote
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ================================================================== */
/*  FOOTER                                                              */
/* ================================================================== */
function Footer({ onNavigate }: { onNavigate: (page: PageKey) => void }) {
  return (
    <footer className="bg-teal-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center">
                <Droplets className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold leading-none">
                  Blessed Pool
                </span>
                <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-teal-300/70">
                  Service &amp; Repair
                </span>
              </div>
            </div>
            <p className="text-sm text-teal-200/60 leading-relaxed mb-4">
              Professional pool cleaning, maintenance, and repair services
              serving Greater Los Angeles since 2009.
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.facebook.com/ablessedpoolservice/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-teal-500 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://www.yelp.com/biz/blessed-pool-service-garden-grove"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-red-500 transition-colors"
                aria-label="Yelp"
              >
                <Star className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider text-teal-300 mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <button
                    onClick={() => {
                      window.scrollTo({ top: 0 });
                      onNavigate(l.href);
                    }}
                    className="text-sm text-teal-200/60 hover:text-white transition-colors cursor-pointer"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider text-teal-300 mb-4">
              Services
            </h4>
            <ul className="space-y-2.5 text-sm text-teal-200/60">
              <li>Weekly Pool Cleaning</li>
              <li>Equipment Repair</li>
              <li>Full Pool Maintenance</li>
              <li>Pool Heater Services</li>
              <li>Tile &amp; Surface Care</li>
              <li>Emergency &amp; Green Pool</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider text-teal-300 mb-4">
              Contact Us
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="tel:7145618301"
                  className="flex items-center gap-2 text-sm text-teal-200/60 hover:text-white transition-colors"
                >
                  <Phone className="w-4 h-4 text-teal-400" />
                  (714) 561-8301
                </a>
              </li>
              <li>
                <a
                  href="mailto:blessedpoolservice@gmail.com"
                  className="flex items-center gap-2 text-sm text-teal-200/60 hover:text-white transition-colors"
                >
                  <Mail className="w-4 h-4 text-teal-400" />
                  blessedpoolservice@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm text-teal-200/60">
                <MapPin className="w-4 h-4 text-teal-400 mt-0.5 shrink-0" />
                Glendale, CA 91221
              </li>
              <li className="flex items-start gap-2 text-sm text-teal-200/60">
                <Clock className="w-4 h-4 text-teal-400 mt-0.5 shrink-0" />
                <span>
                  Mon-Sat 7:00 AM - 6:00 PM
                  <br />
                  Sun Closed
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-teal-200/40">
            © 2025 Blessed Pool Service. All rights reserved.
          </p>
          <p className="text-xs text-teal-200/40">
            Licensed &amp; Insured · Serving Greater Los Angeles
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ================================================================== */
/*  1. HOME PAGE                                                        */
/* ================================================================== */
const homeServices = [
  {
    icon: Droplets,
    title: "Pool Cleaning",
    desc: "Professional weekly cleaning with water chemistry balancing and equipment checks.",
  },
  {
    icon: Wrench,
    title: "Equipment Repair",
    desc: "Expert diagnosis and repair for pumps, filters, heaters, and automation systems.",
  },
  {
    icon: Waves,
    title: "Pool Maintenance",
    desc: "Comprehensive maintenance plans to keep your pool running efficiently year-round.",
  },
  {
    icon: ThermometerSun,
    title: "Heater Services",
    desc: "Installation, repair, and optimization for all types of pool heating systems.",
  },
  {
    icon: Sparkles,
    title: "Tile & Surface",
    desc: "Tile cleaning, calcium removal, acid washing, and surface restoration services.",
  },
  {
    icon: Zap,
    title: "Emergency Service",
    desc: "Rapid response for urgent repairs, green pool recovery, and storm damage.",
  },
];

const homeStats = [
  { value: 15, suffix: "+", label: "Years Experience" },
  { value: 500, suffix: "+", label: "Happy Customers" },
  { value: 1000, suffix: "+", label: "Pools Serviced" },
  { value: 4.9, suffix: "", label: "Average Rating", decimals: 1 },
];

const homeTestimonials = [
  {
    name: "Maria G.",
    location: "Glendale, CA",
    rating: 5,
    text: "Reliability, efficiency, and high personal integrity combine to make this a Five Star experience. I've been using them for over 3 years!",
  },
  {
    name: "David K.",
    location: "Burbank, CA",
    rating: 5,
    text: "Best pool service we've ever had. They show up on time, every time, and our pool has never looked better.",
  },
  {
    name: "Jennifer L.",
    location: "Pasadena, CA",
    rating: 5,
    text: "After switching from another company, the difference was night and day. Blessed Pool Service truly cares!",
  },
];

function HomePage({ onNavigate }: { onNavigate: (page: PageKey) => void }) {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-100px" });

  const handleNav = (page: PageKey) => {
    window.scrollTo({ top: 0 });
    onNavigate(page);
  };

  return (
    <div>
      {/* Hero */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center overflow-hidden"
      >
        <motion.div style={{ y: heroY }} className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-110"
            style={{ backgroundImage: "url('/hero-pool.png')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-teal-950/90 via-teal-900/70 to-sky-900/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </motion.div>

        {/* Wave at bottom */}
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <svg
            viewBox="0 0 1440 120"
            className="w-full h-auto"
            preserveAspectRatio="none"
          >
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
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/10"
            style={{
              width: 4 + i * 2,
              height: 4 + i * 2,
              left: `${10 + i * 11}%`,
              bottom: "-5%",
            }}
            animate={{
              y: [0, -350 - i * 80],
              opacity: [0, 0.6, 0],
              scale: [0.5, 1, 0.8],
            }}
            transition={{
              duration: 4 + i * 0.7,
              repeat: Infinity,
              delay: i * 0.6,
              ease: "easeOut",
            }}
          />
        ))}

        {/* Content */}
        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32"
        >
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
              transition={{
                duration: 0.8,
                delay: 0.3,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
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
              ,<br className="hidden sm:block" /> Every Single Time
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-6 text-lg sm:text-xl text-white/80 max-w-xl leading-relaxed"
            >
              Professional pool cleaning, maintenance, and repair services in
              Glendale and the Greater Los Angeles area. Your pool, our passion.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mt-10 flex flex-col sm:flex-row gap-4"
            >
              <Button
                size="lg"
                onClick={() => handleNav("contact")}
                className="bg-white text-teal-800 hover:bg-white/90 shadow-xl shadow-black/10 rounded-xl text-base font-semibold px-8 h-13 group cursor-pointer"
              >
                Get Free Estimate
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => handleNav("services")}
                className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm rounded-xl text-base font-medium px-8 h-13 cursor-pointer"
              >
                Our Services
                <ChevronDown className="w-4 h-4" />
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
                <div
                  key={i}
                  className="flex items-center gap-2 text-white/70"
                >
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

      {/* Brief Services Overview */}
      <section className="py-24 sm:py-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-50" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-sky-50 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 opacity-50" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <motion.div
              variants={fadeUp}
              custom={0}
              className="text-center max-w-2xl mx-auto mb-16"
            >
              <Badge className="bg-teal-50 text-teal-700 border-teal-200 hover:bg-teal-100 mb-4">
                <Droplets className="w-3.5 h-3.5 mr-1.5" />
                Our Services
              </Badge>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
                Everything Your Pool{" "}
                <span className="text-gradient-water">Needs</span>
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                From routine cleaning to complex repairs, we provide
                comprehensive pool services tailored to your needs.
              </p>
            </motion.div>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {homeServices.map((service, i) => (
              <SectionReveal key={i}>
                <motion.div variants={fadeUp} custom={i + 1}>
                  <Card className="group relative h-full border-0 shadow-sm hover:shadow-xl hover:shadow-teal-500/5 transition-all duration-500 bg-white overflow-hidden cursor-pointer"
                    onClick={() => handleNav("services")}
                  >
                    <CardContent className="p-6 pt-7">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-teal-50 to-sky-50 flex items-center justify-center mb-5 group-hover:from-teal-500 group-hover:to-teal-600 transition-all duration-500 shadow-sm">
                        <service.icon className="w-6 h-6 text-teal-600 group-hover:text-white transition-colors duration-500" />
                      </div>
                      <h3 className="text-xl font-bold mb-2 group-hover:text-teal-700 transition-colors duration-300">
                        {service.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {service.desc}
                      </p>
                    </CardContent>
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-500 to-sky-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                  </Card>
                </motion.div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Stats Strip */}
      <section className="py-20 bg-gradient-to-b from-teal-50/50 to-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            ref={statsRef}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {homeStats.map((stat, i) => (
              <motion.div
                key={i}
                variants={scaleIn}
                custom={i}
                initial="hidden"
                animate={statsInView ? "visible" : "hidden"}
                className="relative bg-white rounded-2xl p-6 sm:p-8 text-center shadow-sm hover:shadow-lg hover:shadow-teal-500/5 transition-all duration-300"
              >
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-gradient-water">
                  {statsInView ? (
                    <Counter
                      target={stat.value}
                      suffix={stat.suffix}
                      decimals={stat.decimals || 0}
                    />
                  ) : (
                    "0"
                  )}
                </div>
                <p className="mt-2 text-sm text-muted-foreground font-medium">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Testimonials */}
      <section className="py-24 sm:py-32 bg-gradient-to-b from-white to-teal-50/30 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <motion.div
              variants={fadeUp}
              custom={0}
              className="text-center max-w-2xl mx-auto mb-16"
            >
              <Badge className="bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100 mb-4">
                <Star className="w-3.5 h-3.5 mr-1.5" />
                Testimonials
              </Badge>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
                What Our <span className="text-gradient-water">Customers</span>{" "}
                Say
              </h2>
            </motion.div>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {homeTestimonials.map((review, i) => (
              <SectionReveal key={i}>
                <motion.div
                  variants={fadeUp}
                  custom={i + 1}
                  className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 relative"
                >
                  <div className="absolute -top-3 left-6 w-8 h-8 rounded-full bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center shadow-lg shadow-teal-500/20">
                    <Quote className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex gap-0.5 mb-4 pt-2">
                    {[...Array(review.rating)].map((_, j) => (
                      <Star
                        key={j}
                        className="w-4 h-4 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>
                  <p className="text-sm text-foreground/80 leading-relaxed mb-4">
                    &ldquo;{review.text}&rdquo;
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-500 to-sky-500 flex items-center justify-center text-white font-bold text-sm">
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{review.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {review.location}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-teal-700" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_50%,rgba(14,165,233,0.2),transparent_60%)]" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionReveal>
            <motion.div variants={fadeUp} custom={0}>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
                Ready for Crystal Clear Water?
              </h2>
              <p className="mt-4 text-lg text-teal-100/80 max-w-2xl mx-auto">
                Join hundreds of satisfied homeowners who trust Blessed Pool
                Service for their pool care needs.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  onClick={() => handleNav("contact")}
                  className="bg-white text-teal-800 hover:bg-white/90 rounded-xl text-base font-semibold px-8 shadow-xl cursor-pointer"
                >
                  Get Your Free Estimate
                  <ArrowRight className="w-4 h-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => handleNav("services")}
                  className="border-white/30 text-white hover:bg-white/10 rounded-xl text-base font-medium px-8 cursor-pointer"
                >
                  Explore Services
                </Button>
              </div>
            </motion.div>
          </SectionReveal>
        </div>
      </section>
    </div>
  );
}

/* ================================================================== */
/*  2. SERVICES PAGE                                                    */
/* ================================================================== */
const detailedServices = [
  {
    icon: Droplets,
    title: "Weekly Pool Cleaning",
    desc: "Our most popular service keeps your pool swim-ready all week long with thorough cleaning and water chemistry management.",
    items: [
      "Vacuuming the pool floor",
      "Skimming surface debris",
      "Brushing walls & tile line",
      "Emptying skimmer & pump baskets",
      "Testing & balancing water chemistry",
      "Checking equipment operation",
      "Adding chemicals as needed",
    ],
    image: "/pool-service.jpg",
  },
  {
    icon: Wrench,
    title: "Pool Equipment Repair",
    desc: "Expert diagnosis and repair for all pool equipment. We service all major brands and get your systems running smoothly again.",
    items: [
      "Pump motor repair/replacement",
      "Filter diagnosis & repair",
      "Heater troubleshooting",
      "Timer & automation repair",
      "Leak detection & repair",
      "Pressure side cleaner repair",
    ],
    image: "/service-repair.jpg",
  },
  {
    icon: Waves,
    title: "Full Pool Maintenance",
    desc: "Comprehensive maintenance plans that cover every aspect of pool care, from cleaning to equipment monitoring and seasonal care.",
    items: [
      "Comprehensive weekly cleaning",
      "Chemical management included",
      "Equipment monitoring",
      "Seasonal opening & closing",
      "Filter media replacement",
      "Salt cell inspection",
    ],
    image: "/hero-pool.png",
  },
  {
    icon: ThermometerSun,
    title: "Pool Heater Services",
    desc: "Stay comfortable year-round with our complete heater services. We work with gas, electric, and solar heating systems.",
    items: [
      "Gas heater installation & repair",
      "Electric heat pump service",
      "Solar heating systems",
      "Thermostat & control replacement",
      "Efficiency optimization",
    ],
    image: "/pool-area.jpg",
  },
  {
    icon: Sparkles,
    title: "Tile & Surface Care",
    desc: "Restore your pool's beauty with professional tile cleaning, acid washing, and surface repair services.",
    items: [
      "Tile cleaning & calcium removal",
      "Acid washing",
      "Plaster repair",
      "Surface resurfacing consultation",
      "Deck cleaning",
    ],
    image: "/about-team.jpg",
  },
  {
    icon: Zap,
    title: "Emergency & Green Pool",
    desc: "When disaster strikes, we respond fast. Same-day emergency service for green pools, equipment failures, and storm damage.",
    items: [
      "Same-day emergency response",
      "Green-to-clean transformation",
      "Storm damage recovery",
      "Equipment failure response",
      "Algae treatment",
    ],
    image: "/pool-service.jpg",
  },
];

const servicePlans = [
  {
    name: "Basic",
    price: "$85",
    period: "/month",
    features: [
      "Weekly pool cleaning",
      "Water chemistry balancing",
      "Surface skimming & vacuuming",
      "Basket emptying",
      "Chemicals included",
    ],
    highlight: false,
  },
  {
    name: "Premium",
    price: "$120",
    period: "/month",
    features: [
      "Everything in Basic",
      "Equipment checks each visit",
      "Filter cleaning monthly",
      "Tile brushing weekly",
      "Priority scheduling",
      "Seasonal opening & closing",
    ],
    highlight: true,
  },
  {
    name: "Ultimate",
    price: "$165",
    period: "/month",
    features: [
      "Everything in Premium",
      "Dedicated technician",
      "Discounts on all repairs",
      "Salt system maintenance",
      "Emergency response included",
      "Monthly detailed report",
    ],
    highlight: false,
  },
];

const serviceFAQs = [
  {
    q: "How often should my pool be serviced?",
    a: "For optimal water quality and equipment longevity, we recommend weekly service. However, bi-weekly service can work for pools with lighter usage. We'll help you determine the best schedule based on your pool's unique needs.",
  },
  {
    q: "What's included in a weekly pool cleaning?",
    a: "Our weekly cleaning includes vacuuming, skimming, brushing walls and tile lines, emptying baskets, testing and balancing water chemistry, checking equipment operation, and adding chemicals as needed.",
  },
  {
    q: "Do you provide your own chemicals?",
    a: "Yes! All chemicals needed for water chemistry balancing are included in our service plans. We use high-quality, professional-grade products and carry everything we need on our service vehicles.",
  },
  {
    q: "How do you handle green pools?",
    a: "We offer same-day emergency response for green pools. Our green-to-clean service involves multiple treatments including heavy shocking, algaecide application, thorough cleaning, and filtration. Most pools can be restored within 2-3 days.",
  },
  {
    q: "What areas do you serve?",
    a: "We serve Glendale, Burbank, Pasadena, and the greater Los Angeles area, as well as Orange County communities including Garden Grove, Anaheim, and surrounding cities. Contact us to check availability in your area.",
  },
  {
    q: "Are you licensed and insured?",
    a: "Yes, Blessed Pool Service is fully licensed and insured. We carry comprehensive liability insurance to protect both our team and your property. You can have complete peace of mind with our service.",
  },
  {
    q: "How quickly can you start service?",
    a: "We can typically begin service within 1-2 business days after your free assessment. For emergency situations, we offer same-day response. Contact us to schedule your assessment.",
  },
  {
    q: "What happens if my equipment breaks?",
    a: "If we notice equipment issues during a scheduled visit, we'll diagnose the problem and provide a transparent repair quote before any work begins. Premium and Ultimate plan members receive priority repair scheduling and discounts.",
  },
];

function ServicesPage({ onNavigate }: { onNavigate: (page: PageKey) => void }) {
  return (
    <div>
      {/* Services Hero */}
      <section className="relative py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-600 via-teal-700 to-teal-800" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(14,165,233,0.15),transparent_60%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <Badge className="bg-white/15 text-white border-white/20 backdrop-blur-sm hover:bg-white/20 mb-6 px-4 py-1.5 text-sm font-medium">
              <Droplets className="w-3.5 h-3.5 mr-1.5" />
              Our Services
            </Badge>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight">
              Complete Pool Care{" "}
              <span className="bg-gradient-to-r from-teal-200 to-sky-200 bg-clip-text text-transparent">
                Solutions
              </span>
            </h1>
            <p className="mt-6 text-lg text-teal-100/80 max-w-2xl mx-auto">
              From weekly cleaning to emergency repairs, we offer a full range
              of professional pool services to keep your pool in perfect
              condition.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Detailed Services */}
      <section className="py-24 sm:py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {detailedServices.map((service, i) => (
            <SectionReveal key={i}>
              <motion.div
                variants={fadeUp}
                custom={0}
                className={`flex flex-col ${
                  i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                } gap-8 lg:gap-12 items-center mb-20 last:mb-0`}
              >
                {/* Image */}
                <div className="w-full lg:w-1/2">
                  <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/3]">
                    <div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url('${service.image}')` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-teal-900/40 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center shadow-lg">
                        <service.icon className="w-7 h-7 text-white" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="w-full lg:w-1/2">
                  <h3 className="text-2xl sm:text-3xl font-bold mb-3">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {service.desc}
                  </p>
                  <ul className="space-y-2.5">
                    {service.items.map((item, j) => (
                      <motion.li
                        key={j}
                        variants={fadeIn}
                        custom={j}
                        className="flex items-start gap-2.5"
                      >
                        <CheckCircle2 className="w-5 h-5 text-teal-500 mt-0.5 shrink-0" />
                        <span className="text-sm text-foreground/80">
                          {item}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                  <Button
                    onClick={() => onNavigate("contact")}
                    className="mt-6 bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white rounded-xl cursor-pointer"
                  >
                    Get Quote
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            </SectionReveal>
          ))}
        </div>
      </section>

      {/* Service Plans */}
      <section className="py-24 sm:py-32 bg-gradient-to-b from-teal-50/50 to-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <motion.div
              variants={fadeUp}
              custom={0}
              className="text-center max-w-2xl mx-auto mb-16"
            >
              <Badge className="bg-teal-50 text-teal-700 border-teal-200 hover:bg-teal-100 mb-4">
                <Crown className="w-3.5 h-3.5 mr-1.5" />
                Service Plans
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                Choose Your{" "}
                <span className="text-gradient-water">Perfect Plan</span>
              </h2>
              <p className="mt-4 text-muted-foreground">
                Flexible service plans designed to fit every pool and every
                budget.
              </p>
            </motion.div>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {servicePlans.map((plan, i) => (
              <SectionReveal key={i}>
                <motion.div variants={fadeUp} custom={i + 1}>
                  <Card
                    className={`relative h-full ${
                      plan.highlight
                        ? "border-2 border-teal-500 shadow-xl shadow-teal-500/10"
                        : "border-0 shadow-sm"
                    }`}
                  >
                    {plan.highlight && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <Badge className="bg-gradient-to-r from-teal-500 to-teal-600 text-white border-0 px-4">
                          Most Popular
                        </Badge>
                      </div>
                    )}
                    <CardHeader className="text-center pb-0">
                      <CardTitle className="text-xl">{plan.name}</CardTitle>
                      <CardDescription className="text-sm">
                        {plan.name === "Basic"
                          ? "Weekly cleaning + chemicals"
                          : plan.name === "Premium"
                            ? "Equipment checks + filter cleaning"
                            : "Priority scheduling + repair discounts"}
                      </CardDescription>
                      <div className="pt-4 pb-2">
                        <span className="text-4xl font-bold text-gradient-water">
                          {plan.price}
                        </span>
                        <span className="text-muted-foreground text-sm">
                          {plan.period}
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {plan.features.map((f, j) => (
                          <li key={j} className="flex items-start gap-2.5">
                            <CheckCircle2 className="w-4 h-4 text-teal-500 mt-0.5 shrink-0" />
                            <span className="text-sm text-foreground/80">
                              {f}
                            </span>
                          </li>
                        ))}
                      </ul>
                      <Button
                        onClick={() => onNavigate("contact")}
                        className={`w-full mt-6 rounded-xl cursor-pointer ${
                          plan.highlight
                            ? "bg-gradient-to-r from-teal-600 to-teal-700 text-white hover:from-teal-700 hover:to-teal-800"
                            : ""
                        }`}
                        variant={plan.highlight ? "default" : "outline"}
                      >
                        Get Started
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 sm:py-32">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <motion.div
              variants={fadeUp}
              custom={0}
              className="text-center mb-12"
            >
              <Badge className="bg-teal-50 text-teal-700 border-teal-200 hover:bg-teal-100 mb-4">
                <MessageCircle className="w-3.5 h-3.5 mr-1.5" />
                FAQ
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                Frequently Asked{" "}
                <span className="text-gradient-water">Questions</span>
              </h2>
            </motion.div>
          </SectionReveal>

          <SectionReveal>
            <motion.div variants={fadeIn} custom={0}>
              <Accordion type="single" collapsible className="space-y-2">
                {serviceFAQs.map((faq, i) => (
                  <AccordionItem
                    key={i}
                    value={`faq-${i}`}
                    className="bg-white rounded-xl border shadow-sm px-6"
                  >
                    <AccordionTrigger className="text-left font-semibold text-sm hover:no-underline">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-sm leading-relaxed">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          </SectionReveal>
        </div>
      </section>
    </div>
  );
}

/* ================================================================== */
/*  3. ABOUT PAGE                                                       */
/* ================================================================== */
const values = [
  {
    icon: Shield,
    title: "Integrity",
    desc: "Honest pricing, transparent communication, no hidden fees. We build trust through every interaction.",
  },
  {
    icon: Clock,
    title: "Reliability",
    desc: "Consistent schedules, on-time arrivals, dedicated technicians. You can always count on us.",
  },
  {
    icon: Award,
    title: "Excellence",
    desc: "Trained professionals, quality products, attention to detail. We strive for perfection in every job.",
  },
  {
    icon: Heart,
    title: "Community",
    desc: "Serving our neighbors, supporting local businesses, building lasting relationships in our community.",
  },
];

const comparisons = [
  {
    feature: "Response Time",
    blessed: "Same-Day",
    typical: "2-5 Days",
  },
  {
    feature: "Pricing Transparency",
    blessed: "Upfront & Clear",
    typical: "Hidden Fees",
  },
  {
    feature: "Technician Training",
    blessed: "Certified Pros",
    typical: "Variable",
  },
  {
    feature: "Satisfaction Guarantee",
    blessed: "100% Guaranteed",
    typical: "Limited",
  },
  {
    feature: "Communication",
    blessed: "Real-Time Updates",
    typical: "Minimal",
  },
];

const certifications = [
  { icon: FileCheck, label: "Licensed Contractor" },
  { icon: ShieldCheck, label: "Fully Insured" },
  { icon: Heart, label: "CPR/First Aid Certified" },
  { icon: Building2, label: "OSHA Compliant" },
  { icon: Leaf, label: "EPA Compliant Chemical Use" },
  { icon: GraduationCap, label: "Continuous Training" },
];

function AboutPage() {
  return (
    <div>
      {/* About Hero */}
      <section className="relative py-32 sm:py-40 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/about-team.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-teal-950/90 via-teal-900/80 to-teal-950/70" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <Badge className="bg-white/15 text-white border-white/20 backdrop-blur-sm hover:bg-white/20 mb-6 px-4 py-1.5 text-sm font-medium">
              <Users className="w-3.5 h-3.5 mr-1.5" />
              About Us
            </Badge>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight">
              A Family Legacy of{" "}
              <span className="bg-gradient-to-r from-teal-300 to-sky-300 bg-clip-text text-transparent">
                Pool Excellence
              </span>
            </h1>
            <p className="mt-6 text-lg text-teal-100/80 max-w-2xl mx-auto">
              Since 2009, Blessed Pool Service has been the trusted name in
              professional pool care across Greater Los Angeles.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <SectionReveal>
              <motion.div variants={fadeUp} custom={0}>
                <Badge className="bg-teal-50 text-teal-700 border-teal-200 hover:bg-teal-100 mb-4">
                  <Heart className="w-3.5 h-3.5 mr-1.5" />
                  Our Story
                </Badge>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-6">
                  From One Man&apos;s Passion to a{" "}
                  <span className="text-gradient-water">Trusted Team</span>
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    In 2009, Hector Ramirez set out with a simple mission: to
                    provide honest, reliable pool service that homeowners could
                    truly trust. What began as a one-man operation in Glendale
                    has grown into one of the area&apos;s most respected pool
                    service companies.
                  </p>
                  <p>
                    Hector&apos;s passion for pool maintenance started early,
                    learning the trade through hands-on experience and a
                    commitment to excellence. His dedication to doing things the
                    right way — never cutting corners, always communicating
                    openly — quickly earned the trust of homeowners throughout
                    the community.
                  </p>
                  <p>
                    Today, Blessed Pool Service carries forward those same core
                    values. Our team of trained professionals serves hundreds of
                    satisfied customers across Glendale, Pasadena, Burbank, and
                    throughout Greater Los Angeles and Orange County.
                  </p>
                </div>
              </motion.div>
            </SectionReveal>

            <SectionReveal>
              <motion.div variants={fadeUp} custom={1}>
                <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/3]">
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: "url('/pool-service.jpg')" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-teal-900/30 to-transparent" />
                </div>
              </motion.div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-24 sm:py-32 bg-gradient-to-b from-teal-50/50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <motion.div
              variants={fadeUp}
              custom={0}
              className="text-center max-w-2xl mx-auto mb-16"
            >
              <Badge className="bg-teal-50 text-teal-700 border-teal-200 hover:bg-teal-100 mb-4">
                <Target className="w-3.5 h-3.5 mr-1.5" />
                Our Values
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                What We <span className="text-gradient-water">Stand For</span>
              </h2>
            </motion.div>
          </SectionReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <SectionReveal key={i}>
                <motion.div variants={fadeUp} custom={i + 1}>
                  <Card className="h-full border-0 shadow-sm hover:shadow-lg hover:shadow-teal-500/5 transition-all duration-300 group">
                    <CardContent className="p-6 text-center">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-50 to-sky-50 flex items-center justify-center mx-auto mb-5 group-hover:from-teal-500 group-hover:to-teal-600 transition-all duration-500">
                        <v.icon className="w-7 h-7 text-teal-600 group-hover:text-white transition-colors duration-500" />
                      </div>
                      <h3 className="font-bold text-lg mb-2">{v.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {v.desc}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Blessed Pool - Comparison */}
      <section className="py-24 sm:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <motion.div
              variants={fadeUp}
              custom={0}
              className="text-center mb-12"
            >
              <Badge className="bg-teal-50 text-teal-700 border-teal-200 hover:bg-teal-100 mb-4">
                <TrendingUp className="w-3.5 h-3.5 mr-1.5" />
                The Difference
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                Why Choose{" "}
                <span className="text-gradient-water">Blessed Pool</span>
              </h2>
            </motion.div>
          </SectionReveal>

          <SectionReveal>
            <motion.div variants={fadeIn} custom={0}>
              <Card className="border-0 shadow-lg overflow-hidden">
                <div className="grid grid-cols-3 bg-gradient-to-r from-teal-600 to-teal-700 text-white p-4 font-bold text-sm">
                  <span className="pl-4">Feature</span>
                  <span className="text-center">Blessed Pool</span>
                  <span className="text-center text-teal-100/70">
                    Typical Competitor
                  </span>
                </div>
                {comparisons.map((c, i) => (
                  <div
                    key={i}
                    className={`grid grid-cols-3 p-4 text-sm ${
                      i % 2 === 0 ? "bg-white" : "bg-teal-50/30"
                    }`}
                  >
                    <span className="font-medium pl-4">{c.feature}</span>
                    <span className="text-center font-semibold text-teal-700 flex items-center justify-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {c.blessed}
                    </span>
                    <span className="text-center text-muted-foreground">
                      {c.typical}
                    </span>
                  </div>
                ))}
              </Card>
            </motion.div>
          </SectionReveal>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-24 sm:py-32 bg-gradient-to-b from-white to-teal-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <motion.div
              variants={fadeUp}
              custom={0}
              className="text-center max-w-2xl mx-auto mb-12"
            >
              <Badge className="bg-teal-50 text-teal-700 border-teal-200 hover:bg-teal-100 mb-4">
                <ShieldCheck className="w-3.5 h-3.5 mr-1.5" />
                Certifications &amp; Trust
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                Qualified &amp;{" "}
                <span className="text-gradient-water">Certified</span>
              </h2>
            </motion.div>
          </SectionReveal>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {certifications.map((c, i) => (
              <SectionReveal key={i}>
                <motion.div
                  variants={scaleIn}
                  custom={i}
                  className="bg-white rounded-2xl p-5 text-center shadow-sm hover:shadow-lg hover:shadow-teal-500/5 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-50 to-sky-50 flex items-center justify-center mx-auto mb-3 group-hover:from-teal-500 group-hover:to-teal-600 transition-all duration-500">
                    <c.icon className="w-6 h-6 text-teal-600 group-hover:text-white transition-colors duration-500" />
                  </div>
                  <p className="text-xs font-medium text-foreground/80">
                    {c.label}
                  </p>
                </motion.div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

/* ================================================================== */
/*  4. PROCESS PAGE                                                     */
/* ================================================================== */
const processSteps = [
  {
    step: 1,
    icon: Phone,
    title: "Get In Touch",
    desc: "Call, email, or fill out our contact form. Describe your pool and what services you need. We respond within 24 hours to discuss your requirements.",
    image: "/pool-service.jpg",
  },
  {
    step: 2,
    icon: ClipboardCheck,
    title: "Free On-Site Assessment",
    desc: "We visit your property to inspect your pool, equipment, and surrounding area. We evaluate water chemistry, check all systems, and document any issues — no obligation.",
    image: "/pool-area.jpg",
  },
  {
    step: 3,
    icon: FileCheck,
    title: "Custom Service Plan",
    desc: "Based on our assessment, we create a tailored service plan with transparent pricing. We explain everything clearly and answer all your questions before any work begins.",
    image: "/about-team.jpg",
  },
  {
    step: 4,
    icon: Zap,
    title: "Expert Execution",
    desc: "Our trained technicians carry out the work with precision using professional-grade equipment and products. We keep you informed every step of the way.",
    image: "/hero-pool.png",
  },
];

const timelineItems = [
  { day: "Day 1", label: "Assessment", desc: "On-site inspection & evaluation" },
  { day: "Day 2-3", label: "Plan Approval", desc: "Review & approve your custom plan" },
  { day: "Week 1", label: "First Service", desc: "Your first professional cleaning" },
  { day: "Ongoing", label: "Scheduled Care", desc: "Consistent, reliable maintenance" },
];

function ProcessPage({ onNavigate }: { onNavigate: (page: PageKey) => void }) {
  return (
    <div>
      {/* Process Hero */}
      <section className="relative py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-600 via-teal-700 to-teal-800" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(14,165,233,0.15),transparent_60%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <Badge className="bg-white/15 text-white border-white/20 backdrop-blur-sm hover:bg-white/20 mb-6 px-4 py-1.5 text-sm font-medium">
              <Zap className="w-3.5 h-3.5 mr-1.5" />
              How It Works
            </Badge>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight">
              Your Journey to a{" "}
              <span className="bg-gradient-to-r from-teal-200 to-sky-200 bg-clip-text text-transparent">
                Perfect Pool
              </span>
            </h1>
            <p className="mt-6 text-lg text-teal-100/80 max-w-2xl mx-auto">
              Getting started is simple. Follow these four steps and
              you&apos;ll be enjoying crystal clear water in no time.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {processSteps.map((step, i) => (
            <SectionReveal key={i}>
              <motion.div
                variants={fadeUp}
                custom={0}
                className={`flex flex-col ${
                  i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                } gap-8 lg:gap-12 items-center mb-24 last:mb-0`}
              >
                {/* Step number + image */}
                <div className="w-full lg:w-1/2 relative">
                  <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/3]">
                    <div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url('${step.image}')` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-teal-900/40 to-transparent" />
                  </div>
                  <div className="absolute -top-4 -left-4 lg:-top-6 lg:-left-6 w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center shadow-xl shadow-teal-500/20">
                    <span className="text-2xl font-bold text-white">
                      {step.step}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="w-full lg:w-1/2">
                  <div className="flex items-center gap-3 mb-3">
                    <step.icon className="w-6 h-6 text-teal-600" />
                    <h3 className="text-2xl sm:text-3xl font-bold">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            </SectionReveal>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 sm:py-32 bg-gradient-to-b from-teal-50/50 to-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <motion.div
              variants={fadeUp}
              custom={0}
              className="text-center mb-16"
            >
              <Badge className="bg-teal-50 text-teal-700 border-teal-200 hover:bg-teal-100 mb-4">
                <CalendarCheck className="w-3.5 h-3.5 mr-1.5" />
                Timeline
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                What to <span className="text-gradient-water">Expect</span>
              </h2>
            </motion.div>
          </SectionReveal>

          <div className="relative">
            {/* Connector line */}
            <div className="absolute top-6 left-0 right-0 h-0.5 bg-teal-200 hidden md:block" />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
              {timelineItems.map((item, i) => (
                <SectionReveal key={i}>
                  <motion.div
                    variants={fadeUp}
                    custom={i + 1}
                    className="text-center relative"
                  >
                    {/* Dot on connector */}
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-teal-500/20 relative z-10">
                      <CircleDot className="w-5 h-5 text-white" />
                    </div>
                    <div className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-lg transition-all duration-300">
                      <p className="text-xs font-bold text-teal-600 uppercase tracking-wider mb-1">
                        {item.day}
                      </p>
                      <p className="font-bold text-lg mb-1">{item.label}</p>
                      <p className="text-sm text-muted-foreground">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                </SectionReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Satisfaction Guarantee */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <motion.div
              variants={scaleIn}
              custom={0}
              className="bg-gradient-to-br from-teal-600 to-teal-700 rounded-3xl p-8 sm:p-12 text-center text-white relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(14,165,233,0.15),transparent_60%)]" />
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center mx-auto mb-6">
                  <ShieldCheck className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold mb-3">
                  100% Satisfaction Guarantee
                </h3>
                <p className="text-teal-100/80 max-w-xl mx-auto mb-6 leading-relaxed">
                  If you&apos;re not 100% satisfied with our service,
                  we&apos;ll make it right at no additional cost. Your
                  satisfaction is our top priority — that&apos;s the Blessed
                  Pool promise.
                </p>
                <Button
                  size="lg"
                  onClick={() => onNavigate("contact")}
                  className="bg-white text-teal-800 hover:bg-white/90 rounded-xl font-semibold shadow-xl cursor-pointer"
                >
                  Get Started Today
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          </SectionReveal>
        </div>
      </section>
    </div>
  );
}

/* ================================================================== */
/*  5. AREAS PAGE                                                       */
/* ================================================================== */
const areaGroups = [
  {
    region: "Glendale & Surrounding",
    cities: [
      "Glendale",
      "Burbank",
      "Pasadena",
      "Eagle Rock",
      "Los Feliz",
      "Silver Lake",
      "Highland Park",
      "South Pasadena",
    ],
  },
  {
    region: "San Gabriel Valley",
    cities: [
      "San Marino",
      "Alhambra",
      "Montebello",
      "La Crescenta",
      "La Cañada",
      "Arcadia",
    ],
  },
  {
    region: "Orange County",
    cities: [
      "Garden Grove",
      "Anaheim",
      "Orange",
      "Fullerton",
      "Santa Ana",
      "Westminster",
    ],
  },
];

function AreasPage({ onNavigate }: { onNavigate: (page: PageKey) => void }) {
  return (
    <div>
      {/* Areas Hero */}
      <section className="relative py-32 sm:py-40 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/pool-area.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-teal-950/90 via-teal-900/80 to-teal-950/70" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <Badge className="bg-white/15 text-white border-white/20 backdrop-blur-sm hover:bg-white/20 mb-6 px-4 py-1.5 text-sm font-medium">
              <MapPin className="w-3.5 h-3.5 mr-1.5" />
              Service Areas
            </Badge>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight">
              Serving Greater{" "}
              <span className="bg-gradient-to-r from-teal-300 to-sky-300 bg-clip-text text-transparent">
                Los Angeles &amp; Orange County
              </span>
            </h1>
            <p className="mt-6 text-lg text-teal-100/80 max-w-2xl mx-auto">
              Proudly serving communities throughout Los Angeles County and
              Orange County with professional pool care.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Areas Grid */}
      <section className="py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {areaGroups.map((group, i) => (
              <SectionReveal key={i}>
                <motion.div variants={fadeUp} custom={i + 1}>
                  <Card className="h-full border-0 shadow-sm hover:shadow-xl hover:shadow-teal-500/5 transition-all duration-300">
                    <CardHeader className="pb-0">
                      <div className="flex items-center gap-2 mb-1">
                        <MapPin className="w-5 h-5 text-teal-600" />
                        <CardTitle className="text-lg">
                          {group.region}
                        </CardTitle>
                      </div>
                      <CardDescription>
                        {group.cities.length} cities served
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-2">
                        {group.cities.map((city, j) => (
                          <div
                            key={j}
                            className="flex items-center gap-1.5 text-sm text-foreground/80"
                          >
                            <div className="w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0" />
                            {city}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Don't See Your Area */}
      <section className="py-20 bg-gradient-to-b from-teal-50/50 to-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionReveal>
            <motion.div variants={fadeUp} custom={0}>
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                Don&apos;t See Your Area?
              </h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                We&apos;re constantly expanding! Contact us to check if we serve
                your area. We may be able to accommodate your location.
              </p>
              <Button
                size="lg"
                onClick={() => onNavigate("contact")}
                className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white rounded-xl cursor-pointer"
              >
                Contact Us to Check
                <ArrowRight className="w-4 h-4" />
              </Button>
            </motion.div>
          </SectionReveal>
        </div>
      </section>

      {/* Service Coverage Details */}
      <section className="py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <SectionReveal>
              <motion.div variants={fadeUp} custom={0}>
                <Card className="h-full border-0 shadow-sm text-center">
                  <CardContent className="p-6 pt-7">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-50 to-sky-50 flex items-center justify-center mx-auto mb-5">
                      <MapPin className="w-7 h-7 text-teal-600" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">Wide Coverage</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      We serve a broad area spanning Los Angeles County and
                      Orange County, covering over 20 communities within our
                      service radius.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </SectionReveal>
            <SectionReveal>
              <motion.div variants={fadeUp} custom={1}>
                <Card className="h-full border-0 shadow-sm text-center">
                  <CardContent className="p-6 pt-7">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-50 to-sky-50 flex items-center justify-center mx-auto mb-5">
                      <Clock className="w-7 h-7 text-teal-600" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">
                      Quick Response Times
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Most service calls are responded to within 24 hours.
                      Emergency calls receive same-day response across our
                      entire service area.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </SectionReveal>
            <SectionReveal>
              <motion.div variants={fadeUp} custom={2}>
                <Card className="h-full border-0 shadow-sm text-center">
                  <CardContent className="p-6 pt-7">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-50 to-sky-50 flex items-center justify-center mx-auto mb-5">
                      <Radio className="w-7 h-7 text-teal-600" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">
                      Growing Every Day
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Our service area continues to expand as we hire more
                      technicians. Contact us even if your city isn&apos;t
                      listed — we may still serve you!
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </SectionReveal>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ================================================================== */
/*  6. CONTACT PAGE                                                     */
/* ================================================================== */
const contactFAQs = [
  {
    q: "What's the best way to reach you?",
    a: "You can call us at (714) 561-8301, email us at blessedpoolservice@gmail.com, or use the contact form on this page. We respond within 24 hours.",
  },
  {
    q: "Do you offer free estimates?",
    a: "Yes! We offer free, no-obligation on-site assessments. We'll visit your property, evaluate your pool, and provide a transparent quote before any work begins.",
  },
  {
    q: "What are your hours?",
    a: "We're open Monday through Saturday from 7:00 AM to 6:00 PM. We're closed on Sundays. Emergency service is available outside regular hours when possible.",
  },
  {
    q: "How soon can I get service?",
    a: "We can typically schedule your free assessment within 1-2 business days. For emergencies, we offer same-day response. Contact us to check availability.",
  },
];

function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    contactMethod: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div>
      {/* Contact Hero */}
      <section className="relative py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-600 via-teal-700 to-teal-800" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_80%,rgba(14,165,233,0.15),transparent_60%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <Badge className="bg-white/15 text-white border-white/20 backdrop-blur-sm hover:bg-white/20 mb-6 px-4 py-1.5 text-sm font-medium">
              <Mail className="w-3.5 h-3.5 mr-1.5" />
              Get In Touch
            </Badge>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight">
              Let&apos;s Make Your Pool{" "}
              <span className="bg-gradient-to-r from-teal-200 to-sky-200 bg-clip-text text-transparent">
                Perfect
              </span>
            </h1>
            <p className="mt-6 text-lg text-teal-100/80 max-w-2xl mx-auto">
              Get a free estimate or ask us anything. We&apos;re here to help
              you enjoy crystal clear water.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form + Info */}
      <section className="py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Form */}
            <div className="lg:col-span-3">
              <SectionReveal>
                <motion.div variants={fadeUp} custom={0}>
                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-2xl">
                        Send Us a Message
                      </CardTitle>
                      <CardDescription>
                        Fill out the form below and we&apos;ll get back to you
                        within 24 hours.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <AnimatePresence mode="wait">
                        {submitted ? (
                          <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="text-center py-12"
                          >
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{
                                delay: 0.2,
                                type: "spring",
                                stiffness: 200,
                              }}
                              className="w-20 h-20 rounded-full bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-teal-500/20"
                            >
                              <CheckCircle className="w-10 h-10 text-white" />
                            </motion.div>
                            <h3 className="text-2xl font-bold mb-2">
                              Message Sent!
                            </h3>
                            <p className="text-muted-foreground">
                              Thank you for reaching out. We&apos;ll get back to
                              you within 24 hours.
                            </p>
                            <Button
                              onClick={() => {
                                setSubmitted(false);
                                setFormData({
                                  name: "",
                                  email: "",
                                  phone: "",
                                  service: "",
                                  contactMethod: "",
                                  message: "",
                                });
                              }}
                              variant="outline"
                              className="mt-6 rounded-xl cursor-pointer"
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
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="name">Full Name *</Label>
                                <Input
                                  id="name"
                                  name="name"
                                  placeholder="John Smith"
                                  required
                                  value={formData.name}
                                  onChange={handleChange}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="email">Email *</Label>
                                <Input
                                  id="email"
                                  name="email"
                                  type="email"
                                  placeholder="john@example.com"
                                  required
                                  value={formData.email}
                                  onChange={handleChange}
                                />
                              </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="phone">Phone</Label>
                                <Input
                                  id="phone"
                                  name="phone"
                                  type="tel"
                                  placeholder="(714) 555-1234"
                                  value={formData.phone}
                                  onChange={handleChange}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="service">Service Type</Label>
                                <Select
                                  value={formData.service}
                                  onValueChange={(val) =>
                                    setFormData((p) => ({ ...p, service: val }))
                                  }
                                >
                                  <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select a service" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="weekly">
                                      Weekly Cleaning
                                    </SelectItem>
                                    <SelectItem value="one-time">
                                      One-Time Cleaning
                                    </SelectItem>
                                    <SelectItem value="repair">
                                      Equipment Repair
                                    </SelectItem>
                                    <SelectItem value="heater">
                                      Heater Service
                                    </SelectItem>
                                    <SelectItem value="green">
                                      Green Pool
                                    </SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="contactMethod">
                                Preferred Contact Method
                              </Label>
                              <Select
                                value={formData.contactMethod}
                                onValueChange={(val) =>
                                  setFormData((p) => ({
                                    ...p,
                                    contactMethod: val,
                                  }))
                                }
                              >
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="How should we reach you?" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="phone">Phone Call</SelectItem>
                                  <SelectItem value="text">Text Message</SelectItem>
                                  <SelectItem value="email">Email</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="message">Message *</Label>
                              <Textarea
                                id="message"
                                name="message"
                                placeholder="Tell us about your pool and what services you need..."
                                required
                                rows={5}
                                value={formData.message}
                                onChange={handleChange}
                              />
                            </div>

                            <Button
                              type="submit"
                              disabled={loading}
                              size="lg"
                              className="w-full bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white rounded-xl text-base font-semibold cursor-pointer"
                            >
                              {loading ? (
                                <>
                                  <Loader2 className="w-4 h-4 animate-spin" />
                                  Sending...
                                </>
                              ) : (
                                <>
                                  <Send className="w-4 h-4" />
                                  Send Message
                                </>
                              )}
                            </Button>
                          </motion.form>
                        )}
                      </AnimatePresence>
                    </CardContent>
                  </Card>
                </motion.div>
              </SectionReveal>
            </div>

            {/* Contact Info */}
            <div className="lg:col-span-2">
              <SectionReveal>
                <motion.div variants={fadeUp} custom={1}>
                  <div className="bg-gradient-to-br from-teal-600 to-teal-800 rounded-2xl p-6 sm:p-8 text-white shadow-xl sticky top-28">
                    <h3 className="text-xl font-bold mb-6">
                      Contact Information
                    </h3>

                    <div className="space-y-5">
                      <a
                        href="tel:7145618301"
                        className="flex items-start gap-3 group"
                      >
                        <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 group-hover:bg-white/20 transition-colors">
                          <Phone className="w-5 h-5 text-teal-200" />
                        </div>
                        <div>
                          <p className="text-sm text-teal-200/70 mb-0.5">
                            Phone
                          </p>
                          <p className="font-semibold group-hover:text-teal-200 transition-colors">
                            (714) 561-8301
                          </p>
                        </div>
                      </a>

                      <a
                        href="mailto:blessedpoolservice@gmail.com"
                        className="flex items-start gap-3 group"
                      >
                        <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 group-hover:bg-white/20 transition-colors">
                          <Mail className="w-5 h-5 text-teal-200" />
                        </div>
                        <div>
                          <p className="text-sm text-teal-200/70 mb-0.5">
                            Email
                          </p>
                          <p className="font-semibold text-sm group-hover:text-teal-200 transition-colors break-all">
                            blessedpoolservice@gmail.com
                          </p>
                        </div>
                      </a>

                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                          <MapPin className="w-5 h-5 text-teal-200" />
                        </div>
                        <div>
                          <p className="text-sm text-teal-200/70 mb-0.5">
                            Address
                          </p>
                          <p className="font-semibold">
                            Glendale, CA 91221
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                          <Clock className="w-5 h-5 text-teal-200" />
                        </div>
                        <div>
                          <p className="text-sm text-teal-200/70 mb-0.5">
                            Hours
                          </p>
                          <p className="font-semibold">Mon-Sat 7:00 AM - 6:00 PM</p>
                          <p className="text-sm text-teal-200/60">
                            Sun Closed
                          </p>
                        </div>
                      </div>

                      <div className="border-t border-white/10 pt-5">
                        <p className="text-sm text-teal-200/70 mb-3">
                          Follow Us
                        </p>
                        <div className="flex gap-3">
                          <a
                            href="https://www.facebook.com/ablessedpoolservice/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                            aria-label="Facebook"
                          >
                            <Facebook className="w-5 h-5" />
                          </a>
                          <a
                            href="https://www.yelp.com/biz/blessed-pool-service-garden-grove"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                            aria-label="Yelp"
                          >
                            <Star className="w-5 h-5" />
                          </a>
                        </div>
                      </div>

                      <div className="bg-white/10 rounded-xl p-4 mt-2">
                        <div className="flex items-center gap-2 mb-1">
                          <MessageCircle className="w-4 h-4 text-teal-200" />
                          <p className="text-sm font-medium">
                            Quick Response
                          </p>
                        </div>
                        <p className="text-xs text-teal-200/70">
                          We respond to all inquiries within 24 hours.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </SectionReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Contact FAQ */}
      <section className="py-24 sm:py-32 bg-gradient-to-b from-white to-teal-50/30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <motion.div
              variants={fadeUp}
              custom={0}
              className="text-center mb-12"
            >
              <Badge className="bg-teal-50 text-teal-700 border-teal-200 hover:bg-teal-100 mb-4">
                <MessageCircle className="w-3.5 h-3.5 mr-1.5" />
                FAQ
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                Quick <span className="text-gradient-water">Answers</span>
              </h2>
            </motion.div>
          </SectionReveal>

          <SectionReveal>
            <motion.div variants={fadeIn} custom={0}>
              <Accordion type="single" collapsible className="space-y-2">
                {contactFAQs.map((faq, i) => (
                  <AccordionItem
                    key={i}
                    value={`contact-faq-${i}`}
                    className="bg-white rounded-xl border shadow-sm px-6"
                  >
                    <AccordionTrigger className="text-left font-semibold text-sm hover:no-underline">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-sm leading-relaxed">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          </SectionReveal>
        </div>
      </section>
    </div>
  );
}

/* ================================================================== */
/*  MAIN APP                                                            */
/* ================================================================== */
function navigate(page: PageKey) {
  window.location.hash = page;
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageKey>("home");

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace("#", "") as PageKey;
      if (["home", "services", "about", "process", "areas", "contact"].includes(hash)) {
        setCurrentPage(hash);
      } else {
        setCurrentPage("home");
      }
    };

    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation currentPage={currentPage} onNavigate={navigate} />

      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {currentPage === "home" && (
              <HomePage onNavigate={navigate} />
            )}
            {currentPage === "services" && (
              <ServicesPage onNavigate={navigate} />
            )}
            {currentPage === "about" && <AboutPage />}
            {currentPage === "process" && (
              <ProcessPage onNavigate={navigate} />
            )}
            {currentPage === "areas" && (
              <AreasPage onNavigate={navigate} />
            )}
            {currentPage === "contact" && <ContactPage />}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer onNavigate={navigate} />
    </div>
  );
}
