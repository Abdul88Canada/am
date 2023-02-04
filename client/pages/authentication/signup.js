import { useState } from "react"
import axios from 'axios';

export default () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userName, setUserName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState(0);

    const onSubmit = async (event) => {
        event.preventDefault();

        const response = await axios.post('/api/users/signup', {
            email, password, userName, phoneNumber
        });

        console.log(response.data);
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
            <button className="btn btn-primary">Sign Up</button>
        </form>
    )
}