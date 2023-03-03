import  Router from 'next/router';

const UnitShow = ({ unit }) => {
    const onClick = () => {
        Router.push(`/units/${unit._id}`);
    }
    return (
        <div>
            <div className="card" onClick={onClick} style={{width: "18rem"}}>
                <div className="card-body">
                    <h5 className="card-title">Unit Number: {unit.unitNumber}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">Unit State: {unit.unitState}</h6>
                </div>
            </div>
        </div>
    );
}

export default UnitShow;