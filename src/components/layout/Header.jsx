import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { MoonIcon, SunIcon } from '../common/Icons';

const Header = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <header className="app-header">
            <nav className="app-nav">
                {['Cross', 'F2L', 'OLL', 'PLL'].map(item => (
                    <a key={item} href="#" className={item === 'OLL' ? 'active' : ''}>{item}</a>
                ))}
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
