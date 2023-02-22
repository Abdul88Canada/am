import useRequest from "../../hooks/use-request";
import  Router from 'next/router';

const RoomDetails = ({room, currentUser}) => {
    const roomid = room.id;
    const { doRequest, errors } = useRequest({
        url: `/api/rooms/${roomid}`,
        method: 'delete',
        body: {
            user_id: currentUser
        },
        onSuccess: () => Router.push('/')
    });


    const onClick = () => {
        doRequest();
    }
    return (
        <div>
            <h1>Room Details</h1>
            <h2>Room Number: {room.roomNumber}</h2>
            <h3>Room State: {room.roomState}</h3>
            <button type="button" className="btn btn-danger" onClick={onClick}>Delete</button>
            {errors}
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