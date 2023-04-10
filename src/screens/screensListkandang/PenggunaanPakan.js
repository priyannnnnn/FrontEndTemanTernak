import { Text, TouchableOpacity, View, StyleSheet, ScrollView } from "react-native";
import BackButton from "../../components/BackButton";
import Button from "../../components/Button";
import Header from "../../components/HeaderInputKandang";
import Input from "../../components/input";
import TextInput from "../../components/TextInput";
import { theme } from "../../core/theme";
import { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from "moment";

function PenggunaanPakan({navigation}) {

  const [ livestock, setLiveStock ] = useState({
    choosefeed: { value : '', error: '' },
    amountfeed: { value : '', error: '' },
    type:       { value : '', error: '' },
    date:       { value : 'NOTE', error: '' },
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

  const [selectedValue, setSelectedValue] = useState("java");

  const onSubmit = () => {
    const data = {
      choosefeed: livestock?.choosefeed?.value,
      amountfeed: livestock?.amountfeed?.value,
      type: livestock?.type?.value,
      date: livestock?.date?.value
    }
    axios.post(`http://139.162.6.202:8000/api/v1/livestock`, data)
      .then(res => {
        navigation.navigate('DaftaPenggunaanPakan', {name: 'DaftarPenggunaanPakan'})
      })
      .catch((error) => {
        console.error(error);
      })
  }
  
    return (
      <ScrollView style={style.ScrollView}>
        <View style={style.View}>
            <BackButton goBack={navigation.goBack}/>
            <Header>Penggunaan Pakan</Header>

            <Text style={style.Text}>Pilih Pakan</Text>
            <TextInput value={livestock?.choosefeed.value} onChangeText={(text) => setLiveStock({ ...livestock, choosefeed: {value: text, error: ''}  })}label='Masukkan Produk Pakan'/>

            <Text style={style.Text}>Jumlah perKG</Text>
            <TextInput value={livestock?.amountfeed.value} onChangeText={(text) => setLiveStock({ ...livestock, amountfeed: {value: text, error: ''}  })}
            label= 'Masukkan Jumlah Pakan'/>

            <Text style={style.Text}>Type</Text>

            <View style={{ borderRadius:5,borderWidth:1,borderColor:'#708090',overflow:'hidden',}}> 
            <Picker
            style={{backgroundColor:'#FFFAFA',width:"100%",height:50,textAlign:'center',marginTop:-8,marginBottom:7}}
              selectedValue={livestock?.type.value}
              onValueChange={(itemValue, itemIndex) => setLiveStock({...livestock, type:{value:itemValue,error:''}})}
              >
              <Picker.Item label="P100" value="java" />
              <Picker.Item label="Sinta" value="js" />
              <Picker.Item label="Comfeed" value="j" />
            </Picker>
              </View>

            {/* <TextInput value={livestock?.type.value} onChangeText={(text) => setLiveStock({ ...livestock, type: {value: text, error: ''}  })}label='Nama Produk Pakan'/> */}

            <Text style={style.Text}>Tanggal</Text>
            <TextInput value={`${moment(date).format('YYYY-MM-DD')}`} onBlur={onChange} onFocus={showDatepicker}
            label='Tanggal'/>
            {show &&(
              <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              is24Hour={true}
              onChange={onChange}/>
            )}

            <Button mode='contained' style={{ marginTop: 4 }} onPress={onSubmit}>Simpan</Button>
            <Button mode='contained'onPress={() =>navigation.reset({index: 0,routes: [{ name: 'ListKandang' }],})}>Kembali</Button>
        </View>
      </ScrollView>
    )
}
export default PenggunaanPakan;
const style=StyleSheet.create({
        View:{
        flex: 1,
        width: '100%',
        backgroundColor: theme.colors.backgroundColor,
        padding: 10,
        alignSelf: 'center',
        justifyContent: 'center',
      },
      Text:{
        textAlign:'left',
        fontSize:18,
        fontWeight: 'bold',
      },
      ScrollView:{
        flex:1,
        backgroundColor:theme.colors.backgroundColor,
        paddingBottom:1,
        marginTop:45
      },
      
})