import { useContext, useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import TextInput from "../../components/TextInput";
import { theme } from "../../core/theme";
import Button from "../../components/Button";
import moment from "moment";
import axios from "axios";
import DateTimePicker from '@react-native-community/datetimepicker';
import { AxiosContext } from "../../context/AxiosContext";

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

    useEffect(()=> {
        getData(id)
    },[])

    const config={
      headers:{Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0XzI0QGdtYWlsLmNvbSIsImlhdCI6MTY4NjQ2Mzg2NiwiZXhwIjoxNjg2NDY1MzA2fQ.VaduI3MQZnP8J9JreMZtsGa7in5tukyhZ9vWELRiuVM"}`}
    }


    const getData=(id)=>{
        // fetch ('http://139.162.6.202:8000/api/v1/saleEgg/'+id,config ,{method:'GET'})
        // .then (res => res.json())
        axiosContext.authAxios.get('/api/v1/saleEgg/'+id)
        .then (res =>{
            console.log(res.data)
            setsaleEgg({
                ...saleEgg,
                id:res.id,
                quantity  : { value : `${res.data.quantity}`, error: '' },
                amount    : { value : `${res.data.amount}`, error: '' },
                date      : { value : `${res.data.date}`, error: '' }
                //.format('YYYY-MM-DD')
            })
        })
        .catch((error) => {
            console.log(error)
        })}

        const UpdateData=()=>{
          const Data={
              quantity:saleEgg?.quantity.value,
              amount : saleEgg?.amount.value,
              date :saleEgg?.date.value
          }
          console.log(id)
          console.log(Data);
          // axios.put(`http://139.162.6.202:8000/api/v1/incomeEgg/`+id,Data,config)
          axiosContext.authAxios.put(`/api/v1/saleEgg/`+id,Data)
          .then (res =>{
            navigation.navigate ('DaftarPenjualanTelur', {name:'DaftarPenjualanTelur'})
            // getData()
            //console.log(res.data)
          })
          
          .catch((error) =>{
              console.error(error, "hfhf");
          })
      }



        const onChange = (event, selectedDate) => {
            // const currentDate = selectedDate;
            setShow(false);};

        const showMode = (currentMode) => {
            if (Platform.OS === 'android') {
              setShow(true);
            }
            setMode(currentMode);
          };
        
          const showDatepicker = () => {
            showMode('date');
          };

    return(
    <View style={styles.View}>
        <Text style={styles.title}>Daftar PendapatanTelur</Text>

       <Text style={styles.Text}>Jumlah Telur</Text>
       <TextInput value={saleEgg?.quantity.value}  onChangeText={(text)=> setsaleEgg({...saleEgg, quantity:{value:text, error:''}})} keyboardType="numeric" />

       <Text style={styles.Text}>Total Pendapatan Telur</Text>
       <TextInput value={saleEgg?.amount.value}  onChangeText={(text)=> setsaleEgg({...saleEgg, amount:{value:text, error:''}})} keyboardType="numeric" />

       <Text style={styles.Text}>Tanggal</Text>
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
                    routes: [{ name: 'DaftarPenjualanTelur' }], })}>Kembali</Button>
    </View>
    )
}
export default UpdatePenjualanTelur;
const styles =StyleSheet.create({
    View:{
        flex: 1,
        width: '100%',
        backgroundColor:'#FAEBD7',
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
})