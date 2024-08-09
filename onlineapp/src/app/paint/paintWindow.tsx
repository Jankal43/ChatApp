"use client";
import React, { useEffect, useRef } from "react";

export default function PaintWindow() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    let isDrawing = false;

    if (canvas) {
      const context = canvas.getContext(
        "2d"
      ) as CanvasRenderingContext2D | null;

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
        };

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
      } else {
        console.error("Nie można uzyskać kontekstu 2D");
      }
    } else {
      console.error("Element canvas nie został załadowany");
    }
  }, []);

  return (
    <div className="h-5/6 w-5/6 bg-white p-5 m-5 pl-0 ml-0 ">
      <canvas ref={canvasRef} className="h-full w-full"></canvas>
    </div>
  );
}
