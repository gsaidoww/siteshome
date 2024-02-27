import { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions, ImageBackground, TouchableOpacity, Image } from 'react-native';
import { Routes, Route, Outlet, Link } from "react-router-dom";
import { MaterialIndicator } from 'react-native-indicators';
import { AuthContext } from '../providers/AuthProvider';
import { CitiesContext } from '../providers/CitiesProvider';




//global variables
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


//components
import HeaderDefaoult from '../components/headers/HeaderDefaoult';
import HeaderSmall from '../components/headers/HeaderSmall';
import Footer from '../components/footer/Footer';
import { Helmet } from 'react-helmet';


export default function Cities() {

    const { data, loader, setActiveCities, activeCities  } = useContext(CitiesContext);

    return (
        <View>
            <Helmet>
                <html lang="en" />
                <title>Выбор города - Homegeom</title>
                <meta name="description" content="Tutorial for React Helmet" />
                <meta name="theme-color" content="#E6E6FA" />
            </Helmet>
            <HeaderDefaoult />
            <HeaderSmall title={'Выберите город'} />
            {loader == false ?
                <View style={{ marginTop: windowHeight/40, paddingHorizontal: windowWidth/4.4, width: windowWidth }}>
                    <View style={{ flexDirection: 'column', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                        {data && data.map((item) => activeCities == item.title ? (
                            <TouchableOpacity style={{ marginTop: windowHeight/150, paddingVertical: windowHeight/150 }}>
                                <Text style={{ fontFamily: 'Overpass-Regular', color: '#000', opacity: 0.5, fontSize: windowWidth/130 }}>{item.title}</Text>
                            </TouchableOpacity>
                        ):(
                            <TouchableOpacity onPress={() => setActiveCities(item.title)} style={{ marginTop: windowHeight/150, paddingVertical: windowHeight/150 }}>
                                <Text style={{ fontFamily: 'Overpass-Regular', fontSize: windowWidth/130 }}>{item.title}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            :(
                <MaterialIndicator size={24} color='#000' />
            )}
        </View>
    );
}


