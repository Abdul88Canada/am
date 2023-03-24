import { useState } from "react"

import UnitList from '../components/units/unitList';

const LandingPage =  ({ campaigns, currentUser }) => {   

    const [index, setIndex] = useState(0);

    return (
        currentUser ? (
            <div>
                Welcome, {currentUser.userName}!
                <div>
                    <div className="input-group mb-3">  
                    </div>
                </div>
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
    const { data } = await client.get('/api/campaigns'); 
    return {campaigns: data};
   }
}

export default LandingPage;