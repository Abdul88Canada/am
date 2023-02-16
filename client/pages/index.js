import { useState } from "react"

import RoomList from '../components/rooms/roomList';

const LandingPage =  ({ buildings, currentUser }) => {   

    const [index, setIndex] = useState(0);

    return (
        currentUser ? (
            <div>
                Welcome, {currentUser.userName}!
                <div>
                    <div className="field">  
                        <select className="ui dropdown" onChange= {e => {
                            setIndex(e.target.options.selectedIndex);
                            }} >
                            {buildings.map((building) => {
                                return <option name="building" value={building.id} key={building.id}>{building.name}</option>
                            })}
                        </select>
                    </div>
                </div>
                <RoomList rooms = {buildings[index]?.rooms}/>
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
    const { data } = await client.get('/api/rooms/buildings');
    return {buildings: data};
   }
}

export default LandingPage;