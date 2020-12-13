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


<<<<<<< HEAD
    constructor({ kafkaBroker, updateBalance, getUserByContainerId, updateExchanges }) {
=======
    constructor({ kafkaBroker, updateBalance, getUserByContainerId }) {
>>>>>>> 3ef649426ec5c56fc070c75055761949ebdd79b5
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
<<<<<<< HEAD
            switch (listenerDict.type) {
                case 'BALANCE':
                    const containerIdBalance = await getUserByContainerId(listenerDict.containerId);
                    updateBalance(containerIdBalance, JSON.stringify(listenerDict.balance));
                    break;
                case 'CONNECT':
                    const containerIdConnect = await getUserByContainerId(listenerDict.containerId);
                    updateExchanges(containerIdConnect, JSON.stringify(listenerDict.exchanges));
                    break;
=======
            switch(listenerDict.type) {
                case 'BALANCE':
                    const containerId = await getUserByContainerId(listenerDict.containerId);
                    updateBalance(containerId, JSON.stringify(listenerDict.balance));
>>>>>>> 3ef649426ec5c56fc070c75055761949ebdd79b5
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

    start = (apiDetails) => {
        if (apiDetails)
            return this.DockerRemote.createContainer(
                {
                    Image: 'hummingbot:latest',
                    Env: [
                        'PLATFORM=CONTAINER',
                        'PAPER_TRADE=True',
                        'hummingbot_keys=' + apiDetails
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
        else
            return this.DockerRemote.createContainer(
                {
                    Image: 'hummingbot:latest',
                    Env: [
                        'PLATFORM=CONTAINER',
                        'PAPER_TRADE=True',
                        'hummingbot_keys={}'
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

    execute = async ({ id, command, apiDetails }) => {
        if (id === undefined || id === null || id.trim() === "" || !(id in this.CoilList)) {
            id = await this.start(apiDetails);
            this.msgQueue.push({ 'id': id, 'command': command });
            return id;
        } else if (id in this.CoilList) {
<<<<<<< HEAD
            if (this.msgQueue.length !== 0) {
=======
            if(this.msgQueue.length !== 0) {
>>>>>>> 3ef649426ec5c56fc070c75055761949ebdd79b5
                this.msgQueue.push({ 'id': id, 'command': command });
            } else {
                this.send({ 'id': id, 'data': { 'command': command } });
            }
            return "Already exists.";
        }
<<<<<<< HEAD

=======

>>>>>>> 3ef649426ec5c56fc070c75055761949ebdd79b5
    }
}

module.exports = DockerCoil;
