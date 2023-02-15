const RoomDetails = ({room}) => {
    return (
        <div>
            <h1>Room Details</h1>
            <h2>Room Number: {room.roomNumber}</h2>
            <h3>Room State: {room.roomState}</h3>
        </div>
    );
}

RoomDetails.getInitialProps = async (context, client, currentUser) => {
    const { roomid } = context.query;
    if(!currentUser) {
     return {}
    } 
    else {
     const { data } = await client.get(`/api/rooms/${roomid}`);
     return {room: data};
    }
 }

export default RoomDetails;