import {type DataConnection, Peer} from "peerjs";

console.log("P2P-TS Test :)");

let peer = new Peer();
let activeConn:DataConnection|null = null;

peer.on("open", function (id) {
    console.log(`My Peer id is: ${id}`);
})

peer.on("connection", (conn) => {
    console.log("incoming connection from:", conn.peer);
    setupConn(conn);
});

function setupConn(conn: DataConnection) {
    activeConn = conn;

    conn.on("open", ()=>{
        console.log("connection is ready!");

        conn.on("data",(data)=>{
            console.log(`received data: ${data}`);
        })
    })

    conn.on("close", ()=>{
        console.log("connection is closed!");
        activeConn = null;
    })
}

function connect() {
    const input:string|null = prompt("enter id");
    if(!input){
        return;
    }

    console.log("building connection...");
    const conn = peer.connect(input);
    setupConn(conn);
}

function sendMessage(){
    if(!activeConn|| !activeConn.open){
        console.log("no available connection");
        return;
    }

    const msg:string|null = prompt("message...");
    if(msg)
    {
        activeConn.send(msg);
        console.log(`send message: ${msg}`);
    }
}

// @ts-ignore
document.getElementById("messageBtn").addEventListener("click", sendMessage);
// @ts-ignore
document.getElementById("connectionBtn").addEventListener("click", connect);