import { useState } from 'react';
import Link from 'next/link';

const SettingsHeader = ({currentUser}) => {
    const [activeTab, setActiveTab] = useState();

    const clicked = (e) => {
        console.log('Clicked! ', e.target);
    }

    const links = [
        currentUser && {label: 'Add Unit', href: '/units/addUnit'},
        currentUser && currentUser.user_type == "Owner" && {label: 'Add User', href: '/users/addUser'},
        currentUser && currentUser.user_type == 'Owner' && {label: 'Add Property', href: '/properties/addProperty'},
    ].filter(linkConfig => linkConfig)
    .map(({ label, href }) => {
        return (
        <li key={href} className="nav-item" onClick={e => clicked(e)}>
            <Link href={href} legacyBehavior><a className='nav-link'>{label}</a></Link>
        </li>
        );
    });

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container-fluid">                
                 <div className="d-flex justify-content-end" id="navbarSupportedContent">
                    <ul className="navbar-nav justify-content-end">
                        {links}
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default SettingsHeader;