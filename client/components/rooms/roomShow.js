const RoomShow = ({ room }) => {
    console.log("The room is: ", room)
    return (
        <div>
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Room Number: {room.roomNumber}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">Room State: {room.roomState}</h6>
                </div>
            </div>
        </div>
    );
}

export default RoomShow;