import { FlatList, Image, SafeAreaView, ScrollView, StatusBar, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";
import Button from '../../components/Button';
import { theme } from "../../core/theme";
import AntDesign from 'react-native-vector-icons/AntDesign'
import Icon from 'react-native-vector-icons/MaterialIcons';
import places from "../../helpers/places";
import places2 from "../../helpers/places2";
import { ImageBackground } from "react-native";
import { Dimensions } from "react-native";
const {width} = Dimensions.get('screen')

function AmountKandang({navigation}){
    const categoryIcons = [
        <Icon name="search" size={25} color={'#04555c'} />,
        <Icon name="person" size={25} color={'#04555c'} />,
        <Icon name="near-me" size={25} color={'#04555c'} />,
        <Icon name="place" size={25} color={'#04555c'} />,
        
      ];
      const ListCategories = () => {
        return (
          <View style={styles.categoryContainer}>
            <View style={styles.viewButton}>
                <TouchableOpacity onPress={() => navigation.navigate('DaftarTernak',{item:8})}>
                    <View style={styles.iconContainer}>
                        {/* <Icon name="search" size={25} color={'#04555c'} /> */}
                        <Image source={require('../../image/ternak.png')} style = {{width: 60, height:60}}/>
                    </View>
                </TouchableOpacity>
                <Text style={styles.text}>Ternak</Text>
            </View>
            <View style={styles.viewButton}>
                <TouchableOpacity onPress={() => navigation.navigate('DaftarPersediaanPakan',{item:8})}>
                    <View style={styles.iconContainer}>
                    {/* <Icon name="beach-access" size={25} color={'#04555c'} /> */}
                    <Image source={require('../../image/pendapatan.png')} style = {{width: 70, height:50}}/>
                    </View>
                </TouchableOpacity>
                <Text style={styles.text}>Pakan</Text>
            </View>
            <View style={styles.viewButton}>
                <TouchableOpacity onPress={() => navigation.navigate('DaftarPenjualanTelur',{itemp:8})}>
                    <View style={styles.iconContainer}>
                    {/* <Icon name="near-me" size={25} color={'#04555c'} /> */}
                    <Image source={require('../../image/pendepatan.png')} style = {{width: 70, height:50}}/>
                    </View>
                </TouchableOpacity>
                <Text style={styles.text}>Pendapatan</Text>
            </View> 
          </View>
        );
      };
      const ListCategories2 = () => {
        return (
          <View style={styles.categoryContainer2}>
            <View style={styles.viewButton}>
                <TouchableOpacity onPress={() => navigation.navigate('DaftarPersediaanPakan',{item:8})}>
                    <View style={styles.iconContainer}>
                    {/* <Icon name="alarm" size={25} color={'#04555c'} /> */}
                    <Image source={require('../../image/pakan12.png')} style = {{width:65, height:65}}/>
                    </View>
                </TouchableOpacity>
                <Text style={styles.text}>Persediaan Pakan</Text>
            </View>
            <View style={styles.viewButton}>
                <TouchableOpacity onPress={() => navigation.navigate('DaftarOperasional',{item:8})}>
                    <View style={styles.iconContainer}>
                    {/* <Icon name="beach-access" size={25} color={'#04555c'} /> */}
                    <Image source={require('../../image/date.png')} style = {{marginLeft:5,width:63, height:63}}/>
                    </View>
                </TouchableOpacity>
                <Text style={styles.text}>Operasional</Text>
            </View> 
          </View>
        );
      };
      

    const Card = ({place}) => {
        return (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate('ListKandang', place)}>
            <ImageBackground style={styles.cardImage} source={place.image}>
              <Text
                style={{
                  color: '#FFFFFF',
                  fontSize: 20,
                  fontWeight: 'bold',
                  marginTop: 10,
                }}>
                {place.name}
              </Text>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  alignItems: 'flex-end',
                }}>
                <View style={{flexDirection: 'row'}}>
                  <Icon name="place" size={20} color={'#FFFFFF'} />
                  <Text style={{marginLeft: 5, color: '#FFFFFF'}}>
                    {place.location}
                  </Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Icon name="star" size={20} color={'#FFFFFF'} />
                  <Text style={{marginLeft: 5, color: '#FFFFFF'}}>5.0</Text>
                </View>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        );
    };
    const RecommendedCard = ({place}) => {
        return (
          <ImageBackground style={styles.rmCardImage} source={place.image}>
            <Text
              style={{
                color: '#FFFFFF',
                fontSize: 22,
                fontWeight: 'bold',
                marginTop: 10,
              }}>
              {place.name}
            </Text>
            <View
              style={{
                flex: 1,
                justifyContent: 'space-between',
                alignItems: 'flex-end',
              }}>
              <View style={{width: '100%', flexDirection: 'row', marginTop: 10}}>
                <View style={{flexDirection: 'row'}}>
                  <Icon name="place" size={22} color={'#FFFFFF'} />
                  <Text style={{color: '#FFFFFF', marginLeft: 5}}>
                    {place.location}
                  </Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Icon name="star" size={22} color={'#FFFFFF'} />
                  <Text style={{color: '#FFFFFF', marginLeft: 5}}>5.0</Text>
                </View>
              </View>
              <Text style={{color: '#FFFFFF', fontSize: 13}}>
                {place.details}
              </Text>
            </View>
          </ImageBackground>
        );
      };
    return(
        <SafeAreaView style={{flex: 1, backgroundColor : "#A7D397"}} >
            <StatusBar translucent={false} backgroundColor="#b3ecb3"/>
            <View style={styles.header}>
              <View style={styles.dasboard}>
              <Text style={styles.textdashboard}>Dashboard</Text>
              </View>
              <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
                    <View >
                    <Icon name="person" size={25} color={'#04555c'} /> 
                    {/* <Icon name="beach-access" size={25} color={'#04555c'} /> */}
                    {/* <Image source={require('../image/date.png')} style = {{marginLeft:5,width:63, height:63}}/> */}
                    </View>
                </TouchableOpacity>             
            </View>
            <ScrollView>
                <View 
                style={{
                 backgroundColor: '#F2F597',
                 height: 22,
                 paddingHorizontal: 20,
                }}>
                <View style={{flex: 1,height:0}}>
                <View style={styles.inputContainer}>
                {/* <TextInput
                    placeholder="Search place"
                    style={{color:'#dddedd',height:80}}/> */}
                </View>
                </View>
                </View>
                <ListCategories/>
                {/* <ListCategories2/> */}
                <View style = {{marginTop: 60}}>
                    <Text style={styles.sectionTitle}>Recommended</Text>
                    <FlatList
                    snapToInterval={width - 20}
                    contentContainerStyle={{paddingLeft: 20, paddingBottom: 20}}
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    data={places}
                    renderItem={({item}) => <RecommendedCard place={item} />}
                    />
                </View>
                <View style = {{marginTop: 30}}>
                    <FlatList
                    snapToInterval={width - 20}
                    contentContainerStyle={{paddingLeft: 20, paddingBottom: 95}}
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    data={places2}
                    renderItem={({item}) => <RecommendedCard place={item} />}
                    />
                </View>
            </ScrollView> 
        </SafeAreaView>
    )
}
export default AmountKandang;
const styles= StyleSheet.create({
    image:{
        width:250,
        height:250,
        alignItems:'center',
        justifyContent:'center',
        alignSelf:'baseline'
    },
    text:{
        fontSize:13,
        alignSelf:'center',
        marginLeft:20,
        height: 70,
        width: 90,
    },
    view:{
        flex:1,
        backgroundColor:'#b3ecb3'
    },
    text1:{
        alignItems:'center',
        alignContent:'center',
        alignSelf:'center',
        textAlign:'center',
        fontSize:18,
        fontWeight: 'bold',
        color:'#32CD32'
    },
    View12:{
        width: '100%',
        height:'20%',
        backgroundColor: theme.colors.error,
        padding: 20,
        alignSelf: 'center',
        justifyContent: 'center',
    },
    button: {
        borderRadius: 5,
        marginVertical: 20,
        alignSelf: 'flex-start',
        backgroundColor: "gray",
    },
    buttonContainer: {
        marginTop: 200,
        alignItems:'center',
        alignContent:'center',
        alignSelf:'center',
    },
    header: {
        paddingVertical: 20,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        // backgroundColor: '#04555c'
      },
      inputContainer: {
        height: 150,
        width: '100%',
        backgroundColor: '#F2F597',
        borderRadius: 30,
        position: 'absolute',
        top: 50,
        flexDirection: 'row',
        paddingHorizontal: 20,
        alignItems: 'center',
        elevation: 12,
      },
      categoryContainer: {
        marginTop: 55,
        marginHorizontal: 5,
        flexDirection: 'row',
        justifyContent:'space-evenly',
      },
      iconContainer: {
        height: 72,
        width: 72,
        backgroundColor: '#0D9276',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
      },
      cardImage: {
        height: 220,
        width: width / 2,
        marginRight: 20,
        padding: 10,
        overflow: 'hidden',
        borderRadius: 10,
      },
      rmCardImage: {
        width: width - 40,
        height: 200,
        marginRight: 20,
        borderRadius: 10,
        overflow: 'hidden',
        padding: 10,
      },
      sectionTitle: {
        marginHorizontal: 20,
        marginVertical: 20,
        fontWeight: 'bold',
        fontSize: 20,
      },
      categoryContainer2: {
        marginTop: 30,
        marginHorizontal: 40,
        flexDirection: 'row',
        justifyContent:'space-evenly',
      },
      iconContainertext: {
        justifyContent: 'center',
        alignItems: 'center',
      },
      categoryContainertext :{
        marginTop: 10,
        marginHorizontal: 0,
        flexDirection: 'row',
        justifyContent:'space-evenly',
      },
      viewButton: {
        flexDirection:'column',
        height: 70,
        width: 70,
      }, 
      dasboard: {
        marginLeft:120,
        fontSize : 20
      },
      textdashboard: {
        fontSize : 17,
        fontWeight: 'bold',
        color : '#124076'
      }    
})