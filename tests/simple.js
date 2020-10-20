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

/*
// Various tests for the import command.

// TEST A: Import strategy using args.
dockerCoil.send({
    id: "apha1", 
    data:{
        command:"import",
        config: {
            msg: "Some Random keys"
        }
    },
    args: {
        "template_version": 4,
        "strategy": "arbitrage",
        "primary_market": "binance",
        "secondary_market": "bittrex",
        "primary_market_trading_pair": "BTC-USDT",
        "secondary_market_trading_pair": "UBT-BTC",
        "min_profitability": 0.3,
        "secondary_to_primary_base_conversion_rate": 1.0,
        "secondary_to_primary_quote_conversion_rate": 1.0
    }
});

// TEST B: Check after performing TEST A if the given bot configuration is applied.
dockerCoil.send({
    id: "apha1", 
    data:{
        command:"config",
        config: {
            msg: "Some Random keys"
        }
    }
});

// TEST C: Import without any configuration and expect the message "No coniguration found! Please retry with a configuration."
dockerCoil.send({
    id: "apha1", 
    data:{
        command:"import  ",
        config: {
            msg: "Some Random keys"
        }
    }
});
*/

/*
// Various tests for the start command.

// TEST A: Set paper_trade config to True.
dockerCoil.send({
    id: "apha1", 
    data:{
        command:"paper_trade",
        config: {
            msg: "Some Random keys"
        }
    }
});

// TEST B: Import a trading strategy.
dockerCoil.send({
    id: "apha1", 
    data:{
        command:"import",
        config: {
            msg: "Some Random keys"
        }
    },
    args: {
        "template_version": 4,
        "strategy": "arbitrage",
        "primary_market": "binance",
        "secondary_market": "bittrex",
        "primary_market_trading_pair": "BTC-USDT",
        "secondary_market_trading_pair": "UBT-BTC",
        "min_profitability": 0.3,
        "secondary_to_primary_base_conversion_rate": 1.0,
        "secondary_to_primary_quote_conversion_rate": 1.0
    }
});

// TEST C: Check if paper_trade_enabled is set to True in config.
dockerCoil.send({
    id: "apha1", 
    data:{
        command:"config",
        config: {
            msg: "Some Random keys"
        }
    }
});

// TEST D: Start the bot.
dockerCoil.send({
    id: "apha1", 
    data:{
        command:"start",
        config: {
            msg: "Some Random keys"
        }
    }
});

// TEST E: Stop the bot.
dockerCoil.send({
    id: "apha1", 
    data:{
        command:"stop",
        config: {
            msg: "Some Random keys"
        }
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
