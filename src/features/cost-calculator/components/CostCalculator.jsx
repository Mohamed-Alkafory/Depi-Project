import { useState } from "react";
import BasicDataSection from "./BasicDataSection";
import ResultsSection from "./ResultsSection";
import FinishingSection from "./FinishingSection";
import { DEFAULT_PRICES, ATTACHMENTS_COST, AREA_BASE } from "../constants/prices";

const STEPS = [
  { id: 1, label: "Basic Data" },
  { id: 2, label: "Results & Quantities" },
  { id: 3, label: "Finishing" },
];

export default function CostCalculator() {
  const [step, setStep] = useState(1);
  const [dimensions, setDimensions] = useState({ length: 10, width: 17 });
  const [floors, setFloors] = useState(1);
  const [hasTopFloor, setHasTopFloor] = useState(false);
  const [prices, setPrices] = useState(DEFAULT_PRICES);
  const [results, setResults] = useState(null);
  const [finishingData, setFinishingData] = useState(null);

  const area = dimensions.length * dimensions.width;
  const ratio = area / AREA_BASE;

  const computeCosts = () => {
    const p = prices;
    const r = ratio;
    const tf = hasTopFloor;
    const n = floors;

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
      0.2187 * r * p.cement +
      7.29 * r * p.sand +
      14.58 * r * (p.brick / 1000);

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
    const costs = computeCosts();
    setResults(costs);
    setStep(2);
  };

  const handleBackToData = () => setStep(1);
  const handleGoToFinishing = () => setStep(3);

  return (
    <div className="min-h-screen bg-[var(--body-bg)] flex" dir="ltr">
      {/* TODO: StepsSidebar goes here once it's ready */}

      <div className="flex-1 h-screen overflow-y-auto">
        <div key={step} className="max-w-3xl mx-auto px-6 py-6 animate-step-fade">
          {step === 1 && (
            <BasicDataSection
              dimensions={dimensions}
              setDimensions={setDimensions}
              floors={floors}
              setFloors={setFloors}
              hasTopFloor={hasTopFloor}
              setHasTopFloor={setHasTopFloor}
              prices={prices}
              setPrices={setPrices}
              onCalculate={handleCalculate}
              area={area}
            />
          )}

          {step === 2 && results && (
            <ResultsSection
              results={results}
              prices={prices}
              onBack={handleBackToData}
              onNext={handleGoToFinishing}
            />
          )}

          {step === 3 && results && (
            <FinishingSection onBack={handleBackToData} />
          )}
        </div>
      </div>
    </div>
  );
}