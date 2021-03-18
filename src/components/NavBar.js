import React, {useState} from 'react'
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link, useHistory } from 'react-router-dom';
import {SideBarData} from './SideBarData'
import './NavBar.css';
import { IconContext } from 'react-icons'
import {Button} from 'react-bootstrap';
import { useAuth } from '../contexts/authContext';

function NavBar() {
    const [sidebar, setSidebar] = useState(false)
    const [error, setError] = useState()
    const { logout } = useAuth()
    const history = useHistory()

    async function handleLogout() {
        setError('')

        try {
            await logout()
            history.push("/login")
        }catch {
            setError('Failed to log out')
        }
    }

    const showSidebar = () => setSidebar(!sidebar) 
    return (
        <>
        <IconContext.Provider value={{color:'#fff'}}>
            <div className="navbar">
                <Link  to="#" className="menu-bars">
                    <FaIcons.FaBars onClick={showSidebar}/>
                </Link>
            </div>
            <nav className={sidebar ? 'nav-menu active' : 'nav-menu'} >
                <ul className='nav-menu-items' onClick={showSidebar}>
                    <li className="navbar-toggle">
                        <Link to="#" className='menu-bars'>
                            <AiIcons.AiOutlineClose />
                        </Link>
                    </li>
                    {SideBarData.map((item, index) => {
                        return (
                            <li key={index} className={item.cName}>
                                <Link to={item.path}>
                                    {item.icon}
                                    <span>{item.title}</span>
                                </Link>
                            </li>
                        )
                    })}
                    <div class="logoutButton"><Button variant="danger" onClick={handleLogout}>Log Out</Button></div>
                </ul>
            </nav>
        </IconContext.Provider>
        </>
    )
}

export default NavBar
