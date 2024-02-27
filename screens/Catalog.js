import { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions, ImageBackground, TouchableOpacity, Image } from 'react-native';
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
import { AuthContext } from '../providers/AuthProvider';



export default function Catalog() {

    let params = useParams();
    const navigate = useNavigate();


    const [loader, setLoader] = useState(false);
    const [dataCatalog, setDataCatalog] = useState([]);
    const [dataSubCatalog, setDataSubCatalog] = useState([]);
    
    const getCatalog = async () => {
        const q = query(collection(db, "category"));
        const querySnapshot = await getDocs(q);
        const itemsList = [];
        querySnapshot.forEach(async (docer) => {
            var d = docer.data();
            itemsList.push(d);
        })
        setDataCatalog(itemsList);
        getSubCatalog();
    }

    const getSubCatalog = async () => {
        const q = query(collection(db, "subcategory"));
        const querySnapshot = await getDocs(q);
        const itemsList = [];
        querySnapshot.forEach(async (docer) => {
            var d = docer.data();
            itemsList.push(d);
        })
        setDataSubCatalog(itemsList);
        setLoader(false);
    }


    useEffect(() => {
        setLoader(true);
        getCatalog();
    }, [])
    


    const [hoverCat, setHoverCat] = useState(0);


    return (
        <View>
            <Helmet>
                <html lang="en" />
                <title>Каталог - Homegeom</title>
                <meta name="description" content="Tutorial for React Helmet" />
                <meta name="theme-color" content="#E6E6FA" />
            </Helmet>
            <HeaderDefaoult />
            <HeaderSmall title={'Каталог'} />
            {loader == false ?
                <View style={{ marginTop: windowHeight/40, paddingHorizontal: windowWidth/4.4, width: windowWidth }}>
                    <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                    
                        {dataCatalog &&  dataCatalog.map((item, index) => (
                            <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginTop: windowHeight/60 }}>
                                <View>
                                    <Image style={{ width: windowWidth/35, height: windowWidth/35 }} source={{ uri: item.image }} />
                                </View>
                                <View style={{ marginLeft: windowWidth/70, width: '70%' }}>
                                    <View>
                                        <Text style={{ fontSize: windowHeight/65, fontFamily: 'Overpass-Regular', color: '#18171c' }}>{item.title}</Text>
                                    </View>
                                    {dataSubCatalog && dataSubCatalog.map((i) => i.id_category == item.id ? (
                                        <TouchableOpacity onPress={() => navigate(`/goods/subcategory/${i.id}/${i.title}`)} onMouseEnter={() => setHoverCat(i.id)} onMouseLeave={() => setHoverCat(0)} style={{ marginTop: windowHeight/90 }}>
                                            <Text style={{ fontSize: windowHeight/85, fontFamily: 'Overpass-Regular', color: hoverCat == i.id ? '#0075FF' : '#18171c' }}>{i.title}</Text>
                                        </TouchableOpacity>
                                    ):null)}
                                    {/* <TouchableOpacity style={{ marginTop: windowHeight/90, paddingVertical: windowWidth/300, width: windowWidth/30, alignItems: 'center', justifyContent: 'center', borderRadius: windowWidth/450, backgroundColor: '#F2F3F5' }}>
                                        <Text style={{ fontSize: windowHeight/85, fontFamily: 'Overpass-Regular', color: '#18171c' }}>Еще</Text>
                                    </TouchableOpacity> */}
                                </View>
                            </View>
                        ))}
                        
                    </View>
                </View>
            :(
                <MaterialIndicator size={24} color='#000' />
            )}
        </View>
    );
}


