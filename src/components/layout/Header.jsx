import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAppStore } from '../../store/appStore';
import { hapticImpact } from '../../hooks/useNativeFeatures';
import { MoonIcon, SunIcon } from '../common/Icons';

const Header = () => {
    const theme = useAppStore((state) => state.theme);
    const toggleTheme = useAppStore((state) => state.toggleTheme);

    const handleThemeToggle = () => {
        toggleTheme();
        hapticImpact();
    };

    const activeLinkStyle = {
        color: theme === 'light' ? 'var(--blue-600)' : 'var(--blue-500)',
    };

    return (
        <header className="app-header">
            <nav className="app-nav">
                <NavLink to="/cross" style={({ isActive }) => isActive ? activeLinkStyle : undefined}>Cross</NavLink>
                <NavLink to="/f2l" style={({ isActive }) => isActive ? activeLinkStyle : undefined}>F2L</NavLink>
                <NavLink to="/" style={({ isActive }) => isActive ? activeLinkStyle : undefined}>OLL</NavLink>
                <NavLink to="/pll" style={({ isActive }) => isActive ? activeLinkStyle : undefined}>PLL</NavLink>
            </nav>
            <button onClick={handleThemeToggle} className="theme-switcher" aria-label="Сменить тему">
                {theme === 'light' 
                    ? <MoonIcon style={{width: '1.5rem', height: '1.5rem'}} /> 
                    : <SunIcon style={{width: '1.5rem', height: '1.5rem'}} />}
            </button>
        </header>
    );
};

export default Header;