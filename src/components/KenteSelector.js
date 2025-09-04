import React, { useState } from "react";
import kente1 from "../images/kente/1bc449239f79b8667a1108b9e72703a8.jpg";
import kente2 from "../images/kente/11ebb2610db0749eb2876617b729a737.jpg";
import kente3 from "../images/kente/12d6ee15ea0fdae93ec1d892070ba9c7.jpg";
import kente4 from "../images/kente/71b32be62580b929274c8a4c0ba9c035.jpg";
import kente5 from "../images/kente/741a6c4c8013b8d84d475af5fcb3e692.jpg";
import kente6 from "../images/kente/6280430.jpg";
import kente7 from "../images/kente/6919889.jpg";
import kente8 from "../images/kente/7082184.jpg";
import kente9 from "../images/kente/d373bb3f1649d8adcdf824d52e470995.jpg";
import kente10 from "../images/kente/de27e4fac5a108ebe4c372aa32054b8a.jpg";
import kente11 from "../images/kente/ffcc9ad038a0806fe9caee40ea507ac1.jpg";
import kente12 from "../images/kente/kente_HALI_issue_200_detail_of_19-20c_w_african_kente_cloth_1024x1024.jpg";
import kente13 from "../images/kente/preview.jpg";
import kente14 from "../images/kente/vaticankentedetail1sm-edited.jpg";
import kente15 from "../images/kente/17425877b84d7710a1f469b908daf5bb.jpg";
import kente16 from "../images/kente/5da1ee912e27286276a10ab55604f0ed.jpg";

const kenteOptions = [
  { name: "Kente 1", value: kente1 },
  { name: "Kente 2", value: kente2 },
  { name: "Kente 3", value: kente3 },
  { name: "Kente 4", value: kente4 },
  { name: "Kente 5", value: kente5 },
  { name: "Kente 6", value: kente6 },
  { name: "Kente 7", value: kente7 },
  { name: "Kente 8", value: kente8 },
  { name: "Kente 9", value: kente9 },
  { name: "Kente 10", value: kente10 },
  { name: "Kente 11", value: kente11 },
  { name: "Kente 12", value: kente12 },
  { name: "Kente 13", value: kente13 },
  { name: "Kente 14", value: kente14 },
  { name: "Kente 15", value: kente15 },
  { name: "Kente 16", value: kente16 },
];

export default function KenteCustomizer({
  title,
  onKenteSelect,
  selectedKente,
  doneButton,
  customization,
  handleDoneAddingkentes,
  showTitle = true,
}) {
  const [tempKente, setTempKente] = useState(selectedKente || null);

  return (
    <div className="space-y-6 p-4 sm:p-6 md:p-8 bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-200">
      {showTitle && (
        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 text-center tracking-wide">
          {title}
        </h3>
      )}

      {/* Grid of kente options */}
      <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 sm:gap-4 md:gap-6 justify-items-center max-sm:gap-2 max-sm:grid-cols-4">
        {kenteOptions.map((kente) => (
          <button
            key={kente.name}
            onClick={() => setTempKente(kente.value)}
            className={`w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 flex items-center justify-center rounded-xl border-4 overflow-hidden transition-all duration-300 transform hover:scale-105 focus:outline-none ${
              tempKente === kente.value
                ? "border-teal-600 ring-2 ring-teal-400 shadow-lg"
                : "border-gray-300 hover:border-gray-500"
            }`}
            title={kente.name}
          >
            <img
              src={kente.value}
              alt={kente.name}
              className="w-full h-full object-cover rounded-lg"
            />
          </button>
        ))}
      </div>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4">
        <button
          onClick={() => onKenteSelect(tempKente)}
          className="w-full sm:w-auto bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-semibold py-2 px-4 sm:px-6 rounded-lg shadow-md transition-all duration-300 text-sm sm:text-base"
        >
          Confirm Kente
        </button>

        {customization?.step !== "first-kente" ? (
          <button
            onClick={doneButton}
            className="w-full sm:w-auto bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-2 px-4 sm:px-6 rounded-lg shadow-md text-sm sm:text-base"
          >
            Done
          </button>
        ) : (
          <button
            onClick={handleDoneAddingkentes}
            className="w-full sm:w-auto bg-white border border-gray-300 hover:bg-yellow-600 text-gray-700 hover:text-white font-medium py-2 px-4 sm:px-6 rounded-lg shadow-md transition-all duration-300 text-sm sm:text-base"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}
