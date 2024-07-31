import React, { useEffect, useState } from 'react';
import socket from '../socket';

export default function Chat() {

    const [usersList, setUsersList] = useState({});
    
    function sendMessage() {
        const messageInput = document.getElementById('messageInput') as HTMLInputElement;
        const receiverInput = document.getElementById('reciverInput') as HTMLInputElement;
        const userElement = document.getElementById('username');
        const user = userElement ? userElement.textContent : '';

        if (messageInput && receiverInput) {
            const message = messageInput.value;
            const receiver = receiverInput.value;

            socket.emit('send-message', { message, receiver, user });
            messageInput.value = '';
        }
    }

    useEffect(() => {
        const handleReceiveMessage = (data: any) => {
            displayMessage(data.message, data.user);
        };

        socket.on("recive-message", handleReceiveMessage);
        return () => {
            socket.off("recive-message", handleReceiveMessage);
        };
    }, []);


    useEffect(()=>{
        const handleReciveUser = (user:any) =>{
            console.log("user",user)
            // setUsersList(data.users)
            // displayUsers(data.users)
            
        };
        socket.on('user-connected', handleReciveUser);
        return () => {
            socket.off("user-connected", handleReciveUser);
        };
    },[]);

    function displayMessage(message: string, user: string) {
        const div = document.createElement("div");
        div.textContent = `${user}: ${message}`;
        document.getElementById("chatBox")?.append(div);
    }

    

    
    // function displayUsers(user:string) {
    //     const div = document.createElement("div");
    //     div.textContent = `${user}`;
    //     document.getElementById("userBox")?.append(div);
    // }



    // socket.on("active-users", (users: string[]) => {
    //     console.log("Users", users);
    //     for (let key in users) {
    //         console.log(`${key}: ${users[key]}`);
    //         // displayUsers(users[key])
    //     }
    // });

    return (
        <div className="p-2 m-2 h-screen">
            <div className="messagesArea flex flex-row h-4/6">
                <div id='chatBox' className="chatBox bg-slate-800 w-5/6 p-2 m-2">
                    {/* messages from serwer */}
                </div>
                <div id='userBox' className="usersBox bg-slate-800 w-1/6 p-2 m-2">
                    userBox
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
