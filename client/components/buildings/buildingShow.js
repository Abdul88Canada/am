import  Router from 'next/router';

const BuildingShow = ({ building }) => {
    const onClick = () => {
        Router.push(`/buildings/${building.id}`);
    }
    return (
        <div>
            <div className="card" onClick={onClick}>
                <div className="card-body">
                    <h5 className="card-title">Building Name: {building?.name}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">Building Location: {building?.location}</h6>
                </div>
            </div>
        </div>
    );
}

export default BuildingShow;