import Link from 'next/link';

export default ({ currentUser }) => {

    const links = [
        !currentUser && {label: 'Sign Up', href: '/auth/Registration'},
        /*currentUser && {label: 'Add Unit', href: '/units/addUnit'},
        currentUser && currentUser.user_type === 'Owner' && {label: 'Add User', href: '/users/addUser'},
        currentUser && currentUser.user_type === 'Owner' && {label: 'Add Property', href: '/properties/addProperty'},*/
        currentUser && {label: 'Sign Out', href: '/authentication/signout'}
    ].filter(linkConfig => linkConfig)
    .map(({ label, href }) => {
        return (
        <li key={href} className="nav-item">
            <Link href={href} legacyBehavior><a className='nav-link'>{label}</a></Link>
        </li>
        );
    });

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <Link href='/' legacyBehavior><a className='navbar-brand'>CPM</a></Link>
                
                 <div className="d-flex justify-content-end" id="navbarSupportedContent">
                    <ul className="navbar-nav justify-content-end">
                        {links}
                    </ul>
                </div>
            </div>
        </nav>
    )
}