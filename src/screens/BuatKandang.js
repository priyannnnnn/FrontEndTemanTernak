import { Text, StyleSheet, TouchableOpacity, ScrollView, View } from "react-native";
import Background from "../components/Background";
import Button from "../components/Button";
import Header from "../components/Header";

import BackButton from "../components/BackButton";
import { theme } from '../core/theme'
import TextInput from "../components/TextInputKandang";

function BuatKandang ({navigation}){
    
    return (
        
    <View style={style.View}>
        <BackButton goBack={navigation.goBack}/>
        <Header >BUAT KANDANG</Header>
        <Text style={style.Text}>Nama Kandang</Text>
        <TextInput
         label='Masukkan Nama Kandang'
        />
        <Text style={style.Text} >Kapasitas Kandang</Text>
        <TextInput
        label='Bisa input perkiraan'/>
        <Text style={style.Text}>Total Biaya</Text>
        <TextInput
        label='Biaya Pembuatan Kandang'/>
        <Text style={style.Text}>Tanggal Mulai Operasi</Text>
        <TextInput
        label='Masukkan Tanggal Operasi'/>
        <Text style={style.Text}>Tipe kandang</Text>
        <TextInput
        label='Puyuh/Ayam Petelur'/>

        <Button
        mode='contained'
        style={{ marginTop: 4 }}
        onPress={() =>
            navigation.reset({
              index: 0,
              routes: [{ name: 'ListKandang' }],
            })
          }
        >
            Simpan
        </Button>
        <Button 
            mode='contained'
                onPress={() =>
                  navigation.reset({
                    index: 0,
                    routes: [{ name: 'Dashboard' }],
                  })
                }
            >Kembali</Button>
    </View>
        

    )
}
export default BuatKandang;
 const style= StyleSheet.create({
    Text:{
        textAlign:'left',
        fontSize:18,
        fontWeight: 'bold',

    },
    Button: {
        width: '100%',
        marginVertical: 10,
        paddingVertical: 2,
        fontWeight: 'bold',
    color: theme.colors.surface,
    backgroundColor: theme.colors.primary,
    
    },
    View:{
        flex: 1,
    width: '100%',
    backgroundColor: theme.colors.backgroundColor,
    padding: 20,


    alignSelf: 'center',
    
    justifyContent: 'center',
  },
  style1:{
    textAlign:'center',
  }
    

 })
