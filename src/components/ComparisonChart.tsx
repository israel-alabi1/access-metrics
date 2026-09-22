import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { CHART_DATA } from "../utils/MetricsSimulator";

export default function ComparisonChart() {
  return (
    <div className="bg-card rounded-2xl shadow-card border border-border/60 p-6">
      <div className="flex items-start justify-between mb-2">
        <div>
          <h3 className="font-display font-semibold text-foreground">
            Accessibility Users vs Standard Users
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Illustrative benchmark values for the prototype
          </p>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-primary inline-block" />
            <span className="text-muted-foreground">Accessibility Users</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-muted inline-block border border-border" />
            <span className="text-muted-foreground">Standard Users</span>
          </span>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={CHART_DATA} barCategoryGap="30%" barGap={6}>
          <CartesianGrid vertical={false} stroke="hsl(214 32% 91%)" strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 13, fill: "hsl(215 16% 47%)", fontFamily: "Inter" }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: "hsl(215 16% 47%)" }}
            tickFormatter={(v) => `${v}%`}
          />
          <Tooltip
            contentStyle={{
              borderRadius: "12px",
              border: "1px solid hsl(214 32% 91%)",
              boxShadow: "var(--shadow-card)",
              fontFamily: "Inter",
              fontSize: "13px",
            }}
            formatter={(value: number) => [`${value}%`]}
          />
          <Bar
            dataKey="accessibility"
            name="Accessibility Users"
            fill="hsl(220 89% 56%)"
            radius={[6, 6, 0, 0]}
          />
          <Bar
            dataKey="standard"
            name="Standard Users"
            fill="hsl(214 32% 88%)"
            radius={[6, 6, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
