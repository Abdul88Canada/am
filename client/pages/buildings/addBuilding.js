import { useState } from "react"
import  Router from 'next/router';

import buildClient from "../../api/build-client";
import useRequest from "../../hooks/use-request";

const AddBuilding = ({data}) => {
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const user_id = data.currentUser.id
    // a hook to handle the request and if any errors happen
    const { doRequest, errors } = useRequest({
        url: '/api/buildings/addbuilding',
        method: 'post',
        body: {
            name, location, user_id
        },
        onSuccess: () => Router.push('/')
        
    });

    const onSubmit = async (event) => {
        event.preventDefault();
        doRequest();
    }

    return (
        <form onSubmit={onSubmit}>
            <h1>Add Building</h1>
            <div className="form-group">
                <label>Building Name</label>
                <input value={name} onChange={e => setName(e.target.value)} className="form-control"/>
            </div>
            <div className="form-group">
                <label>Building Location</label>
                <input value={location} onChange={e => setLocation(e.target.value)} className="form-control"/>
            </div>
            {errors}
            <button className="btn btn-primary">Add</button>
        </form>
    );
}

AddBuilding.getInitialProps = async (context) => {
    
    const client = buildClient(context);
    const { data } = await client.get('/api/users/currentuser');
    console.log(data.currentUser);
    return {data};
}

export default AddBuilding;