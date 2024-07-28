"use client"
import React, { useState, useEffect } from 'react';
import socket from '../socket';
import Chat from './chat';

export default function page() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');


  return (
  <div className='bg-gray-900 m-1 h-dvh'>
    <Chat />
  </div>
  )
}
