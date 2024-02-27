import React, { useState, useCallback, useEffect, useRef, useMemo, createContext } from 'react';
import { MaterialIndicator } from 'react-native-indicators';


//firebase
import { collection, query, where, getDocs, updateDoc, doc, limit } from "firebase/firestore";
import { db } from '../firebaseConfig';



export const CitiesContext = createContext(null);

export const CitiesProvider = props => {

    const [loader, setLoader] = useState(false);
    const [data, setData] = useState([]);
    const [activeCities, setActiveCity] = useState(null);
    
    const setActiveCities = (t) => {
        setActiveCity(t);
        localStorage.setItem('city', t)
    }
    
    const getCities = async () => {
        const q = query(collection(db, "cities"));
        const querySnapshot = await getDocs(q);
        const itemsList = [];
        querySnapshot.forEach(async (docer) => {
            var d = docer.data();
            itemsList.push(d);
        })
        setData(itemsList);
        setLoader(false);
    }

    useEffect(() => {
        setLoader(true);
        getCities();
        if(localStorage.getItem('city') !== null) {
            setActiveCity(localStorage.getItem('city'));
        } else {
            setActiveCity('Махачкала');
        }
    }, [])
    
    return (
        <CitiesContext.Provider value={{ data, loader, setActiveCities, activeCities }}>
            {props.children}
        </CitiesContext.Provider>
    )
}