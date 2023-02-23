import { randomBytes } from 'crypto';
import nats from 'node-nats-streaming';

import { PropertyCreatedListener } from './events/buidling-created-listener';

console.clear();

const stan = nats.connect('amp', randomBytes(4).toString('hex'), {
    url: 'http://localhost:4222'
});

stan.on('connect', () => {
    console.log('Listener connected to NATs');

    
    
    new PropertyCreatedListener(stan).listen();
});
