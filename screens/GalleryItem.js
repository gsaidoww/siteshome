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

export default function GalleryItem() {

    const { dataCart, dataCartIders, addCart, summa, addAmount, delAmount } = useContext(BasketContext);
    const navigate = useNavigate();
    let params = useParams();



    const [data, setData] = useState([]);
    const [dataGoods, setDataGoods] = useState([]);

    const getGallery = async () => {
        const q = query(collection(db, "gallery"), where("id", "==", params.id));
        const querySnapshot = await getDocs(q);
        const itemsList = [];
        querySnapshot.forEach(async (docer) => {
            var d = docer.data();
            itemsList.push(d);
            getGoodsPopular(d.goods);
        })
        setData(itemsList);
    }

    const getGoodsPopular = async (item) => {
        var arr = [];
        for(var i = 0; i < item.length; i++) {
            const q = query(collection(db, "goods"), where("id", "==", item[i]));
            const querySnapshot = await getDocs(q);
            const itemsList = [];
            querySnapshot.forEach(async (docer) => {
                var d = docer.data();
                itemsList.push(d);
            })
            arr.push(itemsList[0]);
        }
        setDataGoods(arr);
        console.log(arr)
      }
    
    useEffect(() => {
        getGallery();
    }, [])


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
                {data && data.length > 0 ?
                <View style={{ width: windowWidth, paddingHorizontal: windowWidth/4.4 }}>
                    <Image source={{ uri: data[0].image }} style={{ width: '100%', height: windowHeight/2, borderRadius: windowWidth/450 }} />
                    <View style={{ marginTop: windowHeight/30, width: windowWidth/2.6 }}>
                        <Text style={{ color: '#000', fontSize: windowWidth/140, fontFamily: 'Overpass-Regular' }}>{data[0].goods.length} товара в проекте</Text>
                        {dataGoods.map((item) => (
                            <View style={{ flexDirection: 'row', alignItems: 'flex-end', marginTop: windowHeight/90, justifyContent: 'space-between' }}>
                                <TouchableOpacity onPress={() => navigate(`/goodsItem/${item.id}`)} style={{ flexDirection: 'row', alignItems: 'flex-start', width: '55%' }}>
                                    <Image source={{ uri: item.image }} style={{ width: windowWidth/15, height: windowHeight/8, borderRadius: windowWidth/450 }} />
                                    <View style={{ marginLeft: windowWidth/80, width: '90%', marginTop: windowHeight/80 }}>
                                        <Text style={{ fontSize: windowHeight/75, fontFamily: 'Overpass-Medium', color: '#18171c' }}>{item.title}</Text>
                                        <Text style={{ fontFamily: 'Overpass-Regular', marginTop: windowHeight/160, opacity: 0.5, fontSize: windowWidth/190 }}>Арт. {item.articul}</Text>
                                        <View style={{ marginTop: windowHeight/150 }}>
                                            <Text style={{ fontSize: windowWidth/190, fontFamily: 'Overpass-Regular', opacity: 0.5 }}>{item.comments} отзывов</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                                <View style={{ width: '42%', alignItems: 'flex-end' }}>
                                    {dataCartIders.includes(item.id) == true ?
                                        <View style={{ marginTop: windowHeight/60, alignItems: 'flex-end' }}>
                                            {item.old_price !== '' ?
                                                <View>
                                                    <Text style={{ fontSize: windowWidth/170, opacity: 0.6, fontFamily: 'Overpass-SemiBold', textDecorationLine: 'line-through', textDecorationStyle: 'solid', }}>{item.old_price} ₽/м²</Text>
                                                </View>
                                            :null}
                                            <Text style={{ fontSize: windowHeight/65, marginBottom: windowHeight/70, marginTop: windowHeight/300, fontFamily: 'Overpass-Medium', color: '#18171c' }}>{item.price} ₽/м²</Text>
                                            <View style={{ padding: windowWidth/270, borderWidth: 1, width: windowWidth/15, borderColor: '#e7e7e7', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderRadius: windowWidth/450 }}>
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
                                        <View style={{ marginTop: windowHeight/60, width: '40%', alignItems: 'flex-end' }}>
                                            {item.old_price !== '' ?
                                                <View>
                                                    <Text style={{ fontSize: windowWidth/170, opacity: 0.6, fontFamily: 'Overpass-SemiBold', textDecorationLine: 'line-through', textDecorationStyle: 'solid', }}>{item.old_price} ₽/м²</Text>
                                                </View>
                                            :null}
                                            <Text style={{ fontSize: windowHeight/65, marginBottom: windowHeight/70, marginTop: windowHeight/300, fontFamily: 'Overpass-Medium', color: '#18171c' }}>{item.price} ₽/м²</Text>
                                            <TouchableOpacity onPress={() => addCart(item, 1)} style={{ padding: windowWidth/200, width: windowWidth/15, backgroundColor: '#242424', alignItems: 'center', justifyContent: 'center', borderRadius: windowWidth/450  }}>
                                                <Text style={{ color: '#fff', fontSize: windowWidth/180, marginTop: windowWidth/650, fontFamily: 'Overpass-Regular' }}>В корзину</Text>
                                            </TouchableOpacity>
                                        </View>
                                    )}
                                </View>
                            </View>
                        ))}
                    </View>
                </View>
                :null}
                <View style={{ marginTop: windowHeight/15 }}>
                    <Footer />
                </View>
            </ScrollView>
        </View>
    );
}


