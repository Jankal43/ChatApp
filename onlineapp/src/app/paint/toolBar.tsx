import React, { useEffect } from "react";


interface ToolBarProps {
    toolSelected: string;
    setToolSelected: React.Dispatch<React.SetStateAction<string>>;
    colorSelected: string;
    setColorSelected: React.Dispatch<React.SetStateAction<string>>;
    previousToolSelected: string;
    setPreviousToolSelected: React.Dispatch<React.SetStateAction<string>>;
    previousColorSelected: string;
    setPreviousColorSelected: React.Dispatch<React.SetStateAction<string>>;
    brushSize: number;
    setBrushSize: React.Dispatch<React.SetStateAction<number>>;
}

export default function ToolBar({
                                    toolSelected,
                                    setToolSelected,
                                    colorSelected,
                                    setColorSelected,
                                    previousToolSelected,
                                    setPreviousToolSelected,
                                    previousColorSelected,
                                    setPreviousColorSelected,
                                    brushSize,
                                    setBrushSize,
                                }: ToolBarProps) {

    useEffect(() => {
        document.getElementById(toolSelected)?.classList.add("font-bold");
        document.getElementById(previousToolSelected)?.classList.remove("font-bold");
        setPreviousToolSelected(toolSelected);
    }, [toolSelected]);

    useEffect(() => {
        document.getElementById(colorSelected)?.classList.add("scale-125");
        document.getElementById(previousColorSelected)?.classList.remove("scale-125");
        setPreviousColorSelected(colorSelected);
    }, [colorSelected]);



    const handleBrushSizeChange = (event: any) => {
        setBrushSize(parseInt(event.target.value));
    };

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
                    id="Black"
                >
                    ⚫
                </li>
                <li
                    onClick={() => setColorSelected("Red")}
                    className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
                    id="Red"
                >
                    🔴
                </li>
                <li
                    onClick={() => setColorSelected("Blue")}
                    className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
                    id="Blue"
                >
                    🔵
                </li>
                <li
                    onClick={() => setColorSelected("Yellow")}
                    className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
                    id="Yellow"
                >
                    🟡
                </li>
                <li
                    onClick={() => setColorSelected("Purple")}
                    className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
                    id="Purple"
                >
                    🟣
                </li>
            </ul>
            <label>Size:</label>
            <ul className="mt-2">
                <div className="flex items-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-brush mr-2"
                        viewBox="0 0 16 16"
                    >
                        <path
                            d="M15.825.12a.5.5 0 0 1 .132.584c-1.53 3.43-4.743 8.17-7.095 10.64a6.1 6.1 0 0 1-2.373 1.534c-.018.227-.06.538-.16.868-.201.659-.667 1.479-1.708 1.74a8.1 8.1 0 0 1-3.078.132 4 4 0 0 1-.562-.135 1.4 1.4 0 0 1-.466-.247.7.7 0 0 1-.204-.288.62.62 0 0 1 .004-.443c.095-.245.316-.38.461-.452.394-.197.625-.453.867-.826.095-.144.184-.297.287-.472l.117-.198c.151-.255.326-.54.546-.848.528-.739 1.201-.925 1.746-.896q.19.012.348.048c.062-.172.142-.38.238-.608.261-.619.658-1.419 1.187-2.069 2.176-2.67 6.18-6.206 9.117-8.104a.5.5 0 0 1 .596.04M4.705 11.912a1.2 1.2 0 0 0-.419-.1c-.246-.013-.573.05-.879.479-.197.275-.355.532-.5.777l-.105.177c-.106.181-.213.362-.32.528a3.4 3.4 0 0 1-.76.861c.69.112 1.736.111 2.657-.12.559-.139.843-.569.993-1.06a3 3 0 0 0 .126-.75zm1.44.026c.12-.04.277-.1.458-.183a5.1 5.1 0 0 0 1.535-1.1c1.9-1.996 4.412-5.57 6.052-8.631-2.59 1.927-5.566 4.66-7.302 6.792-.442.543-.795 1.243-1.042 1.826-.121.288-.214.54-.275.72v.001l.575.575zm-4.973 3.04.007-.005zm3.582-3.043.002.001h-.002z"/>
                    </svg>
                    <select
                        id="brushSize"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-3/6 p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        onChange={handleBrushSizeChange}
                    >
                        <option value="1">1</option>
                        <option value="6">6</option>
                        <option value="12">12</option>
                        <option value="18">18</option>
                        <option value="24">24</option>
                        <option value="36">36</option>
                    </select>
                </div>
            </ul>
        </div>

    );
}
