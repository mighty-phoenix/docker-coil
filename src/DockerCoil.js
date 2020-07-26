import Docker from 'dockerode';

// import Coil from './Coil';

class DockerCoil {
    DockerRemote = null;
    CoilList = null;
    length = null;

    constructor() {
        this.DockerRemote = new Docker({ socketPath: '/var/run/docker.sock' });
        this.CoilList = {};
        this.length = Object.keys(this.CoilList);

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
            (err)=> {
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
}

export default DockerCoil;