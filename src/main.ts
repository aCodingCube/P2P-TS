import {Peer} from "peerjs";

console.log("P2P-TS Test :)");

let peer = new Peer();

peer.on("open", function (id) {
    console.log(`My Peer id is: ${id}`);
})

function message() {

    let input: string | null = prompt("id:");

    let id: string = input == null ? "" : input;

    let conn = peer.connect(id);

    conn.on("open", function () {
        conn.on("data", (data) => {
            console.log(`received data: ${data}`);
        })

        conn.send(`Hello from ${id}`);
    })

}
