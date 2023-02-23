import  Router from 'next/router';

const PropertyShow = ({ property }) => {
    const onClick = () => {
        Router.push(`/properties/${property.id}`);
    }
    return (
        <div>
            <div className="card" onClick={onClick}>
                <div className="card-body">
                    <h5 className="card-title">Property Name: {property?.name}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">Property Location: {property?.location}</h6>
                </div>
            </div>
        </div>
    );
}

export default PropertyShow;