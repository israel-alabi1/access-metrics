import { describe, expect, it } from "vitest";
import {
  SIMULATION_ASSUMPTIONS,
  simulateUplift,
} from "../utils/MetricsSimulator";

describe("simulateUplift", () => {
  it("uses the documented assumptions to calculate the demo metrics", () => {
    const result = simulateUplift(12_000, 0.22);

    expect(result.accessibilityUsers).toBe(2_640);
    expect(result.conversionIncrease).toBe(327);
    expect(result.retentionIncrease).toBe(214);
    expect(result.attributedRevenue).toBe(27_795);
    expect(result.conversionRate).toBe(12.4);
    expect(result.retentionRate).toBe(8.1);
  });

  it("clamps invalid inputs instead of producing negative or excessive values", () => {
    expect(simulateUplift(-100, 2)).toEqual({
      accessibilityUsers: 0,
      conversionIncrease: 0,
      retentionIncrease: 0,
      attributedRevenue: 0,
      conversionRate: SIMULATION_ASSUMPTIONS.conversionUpliftRate * 100,
      retentionRate: SIMULATION_ASSUMPTIONS.retentionUpliftRate * 100,
    });
  });

  it("supports a custom adoption rate", () => {
    const result = simulateUplift(10_000, 0.5);

    expect(result.accessibilityUsers).toBe(5_000);
    expect(result.conversionIncrease).toBe(620);
    expect(result.retentionIncrease).toBe(405);
  });
});
