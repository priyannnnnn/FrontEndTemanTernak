import { useContext, useEffect, useState } from "react";
import { AxiosContext } from "../../../context/AxiosContext";
import { StyleSheet, Text, View } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import Button from "../../../components/Button";
import TextInput from "../../../components/TextInput";
import { theme } from "../../../core/theme";

function UpdateFeedsUse(props){

    const [loading, setLoading]= useState(true)
    const [errormessage, setErrorMessage]= useState('')
    const {navigation, route} = props;
    const {id}  = route.params;
    const axiosContext = useContext(AxiosContext);

    // const context=useContext(getData)
    const [feed, setfeed] = useState({
        quantity: { value : '', error:''},
        note:     { value : '', error: '' },
        date:     { value : '', error: '' },
        
    })

    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate || date;
        setShow(false);
        setDate(currentDate);
    
      setfeed({
        ...feed,
        date: {
          value: currentDate.toISOString().split('T')[0], // Format to YYYY-MM-DD
          error: '',
        }
      });
    };

      const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
      };
    
      const showDatepicker = () => {
        showMode('date');
      };

    useEffect(() => {
        getData(id)
    }, [])

    const getData = (id) => {
        console.log("Id = ",id)
        setLoading(true)
        axiosContext.authAxios.get('/api/v1/feeduse/'+id)
        .then(res =>{
            console.log(res);
            setfeed({
                ...feed, 
                id:res.id,
                quantity: {value:`${res.data.quantity}`, error:''}, 
                note: {value:`${res.data.note}`, error:''},
                amount: {value:`${res.data.amount}`, error:''},
                date: {value:`${res.data.date}`, error:''}
            })
        })
        .catch((error)=> {
            setLoading(false)
            console.error(error)
        })
        }

        const updatedata= () => {
            console.log(id);
            const data ={
                note:feed?.note?.value,
                quantity:parseInt(feed?.quantity?.value),
                date:feed?.date?.value,
            }
            axiosContext.authAxios.put('/api/v1/feeduse/'+id,data)
            .then (res => {
                console.log(res.data)
                navigation.navigate('ListFeedsUse',{itemp:res.data})
            })
            .catch ((error)=>{
                console.log(error);
            })
        }
        return (
            <View style={styles.View} >
                 <Text style={styles.title}>Update Penggunaan Telur</Text>
                 <Text style={styles.Text}>Jumlah KG</Text>
                <TextInput value={feed?.quantity.value} onChangeText={(text)=> setfeed({...feed, quantity:{value:text, error:''}})} keyboardType="numeric"/>

                <Text style={styles.Text}>Catatan</Text>
                <TextInput value={feed?.note.value} onChangeText={(text)=> setfeed({...feed, note:{value:text, error:''}})}/>
    
                {/* <Text style={styles.Text}>Tanggal</Text>
                <TextInput value={feed?.date.value} onChangeText={(text)=> setfeed({...feed, date:{value:text, error:''}})} label="tanggal"/> */}
    
                <Text style={styles.Text}>Tanggal</Text>
                <TextInput value={feed?.date?.value} onChangeText={(text) => setLiveStock({...feed, date: {value: text, error: ''}})} onFocus={showDatepicker} />
                {show &&(
                    <DateTimePicker
                    testID="dateTimePicker"
                        value={date}
                        mode={mode}
                        is24Hour={true}
                        onChange={onChange}/>
                    )}
    
                <Button mode='contained' style={{ marginTop: 4 }} onPress={()=> updatedata(feed.id)} >Simpan</Button>
                <Button mode='contained'
                    onPress={() => navigation.reset({ index: 0,
                    routes: [{ name: 'ListFeedsUse' }], })}>Kembali</Button>
            </View>
        )
}
export default UpdateFeedsUse;
const styles = StyleSheet.create({
    View:{
        flex: 1,
        width: '100%',
        backgroundColor: theme.colors.backgroundColor,
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