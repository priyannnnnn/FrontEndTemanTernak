import { Text, StyleSheet, View, ScrollView, Alert} from "react-native";
import BackButton from "../../components/BackButton";
import Button from "../../components/Button";
import TextInput from "../../components/TextInput";
import { theme } from "../../core/theme";
import Header from "../../components/HeaderInputKandang";
import { useState,useEffect, useContext } from "react";
import axios from "axios";
import { agevalidator } from "../../helpers/Agevalidator";
import { Picker } from "@react-native-picker/picker";
import moment from "moment";
import DateTimePicker from '@react-native-community/datetimepicker';
import { AxiosContext } from "../../context/AxiosContext";
import Background from "../../components/Background";
import Back from "../../components/Back";

function Ternak({navigation, props}) {
  
  const axiosContext = useContext(AxiosContext);
  const [ livestock, setLiveStock ] = useState({
    age:      { value : '', error: '' },
    quantity: { value : '', error: '' },
    date:     { value : '', error: '' },
    amount:   { value : '', error: '' },
    type:     { value : '', error: '' },
    note:     { value : '', error: '' },
  })

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const[show, setShow]= useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    if (Platform.OS === 'android') {
      setShow(true);
    }
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  useEffect(() => {
    setLiveStock({...livestock, date:{ value: `${moment(date).format('YYYY-MM-DD')}`, error: ''}})
  }, [date])

  const config = {
    headers: { Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0XzI0QGdtYWlsLmNvbSIsImlhdCI6MTcwMDYzNTM4MCwiZXhwIjoxNzAwNjM2ODIwfQ.qCwWeeKY5Far6PvvRp6s23eqET0ZCQ9L3I0H03li-P0"}` }
};

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
      console.log("URLLL ternak = ")
      console.log("token = ",config)
      console.log("Token2 ", config.headers.Authorization)
    axiosContext.authAxios.post(`/api/v1/livestock`, data)
    // axios.post(`http://localhost:8000/api/v1/livestock`,data, config)
    // console.log("succes URL")
      .then(res => {
        console.log(res.data)
        navigation.navigate('DaftarTernak', {name: 'DaftarTernak'})
      })
      .catch((error) => {
        console.error(error);
      })
  }

  return (
    // <Back>
    <ScrollView style={style.ScrollView}>
      <View style={style.View}>
      <BackButton goBack={navigation.goBack} />
      <Header>Isi Kandang</Header>

      <Text style={style.Text}>Umur</Text>
      <TextInput value={livestock?.age.value} onChangeText={(text) => setLiveStock({ ...livestock, age: {value: text, error: ''}  })} label='Masukkan Umur' keyboardType="numeric"/>

      <Text style={style.Text}>Total</Text>
      <TextInput value={livestock?.quantity.value} onChangeText={(text) => setLiveStock({ ...livestock, quantity: {value: text, error: ''}  })}  label= 'Total Ayam' keyboardType="numeric"/>

      <Text style={style.Text}>Tanggal</Text>
      <TextInput value={livestock?.date.value} onChangeText={(text) => setLiveStock({...setLiveStock, date: {value: text, error: ''}  })}  onBlur={onChange} onChange={showDatepicker} onFocus={showDatepicker} label='Masukkan Tanggal'/>
      {show &&(
        <DateTimePicker
        testID="dateTimePicker"
              value={date}
              mode={mode}
              is24Hour={true}
              onChange={onChange}/>
              )}
      <Text style={style.Text} >Harga Total</Text>
      <TextInput value={livestock?.amount.value} onChangeText={(text) => setLiveStock({ ...livestock, amount: {value: text, error: ''}  })}  label='Total harga ayam' keyboardType="numeric"/>

      <Text style={style.Text} >Type</Text>
      <View style={{ borderRadius:5,borderWidth:1,borderColor:'#708090',overflow:'hidden',}}>
        <Picker
        style={{backgroundColor:'#FFFAFA',width:"100%",height:50,textAlign:'center',marginTop:-8,marginBottom:7}}
        selectedValue={livestock?.type.value}
        onValueChange={(itemValue,itemIndex) => setLiveStock({...livestock, type:{value:itemValue,error:''}})}>
          <Picker.Item/>
          <Picker.Item style={style.title} label="Peksi" value="peksi"/>
          <Picker.Item style={style.title} label="Blaster" value="blaster"/>
          <Picker.Item style={style.title} label="Albino" value="albino"/>
        </Picker>
      </View>
      {/* <TextInput value={livestock?.type.value} onChangeText={(text) => setLiveStock({ ...livestock, type: {value: text, error: ''}  })}  label='Peksi'/> */}

      <Text style={style.Text} >Catatan</Text>
      <TextInput value={livestock?.note.value} onChangeText={(text) => setLiveStock({ ...livestock, note: {value: text, error: ''}  })}  label='Masukkan Catatan'/>

      <Button mode='contained' style={{ marginTop: 4 }} onPress={ onSubmit }>Simpan</Button>
      <Button mode='contained'
        onPress={() => navigation.reset({index: 0,
          routes: [{ name: 'AmountKandang' }],})}>Kembali</Button>
      </View>
    </ScrollView>
          // </Back>
       
  )
}
export default Ternak;
const style=StyleSheet.create({
  View:{
    flex: 1,
    width: '100%',
    backgroundColor: theme.colors.screen,
    padding: 20,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  Text:{
    textAlign:'left',
    fontSize:20,
    fontWeight: '500',
    color:'#F9FBE7'
  },
  ScrollView:{
    flex:1,
    width:'100%',
    paddingBottom:1,
    backgroundColor:theme.colors.screen,
    marginTop:0
  },
  title:{
    color:'#000000'
  }
})