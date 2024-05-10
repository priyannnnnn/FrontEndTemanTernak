import { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { AxiosContext } from "../../../context/AxiosContext";
import Button from "../../../components/Button";
import TextInput from "../../../components/TextInput";

function UpdateTernak(props){

    const {navigation, route}=props;
    const {id}= route.params;
    const[livestock,setLiveStock] = useState({
        age:      { value : '', error: '' },
        quantity: { value : '', error: '' },
        date:     { value : '', error: '' },
        amount:   { value : '', error: '' },
        type:     { value : '', error: '' },
        note:     { value : '', error: '' },
    })

    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const axiosContext = useContext(AxiosContext);

    useEffect(()=>{
        getData(id)
    },[])

    const getData=(id)=>{
      console.log("ID = ", id)
        axiosContext.authAxios.get('/api/v1/livestock/'+id)
        .then(res=>{
          console.log(res.data)
            setLiveStock({...livestock,id:res.data.id,
                age:      { value : `${res.data.age}`, error: '' },
                quantity: { value : `${res.data.quantity}`, error: '' },
                date:     { value : `${res.data.date}`, error: '' },
                amount:   { value : `${res.data.amount}`, error: '' },
                type:     { value : `${res.data.type}`, error: '' },
                note:     { value : `${res.data.note}`, error: '' },})
        })
        .catch((error)=>{
            console.log(error)
        })
    }

    const UpdateData = () => {
      const Data = {
        age : livestock?.age?.value,
        quantity : livestock?.quantity?.value,
        date : livestock?.date?.value,
        amount : livestock?.amount?.value,
        type : livestock?.type?.value,
        note : livestock?.note?.value
      }
      axiosContext.authAxios.put('/api/v1/livestock/'+id,Data)
      .then(res =>{
        navigation.navigate('DaftarTernak', {itemp:res.data})
      })
      .catch((error) => {
        console.error(error)
      })
    }

    return (
      <View style={style.View}>
        <ScrollView>
        <Text style={style.title}>Daftar Ternak</Text>
        <Text style={style.Text} >Umur</Text>
        <TextInput value={livestock?.age.value} onChangeText={(text) => setLiveStock({ ...livestock, age: {value: text, error: ''}  })} label='Masukkan Umur' keyboardType="numeric"/>

        <Text style={style.Text} >Total</Text>
        <TextInput value={livestock?.quantity.value} onChangeText={(text) => setLiveStock({ ...livestock, quantity: {value: text, error: ''}  })}  label= 'Total Ayam' keyboardType="numeric"/>

        <Text style={style.Text} >Tanggal</Text>
        <TextInput value={livestock?.date.value} onChangeText={(text) => setLiveStock({...setLiveStock, date: {value: text, error: ''}  })} label='Masukkan Tanggal'/>

        <Text style={style.Text} >Harga Total</Text>
        <TextInput value={livestock?.amount.value} onChangeText={(text) => setLiveStock({ ...livestock, amount: {value: text, error: ''}  })}  label='Total harga ayam' keyboardType="numeric"/>

        <Text style={style.Text} >Type</Text>
        <TextInput value={livestock?.type.value} onChangeText={(text) => setLiveStock({ ...livestock, amount: {value: text, error: ''}  })}  label='Total harga ayam' keyboardType="numeric"/>

        <Text style={style.Text} >Catatan</Text>
        <TextInput value={livestock?.note.value} onChangeText={(text) => setLiveStock({ ...livestock, note: {value: text, error: ''}  })}  label='Masukkan Catatan'/>

        <Button mode="contained" style={{marginTop:0}} onPress={()=>{UpdateData()}}>Simpan</Button>
        <Button mode="contained"   onPress={() => navigation.reset({ index: 0,
                    routes: [{ name: 'DaftarTernak' }], })}>Kembali</Button>
        </ScrollView>
      </View>



    );
}
export default UpdateTernak;
const style = StyleSheet.create({
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