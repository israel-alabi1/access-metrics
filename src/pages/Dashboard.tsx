import { useState } from "react";
import { motion } from "framer-motion";
import { Download, Calendar, RefreshCw, Info } from "lucide-react";
import Navbar from "../components/Navbar";
import ComparisonChart from "../components/ComparisonChart";
import DashboardCards, { ConversionCard } from "../components/DashboardCards";
import {
  SIMULATION_ASSUMPTIONS,
  simulateUplift,
} from "../utils/MetricsSimulator";

export default function Dashboard() {
  const [totalUsers, setTotalUsers] = useState(12000);
  const adoptionRate = SIMULATION_ASSUMPTIONS.accessibilityAdoptionRate;
  const metrics = simulateUplift(totalUsers, adoptionRate);

  const handleExport = () => {
    alert(
      "Report export is not connected in this prototype.\\n\\nThe dashboard currently demonstrates simulated accessibility analytics; no production analytics data or PDF generation is connected.",
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-24 pb-12 max-w-7xl mx-auto px-6">
        <div className="flex items-start justify-between mb-8">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-display font-bold text-3xl text-foreground"
            >
              Dashboard Overview
            </motion.h1>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="flex items-center gap-3 mt-2"
            >
              <span className="flex items-center gap-1.5 text-xs font-semibold text-primary uppercase tracking-wide">
                <span className="w-2 h-2 rounded-full bg-primary" />
                Interactive Prototype
              </span>
              <span className="text-muted-foreground text-xs">
                • Metrics are simulated
              </span>
            </motion.div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              className="inline-flex items-center gap-2 px-4 py-2.5 border border-border rounded-xl text-sm font-medium text-foreground hover:bg-muted transition-all"
              aria-label="Selected date range: last 30 days"
            >
              <Calendar size={15} />
              Last 30 days
            </button>
            <button
              type="button"
              onClick={handleExport}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-primary text-primary-foreground font-semibold rounded-xl shadow-sm hover:opacity-90 transition-all text-sm"
            >
              <Download size={15} />
              Export Report
            </button>
          </div>
        </div>

        <div className="mb-5 rounded-xl border border-primary/20 bg-primary-light/40 px-4 py-3 text-sm text-muted-foreground">
          <strong className="text-foreground">Demo data:</strong> this dashboard uses
          illustrative assumptions to demonstrate how accessibility analytics could be
          presented. It is not reporting measured customer outcomes.
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="grid grid-cols-3 gap-5 mb-5"
        >
          <ConversionCard
            conversionUplift={`+${metrics.conversionRate.toFixed(1)}%`}
            retentionUplift={`+${metrics.retentionRate.toFixed(1)}%`}
            retentionPct="65%"
          />
          <div className="col-span-2">
            <ComparisonChart />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <DashboardCards
            featureAdoption={`${Math.round(adoptionRate * 100)}%`}
            totalUsers={metrics.accessibilityUsers}
            revenue={metrics.attributedRevenue}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="mt-5 bg-card rounded-2xl shadow-card border border-border/60 p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center gap-2">
                <RefreshCw size={16} className="text-primary" />
                <h3 className="font-display font-semibold text-foreground">
                  Revenue Impact Simulator
                </h3>
              </div>
              <p className="text-sm text-muted-foreground mt-0.5">
                Adjust the user base to explore the effect of the demo assumptions.
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Total User Base</p>
              <p className="font-display font-bold text-2xl text-foreground">
                {totalUsers.toLocaleString()}
              </p>
            </div>
          </div>

          <input
            type="range"
            min="1000"
            max="50000"
            step="500"
            value={totalUsers}
            onChange={(e) => setTotalUsers(Number(e.target.value))}
            aria-label="Total user base"
            aria-valuetext={`${totalUsers.toLocaleString()} users`}
            className="w-full h-2 bg-muted rounded-full appearance-none cursor-pointer accent-primary mb-6"
          />

          <div className="grid grid-cols-4 gap-4">
            {[
              {
                label: "Accessibility Users",
                value: metrics.accessibilityUsers.toLocaleString(),
                suffix: "users",
                color: "text-primary",
              },
              {
                label: "Conversion Increase",
                value: `+${metrics.conversionIncrease.toLocaleString()}`,
                suffix: "simulated users",
                color: "text-primary",
              },
              {
                label: "Retention Increase",
                value: `+${metrics.retentionIncrease.toLocaleString()}`,
                suffix: "simulated users",
                color: "text-uplift",
              },
              {
                label: "Attributed Revenue",
                value: `$${metrics.attributedRevenue.toLocaleString()}`,
                suffix: "simulated",
                color: "text-uplift",
              },
            ].map((item) => (
              <div key={item.label} className="bg-background rounded-xl p-4 border border-border/60">
                <p className="text-xs text-muted-foreground mb-1">{item.label}</p>
                <p className={`font-display font-bold text-xl ${item.color}`}>{item.value}</p>
                <p className="text-xs text-muted-foreground">{item.suffix}</p>
              </div>
            ))}
          </div>

          <div className="mt-5 pt-4 border-t border-border/60 grid gap-2 text-xs text-muted-foreground sm:grid-cols-3">
            <span>Adoption: {Math.round(adoptionRate * 100)}%</span>
            <span>Conversion uplift: +{metrics.conversionRate.toFixed(1)}%</span>
            <span>Revenue / conversion: ${SIMULATION_ASSUMPTIONS.revenuePerAdditionalConversion}</span>
          </div>
        </motion.div>

        <div className="flex items-start justify-end gap-2 mt-4 text-muted-foreground">
          <Info size={14} className="mt-0.5 shrink-0" />
          <span className="text-xs">
            The simulator is illustrative. Replace these assumptions with validated
            event, cohort, conversion, retention, and revenue data before using the
            dashboard for business decisions.
          </span>
        </div>
      </div>
    </div>
  );
}
