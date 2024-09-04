"use client"
import { useState } from 'react';

export default function Page() {
    const [board, setBoard] = useState(Array(9).fill(''));

    function changeSign(index) {
        const newBoard = [...board];
        newBoard[index] = newBoard[index] === '' ? 'X' : newBoard[index];
        setBoard(newBoard);
    }

    return (
        <div className="gameContainer bg-gray-900 m-1 h-screen p-5">
            <div className="bg-slate-800 text-slate-100 h-5/6 w-5/6 p-5 m-5 pl-0 ml-0 flex items-center justify-center">
                <div className="board grid grid-cols-3 min-h-40 min-w-40 gap-1">
                    {board.map((value, index) => (
                        <button
                            key={index}
                            className={`g${index} border ${index % 3 !== 2 && 'border-r'} ${index < 6 && 'border-b'} 
                            h-24 w-24 flex items-center justify-center text-4xl`}
                            onClick={() => changeSign(index)}
                        >
                            {value}
                        </button>
                    ))}
                </div>
            </div>
            <div className="bg-slate-800 text-slate-100 font-sans flex-grow w-1/6 m-5 p-5 h-5/6">
                Lobby
            </div>
        </div>
    );
}
