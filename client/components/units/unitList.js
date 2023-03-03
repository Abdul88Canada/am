import UnitShow from "./unitShow"

const UnitList = ( {units} ) => {
    const renderedUnits = units?.map((unit) => {
        return <UnitShow key={unit.id} unit={unit} />
    })

    return (
        <div className="card-group">
            {renderedUnits}
        </div>
    );
}

UnitList.getInitialProps = async (context, client, currentUser, units ) => {
    if(!currentUser) {
     return {}
    } 
    else {
     const { data } = await client.get('/api/units/', {
        units: units
     });
     return {units: data};
    }
 }

export default UnitList;