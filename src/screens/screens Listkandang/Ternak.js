import { Text, StyleSheet, View, ScrollView, Alert} from "react-native";
import BackButton from "../../components/BackButton";
import Button from "../../components/Button";
import TextInput from "../../components/TextInput";
import { theme } from "../../core/theme";
import Header from "../../components/HeaderInputKandang";
import { useState } from "react";
import axios from "axios";
import { agevalidator } from "../../helpers/Agevalidator";

function Ternak({navigation}) {
  
  const [ livestock, setLiveStock ] = useState({
    age:      { value : '', error: '' },
    quantity: { value : '', error: '' },
    date:     { value : '2023-04-02', error: '' },
    amount:   { value : '600000', error: '' },
    type:     { value : '', error: '' },
    note:     { value : 'NOTE', error: '' },
  })

  const onSubmit = () => {
    const data = {
      age: livestock?.age?.value,
      quantity: livestock?.quantity?.value,
      date: livestock?.date?.value,
      amount: livestock?.amount?.value,
      type: livestock?.type?.value,
      note: livestock?.note?.value
    }
    const ageIsValid=!isNaN(data.age)&& data.age>1;
    const quantityIsValid=!isNaN(data.quantity) && data.quantity>1;
    const amountIsValid=!isNaN(data.amount)&& data.amount>1;
    const typeIsvalid=data.type.trim().length>0


      if (!ageIsValid || !quantityIsValid || !amountIsValid || !typeIsvalid){
        Alert.alert ('Data Anda Salah',"Mohon Untuk Cek Kembali")
        return;
      }
    axios.post(`http://139.162.6.202:8000/api/v1/livestock`, data)
      .then(res => {
        navigation.navigate('DaftarTernak', {name: 'DaftarTernak'})
      })
      .catch((error) => {
        console.error(error);
      })
  }

  return (
    <ScrollView style={style.ScrollView}>
      <View style={style.View}>
      <BackButton goBack={navigation.goBack}/>
      <Header>Isi Kandang</Header>

      <Text style={style.Text} >Umur</Text>
      <TextInput value={livestock?.age.value} onChangeText={(text) => setLiveStock({ ...livestock, age: {value: text, error: ''}  })} label='Masukkan Umur'/>

      <Text style={style.Text} >Total</Text>
      <TextInput value={livestock?.quantity.value} onChangeText={(text) => setLiveStock({ ...livestock, quantity: {value: text, error: ''}  })}  label= 'Total Ayam'/>

      <Text style={style.Text} >Tanggal</Text>
      <TextInput value={livestock?.date.value} onChangeText={(text) => setLiveStock({ ...livestock, date: {value: text, error: ''}  })}  label='Masukkan Tanggal'/>

      <Text style={style.Text} >Harga Total</Text>
      <TextInput value={livestock?.amount.value} onChangeText={(text) => setLiveStock({ ...livestock, amount: {value: text, error: ''}  })}  label='Total harga ayam'/>

      <Text style={style.Text} >Type</Text>
      <TextInput value={livestock?.type.value} onChangeText={(text) => setLiveStock({ ...livestock, type: {value: text, error: ''}  })}  label='Peksi'/>

      <Text style={style.Text} >Catatan</Text>
      <TextInput value={livestock?.note.value} onChangeText={(text) => setLiveStock({ ...livestock, note: {value: text, error: ''}  })}  label='Masukkan Catatan'/>

      <Button mode='contained' style={{ marginTop: 4 }} onPress={ onSubmit }>Simpan</Button>
      <Button mode='contained'
        onPress={() => navigation.reset({index: 0,
        routes: [{ name: 'ListKandang' }],})}>Kembali</Button>
      </View>
    </ScrollView>
  )
}
export default Ternak;
const style=StyleSheet.create({
  View:{
    flex: 1,
    width: '100%',
    backgroundColor: theme.colors.backgroundColor,
    padding: 20,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  Text:{
    textAlign:'left',
    fontSize:20,
    fontWeight: 'bold',
  },
  ScrollView:{
    flex:1,
    width:'100%',
    paddingBottom:1,
    backgroundColor:theme.colors.backgroundColor,
    marginTop:35
  }
})