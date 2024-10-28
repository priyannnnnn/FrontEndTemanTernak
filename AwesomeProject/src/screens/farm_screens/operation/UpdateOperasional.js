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

function UpdateOperasional(props) {
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
  const {navigation, route}=props;
  const{id} = route.params;

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
    console.log("id Data = ", id)
    GetData(id)
  },[])

  const GetData = (id)=>{
    axiosContext.authAxios.get(`/api/v1/operatingCosh/`+id)
    .then(res =>{
        setOperation({...Operation, 
            id: res.id,
            date : {value: `${res.data.date}`, error:''},
            description : {value:`${res.data.description}`, error:''},
            amount : {value:`${res.data.amount}`,error:''}
        })
    })
    .catch((error) => {
        console.log(error)
    })
  }
  
  const onSubmit = () => {
    const data = {
      date : Operation?.date?.value,
      description : Operation?.description.value,
      amount : Operation?.amount?.value,
    }
    axiosContext.authAxios.put(`/api/v1/operatingCosh/`+id, data)
    .then(res => {
      navigation.navigate('ListOperational',{itemp:res.data})
    })
    .catch((e) => {
      console.error(e)
    })
  }
    return (
      <ScrollView style={styles.ScrollView}>
         <View style={styles.View}>
            <BackButton goBack={navigation.goBack}/>
            <Header>U Biaya Operasional</Header>
            <Text style={styles.Text}>Deskripsi</Text>
            <TextInput
            value={Operation?.description.value} onChangeText ={(text) => setOperation({...Operation, description:{value:text, error:''}})} label= 'deskripsi'/>
            <Text style={styles.Text}>Total Biaya Operasional</Text>
            <TextInput
            value = {Operation?.amount.value} onChangeText= {(text) => setOperation ({...Operation, amount: {value:text, error:''}})} label='Jumlah-Operasional'/>
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
export default UpdateOperasional;
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