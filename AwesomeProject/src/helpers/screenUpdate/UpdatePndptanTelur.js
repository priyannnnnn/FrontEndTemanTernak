import { useContext, useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import TextInput from "../../components/TextInput";
import { theme } from "../../core/theme";
import Button from "../../components/Button";
import moment from "moment";
import axios from "axios";
import DateTimePicker from '@react-native-community/datetimepicker';
import { AxiosContext } from "../../context/AxiosContext";

function UpdatePendapatanTelur(props){

    const {navigation, route}=props;
    const {id}= route.params;
    const [IncomeEgg, setIncomeEgg]= useState({
        quantity: {value :'',error:''},
        date:     {value:'', error:''}
    })
    //${moment(date).format('YYYY-MM-DD')}

    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const axiosContext = useContext(AxiosContext);

    useEffect(()=> {
        getData(id)
    },[])
    
    const getData=(id)=>{
      console.log("id = ", id)
      axiosContext.authAxios.get('/api/v1/incomeEgg/'+id)
        // fetch ('http://139.162.6.202:8000/api/v1/incomeEgg/'+id,config ,{method:'GET'})
        // .then (res => res.json())
        .then (res =>{
            console.log(res.data)
            setIncomeEgg({
                ...IncomeEgg,
                id:res.id,
                quantity:{value:`${res.data.quantity}`,error:''},
                date : {value:`${res.data.date}`, error:''}
                //.format('YYYY-MM-DD')
            })
        })
        .catch((error) => {
            console.log(error)
        })}

        const UpdateData=()=>{
            const Data={
                quantity: parseInt(IncomeEgg?.quantity?.value),
                date :IncomeEgg?.date?.value
            }
            console.log(Data);
            console.log("Update Data")
            console.log("Id Update = ",id)
             //axios.put(`http://139.162.6.202:8000/api/v1/incomeEgg/`+id,Data,config)
            axiosContext.authAxios.put(`/api/v1/incomeEgg/`+id,Data)
            .then (res =>{
              console.log("",res.data)
              navigation.navigate ('DaftarPendapatanTelur')
              getData()
              //console.log(res, "ress")
            })
            
            .catch((error) =>{
                console.error(error, "Error");
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
    
    return (
        <View style={styles.View}>
             <Text style={styles.title}>Daftar PendapatanTelur</Text>
             <Text style={styles.Text}>Jumlah Telur</Text>
            <TextInput value={IncomeEgg?.quantity.value}  onChangeText={(text)=> setIncomeEgg({...IncomeEgg, quantity:{value:text, error:''}})} keyboardType="numeric" />

            <Text style={styles.Text}>Tanggal</Text>
            <TextInput value={IncomeEgg?.date.value}  onChangeText={(text)=> setIncomeEgg({...IncomeEgg, date:{value:text, error:''}})} onBlur={onChange} onChange={showDatepicker} onFocus={showDatepicker}/>
            {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            onChange={onChange}
          />
        )}

            <Button mode='contained' style={{ marginTop: 4 }} onPress={()=> UpdateData()} >Simpan</Button>
            <Button mode='contained'
                onPress={() => navigation.reset({ index: 0,
                    routes: [{ name: 'DaftarPendapatanTelur' }], })}>Kembali</Button>
        </View>
    )
}
export default UpdatePendapatanTelur;
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