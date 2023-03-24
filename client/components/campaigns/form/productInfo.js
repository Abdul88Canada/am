const ProductInfo = () => {
    return (
        <div>
            <form>
                    <h1>Product Info</h1>
                    <div className="form-group">
                        <label>Product Name</label>
                        <input className="form-control"/>
                        </div>
                    <div className="form-group">
                        <label>Product Type</label>
                        <input className="form-control"/>
                    </div>
                    <div className="form-group">
                        <label>Product Format</label>
                        <input className="form-control"/>
                    </div>
                    <div className="form-group">
                        <label>Product Quantity</label>
                        <input className="form-control"/>
                    </div>
                    <div className="form-group">
                        <label>Start Date</label>
                        <input className="form-control"/>
                    </div>
                    <div className="form-group">
                        <label>Duratrion</label>
                        <input className="form-control"/>
                    </div>
                    <div className="form-group">
                        <label>Instructions</label>
                        <input className="form-control"/>
                    </div>
                    <div className="form-group">
                        <label>Expiry Date</label>
                        <input className="form-control"/>
                    </div>
             </form>
        </div>
    );
}

export default ProductInfo;