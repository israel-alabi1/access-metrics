import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, TrendingUp, Users, DollarSign, CheckCircle2, BarChart3, ChevronRight } from "lucide-react";
import Navbar from "../components/Navbar";
import dashboardPreview from "../assets/dashboard-preview.png";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: "easeOut" as const },
  }),
};

const METRICS = [
  { icon: TrendingUp, label: "Simulated Conversion Uplift", value: "+12.4%", color: "text-primary", bg: "bg-primary-light" },
  { icon: Users, label: "Simulated Retention Uplift", value: "+8.1%", color: "text-uplift", bg: "bg-uplift-light" },
  { icon: DollarSign, label: "Simulated Revenue", value: "$27,795", color: "text-violet-600", bg: "bg-violet-50" },
];

const FEATURES = [
  "Interactive accessibility feature controls",
  "Accessibility vs standard-user comparison",
  "Illustrative revenue attribution model",
  "Transparent simulation assumptions",
  "Keyboard-friendly accessibility controls",
  "Local accessibility preference persistence",
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-hero pointer-events-none" />
        <div className="absolute top-20 right-10 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-60 h-60 bg-uplift/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 gap-16 items-center">
            {/* Left */}
            <div>
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={0}
                className="inline-flex items-center gap-2 bg-primary-light border border-primary/20 rounded-full px-4 py-1.5 mb-6"
              >
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse-green" />
                <span className="text-primary text-sm font-semibold">Now in Early Access</span>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={1}
                className="font-display font-bold text-5xl text-foreground leading-tight"
              >
                Explore the Potential Impact of{" "}
                <span className="text-primary">Accessible Design</span> With{" "}
                <span className="relative">
                  Accessibility
                  <svg className="absolute -bottom-1 left-0 w-full" height="6" viewBox="0 0 300 6" fill="none">
                    <path d="M0 5 Q75 0 150 3 Q225 6 300 2" stroke="hsl(220 89% 56%)" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={2}
                className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-lg"
              >
                AccessMetrics is an interactive prototype for exploring accessible product experiences
                and demonstrating how accessibility analytics could be presented.
              </motion.p>

              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={3}
                className="flex items-center gap-4 mt-8"
              >
                <Link to="/demo" className="inline-flex items-center gap-2 px-6 py-3.5 bg-gradient-primary text-primary-foreground font-semibold rounded-xl shadow-elevated hover:opacity-90 transition-all duration-200 hover:scale-[1.02]">
                  Explore the Demo
                  <ArrowRight size={16} />
                </Link>
                <Link
                  to="/demo"
                  className="inline-flex items-center gap-2 px-6 py-3.5 border border-border text-foreground font-semibold rounded-xl hover:bg-muted transition-all duration-200"
                >
                  View Live Demo
                  <ChevronRight size={16} />
                </Link>
              </motion.div>

              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={4}
                className="flex items-center gap-6 mt-10 pt-6 border-t border-border/60"
              >
                {METRICS.map((m) => (
                  <div key={m.label} className="text-center">
                    <div className={`text-2xl font-display font-bold ${m.color}`}>{m.value}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{m.label}</div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right – dashboard preview */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={2}
              className="relative"
            >
              <div className="rounded-2xl overflow-hidden shadow-elevated border border-border/60 bg-card">
                <img
                  src={dashboardPreview}
                  alt="AccessMetrics Dashboard Preview"
                  className="w-full object-cover"
                />
              </div>
              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, duration: 0.4 }}
                className="absolute -bottom-4 -left-4 bg-card rounded-xl shadow-elevated border border-border/60 px-4 py-3 flex items-center gap-3"
              >
                <div className="w-8 h-8 rounded-full bg-uplift-light flex items-center justify-center">
                  <TrendingUp size={16} className="text-uplift" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">30-day Retention</p>
                  <p className="font-display font-bold text-sm text-uplift">Illustrative uplift</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <h2 className="font-display font-bold text-3xl text-foreground">
              Everything you need to prove ROI
            </h2>
            <p className="text-muted-foreground mt-3 text-lg max-w-xl mx-auto">
              From accessibility controls to a transparent, illustrative analytics workflow.
            </p>
          </motion.div>

          <div className="grid grid-cols-3 gap-4">
            {FEATURES.map((feature, i) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.4 }}
                className="bg-card rounded-xl border border-border/60 p-5 flex items-center gap-3 shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-0.5"
              >
                <CheckCircle2 size={18} className="text-primary flex-shrink-0" />
                <span className="text-sm font-medium text-foreground">{feature}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-primary rounded-3xl p-12 text-center shadow-elevated"
          >
            <BarChart3 size={40} className="text-primary-foreground/70 mx-auto mb-4" />
            <h2 className="font-display font-bold text-3xl text-primary-foreground">
              Accessibility is no longer compliance.
            </h2>
            <p className="text-primary-foreground/80 text-xl mt-2 font-medium">It's growth.</p>
            <p className="text-primary-foreground/70 mt-4 max-w-md mx-auto">
              Join forward-thinking SaaS teams turning inclusive design into measurable revenue.
            </p>
            <div className="flex items-center justify-center gap-4 mt-8">
              <Link to="/demo" className="px-7 py-3.5 bg-card text-primary font-semibold rounded-xl hover:bg-card/90 transition-all shadow-sm">
                Explore the Demo
              </Link>
              <Link
                to="/dashboard"
                className="px-7 py-3.5 border border-primary-foreground/30 text-primary-foreground font-semibold rounded-xl hover:bg-primary-foreground/10 transition-all inline-flex items-center gap-2"
              >
                See Dashboard
                <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
