"use client";
import React, { useEffect, useRef } from "react";
import socket from "../../socket";
export default function PaintWindow() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const socketRef = useRef<WebSocket | null>(null);

  // useEffect(() => {
  //   const handleReceiveImage = (data: any) => {
  //     // Sprawdź strukturę danych
  //     console.log("Otrzymane dane:", data);

  //     // Wyodrębnij Blob z odpowiedniego miejsca
  //     const blobData = data.blob?.blob; // Wyciągamy właściwy blob

  //     // Upewnij się, że blobData jest rzeczywiście instancją Blob
  //     if (blobData instanceof Blob) {
  //       const canvas = canvasRef.current;
  //       const context = canvas?.getContext("2d");

  //       if (canvas && context) {
  //         const img = new Image();
  //         img.onload = () => {
  //           // Wyczyszczenie canvas przed rysowaniem nowego obrazu
  //           context.clearRect(0, 0, canvas.width, canvas.height);
  //           context.drawImage(img, 0, 0);
  //         };

  //         // Tworzenie obiektu URL tylko jeśli blobData jest prawidłowy
  //         const objectURL = URL.createObjectURL(blobData);
  //         img.src = objectURL;

  //         // Zwolnienie URL po załadowaniu obrazu
  //         img.onload = () => {
  //           URL.revokeObjectURL(objectURL);
  //         };
  //       }
  //     } else {
  //       console.error("Otrzymany obiekt nie jest typu Blob", blobData);
  //     }
  //   };
  //   socket.on("recive-image", handleReceiveImage);
  //   return () => {
  //     socket.off("recive-image", handleReceiveImage);
  //   };
  // }, []);

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
          // Wysyłanie danych canvy po zakończeniu rysowania
          sendCanvasData();
        };

        const sendCanvasData = () => {
          if (canvasRef.current) {
            canvasRef.current.toBlob((blob) => {
              if (blob) {
                // console.log("blob", blob);
                socket.emit("send-image", { blob });
              }
            });
          }
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
      }
    }
  }, []);

  return (
    <div className="h-5/6 w-5/6 bg-white p-5 m-5 pl-0 ml-0">
      <canvas ref={canvasRef} className="h-full w-full"></canvas>
    </div>
  );
}
