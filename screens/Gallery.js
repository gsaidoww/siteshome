import { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, Dimensions, ImageBackground, TouchableOpacity, Image } from 'react-native';
import { Routes, Route, Outlet, Link, useNavigate } from "react-router-dom";
import { MaterialIndicator } from 'react-native-indicators';
import { Helmet } from 'react-helmet';



//firebase
import { collection, query, where, getDocs, updateDoc, doc, limit } from "firebase/firestore";
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

export default function Gallery() {

    const { dataCart, dataCartIders, addCart, summa, addAmount, delAmount } = useContext(BasketContext);
    const navigate = useNavigate();
    const [data, setData] = useState([]);

    const getGallery = async () => {
        const q = query(collection(db, "gallery"));
        const querySnapshot = await getDocs(q);
        const itemsList = [];
        querySnapshot.forEach(async (docer) => {
            var d = docer.data();
            itemsList.push(d);
        })
        setData(itemsList);
      }
    
      useEffect(() => {
        getGallery();
      }, [])

    return (
        <View>
            <Helmet>
                <html lang="en" />
                <title>Галерея готовых решений - Homegeom</title>
                <meta name="description" content="Tutorial for React Helmet" />
                <meta name="theme-color" content="#E6E6FA" />
            </Helmet>
            <HeaderDefaoult />
            <ScrollView>
                <HeaderSmall title={'Галерея готовых решений'} />
                <View style={{ flexDirection: 'row', alignItems: 'flex-start', flexWrap: 'wrap', width: windowWidth, paddingHorizontal: windowWidth/4.4 }}>
                    {data && data.map((item) => (
                        <TouchableOpacity onPress={() => navigate(`/galleryitem/${item.title}/${item.id}`)} style={{ width: '30.6%', height: windowHeight/3, marginRight: windowWidth/90, backgroundColor: '#f5f5f5', borderRadius: windowWidth/450, marginTop: windowHeight/40 }}>
                            <Image source={{ uri: item.image }} style={{ height: windowHeight/3, width: '100%', borderRadius: windowWidth/450 }} /> 
                            <View style={{ position: 'absolute', left: windowWidth/100, bottom: windowHeight/40, paddingVertical: windowWidth/250, paddingHorizontal: windowWidth/250, backgroundColor: '#000', borderRadius: windowWidth/450 }}>
                                <Text style={{ color: '#fff', fontSize: windowWidth/180, fontFamily: 'Overpass-Regular' }}>{item.title}</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
                <View style={{ marginTop: windowHeight/15 }}>
                    <Footer />
                </View>
            </ScrollView>
        </View>
    );
}


