import React, { useState } from "react";
import "../App.css";
import Mannequin from "../components/Mannequin";
import OutfitSelector from "../components/OutfitSelector";
import FullScreenPreview from "../components/FullScreenPreview";
import { Download, Eye, RotateCcw } from "lucide-react";
import html2canvas from "html2canvas";
import KenteSelector from "../components/KenteSelector.js";
import kente1 from "../images/kente/1bc449239f79b8667a1108b9e72703a8.jpg";

function FashionCustomizer() {
  const [customization, setCustomization] = useState({
    outfitType: null,
    firstKente: kente1,
    extraKentes: [],
    secondKente: null,
    firstSecondaryKente: null,
    step: "outfit",
    mode: null,
  });

  const [isViewing, setIsViewing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [showFullPreview, setShowFullPreview] = useState(false);

  const handleOutfitSelect = (outfitType) => {
    setCustomization((prev) => ({
      ...prev,
      outfitType,
      step: "first-kente",
    }));
  };

  const handleFirstKenteDone = () => {
    setCustomization((prev) => ({
      ...prev,
      step: "cloth-design",
    }));
  };

  const handlefirstKenteSelect = (kente) => {
    setCustomization((prev) => ({
      ...prev,
      firstKente: kente,
    }));
  };

  const handleClothDesignChoice = (choice) => {
    if (choice === "combine") {
      setCustomization((prev) => ({
        ...prev,
        step: "second-kente",
        mode: "combine",
      }));
    } else {
      setCustomization((prev) => ({
        ...prev,
        step: "keep-simple",
        mode: "single",
      }));
    }
  };

  const handleAddExtrakente = (kente) => {
    setCustomization((prev) => ({
      ...prev,
      extraKentes: [...prev.extraKentes, kente],
    }));
  };

  const handleDoneAddingkentes = () => {
    setCustomization((prev) => ({
      ...prev,
      step: "complete",
    }));
  };

  const handleReset = () => {
    setCustomization({
      outfitType: null,
      firstKente: "#3b82f6",
      extraKentes: [],
      step: "outfit",
      mode: null,
    });
    setIsViewing(false);
  };

  const handleView = () => {
    setShowFullPreview(true);
  };

  const handleSave = async () => {
    setIsSaving(true);
    const mannequinElement = document.getElementById("mannequin-display");
    if (mannequinElement) {
      try {
        const canvas = await html2canvas(mannequinElement, {
          backgroundColor: "#ffffff",
          scale: 3,
          useCORS: true,
          allowTaint: true,
          width: mannequinElement.offsetWidth,
          height: mannequinElement.offsetHeight,
        });

        const link = document.createElement("a");
        const timestamp = new Date()
          .toISOString()
          .slice(0, 19)
          .replace(/:/g, "-");
        link.download = `fashion-design-${timestamp}.png`;
        link.href = canvas.toDataURL("image/png", 1.0);

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      } catch (error) {
        console.error("Error saving image:", error);
        alert("There was an error saving your design. Please try again.");
      }
    }
    setIsSaving(false);
  };

  const getStepTitle = () => {
    switch (customization.step) {
      case "outfit":
        return "✨ Choose Your Outfit Style";
      case "first-kente":
        return "🎨 Select Kente Cloth";
      case "cloth-design":
        return "🧵 Customize Cloth Design";
      case "second-kente":
        return "➕ Add More Kente Cloths";
      case "keep-simple":
        return "🌿 Keep It Simple";
      case "complete":
        return "🎉 Your Fashion Design";
      default:
        return "Fashion Customizer";
    }
  };

  const getProgressWidth = () => {
    switch (customization.step) {
      case "outfit":
        return 20;
      case "first-kente":
        return 40;
      case "cloth-design":
        return 60;
      case "keep-simple":
        return 70;
      case "second-kente":
        return 80;
      default:
        return 100;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="text-center mb-10">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-800">
            Fashion{" "}
            <span className="bg-teal-400 bg-clip-text text-transparent">
              Customizer
            </span>
          </h1>
          <p className="text-gray-600 mt-2 text-lg">
            Design your perfect outfit with our interactive mannequin ✨
          </p>
        </header>

        {/* Main Grid */}
        <div
          className={`grid gap-8 ${
            customization.outfitType ? "md:grid-cols-3" : "grid-cols-1"
          }`}
        >
          {/* Mannequin Display */}
          {customization.outfitType && (
            <div className="bg-white rounded-2xl shadow-lg p-6 md:col-span-1 flex flex-col">
              <h2 className="text-xl text-center font-semibold text-gray-800 mb-4">
                Your Design
              </h2>
              <div className="flex-1 flex justify-center items-center">
                <Mannequin customization={customization} />
              </div>
              {customization.step === "complete" && (
                <div className="mt-6 flex flex-col sm:flex-row flex-wrap gap-3 justify-center">
                  <button
                    onClick={handleView}
                    className="w-full sm:w-auto px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-yellow-600 hover:text-white flex items-center justify-center gap-2"
                  >
                    <Eye size={16} /> Preview
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="w-full sm:w-auto px-4 py-2 rounded-lg bg-gradient-to-r from-teal-500 to-green-500 text-white shadow hover:from-teal-600 hover:to-green-600 flex items-center justify-center gap-2"
                  >
                    {isSaving ? (
                      <>
                        <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />{" "}
                        Saving...
                      </>
                    ) : (
                      <>
                        <Download size={16} /> Save Design
                      </>
                    )}
                  </button>
                  <button
                    onClick={handleReset}
                    className="w-full sm:w-auto px-4 py-2 rounded-lg border border-red-400 text-red-500 hover:bg-red-500 hover:text-white duration-300 flex items-center justify-center gap-2"
                  >
                    <RotateCcw size={16} /> Start Over
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Customization Panel */}
          <div
            className={`bg-white rounded-2xl shadow-lg p-6 ${
              customization.outfitType ? "md:col-span-2" : "col-span-1"
            }`}
          >
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800">
                {getStepTitle()}
              </h2>
              <div className="w-full bg-gray-200 h-3 rounded-full mt-3">
                <div
                  className="h-3 bg-teal-400 rounded-full transition-all"
                  style={{ width: `${getProgressWidth()}%` }}
                />
              </div>
            </div>

            {/* Steps */}
            {!isViewing && (
              <>
                {customization.step === "outfit" && (
                  <OutfitSelector onSelect={handleOutfitSelect} />
                )}

                {customization.step === "first-kente" && (
                  <KenteSelector
                    title="Choose Kente Cloth"
                    onKenteSelect={handlefirstKenteSelect}
                    handleDoneAddingkentes={handleFirstKenteDone}
                    selectedKente={customization.firstKente}
                    customization={customization}
                  />
                )}

                {customization.step === "cloth-design" && (
                  <div className="text-center">
                    <p className="text-gray-600 mb-4 text-lg">
                      Do you want to combine kentes or keep it minimal?
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                      <button
                        onClick={() => handleClothDesignChoice("combine")}
                        className="px-5 py-3 rounded-lg bg-gradient-to-r from-teal-500 to-teal-500 text-white hover:from-teal-600 hover:to-teal-700 shadow duration-300 transition-all"
                      >
                        Combine Cloths
                      </button>
                      <button
                        onClick={() => handleClothDesignChoice("none")}
                        className="px-5 py-3 rounded-lg border border-gray-300 text-gray-700 hover:text-white hover:bg-yellow-600 transition-all duration-300"
                      >
                        Keep Simple
                      </button>
                    </div>
                  </div>
                )}

                {customization.step === "keep-simple" && (
                  <div className="flex flex-wrap gap-4 justify-center">
                    <button
                      onClick={() =>
                        setCustomization((prev) => ({
                          ...prev,
                          step: "second-kente",
                          mode: "blend",
                        }))
                      }
                      className="px-5 py-3 rounded-lg bg-teal-500 text-white hover:bg-teal-700 shadow transition"
                    >
                      Blend Cloths
                    </button>
                    <button
                      onClick={handleDoneAddingkentes}
                      className="px-5 py-3 rounded-lg border border-gray-300 text-gray-700 hover:text-white hover:bg-yellow-600 transition duration-300"
                    >
                      Maintain Single Cloth
                    </button>
                  </div>
                )}

                {customization.step === "second-kente" && (
                  <div>
                    <KenteSelector
                      title="Choose another kente"
                      onKenteSelect={handleAddExtrakente}
                      selectedkente="#ffffff"
                      doneButton={handleDoneAddingkentes}
                      showTitle={false}
                    />
                    {customization.extraKentes.length > 0 && (
                      <div className="mt-6 text-center">
                        <p className="text-gray-600 text-sm mb-2">
                          Added kente cloths:
                        </p>
                        <div className="flex justify-center gap-2">
                          {customization.extraKentes.map((c, idx) => (
                            <div
                              key={idx}
                              className="w-10 h-10 rounded-full border shadow-sm"
                              style={{
                                backgroundImage: `url(${c})`,
                                backgroundSize: "cover",
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {customization.step === "complete" && (
                  <div className="text-center px-2 max-sm:w-full">
                    <p className="text-lg font-semibold text-teal-600 mb-2">
                      🎉 Your design is complete!
                    </p>
                    <p className="text-gray-600 mb-6">
                      You can preview or save it as an image.
                    </p>
                    <div className="bg-gray-50 p-4 sm:p-6 rounded-xl shadow-sm inline-block text-left w-full sm:w-auto max-w-md">
                      <h3 className="font-bold text-gray-800 mb-2">
                        Design Summary
                      </h3>
                      <p className="text-sm sm:text-base">
                        <strong>Outfit:</strong>{" "}
                        {customization.outfitType
                          ?.replace("-", " ")
                          .replace(/\b\w/g, (l) => l.toUpperCase())}
                      </p>
                    <p className="text-sm sm:text-base truncate max-w-[220px] sm:max-w-[300px] mx-auto">
                      <strong>Cloth:</strong>{" "}
                      <span title={customization.firstKente}>
                        {customization.firstKente?.split("/").pop().slice(0, 20)}...
                      </span>
                      {customization.extraKentes.length > 0 &&
                        customization.extraKentes.map((col, idx) => (
                          <span key={idx} title={col}> + {col.split("/").pop().slice(0, 15)}... </span>
                        ))}
                    </p>
                    </div>
                    <div className="mt-6 flex flex-col sm:flex-row flex-wrap gap-3 justify-center">
                      <button
                        onClick={handleView}
                        className="w-full sm:w-auto px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-yellow-600 hover:text-white flex items-center justify-center gap-2"
                      >
                        <Eye size={16} /> Preview
                      </button>
                      <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="w-full sm:w-auto px-4 py-2 rounded-lg bg-gradient-to-r from-teal-500 to-green-500 text-white shadow hover:from-teal-600 hover:to-green-600 flex items-center justify-center gap-2"
                      >
                        {isSaving ? (
                          <>
                            <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />{" "}
                            Saving...
                          </>
                        ) : (
                          <>
                            <Download size={16} /> Save Design
                          </>
                        )}
                      </button>
                      <button
                        onClick={handleReset}
                        className="w-full sm:w-auto px-4 py-2 rounded-lg border border-red-400 text-red-500 hover:bg-red-500 hover:text-white duration-300 flex items-center justify-center gap-2"
                      >
                        <RotateCcw size={16} /> Start Over
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {saveSuccess && (
        <div className="fixed bottom-6 right-6 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg animate-bounce">
          ✅ Design saved successfully!
        </div>
      )}

      <FullScreenPreview
        customization={customization}
        isOpen={showFullPreview}
        onClose={() => setShowFullPreview(false)}
        onEdit={() => {
          setShowFullPreview(false);
          setIsViewing(false);
        }}
      />
    </div>
  );
}

export default FashionCustomizer;
