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

    publish = ({ id, data }) => {
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