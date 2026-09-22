import { TrendingUp, Users, DollarSign, ToggleRight } from "lucide-react";

interface KPICardProps {
  icon: React.ReactNode;
  iconBg: string;
  label: string;
  value: string;
  uplift?: string;
  upliftLabel?: string;
}

export function KPICard({ icon, iconBg, label, value, uplift, upliftLabel }: KPICardProps) {
  return (
    <div className="bg-card rounded-2xl shadow-card border border-border/60 p-5 flex flex-col">
      <div className="flex items-start justify-between mb-3">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${iconBg}`}>
          {icon}
        </div>
        {uplift && (
          <span className="text-xs font-semibold text-uplift flex items-center gap-1">
            <TrendingUp size={12} />
            {uplift}
          </span>
        )}
      </div>
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="font-display font-bold text-2xl text-foreground mt-1">{value}</p>
      {upliftLabel && <p className="text-xs text-muted-foreground mt-1">{upliftLabel}</p>}
    </div>
  );
}

interface ConversionCardProps {
  conversionUplift: string;
  retentionUplift: string;
  retentionPct: string;
}

export function ConversionCard({ conversionUplift, retentionUplift, retentionPct }: ConversionCardProps) {
  return (
    <div className="bg-card rounded-2xl shadow-card border border-border/60 p-6 flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <TrendingUp size={16} className="text-primary" />
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Conversion Uplift
          </span>
        </div>
        <p className="font-display font-bold text-5xl text-foreground leading-none">{conversionUplift}</p>
        <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
          Compared to users without accessibility features enabled.
        </p>
      </div>
      <div className="mt-6 pt-5 border-t border-border/60">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">30-day Retention Uplift</span>
          <span className="text-sm font-semibold text-uplift">{retentionUplift}</span>
        </div>
        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-uplift rounded-full transition-all duration-700"
            style={{ width: retentionPct }}
          />
        </div>
      </div>
    </div>
  );
}

interface DashboardCardsProps {
  featureAdoption: string;
  totalUsers: number;
  revenue: number;
}

export default function DashboardCards({ featureAdoption, totalUsers, revenue }: DashboardCardsProps) {
  return (
    <div className="grid grid-cols-3 gap-4">
      <KPICard
        icon={<ToggleRight size={20} className="text-primary" />}
        iconBg="bg-primary-light"
        label="Feature Adoption Rate"
        value={featureAdoption}
        upliftLabel="Illustrative simulator input"
      />
      <KPICard
        icon={<Users size={20} className="text-violet-600" />}
        iconBg="bg-violet-50"
        label="Total Accessibility Users"
        value={totalUsers.toLocaleString()}
        upliftLabel="Users in simulated cohort"
      />
      <KPICard
        icon={<DollarSign size={20} className="text-uplift" />}
        iconBg="bg-uplift-light"
        label="Attributed Revenue"
        value={`$${revenue.toLocaleString()}`}
        upliftLabel="Based on simulated conversions"
      />
    </div>
  );
}
