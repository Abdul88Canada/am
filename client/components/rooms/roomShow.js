import  Router from 'next/router';

const RoomShow = ({ room }) => {
    const onClick = () => {
        Router.push(`/rooms/${room._id}`);
    }
    return (
        <div>
            <div className="card" onClick={onClick}>
                <div className="card-body">
                    <h5 className="card-title">Room Number: {room.roomNumber}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">Room State: {room.roomState}</h6>
                </div>
            </div>
        </div>
    );
}

export default RoomShow;