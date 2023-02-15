import  Router from 'next/router';

const RoomShow = ({ room }) => {
    console.log(room._id);
    const onClick = () => {
        Router.push(`/rooms/${room._id}`);
    }
    return (
        <div>
            <div class="card" onClick={onClick}>
                <div class="card-body">
                    <h5 class="card-title">Room Number: {room.roomNumber}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">Room State: {room.roomState}</h6>
                </div>
            </div>
        </div>
    );
}

export default RoomShow;