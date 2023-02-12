const LandingPage =  ({ buildings, currentUser }) => {   
    return (
        currentUser ? (
            <div>
                Welcome, {currentUser.userName}!
                <div>
                    You have {buildings.length} properties
                </div>
            </div>) 
            : <h1>You are signed out</h1>
    )
};

LandingPage.getInitialProps = async (context, client, currentUser) => {
    const { data } = await client.get('/api/buildings');
    return {buildings: data};
}

export default LandingPage;