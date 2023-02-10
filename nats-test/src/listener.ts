import { randomBytes } from 'crypto';

import { BuildingCreatedListener } from './events/buidling-created-listener';

console.clear();

const stan = nats.connect('amp', randomBytes(4).toString('hex'), {
    url: 'http://localhost:4222'
});

stan.on('connect', () => {
    console.log('Listener connected to NATs');

    stan.on('close', () => {
        console.log('NATs connection closed!');
        process.exit();
    });
    
    new BuildingCreatedListener(stan).listen();
});

process.on('SIGINT', () => stan.close());
process.on('SIGTERM', () => stan.close());




