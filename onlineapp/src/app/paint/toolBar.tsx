import React, { useEffect, useState } from "react";

export default function ToolBar() {
  const [toolSelectet, setToolSelectet] = useState("");
  const [previousToolSelectet, setPreviousToolSelectet] = useState("");
  const [colorSelectet, setColorSelectet] = useState("black");

  useEffect(() => {
    document.getElementById(toolSelectet)?.classList.add("font-bold");
    setPreviousToolSelectet(toolSelectet);
    document.getElementById(previousToolSelectet)?.classList.remove("font-bold");

  }, [toolSelectet]);

  return (
    <div className="font-sans toolBar flex-grow w-1/6 bg-gray-800 m-5 p-5 h-5/6">
      <p className="text-xl font-bold pb-2 flex items-center">Tool Bar</p>

      <label>Shapes:</label>
      <ul>
        <li
          onClick={() => setToolSelectet("Rectangle")}
          id="Rectangle"
          className="flex items-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 duration-300"
        >
          Rectangle ▭
        </li>
        <li
          onClick={() => setToolSelectet("Circle")}
          className="flex items-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
          id="Circle"
        >
          Circle ◯
        </li>
        <li
          onClick={() => setToolSelectet("Triangle")}
          className="flex items-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
          id="Triangle"
        >
          Triangle △
        </li>
      </ul>

      <label>Options:</label>
      <ul>
        <li
          onClick={() => setToolSelectet("Brush")}
          className="flex items-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
          id="Brush"
        >
          Brush
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-brush ml-2"
            viewBox="0 0 16 16"
          >
            <path d="M15.825.12a.5.5 0 0 1 .132.584c-1.53 3.43-4.743 8.17-7.095 10.64a6.1 6.1 0 0 1-2.373 1.534c-.018.227-.06.538-.16.868-.201.659-.667 1.479-1.708 1.74a8.1 8.1 0 0 1-3.078.132 4 4 0 0 1-.562-.135 1.4 1.4 0 0 1-.466-.247.7.7 0 0 1-.204-.288.62.62 0 0 1 .004-.443c.095-.245.316-.38.461-.452.394-.197.625-.453.867-.826.095-.144.184-.297.287-.472l.117-.198c.151-.255.326-.54.546-.848.528-.739 1.201-.925 1.746-.896q.19.012.348.048c.062-.172.142-.38.238-.608.261-.619.658-1.419 1.187-2.069 2.176-2.67 6.18-6.206 9.117-8.104a.5.5 0 0 1 .596.04M4.705 11.912a1.2 1.2 0 0 0-.419-.1c-.246-.013-.573.05-.879.479-.197.275-.355.532-.5.777l-.105.177c-.106.181-.213.362-.32.528a3.4 3.4 0 0 1-.76.861c.69.112 1.736.111 2.657-.12.559-.139.843-.569.993-1.06a3 3 0 0 0 .126-.75zm1.44.026c.12-.04.277-.1.458-.183a5.1 5.1 0 0 0 1.535-1.1c1.9-1.996 4.412-5.57 6.052-8.631-2.59 1.927-5.566 4.66-7.302 6.792-.442.543-.795 1.243-1.042 1.826-.121.288-.214.54-.275.72v.001l.575.575zm-4.973 3.04.007-.005zm3.582-3.043.002.001h-.002z" />
          </svg>
        </li>
        <li
          onClick={() => setToolSelectet("Eraser")}
          className="flex items-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
          id="Eraser"
        >
          Eraser
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-eraser ml-2"
            viewBox="0 0 16 16"
          >
            <path d="M8.086 2.207a2 2 0 0 1 2.828 0l3.879 3.879a2 2 0 0 1 0 2.828l-5.5 5.5A2 2 0 0 1 7.879 15H5.12a2 2 0 0 1-1.414-.586l-2.5-2.5a2 2 0 0 1 0-2.828zm2.121.707a1 1 0 0 0-1.414 0L4.16 7.547l5.293 5.293 4.633-4.633a1 1 0 0 0 0-1.414zM8.746 13.547 3.453 8.254 1.914 9.793a1 1 0 0 0 0 1.414l2.5 2.5a1 1 0 0 0 .707.293H7.88a1 1 0 0 0 .707-.293z" />
          </svg>
        </li>
      </ul>

      <label>Colors:</label>
      <ul className="flex colorsContainer">
        <li
          onClick={() => setColorSelectet("Black")}
          className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
        >
          ⚫
        </li>
        <li
          onClick={() => setColorSelectet("Red")}
          className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
        >
          🔴
        </li>
        <li
          onClick={() => setColorSelectet("Blue")}
          className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
        >
          🔵
        </li>
        <li
          onClick={() => setColorSelectet("Yellow")}
          className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
        >
          🟡
        </li>
        <li
          onClick={() => setColorSelectet("Purple")}
          className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
        >
          🟣
        </li>
      </ul>
    </div>
  );
}
