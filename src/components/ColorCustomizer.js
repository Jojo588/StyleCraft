import React, { useState } from "react";

const colorOptions = [
  { name: "Blue", value: "#3b82f6" },
  { name: "Red", value: "#ef4444" },
  { name: "Green", value: "#22c55e" },
  { name: "Purple", value: "#a855f7" },
  { name: "Pink", value: "#ec4899" },
  { name: "Yellow", value: "#eab308" },
  { name: "Orange", value: "#f97316" },
  { name: "Teal", value: "#14b8a6" },
  { name: "Indigo", value: "#6366f1" },
  { name: "Gray", value: "#6b7280" },
  { name: "Black", value: "#1f2937" },
  { name: "White", value: "#f2f2f2" },
  { name: "Brown", value: "#92400e" },
  { name: "Lime", value: "#84cc16" },
  { name: "Cyan", value: "#06b6d4" },
  { name: "Rose", value: "#f43f5e" },
];

export default function ColorCustomizer({
  title,
  onColorSelect,
  selectedColor,
  showTitle = true,
}) {
  const [tempColor, setTempColor] = useState(selectedColor || "#f2f2f2");

  return (
    <div className="space-y-4">
      {showTitle && (
        <h3 className="text-lg font-semibold text-gray-800 text-center">
          {title}
        </h3>
      )}

      <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
        {colorOptions.map((color) => (
          <button
            key={color.value}
            onClick={() => setTempColor(color.value)}
            className={`w-12 h-12 rounded-full border-4 transition-all duration-200 hover:scale-110 ${
              tempColor === color.value
                ? "border-gray-800 shadow-lg"
                : "border-gray-300 hover:border-gray-500"
            }`}
            style={{ backgroundColor: color.value }}
            title={color.name}
          />
        ))}
      </div>

      <div className="text-center">
        <input
          type="color"
          value={tempColor}
          onChange={(e) => setTempColor(e.target.value)}
          className="w-16 h-8 rounded border-2 border-gray-300 cursor-pointer"
          title="Custom color picker"
        />
        <p className="text-sm text-gray-500 mt-2">
          Or use the color picker above
        </p>
      </div>

      <div className="text-center">
        <button
          onClick={() => onColorSelect(tempColor)}
          className="bg-teal-500 hover:bg-teal-700 text-white py-2 px-4 rounded-md shadow-md transition-all duration-300"
        >
          Confirm Color
        </button>
      </div>
    </div>
  );
}
