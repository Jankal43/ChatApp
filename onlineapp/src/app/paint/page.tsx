"use client"
import React, { useEffect, useState, useRef } from 'react';
import ToolBar from './toolBar';
export default function page() {
  
  const canvasRef = useRef(null);

  useEffect(() => {
      const canvas = canvasRef.current;
      if (canvas) {
          const context = canvas.getContext('2d');
          if (context) {
              context.fillStyle = 'white';
              context.fillRect(0, 0, 350, 350);
          } else {
              console.error('Nie można uzyskać kontekstu 2D');
          }
      } else {
          console.error('Element canvas nie został załadowany');
      }
  }, []);

  return (
      
      <div className='bg-gray-900 m-1 h-dvh'>
        <ToolBar ></ToolBar>
        <canvas ref={canvasRef} className='w-3/5 m-5 p-5 h-dvh bg-gray-700'></canvas>
    </div>
  );
}
