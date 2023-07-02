import React, { useState, useEffect } from "react";
import colorsPalette from "../data/colors-palette.json";
import { marked } from "marked";
import parse from "html-react-parser";

export default function QuoteMachine() {
  const [currentValue, setCurrentValue] = useState("");
  useEffect(() => {
    fetch("./data/defaultText.txt")
      .then((response) => response.text())
      .then((data) => {
        const textString = data;
        setCurrentValue(textString);
      })
      .catch((error) => {
        console.error("Błąd podczas wczytywania pliku:", error);
      });
  }, []);

  const handleClick = (event) => {
    const container = document.getElementById("markdown-previever");
    const clickedButton = document.getElementById(event.target.id);
    clickedButton.classList.toggle("toggle-button");

    Array.from(container.querySelectorAll(`:scope > *`))
      .filter((child) => {
        return !child.querySelector(`#${event.target.id}`);
      })
      .filter((child) => {
        console.log(child.classList.contains("divider"));
        return !child.classList.contains("divider");
      })
      .forEach((child) => child.classList.toggle("d-none"));
    Array.from(container.querySelectorAll(`:scope > *`))
      .filter((child) => {
        return child.querySelector(`#editor`);
      })
      .forEach((child) => child.classList.toggle("h-100-custom"));
    Array.from(container.querySelectorAll(`:scope > *`))
      .filter((child) => {
        return child.querySelector(`#preview`);
      })
      .forEach((child) => child.classList.toggle("min-h-100"));
    Array.from(container.querySelectorAll(`:scope > *`))
      .filter((child) => {
        return child.querySelector(`#editor`);
      })
      .forEach((child) =>
        child.querySelector("#editor").classList.toggle("h-100")
      );
  };

  const changeValue = (event) => {
    setCurrentValue(() => {
      return event.target.value;
    });
    console.log(marked);
  };

  const options = {
    mangle: false,
    headerIds: false,
    breaks: true,
  };

  return (
    <>
      <div className="card" id="editor-window">
        <div className="card-header">
          Edytor
          <button
            id="editor-close-button"
            onClick={handleClick}
            type="button"
            className="btn-close"
            aria-label="Close"></button>
        </div>
        <div className="card-body">
          <textarea
            onChange={changeValue}
            value={currentValue}
            name="editor"
            id="editor"
            className="w-100"></textarea>
        </div>
      </div>
      <div className="card" id="preview-window">
        <div className="card-header">
          Przegląd
          <button
            onClick={handleClick}
            id="preview-close-button"
            type="button"
            className="btn-close"
            aria-label="Close"></button>
        </div>
        <div className="card-body">
          <div id="preview">{parse(marked(currentValue, options))}</div>
        </div>
      </div>
      <div className="divider"></div>
    </>
  );
}
