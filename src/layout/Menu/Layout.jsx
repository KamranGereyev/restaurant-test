import { NavLink, Outlet } from 'react-router-dom';
import './index.css'

const Layout = () => {
    return <div className='layout'>
        <div className="sidebar">
            <div className='menu'>
                <NavLink to='/' className={({ isActive }) => isActive ? 'menu-item' : 'no-active'  }>Restaurant List</NavLink>
            </div>
        </div>
        <div className='content'>
            <Outlet />
        </div>
    </div>;
}

export default Layout;
