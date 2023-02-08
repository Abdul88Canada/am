import { useState } from "react"
import  Router from 'next/router';

import useRequest from "../../hooks/use-request";

export default () => {
    const [buildingName, setBuildingName] = useState('');
    const [buildingLocation, setBuildingLocation] = useState('');

    // a hook to handle the request and if any errors happen
    const { doRequest, errors } = useRequest({
        url: '/api/buildings/addbuilding',
        method: 'post',
        body: {
            buildingName, buildingLocation
        },
        onSuccess: () => Router.push('/')
        
    });

    const onSubmit = async (event) => {
        event.preventDefault();
        //doRequest();
    }

    return (
        <form onSubmit={onSubmit}>
            <h1>Add Building</h1>
            <div className="form-group">
                <label>Building Name</label>
                <input value={buildingName} onChange={e => setBuildingName(e.target.value)} className="form-control"/>
            </div>
            <div className="form-group">
                <label>Building Location</label>
                <input value={buildingLocation} onChange={e => setBuildingLocation(e.target.value)} className="form-control"/>
            </div>
            {errors}
            <button className="btn btn-primary">Add</button>
        </form>
    );
}