import React, { useContext, useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import BackgroundDashboard from '../../components/Backgrounddash';
import Ionicons from 'react-native-vector-icons/MaterialIcons';
import { AxiosContext } from '../../context/AxiosContext';
import { Dimensions } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

  const { width, height } = Dimensions.get('window');
  const cardWidth = width * 0.4; // 40% of screen width
  const summaryWidth = width * 0.9; // 90% of screen width

function Dashboardkandang({ navigation }) {

  const axiosContext = useContext(AxiosContext)
  const [ Dasboard, setDasboard] = useState([])

  const getData = ()=>{
    axiosContext.authAxios.get(`/api/v1/dashboard`)
    .then(res => {
      console.log("data = ", res.data)
      setDasboard(res.data)
    })
    .catch((err) =>{
      console.error(err)
    })
  }

  const formatAmountWithDots = (value) => {
    if (!value) return '0'; // Handle empty or undefined value
    const onlyNumbers = value.toString().replace(/[^0-9]/g, ''); // Ensure only numeric characters
    if( value < 0 )
      return '-'+onlyNumbers.replace(/\B(?=(\d{3})+(?!\d))/g, '.'); // Add dots every 3 digits
    return onlyNumbers.replace(/\B(?=(\d{3})+(?!\d))/g, '.'); // Add dots every 3 digits
  };

  // useEffect(() =>{
  //   getData()
  //   console.log("Dashboard = ", Dasboard)
  // },[])
  useFocusEffect(
    useCallback(() => {
      getData(); // Memanggil API saat tab difokuskan
    }, [])
  );
  
  return (
    <BackgroundDashboard>
      {/* <View style={{ alignItems: 'center', width: 400,}}> */}
      <ScrollView contentContainerStyle={{ alignItems: 'center', width: 405,height:800 }}>
        <LinearGradient
          colors={['#FFD365', '#179574']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 0.2 }}
          style={styles.background} // Applied styles heres
        >
          <View style={styles.topp}>
            <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('ListFeedsUse', {item:8})}>
              <LinearGradient
                colors={['#F8CE5A', '#F3B93D']}
                style={styles.gradientBackground}
              >
                <View style={styles.iconContainer}>
                  <Image
                    source={require('../assets/Vector.png')} // Add your egg icon image here
                    style={styles.icon}
                  />
                </View>
                <View style={styles.arrrow}>
                  <Text style={styles.text}>Stok Pakan</Text>
                  <Ionicons
                    name="arrow-forward"
                    size={24}
                    color="white"
                    style={styles.arrowIcon}
                  />
                </View>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity style={styles.card1} onPress={() => navigation.navigate('DaftarPenjualanTelur',{item:8})}>
              <LinearGradient
                colors={['#F8CE5A', '#F3B93D']}
                style={styles.gradientBackground}
              >
                <View style={styles.iconContainer}>
                  <Image
                    source={require('../assets/telur.png')} // Add your egg icon image here
                    style={styles.icon}
                  />
                </View>
                <View style={styles.arrrow}>
                  <Text style={styles.text}>Penjualan</Text>
                  <Ionicons
                    name="arrow-forward"
                    size={24}
                    color="white"
                    style={styles.arrowIcon}
                  />
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          <View style={styles.topp}>
            <TouchableOpacity style={styles.card} onPress={() =>navigation.navigate('ListQuailReduction', {item:8})}>
              <LinearGradient
                colors={['#F8CE5A', '#F3B93D']}
                style={styles.gradientBackground}
              >
                <View style={styles.iconContainer}>
                  <Image
                    source={require('../assets/kan.png')} // Add your egg icon image here
                    style={styles.icon}
                  />
                </View>

                <View style={styles.arrrow}>
                  <Text style={styles.text}>Afkir Ternak</Text>
                  <Ionicons
                    name="arrow-forward"
                    size={24}
                    color="white"
                    style={styles.arrowIcon}
                  />
                </View>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity style={styles.card1} onPress={() => navigation.navigate('ListOperational', {itemp:8})}>
              <LinearGradient
                colors={['#F8CE5A', '#F3B93D']}
                style={styles.gradientBackground}
              >
                <View style={styles.iconContainer}>
                  <Image
                    source={require('../assets/catatan.png')} // Add your egg icon image here
                    style={styles.icon}
                  />
                </View>
                <View style={styles.arrrow}>
                  <Text style={styles.text}>Operasional</Text>
                  <Ionicons
                    name="arrow-forward"
                    size={24}
                    color="white"
                    style={styles.arrowIcon}
                  />
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </View>
          {/* <View style={styles.summary}> */}
            <ScrollView style={styles.summary}>

            <Text style={styles.TextSummary}>Ringkasan</Text>
            <View style={styles.summaryItem}>
              <Text style={styles.label}>Keuntungan</Text>
              <Text style={styles.value}>{formatAmountWithDots(Dasboard.profit)}</Text>
            </View>

            <View style={styles.summaryItem}>
              <Text style={styles.label}>Ternak</Text>
              <Text style={styles.value}>{formatAmountWithDots(Dasboard.livestock)} Ekor</Text>
            </View>

            <View style={styles.summaryItem}>
              <Text style={styles.label}>Pakan</Text>
              <Text style={styles.value}>{formatAmountWithDots(Dasboard.feed)} Kg</Text>
            </View>

            <View style={styles.summaryItem}>
              <Text style={styles.label}>Telur</Text>
              <Text style={styles.value}>{formatAmountWithDots(Dasboard.egg)} Butir</Text>
            </View>

          {/* </View> */}
          </ScrollView>
        </LinearGradient>
      {/* </View> */}
      </ScrollView>
    </BackgroundDashboard>
  );
}

