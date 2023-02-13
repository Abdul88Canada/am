import { useState } from "react"
import  Router from 'next/router';

import useRequest from "../../hooks/use-request";

const AddRoom =  ({buildings, currentUser}) => {
    console.log(buildings);
    const [roomNumber, setRoomNumber] = useState('');
    const roomState = '0';

    // a hook to handle the request and if any errors happen
    const { doRequest, errors } = useRequest({
        url: '/api/rooms/addRoom',
        method: 'post',
        body: {
            roomNumber, roomState
        },
        onSuccess: () => Router.push('/')
        
    })

    const onSubmit = async (event) => {
        event.preventDefault();
        doRequest();
    }

    return (
        buildings.length > 0 ?
        (
            <form onSubmit={onSubmit}>
                <h1>Add room</h1>
                <div className="form-group">
                    <label>Room Number</label>
                    <input value={roomNumber} onChange={e => setRoomNumber(e.target.value)} className="form-control"/>
                </div>
                {errors}
                <button className="btn btn-primary">Add</button>
            </form>)
        : <h1>You have no buildings. Please add one.</h1>
    );
}

AddRoom.getInitialProps = async (context, client, currentUser) => {
    if(!currentUser) {
        return {}
       } 
       else {
        const { data } = await client.get('/api/rooms/buildings');
        return {buildings: data};
       }
}

export default AddRoom;