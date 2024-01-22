import { theme } from "../../core/theme"; 
import TextInput from "../../components/TextInputKandang";
import { ScrollView, StyleSheet, View,Text, Alert } from "react-native";
import BackButton from "../../components/BackButton";
import Button from "../../components/Button";
import Header from "../../components/HeaderInputKandang";
import { useContext, useEffect, useState } from "react";
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from "moment";
import { AxiosContext } from "../../context/AxiosContext";
import { AuthContext } from "../../context/AuthContext";

function Penjualan({navigation}){

  const axiosContext = useContext(AxiosContext);
  const authContext = useContext(AuthContext);

    const [ saleEgg, setsaleEgg ] = useState({
      quantity  : { value : '', error: '' },
      amount    : { value : '', error: '' },
      date      : { value : '', error: '' },
    })

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

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
    setsaleEgg({...saleEgg, date:{ value: `${moment(date).format('YYYY-MM-DD')}`, error: ''}})
  }, [date])
    
  const onSubmit = () => {
    const data = {
      quantity: saleEgg?.quantity?.value,
      amount: saleEgg?.amount?.value,
      date:saleEgg?.date?.value
    }
    const amount=!isNaN(data.amount) && data.amount>1;
    const quantity=!isNaN(data.quantity) && data.quantity>1;

      if(!amount || !quantity){
        Alert.alert('Data Anda Salah',"Mohon Untuk Cek Kembali")
        return;
      }

    axiosContext.authAxios.post(`/api/v1/saleEgg`, data)
    .then(res => {
      console.info("succes sellegg")
      navigation.navigate('DaftarPenjualanTelur', {name: 'DaftarPenjualanTelur'})
    })
    .catch((error) => {
      console.error(error);
    })
  }
    return(
        <ScrollView>
        <View style={styles.View}>
        <BackButton goBack={navigation.goBack}/>
            <Header>Penjualan Telur</Header>
            <Text style={styles.Text}>Jumlah Telur</Text>
            <TextInput value={saleEgg?.quantity.value} onChangeText={(text) => setsaleEgg({ ...saleEgg, quantity: {value: text, error: ''}  })} label='Masukkan Jumlah Telur' keyboardType="numeric"/>

            <Text style={styles.Text}>Tanggal</Text>
            <TextInput value={saleEgg?.date.value} onChangeText={(text)=> setsaleEgg({...saleEgg, date:{value:text, error:''}})} onChange={showDatepicker} onFocus={showDatepicker} label= 'Tanggal'/>
            {show &&(
              <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              is24Hour={true}
              onChange={onChange}/>
            )}
            <Text style={styles.Text}>Total Pendapatan Telur</Text>
            <TextInput value={saleEgg?.amount.value} onChangeText={(text) => setsaleEgg({ ...saleEgg, amount: {value: text, error: ''}  })} label='Pendapatan Total' keyboardType="numeric"/>

        <Button mode='contained' style={{margin:4}} onPress={onSubmit}>Simpan</Button>  
        <Button mode='contained'
            onPress={() => navigation.reset({
            index: 0, routes: [{ name: 'AmountKandang' }],})}>Kembali</Button>   
        </View> 
        </ScrollView>
    )
}
export default Penjualan;
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
        fontWeight: '500',
        color:'#000000'
    }
})