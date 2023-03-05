import { useState } from 'react';
import Link from 'next/link';

const SettingsHeader = ({currentUser}) => {
    const [activeTab, setActiveTab] = useState('');

    const links = [
        currentUser && {label: 'Add Unit', href: '/units/addUnit'},
        currentUser && currentUser.user_type == "Owner" && {label: 'Add User', href: '/users/addUser'},
        currentUser && currentUser.user_type == 'Owner' && {label: 'Add Property', href: '/properties/addProperty'},
    ].filter(linkConfig => linkConfig)
    .map(({ label, href }) => {
        return (
        <li key={href} className={`nav-item ${activeTab == label ? 'active' : ''}`} onClick={e => setActiveTab(label)}>
            <Link href={href} legacyBehavior><a className='nav-link'>{label}</a></Link>
        </li>
        );
    });

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
             <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                        {links}
                </ul>
            </div>
        </nav>
    )
}

export default SettingsHeader;