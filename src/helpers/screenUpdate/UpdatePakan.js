import { StyleSheet, View } from "react-native";
import TextInput from "../../components/TextInput";
import { useContext, useEffect, useState } from "react";
import { theme } from "../../core/theme";
import Button from "../../components/Button";
import axios from "axios";



function UpdatePakan(props){

    const [loading, setLoading]= useState(true)
    const [errormessage, setErrorMessage]= useState('')
    const {navigation, route} = props;
    const {id}  = route.params

    // const context=useContext(getData)
    const [feed, setfeed] = useState({
        
        quantity: { value : '', error:''},
        type:     { value : '', error: '' },
        amount:   { value : '', error: '' },
        date:     { value : '', error: '' },
        
    }
    )

    useEffect(() => {
        getDataBy(id)
    }, [])

    const getDataBy = (id) => {
        // console.log(id)
        setLoading(true)
        fetch('http://139.162.6.202:8000/api/v1/feed/'+id,{method: "GET"})
        .then(res => res.json())
        .then(res =>{
            console.log(res);
            setfeed({
                ...feed, 
                id:res.id,
                quantity: {value:`${res.quantity}`, error:''}, 
                type: {value:`${res.type}`, error:''},
                amount: {value:`${res.amount}`, error:''},
                date: {value:`${res.date}`, error:''}
            })
        })
        .catch(()=> {
          setLoading(false)
          setErrorMessage("hdr")
        })
        }

        const updatedata= (id) => {
            console.log(id);
            const data ={
                amount: parseInt(feed?.amount?.value),
                type:feed?.type?.value,
                quantity:parseInt(feed?.quantity?.value),
                date:feed?.date?.value,
            }
            console.log(data);
            
            axios.put(`http://139.162.6.202:8000/api/v1/feed/`+id,data)
            // .then (res =>{
            //     console.log(res)
            // })
            
            .then (res => {
                navigation.navigate('DaftarPersediaanPakan', {name : 'DaftarPersediaanPakan'})
            })
            .catch ((error)=>{
                console.log(error);
            })
        }
    // const test= route.params.id;
    return (
        // <View style={styles.container}>
            
    //    {feed.map((data, index)=>
        <View style={styles.View} >

            <TextInput value={feed?.quantity.value} onChangeText={(text)=> setfeed({...feed, quantity:{value:text, error:''}})} keyboardType="numeric"/>
            <TextInput value={feed?.type.value} onChangeText={(text)=> setfeed({...feed, type:{value:text, error:''}})}/>
            <TextInput value={feed?.amount.value} onChangeText={(text)=> setfeed({...feed, amount:{value:text, error:''}})}/>
            <TextInput value={feed?.date.value} onChangeText={(text)=> setfeed({...feed, date:{value:text, error:''}})} label="tanggal"/>
            <Button mode='contained' style={{ marginTop: 4 }} onPress={()=> updatedata(feed.id)} >Simpan</Button>
            <Button mode='contained'
                onPress={() => navigation.reset({ index: 0,
                    routes: [{ name: 'DaftarPersediaanPakan' }], })}>Kembali</Button>
        </View>
            //    ) }
           
   
                 // </View>
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
})