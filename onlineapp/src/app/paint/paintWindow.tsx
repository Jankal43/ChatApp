"use client";
import React, { useState, useEffect, useRef } from "react";
import socket from "../../socket";
import ToolBar from "./toolBar";
export default function PaintWindow() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [toolSelectet, setToolSelectet] = useState("");

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
          context.lineTo(e.offsetX, e.offsetY);
          context.stroke();
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
    <div className="paintContainer bg-gray-900 m-1 h-screen">
      <ToolBar />
      <div className="h-5/6 w-5/6 bg-white p-5 m-5 pl-0 ml-0">
        <canvas ref={canvasRef} className="h-full w-full"></canvas>
      </div>
    </div>
  );
}
