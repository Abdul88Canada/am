import useRequest from "../../hooks/use-request";
import  Router from 'next/router';

const UnitDetails = ({unit, currentUser}) => {
    const unitid = unit.id;
    const { doRequest, errors } = useRequest({
        url: `/api/units/${unitid}`,
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
            <h1>Unit Details</h1>
            <h2>Unit Number: {unit.unitNumber}</h2>
            <h3>Unit State: {unit.unitState}</h3>
            <button type="button" className="btn btn-danger" onClick={onClick}>Delete</button>
            {errors}
        </div>
    );
}

UnitDetails.getInitialProps = async (context, client, currentUser) => {
    const { unitid } = context.query;
    if(!currentUser) {
     return {}
    } 
    else {
     const { data } = await client.get(`/api/units/${unitid}`);
     return {unit: data};
    }
 }

export default UnitDetails;