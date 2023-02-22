import useRequest from "../../hooks/use-request";
import  Router from 'next/router';

const PropertyDetails = ({property, currentUser}) => {
    const propertyid = property.id;

    const { doRequest, errors } = useRequest({
        url: `/api/properties/${propertyid}`,
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
            <h1>Property Details</h1>
            <h2>Property Name: {property.name}</h2>
            <h3>Property Location: {property.location}</h3>
            <button type="button" className="btn btn-danger" onClick={onClick}>Delete</button>
            {errors}
        </div>
    );
}

PropertyDetails.getInitialProps = async (context, client, currentUser) => {
    const { propertyid } = context.query;
    console.log(propertyid);
    if(!currentUser) {
     return {}
    } 
    else {
     const { data } = await client.get(`/api/properties/${propertyid}`);
     return {property: data};
    }
 }

export default PropertyDetails;