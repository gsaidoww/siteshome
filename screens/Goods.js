import { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions, ImageBackground, TextInput, TouchableOpacity, Image } from 'react-native';
import { MaterialIndicator } from 'react-native-indicators';
import { useNavigate, useParams } from "react-router-dom";
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
import { BasketContext } from '../providers/BasketProvider';


export default function Goods() {

    let params = useParams();
    const navigate = useNavigate();
    const { dataCart, dataCartIders, addCart, addAmount, delAmount } = useContext(BasketContext);

    const [loader, setLoader] = useState(false);
    const [data, setData] = useState([]);
    const [filters, setFilters] = useState([]); 
    const [dataT, setDataT] = useState([]); 

    const getGoods = async () => {
        const q = query(collection(db, "goods"), where("subcategory_id", "==", params.id));
        const querySnapshot = await getDocs(q);
        const itemsList = [];
        querySnapshot.forEach(async (docer) => {
            var d = docer.data();
            itemsList.push(d);
        })
        setLoader(false);
        setDataT(itemsList);
        setData(itemsList);
    }

    const filtered = (d) => {
        const filtersObj = {};
        d.forEach(filter => {
            filtersObj[filter.type] = filter.value;
        });
        const filteredProducts = dataT.filter(product => {
            for (const key in filtersObj) {
                if (!product.hasOwnProperty(key) || product[key] !== filtersObj[key]) {
                    return false;
                }
            }
            console.log(product);
            return true;
        });
        setData(filteredProducts);
        console.log(filteredProducts);
    }

    useEffect(() => {
        getFilters(params.id);
        getGoods();
    }, [])
    

    const [price, setPrice] = useState('');
    const [mark, setMark] = useState('');


    const getFilters = async (i) => {
        const q = query(collection(db, "filters"), where("id_subcategory", "==", i));
        const querySnapshot = await getDocs(q);
        const itemsList = [];
        querySnapshot.forEach(async (docer) => {
            var d = docer.data();
            itemsList.push(d);
        })
        setFilters(itemsList);
        console.log(itemsList);
    }


      const [filterData, setFilterData] = useState([]); 

      const addFilterData = (type, value) => {
        const newData = [...filterData]; // Создаем копию массива filterData
    
        // Проверяем, есть ли уже объект со значением value и типом type в массиве
        const existingIndex = newData.findIndex(item => item.type === type);
    
        if (existingIndex !== -1) {
            // Если объект существует, заменяем его новыми данными
            console.log(existingIndex);
            newData[existingIndex] = { type: type, value: value }; // Замените newParameter на параметр, который вы хотите изменить

            const existingIndex2 = filterData.findIndex(item => item.value === value);
            if (existingIndex2 !== -1) {
                newData.splice(existingIndex2, 1);
            }
        } else {
            // Если объект не существует, добавляем его в массив
            newData.push({ type, value, value: value }); // Замените newParameter на параметр, который вы хотите добавить
        }
    
        setFilterData(newData);
        filtered(newData);
         // Обновляем состояние filterData
      };
      
    const checkFilters = (product) => {
        for (const filter of filters) {
            if (filter.type === 'size' && !filter.data.includes(product.size)) {
                return false;
            }
            if (filter.type === 'weight' && !filter.data.includes(String(product.weight))) {
                return false;
            }
        }
        return true;
    };

    const [hoverCat, setHoverCat] = useState(0);


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
                    <View style={{ marginTop: windowHeight/40, paddingHorizontal: windowWidth/4.4, width: windowWidth, flexDirection: 'row', alignItems: 'flex-start' }}>

                        <View style={{ width: windowWidth/9, minHeight: windowHeight/2 }}>

                            {dataT.length > 0 ?
                                <View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <Text style={{ fontFamily: 'Overpass-Regular', fontSize: windowWidth/150 }}>Марка</Text>
                                    </View>
                                    <View style={{ marginTop: windowHeight/100 }}>
                                        <select onChange={(e) => setMark(e.target.value)} style={{ padding: windowWidth/180, border: 'none', backgroundColor: '#f5f5f5', borderRadius: 4, fontSize: windowWidth/170 }}>
                                            <option value="">Выберите марку</option>
                                            {dataT.map((item) => (
                                                <option value={item.mark}>{item.mark}</option>
                                            ))}
                                        </select>
                                    </View>
                                </View>
                            :null}


                            
                            {filters && filters.map((item) => (
                            <View style={{ marginTop: windowHeight/50 }}>
                                <View>
                                    <Text style={{ fontFamily: 'Overpass-Regular', fontSize: windowWidth/150 }}>{item.name}</Text>
                                </View>
                                <View style={{ marginTop: windowHeight / 100, flexDirection: 'row', flexWrap: 'wrap' }}>
                                    {item.data.map((i) => {
                                        const isSelected = filterData.some(dataItem => dataItem.type === item.type && dataItem.value === i);
                                        const backgroundColor = isSelected ? '#000' : '#f5f5f5'; // Черный цвет, если выбрано, иначе null
                                        const color = isSelected ? '#fff' : '#000'; // Белый цвет текста, если выбрано, иначе черный
                                        return (
                                        <TouchableOpacity key={i} onPress={() => addFilterData(item.type, i)} style={{ paddingVertical: windowWidth/250, paddingHorizontal: windowWidth/180, backgroundColor: backgroundColor, marginRight: windowWidth/350, marginTop: windowHeight/150, borderRadius: windowWidth/450 }}>
                                            <Text style={{ fontSize: windowWidth / 180, color }}>{i}</Text>
                                        </TouchableOpacity>
                                        );
                                    })}
                                </View>
                            </View>
                            ))}

                        </View>
                        
                        <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginTop: -windowHeight/35, flexWrap: 'wrap', marginLeft: windowWidth/95, width: windowWidth/2.2 }}>
                            {data && data.map((item, index) => item.mark == (mark !== '' ? mark : item.mark) ? (
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
                                            {item.old_price !== '' ?
                                                <View style={{ marginTop: windowHeight/60 }}>
                                                    <Text style={{ fontSize: windowWidth/170, opacity: 0.6, fontFamily: 'Overpass-SemiBold', textDecorationLine: 'line-through', textDecorationStyle: 'solid', }}>{item.old_price} ₽/м²</Text>
                                                </View>
                                            :null}
                                            <View style={{ marginTop: windowHeight/120 }}>
                                                <Text style={{ fontSize: windowWidth/130, fontFamily: 'Overpass-SemiBold' }}>{item.price} ₽/м²</Text>
                                            </View>
                                            {dataCartIders.includes(item.id) == true ?
                                                <View style={{ marginTop: windowHeight/90, width: '80%' }}>
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
                                                <View style={{ marginTop: windowHeight/90, width: '80%' }}>
                                                    <TouchableOpacity onPress={() => addCart(item, 1)} style={{ padding: windowWidth/200, backgroundColor: '#242424', alignItems: 'center', justifyContent: 'center', borderRadius: windowWidth/450  }}>
                                                        <Text style={{ color: '#fff', fontSize: windowWidth/180, marginTop: windowWidth/650, fontFamily: 'Overpass-Regular' }}>В корзину</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            )}
                                        </View>
                                    </View>
                                </View>
                            ):null)}
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


