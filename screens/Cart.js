import { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions, ImageBackground, TouchableOpacity, Image } from 'react-native';
import { Routes, Route, Outlet, Link, useNavigate } from "react-router-dom";
import { MaterialIndicator } from 'react-native-indicators';
import { AuthContext } from '../providers/AuthProvider';
import { CitiesContext } from '../providers/CitiesProvider';

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
import { Helmet } from 'react-helmet';
import { BasketContext } from '../providers/BasketProvider';
import HomeGoods from '../components/goods/HomeGoods';


export default function Cart() {

    const { dataCart, addCart, summa, addAmount, delAmount, clearCart } = useContext(BasketContext);
    const navigate = useNavigate();

    const [activeDostavka, setActiveDostavka] = useState(0);
    const [urface, setUrface] = useState(false);


    return (
        <View>
            <Helmet>
                <html lang="en" />
                <title>Корзина - Homegeom</title>
                <meta name="description" content="Tutorial for React Helmet" />
                <meta name="theme-color" content="#E6E6FA" />
            </Helmet>
            <HeaderDefaoult />
            <ScrollView>
                <View style={{ width: windowWidth, height: windowHeight/10, justifyContent: 'center', paddingHorizontal: windowWidth/4.4 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View>
                            <Text style={{ fontSize: windowHeight/45, fontFamily: 'Overpass-Regular', color: '#18171c' }}>Корзина</Text>
                            <Text style={{ fontSize: windowHeight/85, opacity: 0.5, marginTop: windowHeight/90, fontFamily: 'Overpass-Regular', color: '#18171c' }}>Главная / Корзина</Text>
                        </View>
                        <View>
                            {dataCart.length > 0 ?
                                <TouchableOpacity onPress={() => clearCart()} style={{ paddingVertical: windowWidth/220, paddingHorizontal: windowWidth/150, backgroundColor: '#242424', alignItems: 'center', justifyContent: 'center', borderRadius: windowWidth/450 }}>
                                    <Text style={{ color: '#fff', fontSize: windowWidth/180, marginTop: windowWidth/650, fontFamily: 'Overpass-Regular' }}>Очистить корзину</Text>
                                </TouchableOpacity>
                            :(
                                <View style={{ paddingVertical: windowWidth/220, paddingHorizontal: windowWidth/150, backgroundColor: '#242424', opacity: 0.5, alignItems: 'center', justifyContent: 'center', borderRadius: windowWidth/450 }}>
                                    <Text style={{ color: '#fff', fontSize: windowWidth/180, marginTop: windowWidth/650, fontFamily: 'Overpass-Regular' }}>Очистить корзину</Text>
                                </View>
                            )}
                        </View>
                    </View>
                </View>
                <View style={{ marginTop: windowHeight/120, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', paddingHorizontal: windowWidth/4.4, width: windowWidth }}>
                    <View style={{ width: '65%' }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                            <TouchableOpacity onPress={() => setActiveDostavka(0)} style={{ padding: windowWidth/120, flexDirection: 'row', borderWidth: 1, borderColor: '#e7e7e7', alignItems: 'flex-start', backgroundColor: activeDostavka == 0 ? '#f5f5f5' : '#FFF', borderRadius: windowWidth/450, width: '49%' }}>
                                <View style={{ width: windowWidth/140, height: windowHeight/75, borderWidth: windowWidth/700, borderColor: activeDostavka == 0 ? '#000' : '#e7e7e7', borderRadius: 1000 }}></View>
                                <View style={{ marginLeft: windowWidth/180, width: '90%' }}>
                                    <Text style={{ fontSize: windowHeight/85, fontFamily: 'Overpass-Medium', color: '#18171c' }}>Доставка</Text>
                                    <Text style={{ fontSize: windowHeight/85, opacity: 0.5, marginTop: windowHeight/130, fontFamily: 'Overpass-Regular', color: '#18171c' }}>Наша служба доставки привезёт заказ домой, в офис или на дачу</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setActiveDostavka(1)} style={{ padding: windowWidth/120, flexDirection: 'row', borderWidth: 1, borderColor: '#e7e7e7', alignItems: 'flex-start', backgroundColor: activeDostavka == 1 ? '#f5f5f5' : '#FFF', borderRadius: windowWidth/450, width: '49%' }}>
                                <View style={{ width: windowWidth/140, height: windowHeight/75, borderWidth: windowWidth/700, borderColor: activeDostavka == 1 ? '#000' : '#e7e7e7', borderRadius: 1000 }}></View>
                                <View style={{ marginLeft: windowWidth/180, width: '90%' }}>
                                    <Text style={{ fontSize: windowHeight/85, fontFamily: 'Overpass-Medium', color: '#18171c' }}>Самовывоз</Text>
                                    <Text style={{ fontSize: windowHeight/85, opacity: 0.5, marginTop: windowHeight/130, fontFamily: 'Overpass-Regular', color: '#18171c' }}>Заберите заказ бесплатно из магазина Home Geom или пункта самовывоза</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={{ marginTop: windowHeight/90, backgroundColor: '#FFF1DD', flexDirection: 'row', alignItems: 'center', borderRadius: windowWidth/450, padding: windowWidth/150 }}>
                            <svg width={windowWidth/110} height={windowWidth/110} viewBox="0 0 24 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_73_3377)">
                                <path d="M15.4789 2.92038H8.42127L3.43555 7.90611V14.9637L8.42127 19.9494H15.4789L20.4646 14.9637V7.90611L15.4789 2.92038ZM18.5725 14.1785L14.6936 18.0573H9.2065L5.32766 14.1785V8.69133L9.2065 4.8125H14.6936L18.5725 8.69133V14.1785Z" fill="#FF0000"/>
                                <path d="M11.95 16.1652C12.4725 16.1652 12.896 15.7416 12.896 15.2191C12.896 14.6966 12.4725 14.2731 11.95 14.2731C11.4275 14.2731 11.0039 14.6966 11.0039 15.2191C11.0039 15.7416 11.4275 16.1652 11.95 16.1652Z" fill="#FF0000"/>
                                <path d="M11.0039 6.70461H12.896V13.327H11.0039V6.70461Z" fill="#FF0000"/>
                                </g>
                                <defs>
                                <clipPath id="clip0_73_3377">
                                <rect width="22.7054" height="22.7054" fill="white" transform="translate(0.597656 0.0822067)"/>
                                </clipPath>
                                </defs>
                            </svg>
                            <Text style={{ fontSize: windowHeight/85, marginTop: windowHeight/300, marginLeft: windowWidth/170, fontFamily: 'Overpass-Medium', color: '#18171c' }}>Принимаем заказы от 1 000 ₽ для доставки, самовывоз без ограничений.</Text>
                        </View>
                        <View style={{ marginTop: windowHeight/90 }}>
                            {dataCart.length > 0 ?
                                <>
                                {dataCart.map((item) => (
                                    <View style={{ flexDirection: 'row', alignItems: 'flex-end', marginTop: windowHeight/90, justifyContent: 'space-between' }}>
                                        <TouchableOpacity onPress={() => navigate(`/goodsItem/${item.good.id}`)} style={{ flexDirection: 'row', alignItems: 'flex-start', width: '55%' }}>
                                            <Image source={{ uri: item.good.image }} style={{ width: windowWidth/15, height: windowHeight/8, borderRadius: windowWidth/450 }} />
                                            <View style={{ marginLeft: windowWidth/80, width: '90%', marginTop: windowHeight/80 }}>
                                                <Text style={{ fontSize: windowHeight/75, fontFamily: 'Overpass-Medium', color: '#18171c' }}>{item.good.title}</Text>
                                                <Text style={{ fontFamily: 'Overpass-Regular', marginTop: windowHeight/160, opacity: 0.5, fontSize: windowWidth/190 }}>Арт. {item.good.articul}</Text>
                                                <View style={{ marginTop: windowHeight/150 }}>
                                                    <Text style={{ fontSize: windowWidth/190, fontFamily: 'Overpass-Regular', opacity: 0.5 }}>{item.comments} отзывов</Text>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                        <View style={{ width: '42%', alignItems: 'flex-end' }}>
                                            <Text style={{ fontSize: windowHeight/65, marginTop: windowHeight/300, fontFamily: 'Overpass-Medium', color: '#18171c' }}>{item.count * item.good.price} ₽</Text>
                                            {item.count > 1 ?
                                                <Text style={{ fontSize: windowHeight/105, opacity: 0.5, marginTop: windowHeight/300, fontFamily: 'Overpass-Medium', color: '#18171c' }}>{item.good.price} ₽ / шт.</Text>
                                            :null}
                                            <View style={{ padding: windowWidth/250, borderWidth: 1, marginTop: windowHeight/80, width: '50%', borderColor: '#e7e7e7', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderRadius: windowWidth/450 }}>
                                                <TouchableOpacity onPress={() => { delAmount(item.good.id); getSumm();}} style={{ paddingHorizontal: windowWidth/250 }}>
                                                    <svg width={windowWidth/110} height={windowWidth/110} viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                                                <Text style={{ fontSize: windowHeight/65, marginTop: windowHeight/300, fontFamily: 'Overpass-Medium', color: '#18171c' }}>{item.count}</Text>
                                                <TouchableOpacity onPress={() => { addAmount(item.good.id); getSumm(); }} style={{ paddingHorizontal: windowWidth/250 }}>
                                                    <svg width={windowWidth/110} height={windowWidth/110} viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                                    </View>
                                ))}
                                </>
                            :(
                                <View style={{ marginTop: windowHeight/80 }}>
                                    <Text style={{ fontSize: windowWidth/130, marginTop: windowHeight/400, fontFamily: 'Overpass-Regular' }}>Нет товаров</Text>
                                </View>
                            )}
                        </View>
                    </View>
                    <View style={{ width: '34%', alignItems: 'flex-end', height: windowHeight/2 }}>
                        <View style={{ backgroundColor: '#f5f5f5', borderRadius: windowWidth/450, width: '75%', padding: windowWidth/200 }}>
                            <TouchableOpacity onPress={() => urface == false ? setUrface(true) : setUrface(false)} style={{ borderRadius: windowWidth/450, flexDirection: 'row', alignItems: 'center', padding: windowWidth/200, backgroundColor: '#FFF' }}>
                                <View style={{ width: windowHeight/85, height: windowHeight/85, borderWidth: windowWidth/700, borderColor: urface == true ? '#000' : '#e7e7e7', borderRadius: 1000 }}></View>
                                <Text style={{ fontSize: windowWidth/160, marginTop: windowHeight/400, marginLeft: windowWidth/180, fontFamily: 'Overpass-Regular' }}>Я юридическое лицо</Text>
                            </TouchableOpacity>
                            <View style={{ marginTop: windowHeight/80, marginLeft: windowWidth/400 }}>
                                <Text style={{ fontSize: windowWidth/150, marginTop: windowHeight/400, fontFamily: 'Overpass-Regular' }}>{dataCart.length} товар</Text>
                            </View>
                            <View style={{ marginTop: windowHeight/80, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: windowWidth/400 }}>
                                <Text style={{ fontSize: windowWidth/150, marginTop: windowHeight/400, fontFamily: 'Overpass-Regular' }}>Итого</Text>
                                <Text style={{ fontSize: windowWidth/150, marginTop: windowHeight/400, fontFamily: 'Overpass-Regular' }}>{summa} ₽</Text>
                            </View>
                            <View style={{ marginTop: windowHeight/80, marginHorizontal: windowWidth/400 }}>
                                {dataCart.length > 0 ?
                                    <TouchableOpacity onPress={() => navigate(`/order/${activeDostavka}/${urface}`)} style={{ paddingVertical: windowWidth/200, paddingHorizontal: windowWidth/150, backgroundColor: '#242424', alignItems: 'center', justifyContent: 'center', borderRadius: windowWidth/450 }}>
                                        <Text style={{ color: '#fff', fontSize: windowWidth/180, fontFamily: 'Overpass-Regular' }}>Перейти к оформлению</Text>
                                    </TouchableOpacity>
                                :(
                                    <View style={{ paddingVertical: windowWidth/200, paddingHorizontal: windowWidth/150, backgroundColor: '#242424', opacity: 0.5, alignItems: 'center', justifyContent: 'center', borderRadius: windowWidth/450 }}>
                                        <Text style={{ color: '#fff', fontSize: windowWidth/180, fontFamily: 'Overpass-Regular' }}>Перейти к оформлению</Text>
                                    </View>
                                )}
                            </View>
                            <View style={{ marginTop: windowHeight/80, marginLeft: windowWidth/400 }}>
                                <Text style={{ fontSize: windowWidth/190, opacity: 0.5, marginTop: windowHeight/400, fontFamily: 'Overpass-Regular' }}>Дата и стоимость доставки или самовывоза определяются при оформлении заказа</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{ marginTop: windowHeight/15 }}>
                    <Footer />
                </View>
            </ScrollView>
        </View>
    );
}


