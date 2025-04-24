import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [idUser, setIdUser] = useState('');
    const [idCollector, setIdCollector] = useState('');
    const [userType, setUserType] = useState('');

    return (
        <AppContext.Provider value={{ idUser, setIdUser, idCollector, setIdCollector, userType, setUserType }}>
            {children}
        </AppContext.Provider>
    );
};