import { Text, TouchableOpacity, View, StyleSheet, ScrollView } from "react-native";
import BackButton from "../../components/BackButton";
import Button from "../../components/Button";
import Header from "../../components/HeaderInputKandang";
import Input from "../../components/input";
import TextInput from "../../components/TextInput";
import { theme } from "../../core/theme";
import { useState } from "react";
import { Picker } from "@react-native-picker/picker";

function PenggunaanPakan({navigation}) {

  const [ livestock, setLiveStock ] = useState({
    choosefeed: { value : '', error: '' },
    amountfeed: { value : '', error: '' },
    type:       { value : '', error: '' },
    date:       { value : 'NOTE', error: '' },
  })

  const [selectedValue, setSelectedValue] = useState("java");

  const onSubmit = () => {
    const data = {
      choosefeed: livestock?.choosefeed?.value,
      amountfeed: livestock?.amountfeed?.value,
      type: livestock?.type?.value,
      date: livestock?.date?.value
    }
    axios.post(`http://139.162.6.202:8000/api/v1/livestock`, data)
      .then(res => {
        navigation.navigate('DaftaPenggunaanPakan', {name: 'DaftarPenggunaanPakan'})
      })
      .catch((error) => {
        console.error(error);
      })
  }

    return (
      <ScrollView style={style.ScrollView}>
        <View style={style.View}>
            <BackButton goBack={navigation.goBack}/>
            <Header>PENGGUNAAN PAKAN</Header>

            <Text style={style.Text}>Pilih Pakan</Text>
            <TextInput value={livestock?.choosefeed.value} onChangeText={(text) => setLiveStock({ ...livestock, choosefeed: {value: text, error: ''}  })}label='Masukkan Produk Pakan'/>

            <Text style={style.Text}>Jumlah perKG</Text>
            <TextInput value={livestock?.amountfeed.value} onChangeText={(text) => setLiveStock({ ...livestock, amountfeed: {value: text, error: ''}  })}
            label= 'Masukkan Jumlah Pakan'/>

            <Text style={style.Text}>Type</Text>

            <Picker
              selectedValue={selectedValue}
              style={{ height: 50, width: 150 }}
              onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
            >
              <Picker.Item label="Java" value="java" />
              <Picker.Item label="JavaScript" value="js" />
            </Picker>

            <TextInput value={livestock?.type.value} onChangeText={(text) => setLiveStock({ ...livestock, type: {value: text, error: ''}  })}label='Nama Produk Pakan'/>

            <Text style={style.Text}>Tanggal</Text>
            <TextInput value={livestock?.date.value} onChangeText={(text) => setLiveStock({ ...livestock, date: {value: text, error: ''}  })}
            label='Tanggal'/>

            <Button mode='contained' style={{ marginTop: 4 }} onPress={onSubmit}>Simpan</Button>
            <Button mode='contained'onPress={() =>navigation.reset({index: 0,routes: [{ name: 'ListKandang' }],})}>Kembali</Button>
        </View>
      </ScrollView>
    )
}
export default PenggunaanPakan;
const style=StyleSheet.create({
        View:{
        flex: 1,
        width: '100%',
        backgroundColor: theme.colors.backgroundColor,
        padding: 10,
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
        paddingBottom:1,
        marginTop:20
      }
})