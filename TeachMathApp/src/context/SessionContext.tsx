
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { MyUser, ROL } from './types';

interface SessionContextType {
    user: MyUser
    setUsername: (uname:string) => void
    setRol: (rol:ROL) => void
}

const SessionContext = createContext<SessionContextType|undefined>(undefined);

export const SessionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    
    const [username,setUsername] = useState("")
    const [userrol,setRol] = useState<ROL>(ROL.STUDENT)
    const user:MyUser = {username:username,rol:userrol}

    return (
        <SessionContext.Provider value={{  user, setUsername, setRol}}>
            {children}
        </SessionContext.Provider>
    );
};

export const useSession = (): SessionContextType => {
    const context = useContext(SessionContext); //
    if (!context) { // no entiendo cuando se da esta excepcion
        throw new Error('useSession must be used within an SessionProvider');
    }
    return context;
};
