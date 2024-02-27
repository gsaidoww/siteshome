import { StatusBar } from 'expo-status-bar';
import { useContext, useRef, useState } from 'react';
import { StyleSheet, Text, View, Dimensions, Image, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import { Routes, Route, Outlet, Link, useNavigate } from "react-router-dom";
import { BasketContext } from '../../providers/BasketProvider';


//global variables
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;



export default function HomeGoods({ title, data }) {

  const [hoverCatalog, setHoverCatalog] = useState(false);
  const { dataCart, dataCartIders, addCart, addAmount, delAmount } = useContext(BasketContext);
  const navigate = useNavigate();

  const scrollviewRef = useRef(null);
  const [scroll, setScroll] = useState(0);
  const [count, setCount] = useState(0);

  const next = () => {
    if(count < data.length - 2) {
      if(data.length > 6) {
        scrollviewRef.current.scrollTo({ x: scroll + windowWidth/9 });
        setScroll(scroll + windowWidth/9);
        setCount(count + 1);
      }
    }
  }
  const prev = () => {
    if(scroll > 0) {
      scrollviewRef.current.scrollTo({ x: scroll - windowWidth/9 });
      setScroll(scroll - windowWidth/9);
      setCount(count - 1);
    }
  }
  

  return (
    <View style={{ width: windowWidth, paddingHorizontal: windowWidth/4.4, marginTop: windowHeight/30 }}>
        <View style={{ marginBottom: 20 }}>
            <Text style={{ fontSize: windowHeight/55, fontFamily: 'Overpass-Regular', marginTop: windowWidth/450, color: '#18171c' }}>{title}</Text>
            <TouchableOpacity onPress={() => navigate(`/linker/${title}`)} style={{ marginTop: 10 }}>
                <Text style={{ fontSize: windowHeight/80, opacity: 0.5 }}>Смотреть все</Text>
            </TouchableOpacity>
        </View>

        <ScrollView ref={scrollviewRef} horizontal showsHorizontalScrollIndicator={false} style={{ zIndex: 999999 }}>
            {data && data.map((item, index) => (
                <View style={{ height: windowHeight/2.7, width: windowWidth/10.5, marginRight: windowWidth/95, marginTop: windowHeight/45, borderRadius: windowWidth/450 }}>
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
                            <View>
                                <Text style={{ fontSize: windowWidth/170, opacity: 0.6, fontFamily: 'Overpass-SemiBold', textDecorationLine: 'line-through', textDecorationStyle: 'solid', }}>{item.old_price} ₽/м²</Text>
                            </View>
                            :null}
                            <View style={{ marginTop: windowHeight/140 }}>
                                <Text style={{ fontSize: windowWidth/130, fontFamily: 'Overpass-SemiBold' }}>{item.price} ₽/м²</Text>
                            </View>
                            {dataCartIders.includes(item.id) == true ?
                                <View style={{ marginTop: windowHeight/150, width: '80%' }}>
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
                                <View style={{ marginTop: windowHeight/150, width: '80%' }}>
                                    <TouchableOpacity onPress={() => addCart(item, 1)} style={{ padding: windowWidth/200, backgroundColor: '#242424', alignItems: 'center', justifyContent: 'center', borderRadius: windowWidth/450  }}>
                                        <Text style={{ color: '#fff', fontSize: windowWidth/180, marginTop: windowWidth/650, fontFamily: 'Overpass-Regular' }}>В корзину</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                        </View>
                    </View>
                </View>
            ))}
        </ScrollView>
        <View style={{ position: 'absolute', left: -windowWidth/30, top: windowHeight/15, right: -windowWidth/30, paddingHorizontal: windowWidth/4.4, zIndex: 2, height: windowHeight/3.2 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            {count > 0 ?
            <TouchableOpacity style={{ height: windowHeight/2.8, alignItems: 'center', justifyContent: 'center' }} onPress={() => prev()}>
                <View style={{ width: windowWidth/50, height: windowWidth/50, alignItems: 'center', justifyContent: 'center', borderRadius: 1000, backgroundColor: '#f5f5f5', borderWidth: 1, borderColor: '#e7e7e7' }}>
                <svg width={windowWidth/120} height={windowWidth/120} style={{ marginLeft: -2 }} viewBox="0 0 18 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_4_529)">
                    <path d="M13.2447 16.8983C13.2951 16.9551 13.2951 17.0407 13.2447 17.0975L11.9172 18.5921C11.8887 18.6241 11.8479 18.6425 11.805 18.6425C11.7621 18.6425 11.7213 18.6241 11.6929 18.5921L4.26786 10.2325C4.21739 10.1757 4.21739 10.0901 4.26786 10.0333L11.6929 1.67364C11.7213 1.64159 11.7621 1.62325 11.805 1.62325C11.8479 1.62325 11.8887 1.64159 11.9172 1.67364L13.2447 3.16824C13.2951 3.22506 13.2951 3.31064 13.2447 3.36746L7.23563 10.1329L13.2447 16.8983Z" fill="#181818" stroke="#181818" stroke-width="0.3" stroke-linecap="round" stroke-linejoin="round"/>
                    </g>
                    <defs>
                    <clipPath id="clip0_4_529">
                    <rect width="18" height="20.2657" fill="#181818" transform="matrix(-1 0 0 1 18 0)"/>
                    </clipPath>
                    </defs>
                </svg>
                </View>
            </TouchableOpacity>
            :(<View></View>)}
            <TouchableOpacity style={{ height: windowHeight/2.8, alignItems: 'center', justifyContent: 'center' }} onPress={() => next()}>
                <View style={{ width: windowWidth/50, height: windowWidth/50, alignItems: 'center', justifyContent: 'center', borderRadius: 1000, backgroundColor: '#f5f5f5', borderWidth: 1, borderColor: '#e7e7e7' }}>
                <svg width={windowWidth/120} height={windowWidth/120} viewBox="0 0 18 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_4_529)">
                    <path d="M4.75534 16.8983C4.70488 16.9551 4.70488 17.0407 4.75534 17.0975L6.08284 18.5921C6.11131 18.6241 6.15213 18.6425 6.19499 18.6425C6.23786 18.6425 6.27868 18.6241 6.30714 18.5921L13.7321 10.2325C13.7826 10.1757 13.7826 10.0901 13.7321 10.0333L6.30714 1.67364C6.27868 1.64159 6.23786 1.62325 6.19499 1.62325C6.15213 1.62325 6.11131 1.64159 6.08284 1.67364L4.75534 3.16824C4.70488 3.22506 4.70488 3.31064 4.75534 3.36746L10.7644 10.1329L4.75534 16.8983Z" fill="#181818" stroke="#181818" stroke-width="0.3" stroke-linecap="round" stroke-linejoin="round"/>
                    </g>
                    <defs>
                    <clipPath id="clip0_4_529">
                    <rect width="18" height="20.2657" fill="#181818"/>
                    </clipPath>
                    </defs>
                </svg>
                </View>
            </TouchableOpacity>
            </View>
        </View>
    </View>
  );
}


