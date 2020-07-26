const Docker = require('dockerode');

import Coil from './Coil';

class DockerCoil{
    DockerRemote = null;
    CoilList = null;
    length = null;

    constructor(){
        this.DockerRemote = new Docker({socketPath: '/var/run/docker.sock'});
        this.CoilList = {};
        this.length = Object.keys(this.d_list);

        // setup kafka consumer
    }

    addToCoilList = ({id,coil}) => {
        this.CoilList = {
            ...this.CoilList,
            [id]: coil
        }
        this.length = Object.keys(this.CoilList);
    }

    removeFromCoilList = ({id}) => {
        delete this.CoilList[id];
        this.length = Object.keys(this.CoilList);
    }

    start = () => {
        // Start container returns promise that gives id
        // append key to d_list
        // check if key exists
        const coilObj = new Coil();

        this.addToCoilList(coilObj);
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