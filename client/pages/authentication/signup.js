import { useState } from "react"
import  Router from 'next/router';

import useRequest from "../../hooks/use-request";

export default () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userName, setUserName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState(0);

    // a hook to handle the request and if any errors happen
    const { doRequest, errors } = useRequest({
        url: '/api/users/signup',
        method: 'post',
        body: {
            email, password, userName, phoneNumber
        },
        onSuccess: () => Router.push('/')
    });

    const onSubmit = async (event) => {
        event.preventDefault();

        doRequest();
    }

    return (
        <form onSubmit={onSubmit}>
            <h1>Sign Up</h1>
            <div className="form-group">
                <label>Email Address</label>
                <input value={email} onChange={e => setEmail(e.target.value)} className="form-control"/>
            </div>
            <div className="form-group">
                <label>Password</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="form-control"/>
            </div>
            <div className="form-group">
                <label>Phone Number</label>
                <input type="number" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} className="form-control"/>
            </div>
            <div className="form-group">
                <label>Username</label>
                <input  value={userName} onChange={e => setUserName(e.target.value)} className="form-control"/>
            </div>
            {errors}
            <button className="btn btn-primary">Sign Up</button>
        </form>
    )
}