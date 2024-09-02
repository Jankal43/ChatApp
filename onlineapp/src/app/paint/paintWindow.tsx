import React, { useEffect, useRef } from "react";
import socket from "../../socket";

interface PaintWindowProps {
    toolSelected: string;
    colorSelected: string;
    brushSize: number;
}

export default function PaintWindow({ toolSelected, colorSelected, brushSize }: PaintWindowProps) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const toolRef = useRef(toolSelected);
    const colorRef = useRef(colorSelected);
    const brushSizeRef = useRef(brushSize);

    const startX = useRef<number>(0);
    const startY = useRef<number>(0);
    const isDrawingRef = useRef<boolean>(false);
    const imageDataRef = useRef<ImageData | null>(null);


    useEffect(() => {
        toolRef.current = toolSelected;
        colorRef.current = colorSelected;
    }, [toolSelected, colorSelected]);

    useEffect(() => {
        brushSizeRef.current = brushSize;
    }, [brushSize]);


    useEffect(() => {
        const canvas = canvasRef.current;

        if (canvas) {
            const context = canvas.getContext("2d", { willReadFrequently: true });
            if (context) {
                canvas.width = canvas.offsetWidth;
                canvas.height = canvas.offsetHeight;



                const startDrawing = (e: MouseEvent) => {
                    isDrawingRef.current = true;
                    startX.current = e.offsetX;
                    startY.current = e.offsetY;

                    context.lineWidth = brushSizeRef.current;

                    if (toolRef.current === "Line" || toolRef.current === "Rectangle" || toolRef.current === "Triangle" || toolRef.current==="Circle") {
                        imageDataRef.current = context.getImageData(0, 0, canvas.width, canvas.height);
                    } else {
                        context.beginPath();
                        context.moveTo(e.offsetX, e.offsetY);
                    }
                };

                const draw = (e: MouseEvent) => {
                    if (!isDrawingRef.current) return;

                    if (toolRef.current === "Brush") {
                        context.strokeStyle = colorRef.current;
                        context.lineTo(e.offsetX, e.offsetY);
                        context.stroke();
                    } else if (toolRef.current === "Eraser") {
                        context.strokeStyle = "white";
                        context.lineTo(e.offsetX, e.offsetY);
                        context.stroke();
                    } else if (toolRef.current === "Line") {
                        if (imageDataRef.current) {
                            context.putImageData(imageDataRef.current, 0, 0);
                        }
                        context.beginPath();
                        context.moveTo(startX.current, startY.current);
                        context.lineTo(e.offsetX, e.offsetY);
                        context.strokeStyle = colorRef.current;
                        context.stroke();
                        context.closePath();
                    } else if (toolRef.current === "Rectangle") {
                        if (imageDataRef.current) {
                            context.putImageData(imageDataRef.current, 0, 0);
                        }
                        context.beginPath();
                        context.moveTo(startX.current, startY.current);
                        context.lineTo(e.offsetX, startY.current);
                        context.lineTo(e.offsetX, e.offsetY);
                        context.lineTo(startX.current, e.offsetY);
                        context.lineTo(startX.current, startY.current);
                        context.strokeStyle = colorRef.current;
                        context.stroke();
                        context.closePath();
                    }
                    else if (toolRef.current === "Triangle") {
                        if (imageDataRef.current) {
                            context.putImageData(imageDataRef.current, 0, 0);
                        }
                        context.beginPath();
                        context.moveTo((startX.current+e.offsetX)/2 , startY.current);
                        context.lineTo(e.offsetX, e.offsetY);
                        context.lineTo(e.offsetX, e.offsetY);
                        context.lineTo(startX.current, e.offsetY);
                        context.lineTo((startX.current+e.offsetX)/2 , startY.current);
                        context.strokeStyle = colorRef.current;
                        context.stroke();
                        context.closePath();
                    }
                    else if (toolRef.current === "Circle") {
                        if (imageDataRef.current) {
                            context.putImageData(imageDataRef.current, 0, 0);
                        }
                        context.beginPath();
                        context.arc(startX.current, startY.current, Math.abs(e.offsetY - startY.current),0,2 * Math.PI)
                        context.strokeStyle = colorRef.current;
                        context.stroke();
                        context.closePath();
                    }
                };

                const stopDrawing = () => {
                    if (isDrawingRef.current) {
                        isDrawingRef.current = false;
                        sendCanvasData();
                    }
                };

                const sendCanvasData = () => {
                    if (canvasRef.current) {
                        canvasRef.current.toBlob((blob) => {
                            if (blob) {
                                socket.emit("send-image", { blob });
                            }
                        });
                    }
                };

                socket.on("recive-image", ({ blob }) => {
                    if (blob instanceof Blob) {
                        const img = new Image();
                        const url = URL.createObjectURL(blob);
                        img.onload = () => {
                            context.drawImage(img, 0, 0);
                            URL.revokeObjectURL(url);
                        };
                        img.src = url;
                    } else if (blob instanceof ArrayBuffer) {
                        const blobObject = new Blob([blob], { type: "image/png" });
                        const img = new Image();
                        const url = URL.createObjectURL(blobObject);
                        img.onload = () => {
                            context.drawImage(img, 0, 0);
                            URL.revokeObjectURL(url);
                        };
                        img.src = url;
                    } else {
                        console.error("Received an unknown type, cannot create URL.");
                    }
                });

                canvas.addEventListener("mousedown", startDrawing);
                canvas.addEventListener("mousemove", draw);
                canvas.addEventListener("mouseup", stopDrawing);
                canvas.addEventListener("mouseout", stopDrawing);

                return () => {
                    canvas.removeEventListener("mousedown", startDrawing);
                    canvas.removeEventListener("mousemove", draw);
                    canvas.removeEventListener("mouseup", stopDrawing);
                    canvas.removeEventListener("mouseout", stopDrawing);
                };
            }
        }
    }, []);

    return (
        <div className="h-5/6 w-5/6 bg-white p-5 m-5 pl-0 ml-0">
            <canvas ref={canvasRef} className="h-full w-full"></canvas>
        </div>
    );
}
