import React, { useState, useCallback, useEffect, useRef, useMemo, createContext } from 'react';
import { MaterialIndicator } from 'react-native-indicators';

export const AuthContext = createContext(null);

export const AuthProvider = props => {

    const [loader, setLoader] = useState(false);
    const [userToken, setUserToken] = useState(null);
    const [userData, setUserData] = useState(null);

    useEffect(() => {

    }, []);

    return (
        <AuthContext.Provider value={{ userToken, setUserToken, userData, setUserData, setLoader, loader }}>
            {loader == false ?
            <>
                {props.children}
            </>
            :(
                <MaterialIndicator size={24} color='#000' />
            )}
        </AuthContext.Provider>
    )
}