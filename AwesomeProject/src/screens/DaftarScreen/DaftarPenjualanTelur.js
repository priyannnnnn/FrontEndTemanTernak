import { ScrollView, View,Text, StyleSheet, FlatList,ActivityIndicator } from "react-native";
import { TouchableOpacity } from "react-native";
import { theme } from "../../core/theme";
import { GlobalStyles } from "../../components/style";
import Button from "../../components/Button";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AxiosContext } from "../../context/AxiosContext";


function DaftarPenjualanTelur({navigation}){

  const [ saleEgg, setsaleEgg]=useState([])
  const [loading, setLoading] = useState(false)
  const [rrorMessage, setErrorMessage ] = useState('')
  const [pageCurrent, setpageCurrent]= useState(1);
  const axiosContext = useContext(AxiosContext);

  const config={
    headers:{Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0XzI0QGdtYWlsLmNvbSIsImlhdCI6MTY4NjQ2Mzg2NiwiZXhwIjoxNjg2NDY1MzA2fQ.VaduI3MQZnP8J9JreMZtsGa7in5tukyhZ9vWELRiuVM"}`}
  }
  const toggleAddEmployeeModal = () => {
    console.log('test_data');
}
  const GetData = () => {
      setLoading(true)
      axiosContext.authAxios.get('/api/v1/saleEgg?size=10&page=')
      .then(res => {
        setsaleEgg(saleEgg.concat(res.data.content))
        console.log(res);
        setLoading(false)
        setErrorMessage('')
        // setsaleEgg(res.context)
      })
      .catch(()=>{
        setLoading(false)
        setErrorMessage("Network Error. Please try again.")
      })
  }
    const DeleteData=(id)=>{
    console.log(id)
    fetch('http://139.162.6.202:8000/api/v1/saleEgg/' + id, config,{method: "DELETE"})
    .then (sel => sel.json())
    .then (sel =>{
      console.log(sel)
    })
   
    }
  useEffect(() => {
    console.log("PageCurrent",pageCurrent)
    setLoading(true)
    GetData()
    return()=>{}
  },[pageCurrent])
  

  renderItem=({item})=>{
    return(
      <View style={styles.container}>
        <TouchableOpacity
                onPress={toggleAddEmployeeModal} style={styles.button}>
                <Text style={styles.buttonText}>{item.date}</Text>
          </TouchableOpacity>
      <View style={styles.employeeListContainer}>
        <Text style={styles.listItem}>Jumlah telur : {item.amount}</Text>
        <Text style={styles.listItem}>Jumlah Pendapatan Telur : {item.quantity}</Text>
        <Text style={styles.listItem}>Tanggal : {item.date}</Text>
          
        <View style={styles.buttonContainer}>
          <TouchableOpacity
                    onPress={() => {DeleteData(item.id)}}
                    style={{ ...styles.button, marginVertical: 0, marginLeft: 10, backgroundColor: "tomato" }}>
                    <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
          <TouchableOpacity
                    onPress={() => navigation.navigate ('UpdatePendapatanTelur',{id:item.id})} 
                    onLongPress={()=> navigation.navigate('UpdatePendapatanTelur',{id:item.id})}
                    style={{ ...styles.button, marginVertical: 0, marginLeft: 10, backgroundColor: "tomato" }}>
                    <Text style={styles.buttonText}>Edit</Text>
                </TouchableOpacity>
          </View>
          </View>
      </View>
    )
  };

  handleLoadMore=()=>{
    console.log("HandleLoadMore")
    setpageCurrent(pageCurrent+1)
    GetData()
    setLoading(true)
  }
  renderFooter=()=>{
    return(
      loading?
    <View style={styles.loader}>
      <ActivityIndicator size="large"/>
    </View> :null
    )}




    return(
      <FlatList
      style={styles.container12}
      data={saleEgg}
      renderItem={this.renderItem}
      keyExtractor={(item,index)=> index.toString()}
      ListFooterComponent={this.renderFooter}
      onEndReached={this.handleLoadMore}
      onEndReachedThreshold={0}
      />



    //     <ScrollView>
    //     <View style={styles.container}>
    //     <TouchableOpacity style={styles.button}>
         
    //         <Text style={styles.buttonText}> DaftarPenjualanTelur</Text>
    //     </TouchableOpacity>
    //     <Text style={styles.title}>Penjualan Telur</Text>
    //     {saleEgg.map((data, index)=>  <View
    //         style={styles.employeeListContainer} 
    //         key={data.id}>
    //         <Text style={{...styles.listItem, color:"tomato"}}>{data.date}</Text>
    //         <Text style={styles.name}>{data.saleEgg_name}</Text>
    //         <Text style={styles.listItem}>Jumlah Telur : {data.amount}</Text>
    //         <Text style={styles.listItem}>Tanggal : {data.date}</Text>
    //         <Text style={styles.listItem}>Total Pendapatan Telur  : {data.quantity}</Text>
    
    //    </View>)}
    //     </View>
    //     <Button 
    //         mode='contained' onPress={() => 
    //             navigation.reset({index: 0,
    //             routes: [{ name: 'Penjualan' }],})}
    //     >Kembali</Button>
        
    // </ScrollView>
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
        marginBottom: 10,
        color:'#FF4500'
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
        fontSize: 16,
        color:'#800000'
      },
      buttonContainer: {
        marginTop: 10,
        flexDirection: "row",
        alignItems: "center"
      },
      message: {
        color: "tomato",
        fontSize: 17
      },
      container12:{
        marginTop:20,
        backgroundColor:'#7FFFD4'
      }
})