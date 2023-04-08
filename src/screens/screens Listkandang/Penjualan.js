import { theme } from "../../core/theme"; 
import TextInput from "../../components/TextInputKandang";
import { ScrollView, StyleSheet, View,Text } from "react-native";
import BackButton from "../../components/BackButton";
import Button from "../../components/Button";
import Header from "../../components/HeaderInputKandang";
import { useState } from "react";
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from "moment";

function Penjualan({navigation}){

    const [ livestock, setLiveStock ] = useState({
        totalegg:      { value : '', error: '' },
        totalpriceegg: { value : '', error: '' },
        date:          { value : '', error: '' },
      })

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

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
    
      const onSubmit = () => {
        const data = {
          totalegg: livestock?.totalegg?.value,
          totalpriceegg: livestock?.totalpriceegg?.value,
          date:livestock?.date?.value
        }
        axios.post(`http://139.162.6.202:8000/api/v1/livestock`, data)
        .then(res => {
          navigation.navigate('DaftarPenjualanTelur', {name: 'DaftarPenjualanTelur'})
        })
        .catch((error) => {
          console.error(error);
        })
    }
    return(
        <ScrollView>
        <View style={styles.View}>
        <BackButton goBack={navigation.goBack}/>
            <Header>Penjualan Telur</Header>
            <Text style={styles.Text}>Jumlah Telur</Text>
            <TextInput value={livestock?.totalegg.value} onChangeText={(text) => setLiveStock({ ...livestock, totalegg: {value: text, error: ''}  })} label='Masukkan Jumlah Telur'/>

            <Text style={styles.Text}>Tanggal</Text>
            <TextInput value={`${moment(date).format('YYYY-MM-DD')}`} onBlur={onChange} onFocus={showDatepicker} label= 'Tanggal'/>
            {show &&(
              <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              is24Hour={true}
              onChange={onChange}/>
            )}
            <Text style={styles.Text}>Total Pendapatan Telur</Text>
            <TextInput value={livestock?.totalpriceegg.value} onChangeText={(text) => setLiveStock({ ...livestock, totalpriceegg: {value: text, error: ''}  })} label='Pendapatan Total'/>

        <Button mode='contained' style={{margin:4}} onPress={onSubmit}>Simpan</Button>  
        <Button mode='contained'
            onPress={() => navigation.reset({
            index: 0, routes: [{ name: 'ListKandang' }],})}>Kembali</Button>   
        </View> 
        </ScrollView>
    )
}
export default Penjualan;
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
    }
})