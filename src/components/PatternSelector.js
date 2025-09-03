import React from "react";

export default function PatternSelector({ onPatternSelect, selectedPattern }) {
  const patternOptions = [
    { name: "Stripes", value: "stripes" },
    { name: "Polka Dots", value: "polka-dots" },
    { name: "Diagonal", value: "diagonal" },
    { name: "None", value: "none" },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800 text-center">
        Select a Pattern Overlay
      </h3>

      <div className="grid grid-cols-2 gap-3">
        {patternOptions.map((pattern) => (
          <button
            key={pattern.value}
            onClick={() => onPatternSelect(pattern.value)}
            className={`py-3 px-4 rounded-lg border-2 transition-all duration-200 hover:scale-105 ${
              selectedPattern === pattern.value
                ? "border-teal-600 bg-teal-100"
                : "border-gray-300 hover:border-gray-500"
            }`}
          >
            {pattern.name}
          </button>
        ))}
      </div>
    </div>
  );
}
