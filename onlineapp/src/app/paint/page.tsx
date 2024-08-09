"use client";
import React, { useEffect, useRef } from "react";
import ToolBar from "./toolBar";
import PaintWindow from "./paintWindow";

export default function Page() {
  return (
    <div className="paintContainer bg-gray-900 m-1 h-screen">
      <ToolBar />
      <PaintWindow />
    </div>
  );
}
