import { Text, TouchableOpacity, View,StyleSheet, ScrollView} from "react-native";
import BackButton from "../../components/BackButton";
import Button from "../../components/Button";
import TextInput from "../../components/TextInput";
import { theme } from "../../core/theme";
import Header from "../../components/HeaderInputKandang"
import { useContext, useEffect, useState } from "react";
import { AxiosContext } from "../../context/AxiosContext";
import moment from "moment";
import DateTimePicker from '@react-native-community/datetimepicker';

function BiayaOperasional({navigation}) {
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
    const Data = {
      date : Operation?.date?.value,
      description : Operation?.description.value,
      amount : Operation?.amount?.value,
    }
    axiosContext.authAxios.post(`/api/v1/operatingCosh`,Data)
    .then(res => {
      console.log("Get Data = ", res.data)
      navigation.navigate('DaftarOperasional')
    })
    .catch((e) => {
      console.error(e)
    })
  }
    return (
      <ScrollView style={styles.ScrollView}>
         <View style={styles.View}>
            <BackButton goBack={navigation.goBack}/>
            <Header>Biaya Operasional</Header>
            <Text style={styles.Text}>Tanggal</Text>
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

            <Text style={styles.Text}>Deskripsi</Text>
            <TextInput
            value={Operation?.description.value} onChangeText ={(text) => setOperation({...Operation, description:{value:text, error:''}})} label= 'Tanggal'/>
            <Text style={styles.Text}>Jumlah</Text>
            <TextInput
            value = {Operation?.amount.value} onChangeText= {(text) => setOperation ({...Operation, amount: {value:text, error:''}})} label='Lain-lain'/>

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
                    routes: [{ name: 'ListKandang' }],
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