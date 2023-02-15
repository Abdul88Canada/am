const BuildingDetails = ({building}) => {
    return (
        <div>
            <h1>Building Details</h1>
            <h2>Building Name: {building.name}</h2>
            <h3>Building Location: {building.location}</h3>
        </div>
    );
}

BuildingDetails.getInitialProps = async (context, client, currentUser) => {
    const { buildingid } = context.query;
    console.log(buildingid);
    if(!currentUser) {
     return {}
    } 
    else {
     const { data } = await client.get(`/api/buildings/${buildingid}`);
     return {building: data};
    }
 }

export default BuildingDetails;