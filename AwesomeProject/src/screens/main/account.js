import React, { useContext } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconHelp from 'react-native-vector-icons/Entypo';
import * as Keychain from 'react-native-keychain';
import { AuthContext } from '../../context/AuthContext'

function Account({navigation}){

  const authContext = useContext(AuthContext);

  const LogOut = async () =>{
    console.log("Log Out")
    try{
      await Keychain.resetGenericPassword();
      authContext.setAuthState({
        authenticated: false,
        refreshToken:null,
        accessToken:null,
      })
      navigation.navigate('LoginScreen')
    } catch(error){
      console.error("Error LougOut", error)
    }
  }

  const showConfirmLogOut = () => {
    // console.log(id)
    return Alert.alert(
      "Apakah kamu yakin?",
      "Apakah Kamu Yakin Untuk LogOut?",
      [
        {
          text: "Yes",
          onPress:()=>LogOut() ,
        },
        {
          text: "No",
        },
      ]
    );
  }; 

    return(
    <View style={styles.container}>
        <View style={styles.card}>
            <View style={styles.iconContainer}>
                <Icon name='user-circle'
                style={styles.iconprofile}
                />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.name}>Supriyanto</Text>
                <Text style={styles.phone}>085328783238</Text>
            </View>
        </View>
        <View style={styles.SecondContainer}>
            <View style={styles.firsticon}>
                <Icon name='user-circle' style={styles.secondicon}/>
                <Text style={styles.Text}>Akun</Text>
            </View>
            <TouchableOpacity style={styles.icon}>
                <Text style={styles.TextProfile}>Ubah Profile</Text>
                <Icon name='chevron-right' style={styles.SecondIcon}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.icon}>
                <Text style={styles.TextProfile}>Ubah Kata Sandi</Text>
                <Icon name='chevron-right' style={styles.SecondIcon}/>
            </TouchableOpacity>
        </View>
        <View style={styles.ThirdContainer}>
            <View style={styles.firsticon}>
                <IconHelp name='help-with-circle' style={styles.secondicon}/>
                <Text style={styles.Text}>Bantuan</Text>
            </View>
            <TouchableOpacity style={styles.icon}>
                <Text style={styles.TextProfile}>Tentang Aplikasi</Text>
                <Icon name='chevron-right' style={styles.SecondIcon}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.icon}>
                <Text style={styles.TextProfile}>Cara Penggunaan</Text>
                <Icon name='chevron-right' style={styles.SecondIcon}/>
            </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.ThirdContainer} onPress={() => showConfirmLogOut()}>
            <View style={styles.firsticon}>
                <IconHelp name='log-out' style={styles.thridIcon}/>
                <Text style={styles.TextLogout}>Log Out</Text>
            </View>
        </TouchableOpacity>
    </View>
    )

}
export default Account;
const styles = StyleSheet.create({
    container:{
        flex:1
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#b6f573', // Gradient-like color
        borderRadius: 10,
        padding: 35,
        margin: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5,
      },
      iconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
      },
      firsticon:{
        flexDirection:'row',
      },
      iconprofile: {
        fontSize:40,
        color:'#1E3E62'
      },
      secondicon:{
        fontSize:40,
        color:'green'
      },
      textContainer: {
        flex: 1,
      },
      name: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000000',
      },
      phone: {
        fontSize: 16,
        color: '#000000',
      },
      icon:{
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop:18,
        borderBottomWidth: 2,  // Adds the border (line) at the bottom
        borderBottomColor: 'gray', // Set the color of the line (you can change 'gray' to your preferred color)
        paddingBottom: 10,
      },
      Text:{
        fontSize:23,
        color:'green',
        fontWeight:'bold',
        marginLeft:20
      },
      TextLogout:{
        fontSize:23,
        color:'red',
        fontWeight:'bold',
        marginLeft:20
      },
      TextProfile:{
        fontSize: 16,
        color:'black',
      },
      SecondIcon:{
        fontSize:15,
        color:'black',
        textAlign:'right',
      },
      thridIcon:{
        fontSize:40,
        color:'red'
      },
      SecondContainer:{
        marginTop:60,
        marginHorizontal:40
      },
      ThirdContainer:{
        marginTop:30,
        marginHorizontal:40
      }
})