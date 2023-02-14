import RoomShow from "./roomShow"

const RoomList = ( {rooms} ) => {
    console.log("We HAve These Rooms: ", rooms)
    const renderedRooms = rooms?.map((room) => {
        return <RoomShow key={room.id} room={room} />
    })

    return (
        <div>{renderedRooms}</div>
    );
}

RoomList.getInitialProps = async (context, client, currentUser, rooms ) => {
    if(!currentUser) {
     return {}
    } 
    else {
     const { data } = await client.get('/api/rooms/', {
        rooms: rooms
     });
     return {rooms: data};
    }
 }

export default RoomList;