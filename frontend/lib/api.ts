const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export interface HealthResponse {
  status: string;
  service: string;
}

export async function getHealth(): Promise<HealthResponse> {
  const response = await fetch(`${API_BASE_URL}/health`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Backend health request failed");
  }

  return response.json();
}

export interface ScenarioCreate {
  name: string;
  dam_id: string;
  water_volume: number;
  breach_width: number;
  breach_time: number;
  simulation_duration: number;
}

export interface Scenario extends ScenarioCreate {
  id: string;
  status: string;
}

export async function createScenario(
  data: ScenarioCreate
): Promise<Scenario> {
  const response = await fetch(`${API_BASE_URL}/scenarios/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Scenario creation failed");
  }

  return response.json();
}

export async function getScenarios(): Promise<Scenario[]> {
  const response = await fetch(`${API_BASE_URL}/scenarios/`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Scenario list request failed");
  }

  return response.json();
}

export async function queueSimulation() {
  const response = await fetch(`${API_BASE_URL}/simulation/queue`, {
    method: "POST",
  });

  if (!response.ok) {
    throw new Error("Failed to queue simulation");
  }

  return response.json();
}

export interface SimulationResult {
  status: string;
  grid_size: number;
  max_water: number;
  water_grid: number[][];
}

export async function runSimulation(
  size: number = 50
): Promise<SimulationResult> {
  const response = await fetch(
    `${API_BASE_URL}/simulation/run?size=${size}`,
    {
      method: "POST",
    }
  );

  if (!response.ok) {
    throw new Error("Simulation failed");
  }

  return response.json();
}

export interface SimulationFramesResult {
  status: string;
  grid_size: number;
  steps: number;
  frames: number[][][][];
}

export async function runSimulationFrames(
  size: number = 50,
  steps: number = 20
): Promise<SimulationFramesResult> {
  const response = await fetch(
    `${API_BASE_URL}/simulation/frames?size=${size}&steps=${steps}`,
    {
      method: "POST",
    }
  );

  if (!response.ok) {
    throw new Error("Simulation frames request failed");
  }

  return response.json();
}

export interface ImpactResult {
  impacted_cells: number;
  max_depth: number;
  flood_detected: boolean;
  depth_threshold: number;
  severity: {
    low: number;
    medium: number;
    high: number;
  };
}

export interface ImpactResponse {
  status: string;
  grid_size: number;
  impact: ImpactResult;
}

export async function assessImpact(
  size: number = 50
): Promise<ImpactResponse> {
  const response = await fetch(
    `${API_BASE_URL}/impact/assess?size=${size}`,
    {
      method: "POST",
    }
  );

  if (!response.ok) {
    throw new Error("Impact assessment failed");
  }

  return response.json();
}
