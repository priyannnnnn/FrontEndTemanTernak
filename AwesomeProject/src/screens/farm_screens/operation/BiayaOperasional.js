import { Text, TouchableOpacity, View,StyleSheet, ScrollView} from "react-native";
import BackButton from "../../../components/BackButton";
import Button from "../../../components/Button";
import TextInput from "../../../components/TextInput";
import { theme } from "../../../core/theme";
import Header from "../../../components/HeaderInputKandang"
import { useContext, useEffect, useState } from "react";
import { AxiosContext } from "../../../context/AxiosContext";
import moment from "moment";
import DateTimePicker from '@react-native-community/datetimepicker';
import kandangStyle from "../../../helpers/styles/kandang.style";

function BiayaOperasional(props) {
  const [Operation, setOperation] = useState({
    date : {value: '', error:''},
    description : {value:'', error:''},
    amount : {value:'',error:''}
  })
  const [Loading, setLoading] = useState()
  const axiosContext = useContext(AxiosContext);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const[show, setShow]= useState(false);
  const {navigation}=props;

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

  useEffect (() => {
    setOperation ({...Operation, date:{value : `${moment(date).format('YYYY-MM-DD')}`, error:''}})
  },[date])
  
  const onSubmit = () => {
    const data = {
      date : Operation?.date?.value,
      description : Operation?.description.value,
      amount : Operation?.amount?.value,
    }

    console.log("Data = ", data)
    axiosContext.authAxios.post(`/api/v1/operatingCosh`,data)
    .then(res => {
      console.log("Get Data = ", res.data)
      navigation.navigate('DaftarOperasional',{itemp:res.data})
    })
    .catch((e) => {
      console.error(e)
    })
  }
    return (
      <ScrollView style={kandangStyle.ScrollView}>
         <View style={kandangStyle.View}>
            <BackButton goBack={navigation.goBack}/>
            <Header>Biaya Operasional</Header>

            <Text style={kandangStyle.Text}>Deskripsi</Text>
            <TextInput
            value={Operation?.description.value} onChangeText ={(text) => setOperation({...Operation, description:{value:text, error:''}})} label= 'deskripsi'/>
            <Text style={kandangStyle.Text}>Total Biaya Operasional</Text>
            <TextInput
            value = {Operation?.amount.value} onChangeText= {(text) => setOperation ({...Operation, amount: {value:text, error:''}})} label='Jumlah-Operasional'/>
            <Text style={kandangStyle.Text}>Tanggal</Text>
            <TextInput 
              value={Operation?.date.value} onChangeText = {(text) => setOperation({...Operation, date: {value: text,error:''}})}  label='Tuliskan Keterangan' 
              onChange={showDatepicker} onBlur={onChange} onFocus={showDatepicker}/>
              {show && (
                <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={mode}
                is24Hour={true}
                onChange={onChange}/>
              )}
            <Button
            mode='contained'
            style={{ marginTop: 4 }} onPress ={onSubmit}>
                Simpan
            </Button>
            <Button 
            mode='contained'
                onPress={() =>
                  navigation.reset({
                    index: 0,
                    routes: [{ name: 'Dashboard' }],
                  })
                }
            >Kembali</Button>
          </View>
       </ScrollView>
    )
}
export default BiayaOperasional;
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
    color:'#000000'
  },
  ScrollView:{
    flex:1,
    backgroundColor:theme.colors.backgroundColor,
    marginTop:35
  }
})