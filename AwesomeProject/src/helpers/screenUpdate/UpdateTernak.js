import { useEffect, useState } from "react";
import { View, Text } from "react-native";

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


    useEffect(()=>{
        
    })

    const getData=(id)=>{
        fetch('http://139.162.6.202:8000/api/v1/livestock/'+id,{method:'GET'})
        .then(res => res.json())
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