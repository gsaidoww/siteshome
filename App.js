import { StyleSheet, Text, View } from 'react-native';
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import { useFonts } from 'expo-font';

//providers
import { AuthProvider } from './providers/AuthProvider';
import { CitiesProvider } from './providers/CitiesProvider';
import { BasketProvider } from './providers/BasketProvider';

import './style/main.css';

//screens
import Home from './screens/Home';
import Catalog from './screens/Catalog';
import Search from './screens/Search';
import Cities from './screens/Cities';
import Goods from './screens/Goods';
import GoodItem from './screens/GoodItem';
import Cart from './screens/Cart';
import Order from './screens/Order';
import Gallery from './screens/Gallery';
import GalleryItem from './screens/GalleryItem';
import Poder from './screens/Poder';
import OrderSuccess from './screens/OrderSucces';
import Linker from './screens/Linker';



export default function App() {

  const [fontsLoaded, fontError] = useFonts({
    'Overpass-Bold': require('./assets/fonts/Overpass-Bold.ttf'),
    'Overpass-ExtraBold': require('./assets/fonts/Overpass-ExtraBold.ttf'),
    'Overpass-Medium': require('./assets/fonts/Overpass-Medium.ttf'),
    'Overpass-Regular': require('./assets/fonts/Overpass-Regular.ttf'),
    'Overpass-SemiBold': require('./assets/fonts/Overpass-SemiBold.ttf'),
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <Router>
      <ProviderApp />
    </Router>
  );
}



function ProviderApp() {
  return(
    <AuthProvider>
      <CitiesProvider>
        <BasketProvider>
          <Routes>
            <Route index path="/" element={<Home />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/search" element={<Search />} />
            <Route path="/cities" element={<Cities />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/galleryitem/:title/:id" element={<GalleryItem />} />
            <Route path="/order/:transer/:urface" element={<Order />} />
            <Route path="/goods/:category/:id/:title" element={<Goods />} />
            <Route path="/goodsItem/:id" element={<GoodItem />} />
            <Route path="/poder/:title/:category/:id/:goods" element={<Poder />} />
            <Route path="/success" element={<OrderSuccess />} />
            <Route path="/linker/:title" element={<Linker />} />
          </Routes>
        </BasketProvider>
      </CitiesProvider>
    </AuthProvider>
  );
}

