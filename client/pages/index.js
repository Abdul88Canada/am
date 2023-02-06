import buildClient from '../api/build-client';

import RoomList from '../components/roomList';

const LandingPage =  ({ data, rooms }) => {
    return (
        data.currentUser ? <RoomList rooms={rooms}/> : <h1>You are signed out</h1>
    )
};

LandingPage.getInitialProps = async (context) => {
    const client = buildClient(context);
    const { data } = await client.get('/api/users/currentuser');
    const rooms = await client.get('/api/rooms/roomsList');

    return {data, rooms: rooms.data};
}

export default LandingPage;