import { useState } from "react"
import  Router from 'next/router';

import useRequest from "../../hooks/use-request";

export default () => {
    const [password, setPassword] = useState('');
    const [userName, setUserName] = useState('');

    // a hook to handle the request and if any errors happen
    const { doRequest, errors } = useRequest({
        url: '/api/users/signin',
        method: 'post',
        body: {
            password, userName
        },
        onSuccess: () => Router.push('/')
    })

    const onSubmit = async (event) => {
        event.preventDefault();

        doRequest();
    }

    return (
        <form onSubmit={onSubmit}>
            <h1>Sign In</h1>
            <div className="form-group">
                <label>Username</label>
                <input  value={userName} onChange={e => setUserName(e.target.value)} className="form-control"/>
            </div>       
            <div className="form-group">
                <label>Password</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="form-control"/>
            </div>
            {errors}
            <button className="btn btn-primary">Sign In</button>
        </form>
    );
}