import {Peer} from "peerjs";

console.log("P2P-TS Test :)");

let peer = new Peer();

peer.on("open", function (id) {
    console.log(`My Peer id is: ${id}`);
})

// @ts-ignore
document.getElementById("connectBtn").addEventListener("click", connect);
// @ts-ignore
document.getElementById("messageBtn").addEventListener("click", sendMessage);

let id:string = "";

function connect() {

    let input: string | null = prompt("connect to peer(id):");

    id = input == null ? "" : input;

    let conn = peer.connect(id);

    conn.on("open", function () {
        conn.on("data", (data) => {
            console.log(`received data: ${data}`);
        })

        conn.send(`Hello connection from ${id}`);
    })

}

function sendMessage() {
    let conn = peer.connect(id);

    conn.on("open", function () {
        conn.on("data", (data) => {
            console.log(`received data: ${data}`);
        })

        conn.send(`Hello connection from ${id}`);
    })
}