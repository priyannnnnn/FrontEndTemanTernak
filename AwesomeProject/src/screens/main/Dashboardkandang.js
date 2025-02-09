import React, { useContext, useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, ImageBackground, } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
// import BackgroundDashboard from '../../components/Backgrounddash';
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

  const BackgroundDashboard = ({ children }) => {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require('../assets/pattern.png')}
          style={styles.patternBackground}
          imageStyle={styles.imageStyle}
        />
        <View style={styles.content}>{children}</View>
      </View>
    );
  };

  const DashboardCard = ({ title, image, onPress }) => (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <LinearGradient colors={['#F8CE5A', '#F3B93D']} style={styles.gradientBackground}>
        <View style={styles.iconContainer}>
          <Image source={image} style={styles.icon} />
        </View>
        <View style={styles.arrrow}>
          <Text style={styles.text}>{title}</Text>
          <Ionicons name="arrow-forward" size={24} color="white" style={styles.arrowIcon} />
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

  const SummaryItem = ({ label, value }) => (
    <View style={styles.summaryItem}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );

  useFocusEffect(
    useCallback(() => {
      getData(); // Memanggil API saat tab difokuskan
    }, [])
  );
  
  return (
    <BackgroundDashboard>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <LinearGradient
          colors={['#FFD365', '#179574']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 0.2 }}
          style={styles.background}
        >
          <View style={styles.topp}>
            <DashboardCard
              title="Stok Pakan"
              image={require('../assets/Vector.png')}
              onPress={() => navigation.navigate('ListFeedsUse', { item: 8 })}
            />
            <DashboardCard
              title="Penjualan"
              image={require('../assets/telur.png')}
              onPress={() => navigation.navigate('DaftarPenjualanTelur', { item: 8 })}
            />
          </View>
          <View style={styles.topp}>
            <DashboardCard
              title="Afkir Ternak"
              image={require('../assets/kan.png')}
              onPress={() => navigation.navigate('ListQuailReduction', { item: 8 })}
            />
            <DashboardCard
              title="Operasional"
              image={require('../assets/catatan.png')}
              onPress={() => navigation.navigate('ListOperational', { item: 8 })}
            />
          </View>
          <ScrollView style={styles.summary}>
            <Text style={styles.TextSummary}>Ringkasan</Text>
            <SummaryItem label="Pendapatan" value={`${formatAmountWithDots(Dasboard.profit)}`}/>
            <SummaryItem label="Biaya" value={`${formatAmountWithDots(Dasboard.cost)}`}/>
            <SummaryItem label="Ternak" value={`${formatAmountWithDots(Dasboard.livestock)} Ekor`} />
            <SummaryItem label="Pakan" value={`${formatAmountWithDots(Dasboard.feed)} Kg`} />
            <SummaryItem label="Telur" value={`${formatAmountWithDots(Dasboard.egg)} Butir`} />
          </ScrollView>
        </LinearGradient>
      </ScrollView>
    </BackgroundDashboard>
  );
}

export default Dashboardkandang;

const styles = StyleSheet.create({
  container: { flex: 1 },
  patternBackground: {
    position: 'absolute',
    width: width * 1.1,
    height: height * 0.3,
    left: '50%',
    marginLeft: -(width * 1.1) / 2,
    top: 3.23,
    transform: [{ rotate: '-0.03deg' }],
  },
  imageStyle: { borderRadius: 0 },
  content: { flex: 1 },
  scrollContainer: { alignItems: 'center', width: '100%', paddingBottom: 50,  },
  background: {
    width: '100%',
    height: height * 1.5,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    marginTop:90
  },
  topp: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: height * 0.02,
    top:height * -0.08
  },
  summary: {
    width: summaryWidth,
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    minHeight: height * 0.2,
    maxHeight: height * 0.4, // Adjusted height to prevent summary from taking full screen
    marginTop: -30,
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
  label: { fontSize: 16, fontWeight: 'bold', color: 'black' },
  value: { fontSize: 16, fontWeight: 'bold', color: 'black', textAlign: 'right' },
  card: {
    width: cardWidth,
    height: height * 0.15,
    borderRadius: 15,
    overflow: 'hidden',
    margin: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  gradientBackground: { flex: 1, padding: 15, justifyContent: 'space-between', borderRadius: 15 },
  iconContainer: { alignItems: 'center' },
  icon: { width: width * 0.1, height: width * 0.1 },
  text: { fontSize: 18, fontWeight: 'bold', color: 'white' },
  arrowIcon: { alignSelf: 'flex-end' },
  arrrow: { flexDirection: 'row', justifyContent: 'space-between' },
  TextSummary: {
    color: 'green',
    fontWeight: 'bold',
    fontSize: 23,
    borderBottomWidth: 2,
    borderBottomColor: 'green',
    marginBottom: 20,
  },
});