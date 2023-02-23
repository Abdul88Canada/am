import  Router from 'next/router';

const UserShow = ({ user }) => {
    return (
        <div>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">User ID: {user.user_id}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">Created At: {user.created_at}</h6>
                </div>
            </div>
        </div>
    );
}

export default UserShow;