import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";
import Button from "../../components/Button";
import { GlobalStyles } from "../../components/style";
import { theme } from "../../core/theme";
import {Ionicons} from '@expo/vector-icons';
import { useContext, useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { TouchableOpacity } from "react-native";
import { AxiosContext } from "../../context/AxiosContext";

function DaftarTernak({navigation}){
    const axiosContext = useContext(AxiosContext);
    const [ employee, setEmployee ] = useState([])
    const [ loading, setLoading ] = useState(true)
    const [ errorMessage, setErrorMessage ] = useState('')
    const [pageCurrent, setpageCurrent]= useState(1)
    const [totalpage, settotalpage]= useState(10);

    const toggleAddEmployeeModal = () => {
        console.log('test_data');
    }

    const getData = () => {
      if(totalpage<pageCurrent)
      return;

        setLoading(true)
        axiosContext.authAxios.get('/api/v1/livestock')
          .then(res => {
            console.log(res.data);
            setLoading(false)
            setErrorMessage('')
            //setEmployee(res.data)
            setEmployee(employee.concat(res.data.content))
            settotalpage(res.data.totalpage)
          })
          .catch((e) => {
            setLoading(false)
            console.error(e, "getdata")
            setErrorMessage("Network Error. Please try again.")
          })
      }

      const DeleteData = (id) => {
        console.log(id)
        setLoading(true)
        axiosContext.authAxios.delete('/api/v1/livestock/'+id)
        .then(res =>{
          console.log(res.data)
          setLoading(false)
          setErrorMessage('')
          setEmployee(res.data)
          getData()
        })
        .catch((e)=> {
          console.error(e,"errror")
          setLoading(false)
          setErrorMessage("hdr")
        })
      }

      useEffect(() => {
        console.log("PageCurrent = ",pageCurrent)
        setLoading(true)
        getData()
      }, [])

      // useEffect(()=>{
      //   DeleteData()
      // },[])
renderItem=({item})=>{
  return(
    <View style={styles.container} key={item.id}>
      <TouchableOpacity
                onPress={toggleAddEmployeeModal} style={styles.button}>
                <Text style={styles.buttonText}>{item.date}</Text>
        </TouchableOpacity>
        <View style={styles.employeeListContainer}>
          <Text style={styles.listItem}>Umur : {item.age}</Text>
          <Text style={styles.listItem}>Jumlah : {item.quantity}</Text>
          <Text style={styles.listItem}>Harga :{item.amount}</Text>
          <Text style={styles.listItem}>Jenis : {item.type}</Text>
          <Text style={styles.listItem}>Catatan : {item.note}</Text>
          <Text style={styles.listItem}>Tanggal : {item.date}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
                      onPress={() => {DeleteData(item.id)}}
                      style={{ ...styles.button, marginVertical: 0, marginLeft: 10, backgroundColor: "tomato" }}>
                      <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity
                      onPress={() => navigation.navigate ('UpdateTernak',{id:item.id})} 
                      onLongPress={()=> navigation.navigate('UpdateTernak',{id:item.id})}
                      style={{ ...styles.button, marginVertical: 0, marginLeft: 10, backgroundColor: "tomato" }}>
                      <Text style={styles.buttonText}>Edit</Text>
            </TouchableOpacity>
          </View>
        </View>
    </View>
  )
 }

 renderFooter=()=>{
  return(
    loading?
    <View style={styles.loader}>
      <ActivityIndicator size="large"/>
    </View> :null
  )
 }
 handleLoadMore=()=>{
    console.log("HandleLoadMore")
    //console.log(pageCurrent)
    setpageCurrent(pageCurrent+1)
    getData()
    setLoading(true)
 }
    return(
      <FlatList
      style={styles.container12}
      data={employee}
      renderItem={this.renderItem}
      keyExtractor={(item,index)=> index.toString()}
      ListFooterComponent={this.renderFooter}
      onEndReached={this.handleLoadMore}
      onEndReachedThreshold={0}
      />
    )
}
export default DaftarTernak;
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
        color:'#DC143C'
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
      },
      loader:{
        marginTop:10,
        alignItems:"center"
      },
})