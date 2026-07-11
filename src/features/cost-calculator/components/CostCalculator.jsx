
import { useState } from "react";
import { Calculator } from "lucide-react";
import { toast } from "sonner";
import HeroSection from "./HeroSection";
import BuildingInfoSection from "./BuildingInfoSection";
import MaterialPricesSection from "./MaterialPricesSection";
import SummaryCard from "./SummaryCard";
import BasicDataSection from "./BasicDataSection";
import ResultsSection from "./ResultsSection";
import { DEFAULT_PRICES, ATTACHMENTS_COST } from "../constants/prices";
 

export default function CostCalculator() {
  const [step, setStep] = useState(1);
  const [dimensions, setDimensions] = useState({ length: "", width: "" });
  const [floors, setFloors] = useState("");
  const [hasTopFloor, setHasTopFloor] = useState(false);
  const [prices, setPrices] = useState(DEFAULT_PRICES);
  const [results, setResults] = useState(null);

  const length = Number(dimensions.length) || 0;
  const width = Number(dimensions.width) || 0;
  const n = Number(floors) || 0;
  const area = length * width;
  const ratio = area / 170;

  const computeCosts = () => {
    const p = prices;
    const r = ratio;
    const tf = hasTopFloor;

    const fp =
      11.9 * r * p.cement +
      27.2 * r * p.gravel +
      13.6 * r * p.sand +
      34 * r * p.labor +
      7.8975 * r * p.brick;

    const fs =
      17.85 * r * p.cement +
      40.8 * r * p.gravel +
      20.4 * r * p.sand +
      4.08 * r * p.iron +
      51 * r * p.labor;

    const foundations = fp + fs;

    const cols =
      5.221125 * r * p.cement +
      11.934 * r * p.gravel +
      5.967 * r * p.sand +
      1.1934 * r * p.iron +
      14.9175 * r * p.labor;

    const slab =
      13.09 * r * p.cement +
      29.92 * r * p.gravel +
      14.96 * r * p.sand +
      4.488 * r * p.iron +
      37.4 * r * p.labor;

    const bricks =
      0.2187 * r * p.cement + 7.29 * r * p.sand + 14.58 * r * (p.brick / 1000);

    const floorCost = cols + slab + bricks;
    const topFloor = tf ? floorCost * 0.5 : 0;

    const totalStructural =
      foundations + floorCost * n + topFloor + ATTACHMENTS_COST;

    const totalQuantities = {
      cement:
        (11.9 + 17.85) * r +
        (5.221125 + 13.09 + 0.2187) * r * n +
        (5.221125 + 13.09 + 0.2187) * r * (tf ? 0.5 : 0),
      iron:
        4.08 * r +
        (1.1934 + 4.488) * r * n +
        (1.1934 + 4.488) * r * (tf ? 0.5 : 0),
      gravel:
        (27.2 + 40.8) * r +
        (11.934 + 29.92) * r * n +
        (11.934 + 29.92) * r * (tf ? 0.5 : 0),
      sand:
        (13.6 + 20.4) * r +
        (5.967 + 14.96 + 7.29) * r * n +
        (5.967 + 14.96 + 7.29) * r * (tf ? 0.5 : 0),
      brick: 7.8975 * r + 14.58 * r * n + 14.58 * r * (tf ? 0.5 : 0),
    };

    return {
      foundations,
      cols,
      slab,
      bricks,
      floorCost,
      topFloor,
      attachment: ATTACHMENTS_COST,
      total: totalStructural,
      quantities: totalQuantities,
      ratio: r,
      area,
      floors: n,
      hasTopFloor: tf,
    };
  };

  const handleCalculate = () => {
    if (!length || !width || !n) {
      toast.error("Please fill in all fields");
      return;
    }
    const costs = computeCosts();
    setResults(costs);
    setStep(2);
  };

  const reset = () => {
    setStep(1);
    setResults(null);
    setDimensions({ length: "", width: "" });
    setFloors("");
    setHasTopFloor(false);
    setPrices(DEFAULT_PRICES);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
       
        {/* Hero Section */}
    

        {/* Steps */}
        
        {/* Content */}
        <div
          id="calc-card"
          className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 scroll-mt-6"
        >
          {step === 1 && (
            <>
              <HeroSection
                onStart={() => {
                  const el = document.getElementById("calc-card");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                onLearnMore={() => {
                  const el = document.getElementById("calc-card");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
              />
              <div className="flex items-center justify-center gap-4 mb-8">
                {[
                  { id: 1, label: "Basic Data" },
                  { id: 2, label: "Results" },
                ].map((s, i) => (
                  <div key={s.id} className="flex items-center gap-2">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= s.id
                          ? "bg-teal-600 text-white"
                          : "bg-gray-200 text-gray-500"
                        }`}
                    >
                      {s.id}
                    </div>
                    <span
                      className={`text-sm font-medium ${step >= s.id ? "text-gray-900" : "text-gray-400"
                        }`}
                    >
                      {s.label}
                    </span>
                    {i < 1 && <div className="w-12 h-0.5 bg-gray-200 ml-2" />}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                {/* Left column: Building Information + Material Prices */}
                <div className="lg:col-span-3 space-y-6">
                  <BuildingInfoSection
                    dimensions={dimensions}
                    setDimensions={setDimensions}
                    floors={floors}
                    setFloors={setFloors}
                    hasTopFloor={hasTopFloor}
                    setHasTopFloor={setHasTopFloor}
                    area={area}
                  />
                  <MaterialPricesSection
                    prices={prices}
                    setPrices={setPrices}
                  />
                </div>

                {/* Right column: Summary Card */}
                <div className="lg:col-span-2">
                  <SummaryCard
                    results={results}
                    area={area}
                    floors={floors}
                    hasTopFloor={hasTopFloor}
                    onStart={handleCalculate}
                    onBack={() => setStep(1)}
                    onReset={reset}
                  />
                </div>
              </div>
            </>
             
          )}

          {step === 2 && results && (
            <>
              <div className="flex items-center justify-center gap-4 mb-8">
                {[
                  { id: 1, label: "Basic Data" },
                  { id: 2, label: "Results" },
                ].map((s, i) => (
                  <div key={s.id} className="flex items-center gap-2">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= s.id
                          ? "bg-teal-600 text-white"
                          : "bg-gray-200 text-gray-500"
                        }`}
                    >
                      {s.id}
                    </div>
                    <span
                      className={`text-sm font-medium ${step >= s.id ? "text-gray-900" : "text-gray-400"
                        }`}
                    >
                      {s.label}
                    </span>
                    {i < 1 && <div className="w-12 h-0.5 bg-gray-200 ml-2" />}
                  </div>
                ))}
              </div>
              <ResultsSection
                results={results}
                onBack={() => setStep(1)}
                onReset={reset}
              />

            </>
            
            
          )}
        </div>
      </div>
    </div>
  );
}
