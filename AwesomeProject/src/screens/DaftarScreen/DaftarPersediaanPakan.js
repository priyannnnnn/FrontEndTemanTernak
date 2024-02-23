import { ScrollView, View,Text, StyleSheet,FlatList,ActivityIndicator,TextInput, Alert } from "react-native";
import { TouchableOpacity } from "react-native";
import { theme } from "../../core/theme";
import { GlobalStyles } from "../../components/style";
import filter from "lodash.filter"
import { useContext, useEffect, useState } from "react";
import { AxiosContext } from "../../context/AxiosContext";
import { AuthContext } from "../../context/AuthContext";
import Icon from 'react-native-vector-icons/MaterialIcons';

function DaftarPersediaanPakan({navigation}){

  const [feed, setfeed]= useState([])
  const [loading, setLoading]= useState(false)
  const [errormessage, setErrorMessage]= useState('')
  const [pageCurrent, setpageCurrent]= useState(0);
  const [totalpage, settotalpage]= useState(10);
  const axiosContext = useContext(AxiosContext);
  const authContext = useContext(AuthContext);
  const [search, setsearch]= useState('');

  const toggleAddEmployeeModal = () => {
    console.log('test_data');}

  const getData = () =>{
    // if (totalpage < pageCurrent)
    // return;

    setLoading(true)
    console.log("token = ",axiosContext.authAxios)
    axiosContext.authAxios.get(`/api/v1/feed?orders=createdAt-desc&size=10`)
    .then (res => {
      console.log("getdata_feed")
      setLoading(false)
      //setfeed(res.data.content)
      //setfeed([...feed,...res.data.content])
    setfeed(feed.concat(res.data.content))
     // settotalpage(res+1)
      //setfeed(res.content)
      setErrorMessage('');
      setLoading(false);
      console.log(res.data);
    })
    .catch((e)=> {
      console.error(e)
     })
  }

  const DeleteData = (id) => {
    console.log(id);
    setLoading(true)
   axiosContext.authAxios.delete('/api/v1/feed/'+id)
    // .then(res => res.json())
    .then(res =>{
      console.log(res)
      setLoading(false)
      setErrorMessage('')
      getData()
    })
    .catch((error)=> {
      setLoading(false)
      console.error(error)
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
  
  
  useEffect(()=> {
    console.log("PageCurrent = ",pageCurrent)
    setLoading(true)
    console.log("Get Data = ")
    getData()
    return()=>{}
  },[pageCurrent])
  
  renderItem=({item})=>{
    return(
      <View style={styles.container} >
          <TouchableOpacity
                onPress={toggleAddEmployeeModal} style={styles.button}>
                <Text style={styles.buttonText}>{item.date}</Text>
          </TouchableOpacity>
          <View style={styles.employeeListContainer}>
            <Text style={styles.listItem}>Jumlah Telur : {item.quantity}</Text>
            <Text style={styles.listItem}>amount : {item.amount}</Text>
            <Text style={styles.listItem}>Type : {item.type}</Text>
            <Text style={styles.listItem}>Tanggal : {item.date}</Text>
          
          <View style={styles.buttonContainer}>
          <TouchableOpacity
                    onPress={() => {showConfirmDialog(item.id)}}
                    style={{ ...styles.button, marginVertical: 0, marginLeft: 10, backgroundColor: "tomato" }}>
                    <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
          <TouchableOpacity
                    onPress={() => navigation.navigate ('UpdatePakan',{id:item.id})} 
                    onLongPress={()=> navigation.navigate('UpdatePakan',{id:item.id})}
                    style={{ ...styles.button, marginVertical: 0, marginLeft: 10, backgroundColor: "tomato" }}>
                    <Text style={styles.buttonText}>Edit</Text>
                </TouchableOpacity>
          </View>
          </View>
        </View>
    )
  };

  const handleLoadMore=()=>{
    // console.log("HandleLoadMore")
    // setpageCurrent(pageCurrent+1)
    // // getData()
    // setLoading(true)
    const page = pageCurrent > totalpage;
    console.log("Page current =",pageCurrent)
    console.log("Total page",totalpage)
     if (pageCurrent < totalpage){
       console.log("HandleLoadMore 1 = ",totalpage)
       setpageCurrent(pageCurrent+1)
       //getData()
       setLoading(false)
     }else {
       console.log("HandleLoadMore 2 = ",totalpage)
       setpageCurrent(pageCurrent+1)
       //getData()
       setLoading(false)
     }
  };

  renderFooter=()=>{
    return(
      loading?
    <View style={styles.loader}>
      <ActivityIndicator size="large"/>
    </View> :null
    )
  }

  const handleSearch= (item) =>{
    setsearch(item);
    const data =[];
    const formattedQuery = item.toLowerCase();
    const filterData= filter(feed, (item)=> {
      return contains(item , formattedQuery)
    })
    console.log("Data = ",data)
    console.log("Format Query =",formattedQuery)
    console.log("Filter Data = ",filterData)
    setfeed(filterData)
    console.log("String = []")
    if (data.toString() === filterData.toString()){
      console.log("get Text")
        return (
          <Text style={styles.text}>Data Tidak Ada</Text>
        )
      }else{
        return getData;
      }
  };
  const contains= ({date, quantity, type, amount}, item) => {
    if( date.includes(item) || type.includes(item) 
        || quantity.toString().includes(item)
        || amount.toString().includes(item)){
      return true;
    }
    return false;
  }
  
    return(
      <View>
        <View style={{flexDirection:'row'}}>
          <View style={styles.input}>
            <TextInput placeholder="search" 
              placeholderTextColor="#000"
              style={{fontSize:15,color:'#1F2544'}}
              value={feed} 
              clearButtonMode="always"
              onChangeText={handleSearch}
              autoCorrect={false}/>
          </View>
          <TouchableOpacity
              onPress={() => navigation.navigate ('Penjualan')} 
              style={{ marginVertical: 0, marginLeft: 0 ,flexDirection:'row'}}>
              <Icon name="add" size={40} color={'#1F2544'} style={{marginTop:20,}}/>
              <Text style={{marginTop:22, fontSize:20,color:'#030637'}}>Add</Text>
          </TouchableOpacity>  
        </View>
      <FlatList
      style={styles.container12}
      data={feed}
      renderItem={this.renderItem}
      keyExtractor={(item,index)=> index.toString()}
      ListFooterComponent={this.renderFooter}
      onEndReachedThreshold={0}
      onEndReached={handleLoadMore}
      />
      </View>
    )  
}
export default DaftarPersediaanPakan;
const styles=StyleSheet.create({
  text:{
      fontSize:20,
      flex:1,
      marginTop:35,
      textAlign:'center',
      backgroundColor:theme.colors.error
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
    loader:{
      marginTop:10,
      alignItems:"center"
    },
    container12:{
      marginTop:20,
      backgroundColor:'#7FFFD4'
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
    },
})