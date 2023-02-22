import { useState } from "react"
import  Router from 'next/router';

import useRequest from "../../hooks/use-request";
import BuildingList from '../../components/buildings/buildingList';

const AddBuilding = ({currentUser, buildings}) => {
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const user_id = currentUser.id;

    // a hook to handle the request and if any errors happen
    const { doRequest, errors } = useRequest({
        url: '/api/buildings',
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
        <div>
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
             <BuildingList buildings={buildings} />
        </div>
    );
}

AddBuilding.getInitialProps = async (context, client, currentUser) => {
    if(!currentUser) {
     return {}
    } 
    else {
        const user_id = currentUser.id;
     const { data } = await client.get('/api/buildings/');
     
     return {buildings: data};
    }
 }

export default AddBuilding;