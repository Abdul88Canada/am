import { useState } from "react"
import  Router from 'next/router';

import useRequest from "../../hooks/use-request";

import ProductInfo from '../../components/campaigns/form/productInfo';
import Targeting from '../../components/campaigns/form/targeting';
import Handeling from '../../components/campaigns/form/handeling';

const AddProperty = ({currentUser, campaigns}) => {
    const [page, setPage] = useState(0);
    const user_id = currentUser.id;
    const [formData, setFormData] = useState({
        name: '',
        product_type: '',
        product_format: '',
        product_qty: '',
        start_date: '',
        duration: 0,
        instructions: '',
        expiry_date: '',
        age_group: '',
        segment: '',
        gender: '',
        countries: '',
        cities: '',
        package_type: '',
        isLiquid: '',
        temp: '',
        co_packaged: '',
        co_packaging_needs: '',
        smaples_per_bundle: 0,
        printing: '',
        printing_needs: ''
        })

    // a hook to handle the request and if any errors happen
    const { doRequest, errors } = useRequest({
        url: '/api/create/campaigns',
        method: 'post',
        body: {
            
        },
        onSuccess: () => Router.push('/')
        
    });

    const onSubmit = async (event) => {
        event.preventDefault();
        doRequest();
    }

    const pageDisplay = () => {
        if (page === 0 ) {
            return <ProductInfo formData={formData} setFormData={setFormData} />
        }
        else if (page === 1) {
            return <Targeting formData={formData} setFormData={setFormData} />
        }
        else if (page === 2 ) {
            return <Handeling formData={formData} setFormData={setFormData} />
        }
    }

    return (
        <div>
            {pageDisplay()} 
            {errors}
            <button className="btn btn-primary" disabled={page === 0} onClick={() => {setPage((currPage) => currPage - 1)}}>Previous</button>
            <button className="btn btn-primary" disabled={page === 2} onClick={() => {setPage((currPage) => currPage + 1)}}>Next</button>
        </div>
    );
}

AddProperty.getInitialProps = async (context, client, currentUser) => {
    if(!currentUser) {
     return {}
    } 
    else {
        const user_id = currentUser.id;
        const { data } = await client.get('/api/campaigns');
     
        return {campaigns: data};
    }
 }

export default AddProperty;