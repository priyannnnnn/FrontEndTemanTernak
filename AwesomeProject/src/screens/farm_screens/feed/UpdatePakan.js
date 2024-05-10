import { StyleSheet, View,Text } from "react-native";
import TextInput from "../../../components/TextInput";
import { useContext, useEffect, useState } from "react";
import { theme } from "../../../core/theme";
import Button from "../../../components/Button";
import axios from "axios";
import { AxiosContext } from "../../../context/AxiosContext";



function UpdatePakan(props){

    const [loading, setLoading]= useState(true)
    const [errormessage, setErrorMessage]= useState('')
    const {navigation, route} = props;
    const {id}  = route.params;
    const axiosContext = useContext(AxiosContext);

    // const context=useContext(getData)
    const [feed, setfeed] = useState({
        quantity: { value : '', error:''},
        type:     { value : '', error: '' },
        amount:   { value : '', error: '' },
        date:     { value : '', error: '' },
        
    }
    )

    useEffect(() => {
        getData(id)
    }, [])

    const getData = (id) => {
        console.log("Id = ",id)
        setLoading(true)
        axiosContext.authAxios.get('/api/v1/feed/'+id)
        .then(res =>{
            console.log(res);
            setfeed({
                ...feed, 
                id:res.id,
                quantity: {value:`${res.data.quantity}`, error:''}, 
                type: {value:`${res.data.type}`, error:''},
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
                amount: parseInt(feed?.amount?.value),
                type:feed?.type?.value,
                quantity:parseInt(feed?.quantity?.value),
                date:feed?.date?.value,
            }
            axiosContext.authAxios.put('/api/v1/feed/'+id,data)
            .then (res => {
                console.log(res.data)
                navigation.navigate('DaftarPersediaanPakan',{itemp:res.data})
            })
            .catch ((error)=>{
                console.log(error);
            })
        }
    
    return (
        <View style={styles.View} >
             <Text style={styles.title}>Daftar PendapatanTelur</Text>
             <Text style={styles.Text}>Jumlah KG</Text>
            <TextInput value={feed?.quantity.value} onChangeText={(text)=> setfeed({...feed, quantity:{value:text, error:''}})} keyboardType="numeric"/>

            <Text style={styles.Text}>Type Pakan</Text>
            <TextInput value={feed?.type.value} onChangeText={(text)=> setfeed({...feed, type:{value:text, error:''}})}/>

            <Text style={styles.Text}>Total Harga</Text>
            <TextInput value={feed?.amount.value} onChangeText={(text)=> setfeed({...feed, amount:{value:text, error:''}})}/>

            <Text style={styles.Text}>Tanggal</Text>
            <TextInput value={feed?.date.value} onChangeText={(text)=> setfeed({...feed, date:{value:text, error:''}})} label="tanggal"/>

            <Button mode='contained' style={{ marginTop: 4 }} onPress={()=> updatedata(feed.id)} >Simpan</Button>
            <Button mode='contained'
                onPress={() => navigation.reset({ index: 0,
                routes: [{ name: 'DaftarPersediaanPakan' }], })}>Kembali</Button>
        </View>
    )}
export default UpdatePakan;
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