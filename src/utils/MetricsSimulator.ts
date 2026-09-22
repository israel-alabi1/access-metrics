/**
 * Transparent assumptions used by the demo simulator.
 *
 * These are illustrative inputs, not observed product analytics. Keeping them
 * in one place makes the demo easier to understand, test, and replace with
 * real event data in a production implementation.
 */
export const SIMULATION_ASSUMPTIONS = {
  accessibilityAdoptionRate: 0.22,
  conversionUpliftRate: 0.124,
  retentionUpliftRate: 0.081,
  revenuePerAdditionalConversion: 85,
} as const;

export interface SimulatedMetrics {
  accessibilityUsers: number;
  conversionIncrease: number;
  retentionIncrease: number;
  attributedRevenue: number;
  conversionRate: number;
  retentionRate: number;
}

export function simulateUplift(
  baseUsers: number,
  adoptionRate = SIMULATION_ASSUMPTIONS.accessibilityAdoptionRate,
): SimulatedMetrics {
  const safeBaseUsers = Math.max(0, Math.round(baseUsers));
  const safeAdoptionRate = Math.min(1, Math.max(0, adoptionRate));

  const accessibilityUsers = Math.round(safeBaseUsers * safeAdoptionRate);
  const conversionIncrease = Math.round(
    accessibilityUsers * SIMULATION_ASSUMPTIONS.conversionUpliftRate,
  );
  const retentionIncrease = Math.round(
    accessibilityUsers * SIMULATION_ASSUMPTIONS.retentionUpliftRate,
  );
  const attributedRevenue = Math.round(
    conversionIncrease * SIMULATION_ASSUMPTIONS.revenuePerAdditionalConversion,
  );

  return {
    accessibilityUsers,
    conversionIncrease,
    retentionIncrease,
    attributedRevenue,
    conversionRate: SIMULATION_ASSUMPTIONS.conversionUpliftRate * 100,
    retentionRate: SIMULATION_ASSUMPTIONS.retentionUpliftRate * 100,
  };
}

/** Illustrative cohort values used by the comparison chart. */
export const CHART_DATA = [
  { name: "Activation Rate", accessibility: 68, standard: 55 },
  { name: "30-Day Retention", accessibility: 52, standard: 43 },
  { name: "Free to Paid", accessibility: 18, standard: 12 },
];
