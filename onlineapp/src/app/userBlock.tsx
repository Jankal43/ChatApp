"use client"
import socket from '@/socket';
import React, { useEffect, useState } from 'react';

export default function UserBlock(props: any){
    
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
            props.setIsLoggedIn(true)   
          
           
        }
        else{
            setUserNickname('')
            disconnectSocket();
            props.setIsLoggedIn(false) 
        }
    }
    useEffect(() => {
        if (userNickname !== '' && isConnected) {
            socket.emit('user-nickname', userNickname, socket.id);
        }
    }, [userNickname, isConnected]);
    
    const connectSocket = () => {
        if (!isConnected) {
            socket.connect();
          
            
            socket.on('connect', () => {
                console.log('connected to server');
                setIsConnected(true);
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
                                className="inputUserName bg-gray-800 border" 
                                value={inputValue} 
                                onChange={handleInputChange}
                            /><br />
                            <button 
                                onClick={handleButtonClick} 
                                className="disconnectButton bg-green-900 hover:bg-green-700 text-white font-semibold py-2 p-3 border shadow"
                            >
                                Connect
                            </button>
                        </div>
                    ) : (
                        <div className="userName">
                            <p className='text-center' id='username'>{userNickname} </p>
                            <button  onClick={handleButtonClick} className='bg-red-900 hover:bg-red-700 text-white font-semibold py-2 p-3 border shadow'>Disconnect</button>
                        </div>
                    )}
            </div>
        </div>
    )
}
