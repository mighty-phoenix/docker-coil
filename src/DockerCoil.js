import Docker from 'dockerode';
import kafkaPkgs from 'kafka-node';
const { KafkaClient: Client, Producer, Consumer } = kafkaPkgs;

const kafkaBroker = 'localhost:9092';

class KafkaWrapper {
    client = null;
    producer = null;

    constructor() {
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

        // this.client.createTopics(
        //     [
        //         {
        //             topic: 'HBOT',
        //             partitions: 0
        //         },
        //         (err, res) => {
        //             console.log(err || res);
        //         }
        //     ]
        // );
    }

    publish = (data) => {
        const serializedData = JSON.stringify(data);

        this.producer.on(
            'ready',
            () => {
                console.log(`HBOT - ${serializedData}`);
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

class DockerCoil {
    DockerRemote = null;
    CoilList = null;
    length = null;
    messenger = null;

    constructor() {
        this.DockerRemote = new Docker({ socketPath: '/var/run/docker.sock' });
        this.CoilList = {};
        this.length = Object.keys(this.CoilList);

        this.messenger = new KafkaWrapper();
    }

    _addToCoilList = (container) => {
        this.CoilList = {
            ...this.CoilList,
            [container.id]: container
        }
        this.length = Object.keys(this.CoilList);
    }

    _removeFromCoilList = (id) => {
        delete this.CoilList[id];
        this.length = Object.keys(this.CoilList);
    }

    start = () => {
        return this.DockerRemote.createContainer(
            {
                Image: 'hello-world',
                AttachStdin: false,
                AttachStdout: true,
                AttachStderr: true,
            }
        ).then(
            (container) => {
                container.start();
                this._addToCoilList(container);
                return container.id;
            }
        ).catch(
            (err) => {
                console.log(err);
            }
        )
    }

    stop = () => {
        // stop container
        // remove key from d_list
        // check if key exists
    }

    getInstance = (id) => {
        return this.CoilList[id];
    }

    purgeIdle = (idList) => {
        // delete all coils whos id don't exist
        // in idList
    }

    send = ({ id, data }) => {
        // if (id in this.CoilList) {
        //     this.messenger.publish(
        //         {
        //             id: 'abc',
        //             command: "START_TRADE",
        //             config: {
        //                 key_1: "exchange1",
        //                 key_2: "exchange2"
        //             }
        //         }
        //     );
        // }
        // else {
        //     console.log(`${id} absent in list of containers`);
        // }
        this.messenger.publish(
            {
                id: 'abc',
                command: "START_TRADE",
                config: {
                    key_1: "exchange1",
                    key_2: "exchange2"
                }
            }
        );
    }

    onRecieve = (cb) => {
        this.messenger.onRecieve(cb);
    }
}

export default DockerCoil;