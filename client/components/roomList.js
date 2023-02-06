import RoomShow from "././roomShow"

const RoomList = ({ rooms }) => {
    const renderedRooms = rooms.map((room) => {
        return <RoomShow key={room.id} room={room} />
    })

    return (
        <div>{renderedRooms}</div>
    );
}

export default RoomList;