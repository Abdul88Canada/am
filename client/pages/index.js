import buildClient from '../api/build-client';


const LandingPage =  ({ data}) => {
    return (
        data.currentUser ? <div>Welcome!</div> : <h1>You are signed out</h1>
    )
};

LandingPage.getInitialProps = async (context) => {
    
    const client = buildClient(context);
    const { data } = await client.get('/api/users/currentuser');
     console.log(data.currentUser);
    return {data};
}

export default LandingPage;