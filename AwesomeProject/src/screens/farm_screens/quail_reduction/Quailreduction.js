import { useContext, useEffect, useState } from "react";
import { AxiosContext } from "../../../context/AxiosContext";
import { Picker } from "@react-native-picker/picker";
import moment from "moment";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Text, StyleSheet, View, ScrollView, Alert} from "react-native";
import BackButton from "../../../components/BackButton";
import Button from "../../../components/Button";
import TextInput from "../../../components/TextInput";
import { theme } from "../../../core/theme";
import Header from "../../../components/HeaderInputKandang";
import kandangStyle from "../../../helpers/styles/kandang.style";

function QuailReduction({route, navigation}){
  
    const axiosContext = useContext(AxiosContext);
    const [ livestock, setLiveStock ] = useState({
      quantity: { value : '', error: '' },
      date:     { value : '', error: '' },
      reason:   { value : '', error: '' },
      type:     { value : '', error: '' },
    })
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

    const formatAmount = (text) => {
      // Remove non-numeric characters
      const onlyNumbers = text.replace(/[^0-9]/g, '');
      // Format number with dots after every 3 digits
      const formatted = onlyNumbers.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
      return formatted;
    };
  
    useEffect(() => {
      setLiveStock({...livestock, date:{ value: `${moment(date).format('YYYY-MM-DD')}`, error: ''}})
    }, [date])
  
    const onSubmit = () => {
      const data = {
        quantity: livestock?.quantity?.value.replace(/\./g, ''),
        date: livestock?.date?.value,
        reason: livestock?.amount?.value,
        type: livestock?.type?.value,
      }
      // const ageIsValid=!isNaN(data.age)&& data.age>1;
      // const quantityIsValid=!isNaN(data.quantity) && data.quantity>1;
      // const amountIsValid=!isNaN(data.amount)&& data.amount>1;
      // const typeIsvalid=data.type.trim().length>0
  
  
      //   if (!ageIsValid || !quantityIsValid || !amountIsValid || !typeIsvalid){
      //     Alert.alert ('Data Anda Salah',"Mohon Untuk Cek Kembali")
      //     return;
      //   }
      axiosContext.authAxios.post(`/api/v1/quailreduction`, data)
        .then(res => {
          console.log(res.data)
          console.info("succes livestock")
          //navigation.navigate('DaftarTernak', {name: 'DaftarTernak'})
          navigation.navigate('ListQuailReduction', {itemp:res.data})
        })
        .catch((error) => {
          console.error(error);
        })
    }
  
    return (
      // <Back>
      <ScrollView style={kandangStyle.ScrollView}>
        <View style={kandangStyle.View}>
        <BackButton goBack={navigation.goBack} />
        <Header>Isi Kandang</Header>
  
        <Text style={kandangStyle.Text}>Jumlah</Text>
        <TextInput value={livestock?.quantity.value} onChangeText={(text) => {
          const formatted = formatAmount(text)
          setLiveStock({ ...livestock, quantity: {value: formatted, error: ''}})
          }} 
          label='Masukkan Umur' 
          keyboardType="numeric"
        />
  
        <Text style={kandangStyle.Text} >Type</Text>
        <View style={{ borderRadius:5,borderWidth:1,borderColor:'#708090',overflow:'hidden',}}>
          <Picker
          style={{backgroundColor:'#FFFAFA',width:"100%",height:50,textAlign:'center',marginTop:-8,marginBottom:7}}
          selectedValue={livestock?.type.value}
          onValueChange={(itemValue,itemIndex) => setLiveStock({...livestock, type:{value:itemValue,error:''}})}>
            <Picker.Item/>
            <Picker.Item style={kandangStyle.title} label="Peksi" value="peksi"/>
            <Picker.Item style={kandangStyle.title} label="Blaster" value="blaster"/>
            <Picker.Item style={kandangStyle.title} label="Albino" value="albino"/>
          </Picker>
        </View>
        
        <Text style={kandangStyle.Text}>Alasan</Text>
        <TextInput value={livestock?.reason.value} onChangeText={(text) => setLiveStock({ ...livestock, reason: {value: text, error: ''}  })}  label='Alasan Afkir' />
  
        <Text style={kandangStyle.Text}>Tanggal</Text>
        <TextInput value={livestock?.date.value} onChangeText={(text) => setLiveStock({...setLiveStock, date: {value: text, error: ''}  })}  onBlur={onChange} onChange={showDatepicker} onFocus={showDatepicker} label='Masukkan Tanggal'/>
        {show &&(
          <DateTimePicker
          testID="dateTimePicker"
                value={date}
                mode={mode}
                is24Hour={true}
                onChange={onChange}/>
                )}
    
        <Button mode='contained' style={{ marginTop: 4 }} onPress={ onSubmit }>Simpan</Button>
        <Button mode='contained'
          onPress={() => navigation.reset({index: 0,
            routes: [{ name: 'Dashboard' }],})}>Kembali</Button>
        </View>
      </ScrollView>
            // </Back>
         
    )
  }
  export default QuailReduction;
  const style=StyleSheet.create({
    View:{
      flex: 1,
      width: '100%',
      backgroundColor: theme.colors.screen,
      padding: 20,
      alignSelf: 'center',
      justifyContent: 'center',
    },
    Text:{
      textAlign:'left',
      fontSize:20,
      fontWeight: '500',
      color:'#F9FBE7'
    },
    ScrollView:{
      flex:1,
      width:'100%',
      paddingBottom:1,
      backgroundColor:theme.colors.screen,
      marginTop:0
    },
    title:{
      color:'#000000'
    },

})
