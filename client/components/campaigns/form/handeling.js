const Handeling = () => {
    return (
        <form>
        <h1>Shimpping And Handeling</h1>
        <div className="form-group">
            <label>Package Type</label>
            <input className="form-control"/>
            </div>
        <div className="form-group">
            <label>Is It Liquid?</label>
            <input className="form-control"/>
        </div>
        <div className="form-group">
            <label>Temperature</label>
            <input className="form-control"/>
        </div>
        <div className="form-group">
            <label>Does it require co_package?</label>
            <input className="form-control"/>
        </div>
        <div className="form-group">
            <label>co_packaging_needs</label>
            <input className="form-control"/>
        </div>
        <div className="form-group">
            <label>Samples per bundle</label>
            <input className="form-control"/>
        </div>
        <div className="form-group">
            <label>Does it require printing?</label>
            <input className="form-control"/>
        </div>
        <div className="form-group">
            <label>Printing need</label>
            <input className="form-control"/>
        </div>
 </form>
    );
}

export default Handeling;