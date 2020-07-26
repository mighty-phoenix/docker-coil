import Docker from 'dockerode';
import { KafkaClient as Client, Producer, ProduceRequest } from 'kafka-node';

const kafkaHost = 'localhost:9092';
const topic = "HBOT_COMMAND"

class KafkaWrapper {
    client = null;
    producer = null;

    constructor() {
        this.client = new Client({ kafkaHost });
        this.producer = new Producer(client);
    }

    publish = (data) => {
        this.producer.on(
            'ready',
            () => {
                client.refreshMetadata(
                    [topic],
                    (err) => {
                        if (err) {
                            throw err;
                        }

                        console.log(`Sending message to ${topic}: ${data}`);
                        producer.send(
                            [{ topic, data }],
                            (err, result) => {
                                console.log(err || result);
                            }
                        );
                    }
                );
            }
        );
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

        // setup kafka consumer
    }

    addToCoilList = (container) => {
        this.CoilList = {
            ...this.CoilList,
            [container.id]: container
        }
        this.length = Object.keys(this.CoilList);
    }

    removeFromCoilList = (id) => {
        delete this.CoilList[id];
        this.length = Object.keys(this.CoilList);
    }

    start = () => {
        // Start container returns promise that gives id
        // append key to d_list
        // check if key exists

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
                this.addToCoilList(container);
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

    getCoil = (id) => {
        return this.CoilList[id];
    }

    purge = (idList) => {
        // delete all coils whos id don't exist
        // in idList
    }

    sendMessage = ({id, data}) => {
        // Prepare a message

        this.messenger.publish(
            "Hello! Message from Kafka"
        )
    }
}

export default DockerCoil;