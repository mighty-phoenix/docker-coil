import kafkaPkgs from 'kafka-node';

const { KafkaClient: Client, Producer, Consumer } = kafkaPkgs;

class DockerMessenger {
    client = null;
    producer = null;
    consumer = null;

    constructor({ kafkaBroker }) {
        this.client = new Client({ kafkaBroker });
        this.producer = new Producer(this.client);

        this.consumer = new Consumer(
            this.client,
            [
                {
                    topic: "LUTRA_BACKEND",
                    partitions: 0
                }
            ]
        );
    }

    publish = ({ id, data, args }) => {
        if(data.command.trim() === "balance") {
            if(args !== undefined) {
                if(args.option === undefined)
                    throw "Invalid argument list!\nNo option found.";

                var option = args.option.trim();
                
                if(option === "limit") {
                    if(Object.values(args).length !== 1) {
                        if(args.exchange === undefined ) {
                            throw "exchange is not defined in the argument list.\nKindly define the exchange in the argument list and retry.";
                        }

                        if(args.asset === undefined ) {
                            throw "asset is not defined in the argument list.\nKindly define the asset in the argument list and retry.";
                        }

                        if(args.amount === undefined ) {
                            throw "amount is not defined in the argument list.\nKindly define the amount in the argument list and retry.";
                        }

                        data.command = `${data.command} ${args.option} ${args.exchange} ${args.asset} ${args.amount}`;
                    } else {
                        data.command = `${data.command} ${args.option}`;
                    }    
                }

                if(option === "paper") {
                    if(Object.values(args).length !== 1) {
                        if(args.asset === undefined ) {
                            throw "asset is not defined in the argument list.\nKindly define the asset in the argument list and retry.";
                        }

                        if(args.amount === undefined ) {
                            throw "amount is not defined in the argument list.\nKindly define the amount in the argument list and retry.";
                        }

                        data.command = `${data.command} ${args.option} ${args.asset} ${args.amount}`;
                    } else {
                        data.command = `${data.command} ${args.option}`;
                    }
                }
            }
        }
        else if(data.command.trim() === "import") {
            if(args !== undefined && Object.keys(args).length === 0) {
                throw "Invalid argument list!\nNo argument list found.";   
            } else {
                var args_string = JSON.stringify(args);
                if(args !== undefined)
                    data.command = `${data.command} ${args_string}`;
            }
        }

        const serializedData = JSON.stringify({
            id,
            data
        });

        this.producer.on(
            'ready',
            () => {
                console.log("Sending Payload!");
                console.log(serializedData);

                const payload = [
                    { topic: "HBOT", messages: serializedData }
                ];

                this.producer.send(
                    payload,
                    (err, result) => {
                        console.log(err || result);
                    }
                );
            }
        );
    }

    onRecieve = (cb) => {
        this.consumer.on(
            "message",
            cb
        )
    }
}

export default DockerMessenger;