import React from "react";
import dress from "../images/assets/Picsart_25-08-08_23-11-39-401.png";
import shirt from "../images/assets/Picsart_25-08-08_22-44-08-412.png";
import short from "../images/assets/Picsart_25-08-09_01-31-50-875.png";
import skirt from "../images/assets/Picsart_25-08-09_14-03-02-521.png";

function Mannequin({ customization }) {
  function changeManniquine() {
    if (customization.outfitType === "dress") {
      return dress;
    } else if (customization.outfitType === "shirt") {
      return shirt;
    } else if (customization.outfitType === "shorts") {
      return short;
    } else {
      return skirt;
    }
  }

  // 👉 Combine: overlay kente textures
  const renderOverlay = () => {
    const kentes = [customization.firstKente, ...(customization.extraKentes || [])].filter(Boolean);
    if (kentes.length === 0) return null;

    return (
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: kentes.map(k => `url(${k})`).join(", "),
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundBlendMode: "multiply"
        }}
      />
    );
  };

  // 👉 Blend: side-by-side panels
  const renderSideBySide = () => {
    const kentes = [customization.firstKente, ...(customization.extraKentes || [])].filter(Boolean);
    if (kentes.length === 0) return null;

    if (kentes.length === 1) {
      return (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${kentes[0]})` }}
        />
      );
    }

    const sectionWidth = 100 / kentes.length;
    return (
      <div className="absolute inset-0 flex">
        {kentes.map((kente, i) => (
          <div
            key={i}
            className="h-full bg-cover bg-center"
            style={{
              backgroundImage: `url(${kente})`,
              width: `${sectionWidth}%`,
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <div
      id="mannequin-display"
      className="relative w-[480px] h-[500px]"
      style={{ backgroundColor: "transparent" }}
    >
      {customization.mode === "combine" && renderOverlay()}
      {customization.mode === "blend" && renderSideBySide()}
      {(!customization.mode || customization.mode === "single") && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${customization.firstKente})` }}
        />
      )}

      <img
        src={changeManniquine()}
        alt="Mannequin"
        className="absolute w-full h-full top-0 left-0 z-10"
      />
    </div>
  );
}

export default Mannequin;
