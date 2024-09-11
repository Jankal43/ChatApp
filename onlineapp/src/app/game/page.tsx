"use client"
import {useEffect, useState} from 'react';
import socket from "@/socket";

export default function Page() {
    const [board, setBoard] = useState([]);
    const [yourTurn, setYourTurn] = useState(false);
    const [players, setPlayers] = useState([]);
    const [currentPlayer, setCurrentPlayer] = useState(null);
    const [gameStatus, setGameStatus] = useState("Oczekiwanie na graczy");


    const username = document.getElementById('username')?.textContent;

    function handleClick(index) {
        if (yourTurn) {
            console.log("Wysłanie eventu player-click:", index);
            socket.emit('player-click', index);
        } else {
            console.log("To nie jest Twoja runda!");
        }
    }


    function joinGameHandle(){
        socket.emit('player-join', username);
    }

    function leaveGameHandle(){
        socket.emit('player-leave', username);
    }

    useEffect(() => {
        console.log("Username:", username);  // Sprawdź, czy `username` ma wartość
        socket.emit("game-load");

        socket.on("users-game-slots", (slots) => {
            console.log("Game slots", slots);
            setPlayers(slots);
        });
    }, [username]);


    useEffect(() => {
        socket.on("board-update", (updatedBoard) => {
            console.log("Aktualizacja planszy:", updatedBoard);
            setBoard(updatedBoard);
        });

        socket.on("round-update", (playerTurn) => {
            console.log("Ruch należy do gracza:", playerTurn);
            setCurrentPlayer(playerTurn);

            setYourTurn((playerTurn === 'X' && players[0] === username) ||
                (playerTurn === 'O' && players[1] === username));
        });

        socket.on("game-over", (message) => {
            console.log("Gra zakończona:", message);
            setGameStatus(message); // Ustaw wynik gry
        });
    }, [players, username]);



    return (
        <div className="gameContainer bg-gray-900 m-1 h-screen p-5">

            <div
                className="bg-slate-800 text-slate-100 h-5/6 w-5/6 p-5 m-5 pl-0 ml-0 flex flex-col items-center justify-center">
                <p className="gameInfo text-center m-5 text-2xl font-bold">
                    {gameStatus}
                </p>

                <div className="board grid grid-cols-3 min-h-40 min-w-40 gap-1">
                    {board.map((value, index) => (
                        <div
                            key={index}
                            className={`g${index} border ${index % 3 !== 2 && 'border-r'} ${index < 6 && 'border-b'} 
            h-24 w-24 flex items-center justify-center text-4xl`}
                            onClick={() => handleClick(index)}
                        >
                            {value || ""}
                        </div>
                    ))}
                </div>

            </div>

            <div
                className="bg-slate-800 text-slate-100 font-sans flex-grow w-1/6 m-5 p-5 h-5/6 flex flex-col items-center justify-center">
                <div className="p-1 m-1 border text-center mb-5">
                    <div className="player1 flex items-center justify-center">
                        {players[0] || "Gracz 1 (X)"}
                    </div>
                    <div className="player2 p-1 m-1 border-t-2 flex items-center justify-center">
                        {players[1] || "Gracz 2 (O)"}
                    </div>
                </div>

                {(players.includes(username)) ? (
                    <button className="p-1 border rounded-md text-center bg-red-700 font-bold"
                            onClick={leaveGameHandle}
                    >
                        Opuść Grę
                    </button>
                ) : (
                    <button className="p-1 border rounded-md text-center bg-green-700 font-bold"
                            onClick={joinGameHandle}
                    >
                        Dołącz do Gry
                    </button>
                )}
            </div>
        </div>
    );
}
