import {DockerCoil} from '../index.js';

const dockerCoil = new DockerCoil();

dockerCoil.start().then(
    id => {
        console.log(id);
    }
);