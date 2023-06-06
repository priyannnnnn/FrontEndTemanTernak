import { ScrollView, Text, StyleSheet, View } from "react-native";
import BackButton from "../../components/BackButton";
import Button from "../../components/Button";
import Header from "../../components/HeaderInputKandang";
import { theme } from "../../core/theme";
import TextInput from "../../components/TextInputKandang";
import { useState } from "react";
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from "moment";
import axios from "axios";

function PendapatanTelur({ navigation }) {

  const [IncomeEgg, setIncomeEgg]=useState({
    quantity: {value :'',error:''},
    date:     {value:`${moment(date).format('YYYY-MM-DD')}`, error:''}
  })
  const onSubmit=()=>{
    const data={
      quantity:IncomeEgg?.quantity.value,
      date: IncomeEgg?.date.value
    }

    axios.post(`http://139.162.6.202:8000/api/v1/incomeEgg`,data)
    .then(res =>{
      navigation.navigate('DaftarPendapatanTelur')
    })
    .catch((error)=>{
      console.log(error)
    })
  }

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    // const currentDate = selectedDate;
    setShow(false);
    // setDate(currentDate);
    // if (event?.type === 'dismissed') {
      // setDate(date);
      // return;
  // }
  // setDate(selectedDate);
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

  return (
    <ScrollView style={styles.ScrollView}>
      <View style={styles.View}>
        <BackButton goBack={navigation.goBack} />
        <Header>Telur</Header>
        <Text style={styles.Text}>Jumlah Telur</Text>
        <TextInput value={IncomeEgg?.quantity.value} onChangeText={(text)=> setIncomeEgg({...IncomeEgg, quantity:{value:text,error:''}})} 
          label='Masukkan Jumlah Telur' keyboardType="numeric" />
          
        <Text style={styles.Text}>Tanggal</Text>
        <TextInput value={IncomeEgg?.date.value} onChangeText={(text)=> setIncomeEgg({...setIncomeEgg, date:{value:text,error:''}})} onBlur={onChange} onChange={showDatepicker} onFocus={showDatepicker} label='Tanggal' />
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            onChange={onChange}
          />
        )}

        <Button
          mode='contained'
          onPress={onSubmit
          }
        >
          Simpan
        </Button>
        <Button
          mode='contained'
          onPress={() =>
            navigation.reset({
              index: 0,
              routes: [{ name: 'ListKandang' }],
            })
          }
        >Kembali</Button>
      </View>
    </ScrollView>
  )
}
export default PendapatanTelur;
const styles = StyleSheet.create({
  View: {
    flex: 1,
    width: '100%',
    backgroundColor: theme.colors.backgroundColor,
    padding: 20,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  Text: {
    textAlign: 'left',
    fontSize: 18,
    fontWeight: '500',
    color:'#000000'
  },
  ScrollView: {
    flex: 1,
    backgroundColor: theme.colors.backgroundColor,
    marginTop: 0
  }

})