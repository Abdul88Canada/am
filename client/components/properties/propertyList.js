import PropertyShow from "./propertyShow"

const PropertyList = ({ properties }) => {
    const renderedProperties = properties?.map((property) => {
        return <PropertyShow key={property?.id} property={property} />
    })

    return (
        <div>{renderedProperties}</div>
    );
}

export default PropertyList;