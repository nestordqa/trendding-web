import { createContext, useContext, useState } from 'react';

// Create a Theme Context
const ThemeContext = createContext({
    theme: '',
    toggleTheme: ()=>{},
    jwt: '',
    setToken: (str: string)=>{},
    user: {},
    setUsuario: (user: any)=>{}
});
// Create a Theme Provider component
export const ThemeProvider = ({ children }:any) => {
    const [theme, setTheme] = useState('dark'); // Default theme
    const [jwt, setJwt] = useState('');
    const [user, setUser] = useState<any>({});
    const setToken = (str: string) => {
        setJwt(str);
    };
    const setUsuario = (user: any) => {
        setUser(user);
    };
    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, jwt, setToken, user, setUsuario }}>
            {children}
        </ThemeContext.Provider>
    );
};

// Custom hook to use the Theme Context
export const useGlobalData = () => useContext(ThemeContext);