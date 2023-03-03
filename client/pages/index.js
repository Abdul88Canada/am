import { useState } from "react"

import UnitList from '../components/units/unitList';

const LandingPage =  ({ properties, currentUser }) => {   

    const [index, setIndex] = useState(0);

    return (
        currentUser ? (
            <div>
                Welcome, {currentUser.userName}!
                <div>
                    <div className="input-group mb-3">  
                        <div class="input-group-prepend">
                            <label class="input-group-text" for="inputGroupSelect01">Property:</label>
                        </div>
                        <select className="custom-select" onChange= {e => {
                            setIndex(e.target.options.selectedIndex);
                            }} >
                            {properties.map((property) => {
                                return <option name="property" value={property.id} key={property.id}>{property.name}</option>
                            })}
                        </select>
                    </div>
                </div>
                <UnitList units = {properties[index]?.units}/>
            </div>
        ) 
            : <h1>You are signed out</h1>
    )
};

LandingPage.getInitialProps = async (context, client, currentUser) => {
   if(!currentUser) {
    return {}
   } 
   else {
    const { data } = await client.get('/api/units/properties');
    return {properties: data};
   }
}

export default LandingPage;