import axios from "axios";
import { useState } from "react";

export default ({ url, method, body, onSuccess }) => {
    const [errors, setErros] = useState(null);
    console.log(body);
    const doRequest = async () => {
        try {
            setErros(null);
            console.log(body);
            const response = await axios[method](url, body);
            

            if(onSuccess) {
                onSuccess(response.data);
            }
            
            return response.data;
        } catch (err) {
            console.log(err);
            setErros(
                <div className="alert alert-danger">
                    <ui className="my-0">
                        {err.response.data.errors.map(err => <li key={err.message}>{err.message}</li>)}
                    </ui>
                </div>
            )

        }

    }

    return { doRequest, errors };
};