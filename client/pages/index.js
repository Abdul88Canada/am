import BuildingList from '../components/buildings/buildingList';

const LandingPage =  ({ buildings, currentUser }) => {   
    return (
        currentUser ? (
            <div>
                Welcome, {currentUser.userName}!
                <div>
                    <BuildingList buildings={buildings}/>
                </div>
            </div>) 
            : <h1>You are signed out</h1>
    )
};

LandingPage.getInitialProps = async (context, client, currentUser) => {
   if(!currentUser) {
    return {}
   } 
   else {
    const { data } = await client.get('/api/buildings');
    return {buildings: data};
   }
}

export default LandingPage;