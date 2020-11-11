const Docker = require('dockerode');

const DockerMessenger = require('./DockerMessenger.js');

class DockerCoil {
    DockerRemote = null;
    CoilList = null;
    length = null;
    messenger = null;
    msgQueue = null;
    globalListener = null;
    dequeueMsgQueue = null;


    constructor({ kafkaBroker }) {
        this.DockerRemote = new Docker({ socketPath: '/var/run/docker.sock' });
        this.CoilList = {};
        this.length = Object.keys(this.CoilList);
        this.messenger = new DockerMessenger({
            kafkaBroker
        });
        this.msgQueue = [];
        this.globalListener = [];
        this.dequeueMsgQueue = (id) => {
            for (let i = 0; i < this.msgQueue.length; i++) {
                if (this.msgQueue[i].id === id) {
                    this.send({ id: this.msgQueue[i].id, data: { command: this.msgQueue[i].command } });
                    console.log("Sent command!");
                    this.msgQueue.splice(i, 1);
                    i--;
                }
            }
        };
        this.globalListener.push = async (listenerDict) => {
            await Array.prototype.push.apply(this.globalListener, listenerDict);
            if (listenerDict.type === "READY") {
                this.dequeueMsgQueue(listenerDict.containerId);
            }
        };
        this.messenger.onRecieve((message) => {
            this.globalListener.push(JSON.parse(message.value));
            console.log(message.value);
        });
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
                Image: 'hummingbot:latest',
                Env: [
                    'PLATFORM=CONTAINER'
                ],
                AttachStdin: false,
                AttachStdout: true,
                AttachStderr: true,
                HostConfig: {
                    NetworkMode: "host"
                }
            }
        )
            .then(
                container => {
                    container.start();
                    this._addToCoilList(container);
                    return container.id;
                }
            )
            .catch(
                err => {
                    console.log(err);
                }
            );
    }

    stop = ({ id }) => {
        console.log(`${id} Request for stopping!`);

        if (id in this.CoilList) {
            return this.CoilList[id].stop()
                .then(
                    container => {
                        return container.remove();
                    }
                )
                .then(
                    () => {
                        console.log(`${id} removed successfully`);
                    }
                )
                .catch(
                    err => {
                        console.log(err);
                    }
                );
        }
        else {
            console.log(`${id} not created!`);
        }
    }

    getInstance = (id) => {
        return this.CoilList[id];
    }

    purgeIdle = (idList) => {
        // delete all coils whos id don't exist
        // in idList
    }

    send = ({ id, data, args }) => {
        console.log(`{Send request for ${id}}`);
        if (id in this.CoilList || id === "apha1") {
            console.log("SENDING!!!");
            console.log(data);
            this.messenger.publish(
                {
                    id,
                    data,
                    args
                }
            );
        }
        else {
            console.log(`${id} not created!`);
        }
    }

    execute = async ({ id, command }) => {
        if (id === undefined || id === null || id.trim() === "" || !(id in this.CoilList)) {
            id = await this.start();
            this.msgQueue.push({ 'id': id, 'command': command });
        } else if (id in this.CoilList) {
            this.send({ 'id': id, 'data': { 'command': command } });
        }
        return id;
    }
}

module.exports = DockerCoil;
