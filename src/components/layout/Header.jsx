import React from 'react';
import { NavLink } from 'react-router-dom'; // Импортируем NavLink
import { useTheme } from '../../context/ThemeContext';
import { MoonIcon, SunIcon } from '../common/Icons';

const Header = () => {
    const { theme, toggleTheme } = useTheme();

    // Определяем стиль для активной ссылки
    const activeLinkStyle = {
        color: theme === 'light' ? 'var(--blue-600)' : 'var(--blue-500)',
    };

    return (
        <header className="app-header">
            <nav className="app-nav">
                {/* Заменяем <a> на <NavLink> и указываем путь `to` */}
                <NavLink to="/cross" style={({ isActive }) => isActive ? activeLinkStyle : undefined}>
                    Cross
                </NavLink>
                <NavLink to="/f2l" style={({ isActive }) => isActive ? activeLinkStyle : undefined}>
                    F2L
                </NavLink>
                <NavLink to="/" style={({ isActive }) => isActive ? activeLinkStyle : undefined}>
                    OLL
                </NavLink>
                <NavLink to="/pll" style={({ isActive }) => isActive ? activeLinkStyle : undefined}>
                    PLL
                </NavLink>
            </nav>
            <button onClick={toggleTheme} className="theme-switcher" aria-label="Сменить тему">
                {theme === 'light' 
                    ? <MoonIcon style={{width: '1.5rem', height: '1.5rem'}} /> 
                    : <SunIcon style={{width: '1.5rem', height: '1.5rem'}} />}
            </button>
        </header>
    );
};

export default Header;