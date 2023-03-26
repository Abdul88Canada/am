const Targeting = ({formData, setFormData}) => {
    return (
        <form>
        <h1>Targeting</h1>
        <div className="form-group">
            <label>Age Group</label>
            <input className="form-control" value={formData.age_group} onChange={(e) => setFormData({...formData, age_group: e.target.value})}/>
            </div>
        <div className="form-group">
            <label>Segment</label>
            <input className="form-control" value={formData.segment} onChange={(e) => setFormData({...formData, segment: e.target.value})}/>
        </div>
        <div className="form-group">
            <label>Gender</label>
            <input className="form-control" value={formData.gender} onChange={(e) => setFormData({...formData, gender: e.target.value})}/>
        </div>
        <div className="form-group">
            <label>Countries</label>
            <input className="form-control" value={formData.countries} onChange={(e) => setFormData({...formData, countries: e.target.value})}/>
        </div>
        <div className="form-group">
            <label>Cities</label>
            <input className="form-control" value={formData.cities} onChange={(e) => setFormData({...formData, cities: e.target.value})}/>
        </div>
 </form>
    );
}

export default Targeting;