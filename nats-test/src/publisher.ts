import nats from 'node-nats-streaming';
import { BuildingCreatedPublisher } from './events/building-created-publisher';

console.clear();

const stan = nats.connect('amp', 'abc', {
    url: 'http://localhost:4222'
});
// when we conntect to nat on http://localhost:4222
// it emmits a connect event and we listen to it here
stan.on('connect', () => {
    console.log('Publisher connected to NATs');

    const publisher = new BuildingCreatedPublisher(stan);
    publisher.publish({
        id: "123"
    });

    /*const data = JSON.stringify({
        viewersId: '123',
        name: '7yat',
        location: "dammam"
    });

    stan.publish('building:created', data, () => {
        console.log('Event published');
    })*/
});