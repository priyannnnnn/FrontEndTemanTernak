import { ScrollView, View,Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native";
import { theme } from "../../core/theme";
import { GlobalStyles } from "../../components/style";
import Button from "../../components/Button";
import { useEffect, useState } from "react";

function DaftarPenjualanTelur({navigation}){

  const [ saleEgg, setsaleEgg]=useState([])
  const [loading, setLoading] = useState(false)
  const [rrorMessage, setErrorMessage ] = useState('')

  const GetData = () => {
      setLoading(true)
      fetch('http://139.162.6.202:8000/api/v1/saleEgg', {
        method: "GET"
      })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        setLoading(false)
        setErrorMessage('')
        setsaleEgg(res.context)
      })
      .then ((error) =>{
        setLoading(false)
        setErrorMessage("eror")
        console.log(error)
      })
  }

  const deleteData=(id)=>{
    console.log(id)
    fetch('http://139.162.6.202:8000/api/v1/saleEgg/' + id, {method: "DELETE"})
    .then (sel => sel.json())
    .then (sel =>{
      console.log(sel)
    })
   
  }
  useEffect(() => {
    GetData()
  },[])
  


    return(
        <ScrollView>
        <View style={styles.container}>
        <TouchableOpacity style={styles.button}>
         
            <Text style={styles.buttonText}> DaftarPenjualanTelur</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Penjualan Telur</Text>
        {saleEgg.map((data, index)=>  <View
       style={styles.employeeListContainer} key={data.id}>
            <Text style={{...styles.listItem, color:"tomato"}}>{data.date}</Text>
            <Text style={styles.name}>{data.saleEgg_name}</Text>
            <Text style={styles.listItem}>Jumlah Telur : {data.amount}</Text>
            <Text style={styles.listItem}>Tanggal : {data.date}</Text>
            <Text style={styles.listItem}>Total Pendapatan Telur  : {data.quantity}</Text>
        
       </View>)}
        </View>
        <Button 
            mode='contained' onPress={() => 
                navigation.reset({index: 0,
                routes: [{ name: 'Penjualan' }],})}
        >Kembali</Button>
        
    </ScrollView>
    )
}
export default DaftarPenjualanTelur;
const styles=StyleSheet.create({
    text:{
        fontSize:20,
        flex:1,
        marginTop:35,
        textAlign:'center'
    },
    view:{
        flex:1,
        backgroundColor:theme.colors.backgroundColor
    },
    view1:{
        flex:1,
        backgroundColor:GlobalStyles.colors.error50,
        marginHorizontal:12,
        margin:3,
        minWidth:20,

    },
    container: {
        paddingHorizontal: 20
      },
      button: {
        borderRadius: 5,
        marginVertical: 20,
        alignSelf: 'flex-start',
        backgroundColor: "gray",
      },
      buttonText: {
        color: "white",
        paddingVertical: 6,
        paddingHorizontal: 10,
        fontSize: 16
      },
      title: {
        fontWeight: "bold",
        fontSize: 20,
        marginBottom: 10
      },
      employeeListContainer: {
        marginBottom: 25,
        elevation: 4,
        backgroundColor: "white",
        padding: 10,
        borderRadius: 6,
        borderTopWidth: 1,
        borderColor: "rgba(0,0,0,0.1)"
      },
      name: {
        fontWeight: "bold",
        fontSize: 16
      },
      listItem: {
        fontSize: 16
      },
      buttonContainer: {
        marginTop: 10,
        flexDirection: "row",
        alignItems: "center"
      },
      message: {
        color: "tomato",
        fontSize: 17
      }
})