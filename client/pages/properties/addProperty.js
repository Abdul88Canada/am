import { useState } from "react"
import  Router from 'next/router';

import useRequest from "../../hooks/use-request";
import PropertyList from '../../components/properties/propertyList';
import SettingsHeader from "../settings/settingsHeader";

const AddProperty = ({currentUser, properties}) => {
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const user_id = currentUser.id;

    // a hook to handle the request and if any errors happen
    const { doRequest, errors } = useRequest({
        url: '/api/properties',
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
                <SettingsHeader currentUser={currentUser}/>
                <form onSubmit={onSubmit}>
                    <h1>Add Property</h1>
                    <div className="form-group">
                        <label>Property Name</label>
                        <input value={name} onChange={e => setName(e.target.value)} className="form-control"/>
                        </div>
                    <div className="form-group">
                        <label>Property Location</label>
                        <input value={location} onChange={e => setLocation(e.target.value)} className="form-control"/>
                    </div>
                    {errors}
                    <button className="btn btn-primary">Add</button>
             </form>
             <PropertyList properties={properties} />
        </div>
    );
}

AddProperty.getInitialProps = async (context, client, currentUser) => {
    if(!currentUser) {
     return {}
    } 
    else {
        const user_id = currentUser.id;
     const { data } = await client.get('/api/properties/');
     
     return {properties: data};
    }
 }

export default AddProperty;