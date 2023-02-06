import Link from 'next/link';

export default ({ currentUser }) => {

    const links = [
        !currentUser && {label: 'Sign Up', href: '/authentication/signup'},
        !currentUser && {label: 'Sign In', href: '/authentication/signin'},
        currentUser && {label: 'Sign Out', href: '/authentication/signout'},
        currentUser && {label: 'Add Room', href: '/rooms/addRoom'}
    ].filter(linkConfig => linkConfig)
    .map(({ label, href }) => {
        return (
        <li key={href} className="nav-item">
            <Link href={href} legacyBehavior><a className='nav-link'>{label}</a></Link>
        </li>
        );
    });

    return (
        <nav className="navbar navbar-light bg-light">
            <Link href='/' legacyBehavior><a className= 'navbar-brand'>AM</a></Link>
            <div className='d-flex justify-content-end'>
                <ul className='nav d-flex align-items-center'>
                    {links}
                </ul>
            </div>
        </nav>
    )
}