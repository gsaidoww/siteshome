import { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, Dimensions, ImageBackground, TouchableOpacity, Image } from 'react-native';
import { Routes, Route, Outlet, Link, useNavigate, useParams } from "react-router-dom";
import { MaterialIndicator } from 'react-native-indicators';
import { Helmet } from 'react-helmet';



//firebase
import { collection, query, where, addDoc, getDocs, updateDoc, doc, limit } from "firebase/firestore";
import { db } from '../firebaseConfig';



//global variables
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


//components
import HeaderDefaoult from '../components/headers/HeaderDefaoult';
import HeaderSmall from '../components/headers/HeaderSmall';
import Footer from '../components/footer/Footer';
import { AuthContext } from '../providers/AuthProvider';
import { BasketContext } from '../providers/BasketProvider';

export default function OrderSuccess() {

    const navigate = useNavigate();
    let params = useParams();


    return (
        <View>
            <Helmet>
                <html lang="en" />
                <title>Ваш заказ оформлен - Homegeom</title>
                <meta name="description" content="Tutorial for React Helmet" />
                <meta name="theme-color" content="#E6E6FA" />
            </Helmet>
            <HeaderDefaoult />
            <View style={{ height: windowHeight/1.5, alignItems: 'center', justifyContent: 'center' }}>
                <svg width={windowWidth/10} height={windowWidth/10} viewBox="0 0 178 178" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="88.5466" cy="88.5466" r="88.5466" fill="#32CD32" fill-opacity="0.11"/>
                    <circle cx="87.7614" cy="89.3302" r="68.9567" fill="#32CD32" fill-opacity="0.29"/>
                    <circle cx="88.5464" cy="88.5466" r="49.3667" fill="#32CD32"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M107.625 73.6632C108.542 74.4637 108.636 75.8559 107.836 76.7728L84.7478 103.219C84.3293 103.699 83.724 103.974 83.0876 103.974C82.4512 103.974 81.8459 103.699 81.4274 103.219L72.1921 92.6407C71.3916 91.7238 71.486 90.3315 72.4029 89.5311C73.3199 88.7306 74.7121 88.825 75.5126 89.7419L83.0876 98.4188L104.516 73.874C105.316 72.9571 106.708 72.8627 107.625 73.6632Z" fill="#fff"/>
                </svg>
                <Text style={{ fontSize: windowWidth/70, marginTop: windowHeight/60 }}>Заказ успешно оформлен</Text>
                <Text style={{ fontSize: windowWidth/110, marginTop: windowHeight/60 }}>Вернитесь на главный экран и продолжайте покупки.</Text>
                <TouchableOpacity onPress={() => navigate('/')} style={{ padding: windowWidth/200, backgroundColor: '#242424', marginTop: windowHeight/40, alignItems: 'center', justifyContent: 'center', borderRadius: windowWidth/450 }}>
                    <Text style={{ color: '#fff', fontSize: windowWidth/180, marginTop: windowWidth/650, fontFamily: 'Overpass-Regular' }}>Вернуться на главную</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}


