import React, { useEffect } from "react";


interface ToolBarProps {
  toolSelected: string;
  setToolSelected: React.Dispatch<React.SetStateAction<string>>;
  colorSelected: string;
  setColorSelected: React.Dispatch<React.SetStateAction<string>>;
  previousToolSelected: string;
  setPreviousToolSelected: React.Dispatch<React.SetStateAction<string>>;
}


export default function ToolBar({
                                  toolSelected,
                                  setToolSelected,
                                  colorSelected,
                                  setColorSelected,
                                  previousToolSelected,
                                  setPreviousToolSelected,
                                }: ToolBarProps) {
  useEffect(() => {

    document.getElementById(toolSelected)?.classList.add("font-bold");
    setPreviousToolSelected(toolSelected);
    document.getElementById(previousToolSelected)?.classList.remove("font-bold");

  }, [toolSelected]);

  return (
      <div className="font-sans toolBar flex-grow w-1/6 bg-gray-800 m-5 p-5 h-5/6">
        <p className="text-xl font-bold pb-2 flex items-center">Tool Bar</p>

        <label>Shapes:</label>
          <ul>
              <li
                  onClick={() => setToolSelected("Line")}
                  className="flex items-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
                  id="Line"
              >
                  Line \
              </li>
              <li
                  onClick={() => setToolSelected("Rectangle")}
                  id="Rectangle"
                  className="flex items-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 duration-300"
              >
                  Rectangle ▭
              </li>
              <li
                  onClick={() => setToolSelected("Circle")}
                  className="flex items-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
                  id="Circle"
              >
                  Circle ◯
              </li>
              <li
                  onClick={() => setToolSelected("Triangle")}
                  className="flex items-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
                  id="Triangle"
              >
                  Triangle △
              </li>

          </ul>

          <label>Options:</label>
          <ul>
              <li
                  onClick={() => setToolSelected("Brush")}
                  className="flex items-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
                  id="Brush"
              >
            Brush
          </li>
          <li
              onClick={() => setToolSelected("Eraser")}
              className="flex items-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
              id="Eraser"
          >
            Eraser
          </li>
        </ul>

        <label>Colors:</label>
        <ul className="flex colorsContainer">
          <li
              onClick={() => setColorSelected("Black")}
              className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
          >
            ⚫
          </li>
          <li
              onClick={() => setColorSelected("Red")}
              className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
          >
            🔴
          </li>
          <li
              onClick={() => setColorSelected("Blue")}
              className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
          >
            🔵
          </li>
          <li
              onClick={() => setColorSelected("Yellow")}
              className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
          >
            🟡
          </li>
          <li
              onClick={() => setColorSelected("Purple")}
              className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
          >
            🟣
          </li>
        </ul>
      </div>
  );
}
