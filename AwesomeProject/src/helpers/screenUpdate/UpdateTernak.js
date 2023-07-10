import { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { AxiosContext } from "../../context/AxiosContext";

function UpdateTernak(props){

    const {navigation, route}=props;
    const {id}= route.params;
    const[livestock,setLiveStock]=useState({
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
        
    })

    const getData=(id)=>{
        // fetch('http://139.162.6.202:8000/api/v1/livestock/'+id,{method:'GET'})
        axiosContext.authAxios.get('/api/v1/livestock/'+id)
        // .then(res => res.json())
        .then(res=>{
            setLiveStock({...livestock,id:res.id,
                age:      { value : `${res.age}`, error: '' },
                quantity: { value : `${res.age}`, error: '' },
                date:     { value : `${res.age}`, error: '' },
                amount:   { value : `${res.age}`, error: '' },
                type:     { value : `${res.age}`, error: '' },
                note:     { value : `${res.age}`, error: '' },})
        })
        .catch((error)=>{
            console.log(error)
        })
    }

    return (
        <View>
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