"use client"
import React, { useState, useEffect } from 'react';
import socket from '../socket';
import Chat from './chat';

export default function page() {
  


  useEffect(() => {
    if(document.getElementById('username')?.textContent){

    }
  });
  return (
  <div className='bg-gray-900 m-1 h-dvh'>
   
   {document.getElementById('username')?.textContent === '' ? (
    <Chat />
   ):(
    <p>You have to log in</p>
   )}
  </div>
  )
}
