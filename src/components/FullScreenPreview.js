import React, { useState } from "react";
import { X, Download, Share2, Palette } from "lucide-react";
import Mannequin from "./Mannequin"; // ✅ Uses the same mannequin component as FashionCustomizer
import html2canvas from "html2canvas";

const FullScreenPreview = ({ customization, isOpen, onClose, onEdit }) => {
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  if (!isOpen) return null;

  // ✅ Capture mannequin design as an image
  const handleSave = async () => {
    setIsSaving(true);
    const mannequinElement = document.getElementById("fullscreen-mannequin-display");
    if (mannequinElement) {
      try {
        const canvas = await html2canvas(mannequinElement, {
          backgroundColor: "#ffffff",
          scale: 4, // 4x resolution for print-quality
          useCORS: true,
          allowTaint: true,
        });

        const link = document.createElement("a");
        const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, "-");
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
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-6xl max-h-[90vh] overflow-y-auto flex flex-col">
        
        {/* Header */}
        <div className="flex justify-between items-center border-b px-4 py-3">
          <h2 className="text-lg font-semibold">Fashion Design Preview</h2>
          <button
            className="p-1 hover:bg-gray-200 rounded-full transition"
            onClick={onClose}
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* ✅ Full mannequin preview */}
            <div className="flex justify-center items-center">
              <div
                id="fullscreen-mannequin-display"
                className="bg-gray-100 p-4 rounded-lg flex justify-center items-center w-full h-full"
              >
                <Mannequin customization={customization} fullPreview />
              </div>
            </div>

            {/* ✅ Design details */}
            <div className="flex flex-col gap-4">
              <div className="bg-gray-50 border rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-3">Design Details</h3>

                <div className="space-y-4">
                  {/* Outfit Style */}
                  <div className="flex items-center gap-2">
                    <Palette size={16} />
                    <div>
                      <p className="text-sm font-medium text-gray-600">Outfit Style</p>
                      <p className="font-semibold">
                        {customization.outfitType
                          ?.replace("-", " ")
                          .replace(/\b\w/g, (l) => l.toUpperCase())}
                      </p>
                    </div>
                  </div>

                  {/* Top Styling */}
                  <div>
                    <h4 className="font-medium mb-2">Top Styling</h4>
                    <div className="flex items-center gap-2 mb-1">
                      <div
                        className="w-6 h-6 rounded border"
                        style={{ backgroundColor: customization.topColor }}
                      />
                      <span className="text-sm">Primary: {customization.topColor}</span>
                    </div>
                    {customization.topSecondaryColor && (
                      <div className="flex items-center gap-2 mb-1">
                        <div
                          className="w-6 h-6 rounded border"
                          style={{ backgroundColor: customization.topSecondaryColor }}
                        />
                        <span className="text-sm">
                          Secondary: {customization.topSecondaryColor}
                        </span>
                      </div>
                    )}
                    {customization.topPattern && (
                      <p className="text-sm">Pattern: {customization.topPattern}</p>
                    )}
                  </div>

                  {/* Bottom Styling (skip if dress) */}
                  {customization.outfitType !== "dress" && (
                    <div>
                      <h4 className="font-medium mb-2">Bottom Styling</h4>
                      <div className="flex items-center gap-2 mb-1">
                        <div
                          className="w-6 h-6 rounded border"
                          style={{ backgroundColor: customization.bottomColor }}
                        />
                        <span className="text-sm">Primary: {customization.bottomColor}</span>
                      </div>
                      {customization.bottomSecondaryColor && (
                        <div className="flex items-center gap-2 mb-1">
                          <div
                            className="w-6 h-6 rounded border"
                            style={{ backgroundColor: customization.bottomSecondaryColor }}
                          />
                          <span className="text-sm">
                            Secondary: {customization.bottomSecondaryColor}
                          </span>
                        </div>
                      )}
                      {customization.bottomPattern && (
                        <p className="text-sm">Pattern: {customization.bottomPattern}</p>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* ✅ Action Buttons */}
              <div className="flex flex-col gap-3">
                <button
                  onClick={handleSave}
                  className="bg-blue-600 text-white flex items-center justify-center gap-2 px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                  disabled={isSaving}
                >
                  {isSaving ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Saving High-Quality Image...
                    </>
                  ) : (
                    <>
                      <Download size={16} /> Save High-Quality Image
                    </>
                  )}
                </button>

                <div className="flex gap-2">
                  <button
                    onClick={handleShare}
                    className="border border-gray-300 text-gray-700 flex items-center justify-center gap-2 px-4 py-2 rounded hover:bg-gray-100"
                  >
                    <Share2 size={16} /> Share
                  </button>
                  <button
                    onClick={onEdit}
                    className="border border-gray-300 text-gray-700 flex items-center justify-center gap-2 px-4 py-2 rounded hover:bg-gray-100"
                  >
                    <Palette size={16} /> Edit Design
                  </button>
                </div>
              </div>

              {/* ✅ Success Message */}
              {saveSuccess && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex flex-col gap-1">
                  <div className="flex items-center gap-2 text-green-600 font-medium">
                    ✅ Success!
                  </div>
                  <p className="text-sm text-green-700">
                    Your fashion design has been saved to your device.
                  </p>
                </div>
              )}

              {/* ✅ Tips */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <h4 className="font-medium mb-2">💡 Pro Tips:</h4>
                <ul className="list-disc list-inside text-sm text-yellow-800 space-y-1">
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
