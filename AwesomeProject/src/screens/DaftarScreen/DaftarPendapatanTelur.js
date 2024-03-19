import { FlatList, StyleSheet, Text, View, ActivityIndicator, TextInput, Alert, Image} from "react-native";
import Button from "../../components/Button";
import { GlobalStyles } from "../../components/style";
import { theme } from "../../core/theme";
import { useContext, useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { TouchableOpacity } from "react-native";
import { AxiosContext, AxiosProvider } from "../../context/AxiosContext";
import filter from "lodash.filter"
import Icon from 'react-native-vector-icons/MaterialIcons';
import BackButton from "../../components/BackButton";
import Spinner from "../../helpers/Spiner";



function DaftarPendapatanTelur({navigation}){

    const [ IncomeEgg, setIncomeEgg ] = useState([])
    const [ loading, setLoading ] = useState(true)
    const [ errorMessage, setErrorMessage ] = useState('')
    const [pageCurrent, setpageCurrent]= useState(1);
    const [totalpage, settotalpage]= useState(10);
    const [search, setsearch]= useState('');
    const [status, setStatus] = useState('loading');

    const axiosContext = useContext(AxiosContext);

    const toggleAddEmployeeModal = () => {
        console.log('test_data');
    }

    const getData = () => {
      console.log("get data")
      setLoading(true)
      axiosContext.authAxios.get(`/api/v1/incomeEgg?orders=createdAt-desc?size=10&page=${pageCurrent}`)
      .then(res => {
        renderFooter()
        setIncomeEgg(IncomeEgg.concat(res.data.content))
        // console.log(res.data);
      //  setIncomeEgg([...IncomeEgg,...res.data.content])
      })
      .catch((e) => {
        setLoading(false)
        console.error(e)
        return Alert.alert(
          "Error",
          "Silahkan Login Kembali?",
        );
      }) 
    }

    const newgetData = () => {
      console.log("get data")
      axiosContext.authAxios.get(`/api/v1/incomeEgg?orders=createdAt-desc?size=10&page=${pageCurrent}`)
      .then(res => {
        renderFooter()
        setIncomeEgg(res.data.content)
        // console.log(res.data);
      //  setIncomeEgg([...IncomeEgg,...res.data.content])
      })
      .catch((e) => {
        setLoading(false)
        console.error(e)
        return Alert.alert(
          "Error",
          "Silahkan Login Kembali?",
        );
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
    const DeleteData=(id)=>{
        axiosContext.authAxios.delete('/api/v1/incomeEgg/'+id)
        .then(res=> {
          renderFooter()
          setIncomeEgg(res.data.content)
          newgetData()
        })
        .catch((errror)=>{
          console.error(errror, "err")
        }
    )
    }

    useEffect(() => {
      getData()
      return()=>{}
    }, [pageCurrent]);

     const render=({item})=>{
      // console.log("item =", item)
        return(
        <ScrollView>
          <View style={styles.container} key={item.id}>
            <TouchableOpacity
                  onPress={toggleAddEmployeeModal} style={styles.button}>
                  <Text style={styles.buttonText}>Dibuat : {item.date}</Text>
            </TouchableOpacity>
            <View style={styles.employeeListContainer}>
              <Text style={styles.listItem}>Jumlah Telur : {item.quantity.toLocaleString()}</Text>
              <Text style={styles.listItem}>Tanggal : {item.date.toLocaleString()}</Text>
            
            <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => {showConfirmDialog(item.id)}}
              style={{ ...styles.button, marginVertical: 0, marginLeft: 10, backgroundColor: "tomato" }}>
              <Text style={styles.buttonText}>Hapus</Text>
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
        </ScrollView>
      )
    }

    handleLoadMore = async()=>{
    //    if (pageCurrent < totalpage){
    //   renderFooter()
    //   setpageCurrent(pageCurrent+1)
    // }else {
    //   renderFooter()
    //   setpageCurrent(pageCurrent+1)
    // }
    // renderFooter()
    if(loading)return;
    // renderFooter()
    const nextPage = pageCurrent + 1
    renderFooter()
    const newData = await setpageCurrent(nextPage);
    renderFooter()
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

      const handleSearch= (item) =>{
        setsearch(item);
        const formattedQuery = item.toLowerCase();
        const filterData= filter(IncomeEgg, (item)=> {
          return contains(item , formattedQuery)
        })
        console.log("Format Query =",formattedQuery)
        console.log("Filter Data = ",filterData)
        setIncomeEgg(filterData)
      };
      const contains= ({date, quantity}, item) => {
        if(date.includes(item)){
          return true;
        }
        return false;
      }

      // const List = ({item})=> {
      //   console.log("Item Data = ",item)
      //     if (item === ""){
      //       return <render quantity ={item.quantity} date={item.date} />
      //     }
      //     // if(item.quantity.toUpperCase().includes(masterdata.toUpperCase().trim().replace(/\s/g, ""))){
      //     //   return <render quantity ={item.quantity} date={item.date}/>
      //     // }
      //     if (item.quantity.toUpperCase().includes(item.toUpperCase().trim().replace(/\s/g, ""))){
      //       return <render quantity ={item.quantity} date={item.date}/>
      //     }
      // }

      return(
        <View style={{backgroundColor:'#F5EEE6'}}>
          <BackButton goBack={navigation.goBack}/>
          <View style={{flexDirection:'row'}}>
            <View style={styles.input}>
              <Icon name="search" size={25} color={'#1F2544'} style={{marginTop:10}}/>
              <TextInput placeholder="search" 
                placeholderTextColor="#000"
                style={{fontSize:15,color:'#1F2544'}}
                value={IncomeEgg} 
                clearButtonMode="always"
                onChangeText={handleSearch}
                autoCorrect={false}/>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate ('PendapatanTelur')} 
              style={{ marginVertical: 0, marginLeft: 0 ,flexDirection:'row'}}>
              <Icon name="add" size={40} color={'#1F2544'} style={{marginTop:20,}}/>
              <Text style={{marginTop:22, fontSize:20,color:'#030637'}}>Add</Text>
          </TouchableOpacity>   
          </View>
          <FlatList
          style={styles.container12}
          data={IncomeEgg}
          renderItem={render}
          keyExtractor={(item,index)=> index.toString()}
          ListFooterComponent={renderFooter}
          onEndReached={this.handleLoadMore}
          onEndReachedThreshold={0}
          >
          </FlatList>       
        </View>
      )
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
      loader:{
        marginTop:10,
        marginBottom:35,
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
      viewButton: {
        height:900,
        width:300
      },
      background:{
        flexDirection:'row'
      }
})