import { FlatList, Image, SafeAreaView, ScrollView, StatusBar, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";
import Button from '../components/Button';
import { theme } from "../core/theme";
import AntDesign from 'react-native-vector-icons/AntDesign'
import Icon from 'react-native-vector-icons/MaterialIcons';
import places from "../helpers/places";
import { ImageBackground } from "react-native";
import { Dimensions } from "react-native";
const {width} = Dimensions.get('screen')

function AmountKandang({navigation}){
    const categoryIcons = [
        <Icon name="search" size={25} color={'#04555c'} />,
        <Icon name="beach-access" size={25} color={'#04555c'} />,
        <Icon name="near-me" size={25} color={'#04555c'} />,
        <Icon name="place" size={25} color={'#04555c'} />,
        
      ];
      const ListCategories = () => {
        return (
          <View style={styles.categoryContainer}>
            <View style={styles.viewButton}>
                <TouchableOpacity onPress={() => navigation.navigate('Ternak')}>
                    <View style={styles.iconContainer}>
                        <Icon name="search" size={25} color={'#04555c'} />
                    </View>
                </TouchableOpacity>
                <Text style={styles.text}>Ternak</Text>
            </View>
            <View style={styles.viewButton}>
                <TouchableOpacity onPress={() => navigation.navigate('PendapatanTelur')}>
                    <View style={styles.iconContainer}>
                    <Icon name="beach-access" size={25} color={'#04555c'} />
                    </View>
                </TouchableOpacity>
                <Text style={styles.text}>Pendapatan</Text>
            </View>
            <View style={styles.viewButton}>
                <TouchableOpacity onPress={() => navigation.navigate('Penjualan')}>
                    <View style={styles.iconContainer}>
                    <Icon name="near-me" size={25} color={'#04555c'} />
                    </View>
                </TouchableOpacity>
                <Text style={styles.text}>Pejualan</Text>
            </View> 
          </View>
        );
      };
      const ListCategories2 = () => {
        return (
          <View style={styles.categoryContainer2}>
            <View style={styles.viewButton}>
                <TouchableOpacity onPress={() => navigation.navigate('PersediaanPakan')}>
                    <View style={styles.iconContainer}>
                    <Icon name="alarm" size={25} color={'#04555c'} />
                    </View>
                </TouchableOpacity>
                <Text style={styles.text}>Persediaan Pakan</Text>
            </View>
            <View style={styles.viewButton}>
                <TouchableOpacity onPress={() => navigation.navigate('BiayaOperasional')}>
                    <View style={styles.iconContainer}>
                    <Icon name="beach-access" size={25} color={'#04555c'} />
                    </View>
                </TouchableOpacity>
                <Text style={styles.text}>BiayaOperasional</Text>
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
        <SafeAreaView style={{flex: 1}}>
            <StatusBar translucent={false} backgroundColor="#b3ecb3"/>
            <View style={styles.header}>
            </View>
            <ScrollView>
                <View 
                style={{
                 backgroundColor: '#04555c',
                 height: 90,
                 paddingHorizontal: 20,
                }}>
                <View style={{flex: 1,height:300}}>
                <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Search place"
                    style={{color:'#dddedd',height:80}}/>
                </View>
                </View>
                </View>
                <ListCategories/>
                <ListCategories2/>
                <View>
                    {/* <FlatList
                    contentContainerStyle={{paddingLeft: 20}}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={places}
                    renderItem={({item}) => <Card place={item} />}
                    /> */}
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
        fontSize:12,
        alignSelf:'center',
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
        backgroundColor: '#04555c'
      },
      inputContainer: {
        height: 80,
        width: '100%',
        backgroundColor: '#000000',
        borderRadius: 10,
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
        height: 70,
        width: 70,
        backgroundColor: '#e1e8e9',
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
      }
      
})