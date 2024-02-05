import { Text, TouchableOpacity, View , StyleSheet, ScrollView, Alert} from "react-native";
import BackButton from "../../components/BackButton";
import Background from "../../components/StartBackground";
import Button from "../../components/Button";
import Header from "../../components/HeaderInputKandang";
import TextInput from "../../components/TextInput";
import { theme } from "../../core/theme";
import { useContext, useEffect, useState } from "react";
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from "moment";
import axios from "axios";
import { Picker } from "@react-native-picker/picker";
import { AxiosContext } from "../../context/AxiosContext";


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

  const showDatepicker = () => {
    showMode('date');
  };

  useEffect(() => {
    setFeed({...feed, date:{ value: `${moment(date).format('YYYY-MM-DD')}`, error: ''}})
  }, [date])

  const onSubmit=()=>{
    const data={
      amount:feed?.amount?.value,
      type:feed?.type?.value,
      quantity:feed?.quantity?.value,
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
   // axios.post(`http://139.162.6.202:8000/api/v1/feed`, data)
      .then(res => {
        console.log(res.data)
        navigation.navigate('DaftarPersediaanPakan', {name: 'DaftarPersediaanPakan'})
      })
      .catch((error) => {
        console.error(error);
      })
  }

  
    return (
      <ScrollView style={styles.ScrollView}>
        <View style={styles.View}>
            <BackButton goBack={navigation.goBack}/>
            <Header>Persediaan Pakan</Header>
            <Text style={styles.Text}>Jumlah per KG</Text>
            <TextInput value={feed?.quantity.value} onChangeText={(text)=> setFeed({...feed, quantity: { value: text, error:''} })} label='Masukkan Pakan' keyboardType='numeric'/>

            <Text style={styles.Text}>Type</Text>
            <View style={{ borderRadius:5,borderWidth:1,borderColor:'#708090',overflow:'hidden',}}>
            <Picker style={{backgroundColor:'#FFFAFA',width:"100%",height:50,textAlign:'center',marginTop:-8,marginBottom:7,}}
              selectedValue={feed?.type.value}
              onValueChange={(itemvalue) => setFeed({...feed, type:{value:itemvalue, error:''}})}>
              <Picker.Item/>
              <Picker.Item style={styles.title} label="pedaging" value="pedaging"/>
              <Picker.Item style={styles.title} label="petelur" value="petelur"/>
            </Picker>
            </View>
            {/* <TextInput value={feed?.type.value} onChangeText={(text)=> setFeed({...feed, type: {value:text, error:''} })} label='Nama Produk Pakan'/> */}

            <Text style={styles.Text}>Harga Total</Text>
            <TextInput value={feed?.amount.value} onChangeText={(text)=> setFeed({...feed, amount: {value:text, error:''} })}label='Harga keseluruhan' keyboardType='numeric'/>

            <Text style={styles.Text}>Tanggal</Text>
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
                onPress={() => navigation.reset({ index: 0,
                routes: [{ name: 'Dashboard' }], })}>Kembali</Button>
        </View>
       </ScrollView>
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
    fontSize:18,
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
  }
}) 