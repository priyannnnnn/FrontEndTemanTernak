import { Text, TouchableOpacity, View , StyleSheet, ScrollView} from "react-native";
import BackButton from "../../components/BackButton";
import Background from "../../components/Background";
import Button from "../../components/Button";
import Header from "../../components/HeaderInputKandang";
import TextInput from "../../components/TextInput";
import { theme } from "../../core/theme";
import { useState } from "react";

function PersediaanPakan({navigation}) {
  const [livestock, setLiveStock]=useState({
    amountKg:  {value:'',error:''},
    type:       { value : '', error: '' },
    totalprice: { value : '', error: '' },
    date:       { value : '2023-04-02', error: '' },
  })

  const onSubmit=()=>{
    const data={
      amountKg:livestock?.amountKg?.value,
      type:livestock?.type?.value,
      totalprice:livestock?.totalprice?.value,
      data:livestock?.date?.value,
    }
    axios.post(`http://139.162.6.202:8000/api/v1/livestock`, data)
      .then(res => {
        navigation.navigate('DaftarPersediaanPakan', {name: 'DaftarPersediaanPakan'})
      })
      .catch((error) => {
        console.error(error);
      })
  }

  
    return (
      <ScrollView style={styles.ScrollView}>
        <View style={styles.View}>
            <BackButton goBack={navigation.goBack}/>
            <Header>PERSEDIAAN PAKAN</Header>
            <Text style={styles.Text}>Jumlah per KG</Text>
            <TextInput value={livestock?.amountKg.value} onChangeText={(text)=> setLiveStock({...livestock, amountKg:{value:text, error:''} })} label='Masukkan Pakan'/>

            <Text style={styles.Text}>Type</Text>
            <TextInput value={livestock?.type.value} onChangeText={(text)=> setLiveStock({...livestock, type:{value:text, error:''} })} label='Nama Produk Pakan'/>

            <Text style={styles.Text}>Harga Total</Text>
            <TextInput value={livestock?.totalprice.value} onChangeText={(text)=> setLiveStock({...livestock, totalprice:{value:text, error:''} })}label='Harga keseluruhan'/>

            <Text style={styles.Text}>Tanggal</Text>
            <TextInput value={livestock?.date.value} onChangeText={(text)=> setLiveStock({...livestock, date:{value:text, error:''} })} 
            label= 'Tanggal'/>

            <Button mode='contained' style={{ marginTop: 4 }} onPress={onSubmit}>Simpan</Button>
            <Button 
            mode='contained'
                onPress={() => navigation.reset({ index: 0,
                routes: [{ name: 'ListKandang' }], })}>Kembali</Button>
        </View>
       </ScrollView>
    )
}
export default PersediaanPakan;
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
    marginTop:15
  }
}) 