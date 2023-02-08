import buildClient from '../api/build-client';

import RoomList from '../components/rooms/roomList';
import BuildingList from '../components/buildings/buildingList';

const LandingPage =  ({ data/*, buildings */}) => {
    const buildings = (currentUser) => {
        if (!currentUser.buildings) {
            return 0;
        }
        else {
            return currentUser.buildings.length;
        }
    }
    return (
        data.currentUser ? <div>You have {buildings(data.currentUser)}</div> : <h1>You are signed out</h1>
    )
};

LandingPage.getInitialProps = async (context) => {
    
    const client = buildClient(context);
    const { data } = await client.get('/api/users/currentuser');
    //const rooms = await client.get('/api/buildings/:id');
    console.log(data.currentUser);
    return {data, /*rooms: rooms.data*/};
}

export default LandingPage;