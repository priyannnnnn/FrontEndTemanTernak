import { ActivityIndicator, Alert, FlatList, Image, StyleSheet, Text, TextInput, View } from "react-native";
import Button from "../../components/Button";
import { GlobalStyles } from "../../components/style";
import { theme } from "../../core/theme";
import {Ionicons} from '@expo/vector-icons';
import { useContext, useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import filter from "lodash.filter"
import { TouchableOpacity } from "react-native";
import { AxiosContext } from "../../context/AxiosContext";
import Icon from 'react-native-vector-icons/MaterialIcons';

function DaftarTernak({navigation}){
    const axiosContext = useContext(AxiosContext);
    const [ employee, setEmployee ] = useState([])
    const [ loading, setLoading ] = useState(true)
    const [ errorMessage, setErrorMessage ] = useState('')
    const [pageCurrent, setpageCurrent]= useState(1)
    const [totalpage, settotalpage]= useState(10);
    const [search, setsearch]= useState('');

    const getData = () => {
      // if(totalpage<pageCurrent)
      // return;
        setLoading(true)
        axiosContext.authAxios.get(`/api/v1/livestock?orders=createdAt-desc?size=${totalpage}&page=${pageCurrent}`)
          .then(res => {
            console.log(res.data.content);
            setLoading(false)
            setEmployee(employee.concat(res.data.content))
            // setEmployee(employee.concat(res.data.content))
            // setEmployee(res.data.content)
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

    const showConfirmDialog = (id) => {
      console.log(id)
      return Alert.alert(
        "Apakah kamu yakin?",
        "Apakah Kamu Yakin Untuk Menghapus Data?",
        [
          {
            text: "Yes",
            onPress:()=>DeleteData(id) ,
          },
          {
            text: "No",
          },
        ]
      );
    }; 



    useEffect(() => {
      console.log("PageCurrent UseEffect= ",pageCurrent)
      setLoading(true)
      getData()
     return()=>{}
    }, [pageCurrent])

renderItem=({item})=>{
  return(
    <View style={styles.container} key={item.id}>
      <TouchableOpacity
              style={styles.button}>
                <Text style={styles.buttonText}>{item.date}</Text>
        </TouchableOpacity>
        <View style={styles.employeeListContainer}>
          <Text style={styles.listItem}>Umur : {item.age}</Text>
          <Text style={styles.listItem}>Jumlah : {item.quantity.toLocaleString()}</Text>
          <Text style={styles.listItem}>Harga :{item.amount.toLocaleString()}</Text>
          <Text style={styles.listItem}>Jenis : {item.type}</Text>
          <Text style={styles.listItem}>Catatan : {item.note}</Text>
          <Text style={styles.listItem}>Tanggal : {item.date}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
                      onPress={() => {showConfirmDialog(item.id)}}
                      style={{ ...styles.button, marginVertical: 0, marginLeft: 10, backgroundColor: "tomato" }}>
                      <Text style={styles.buttonText}>Hapus</Text>
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

 const renderFooter=()=>{
  return(
    loading?
    <View style={styles.loader}>
      <ActivityIndicator size="large"/>
      <Image source={require('../../assets/logo2.png')} style={{width:100,height:100}}/>
    </View> :null
  )
 }
 handleLoadMore= async()=>{
    // if (pageCurrent < totalpage){
    //   renderFooter()
    //   setpageCurrent(pageCurrent+1)
    // }else {
    //   renderFooter()
    //   setpageCurrent(pageCurrent+1)
    // }
    renderFooter()
    if(loading)return;
    renderFooter()
    const nextPage = pageCurrent + 1
    renderFooter()
    const newData = await setpageCurrent(nextPage);
    renderFooter()
   
 }

 const handleSearch= (item) =>{
  setsearch(item);
  const data =[];
  const formattedQuery = item.toLowerCase();
  const filterData= filter(employee, (item)=> {
    return contains(item , formattedQuery)
  })
  console.log("Data = ",data)
  console.log("Format Query =",formattedQuery)
  console.log("Filter Data = ",filterData)
  setEmployee(filterData)
  //console.log("String = []")
  if (data.toString() === filterData.toString()){
    console.log("get Text")
      return (
        <Text style={styles.text}>Data Tidak Ada</Text>
      )
    }
};
const contains= ({age, note, date, quantity, type, amount}, item) => {
  if( date.includes(item) || type.includes(item) 
      || quantity.toString().includes(item)
      || amount.toString().includes(item)
      || age.toString().includes(item)
      || note.toString().includes(item)){
    return true;
  }
  return false;
}
    return(
      <View style={{backgroundColor:'#F5EEE6'}}>
        <View style={{flexDirection:'row'}}>
          <View style={styles.input}>
          <Icon name="search" size={25} color={'#1F2544'} style={{marginTop:10}}/>
            <TextInput style={{fontSize:15, color:'#1F2544'}} 
              placeholder="search" 
              placeholderTextColor="#000"
              value={employee} 
              clearButtonMode="always"
              onChangeText={handleSearch}
              autoCorrect={false}/>
          </View>
          <TouchableOpacity
              onPress={() => navigation.navigate ('Ternak')} 
              style={{ marginVertical: 0, marginLeft: 0 ,flexDirection:'row'}}>
              <Icon name="add" size={40} color={'#1F2544'} style={{marginTop:20,}}/>
              <Text style={{marginTop:22, fontSize:20,color:'#030637'}}>Add</Text>
          </TouchableOpacity>
        </View>
      <FlatList
      style={styles.container12}
      data={employee}
      renderItem={this.renderItem}
      keyExtractor={(item,index)=> index.toString()}
      ListFooterComponent={renderFooter}
      onEndReached={this.handleLoadMore}
      onEndReachedThreshold={0}
      />
      </View>
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
        fontSize: 18,
        color:'#800000',
        fontWeight:"500"
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
        marginBottom:35,
        alignItems:"center"
      },
      input: {
        height:45,
        width:265,
        borderWidth:1,
        paddingLeft:20,
        margin:5,
        borderColor:'#009688',
        backgroundColor:'#FFF6E9',
        flexDirection:'row',
        top:13
      }
})