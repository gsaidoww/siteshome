import React, { useState, useCallback, useEffect, useRef, useMemo, createContext } from 'react';
import { MaterialIndicator } from 'react-native-indicators';


//firebase
import { collection, query, where, getDocs, updateDoc, doc, limit } from "firebase/firestore";
import { db } from '../firebaseConfig';



export const BasketContext = createContext(null);

export const BasketProvider = props => {

    const [loader, setLoader] = useState(false);
    const [dataCart, setDataCart] = useState([]);
    const [dataCartIders, setDataCartIders] = useState([]);
    const [summa, setSumma] = useState(0);


    const addCart = (item, count) => {
        setDataCart([...dataCart, {good: item, count: count}]);
        setDataCartIders([...dataCartIders, item.id]);
        var s = Number(item.price * count);
        setSumma(summa + s);
        localStorage.setItem('cart', JSON.stringify(dataCart));
    }

    const deleteCart = (item) => {

    }

    const addAmount = (i) => {
        var s = 0;
        setDataCart(prevData => {
            return prevData.map(item => {
                if (item.good.id === i) {
                    s += summa + Number(item.good.price);
                    return { ...item, count: Number(item.count) + Number(1) }; // Обновляем нужный элемент
                }
                return item;
            });
        });
        setSumma(s);
    }

    const delAmount = (i) => {
        var s = 0;
        if(dataCart[dataCartIders.indexOf(i)].count > 1) {
            setDataCart(prevData => {
                return prevData.map(item => {
                    if (item.good.id === i) {
                        s = summa - item.good.price;
                        return { ...item, count: Number(item.count) - Number(1)}; // Обновляем нужный элемент
                    }
                    return item;
                });
            });
        } else {
            setDataCart(dataCart.filter(item => item.good.id !== i));
            setDataCartIders(dataCartIders.filter(item => item !== i));
            s = summa - dataCart[dataCartIders.indexOf(i)].good.price; 
        }
        setSumma(s);
    }

    const clearCart = () => {
        setDataCart([]);
        setDataCartIders([]);
        setSumma(0);
    }


    useEffect(() => {

    }, [])
    
    return (
        <BasketContext.Provider value={{ dataCart, dataCartIders, loader, addCart, deleteCart, addAmount, delAmount, clearCart, summa }}>
            {props.children}
        </BasketContext.Provider>
    )
}