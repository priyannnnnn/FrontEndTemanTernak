import { FlatList, StyleSheet, Text, View, ActivityIndicator, TextInput, Alert, Image, SafeAreaView} from "react-native";
import Button from "../../../components/Button";
import { GlobalStyles } from "../../../components/style";
import { theme } from "../../../core/theme";
import { useContext, useEffect, useRef, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { TouchableOpacity } from "react-native";
import { AxiosContext, AxiosProvider } from "../../../context/AxiosContext";
import filter from "lodash.filter"
import Icon from 'react-native-vector-icons/MaterialIcons';
import BackButton from "../../../components/BackButton";
import Spinner from "../../../helpers/Spiner";
import listStyle from "../../../helpers/styles/list.style";


function DaftarPendapatanTelur({route, navigation}){

  // useEffect(() =>{
  //   newgetData();
  // },[])

    const [ IncomeEgg, setIncomeEgg ] = useState([])
    const [ loading, setLoading ] = useState(true)
    const [ errorMessage, setErrorMessage ] = useState('')
    const [pageCurrent, setpageCurrent]= useState(1);
    const [totalpage, settotalpage]= useState(10);
    const [search, setsearch]= useState('');
    const [status, setStatus] = useState('loading');
    const axiosContext = useContext(AxiosContext);
    // const {navigation, route}=props;
     const {item}= route.params;
     const {itemp} = route.params;
     const [isLoading, setIsLoading] = useState(true);


    const toggleAddEmployeeModal = () => {
        console.log('test_data');
    }

    const getData =  () => {
         axiosContext.authAxios.get(`/api/v1/incomeEgg?orders=createdAt-desc?size=10&page=${pageCurrent}`)
        .then(res => {
          if(itemp !== undefined){
            console.log("Data Update = ", res.data.content)
            setIncomeEgg(res.data.content)
          }else{
            console.log("get data = ",res.data.content);
            setLoading(false)
            setIncomeEgg(IncomeEgg.concat(res.data.content))
          }
          // renderFooter()
        //   console.log("itemp = ", itemp)
        //   console.log("succes get data")
        //   console.log(res.data.content)
        //  // setIncomeEgg(res.data.content)
        //  setIncomeEgg(IncomeEgg.concat(res.data.content))
        //   // console.log(res.data);
        // //  setIncomeEgg([...IncomeEgg,...res.data.content])
        // setLoading(false)
        })
        .catch((e) => {
          console.error(e)
        }) 
      // }catch(e){
      //   console.error("catch =", e)
      // }
      // console.log("get data")
      // setLoading(true)
    
    }

    const newgetData =  () => {
      console.log("get data")
      axiosContext.authAxios.get(`/api/v1/incomeEgg?orders=createdAt-desc?size=10&page=${pageCurrent}`)
      .then(res => {
        renderFooter()
        setIncomeEgg(res.data.content)
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
    //   console.log("log props = ")
    //   console.log(itemp)
    //   console.log("ress = ")
    //  console.log(item)
    //   console.log("url = ")
      // console.log(`/api/v1/incomeEgg?orders=createdAt-desc?size=10&page=${pageCurrent}`)
      // console.log("itemp = ", itemp)
      getData();
      // return()=>{}
    }, [itemp, pageCurrent]);

    // useEffect(()=>{
    //   getData();
    // },[pageCurrent])

     const render=({item})=>{
      // console.log("item =", item)
        return(
        <ScrollView>
          <View style={listStyle.container} key={item.id}>
            <TouchableOpacity
                  onPress={toggleAddEmployeeModal} style={listStyle.button}>
                  <Text style={listStyle.buttonText}>Dibuat : {item.date}</Text>
            </TouchableOpacity>
            <View style={listStyle.employeeListContainer}>
              <Text style={listStyle.listItem}>Jumlah Telur : {item.quantity}</Text>
              <Text style={listStyle.listItem}>Tanggal : {item.date}</Text>
            
            <View style={listStyle.buttonContainer}>
            <TouchableOpacity
              onPress={() => {showConfirmDialog(item.id)}}
              style={{ ...listStyle.button, marginVertical: 0, marginLeft: 10, backgroundColor: "tomato" }}>
              <Text style={listStyle.buttonText}>Hapus</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate ('UpdatePendapatanTelur',{id:item.id})} 
              onLongPress={()=> navigation.navigate('UpdatePendapatanTelur',{id:item.id})}
              style={{ ...listStyle.button, marginVertical: 0, marginLeft: 10, backgroundColor: "tomato" }}>
              <Text style={listStyle.buttonText}>Edit</Text>
            </TouchableOpacity>          
            </View>
            </View>
          </View>
        </ScrollView>
      )
    }

    const handleLoadMore = async()=>{
      // renderFooter()
      console.log("Pagination = ")
      console.log("url = ")
      console.log(`/api/v1/incomeEgg?orders=createdAt-desc?size=10&page=${pageCurrent}`)
      if(loading)return;
      // renderFooter()
      // getData()
      //if (isLoading) return;
      //setIsLoading(true)
      console.log("Tess = ")
    //  await setpageCurrent(pageCurrent + 1)
      const nextPage = pageCurrent + 1
      const newData = await setpageCurrent(nextPage);
    }

    const renderPaginationButtons = () => {
      const maxButtonsToShow = 10;
      let startPage = Math.max(0, pageCurrent - Math.floor(maxButtonsToShow / 2));
      let endPage = Math.min(totalpage, startPage + maxButtonsToShow - 1);
    
      if (endPage - startPage + 1 < maxButtonsToShow) {
        startPage = Math.max(0, endPage - maxButtonsToShow + 1);
      }
    
      const buttons = [];
    
      // for (let i = startPage; i <= endPage; i++) {
      //   buttons.push(
      //     <TouchableOpacity
      //       key={i}
      //       onPress={() => handlePageClick(i)}
      //       style={[
      //         styles.paginationButton,
      //         i === currentPage ? styles.activeButton : null,
      //       ]}>
      //       <Text style={{color: 'white'}}>{i}</Text>
      //     </TouchableOpacity>,
      //   );
      // }
    
      return buttons;
    };

      const renderFooter=()=>{
        axiosContext.authAxios.get(`/api/v1/incomeEgg?orders=createdAt-desc?size=10&page=${pageCurrent}`)
        .then(res => {
          // renderFooter()
          console.log("succes get data render footer = ")
          console.log(res.data.content)
          if (res == []){
    <View style={styles.loader}>
      <ActivityIndicator size="large"/>
      <Text style={listStyle.button}>emty</Text>
    </View>
          }
        })
        // return(
        //   loading?
        // <View style={styles.loader}>
        //   <ActivityIndicator size="large"/>

        // </View> :null
        // )
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

      return(
        <View style={{backgroundColor:'#F5EEE6'}}>
          <BackButton goBack={navigation.goBack}/>
          <View style={{flexDirection:'row'}}>
            <View style={listStyle.input}>
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
          {loading?
        <View style={listStyle.loadingflatlist}>
          <ActivityIndicator size="large"/>
          <Image source={require('../../assets/logo2.png')} style={{width:100,height:100}}/>
        </View>: 
          <FlatList
          data={IncomeEgg}
          renderItem={render}
          keyExtractor={(item,index)=> index.toString()}
          ListFooterComponent={renderFooter}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0}
          style={listStyle.container12}
          >
          </FlatList> }      
        </View>
      )
}
export default DaftarPendapatanTelur;
// const styles=StyleSheet.create({
//     text:{
//         fontSize:20,
//         flex:1,
//         marginTop:35,
//         textAlign:'center'
//     },
//     view:{
//         flex:1,
//         backgroundColor:theme.colors.backgroundColor
//     },
//     view1:{
//         flex:1,
//         backgroundColor:GlobalStyles.colors.error50,
//         marginHorizontal:12,
//         margin:3,
//         minWidth:20,

//     },
//     container: {
//         paddingHorizontal: 20
//       },
//       button: {
//         borderRadius: 5,
//         marginVertical: 20,
//         alignSelf: 'flex-start',
//         backgroundColor: "gray",
//       },
//       buttonText: {
//         color: "white",
//         paddingVertical: 6,
//         paddingHorizontal: 10,
//         fontSize: 16
//       },
//       title: {
//         fontWeight: "bold",
//         fontSize: 20,
//         marginBottom: 10,
//         color:'#FF4500'
//       },
//       employeeListContainer: {
//         marginBottom: 25,
//         elevation: 4,
//         backgroundColor: "white",
//         padding: 10,
//         borderRadius: 6,
//         borderTopWidth: 1,
//         borderColor: "rgba(0,0,0,0.1)"
//       },
//       name: {
//         fontWeight: "bold",
//         fontSize: 16
//       },
//       listItem: {
//         fontSize: 18,
//         color:'#800000',
//         fontWeight:"500"
//       },
//       buttonContainer: {
//         marginTop: 10,
//         flexDirection: "row",
//         alignItems: "center"
//       },
//       message: {
//         color: "tomato",
//         fontSize: 17
//       },
//       loader:{
//         marginTop:0,
//         marginBottom:300,
//         // alignItems:"center"
//         flex: 1, 
//         alignItems: 'center',
//         justifyContent: 'center',
//         backgroundColor:'#F0F8FF'
//       },
//       loadingflatlist: {
//         marginTop:300,
//         // marginBottom:35,
//         // alignItems:"center"
//         flex: 1, 
//         alignItems: 'center',
//         justifyContent: 'center',
//         backgroundColor:'#F0F8FF'
//       },
//       container12:{
//         marginTop:20,
//        backgroundColor:'#7FFFD4'
//       },
//       input: {
//         height:45,
//         width:265,
//         borderWidth:1,
//         paddingLeft:20,
//         margin:5,
//         borderColor:'#009688',
//         backgroundColor:'#FFF6E9',
//         flexDirection:'row',
//         top:13
//         // paddingHorizontal:20,
//         // paddingVertical:10,
//         // borderEndWidth:1,
//         // borderRadius:8,
//         // borderEndColor:'#cccccc'
//         // fontSize: 20,
//         // marginLeft: 10,
//         // width: "90%",
//         // color:'#000000'
//       },
//       viewButton: {
//         height:900,
//         width:300
//       },
//       background:{
//         flexDirection:'row'
//       },
//       loading: {
//         flex: 1, 
//         alignItems: 'center',
//         justifyContent: 'center'
//     },
//     loadingcontainer: {
//       flex: 1,
//       backgroundColor: "#F5F5F5",
//       justifyContent:"center",
//       alignItems:"center",
//     }
// })