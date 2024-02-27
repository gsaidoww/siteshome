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

export default function Order() {

    const { dataCart, dataCartIders, addCart, summa, addAmount, delAmount } = useContext(BasketContext);
    
    const navigate = useNavigate();
    let params = useParams();

    //vars
    const [name, setName] = useState('');
    const [tel, setTel] = useState('');
    const [adress, setAdress] = useState('');
    const [comment, setComment] = useState('');

    const [delivery, setDelivery] = useState('');


    const addOrder = async () => {
        try {
            const docRef = await addDoc(collection(db, "orders"), {
                id: getRandomInt(999999999),
                name: name,
                tel: tel,
                adress: adress,
                comment: comment,
                delivery: delivery,
                summa: summa,
                created_at: new Date(),
                products: dataCart,
                status: 0,
                urface: params.urface == false ? 'Физическое лицо' : 'Юридическое лицо'
            });
            navigate('/success');
        } catch (e) {
        console.error("Error adding document: ", e);
        }
    }

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }


    return (
        <View>
            <Helmet>
                <html lang="en" />
                <title>Оформление заказа - Homegeom</title>
                <meta name="description" content="Tutorial for React Helmet" />
                <meta name="theme-color" content="#E6E6FA" />
            </Helmet>
            <HeaderDefaoult />
            <ScrollView>
                <HeaderSmall title={'Оформление заказа'} back={'/cart'} />
                <View style={{ width: windowWidth, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', paddingHorizontal: windowWidth/4.4 }}>
                    <View style={{ width: '66%' }}>
                        <View style={{ backgroundColor: '#f5f5f5', borderWidth: 1, borderColor: '#e7e7e7', borderRadius: windowWidth/450, padding: windowWidth/100 }}>
                            <View>
                                <Text style={{ fontSize: windowHeight/55, fontFamily: 'Overpass-Regular', marginTop: windowWidth/450, color: '#18171c' }}>Получатель</Text>
                            </View>
                            <View style={{ marginTop: windowHeight/80 }}>
                                <TextInput 
                                    value={name}
                                    onChangeText={setName}
                                    placeholder='Введите ваше имя'
                                    placeholderTextColor={'gray'}
                                    style={{
                                        padding: windowWidth/250,
                                        borderRadius: windowWidth/450,
                                        color: '#000',
                                        backgroundColor: '#fff',
                                        borderWidth: 1,
                                        borderColor: '#e7e7e7',
                                        width: windowWidth/6,
                                    }}
                                />
                                <TextInput 
                                    value={tel}
                                    onChangeText={setTel}
                                    placeholder='Телефон'
                                    placeholderTextColor={'gray'}
                                    style={{
                                        padding: windowWidth/250,
                                        borderRadius: windowWidth/450,
                                        color: '#000',
                                        backgroundColor: '#fff',
                                        borderWidth: 1,
                                        borderColor: '#e7e7e7',
                                        width: windowWidth/6,
                                        marginTop: windowHeight/100,
                                    }}
                                />
                            </View>
                        </View>
                        <View style={{ backgroundColor: '#f5f5f5', borderWidth: 1, marginTop: windowHeight/80, borderColor: '#e7e7e7', borderRadius: windowWidth/450, padding: windowWidth/100 }}>
                            <View>
                                <Text style={{ fontSize: windowHeight/55, fontFamily: 'Overpass-Regular', marginTop: windowWidth/450, color: '#18171c' }}>Адрес доставки</Text>
                            </View>
                            <View style={{ marginTop: windowHeight/80 }}>
                                <TextInput 
                                    value={adress}
                                    onChangeText={setAdress}
                                    placeholder='Укажите адресс'
                                    placeholderTextColor={'gray'}
                                    style={{
                                        padding: windowWidth/250,
                                        borderRadius: windowWidth/450,
                                        color: '#000',
                                        backgroundColor: '#fff',
                                        borderWidth: 1,
                                        borderColor: '#e7e7e7',
                                        width: windowWidth/6,
                                    }}
                                />
                                <TextInput 
                                    value={comment}
                                    onChangeText={setComment}
                                    multiline
                                    placeholder='Комментарий'
                                    placeholderTextColor={'gray'}
                                    style={{
                                        padding: windowWidth/250,
                                        borderRadius: windowWidth/450,
                                        color: '#000',
                                        backgroundColor: '#fff',
                                        borderWidth: 1,
                                        borderColor: '#e7e7e7',
                                        width: windowWidth/6,
                                        height: windowHeight/8  ,
                                        marginTop: windowHeight/100,
                                    }}
                                />
                            </View>
                        </View>
                        {params.transer == 0 ?
                        <View style={{ backgroundColor: '#f5f5f5', borderWidth: 1, marginTop: windowHeight/80, borderColor: '#e7e7e7', borderRadius: windowWidth/450, padding: windowWidth/100 }}>
                            <View>
                                <Text style={{ fontSize: windowHeight/55, fontFamily: 'Overpass-Regular', marginTop: windowWidth/450, color: '#18171c' }}>Доставка</Text>
                                <Text style={{ fontSize: windowHeight/85, opacity: 0.5, fontFamily: 'Overpass-Regular', marginTop: windowHeight/145, color: '#18171c' }}>{dataCart.length} товара</Text>
                            </View>
                            <View style={{ marginTop: windowHeight/80, flexDirection: 'row', alignItems: 'center' }}>
                                {dataCart && dataCart.map((item) => (
                                    <View style={{ marginRight: windowWidth/140 }}>
                                        <Image source={{ uri: item.good.image }} style={{ width: windowWidth/40, height: windowWidth/40 }} />
                                    </View>
                                ))}
                            </View>
                            <View style={{ marginTop: windowHeight/80 }}>
                                <View>
                                    <Text style={{ fontSize: windowHeight/65, fontFamily: 'Overpass-Regular', marginTop: windowWidth/450, color: '#18171c' }}>Как доставить</Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: windowHeight/80 }}>
                                        <TouchableOpacity onPress={() => setDelivery('В комнату')} style={{ paddingVertical: windowWidth/350, paddingHorizontal: windowWidth/140, backgroundColor: delivery == 'В комнату' ? '#18171c' : '#fff', borderRadius: windowWidth/450, borderColor: '#e7e7e7', borderWidth: 1 }}>
                                            <Text style={{ fontSize: windowHeight/85, fontFamily: 'Overpass-Regular', marginTop: windowHeight/450, color: delivery == 'В комнату' ? '#fff' : '#18171c' }}>В комнату</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => setDelivery('На улицу')} style={{ paddingVertical: windowWidth/350, marginLeft: windowWidth/170, paddingHorizontal: windowWidth/140, backgroundColor: delivery == 'На улицу' ? '#18171c' : '#fff', borderRadius: windowWidth/450, borderColor: '#e7e7e7', borderWidth: 1 }}>
                                            <Text style={{ fontSize: windowHeight/85, fontFamily: 'Overpass-Regular', marginTop: windowHeight/450, color: delivery == 'На улицу' ? '#fff' : '#18171c' }}>На улицу</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => setDelivery('До лифта или на дачу')} style={{ paddingVertical: windowWidth/350, marginLeft: windowWidth/170, paddingHorizontal: windowWidth/140, backgroundColor: delivery == 'До лифта или на дачу' ? '#18171c' : '#fff', borderRadius: windowWidth/450, borderColor: '#e7e7e7', borderWidth: 1 }}>
                                            <Text style={{ fontSize: windowHeight/85, fontFamily: 'Overpass-Regular', marginTop: windowHeight/450, color: delivery == 'До лифта или на дачу' ? '#fff' : '#18171c' }}>До лифта или на дачу</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                        :null}
                    </View>
                    <View style={{ width: '34%', alignItems: 'flex-end', height: windowHeight/2 }}>
                        <View style={{ backgroundColor: '#f5f5f5', borderWidth: 1, borderColor: '#e7e7e7', borderRadius: windowWidth/450, width: '85%', padding: windowWidth/150 }}>
                            <View>
                                <Text style={{ fontSize: windowHeight/55, fontFamily: 'Overpass-Regular', marginTop: windowWidth/450, color: '#18171c' }}>Ваш заказ</Text>
                            </View>
                            <View style={{ marginTop: windowHeight/80, marginLeft: windowWidth/400 }}>
                                <Text style={{ fontSize: windowWidth/150, marginTop: windowHeight/400, fontFamily: 'Overpass-Regular' }}>{dataCart.length} товар</Text>
                            </View>
                            <View style={{ marginTop: windowHeight/80, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: windowWidth/400 }}>
                                <Text style={{ fontSize: windowWidth/150, marginTop: windowHeight/400, fontFamily: 'Overpass-Regular' }}>Итого</Text>
                                <Text style={{ fontSize: windowWidth/150, marginTop: windowHeight/400, fontFamily: 'Overpass-Regular' }}>{summa} ₽</Text>
                            </View>
                            <View style={{ marginTop: windowHeight/80, marginHorizontal: windowWidth/400 }}>
                                {name !== '' && tel !== '' && adress !== '' ?
                                    <TouchableOpacity onPress={() => addOrder()} style={{ paddingVertical: windowWidth/200, paddingHorizontal: windowWidth/150, backgroundColor: '#242424', alignItems: 'center', justifyContent: 'center', borderRadius: windowWidth/450 }}>
                                        <Text style={{ color: '#fff', fontSize: windowWidth/180, fontFamily: 'Overpass-Regular' }}>Оформить заказ</Text>
                                    </TouchableOpacity>
                                :(
                                    <View style={{ paddingVertical: windowWidth/200, paddingHorizontal: windowWidth/150, backgroundColor: '#242424', opacity: 0.5, alignItems: 'center', justifyContent: 'center', borderRadius: windowWidth/450 }}>
                                        <Text style={{ color: '#fff', fontSize: windowWidth/180, fontFamily: 'Overpass-Regular' }}>Оформить заказ</Text>
                                    </View>
                                )}
                            </View>
                            <View style={{ marginTop: windowHeight/80, marginLeft: windowWidth/400 }}>
                                <Text style={{ fontSize: windowWidth/190, opacity: 0.5, marginTop: windowHeight/400, fontFamily: 'Overpass-Regular' }}>Дата и стоимость доставки или самовывоза определяются при оформлении заказа</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}


