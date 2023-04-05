import { Text, TouchableOpacity,StyleSheet, View, ScrollView } from "react-native";
import BackButton from "../../components/BackButton";
import Background from "../../components/Background";
import Button from "../../components/Button";
import TextInput from "../../components/TextInput";
import { theme } from "../../core/theme";
import Header from "../../components/HeaderInputKandang"
import { useState } from "react";

function Pengurangan({navigation}) {

  const [ livestock, setLiveStock ] = useState({
    amountafkir:  { value : '', error: '' },
    date:         { value : '', error: '' },
    age:          { value : '2023-04-02', error: '' },
    reason:       { value : 600000, error: '' },
    sellprice:    { value : '', error: '' },
    note:         { value : 'NOTE', error: '' },
  })

  const onSubmit = () => {
    const data = {
      amountafkir: livestock?.amountafkir?.value,
      date: livestock?.date?.value,
      age: livestock?.age?.value,
      reason: livestock?.reason?.value,
      sellprice: livestock?.sellprice?.value,
      note: livestock?.note?.value
    }
    axios.post(`http://139.162.6.202:8000/api/v1/livestock`, data)
    .then(res => {
      navigation.navigate('DaftarPengurangan', {name: 'DaftarPengurangan'})
    })
    .catch((error) => {
      console.error(error);
    })
  }
    return (
      <ScrollView style={styles.ScrollView}>
        <View style={styles.View}>
            <BackButton goBack={navigation.goBack}/>
            <Header>PENGURANGAN TERNAK</Header>
            <Text style={styles.Text}>Jumlah Ternak Afkir</Text>
            <TextInput value={livestock?.amountafkir.value} onChangeText={(text) => setLiveStock({ ...livestock, amountafkir: {value: text, error: ''}  })}label='Jumlah Ternak'/>

            <Text style={styles.Text}>Tanggal</Text>
            <TextInput value={livestock?.date.value} onChangeText={(text) => setLiveStock({ ...livestock, date: {value: text, error: ''}  })}label= 'Masukkan Tanggal'/>

            <Text style={styles.Text}>Umur</Text>
            <TextInput value={livestock?.age.value} onChangeText={(text) => setLiveStock({ ...livestock, age: {value: text, error: ''}  })}label='Bisa Perkiraan'/>

            <Text style={styles.Text}>Alasan</Text>
            <TextInput value={livestock?.reason.value} onChangeText={(text) => setLiveStock({ ...livestock, reason: {value: text, error: ''}  })} label='Alasan Afkir'/>

            <Text style={styles.Text}>Harga Jual</Text>
            <TextInput value={livestock?.sellprice.value} onChangeText={(text) => setLiveStock({ ...livestock, sellprice: {value: text, error: ''}  })}label='Masukkan Harga Jual'/>

            <Text style={styles.Text}>Keterangan</Text>
            <TextInput value={livestock?.note.value} onChangeText={(text) => setLiveStock({ ...livestock, note: {value: text, error: ''}  })}label='Masukkan Keterangan'/>

          <Button mode='contained' style={{marginTop:4}} onPress={onSubmit}>Simpan</Button> 
          <Button 
              mode='contained'onPress={() =>
              navigation.reset({index: 0,
              routes: [{ name: 'ListKandang' }],})}
            >Kembali</Button>
       </View>
       </ScrollView>
    )
}
export default Pengurangan;
const styles=StyleSheet.create({
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
    fontSize:18,
    fontWeight: 'bold',
  },
  ScrollView:{
    flex:1,
    backgroundColor:theme.colors.backgroundColor,
    marginTop:35
  }
})