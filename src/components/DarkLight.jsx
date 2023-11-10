import React, { useEffect, useState } from "react";
import { BsCart3, BsMoonFill, BsSunFill } from "react-icons/bs";

function getThemeFromLocalStorage() {
  return localStorage.getItem("theme") || "dracula";
}

function DarkLightMode() {
  const [mode, setMode] = useState(getThemeFromLocalStorage());

  useEffect(() => {
    document.documentElement.dataset.theme = mode;
    localStorage.setItem("theme", mode);
  }, [mode]);

  const changeMode = () => {
    setMode((prev) => {
      return prev === "dracula" ? "winter" : "dracula";
    });
  };

  return (
    <div>
      <button
        className="cursor-pointer flex items-center "
        onClick={changeMode}
      >
        <label className="swap swap-rotate">
          <input type="checkbox" onChange={changeMode} />
        </label>

        {mode === "dracula" ? (
          <BsSunFill className="swap-on h-4 w-4" />
        ) : (
          <BsMoonFill className="swap-off h-4 w-4" />
        )}
      </button>
    </div>
  );
}

export default DarkLightMode;
