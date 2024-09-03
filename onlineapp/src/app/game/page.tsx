export default function Page() {

    return (
    <div className="gameContainer bg-gray-900 m-1 h-screen p-5">

            <div className="bg-slate-800 text-slate-100 h-5/6 w-5/6 p-5 m-5 pl-0 ml-0 flex items-center justify-center text-9xl">
                <div className="board grid grid-cols-3 min-h-80 min-w-80">
                    <div className="border-b border-r"> </div>
                    <div className="border-b"> </div>
                    <div className="border-b border-l"> </div>
                    <div className="border-b border-r"> </div>
                    <div className="border-b border-r"> </div>
                    <div className="border-b "> </div>
                    <div className="border-r"> </div>
                    <div className="border-r"> </div>
                    <div className=""> </div>
                </div>
            </div>
        <div className="bg-slate-800 text-slate-100 font-sans flex-grow w-1/6 m-5 p-5 h-5/6">
                 Lobby
        </div>
    </div>
  );
}
