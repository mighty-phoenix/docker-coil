import { DockerCoil } from '../index.js';

const dockerCoil = new DockerCoil({
    kafkaBroker: 'localhost:9092'
});

/*
// TEST 2: Check if recieve is working
dockerCoil.onRecieve((message) => {
    console.log(message);
});


// TEST 1: Check if docker starts on demand
dockerCoil.start().then(
    id => {
        console.log(`Started: ${id}`);

        console.log(
            dockerCoil.CoilList
        );

        // TEST 3: CHECK if docker recieves messages
       dockerCoil.send({
           id, 
           data:{
               command:"balance",
               config: {
                   msg: "Some Random keys"
               }
           },
           args:{
               option: "paper"        
           } 
       });

        // TEST 4. CHECK if docker stops
        dockerCoil.stop({id})
    }
);
*/



/*
// Various tests for the balance command.

// TEST A: Simply ask for the balance of all exchanges.
dockerCoil.send({
    id: "apha1", 
    data:{
        command:"balance",
        config: {
            msg: "Some Random keys!"
        }
    }
});

// TEST B: Ask for the balance limits of exchanges.
dockerCoil.send({
    id: "apha1", 
    data:{
        command:"balance",
        config: {
            msg: "Some Random keys!"
        }
    },
    args:{
        option: "limit"
    }
});

// TEST C: Ask to change the balance limit.
dockerCoil.send({
    id: "apha1", 
    data:{
        command:"balance",
        config: {
            msg: "Some Random keys!"
        }
    },
    args:{
        option: "limit",
        exchange: "binance",
        asset: "BTC",
        amount: 3.001
    }
});

// TEST D: Ask for the Paper Account Balances.
dockerCoil.send({
    id: "apha1", 
    data:{
        command:"balance",
        config: {
            msg: "Some Random keys!"
        }
    },
    args:{
        option: "paper"
    }
});

// TEST E: Ask to change Paper Balance of an asset.
dockerCoil.send({
    id: "apha1", 
    data:{
        command:"balance",
        config: {
            msg: "Some Random keys!"
        }
    },
    args:{
        option: "paper",
        asset: "BTC",
        amount: 0.43241
    }
});

*/

dockerCoil.send({
    id: "apha1", 
    data:{
        command:"balance",
        config: {
            msg: "Some Random keys"
        }
    }
});
