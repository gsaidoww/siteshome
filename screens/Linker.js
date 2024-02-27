import { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, Dimensions, ImageBackground, TouchableOpacity, Image } from 'react-native';
import { Routes, Route, Outlet, Link, useNavigate, useParams } from "react-router-dom";
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

export default function Linker() {

    const [loader, setLoader] = useState(false);
    let params = useParams();
    const [data, setData] = useState([]);
    const { dataCart, dataCartIders, addCart, addAmount, delAmount } = useContext(BasketContext);
 
    const navigate = useNavigate();

    useEffect(() => {
        setLoader(true);
        getGoods();
    }, [])
    
    const getGoods = async () => {
        if(params.title == 'Популярные товары') {
            const q = query(collection(db, "goods"), where("popular", "==", 1));
            const querySnapshot = await getDocs(q);
            const itemsList = [];
            querySnapshot.forEach(async (docer) => {
                var d = docer.data();
                itemsList.push(d);
            })
            setData(itemsList);
            setLoader(false);
        } else {
            const q = query(collection(db, "goods"), where("recomend", "==", 1));
            const querySnapshot = await getDocs(q);
            const itemsList = [];
            querySnapshot.forEach(async (docer) => {
                var d = docer.data();
                itemsList.push(d);
            })
            setData(itemsList);
            setLoader(false);
        }
    }

      

    const [text, setText] = useState('');


    return (
        <View>
            <Helmet>
                <html lang="en" />
                <title>{params.title} - Homegeom</title>
                <meta name="description" content="Tutorial for React Helmet" />
                <meta name="theme-color" content="#E6E6FA" />
            </Helmet>
            <HeaderDefaoult />
            <ScrollView>
            <HeaderSmall title={params.title} />
            {loader == false ?
                <View style={{ paddingHorizontal: windowWidth/4.4, width: windowWidth }}>
                    <View style={{ flexDirection: 'row', marginTop: windowHeight/40, alignItems: 'flex-start', flexWrap: 'wrap' }}>
                        {data && data.map((item, index) =>(
                            <View style={{ height: windowHeight/2.8, width: windowWidth/10.5, marginRight: windowWidth/95, marginTop: windowHeight/35, borderRadius: windowWidth/450 }}>
                                <TouchableOpacity onPress={() => navigate(`/goodsItem/${item.id}`)} style={{ flex: 1 }}>
                                    <Image style={{ flex: 1, backgroundColor: '#f5f5f5' }} source={{ uri: item.image }} />
                                </TouchableOpacity>
                                <View style={{ flex: 0.8, paddingTop: windowWidth/320, justifyContent: 'space-between', flexDirection: 'column' }}>
                                    <TouchableOpacity onPress={() => navigate(`/goodsItem/${item.id}`)} >
                                        <Text style={{ fontFamily: 'Overpass-Regular', opacity: 0.5, fontSize: windowWidth/190 }}>Арт. {item.articul}</Text>
                                        <Text numberOfLines={2} style={{ marginTop: windowWidth/320, fontFamily: 'Overpass-Regular', fontSize: windowWidth/170 }}>{item.title}</Text>
                                        <View style={{ marginTop: windowHeight/150 }}>
                                            <Text style={{ fontSize: windowWidth/190, fontFamily: 'Overpass-Regular', opacity: 0.5 }}>{item.comments} отзывов</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <View>
                                        <View style={{ marginTop: windowHeight/60 }}>
                                            <Text style={{ fontSize: windowWidth/130, fontFamily: 'Overpass-SemiBold' }}>{item.price} ₽/м²</Text>
                                        </View>
                                        {dataCartIders.includes(item.id) == true ?
                                            <View style={{ marginTop: windowHeight/60, width: '80%' }}>
                                                <View style={{ padding: windowWidth/270, borderWidth: 1, borderColor: '#e7e7e7', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderRadius: windowWidth/450 }}>
                                                    <TouchableOpacity onPress={() => delAmount(item.id)} style={{ paddingHorizontal: windowWidth/250 }}>
                                                        <svg width={windowWidth/140} height={windowWidth/140} viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <g clip-path="url(#clip0_73_3621)">
                                                            <path d="M18.924 10.6341H3.78711V12.5262H18.924V10.6341Z" fill="#323232"/>
                                                            </g>
                                                            <defs>
                                                            <clipPath id="clip0_73_3621">
                                                            <rect width="22.7054" height="22.7054" fill="white" transform="translate(0.00390625 0.227432)"/>
                                                            </clipPath>
                                                            </defs>
                                                        </svg>
                                                    </TouchableOpacity>
                                                    <Text style={{ fontSize: windowHeight/75, marginTop: windowHeight/300, fontFamily: 'Overpass-Medium', color: '#18171c' }}>{dataCart[dataCartIders.indexOf(item.id)].count}</Text>
                                                    <TouchableOpacity onPress={() => addAmount(item.id)} style={{ paddingHorizontal: windowWidth/250 }}>
                                                        <svg width={windowWidth/140} height={windowWidth/140} viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <g clip-path="url(#clip0_73_3629)">
                                                            <path d="M18.0495 12.5262H12.3732V18.2025H10.481V12.5262H4.80469V10.6341H10.481V4.95772H12.3732V10.6341H18.0495V12.5262Z" fill="#323232"/>
                                                            </g>
                                                            <defs>
                                                            <clipPath id="clip0_73_3629">
                                                            <rect width="22.7054" height="22.7054" fill="white" transform="translate(0.0742188 0.227432)"/>
                                                            </clipPath>
                                                            </defs>
                                                        </svg>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        :(
                                            <View style={{ marginTop: windowHeight/60, width: '80%' }}>
                                                <TouchableOpacity onPress={() => addCart(item, 1)} style={{ padding: windowWidth/200, backgroundColor: '#242424', alignItems: 'center', justifyContent: 'center', borderRadius: windowWidth/450  }}>
                                                    <Text style={{ color: '#fff', fontSize: windowWidth/180, marginTop: windowWidth/650, fontFamily: 'Overpass-Regular' }}>В корзину</Text>
                                                </TouchableOpacity>
                                            </View>
                                        )}
                                    </View>
                                </View>
                            </View>
                        ))}
                    </View>
                </View>
            :(
                <MaterialIndicator size={24} color='#000' />
            )}
            <View style={{ marginTop: windowHeight/15 }}>
                <Footer />
            </View>
            </ScrollView>
        </View>
    );
}


