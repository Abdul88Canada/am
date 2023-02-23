import UserShow from "./userShow"

const UserList = ( {users} ) => {
    const renderedUsers = users?.map((user) => {
        return <UserShow key={user.id} user={user} />
    })

    return (
        <div>{renderedUsers}</div>
    );
}

UserList.getInitialProps = async (context, client, currentUser, users ) => {
    if(!currentUser) {
     return {}
    } 
    else {
     const { data } = await client.get('/api/users/getUsers', {
        users: users
     });
     return {users: data};
    }
 }

export default UserList;