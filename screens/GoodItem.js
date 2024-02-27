import { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions, ImageBackground, TextInput, TouchableOpacity, Image } from 'react-native';
import { MaterialIndicator } from 'react-native-indicators';
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from 'react-helmet';


//firebase
import { collection, query, where, getDocs, updateDoc, doc, limit, addDoc } from "firebase/firestore";
import { db } from '../firebaseConfig';

 

//global variables
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


//components
import HeaderDefaoult from '../components/headers/HeaderDefaoult';
import HeaderSmall from '../components/headers/HeaderSmall';
import Footer from '../components/footer/Footer';
import HomeGoods from '../components/goods/HomeGoods';
import { BasketContext } from '../providers/BasketProvider';


export default function GoodItem() {

    let params = useParams();

    const { dataCart, dataCartIders, addCart, addAmount, delAmount } = useContext(BasketContext);
    const [loader, setLoader] = useState(true);
    const [data, setData] = useState(null);
    const [dataPopular, setDataPopular] = useState([]);
    const [activeImage, setActiveImage] = useState('');
    const [activePage, setActivePage] = useState(0);
    const [dataComments, setDataComments] = useState([]);

    const getGoodsPopular = async () => {
        const q = query(collection(db, "goods"), where("popular", "==", 1));
        const querySnapshot = await getDocs(q);
        const itemsList = [];
        querySnapshot.forEach(async (docer) => {
            var d = docer.data();
            itemsList.push(d);
        })
        setDataPopular(itemsList);
    }

    const getGoods = async () => {
        const q = query(collection(db, "goods"), where("id", "==", params.id));
        const querySnapshot = await getDocs(q);
        const itemsList = [];
        querySnapshot.forEach(async (docer) => {
            var d = docer.data();
            itemsList.push(d);
        })
        setData(itemsList);
        getComments();
        setActiveImage(itemsList[0].image);
        setLoader(false);
    }

    const getComments = async () => {
        const q = query(collection(db, "comments"), where("id_goods", "==", params.id));
        const querySnapshot = await getDocs(q);
        const itemsList = [];
        querySnapshot.forEach(async (docer) => {
            var d = docer.data();
            itemsList.push(d);
        })
        setDataComments(itemsList.reverse());
    }


    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    const [name, setName] = useState('');
    const [comment, setComment] = useState('');
    const [like, setLike] = useState('');
    
    const addComment = async () => {
        try {
            const docRef = await addDoc(collection(db, "comments"), {
                id: getRandomInt(999999999),
                name: name,
                created_at: new Date(),
                id_goods: params.id,
                comment: comment,
                like: like
            });
        } catch (e) {
            console.error("Error adding document: ", e);
        }
        setName('');
        setComment('');
        updateComments();
        setLike('');
        getComments();
    }

    const updateComments = async () => {
        const q = query(collection(db, "goods"), where("id", "==", data[0].id));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(async (docer) => {
            console.log(docer);
            await updateDoc(doc(db, "goods", docer.id), {
              comments: Number(data[0].comments) + 1
            });
        });
    } 

    const [filters, setFilters] = useState([]); 
    const getFilters = async (i) => {
        const q = query(collection(db, "filters"));
        const querySnapshot = await getDocs(q);
        const itemsList = [];
        querySnapshot.forEach(async (docer) => {
            var d = docer.data();
            itemsList.push(d);
        })
        setFilters(itemsList);
        console.log(itemsList);
    }

    useEffect(() => {
        setLoader(true);
        getGoodsPopular();
        getGoods();
        getFilters();
    }, [])
    


    return (
        <View>
            <HeaderDefaoult />
            {loader == false ?
            <ScrollView stickyHeaderIndices={[1]}>
                {data !== null ?
                    <View style={{ marginTop: windowHeight/70, marginBottom: windowHeight/30, paddingHorizontal: windowWidth/4.4, width: windowWidth, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                        <Helmet>
                            <html lang="en" />
                            <title>{data[0].title} - Homegeom</title>
                            <meta name="description" content="Tutorial for React Helmet" />
                            <meta name="theme-color" content="#E6E6FA" />
                        </Helmet>
                        <View style={{ width: windowWidth/3.1, height: windowHeight/2, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ width: '11%' }}>
                                <TouchableOpacity style={{ borderWidth: 1, alignItems: 'center', justifyContent: 'center', width: windowWidth/35, height: windowWidth/35, borderColor: activeImage == data[0].image ? '#000' : '#e7e7e7' }} onPress={() => setActiveImage(data[0].image)}>
                                    <Image resizeMode='cover' resizeMethod='scale' source={{ uri: data[0].image }} style={{ width: windowWidth/40, height: windowWidth/40 }} />
                                </TouchableOpacity>
                                {data[0].image2 !== '' ?
                                <TouchableOpacity style={{ borderWidth: 1, alignItems: 'center', justifyContent: 'center', width: windowWidth/35, height: windowWidth/35, marginTop: windowHeight/100, borderColor: activeImage == data[0].image2 ? '#000' : '#e7e7e7' }} onPress={() => setActiveImage(data[0].image2)}>
                                    <Image resizeMode='cover' resizeMethod='scale' source={{ uri: data[0].image2 }} style={{ width: windowWidth/40, height: windowWidth/40 }} />
                                </TouchableOpacity>
                                :null}
                                {data[0].image3 !== '' ?
                                <TouchableOpacity style={{ borderWidth: 1, alignItems: 'center', justifyContent: 'center', width: windowWidth/35, height: windowWidth/35, marginTop: windowHeight/100, borderColor: activeImage == data[0].image3 ? '#000' : '#e7e7e7' }} onPress={() => setActiveImage(data[0].image3)}>
                                    <Image resizeMode='cover' resizeMethod='scale' source={{ uri: data[0].image3 }} style={{ width: windowWidth/40, height: windowWidth/40 }} />
                                </TouchableOpacity>
                                :null}
                                {data[0].image4 !== '' ?
                                <TouchableOpacity style={{ borderWidth: 1, alignItems: 'center', justifyContent: 'center', width: windowWidth/35, height: windowWidth/35, marginTop: windowHeight/100, borderColor: activeImage == data[0].image4 ? '#000' : '#e7e7e7' }} onPress={() => setActiveImage(data[0].image4)}>
                                    <Image resizeMode='cover' resizeMethod='scale' source={{ uri: data[0].image4 }} style={{ width: windowWidth/40, height: windowWidth/40 }} />
                                </TouchableOpacity>
                                :null}
                                {data[0].image5 !== '' ?
                                <TouchableOpacity style={{ borderWidth: 1, alignItems: 'center', justifyContent: 'center', width: windowWidth/35, height: windowWidth/35, marginTop: windowHeight/100, borderColor: activeImage == data[0].image5 ? '#000' : '#e7e7e7' }} onPress={() => setActiveImage(data[0].image5)}>
                                    <Image resizeMode='cover' resizeMethod='scale' source={{ uri: data[0].image5 }} style={{ width: windowWidth/40, height: windowWidth/40 }} />
                                </TouchableOpacity>
                                :null}
                            </View>
                            <View style={{ width: '88%', alignItems: 'center', justifyContent: 'center'  }}>
                                <Image resizeMode='cover' resizeMethod='auto' source={{ uri: activeImage }} style={{ width:  windowWidth/3.8, height: windowHeight/2 }} />
                            </View>
                        </View>
                        <View style={{ width: windowWidth/4.5, height: windowHeight/2 }}>
                            <View>
                                <Text style={{ fontFamily: 'Overpass-Regular', opacity: 0.5, fontSize: windowWidth/180 }}>Арт. {data[0].articul}</Text>
                                <Text numberOfLines={2} style={{ marginTop: windowWidth/320, fontFamily: 'Overpass-Regular', fontSize: windowWidth/110 }}>{data[0].title}</Text>
                                <View style={{ marginTop: windowHeight/130 }}>
                                    <Text style={{ fontSize: windowWidth/170, fontFamily: 'Overpass-Regular', opacity: 0.5 }}>{data[0].comments} отзывов</Text>
                                </View>
                            </View>
                            <View style={{ marginTop: windowHeight/40}}>
                                <Text style={{ fontSize: windowWidth/170, fontFamily: 'Overpass-Regular', opacity: 0.5 }}>Общий вес упаковки</Text>
                            </View>
                            {dataCartIders.includes(data[0].id) == true ?
                                <View style={{ marginTop: windowHeight/240, marginLeft: -windowWidth/350, flexDirection: 'row' }}>
                                    <View style={{ paddingVertical: windowWidth/250, backgroundColor: '#f5f5f5', paddingHorizontal: windowWidth/180, marginLeft: windowWidth/350, marginTop: windowHeight/100, borderRadius: windowWidth/450 }}>
                                        <Text style={{ fontFamily: 'Overpass-Regular', fontSize: windowWidth/190, color: '#000', marginTop: windowHeight/450  }}>{dataCart[dataCartIders.indexOf(data[0].id)].count} кор. = {dataCart[dataCartIders.indexOf(data[0].id)].count * data[0].all_weight_cub} кг</Text>
                                    </View>
                                </View>
                            :(
                                <View style={{ marginTop: windowHeight/240, marginLeft: -windowWidth/350, flexDirection: 'row' }}>
                                    <View style={{ paddingVertical: windowWidth/250, backgroundColor: '#f5f5f5', paddingHorizontal: windowWidth/180, marginLeft: windowWidth/350, marginTop: windowHeight/100, borderRadius: windowWidth/450 }}>
                                        <Text style={{ fontFamily: 'Overpass-Regular', fontSize: windowWidth/190, color: '#000', marginTop: windowHeight/450  }}>1 кор. = {data[0].all_weight_cub} кг</Text>
                                    </View>
                                </View>
                            )}
                            <View style={{ marginTop: windowHeight/40}}>
                                <Text style={{ fontSize: windowWidth/170, fontFamily: 'Overpass-Regular', opacity: 0.5 }}>Количество плиток в упаковке</Text>
                            </View>
                            {dataCartIders.includes(data[0].id) == true ?
                                <View style={{ marginTop: windowHeight/240, marginLeft: -windowWidth/350, flexDirection: 'row' }}>
                                    <View style={{ paddingVertical: windowWidth/250, backgroundColor: '#f5f5f5', paddingHorizontal: windowWidth/180, marginLeft: windowWidth/350, marginTop: windowHeight/100, borderRadius: windowWidth/450 }}>
                                        <Text style={{ fontFamily: 'Overpass-Regular', fontSize: windowWidth/190, color: '#000', marginTop: windowHeight/450  }}>{dataCart[dataCartIders.indexOf(data[0].id)].count} кор. = {dataCart[dataCartIders.indexOf(data[0].id)].count * data[0].col_cub} шт.</Text>
                                    </View>
                                </View>
                            :(
                                <View style={{ marginTop: windowHeight/240, marginLeft: -windowWidth/350, flexDirection: 'row' }}>
                                    <View style={{ paddingVertical: windowWidth/250, backgroundColor: '#f5f5f5', paddingHorizontal: windowWidth/180, marginLeft: windowWidth/350, marginTop: windowHeight/100, borderRadius: windowWidth/450 }}>
                                        <Text style={{ fontFamily: 'Overpass-Regular', fontSize: windowWidth/190, color: '#000', marginTop: windowHeight/450  }}>1 кор. = {data[0].col_cub} шт.</Text>
                                    </View>
                                </View>
                            )}
                        
                            <View style={{ marginTop: windowHeight/20 }}>
                                {data[0].old_price !== '' ?
                                    <View>
                                        <Text style={{ fontSize: windowWidth/170, opacity: 0.6, fontFamily: 'Overpass-SemiBold', textDecorationLine: 'line-through', textDecorationStyle: 'solid', }}>{data[0].old_price} ₽/м²</Text>
                                    </View>
                                :null}
                                <View>
                                    <Text style={{ fontSize: windowWidth/80, fontFamily: 'Overpass-SemiBold' }}>{data[0].price} ₽/м²</Text>
                                </View>
                                {dataCartIders.includes(data[0].id) == true ?
                                    <View style={{ marginTop: windowHeight/60, width: '50%' }}>
                                        <View style={{ padding: windowWidth/250, borderWidth: 1, borderColor: '#e7e7e7', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderRadius: windowWidth/450 }}>
                                            <TouchableOpacity onPress={() => delAmount(data[0].id)} style={{ paddingHorizontal: windowWidth/250 }}>
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
                                            <Text style={{ fontSize: windowHeight/65, marginTop: windowHeight/300, fontFamily: 'Overpass-Medium', color: '#18171c' }}>{dataCart[dataCartIders.indexOf(data[0].id)].count}</Text>
                                            <TouchableOpacity onPress={() => addAmount(data[0].id)} style={{ paddingHorizontal: windowWidth/250 }}>
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
                                        <View style={{ marginTop: windowHeight/90, backgroundColor: '#FFF1DD', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderRadius: windowWidth/450, padding: windowWidth/250 }}>
                                            <Text style={{ fontSize: windowHeight/85, marginTop: windowHeight/300, marginLeft: windowWidth/170, fontFamily: 'Overpass-Medium', color: '#18171c' }}>{dataCart[dataCartIders.indexOf(data[0].id)].count} кор. = {(dataCart[dataCartIders.indexOf(data[0].id)].count * data[0].col_m2_cub).toFixed(2)} м²</Text>
                                            <Text style={{ fontSize: windowHeight/85, marginTop: windowHeight/300, marginLeft: windowWidth/170, fontFamily: 'Overpass-Medium', color: '#18171c' }}>= {dataCart[dataCartIders.indexOf(data[0].id)].count * data[0].price}₽</Text>
                                        </View>
                                    </View>
                                :(
                                    <View style={{ marginTop: windowHeight/60, width: '50%' }}>
                                        <TouchableOpacity onPress={() => addCart(data[0], 1)} style={{ padding: windowWidth/200, backgroundColor: '#242424', alignItems: 'center', justifyContent: 'center', borderRadius: windowWidth/450  }}>
                                            <Text style={{ color: '#fff', fontSize: windowWidth/160, marginTop: windowWidth/650, fontFamily: 'Overpass-Regular' }}>В корзину</Text>
                                        </TouchableOpacity>
                                    </View>
                                )}
                            </View>
                            <View style={{ marginTop: windowHeight/50 }}>
                                <Text style={{ fontSize: windowWidth/180, color: '#60BF00', fontFamily: 'Overpass-Regular' }}>Доступно для заказа</Text>
                                <View style={{ marginTop: windowHeight/80, flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <svg width={windowWidth/120} height={windowWidth/120} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M8.875 17.8926C8.27344 17.8926 7.75 18.4002 7.75 19.0711C7.75 19.742 8.27344 20.2496 8.875 20.2496C9.47656 20.2496 10 19.742 10 19.0711C10 18.4002 9.47656 17.8926 8.875 17.8926ZM6.25 19.0711C6.25 17.6118 7.40549 16.3926 8.875 16.3926C10.3445 16.3926 11.5 17.6118 11.5 19.0711C11.5 20.5304 10.3445 21.7496 8.875 21.7496C7.40549 21.7496 6.25 20.5304 6.25 19.0711Z" fill="black"/>
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M16.3755 17.8926C15.7739 17.8926 15.2505 18.4002 15.2505 19.0711C15.2505 19.742 15.7739 20.2496 16.3755 20.2496C16.977 20.2496 17.5005 19.742 17.5005 19.0711C17.5005 18.4002 16.977 17.8926 16.3755 17.8926ZM13.7505 19.0711C13.7505 17.6118 14.906 16.3926 16.3755 16.3926C17.845 16.3926 19.0005 17.6118 19.0005 19.0711C19.0005 20.5304 17.845 21.7496 16.3755 21.7496C14.906 21.7496 13.7505 20.5304 13.7505 19.0711Z" fill="black"/>
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M1.875 3C1.875 2.58579 2.21079 2.25 2.625 2.25H4.77856C5.41521 2.25 5.95014 2.72849 6.02083 3.3612L7.04587 12.5355H18.7729C18.8813 12.5355 18.9773 12.4656 19.0107 12.3625L20.8625 6.64844C20.9149 6.48695 20.7945 6.32137 20.6247 6.32137H8.875C8.46079 6.32137 8.125 5.98558 8.125 5.57137C8.125 5.15715 8.46079 4.82137 8.875 4.82137H20.6247C21.813 4.82137 22.6558 5.98043 22.2895 7.11088L20.4376 12.825C20.2038 13.5467 19.5315 14.0355 18.7729 14.0355H6.57908L5.5483 14.6413C5.47808 14.6826 5.45059 14.7267 5.43722 14.7629C5.42143 14.8058 5.41737 14.8623 5.43374 14.9225C5.45012 14.9826 5.48226 15.0293 5.51758 15.0582C5.54748 15.0827 5.59352 15.1068 5.67497 15.1068H18.25C18.6642 15.1068 19 15.4426 19 15.8568C19 16.271 18.6642 16.6068 18.25 16.6068H5.67497C3.89172 16.6068 3.25086 14.2517 4.78824 13.3481L5.57563 12.8853L4.55494 3.75H2.625C2.21079 3.75 1.875 3.41421 1.875 3Z" fill="black"/>
                                        </svg>
                                        <Text style={{ fontSize: windowWidth/170, color: '#000', marginLeft: windowWidth/180, fontFamily: 'Overpass-Regular' }}>Самовывоз из магазина</Text>
                                    </View>
                                    <Text style={{ fontSize: windowWidth/170, color: '#000', marginLeft: windowWidth/180, fontFamily: 'Overpass-Regular' }}>бесплатно</Text>
                                </View>
                                <View style={{ marginTop: windowHeight/80, flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <svg width={windowWidth/120} height={windowWidth/120} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g clip-path="url(#clip0_35_1765)">
                                                <path d="M17 5H3C1.9 5 1 5.89 1 7V16H3C3 17.66 4.34 19 6 19C7.66 19 9 17.66 9 16H15C15 17.66 16.34 19 18 19C19.66 19 21 17.66 21 16H23V11L17 5ZM15 7H16L19 10H15V7ZM9 7H13V10H9V7ZM3 7H7V10H3V7ZM6 17.25C5.31 17.25 4.75 16.69 4.75 16C4.75 15.31 5.31 14.75 6 14.75C6.69 14.75 7.25 15.31 7.25 16C7.25 16.69 6.69 17.25 6 17.25ZM18 17.25C17.31 17.25 16.75 16.69 16.75 16C16.75 15.31 17.31 14.75 18 14.75C18.69 14.75 19.25 15.31 19.25 16C19.25 16.69 18.69 17.25 18 17.25ZM21 14H20.22C19.67 13.39 18.88 13 18 13C17.12 13 16.33 13.39 15.78 14H8.22C7.67 13.39 6.89 13 6 13C5.11 13 4.33 13.39 3.78 14H3V12H21V14Z" fill="#323232"/>
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_35_1765">
                                                    <rect width="24" height="24" fill="white"/>
                                                </clipPath>
                                            </defs>
                                        </svg>
                                        <Text style={{ fontSize: windowWidth/170, color: '#000', marginLeft: windowWidth/180, fontFamily: 'Overpass-Regular' }}>Доставка</Text>
                                    </View>
                                    <Text style={{ fontSize: windowWidth/170, color: '#000', marginLeft: windowWidth/180, fontFamily: 'Overpass-Regular' }}>от 250 руб</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                :null}
                {data !== null ?
                <View style={{ width: windowWidth, paddingHorizontal: windowWidth/4.4, backgroundColor: '#fff' }}>
                    <View style={{ borderBottomWidth: 1, borderBottomColor: '#e7e7e7', flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => setActivePage(0)} style={{ paddingVertical: windowHeight/60, opacity: activePage == 0 ? 1 : 0.5, borderBottomWidth: 2, borderBottomColor: activePage == 0 ? '#000' : '#fff' }}>
                            <Text style={{ color: '#000', fontSize: windowWidth/160, fontFamily: 'Overpass-Regular' }}>Описание</Text>
                        </TouchableOpacity>
                        {data[0].subcategory_id == '797' ?
                        <TouchableOpacity onPress={() => setActivePage(1)} style={{ paddingVertical: windowHeight/60, opacity: activePage == 1 ? 1 : 0.5, marginLeft: windowWidth/100, borderBottomWidth: 2, borderBottomColor: activePage == 1 ? '#000' : '#fff' }}>
                            <Text style={{ color: '#000', fontSize: windowWidth/160, fontFamily: 'Overpass-Regular' }}>Характеристики</Text>
                        </TouchableOpacity>
                        :null}
                        <TouchableOpacity onPress={() => setActivePage(2)} style={{ paddingVertical: windowHeight/60, opacity: activePage == 2 ? 1 : 0.5, marginLeft: windowWidth/100, borderBottomWidth: 2, borderBottomColor: activePage == 2 ? '#000' : '#fff' }}>
                            <Text style={{ color: '#000', fontSize: windowWidth/160, fontFamily: 'Overpass-Regular' }}>Отзывы</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                :null}
                {data !== null ?
                <>
                    {activePage == 0 ?
                        <View style={{ width: windowWidth, marginTop: windowHeight/60, paddingHorizontal: windowWidth/4.4 }}>
                            <View>
                                <Text style={{ fontSize: windowHeight/55, fontFamily: 'Overpass-Regular', marginTop: windowWidth/450, color: '#18171c' }}>Описание</Text>
                            </View>
                            <View style={{ marginTop: windowHeight/50, width: '70%' }}>
                                <Text style={{ fontSize: windowHeight/80, fontFamily: 'Overpass-Regular', marginTop: windowWidth/450, color: '#18171c' }}>{data[0].description}</Text>
                            </View>
                        </View>
                    :null}
                    {activePage == 1 ?
                        <View style={{ width: windowWidth, marginTop: windowHeight/60, paddingHorizontal: windowWidth/4.4 }}>
                            <View>
                                <Text style={{ fontSize: windowHeight/55, fontFamily: 'Overpass-Regular', marginTop: windowWidth/450, color: '#18171c' }}>Характеристики</Text>
                            </View>
                            {data[0].subcategory_id == '797' ?
                                <View style={{ marginTop: windowHeight/50 }}>
                                    <Text style={{ fontSize: windowHeight/80, fontFamily: 'Overpass-Regular', marginTop: windowWidth/140, color: '#18171c' }}>Цвет  <Text style={{ opacity: 0.3 }}>...........................................................................................................</Text>  {data[0].palette}</Text>
                                    <Text style={{ fontSize: windowHeight/80, fontFamily: 'Overpass-Regular', marginTop: windowWidth/140, color: '#18171c' }}>Покрытие  <Text style={{ opacity: 0.3 }}>...........................................................................................................</Text>  {data[0].pocryte}</Text>
                                    <Text style={{ fontSize: windowHeight/80, fontFamily: 'Overpass-Regular', marginTop: windowWidth/140, color: '#18171c' }}>Поверхность  <Text style={{ opacity: 0.3 }}>...........................................................................................................</Text>  {data[0].poverkhnost}</Text>
                                    <Text style={{ fontSize: windowHeight/80, fontFamily: 'Overpass-Regular', marginTop: windowWidth/140, color: '#18171c' }}>Вес  <Text style={{ opacity: 0.3 }}>...........................................................................................................</Text>  {data[0].weight_one}  кг</Text>
                                    <Text style={{ fontSize: windowHeight/80, fontFamily: 'Overpass-Regular', marginTop: windowWidth/140, color: '#18171c' }}>Размер  <Text style={{ opacity: 0.3 }}>...........................................................................................................</Text>  {data[0].size}</Text>
                                    <Text style={{ fontSize: windowHeight/80, fontFamily: 'Overpass-Regular', marginTop: windowWidth/140, color: '#18171c' }}>Толщина  <Text style={{ opacity: 0.3 }}>...........................................................................................................</Text>  {data[0].weight}</Text>
                                    <Text style={{ fontSize: windowHeight/80, fontFamily: 'Overpass-Regular', marginTop: windowWidth/140, color: '#18171c' }}>Упаковка (м²)  <Text style={{ opacity: 0.3 }}>...........................................................................................................</Text>  {data[0].col_m2_cub}</Text>
                                    <Text style={{ fontSize: windowHeight/80, fontFamily: 'Overpass-Regular', marginTop: windowWidth/140, color: '#18171c' }}>Эффект  <Text style={{ opacity: 0.3 }}>...........................................................................................................</Text>  {data[0].effect}</Text>
                                    <Text style={{ fontSize: windowHeight/80, fontFamily: 'Overpass-Regular', marginTop: windowWidth/140, color: '#18171c' }}>Тип товара  <Text style={{ opacity: 0.3 }}>...........................................................................................................</Text>  {data[0].type}</Text>
                                </View>
                            :null}
                            {data[0].subcategory_id == '21' ?
                                <View style={{ marginTop: windowHeight/50 }}>
                                    <Text style={{ fontSize: windowHeight/80, fontFamily: 'Overpass-Regular', marginTop: windowWidth/140, color: '#18171c' }}>Цвет  <Text style={{ opacity: 0.3 }}>...........................................................................................................</Text>  {data[0].palette}</Text>
                                    <Text style={{ fontSize: windowHeight/80, fontFamily: 'Overpass-Regular', marginTop: windowWidth/140, color: '#18171c' }}>Покрытие  <Text style={{ opacity: 0.3 }}>...........................................................................................................</Text>  {data[0].pocryte}</Text>
                                    <Text style={{ fontSize: windowHeight/80, fontFamily: 'Overpass-Regular', marginTop: windowWidth/140, color: '#18171c' }}>Поверхность  <Text style={{ opacity: 0.3 }}>...........................................................................................................</Text>  {data[0].poverkhnost}</Text>
                                    <Text style={{ fontSize: windowHeight/80, fontFamily: 'Overpass-Regular', marginTop: windowWidth/140, color: '#18171c' }}>Вес  <Text style={{ opacity: 0.3 }}>...........................................................................................................</Text>  {data[0].weight_one}  кг</Text>
                                    <Text style={{ fontSize: windowHeight/80, fontFamily: 'Overpass-Regular', marginTop: windowWidth/140, color: '#18171c' }}>Размер  <Text style={{ opacity: 0.3 }}>...........................................................................................................</Text>  {data[0].size}</Text>
                                    <Text style={{ fontSize: windowHeight/80, fontFamily: 'Overpass-Regular', marginTop: windowWidth/140, color: '#18171c' }}>Толщина  <Text style={{ opacity: 0.3 }}>...........................................................................................................</Text>  {data[0].weight}</Text>
                                    <Text style={{ fontSize: windowHeight/80, fontFamily: 'Overpass-Regular', marginTop: windowWidth/140, color: '#18171c' }}>Упаковка (м²)  <Text style={{ opacity: 0.3 }}>...........................................................................................................</Text>  {data[0].col_m2_cub}</Text>
                                    <Text style={{ fontSize: windowHeight/80, fontFamily: 'Overpass-Regular', marginTop: windowWidth/140, color: '#18171c' }}>Эффект  <Text style={{ opacity: 0.3 }}>...........................................................................................................</Text>  {data[0].effect}</Text>
                                    <Text style={{ fontSize: windowHeight/80, fontFamily: 'Overpass-Regular', marginTop: windowWidth/140, color: '#18171c' }}>Тип товара  <Text style={{ opacity: 0.3 }}>...........................................................................................................</Text>  {data[0].type}</Text>
                                </View>
                            :null}
                        </View>
                    :null}
                    {activePage == 2 ?
                        <View style={{ width: windowWidth, marginTop: windowHeight/60, paddingHorizontal: windowWidth/4.4 }}>
                            <View style={{ marginBottom: 20 }}>
                                <Text style={{ fontSize: windowHeight/55, fontFamily: 'Overpass-Regular', marginTop: windowWidth/450, color: '#18171c' }}>Отзывы</Text>
                            </View>

                            <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                <View style={{ width: '60%' }}>
                                    {dataComments && dataComments.map((items) => (
                                        <View>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: windowHeight/50 }}>
                                                <View style={{ width: windowWidth/40, height: windowWidth/40, backgroundColor: '#FFDBB1', borderRadius: 10000, alignItems: 'center', justifyContent: 'center' }}>
                                                    <Text style={{ fontSize: windowWidth/100, fontFamily: 'Overpass-Regular' }}>{items.name[0]}</Text>
                                                </View>
                                                <View style={{ marginLeft: 15 }}>
                                                    <Text style={{ color: '#000', fontSize: windowWidth/140, fontFamily: 'Overpass-Regular' }}>{items.name}</Text>
                                                </View>
                                            </View>
                                            <View style={{ marginTop: 15, marginLeft: 5 }}>
                                                <Text style={{ color: '#000', fontSize: windowWidth/170, fontFamily: 'Overpass-Regular' }}>Оценка: {items.like}</Text>
                                                <Text style={{ color: '#000', fontSize: windowWidth/190, marginTop: 10, opacity: 0.5, fontFamily: 'Overpass-Regular' }}>{new Date(items.created_at.seconds * 1000).getDate()} - {new Date(items.created_at.seconds * 1000).getUTCMonth()+1} - {new Date(items.created_at.seconds * 1000).getFullYear()}</Text>
                                                <Text style={{ color: '#000', fontSize: windowWidth/150, marginTop: 20, fontFamily: 'Overpass-Regular' }}>{items.comment}</Text>
                                            </View>
                                        </View>
                                    ))}
                                </View>
                                <View style={{ width: '40%' }}> 
                                    <Text style={{ color: '#000', fontSize: windowWidth/170, fontFamily: 'Overpass-Regular' }}>Оставьте отзыв</Text>
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
                                            value={comment}
                                            onChangeText={setComment}
                                            multiline={true}
                                            placeholder='Введите комментарий'
                                            placeholderTextColor={'gray'}
                                            style={{
                                                padding: windowWidth/250,
                                                borderRadius: windowWidth/450,
                                                color: '#000',
                                                backgroundColor: '#fff',
                                                height: windowHeight/10,
                                                borderWidth: 1,
                                                marginTop: windowHeight/100,
                                                borderColor: '#e7e7e7',
                                                width: windowWidth/6,
                                            }}
                                        />
                                        <Text style={{ color: '#000', fontSize: windowWidth/170, marginTop: windowHeight/90, fontFamily: 'Overpass-Regular' }}>Оцените товар от 0 до 5</Text>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }}>
                                            <TouchableOpacity onPress={() => setLike(1)} style={{ paddingVertical: windowWidth/250, paddingHorizontal: windowWidth/180, backgroundColor: like == 1 ? '#18171c' : '#f5f5f5', marginRight: windowWidth/350, marginTop: windowHeight/100, borderRadius: windowWidth/450 }}>
                                                <Text style={{ fontFamily: 'Overpass-Regular', fontSize: windowWidth/190, color: like == 1 ? '#fff' : '#000', marginTop: windowHeight/450 }}>1</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => setLike(2)} style={{ paddingVertical: windowWidth/250, paddingHorizontal: windowWidth/180, backgroundColor: like == 2 ? '#18171c' : '#f5f5f5', marginRight: windowWidth/350, marginTop: windowHeight/100, borderRadius: windowWidth/450 }}>
                                                <Text style={{ fontFamily: 'Overpass-Regular', fontSize: windowWidth/190, color: like == 2 ? '#fff' : '#000', marginTop: windowHeight/450 }}>2</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => setLike(3)} style={{ paddingVertical: windowWidth/250, paddingHorizontal: windowWidth/180, backgroundColor: like == 3 ? '#18171c' : '#f5f5f5', marginRight: windowWidth/350, marginTop: windowHeight/100, borderRadius: windowWidth/450 }}>
                                                <Text style={{ fontFamily: 'Overpass-Regular', fontSize: windowWidth/190, color: like == 3 ? '#fff' : '#000', marginTop: windowHeight/450 }}>3</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => setLike(4)} style={{ paddingVertical: windowWidth/250, paddingHorizontal: windowWidth/180, backgroundColor: like == 4 ? '#18171c' : '#f5f5f5', marginRight: windowWidth/350, marginTop: windowHeight/100, borderRadius: windowWidth/450 }}>
                                                <Text style={{ fontFamily: 'Overpass-Regular', fontSize: windowWidth/190, color: like == 4 ? '#fff' : '#000', marginTop: windowHeight/450 }}>4</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => setLike(5)} style={{ paddingVertical: windowWidth/250, paddingHorizontal: windowWidth/180, backgroundColor: like == 5 ? '#18171c' : '#f5f5f5', marginRight: windowWidth/350, marginTop: windowHeight/100, borderRadius: windowWidth/450 }}>
                                                <Text style={{ fontFamily: 'Overpass-Regular', fontSize: windowWidth/190, color: like == 5 ? '#fff' : '#000', marginTop: windowHeight/450 }}>5</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <TouchableOpacity onPress={() => addComment()} style={{ padding: windowWidth/200, backgroundColor: '#242424', width: '40%', marginTop: windowHeight/80, alignItems: 'center', justifyContent: 'center', borderRadius: windowWidth/450  }}>
                                            <Text style={{ color: '#fff', fontSize: windowWidth/180, marginTop: windowWidth/650, fontFamily: 'Overpass-Regular' }}>Отправить отзыв</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                    :null}
                </>
                :null}
                {activePage !== 2 ?
                    <HomeGoods title={'Популярные товары'} data={dataPopular} />
                :null}
                <View style={{ marginTop: windowHeight/15 }}>
                    <Footer />
                </View>
            </ScrollView>
            :(
                <View>
                    <HeaderDefaoult />
                    <MaterialIndicator size={24} color='#000' />
                </View>
            )}
        </View>
    );
}


