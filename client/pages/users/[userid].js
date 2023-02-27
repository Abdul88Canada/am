import  Router from 'next/router';
import { useState } from "react"

import useRequest from "../../hooks/use-request";

const UserDetails = ({currentUser, user, properties}) => {
    const [selectedProperties, setSelectedProperties] = useState(user?.linked_properties);
    const userid = user?.user_id;
    
    const { doRequest, errors } = useRequest({
        url: `/api/users/${userid}`,
        method: 'put',
        body: {
            user: user
        },
        onSuccess: () => Router.push('/')
    });


    const onClick = () => {
        user?.linked_properties.splice(0, user.linked_properties.length, ...selectedProperties);
        doRequest();
    }

    const onChange = (e) => {
        if (e.target.checked) {
            if(selectedProperties.length == 0) {
                setSelectedProperties([e.target.value]);
            }
            else {
                const updatedSelectedProperties = [...selectedProperties, e.target.value];
                setSelectedProperties(updatedSelectedProperties);
            }
            console.log(selectedProperties);
        }
        else {
            //setSelectedProperties()
        }
    }

    const propList = properties?.map((property) => {
        return (
            <div className="form-check" key={property.id}>
                <input className="form-check-input" type="checkbox" checked= {selectedProperties?.includes(property.id) ? 'true' : ''} value={property.id} onChange={e => onChange(e)}/>
                <label className="form-check-label"/>
                    {property.name}
            </div>
        );
    });

    return (
        <div>
            <h2>User ID: {user.userName}</h2>
            <h3>User Type: {user.user_type}</h3>
            {propList}
            <button type="button" className="btn btn-danger" onClick={onClick}>Save</button>
        </div>
    );
}

UserDetails.getInitialProps = async (context, client, currentUser) => {
    const { userid } = context.query;
    if(!currentUser) {
     return {}
    } 
    else {
     const { data } = await client.get(`/api/users/${userid}`);
     const prop = await client.get('/api/properties/');
    
     return {user: data, properties: prop.data};
    }
 }

export default UserDetails;