import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import BackgroundDashboard from '../../components/Backgrounddash';
import Ionicons from 'react-native-vector-icons/MaterialIcons';

function Dashboardkandang({ navigation }) {
  return (
    <BackgroundDashboard>
      <View style={{ alignItems: 'center', width: 400,}}>
        <Text
          style={{
            color: 'black',
            fontSize: 30,
            fontWeight: 'bold',
            marginVertical: 0,
            // textAlign:'right'
          }}>
          Dashboard
        </Text>
       
        <LinearGradient
          colors={['#FFD365', '#179574']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 0.2 }}
          style={styles.background} // Applied styles here
        >
          {/* Additional content can go here */}
          <View style={styles.topp}>
            {/* <View style={styles.stokPakan}>
            </View>
            <View style={styles.stokPakan1}>
            </View> */}
          </View>
          <View style={styles.topp}>
            {/* <View style={styles.stokPakan3}>
            </View> */}
            {/* Stok Pakan */}
            <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('ListFeedsUse')}>
              {/* Gradient background */}
              <LinearGradient
                colors={['#F8CE5A', '#F3B93D']}
                style={styles.gradientBackground}
              >
                {/* Icon Section */}
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
              {/* Gradient background */}
              <LinearGradient
                colors={['#F8CE5A', '#F3B93D']}
                style={styles.gradientBackground}
              >
                {/* Icon Section */}
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
            {/* <View style={styles.stokPakan4}>
            </View> */}
          </View>

          <View style={styles.topp}>
            {/* <View style={styles.stokPakan3}>
            </View> */}
            {/* empat */}
            <TouchableOpacity style={styles.card} onPress={() =>navigation.navigate('ListQuailReduction')}>
              {/* Gradient background */}
              <LinearGradient
                colors={['#F8CE5A', '#F3B93D']}
                style={styles.gradientBackground}
              >
                {/* Icon Section */}
                <View style={styles.iconContainer}>
                  <Image
                    source={require('../assets/kan.png')} // Add your egg icon image here
                    style={styles.icon}
                  />
                </View>

                <View style={styles.arrrow}>
                  <Text style={styles.text}>Kandang</Text>
                  <Ionicons
                    name="arrow-forward"
                    size={24}
                    color="white"
                    style={styles.arrowIcon}
                  />
                </View>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('BiayaOperasional')}>
              {/* Gradient background */}
              <LinearGradient
                colors={['#F8CE5A', '#F3B93D']}
                style={styles.gradientBackground}
              >
                {/* Icon Section */}
                <View style={styles.iconContainer}>
                  <Image
                    source={require('../assets/catatan.png')} // Add your egg icon image here
                    style={styles.icon}
                  />
                </View>

                {/* Text Section */}
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
            {/* <View style={styles.stokPakan4}>
            </View> */}
          </View>
          <View style={styles.summary}>
            {/* <Text style={{backgroundColor:'black'}}>teuu</Text> */}
            <View style={styles.headerr}>
              <Text style={styles.titlee}>Ringkasan</Text>
              {/* <Text style={styles.date}>Kamis, 11 Januari 2024</Text> */}
            </View>

            <View style={styles.summaryItem}>
              <Text style={styles.label}>Hasil Telur</Text>
              <Text style={styles.value}>1320 btr</Text>
            </View>

            <View style={styles.summaryItem}>
              <Text style={styles.label}>Hasil Telur Rusak</Text>
              <Text style={styles.value}>29 btr</Text>
            </View>

            <View style={styles.summaryItem}>
              <Text style={styles.label}>Penggunaan Pakan</Text>
              <Text style={styles.value}>2 kg</Text>
            </View>
          </View>
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
    width: 390,
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
    width: 370,
    height: 270,
    left: '50%',
    top: 220,
    marginLeft: -185, 
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
    fontSize: 16,
    fontWeight: 'bold',
    color:'black'
  },
  value: {
    fontSize: 16,
    fontWeight: 'bold',
    color:'black'
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