export default Dashboardkandang;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 1,
    backgroundColor: '#fff',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1B9673',
  },
  icon: {
    width: 30,
    height: 30,
    marginTop: 10,
  },
  baground: {
    position: 'absolute',
    width: 390,
    height: 1634,
    left: '50%',
    marginLeft: -195,
    top: 184,
    backgroundColor: '#FFD365',
    borderRadius: 15,
  },
  background: {
    position: 'absolute',
    width: 410,
    height: 1634,
    left: '50%',
    marginLeft: -200,
    top: 120,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  topp:{
    flexDirection: 'row',  // Align child elements in a row
    justifyContent: 'space-between',  // Optional: Adjust spacing between elements
    alignItems: 'center',  // Optional: Align items vertically
    top:-70
  },
   headerr: {
    marginBottom: 20,
  },
  titlee: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2D9CDB', // Green-ish color similar to the image
    alignItems:'center',
    textAlign:'center'
  },
  date: {
    fontSize: 14,
    color: '#F2C94C', // Yellow-ish color for the date
    marginTop: 5,
  },
  summary: {
    width: summaryWidth,
    alignSelf: 'center',
    minHeight: height * 0.2, // Adjusted height to be more dynamic
    maxHeight: height * 0.3, // Prevent summary from filling the whole screen
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginTop: -60, // Move it further up
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#E0E0E0',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  value: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'right',
  },
  card: {
    width: cardWidth,
    height: 125,
    borderRadius: 15,
    overflow: 'hidden',
    margin: 10,
    elevation: 5, // shadow for Android
    shadowColor: '#000', // shadow for iOS
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  card1: {
    width: cardWidth,
    height: 125,
    borderRadius: 15,
    overflow: 'hidden',
    margin: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  gradientBackground: {
    flex: 1,
    padding: 15,
    justifyContent: 'space-between',
    borderRadius: 15,
  },
  iconContainer: {
    alignItems: 'center',
  },
  icon: {
    width: 50,
    height: 50,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  arrowIcon: {
    alignSelf: 'flex-end',
  },
  arrrow: {
    flexDirection: 'row',  // Align child elements in a row
    justifyContent: 'space-between',  // Optional: Adjust spacing between elements
    // alignItems: 'center', 
  },
  TextSummary:{
    color: 'green',
    fontWeight: 'bold',
    fontSize: 23,
    borderBottomWidth: 2,
    borderBottomColor: 'green',
    marginBottom:20
  }

});
