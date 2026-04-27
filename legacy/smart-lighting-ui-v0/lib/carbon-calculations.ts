// CO₂ emissions factors (kg CO₂ per kWh)
const EMISSION_FACTORS = {
  LED: 0.35,
  Sodium: 0.65,
  Mercury: 0.85,
  Solar: 0.05,
  Fluorescent: 0.55,
  MetalHalide: 0.75,
};

export function calculateCO2Emissions(power: number, hours: number, type: string): number {
  const factor = EMISSION_FACTORS[type as keyof typeof EMISSION_FACTORS] || 0.5;
  const energyKwh = (power / 1000) * hours;
  return energyKwh * factor;
}

export function calculateDailyCO2(luminaires: any[]): number {
  const hoursPerDay = 12; // Average 12 hours per day
  return luminaires.reduce((total, luminaire) => {
    return total + calculateCO2Emissions(luminaire.power, hoursPerDay, luminaire.type);
  }, 0);
}

export function calculateCO2Savings(tradional: number, led: number): number {
  return tradional - led;
}

// Environmental impact equivalents
export function CO2ToTrees(co2: number): number {
  return co2 / 21; // 1 tree absorbs ~21kg CO₂ per year
}

export function CO2ToCars(co2: number): number {
  return co2 / 4600; // Average car emits 4600kg CO₂ per year
}

export function CO2ToHomes(co2: number): number {
  return co2 / 4600; // Average home emits 4600kg CO₂ per year
}

export interface CarbonMetrics {
  totalCO2: number;
  treesEquivalent: number;
  carsEquivalent: number;
  savingsVsTraditional: number;
  byType: Record<string, number>;
}
