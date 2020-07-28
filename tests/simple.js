import {DockerCoil} from '../index.js';

const dockerCoil = new DockerCoil();

// TEST 1: Check if docker starts on demand
// dockerCoil.start().then(
//     id => {
//         console.log(id);
//     }
// );

// TEST 2: Check if recieve is working
dockerCoil.onRecieve((message)=>{
    console.log(message);
});

// TEST 3: CHECK if docker recieves messages
dockerCoil.send("Hello");