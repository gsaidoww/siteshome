import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity } from 'react-native';
import { Routes, Route, Outlet, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


//global variables
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

//components




export default function HeaderSmall({ title, screen, back }) {
    
  const navigate = useNavigate();
  const [hoverCatalog, setHoverCatalog] = useState(false);
  const [hoverCity, setHoverCity] = useState(false);
  const [hoverCart, setHoverCart] = useState(false);

  return (
    <View style={{ width: windowWidth, height: windowHeight/10, justifyContent: 'center', paddingHorizontal: windowWidth/4.4 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View>
                <Text style={{ fontSize: windowHeight/45, fontFamily: 'Overpass-Regular', color: '#18171c' }}>{title}</Text>
                <TouchableOpacity onPress={() => navigate('/')}>
                    <Text style={{ fontSize: windowHeight/85, opacity: 0.5, marginTop: windowHeight/90, fontFamily: 'Overpass-Regular', color: '#18171c' }}>Главная / {title}</Text>
                </TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity onPress={() => back == null ? navigate('/') : navigate(back)} onMouseEnter={() => setHoverCart(true)} onMouseLeave={() => setHoverCart(false)} style={{ alignItems: 'center', backgroundColor: hoverCart == true ? '#f5f5f5' : '#fff', paddingVertical: windowWidth/180, paddingHorizontal: windowWidth/180, borderRadius: 10000 }}>
                    <svg width={windowWidth/90} height={windowWidth/90} viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_11_717)">
                        <path d="M26.9168 9.08084L24.9193 7.08334L17.0002 15.0025L9.081 7.08334L7.0835 9.08084L15.0027 17L7.0835 24.9192L9.081 26.9167L17.0002 18.9975L24.9193 26.9167L26.9168 24.9192L18.9977 17L26.9168 9.08084Z" fill="#323232"/>
                        </g>
                        <defs>
                        <clipPath id="clip0_11_717">
                        <rect width="34" height="34" fill="white"/>
                        </clipPath>
                        </defs>
                    </svg>
                </TouchableOpacity>
            </View>
        </View>
    </View>
  );
}


