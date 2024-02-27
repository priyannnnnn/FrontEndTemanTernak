import { useContext, useEffect, useState } from "react";
import { AxiosContext } from "../../context/AxiosContext";
import { log } from "react-native-reanimated";
import { Alert, FlatList, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { theme } from "../../core/theme";
import { GlobalStyles } from "../../components/style";
import Button from "../../components/Button";
import filter from "lodash.filter"
import Icon from 'react-native-vector-icons/MaterialIcons';

function DaftarOperasional({navigation}){
    const [Operasional, setOperasional] = useState([])
    const [Loading, setLoading] = useState()
    const [pageCurrent, setpageCurrent]= useState(1);
    const axiosContext = useContext(AxiosContext);
    const [search, setsearch]= useState('');
    const [totalpage, settotalpage]= useState(10);

    const getData = () => {
        axiosContext.authAxios.get(`/api/v1/operatingCosh?orders=createdAt-desc`)
        .then(res => {
            console.log("Get Data = ", res.data)
            setOperasional(Operasional.concat(res.data.content))
            console.log("data",res.data)
        })
        .catch((e) => {
            console.error(e)
        })
    }
    const Delete = (id) => {
        console.log(id)
        axiosContext.authAxios.delete(`/api/v1/operatingCosh/`+id)
        .then(res => {
            console.log(res.data)
            setOperasional (res.data)
        })
        .catch((error) => {
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
            onPress:()=>Delete(id) ,
          },
          {
            text: "No",
          },
        ]
      );
    };  

    useEffect(() => {
        console.log("Get Data Useeffect = ",pageCurrent)
        setLoading(true)
        getData()
    },[pageCurrent])

     handleLoadMore=()=>{
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
    }
    const handleSearch= (item) =>{
      setsearch(item);
      const data =[];
      const formattedQuery = item.toLowerCase();
      const filterData= filter(Operasional, (item)=> {
        return contains(item , formattedQuery)
      })
      console.log("Data = ",data)
      console.log("Format Query =",formattedQuery)
      console.log("Filter Data = ",filterData)
      setOperasional(filterData)
      if (formattedQuery === 0){
        return getData
      }
    };
    const contains= ({date, description, amount }, item) => {
      if( date.includes(item) || description.includes(item) 
          || amount.toString().includes(item)){
        return true;
      }
      return false;
    }
    const renderItem = ({item}) =>{
        console.log(item)
        return (
            <View style={styles.container}>
               <TouchableOpacity
                style={styles.button}>
                <Text style={styles.buttonText}>Dibuat : {item.date}</Text>
          </TouchableOpacity>
                <View style={styles.employeeListContainer}>
                    <Text style={styles.listItem}> Deskripsi : {item.description}</Text>
                    <Text style={styles.listItem}> Biaya Operasional : {item.amount.toLocaleString()}</Text>
                    <Text style={styles.listItem}>Tanggal : {item.date} </Text>
                        <View style={styles.buttonContainer}>                            
                            <TouchableOpacity
                              onPress={() => navigation.navigate ('UpdatePendapatanTelur',{id:item.id})} 
                              onLongPress={()=> navigation.navigate('UpdatePendapatanTelur',{id:item.id})}
                              style={{ ...styles.button, marginVertical: 0, marginLeft: 10, backgroundColor: "tomato" }}>
                            <Text style={styles.buttonText}>Edit</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                              onPress={() => {showConfirmDialog(item.id)}}
                              style={{ ...styles.button, marginVertical: 0, marginLeft: 10, backgroundColor: "tomato" }}>
                            <Text style={styles.buttonText}>Hapus</Text>
                            </TouchableOpacity>
                        </View> 
                </View>
            </View> 
        )
    } 
    return (
      <View>
        <View style={{flexDirection:'row'}}>
          <View style={styles.input}>
            <TextInput placeholder="search" 
              placeholderTextColor="#000"
              style={{fontSize:15,color:'#1F2544'}}
              value={Operasional} 
              clearButtonMode="always"
              onChangeText={handleSearch}
              autoCorrect={false}/>
          </View>
          <TouchableOpacity
              onPress={() => navigation.navigate ('BiayaOperasional')} 
              style={{ marginVertical: 0, marginLeft: 0 ,flexDirection:'row'}}>
              <Icon name="add" size={40} color={'#1F2544'} style={{marginTop:20,}}/>
              <Text style={{marginTop:22, fontSize:20,color:'#030637'}}>Add</Text>
          </TouchableOpacity>  
        </View>
        <FlatList
        style={styles.container12}
        data={Operasional}
        renderItem={renderItem}
        keyExtractor={(item,index) => index.toString()}
        onEndReachedThreshold={0}
        onEndReached={this.handleLoadMore}/>
        </View>
    )
}

export default DaftarOperasional;
const styles = StyleSheet.create({
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
        paddingHorizontal: 20,
        top:10
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
      button: {
        borderRadius: 5,
        marginVertical: 20,
        alignSelf: 'flex-start',
        backgroundColor: "gray",
      },
      buttonText: {
        color: '#7FFFD4',
        paddingVertical: 6,
        paddingHorizontal: 10,
        fontSize: 16,     
      },
})