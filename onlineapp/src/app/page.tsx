"use client";
import React, {useLayoutEffect, useState} from "react";
import Chat from "./chat";

export default function Page() {

    // const [lastMessages, setLastMessages] = useState<string[]>([]);
    //
    //
    // useLayoutEffect(() => {console.log(lastMessages)})
    ;
    return (
        <div className="bg-gray-900 m-1 h-dvh">
            <Chat />
        </div>
    );
}
