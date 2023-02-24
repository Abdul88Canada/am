import { useState } from "react"
import  Router from 'next/router';

import useRequest from "../../hooks/use-request";
import UserList from '../../components/users/userList';

const AddUser =  ({users, currentUser}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userName, setUserName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState(0);
    const owner_id = currentUser.id;

    // a hook to handle the request and if any errors happen
    const { doRequest, errors } = useRequest({
        url: '/api/users/add-user',
        method: 'post',
        body: {
            email, password, userName, phoneNumber, owner_id
        },
        onSuccess: () => Router.push('/')
    });

    const onSubmit = async (event) => {
        event.preventDefault();

        doRequest();
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
            <h1>Add a user</h1>
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
            <button className="btn btn-primary">Add user</button>
            </form>
            <UserList users={users} />
        </div>
    )
}

AddUser.getInitialProps = async (context, client, currentUser) => {
    if(!currentUser) {
     return {}
    } 
    else {
        const { data } = await client.get('/api/users/getUsers');
        console.log('DATA IS: ', data);
     return {users: data};
    }
 }

export default AddUser;