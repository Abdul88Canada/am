import BuildingShow from "./buildingShow"

const BuildingList = ({ buildings }) => {
    const renderedBuildings = buildings.map((building) => {
        return <BuildingShow key={building.id} building={building} />
    })

    return (
        <div>{renderedBuildings}</div>
    );
}

export default BuildingList;