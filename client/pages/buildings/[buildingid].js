import useRequest from "../../hooks/use-request";
import  Router from 'next/router';

const BuildingDetails = ({building, currentUser}) => {
    const buildingid = building.id;

    const { doRequest, errors } = useRequest({
        url: `/api/buildings/${buildingid}`,
        method: 'delete',
        body: {
            user_id: currentUser
        },
        onSuccess: () => Router.push('/')
    });


    const onClick = () => {
        doRequest();
    }
    return (
        <div>
            <h1>Building Details</h1>
            <h2>Building Name: {building.name}</h2>
            <h3>Building Location: {building.location}</h3>
            <button type="button" className="btn btn-danger" onClick={onClick}>Delete</button>
            {errors}
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