"use client"
import PaintWindow from "./paintWindow";
import React, {useEffect, useRef, useState} from "react";
import ToolBar from "./toolBar";

export default function Page() {
    const [toolSelected, setToolSelected] = useState("");
    const [colorSelected, setColorSelected] = useState("black");
    const [previousToolSelected, setPreviousToolSelected] = useState("");
    const [previousColorSelected, setPreviousColorSelected] = useState("");



    return (
    <div className="paintContainer bg-gray-900 m-1 h-screen">
        <ToolBar
            toolSelected={toolSelected}
            setToolSelected={setToolSelected}
            colorSelected={colorSelected}
            setColorSelected={setColorSelected}
            previousToolSelected={previousToolSelected}
            setPreviousToolSelected={setPreviousToolSelected}
            previousColorSelected={previousColorSelected}
            setPreviousColorSelected={setPreviousColorSelected}

        />
        <PaintWindow
            toolSelected={toolSelected}
            colorSelected={colorSelected}
        />
    </div>
  );
}
