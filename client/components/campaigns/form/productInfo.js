const ProductInfo = ({formData, setFormData}) => {
    return (
        <div>
            <form>
                    <h1>Product Info</h1>
                    <div className="form-group">
                        <label>Product Name</label>
                        <input className="form-control" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}/>
                        </div>
                    <div className="form-group">
                        <label>Product Type</label>
                        <input className="form-control" value={formData.product_type} onChange={(e) => setFormData({...formData, product_type: e.target.value})}/>
                    </div>
                    <div className="form-group">
                        <label>Product Format</label>
                        <input className="form-control" value={formData.product_format} onChange={(e) => setFormData({...formData, product_format: e.target.value})}/>
                    </div>
                    <div className="form-group">
                        <label>Product Quantity</label>
                        <input className="form-control" value={formData.product_qty} onChange={(e) => setFormData({...formData, product_qty: e.target.value})}/>
                    </div>
                    <div className="form-group">
                        <label>Start Date</label>
                        <input className="form-control" value={formData.start_date} onChange={(e) => setFormData({...formData, start_date: e.target.value})}/>
                    </div>
                    <div className="form-group">
                        <label>Duratrion</label>
                        <input className="form-control" value={formData.duration} onChange={(e) => setFormData({...formData, duration: e.target.value})}/>
                    </div>
                    <div className="form-group">
                        <label>Instructions</label>
                        <input className="form-control" value={formData.instructions} onChange={(e) => setFormData({...formData, instructions: e.target.value})}/>
                    </div>
                    <div className="form-group">
                        <label>Expiry Date</label>
                        <input className="form-control" value={formData.expiry_date} onChange={(e) => setFormData({...formData, expiry_date: e.target.value})}/>
                    </div>
             </form>
        </div>
    );
}

export default ProductInfo;