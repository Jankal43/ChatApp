"use client";
import React, { useEffect, useRef } from "react";
import socket from "../../socket";

interface PaintWindowProps {
    toolSelected: string;
    colorSelected: string;
}

export default function PaintWindow({ toolSelected, colorSelected }: PaintWindowProps) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const toolRef = useRef(toolSelected);
    const colorRef = useRef(colorSelected);


    useEffect(() => {
        toolRef.current = toolSelected;
        colorRef.current = colorSelected;
    }, [toolSelected, colorSelected]);

    useEffect(() => {
        const canvas = canvasRef.current;
        let isDrawing = false;

        if (canvas) {
            const context = canvas.getContext("2d");

            if (context) {
                canvas.width = canvas.offsetWidth;
                canvas.height = canvas.offsetHeight;

                const startDrawing = (e: MouseEvent) => {
                    isDrawing = true;
                    context.beginPath();
                    context.moveTo(e.offsetX, e.offsetY);
                };

                const draw = (e: MouseEvent) => {
                    if (!isDrawing) return;

                    context.strokeStyle = colorRef.current;
                    if (toolRef.current === "Brush") {
                        context.lineTo(e.offsetX, e.offsetY);
                        context.stroke();
                    } else if (toolRef.current === "Eraser") {
                        context.clearRect(e.offsetX - 5, e.offsetY - 5, 10, 10);
                    }
                };

                const stopDrawing = () => {
                    isDrawing = false;
                    context.closePath();
                    sendCanvasData();
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
