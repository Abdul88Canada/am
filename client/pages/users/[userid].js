import { useState } from "react"

const UserDetails = ({currentUser, user, properties}) => {
    const [selectedProperties, setSelectedProperties] = useState([]);

    const onChange = (e) => {
        if (e.target.checked) {
            const updatedSelectedProperties = [...selectedProperties, e.target.value];
            setSelectedProperties(updatedSelectedProperties);
        }
        else {

        }
    }

    const propList = properties?.map((property) => {
        return (
            <div className="form-check" key={property.id}>
                <input className="form-check-input" type="checkbox" value={property.id} onChange={e => onChange(e)}/>
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