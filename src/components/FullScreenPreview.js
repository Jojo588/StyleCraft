import React, { useState } from "react";
import { X, Download, Share2, Palette } from "lucide-react";
import Mannequin from "./Mannequin";
import html2canvas from "html2canvas";

const FullScreenPreview = ({ customization, isOpen, onClose, onEdit }) => {
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  if (!isOpen) return null;

  // ✅ Capture mannequin design as an image
  const handleSave = async () => {
    setIsSaving(true);
    const mannequinElement = document.getElementById(
      "fullscreen-mannequin-display"
    );
    if (mannequinElement) {
      try {
        const canvas = await html2canvas(mannequinElement, {
          backgroundColor: "#ffffff",
          scale: 4,
          useCORS: true,
          allowTaint: true,
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
      }
    }
    setIsSaving(false);
  };

  // ✅ Share link or copy URL
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "My Fashion Design",
          text: "Check out my custom fashion design!",
          url: window.location.href,
        });
      } catch (error) {
        console.log("Error sharing:", error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };


  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4 md:p-6">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-6xl max-h-[95vh] overflow-y-auto flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center border-b px-4 sm:px-6 py-3 sm:py-4 bg-gray-50 rounded-t-xl">
          <h2 className="text-lg sm:text-xl font-bold text-gray-800 text-center sm:text-left">
            ✨ Fashion Design Preview
          </h2>
          <button
            className="p-2 hover:bg-gray-200 rounded-full transition"
            onClick={onClose}
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-4 sm:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {/* ✅ Full mannequin preview */}
            <div className="flex justify-center items-center">
              <div
                id="fullscreen-mannequin-display"
                className="relative bg-gray-100 p-4 sm:p-6 rounded-lg sm:rounded-xl flex justify-center items-center w-full shadow-inner overflow-hidden"
              >
                <Mannequin customization={customization} fullPreview />
              </div>
            </div>

            {/* ✅ Design details */}
            <div className="flex flex-col gap-6">
              <div className="bg-gray-50 border border-gray-200 rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm">
                <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-gray-800">
                  🎨 Design Details
                </h3>

                <div className="space-y-4 sm:space-y-5">
                  {/* Outfit Style */}
                  <div className="flex items-center gap-3">
                    <Palette size={18} className="text-teal-600" />
                    <div>
                      <p className="text-xs sm:text-sm font-medium text-gray-500">
                        Outfit Style
                      </p>
                      <p className="font-semibold text-gray-800 text-sm sm:text-base">
                        {customization.outfitType
                          ?.replace("-", " ")
                          .replace(/\b\w/g, (l) => l.toUpperCase())}
                      </p>
                    </div>
                  </div>

                  {/* Attire Styling */}
                  <div>
                    <h4 className="font-medium mb-2 sm:mb-3 text-gray-700">
                      Attire Styling
                    </h4>
                    {customization.firstKente && (
                      <div className="flex items-center gap-3 mb-2">
                        <div
                          className="w-5 h-5 sm:w-6 sm:h-6 rounded-md border shadow-sm"
                          style={{
                            backgroundImage: `url(${customization.firstKente})`,
                            backgroundSize: "cover",
                          }}
                        />
                        <span className="text-xs sm:text-sm text-gray-700">
                          Primary: {customization.firstKente?.slice(0, 50)}...
                        </span>
                      </div>
                    )}
                    {customization.secondKente && (
                      <div className="flex items-center gap-3 mb-2">
                        <div
                          className="w-5 h-5 sm:w-6 sm:h-6 rounded-md border shadow-sm"
                          style={{
                            backgroundImage: `url(${customization.secondKente})`,
                            backgroundSize: "cover",
                          }}
                        />
                        <span className="text-xs sm:text-sm text-gray-700">
                          Secondary: {customization.secondKente}
                        </span>
                      </div>
                    )}
                    {customization.extraKentes?.length > 0 &&
                      customization.extraKentes.map((k, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-3 mb-2"
                        >
                          <div
                            className="w-5 h-5 sm:w-6 sm:h-6 rounded-md border shadow-sm"
                            style={{
                              backgroundImage: `url(${k})`,
                              backgroundSize: "cover",
                            }}
                          />
                          <span className="text-xs sm:text-sm text-gray-700">
                            Extra: {k?.slice(0, 50)}...
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>

              {/* ✅ Action Buttons */}
              <div className="flex flex-col gap-3 sm:gap-4">
                <button
                  onClick={handleSave}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 text-white flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-lg font-medium shadow-md hover:from-blue-700 hover:to-blue-800 transition-all duration-300 disabled:opacity-50 text-sm sm:text-base"
                  disabled={isSaving}
                >
                  {isSaving ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Saving High-Quality Image...
                    </>
                  ) : (
                    <>
                      <Download size={18} /> Save High-Quality Image
                    </>
                  )}
                </button>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleShare}
                    className="flex-1 border border-gray-300 text-gray-700 flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-lg font-medium shadow-sm hover:bg-gray-100 transition text-sm sm:text-base"
                  >
                    <Share2 size={18} /> Share
                  </button>
                  <button
                    onClick={onEdit}
                    className="flex-1 border border-gray-300 text-gray-700 flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-lg font-medium shadow-sm hover:bg-gray-100 transition text-sm sm:text-base"
                  >
                    <Palette size={18} /> Edit Design
                  </button>
                </div>
              </div>

              {/* ✅ Success Message */}
              {saveSuccess && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3 sm:p-4 shadow-sm">
                  <div className="flex items-center gap-2 text-green-600 font-semibold text-sm sm:text-base">
                    ✅ Success!
                  </div>
                  <p className="text-xs sm:text-sm text-green-700">
                    Your fashion design has been saved to your device.
                  </p>
                </div>
              )}

              {/* ✅ Tips */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 sm:p-4 shadow-sm">
                <h4 className="font-medium mb-2 sm:mb-3 text-yellow-800 text-sm sm:text-base">
                  💡 Pro Tips:
                </h4>
                <ul className="list-disc list-inside text-xs sm:text-sm text-yellow-800 space-y-1">
                  <li>Images are saved in ultra-high quality (4x resolution)</li>
                  <li>Perfect for printing or sharing on social media</li>
                  <li>Try different lighting by changing background colors</li>
                  <li>Experiment with pattern combinations for unique looks</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullScreenPreview;
