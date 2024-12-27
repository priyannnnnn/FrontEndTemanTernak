import kandangStyle from "../../../helpers/styles/kandang.style";
import { Picker } from "@react-native-picker/picker";
import { AxiosContext } from "../../../context/AxiosContext";
import { useContext, useEffect, useState } from "react";
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from "moment";
import { theme } from "../../../core/theme";
import Button from "../../../components/Button";
import Header from "../../../components/HeaderInputKandang";
import TextInput from "../../../components/TextInput";
import { Text, TouchableOpacity, View , StyleSheet, ScrollView, Alert} from "react-native";
import BackButton from "../../../components/BackButton";


function FeedUse({navigation}){
    const [feed, setFeed] = useState({
        quantity: { value : '',error:''},
        note:     { value : '', error: '' },
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
          note:feed?.note?.value,
          quantity:feed?.quantity?.value.replace(/\./g, ''),
          date:feed?.date?.value,
        }
          const quantity=!isNaN(data.quantity) && data.quantity>1;
    
            if(!quantity){
              Alert.alert('Data Anda Salah',"Mohon Untuk Cek Kembali")
              return;
            }
    
        console.log(data);
        axiosContext.authAxios.post('/api/v1/feeduse',data)
          .then(res => {
            console.log(res.data)
            navigation.navigate('ListFeedsUse',{itemp:res.data})
          })
          .catch((error) => {
            Alert.alert(
              "Tidak Bisa Menambah Data",
              "Pastikan Anda Memiliki Stok Pakan"
            )
            console.error(error);
          })
      }
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
          <BackButton goBack={navigation.goBack}/>
          <Header>Penggunaan Pakan</Header>
          <Text style={kandangStyle.Text}>Jumlah per KG</Text>
          <TextInput value={feed?.quantity.value} onChangeText={(text)=> {
            const formatted = formatAmount(text);
            setFeed({...feed, quantity: { value: formatted, error:''} })
            }} 
            label='Masukkan Pakan' 
            keyboardType='numeric'
          />

          <Text style={kandangStyle.Text}>Catatan</Text>
          <TextInput value={feed?.note.value} onChangeText={(text)=> setFeed({...feed, note: {value:text, error:''} })}label='Catatan'/>

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
              onPress={() => navigation.navigate('ListFeedsUse',{itemp:8})}>Kembali</Button>
      </View>
     </ScrollView>
  )
}
export default FeedUse;
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
  }
}) 