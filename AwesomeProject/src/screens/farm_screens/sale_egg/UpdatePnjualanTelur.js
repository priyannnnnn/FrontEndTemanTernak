import { useContext, useEffect, useState } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import TextInput from "../../../components/TextInput";
import { theme } from "../../../core/theme";
import Button from "../../../components/Button";
import moment from "moment";
import axios from "axios";
import DateTimePicker from '@react-native-community/datetimepicker';
import { AxiosContext } from "../../../context/AxiosContext";
import Header from "../../../components/HeaderInputKandang";
import kandangStyle from "../../../helpers/styles/kandang.style";

function UpdatePenjualanTelur(props){

    const {navigation, route}=props;
    const {id}= route.params;
    
    const [ saleEgg, setsaleEgg ] = useState({
        quantity  : { value : '', error: '' },
        amount    : { value : '', error: '' },
        date      : { value : '', error: '' },
      })
    //${moment(date).format('YYYY-MM-DD')}

    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const axiosContext = useContext(AxiosContext);

    const showMode = (currentMode) => {
      setShow(true);
      setMode(currentMode);
    };
  
    const showDatepicker = () => {
      showMode('date');
    };
    
    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate || date;
        setShow(false);
        setDate(currentDate);
    
      setsaleEgg({
        ...saleEgg,
        date: {
          value: currentDate.toISOString().split('T')[0], // Format to YYYY-MM-DD
          error: '',
        }
      });
    };

    const getData=(id)=>{
      axiosContext.authAxios.get('/api/v1/saleEgg/'+id)
      .then (res =>{
          console.log(res.data)
          setsaleEgg({
            ...saleEgg,
            id:res.id,
            quantity  : { value : `${res.data.quantity}`, error: '' },
            amount    : { value : `${res.data.amount}`, error: '' },
            date      : { value : `${res.data.date}`, error: '' }
          })
      })
      .catch((error) => {
        console.log(error)
      })
    }

    const UpdateData=()=>{
      const Data={
          quantity: saleEgg?.quantity?.value.replace(/\./g, ''),
          amount: saleEgg?.amount?.value.replace(/\./g, ''),
          date:saleEgg?.date?.value
      }
      axiosContext.authAxios.put(`/api/v1/saleEgg/`+id,Data)
        .then (res =>{
          navigation.navigate ('DaftarPenjualanTelur', {itemp:res.data})
        }) 
        .catch((error) =>{
          console.error(error, "hfhf");
        })
    }
    useEffect(()=> {
      getData(id)
    },[])

    const formatAmount = (text) => {
      const onlyNumbers = text.replace(/[^0-9]/g, '');
      const formatted = onlyNumbers.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
      return formatted;
    };

    return(
      <ScrollView style={kandangStyle.ScrollView}>
    <View style={styles.View}>
        <Header>Update Penjualan Telur</Header>

       <Text style={kandangStyle.Text}>Jumlah Telur</Text>
       <TextInput value={saleEgg?.quantity.value}  
       onChangeText={(text)=> {
        const formatted = formatAmount(text);
        setsaleEgg({ ...saleEgg, quantity: {value: formatted, error: ''}  })
       }}
       keyboardType="numeric" />

       <Text style={kandangStyle.Text}>Total Pendapatan Telur</Text>
       <TextInput value={saleEgg?.amount.value}  
       onChangeText={(text)=> {
        const formatted = formatAmount(text);
        setsaleEgg({ ...saleEgg, amount: {value: formatted, error: ''}  })
       }} 
       keyboardType="numeric" />

       <Text style={kandangStyle.Text}>Tanggal</Text>
          <TextInput value={saleEgg?.date.value}  onChangeText={(text)=> setsaleEgg({...saleEgg, date:{value:text, error:''}})} onBlur={onChange} onChange={showDatepicker} onFocus={showDatepicker}/>
          {show && (
        <DateTimePicker
          testID="dateTimePicker" value={date}
          mode={mode} is24Hour={true} onChange={onChange}
        />
          )}
        <Button mode='contained' style={{ marginTop: 4 }} onPress={()=> UpdateData(saleEgg.id)} >Simpan</Button>
        <Button mode='contained'
          onPress={() => navigation.reset({ index: 0,
          routes: [{ name: 'DaftarPenjualanTelur' }], })}>
            Kembali
        </Button>
    </View>
    </ScrollView>
    )
}
export default UpdatePenjualanTelur;
const styles =StyleSheet.create({
    View:{
        flex: 1,
        width: '100%',
        backgroundColor:theme.colors.screen,
        padding: 20,
        alignSelf: 'center',
        justifyContent: 'center',
        marginTop:20,
      },

      container: {
        paddingHorizontal: 20
      },
      title: {
        fontWeight: "bold",
        fontSize: 20,
        marginBottom: 30,
        color:'#000000'
      },
      Text: {
        textAlign: 'left',
        fontSize: 18,
        fontWeight: 'normal',
        marginBottom:-10,
        color:'#000000'
      },
      ScrollView:{
        flex:1,
        width:'100%',
        paddingBottom:1,
        backgroundColor:theme.colors.screen,
        marginTop:0
      },
})