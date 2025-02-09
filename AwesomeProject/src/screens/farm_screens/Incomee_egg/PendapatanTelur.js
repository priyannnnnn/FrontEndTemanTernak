import { ScrollView, Text, StyleSheet, View, Alert } from "react-native";
import BackButton from "../../../components/BackButton";
import Button from "../../../components/Button";
import Header from "../../../components/HeaderInputKandang";
import { theme } from "../../../core/theme";
import TextInput from "../../../components/TextInputKandang";
import { useState,useContext } from "react";
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from "moment";
import axios from "axios";
import { axiosInstance } from "../../../context/api";
import { AuthContext } from "../../../context/AuthContext";
import { AxiosContext} from "../../../context/AxiosContext";
import * as Keychain from 'react-native-keychain';
import { AuthProvider } from "../../../context/AuthContext";
// import { AxiosProvider } from "../../context/AxiosContext";
import { AxiosProvider } from "../../../context/AxiosContext";
import kandangStyle from "../../../helpers/styles/kandang.style";

function PendapatanTelur(props) {

  const {navigation}=props;
  const axiosContext = useContext(AxiosContext);
  const authContext = useContext(AuthContext);

  const [IncomeEgg, setIncomeEgg]=useState({
    quantity: {value :'',error:''},
    date:     {value:`${moment(date).format('YYYY-MM-DD')}`, error:''}
  })

  const onSubmit = () => {
    const data={
      quantity:IncomeEgg?.quantity?.value.replace(/\./g,''),
      date: IncomeEgg?.date?.value
    }
    axiosContext.authAxios.post(`/api/v1/incomeEgg`, data)
    .then(res => {
      navigation.navigate('DaftarPendapatanTelur',{itemp:res.data})
    })
    .catch((error) => {
      navigation.navigate('DaftarPendapatanTelur')
      console.error(error);
    })
  }

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    setShow(false);
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

  const formatAmount = (text) => {
    // Remove non-numeric characters
    const onlyNumbers = text.replace(/[^0-9]/g, '');
    // Format number with dots after every 3 digits
    const formatted = onlyNumbers.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return formatted;
  };

  return (
    <ScrollView style={kandangStyle.ScrollView}>
      <View style={kandangStyle.View}>
        <BackButton goBack={navigation.goBack} />
        <Header>Telur</Header>
        <Text style={kandangStyle.Text}>Jumlah Telur</Text>
        <TextInput value={IncomeEgg?.quantity.value} onChangeText={(text)=> {
          const formatted = formatAmount(text); 
          setIncomeEgg({...IncomeEgg, quantity:{value:formatted, error:''}});
          }}
          label='Masukkan Jumlah Telur' 
          keyboardType="numeric" 
        />
          
        <Text style={kandangStyle.Text}>Tanggal</Text>
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
          onPress={onSubmit}
        >
          Simpan
        </Button>
        <Button
          mode='contained'
          onPress={()=> navigation.navigate('DaftarPendapatanTelur', {itemp:8})}
        >Kembali</Button>
      </View>
    </ScrollView>
    // <AuthProvider/>
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