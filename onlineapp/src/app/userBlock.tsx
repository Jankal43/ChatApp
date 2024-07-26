"use client"
import socket from '@/socket';
import React, { useState } from 'react';

export default function UserBlock(){
    
    const [userNickname, setUserNickname] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [isConnected, setIsConnected] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    }

    const handleButtonClick = () => {
        if(userNickname === ''){
            connectSocket();
            setUserNickname(inputValue);      
           
        }
        else{
            setUserNickname('')
            console.log(socket.id)
            disconnectSocket();
            
        }
    }
    const connectSocket = () => {
        if (!isConnected) {
            socket.connect();
            setIsConnected(true);
            
            socket.on('connect', () => {
                console.log('connected to server');
                console.log(socket.id) 
            });

            socket.on('disconnect', () => {
                console.log('disconnected from server');
                setIsConnected(false);
            });
        }
    };

    const disconnectSocket = () => {
        if (isConnected) {
            socket.disconnect();
            console.log('disconnected');
            setIsConnected(false);
        }
    };
    return(
        <div className="userBlock h-full">
            <div className="appDescription bg-gray-900 m-1 p-5 h-1/3 text-7xl font-bold text-center">CHAT SYSTEM</div>
            <div className="userDescription bg-gray-900 m-1 p-5 h-2/3">
                <div className="userPFP p-4 m-4"></div>
                <div className="userNameTag p-2 m-2">Name:</div>
                    {userNickname === '' ? (
                        <div className='flex flex-col items-center'>
                            <input 
                                className="inputUserName text-slate-950" 
                                value={inputValue} 
                                onChange={handleInputChange}
                            /><br />
                            <button 
                                onClick={handleButtonClick} 
                                className="disconnectButton bg-black p-2"
                            >
                                Connect
                            </button>
                        </div>
                    ) : (
                        <div className="userName">
                            <p className='text-center'>{userNickname} </p>
                            <button  onClick={handleButtonClick} className='bg-black m-2 p-2'>Disconnect</button>
                        </div>
                    )}
            </div>
        </div>
    )
}
