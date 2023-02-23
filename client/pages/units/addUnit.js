import { useState } from "react"
import  Router from 'next/router';

import useRequest from "../../hooks/use-request";

const AddUnit =  ({properties, currentUser}) => {
    
    const [unitNumber, setUnitNumber] = useState('');
    const [selectedProperty, setSelectedProperty] = useState( properties.length > 0 ? properties[0].id : {});
    const unitState = '0';

    // a hook to handle the request and if any errors happen
    const { doRequest, errors } = useRequest({
        url: '/api/units/addUnit',
        method: 'post',
        body: {
            unitNumber, selectedProperty,
        },
        onSuccess: () => Router.push('/')
        
    })

    const onSubmit = async (event) => {
        event.preventDefault();
        doRequest();
    }

    return (
        properties.length > 0 ?
        (
            <div>
                <div className="field">  
                    <select className="ui dropdown" onChange= {e => {setSelectedProperty(e.target.value)}} >
                        {properties.map((property) => {
                            return <option name="property" value={property.id} key={property.id}>{property.name}</option>
                        })}
                    </select>
                </div>
                <form onSubmit={onSubmit}>
                    <h1>Add unit</h1>
                    <div className="form-group">
                        <label>Unit Number</label>
                        <input value={unitNumber} onChange={e => setUnitNumber(e.target.value)} className="form-control"/>
                    </div>
                    {errors}
                    <button className="btn btn-primary">Add</button>
                </form>
            </div>
        )
        : <h1>You have no properties. Please add one.</h1>
    );
}

AddUnit.getInitialProps = async (context, client, currentUser) => {
    if(!currentUser) {
        return {}
       } 
       else {
        const { data } = await client.get('/api/units/properties');
        return {properties: data};
       }
}

export default AddUnit;