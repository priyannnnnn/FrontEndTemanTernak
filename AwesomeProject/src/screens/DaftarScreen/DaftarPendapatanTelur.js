import { FlatList, StyleSheet, Text, View, ActivityIndicator, TextInput} from "react-native";
import Button from "../../components/Button";
import { GlobalStyles } from "../../components/style";
import { theme } from "../../core/theme";
import {Ionicons} from 'react-native/vector-icons';
import { useContext, useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { TouchableOpacity } from "react-native";
import { AxiosContext, AxiosProvider } from "../../context/AxiosContext";
//import filter from "lodash.filter"
import { AuthProvider } from "../../context/AuthContext";
import { Feather, Entypo } from "@expo/vector-icons";
import AntDesign from 'react-native-vector-icons/AntDesign'



function DaftarPendapatanTelur({navigation}){

    const [ IncomeEgg, setIncomeEgg ] = useState([])
    const [ loading, setLoading ] = useState(false)
    const [ errorMessage, setErrorMessage ] = useState('')
    const [pageCurrent, setpageCurrent]= useState(1);
    const [totalpage, settotalpage]= useState(10);
    const [masterdata, setmasterdata]= useState([]);
    const [search, setsearch]= useState('');

    const axiosContext = useContext(AxiosContext);

    const toggleAddEmployeeModal = () => {
        console.log('test_data');
        
    }
    const config={
      headers:{Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0XzI0QGdtYWlsLmNvbSIsImlhdCI6MTY4NjQ2MjE2NSwiZXhwIjoxNjg2NDYzNjA1fQ.zZdRLcc_6ul4aQu5eRy9i_hsF_afoSLGXPjKHxWfbEM"}`}
    }
    const getData = () => {

        if(totalpage < pageCurrent)
          return;
          
        setLoading(true)
        axiosContext.authAxios.get('/api/v1/incomeEgg?size=10&page=')
          .then(res => {
            console.log('getdata_income_egg',res.data)
            setLoading(false)
            setIncomeEgg(IncomeEgg.concat(res.data.content))
            setErrorMessage('')
            //settotalpage(res.data.totalPages)
            setmasterdata(res)
            //setIncomeEgg(res.content)
          })
          // .then((res)=>{
          //   setIncomeEgg(res.content)
          //   console.log(res)
          //   setLoading(false)
          // })
          .catch((e) => {
            setLoading(false)
            console.error(e)
            setErrorMessage("Network Error. Please try again.")
          })
    }

      const DeleteData=(id)=>{
        console.log("Get data = ",id)
        // fetch ('http://139.162.6.202:8000/api/v1/incomeEgg/'+id,config,{method:"DELETE"})
        axiosContext.authAxios.delete('/api/v1/incomeEgg/'+id)
        .then(res=> {
          console.log(res.data)
          setLoading(false)
          setIncomeEgg(res.data)
          getData()
        })
        .catch((errror)=>{
          console.error(errror, "err")
          }
        )}

      useEffect(() => {
        console.log("PageCurrent = ",pageCurrent)
        setLoading(true)
        getData()
        return()=>{}
      }, [pageCurrent])

     const render=({item})=>{
      // console.log(item)
        return(
        <View style={styles.container} key={item.id}>
          <TouchableOpacity
                onPress={toggleAddEmployeeModal} style={styles.button}>
                <Text style={styles.buttonText}>{item.date}</Text>
          </TouchableOpacity>
          <View style={styles.employeeListContainer}>
            <Text style={styles.listItem}>Jumlah Telur : {item.quantity}</Text>
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
      // _keyExtractor=(data,index)=> data.id.toString();

      handleLoadMore=()=>{
        console.log("HandleLoadMore")
        setpageCurrent(pageCurrent+1)
        getData()
        setLoading(true)
      }
      renderFooter=()=>{
        return(
          loading?
        <View style={styles.loader}>
          <ActivityIndicator size="large"/>
        </View> :null
        )
      }

      const searchFilter = (text) => {
        if(text) {
          const newData= IncomeEgg.filter ((item) =>{
          // const newData= masterdata.filter((item)=> {
            const itemData = item.quantity ? item.date.toUpperCase()
            : ''.toUpperCase();
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
          });
          setIncomeEgg(newData)
          setsearch(text)
        }else{
          setIncomeEgg(masterdata);
          setsearch(text)
        }
      }

      const handleSearch= (item) =>{
        setsearch(item);
        const formattedQuery = item.toLowerCase();
        const filterData= filter(masterdata, (item)=> {
          return contains(item , formattedQuery)
        })
        setmasterdata (filterData)
      };
      const contains= ({date, quantity}, item) => {
        if(date.includes(item) || quantity.includes(item)){
          return true;
        }
        return false;
      }

      const List = ({item})=> {
        console.log("Item Data = ",item)
          if (item === ""){
            return <render quantity ={item.quantity} date={item.date} />
          }
          // if(item.quantity.toUpperCase().includes(masterdata.toUpperCase().trim().replace(/\s/g, ""))){
          //   return <render quantity ={item.quantity} date={item.date}/>
          // }
          if (item.quantity.toUpperCase().includes(item.toUpperCase().trim().replace(/\s/g, ""))){
            return <render quantity ={item.quantity} date={item.date}/>
          }
      }

      const Search= text =>{
        setsearch(text);
        const filterData= IncomeEgg.filter(item => item.date.toLowerCase().includes(text.toLowerCase()
        ))
        setmasterdata(filterData)
      }

      return(
        <View>
          <Text style={styles.listItem}>hggdtg</Text>
          <TextInput style={styles.input} placeholder="search" 
              value={IncomeEgg} 
              clearButtonMode="always"
              onChangeText={Search}/>
        <FlatList
        style={styles.container12}
        data={IncomeEgg}
        renderItem={render}
        keyExtractor={(item,index)=> index.toString()}
        ListFooterComponent={this.renderFooter}
        onEndReached={this.handleLoadMore}
        onEndReachedThreshold={0}
        >
        </FlatList>
        </View>
      )



    // return(
    //     <ScrollView>

    //         <View style={styles.container}>
    //         <TouchableOpacity
    //             onPress={toggleAddEmployeeModal}
    //             style={styles.button}>
    //             <Text style={styles.buttonText}>Tambah PendapatanTelur</Text>
    //         </TouchableOpacity>

    //         <Text style={styles.title}>Daftar PendapatanTelur</Text>
    //         {IncomeEgg.map((data, index) => <View
    //             style={styles.employeeListContainer}
    //             key={data.id}>
    //             <Text style={{ ...styles.listItem, color: "tomato" }}>{data.date}</Text>
    //             <Text style={styles.name}>{data.employee_name}</Text>
    //             <Text style={styles.listItem}>Jumlah telur: {data.quantity}</Text>
    //             <Text style={styles.listItem}>Tanggal: {data.date}</Text>
              
    //             <View style={styles.buttonContainer}>
    //             <TouchableOpacity
    //                 onPress={() => navigation.navigate ('UpdatePendapatanTelur',{id:data.id})
                        
    //                 } onLongPress={()=> navigation.navigate('UpdatePendapatanTelur',{id:data.id})}
    //                 style={{ ...styles.button, marginVertical: 0 }}>
    //                 <Text style={styles.buttonText}>Edit</Text>
    //             </TouchableOpacity>

    //             <TouchableOpacity
    //                 onPress={() => {DeleteData(data.id)
                    
    //                 }}
    //                 style={{ ...styles.button, marginVertical: 0, marginLeft: 10, backgroundColor: "tomato" }}>
    //                 <Text style={styles.buttonText}>Delete</Text>
    //             </TouchableOpacity>
    //             </View>
    //         </View>)}

    //         {loading ? <Text
    //             style={styles.message}>Please Wait...</Text> : errorMessage ? <Text
    //             style={styles.message}>{errorMessage}</Text> : null}

    //         <Button 
    //         mode='contained'
    //         onPress={() =>
    //         navigation.reset({
    //             index: 0,
    //             routes: [{ name: 'Dashboard' }],
    //         })
    //         }>Kembali</Button>
    //     </View>

    //   </ScrollView>
    // )
}
export default DaftarPendapatanTelur;
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
        borderWidth:1,
        paddingLeft:20,
        margin:5,
        borderColor:'#009688',
        backgroundColor:'blue',
        // paddingHorizontal:20,
        // paddingVertical:10,
        // borderEndWidth:1,
        // borderRadius:8,
        // borderEndColor:'#cccccc'
        // fontSize: 20,
        // marginLeft: 10,
        // width: "90%",
        // color:'#000000'
      },
})