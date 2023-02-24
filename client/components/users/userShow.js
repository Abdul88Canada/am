import  Router from 'next/router';

const UserShow = ({ user }) => {
    console.log('USER: ', user);
    const onClick = () => {
        Router.push(`/users/${user.user_id}`);
    }
    return (
        <div>
            <div className="card" onClick={onClick}>
                <div className="card-body">
                    <h5 className="card-title">User Name: {user.userName}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">Created At: {user.created_at}</h6>
                </div>
            </div>
        </div>
    );
}

export default UserShow;