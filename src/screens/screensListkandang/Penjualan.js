import { theme } from "../../core/theme"; 
import TextInput from "../../components/TextInputKandang";
import { ScrollView, StyleSheet, View,Text } from "react-native";
import BackButton from "../../components/BackButton";
import Button from "../../components/Button";
import Header from "../../components/HeaderInputKandang";
import { useEffect, useState } from "react";
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from "moment";
import axios from "axios";

function Penjualan({navigation}){

    const [ livestock, setLiveStock ] = useState({
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
    setLiveStock({...livestock, date:{ value: `${moment(date).format('YYYY-MM-DD')}`, error: ''}})
  }, [date])
    
  const onSubmit = () => {
    const data = {
      quantity: livestock?.quantity?.value,
      amount: livestock?.amount?.value,
      date:livestock?.date?.value
    }

    axios.post(`http://139.162.6.202:8000/api/v1/saleEgg`, data)
    .then(res => {
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
            <TextInput value={livestock?.quantity.value} onChangeText={(text) => setLiveStock({ ...livestock, quantity: {value: text, error: ''}  })} label='Masukkan Jumlah Telur' keyboardType="numeric"/>

            <Text style={styles.Text}>Tanggal</Text>
            <TextInput value={livestock?.date.value} onChangeText={showDatepicker} onFocus={showDatepicker} label= 'Tanggal'/>
            {show &&(
              <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              is24Hour={true}
              onChange={onChange}/>
            )}
            <Text style={styles.Text}>Total Pendapatan Telur</Text>
            <TextInput value={livestock?.amount.value} onChangeText={(text) => setLiveStock({ ...livestock, amount: {value: text, error: ''}  })} label='Pendapatan Total' keyboardType="numeric"/>

        <Button mode='contained' style={{margin:4}} onPress={onSubmit}>Simpan</Button>  
        <Button mode='contained'
            onPress={() => navigation.reset({
            index: 0, routes: [{ name: 'ListKandang' }],})}>Kembali</Button>   
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
        fontWeight: 'bold',
    }
})