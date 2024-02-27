import { StatusBar } from 'expo-status-bar';
import { useRef, useState } from 'react';
import { StyleSheet, Text, View, Dimensions, Image, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import { Routes, Route, Outlet, Link, useNavigate } from "react-router-dom";


//global variables
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;



export default function CategoryBanners({ data }) {

  const [hoverCatalog, setHoverCatalog] = useState(false);
  const navigate = useNavigate();
  const scrollviewRef = useRef(null);
  const [scroll, setScroll] = useState(0);
  const [count, setCount] = useState(0);

  const next = () => {
    if(count < data.length - 2) {
      scrollviewRef.current.scrollTo({ x: scroll + windowWidth/9 });
      setScroll(scroll + windowWidth/9);
      setCount(count + 1);
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
    <View style={{ width: windowWidth, paddingHorizontal: windowWidth/4.4, marginTop: windowHeight/50}}>
      <ScrollView ref={scrollviewRef} horizontal showsHorizontalScrollIndicator={false} style={{ zIndex: 999999 }}>
        {data && data.map((item, index) => item.id == '1' ? (
          <TouchableOpacity onPress={() => navigate(`/poder/${item.title}/${item.category_id}/${item.id}/${JSON.stringify(item.goods)}`)} style={{ height: windowWidth/12, marginRight: windowWidth/150, width: windowWidth/7, backgroundColor: item.background, borderRadius: windowWidth/450 }}>
            <Image source={{ uri: item.image }} style={{ width: windowWidth/7, borderRadius: windowWidth/450, height: windowWidth/12 }} />
          </TouchableOpacity>
        ):null)}
        {data && data.map((item, index) => item.id !== '1' ? (
          <TouchableOpacity onPress={() => navigate(`/poder/${item.title}/${item.category_id}/${item.id}/${JSON.stringify(item.goods)}`)} style={{  height: windowWidth/12, width: windowWidth/10, marginRight: windowWidth/150, backgroundColor: item.background, borderRadius: windowWidth/450 }}>
            <Image source={{ uri: item.image }} style={{  height: windowWidth/12, width: windowWidth/10, borderRadius: windowWidth/450 }} />
          </TouchableOpacity>
        ):null)}
      </ScrollView>
      <View style={{ position: 'absolute', left: -windowWidth/30, right: -windowWidth/30, paddingHorizontal: windowWidth/4.4, zIndex: 2, height: windowWidth/12 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          {count > 0 ?
          <TouchableOpacity style={{ height: windowWidth/12, zIndex: 999, alignItems: 'center', justifyContent: 'center' }} onPress={() => prev()}>
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
          <TouchableOpacity style={{ height: windowWidth/12, zIndex: 999, alignItems: 'center', justifyContent: 'center' }} onPress={() => next()}>
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


