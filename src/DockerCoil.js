import Docker from 'dockerode';

import DockerMessenger from './DockerMessenger.js';

class DockerCoil {
    DockerRemote = null;
    CoilList = null;
    length = null;
    messenger = null;

    constructor({ kafkaBroker }) {
        this.DockerRemote = new Docker({ socketPath: '/var/run/docker.sock' });
        this.CoilList = {};
        this.length = Object.keys(this.CoilList);

        this.messenger = new DockerMessenger({
            kafkaBroker
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
                Image: 'hbot',
                AttachStdin: false,
                AttachStdout: false,
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
        if (true || id in this.CoilList) {
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

    onRecieve = (cb) => {
        this.messenger.onRecieve(cb);
    }
}

export default DockerCoil;