import { useState } from "react"
import  Router from 'next/router';

import useRequest from "../../hooks/use-request";

const AddRoom =  ({buildings, currentUser}) => {
    
    const [roomNumber, setRoomNumber] = useState('');
    const [selectedBuilding, setSelectedBuilding] = useState( buildings.length > 0 ? buildings[0].id : {});
    const roomState = '0';

    // a hook to handle the request and if any errors happen
    const { doRequest, errors } = useRequest({
        url: '/api/rooms/addRoom',
        method: 'post',
        body: {
            roomNumber, selectedBuilding,
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
            <div>
                <div className="field">  
                    <select className="ui dropdown" onChange= {e => {setSelectedBuilding(e.target.value)}} >
                        {buildings.map((building) => {
                            return <option name="building" value={building.id} key={building.id}>{building.name}</option>
                        })}
                    </select>
                </div>
                <form onSubmit={onSubmit}>
                    <h1>Add room</h1>
                    <div className="form-group">
                        <label>Room Number</label>
                        <input value={roomNumber} onChange={e => setRoomNumber(e.target.value)} className="form-control"/>
                    </div>
                    {errors}
                    <button className="btn btn-primary">Add</button>
                </form>
            </div>
        )
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