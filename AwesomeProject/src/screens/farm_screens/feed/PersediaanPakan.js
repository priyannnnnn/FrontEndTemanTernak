import { Text, TouchableOpacity, View , StyleSheet, ScrollView, Alert} from "react-native";
import BackButton from "../../../components/BackButton";
import Background from "../../../components/StartBackground";
import Button from "../../../components/Button";
import Header from "../../../components/HeaderInputKandang";
import TextInput from "../../../components/TextInput";
import { theme } from "../../../core/theme";
import { useContext, useEffect, useState } from "react";
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from "moment";
import axios from "axios";
import { Picker } from "@react-native-picker/picker";
import { AxiosContext } from "../../../context/AxiosContext";
import kandangStyle from "../../../helpers/styles/kandang.style";
import RNPickerSelect from 'react-native-picker-select';

function PersediaanPakan({navigation}) {
  const [feed, setFeed] = useState({
    quantity: { value : '',error:''},
    type:     { value : '', error: '' },
    amount:   { value : '', error: '' },
    date:     { value : '', error: '' },
  })

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const axiosContext = useContext(AxiosContext);

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

  const formatAmount = (text) => {
    // Remove non-numeric characters
    const onlyNumbers = text.replace(/[^0-9]/g, '');
    // Format number with dots after every 3 digits
    const formatted = onlyNumbers.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return formatted;
  };

  const showDatepicker = () => {
    showMode('date');
  };

  useEffect(() => {
    setFeed({...feed, date:{ value: `${moment(date).format('YYYY-MM-DD')}`, error: ''}})
  }, [date])

  const onSubmit=()=>{
    const data={
      amount:feed?.amount?.value.replace(/\./g, ''),
      type:feed?.type?.value,
      quantity:feed?.quantity?.value.replace(/\./g, ''),
      date:feed?.date?.value,
    }
      const amount=!isNaN(data.amount) && data.amount>1;
      const type=data.type.trim().length>0;
      const quantity=!isNaN(data.quantity) && data.quantity>1;

        if(!amount || !quantity || !type){
          Alert.alert('Data Anda Salah',"Mohon Untuk Cek Kembali")
          return;
        }

    console.log(data);
    axiosContext.authAxios.post('/api/v1/feed',data)
      .then(res => {
        console.log(res.data)
        navigation.navigate('DaftarPersediaanPakan',{itemp:res.data})
      })
      .catch((error) => {
        console.error(error);
      })
  }

  
    return (
      <ScrollView style={kandangStyle.ScrollView}>
        <View style={kandangStyle.View}>
            <BackButton goBack={navigation.goBack}/>
            <Header>Persediaan Pakan</Header>
            <Text style={kandangStyle.Text}>Jumlah per KG</Text>
            <TextInput value={feed?.quantity.value} onChangeText={(text)=> {
              const formatted = formatAmount(text);
              setFeed({...feed, quantity: { value: formatted, error:''} });
              }} 
              label='Masukkan Pakan' 
              keyboardType='numeric'
            />

            <Text style={kandangStyle.Text}>Type</Text>
            <RNPickerSelect
              onValueChange={(text) => {setFeed({...feed, type:{value: text, error:''}})}}
              items={[
                { label: 'PEDAGING', value: 'PEDAGING' },
                { label: 'PETELUR', value: 'PETELUR' },
              ]}
              style={{
                inputIOS: styles.input,
                inputAndroid: styles.input,
                placeholder: styles.placeholder,
              }}
              placeholder={{ label: 'Jenis Pakan ', value: feed?.type.value, color: 'gray' }}
              useNativeAndroidPickerStyle={true}
              // Icon={() => <MaterialIcons name="house" size={24} color="gray" />}
            />
            {/* <TextInput value={feed?.type.value} onChangeText={(text)=> setFeed({...feed, type: {value:text, error:''} })} label='Nama Produk Pakan'/> */}

            <Text style={kandangStyle.Text}>Harga Total</Text>
            <TextInput value={feed?.amount.value} onChangeText={(text)=> {
              const formatted = formatAmount(text);
              setFeed({...feed, amount: {value:formatted, error:''} });
              }}
              placeholder='Harga keseluruhan' 
              keyboardType='numeric'
            />

            <Text style={kandangStyle.Text}>Tanggal</Text>
            <TextInput value={feed?.date.value} onChangeText={(text)=> setFeed({...setFeed, date:{value:text, error:''}})} onBlur={onChange} onChange={showDatepicker} onFocus={showDatepicker} label= 'Tanggal'/>
            {show &&(
              <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              is24Hour={true}
              onChange={onChange}/>
            )}

            <Button mode='contained' style={{ marginTop: 4 }} onPress={onSubmit}>Simpan</Button>
            <Button 
            mode='contained'
                onPress={() => navigation.navigate('DaftarPersediaanPakan',{itemp:8})}>Kembali</Button>
        </View>
       </ScrollView>
       ////sheejj
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
    marginTop:20
  },
  Text:{
    textAlign:'left',
    fontSize:24,
    fontWeight: '500',
    color:'#000000'
  },
  ScrollView:{
    flex:1,
    backgroundColor:theme.colors.backgroundColor,
    marginTop:15
  },
  title:{
    color:'#000000'
  },
  input1: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
    fontSize: 16,
    color: 'black',
  },
  placeholder: {
    color: 'gray',
    fontSize: 12,
  },
  input:{
    width: '100%',
    marginVertical: 17,
    backgroundColor:'white'
  }
}) 