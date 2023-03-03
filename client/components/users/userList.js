import UserShow from "./userShow"

const UserList = ( {users} ) => {
    console.log('USERS: ', users);
    const renderedUsers = users?.map((user) => {
        return <UserShow key={user.user_id} user={user} />
    })

    return (
        <div>{renderedUsers}</div>
    );
}

UserList.getInitialProps = async (context, client, currentUser, users) => {
    console.log('IN USER LIST');
    if(!currentUser) {
     return {}
    } 
    else {
     const { data } = await client.get('/api/users/getUsers');
     console.log('DATA: ', data);
     return {users: data};
    }
 }

export default UserList;