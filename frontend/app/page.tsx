"use client";

import { useEffect, useState } from "react";
import { getHealth } from "@/lib/api";
import MapView from "@/components/map/MapView";

export default function Home() {
  const [apiStatus, setApiStatus] = useState("Checking...");
  const [scenarioName, setScenarioName] = useState("");
  const [damName, setDamName] = useState("");
  const [volume, setVolume] = useState("");

  useEffect(() => {
    async function checkBackend() {
      try {
        const health = await getHealth();
        setApiStatus(health.status === "healthy" ? "Online" : "Degraded");
      } catch {
        setApiStatus("Offline");
      }
    }

    checkBackend();
  }, []);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    alert(
      `Scenario: ${scenarioName}\nDam: ${damName}\nVolume: ${volume} m³`
    );
  }

  return (
    <main className="min-h-screen bg-[#08111f] text-white">
      <div className="flex min-h-screen">
        <aside className="hidden w-64 border-r border-slate-800 bg-[#0b1627] p-6 lg:block">
          <h1 className="text-2xl font-bold text-cyan-300">
            JALDRISHTI
          </h1>

          <p className="mt-2 text-xs text-slate-500">
            Inundation Intelligence System
          </p>

          <nav className="mt-12 space-y-3 text-sm">
            <div className="rounded-lg bg-cyan-400/10 px-4 py-3 text-cyan-300">
              Overview
            </div>
            <div className="px-4 py-3 text-slate-400">Scenarios</div>
            <div className="px-4 py-3 text-slate-400">Dam Network</div>
            <div className="px-4 py-3 text-slate-400">
              Terrain Analysis
            </div>
            <div className="px-4 py-3 text-slate-400">
              Impact Assessment
            </div>
            <div className="px-4 py-3 text-slate-400">Reports</div>
          </nav>

          <div className="mt-16 rounded-xl border border-slate-700 p-4">
            <p className="text-xs font-semibold text-cyan-300">
              ZERO LATENCY
            </p>
            <p className="mt-2 text-xs text-slate-500">
              SIH 2026
            </p>
          </div>
        </aside>

        <section className="flex-1 p-6 sm:p-10">
          <header className="mb-8">
            <p className="text-sm text-cyan-300">Command Center</p>

            <h2 className="mt-2 text-3xl font-bold">
              Flood Intelligence Dashboard
            </h2>

            <p className="mt-2 text-sm text-slate-400">
              Simulate scenarios. Identify impacts. Improve preparedness.
            </p>
          </header>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {[
              ["Active Scenarios", "03"],
              ["Monitored Dams", "128"],
              ["Risk Assessments", "24"],
              ["System Status", apiStatus],
            ].map(([label, value]) => (
              <div
                key={label}
                className="rounded-2xl border border-slate-800 bg-[#0d1b2e] p-5"
              >
                <p className="text-sm text-slate-400">{label}</p>
                <p className="mt-3 text-3xl font-bold">{value}</p>
                <p className="mt-2 text-xs text-cyan-300">
                  Demo data
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-6 xl:grid-cols-2">
            <div className="rounded-2xl border border-slate-800 bg-[#0d1b2e] p-6">
              <h3 className="text-lg font-semibold">
                Terrain Workspace
              </h3>

              <p className="mt-1 text-xs text-slate-500">
                Interactive geospatial visualization
              </p>

              <div className="mt-6 min-h-80 overflow-hidden rounded-xl">
                <MapView />
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-[#0d1b2e] p-6">
              <h3 className="text-lg font-semibold">
                Create Scenario
              </h3>

              <p className="mt-1 text-xs text-slate-500">
                Configure a preliminary dam-break event.
              </p>

              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <input
                  required
                  value={scenarioName}
                  onChange={(event) =>
                    setScenarioName(event.target.value)
                  }
                  placeholder="Scenario name"
                  className="w-full rounded-lg border border-slate-700 bg-[#08111f] p-3 text-sm outline-none focus:border-cyan-400"
                />

                <input
                  required
                  value={damName}
                  onChange={(event) => setDamName(event.target.value)}
                  placeholder="Dam / water body"
                  className="w-full rounded-lg border border-slate-700 bg-[#08111f] p-3 text-sm outline-none focus:border-cyan-400"
                />

                <input
                  required
                  type="number"
                  min="0"
                  value={volume}
                  onChange={(event) => setVolume(event.target.value)}
                  placeholder="Release volume (m³)"
                  className="w-full rounded-lg border border-slate-700 bg-[#08111f] p-3 text-sm outline-none focus:border-cyan-400"
                />

                <button
                  type="submit"
                  className="w-full rounded-lg bg-cyan-400 p-3 text-sm font-semibold text-slate-950 hover:bg-cyan-300"
                >
                  Validate Scenario
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}