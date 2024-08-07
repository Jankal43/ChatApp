import React, { useEffect, useState } from 'react';
import socket from '../socket';

export default function Chat() {

    
    type UsersListType = {
        [key: string]: string;
      };
    
      const [usersList, setUsersList] = useState<UsersListType>({});


    
    function sendMessage() {
        const messageInput = document.getElementById('messageInput') as HTMLInputElement;
        const receiverInput = document.getElementById('reciverInput') as HTMLInputElement;
        const userElement = document.getElementById('username');
        const user = userElement ? userElement.textContent || '' : '';
        const message = messageInput.value;
        const receiver = receiverInput.value;
        
        
       
    
        if (messageInput && receiverInput) {
            
    
        
    
            if (message === '') {
                return;
            }
    
            if (receiver === '') {
                displayMessage(message, user, false)
                socket.emit('send-message', { message, user });
            } else {
                displayMessage(message, user, true)
                socket.emit('private-message', { message, receiver, user });
            }
    
            messageInput.value = '';
        }
    }

    useEffect(() => {
        const handleReceiveMessage = (data: any) => {
            if(data.receiver){
                console.log("Mssage recived",data.message, data.user)
                displayMessage(data.message, data.user, true);
            }
            else{
                console.log("Mssage recived",data.message, data.user)
                displayMessage(data.message, data.user, false);
            }
           
        
        };

        socket.on("recive-message", handleReceiveMessage);
        return () => {
            socket.off("recive-message", handleReceiveMessage);
        };
    }, []);


    useEffect(() => {
        const handleReciveUsers = (users: any) => {
      
            setUsersList(users)

        };
        socket.on('active-users', handleReciveUsers);
        return () => {
            socket.off("active-users", handleReciveUsers);
        };
    }, []);

    function displayMessage(message: string, user: string, isPrivate: boolean) {
        const div = document.createElement("div");
        
    
        if (isPrivate) {
            div.textContent = `(Private message) ${user}: ${message}`;
            div.classList.add('bg-slate-900');
            document.getElementById("chatBox")?.append(div);
        } else {
            div.textContent = `${user}: ${message}`;
            document.getElementById("chatBox")?.append(div);
        }
    }
    

    function getUserName(userName: string) {
        const reciverInputElement = document.getElementById('reciverInput') as HTMLInputElement;
        if (reciverInputElement) {
            reciverInputElement.value = userName;
        } else {
            console.error("Element with id 'reciverInput' not found");
        }
    }

    


    return (
        <div className="p-2 m-2 h-screen">
            <div className="messagesArea flex flex-row h-4/6">
                <div id='chatBox' className="chatBox bg-slate-800 w-5/6 p-2 m-2">
                </div>
                <div id='userBox' className="usersBox bg-slate-800 w-1/6 p-2 m-2">
                     {Object.keys(usersList).map(key => (
                        <div id={key} key={key} onClick={() => getUserName(usersList[key])}>{usersList[key]}</div>
                    ))}
                </div>
            </div>
            <div className="inputArea flex flex-row h-1/6">
                <div className="w-1/4 m-2 p-5 bg-slate-800 content-center">
                    <p> Reciver: </p>
                    <input type="text" className="reciveArea mt-2 bg-gray-900 border w-full" id='reciverInput' />
                </div>
                <div className="w-2/4 m-2 p-5 bg-slate-800 content-center">
                    <p> Message: </p>
                    <input type="text" className="reciveArea mt-2 bg-gray-900 border w-full" id='messageInput' />
                </div>
                <div className="w-1/4 m-2 p-5 bg-slate-800 content-center">
                    <button onClick={sendMessage} className="bg-gray-900 hover:bg-slate-500 text-white font-semibold py-2 pt-4 pb-4 border shadow w-full">
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
}
