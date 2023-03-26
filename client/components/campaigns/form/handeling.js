const Handeling = ({formData, setFormData}) => {
    return (
        <form>
        <h1>Shimpping And Handeling</h1>
        <div className="form-group">
            <label>Package Type</label>
            <input className="form-control" value={formData.package_type} onChange={(e) => setFormData({...formData, package_type: e.target.value})}/>
            </div>
        <div className="form-group">
            <label>Is It Liquid?</label>
            <input className="form-control" value={formData.isLiquid} onChange={(e) => setFormData({...formData, isLiquid: e.target.value})}/>
        </div>
        <div className="form-group">
            <label>Temperature</label>
            <input className="form-control" value={formData.temp} onChange={(e) => setFormData({...formData, temp: e.target.value})}/>
        </div>
        <div className="form-group">
            <label>Does it require co_package?</label>
            <input className="form-control" value={formData.co_packaged} onChange={(e) => setFormData({...formData, co_packaged: e.target.value})}/>
        </div>
        <div className="form-group">
            <label>co_packaging_needs</label>
            <input className="form-control" value={formData.co_packaging_needs} onChange={(e) => setFormData({...formData, co_packaging_needs: e.target.value})}/>
        </div>
        <div className="form-group">
            <label>Samples per bundle</label>
            <input className="form-control" value={formData.smaples_per_bundle} onChange={(e) => setFormData({...formData, smaples_per_bundle: e.target.value})}/>
        </div>
        <div className="form-group">
            <label>Does it require printing?</label>
            <input className="form-control" value={formData.printing} onChange={(e) => setFormData({...formData, printing: e.target.value})}/>
        </div>
        <div className="form-group">
            <label>Printing need</label>
            <input className="form-control" value={formData.printing_needs} onChange={(e) => setFormData({...formData, printing_needs: e.target.value})}/>
        </div>
 </form>
    );
}

export default Handeling;