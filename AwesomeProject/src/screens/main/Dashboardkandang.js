import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import BackgroundDashboard from '../../components/Backgrounddash';
import Ionicons from 'react-native-vector-icons/MaterialIcons';
import { AxiosContext } from '../../context/AxiosContext';

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

  useEffect(() =>{
    getData()
    console.log("Dashboard = ", Dasboard)
  },[])
  return (
    <BackgroundDashboard>
      <View style={{ alignItems: 'center', width: 400,}}>
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
            <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('DaftarPenjualanTelur',{item:8})}>
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
            <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('ListOperational', {itemp:8})}>
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

            <View style={styles.summaryItem}>
              <Text style={styles.label}>Keuntungan</Text>
              <Text style={styles.value}>{formatAmountWithDots(Dasboard.profit)}</Text>
            </View>

            {/* <View style={styles.summaryItem}>
              <Text style={styles.label}>Uang Masuk</Text>
              <Text style={styles.value}>{formatAmountWithDots(Dasboard.income)}</Text>
            </View> */}

            {/* <View style={styles.summaryItem}>
              <Text style={styles.label}>Uang Keluar</Text>
              <Text style={styles.value}>{formatAmountWithDots(Dasboard.cost)}</Text>
            </View> */}

            <View style={styles.summaryItem}>
              <Text style={styles.label}>Ternak</Text>
              <Text style={styles.value}>{formatAmountWithDots(Dasboard.livestock)}</Text>
            </View>

            <View style={styles.summaryItem}>
              <Text style={styles.label}>Pakan</Text>
              <Text style={styles.value}>{formatAmountWithDots(Dasboard.feed)} Kg</Text>
            </View>

            <View style={styles.summaryItem}>
              <Text style={styles.label}>Telur</Text>
              <Text style={styles.value}>{formatAmountWithDots(Dasboard.egg)}</Text>
            </View>

          {/* </View> */}
          </ScrollView>
        </LinearGradient>
      </View>
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
    top: 140,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  stokPakan:{
    position: 'absolute',
    width: 148,
    height: 105,
    left: 35,
    top: -50,
    borderRadius: 10,
    backgroundColor: '#FFD365', // Assuming a default background color
    shadowColor: '#000',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5, // Required for Android to apply shadow
  },
  topp:{
    flexDirection: 'row',  // Align child elements in a row
    justifyContent: 'space-between',  // Optional: Adjust spacing between elements
    alignItems: 'center',  // Optional: Align items vertically
    top:-70
    // padding: 10,  // Optional: Add padding to the container
    // backgroundColor: '#FCDE70',  // Optional: Set background color
  },
  stokPakan1:{
    // flex: 1,  // Adjust size of each element
    // marginRight: 10,  // Add margin to the right for spacing between elements
    // backgroundColor: '#cce7ff',  // Optional: Set background color for the element
    position: 'absolute',
    width: 148,
    height: 105,
    left: 200,
    top: -50,
    borderRadius: 10,
    backgroundColor: '#FFD365',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5, // Required for Android to apply shadow
   },
   stokPakan3:{
    position: 'absolute',
    width: 148,
    height: 105,
    left: 35,
    top: 80,
    borderRadius: 10,
    backgroundColor: '#FFD365', // Assuming a default background color
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5, // Required for Android to apply shadow
   },
   stokPakan4:{
    position: 'absolute',
    width: 148,
    height: 105,
    left: 200,
    top: 80,
    borderRadius: 10,
    backgroundColor: '#FFD365', // Assuming a default background color
    // color:'#FFD365',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5, // Required for Android to apply shadow
   },
   summary:{
    position: 'absolute',
    width: '100%',
    height: 270,
    left: 0,
    top: 230,
    // marginLeft: 0, 
    marginHorizontal:0,
    backgroundColor: 'white',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomRightRadius:15,
    borderBottomLeftRadius:15,
    padding:20
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
    width: '50%',
    fontSize: 16,
    fontWeight: 'bold',
    color:'black'
  },
  value: {
    width: '50%',
    right: 0,
    fontSize: 16,
    fontWeight: 'bold',
    color:'black',
    textAlign: 'right'
  },
  card: {
    width: 170,
    height: 125,
    borderRadius: 15,
    overflow: 'hidden',
    margin: 10,
    elevation: 5, // shadow for Android
    shadowColor: '#000', // shadow for iOS
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
  }
});
