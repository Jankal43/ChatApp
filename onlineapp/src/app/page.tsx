"use client";
import React, { useState, useEffect } from "react";
import socket from "../socket";
import Chat from "./chat";

export default function page() {
  return (
    <div className="bg-gray-900 m-1 h-dvh">
      <Chat />
    </div>
  );
}
