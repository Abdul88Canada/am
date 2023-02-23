import nats from 'node-nats-streaming';
import { PropertyCreatedPublisher } from './events/property-created-publisher';

console.clear();

const stan = nats.connect('amp', 'abc', {
    url: 'http://localhost:4222'
});
// when we conntect to nat on http://localhost:4222
// it emmits a connect event and we listen to it here
stan.on('connect', async () => {
    console.log('Publisher connected to NATs');
    const publisher = new PropertyCreatedPublisher(stan);

    try {
        await publisher.publish({
        id: "123"
        });
    } catch (err) {
        console.log(err);
    }
    

    /*const data = JSON.stringify({
        viewersId: '123',
        name: '7yat',
        location: "dammam"
    });

    stan.publish('property:created', data, () => {
        console.log('Event published');
    })*/
});