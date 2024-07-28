export default function Chat(){
    return(
        <div className="p-2 m-2 h-screen">
            <div className="messagesArea flex flex-row h-4/6">
                <div className="chatBox bg-slate-800 w-5/6 p-2 m-2">
                    chatBox
                </div>
                <div className="usersBox bg-slate-800 w-1/6 p-2 m-2">
                    userBox
                </div>
            </div>
            <div className="inputArea flex flex-row h-1/6">
                <div className="w-1/4 m-2 p-5 bg-slate-800 content-center">
                    <p> Reciver: </p>
                    <input type="text" className="reciveArea mt-2 bg-gray-900 border w-full" />
                </div>
                <div className="w-2/4 m-2 p-5 bg-slate-800 content-center">
                    <p> Message: </p>
                    <input type="text" className="reciveArea mt-2 bg-gray-900 border w-full" />
                </div>
                <div className="w-1/4 m-2 p-5 bg-slate-800 content-center">
                    <button className="bg-gray-900 hover:bg-slate-500 text-white font-semibold py-2 px-4 border shadow w-full">Send</button>
                </div>
            </div>
        </div>
    );
}