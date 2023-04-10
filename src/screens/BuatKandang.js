import { Text, StyleSheet, ScrollView, View } from "react-native";
import Button from "../components/Button";
import Header from "../components/Header";
import { Picker } from "@react-native-picker/picker";
import BackButton from "../components/BackButton";
import { theme } from '../core/theme'
import TextInput from "../components/TextInputKandang";
import { useState } from "react";

function BuatKandang({ route, navigation }) {
  const [selectedValue, setSelectedValue] = useState("jav");

  return (
    <ScrollView style={style.ssss}>
      <View style={style.View}>
        <BackButton goBack={navigation.goBack} />
        <Header>Buat Kandang</Header>

        <Text style={style.Text}>Nama Kandang</Text>
        <TextInput label='Nama kandang' />

        <Text style={style.Text} >Kapasitas Kandang</Text>
        <TextInput label='Bisa input perkiraan' />

        <Text style={style.Text}>Total Biaya</Text>
        <TextInput label='Biaya pembuatan kandang' />

        <Text style={style.Text}>Tanggal Mulai Operasi</Text>
        <TextInput label='Masukkan tanggal operasi' />

        <Text style={style.Text}>Tipe Kandang</Text>
        <View style={{ borderRadius:5,borderWidth:1,borderColor:'#708090',overflow:'hidden',}}>
        <Picker style={{backgroundColor:'#FFFAFA',width:"100%",height:50,textAlign:'center',marginTop:-8,marginBottom:7}}
         selectedValue={selectedValue}
         onValueChange={(itemValue,itemIndex)=>setSelectedValue(itemValue)}>
          <Picker.name />
          <Picker.Item label="kandang puyuh" value="s"/>
          <Picker.Item label="kandang ayam petelur" value="y"/>
        </Picker>
        </View>

        <Button mode='contained' 
          onPress={() =>
            navigation.reset({
              index: 0,
              routes: [{ name: 'ListKandang' }],
            })
          }
        >
          Simpan
        </Button>

        <Button mode='contained'
          onPress={() =>
            navigation.reset({
              index: 0,
              routes: [{ name: 'Dashboard' }],
            })
          }
        >
          Kembali
        </Button>
      </View>
    </ScrollView>
  )
}

export default BuatKandang;
const style = StyleSheet.create({
  Text: {
    textAlign: 'left',
    fontSize: 18,
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
  View: {
    flex: 1,
    width: '100%',
    backgroundColor: theme.colors.backgroundColor,
    padding: 20,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  style1: {
    textAlign: 'center',
  },
  ssss: {
    flex: 1,
    backgroundColor: theme.colors.backgroundColor,
    marginBottom: 1,
    marginTop: 30
  },
  input: {
    flex: 1
  }
})
