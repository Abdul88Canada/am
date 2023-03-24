import Link from 'next/link';

export default ({ currentUser }) => {

    const links = [
        !currentUser && {label: 'Brand Sign Up', href: '/authentication/brands/signup'},
        !currentUser && {label: 'Sign In', href: '/authentication/signin'},
        currentUser && {label: 'Add Campaigns', href: '/campaigns/addCampaigns'},
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
                <Link href='/' legacyBehavior><a className='navbar-brand'>AM</a></Link>
                
                 <div className="d-flex justify-content-end" id="navbarSupportedContent">
                    <ul className="navbar-nav justify-content-end">
                        {links}
                    </ul>
                </div>
            </div>
        </nav>
    )
}