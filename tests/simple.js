import { DockerCoil } from '../index.js';

const dockerCoil = new DockerCoil({
    kafkaBroker: 'localhost:9092'
});

// // TEST 2: Check if recieve is working
// dockerCoil.onRecieve((message) => {
//     console.log(message);
// });

// // TEST 1: Check if docker starts on demand
// dockerCoil.start().then(
//     id => {
//         console.log(`Started: ${id}`);

//         console.log(
//             dockerCoil.CoilList
//         );

//         // TEST 3: CHECK if docker recieves messages
//         dockerCoil.send({
//             id, 
//             data:{
//                 command:"START_TRADE",
//                 config: {
//                     msg: "Some Random keys"
//                 }
//             }
//         });

//         // TEST 4. CHECK if docker stops
//         dockerCoil.stop({id})
//     }
// );

dockerCoil.send({
    id: "apha1", 
    data:{
        command:"balance",
        config: {
            msg: "Some Random keys"
        }
    }
});
