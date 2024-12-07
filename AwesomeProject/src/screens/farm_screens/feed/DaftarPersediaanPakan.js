import { ActivityIndicator, Alert, FlatList, Image, SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";
import Button from "../../../components/Button";
import { GlobalStyles } from "../../../components/style";
import { theme } from "../../../core/theme";
import {Ionicons} from '@expo/vector-icons';
import { useContext, useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import filter from "lodash.filter"
import { TouchableOpacity } from "react-native";
import { AxiosContext } from "../../../context/AxiosContext";
import Icon from 'react-native-vector-icons/MaterialIcons';
import listStyle from "../../../helpers/styles/list.style";

function DaftarPersediaanPakan({route, navigation}){
    const axiosContext = useContext(AxiosContext);
    const [feed, setfeed]= useState([])
    const [ loading, setLoading ] = useState(true)
    const [ errorMessage, setErrorMessage ] = useState('')
    const [pageCurrent, setpageCurrent]= useState(1)
    const [totalpage, settotalpage]= useState(10);
    const [search, setsearch]= useState('');
    const [hasMoreData, setHasMoreData] = useState(true);
    const {item}= route.params;
    const {itemp} = route.params;
    const [isDataFinished, setIsDataFinished] = useState(false);

    const getData = () => {
        axiosContext.authAxios.get(`/api/v1/feed?orders=createdAt-desc?size=${totalpage}&page=${pageCurrent}`)
          .then(res => {
            console.log("get data = ",res.data.content);
            setLoading(false)
            setfeed(feed.concat(res.data.content))
            //setLoading(false)
          })
          .catch((e) => {
            setLoading(false)
            console.error(e, "getdatay")
            setErrorMessage("Network Error. Please try again.")
          })
    }

    const newgetData = () => {
        axiosContext.authAxios.get(`/api/v1/feed?orders=createdAt-desc`)
          .then(res => {
            //console.log(res.data.content);
            setLoading(false)
            setfeed(res.data.content)
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
        axiosContext.authAxios.delete('/api/v1/feed/'+id)
        .then(res =>{
          setfeed(res.data)
          newgetData()
        })
        .catch((e)=> {
          console.error(e,"errror")
          setLoading(false)
          setErrorMessage("hdr")
        })
    }

    const formatAmountWithDots = (value) => {
      if (!value) return '0'; // Handle empty or undefined value
      const onlyNumbers = value.toString().replace(/[^0-9]/g, ''); // Ensure only numeric characters
      return onlyNumbers.replace(/\B(?=(\d{3})+(?!\d))/g, '.'); // Add dots every 3 digits
    };
    
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
      console.log("itemp = ",itemp)
      if (itemp !== undefined){
        newgetData();
      }else{
        getData();
      }  
    }, [itemp, pageCurrent])

renderItem=({item})=>{
  return(
    <View style={listStyle.container} key={item.id}>
      <TouchableOpacity
              style={listStyle.button}>
                <Text style={listStyle.buttonText}>{item.date}</Text>
        </TouchableOpacity>
        <View style={listStyle.employeeListContainer}>
        <Text style={listStyle.listItem}>Jumlah : {formatAmountWithDots(item.quantity)} KG</Text>
            <Text style={listStyle.listItem}>Harga : {formatAmountWithDots(item.amount)}</Text>
            <Text style={listStyle.listItem}>Type : {item.type}</Text>
            <Text style={listStyle.listItem}>Tanggal : {item.date}</Text>
          <View style={listStyle.buttonContainer}>
            <TouchableOpacity
                onPress={() => {showConfirmDialog(item.id)}}
                style={{ ...listStyle.button, marginVertical: 0, marginLeft: 10, backgroundColor: "tomato" }}>
                <Text style={listStyle.buttonText}>Hapus</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigation.navigate ('UpdatePakan',{id:item.id})} 
                onLongPress={()=> navigation.navigate('UpdatePakan',{id:item.id})}
                style={{ ...listStyle.button, marginVertical: 0, marginLeft: 10, backgroundColor: "tomato" }}>
                <Text style={listStyle.buttonText}>Edit</Text>
            </TouchableOpacity>
          </View>
        </View>
    </View>
  )
 }

//  const renderFooter=()=>{
//   return(
//     loading?
//   <View style={listStyle.loader}>
//     <ActivityIndicator size="large"/>
    
//   </View> :null)
//  }
  const renderFooter = () => {
    if (isDataFinished) {
      return (
        <View style={listStyle.footerContainer}>
          <Text style={listStyle.footerText}>Data sudah habis</Text>
        </View>
      );
    }
    return null; // Tidak ada footer jika data belum habis
  };

 handleLoadMore= async()=>{
    if(loading)return;
    renderFooter()
    const nextPage = pageCurrent + 1
    setIsDataFinished(true); 
    const newData = await setpageCurrent(nextPage);  
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

const emptyList = ()=>{
  return(
    ( <View style={listStyle.loader1}>
      {/* <ActivityIndicator /> */}
      <Text style={listStyle.buttonEmpty}>Data Empty</Text>
      {/* <Image source={require('../../assets/logo2.png')} style={{width:100,height:100}}/> */}
    </View>)
  )}

  renderEmptyComponent = () => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <Text style={{ fontSize: 16, color: 'gray' }}>Data kosong</Text>
    </View>
  );
  
    return(
      <SafeAreaView style={listStyle.safearea}>
        {loading?
    <View style={listStyle.loadingflatlist}>
      <ActivityIndicator size="large"/>
      <Image source={require('../../assets/logo2.png')} style={{width:100,height:100}}/>
    </View> :
      <View style={{backgroundColor:'#F5EEE6'}}>
        <View style={{flexDirection:'row'}}>
          <View style={listStyle.input}>
          <Icon name="search" size={25} color={'#1F2544'} style={{marginTop:10}}/>
            <TextInput style={{fontSize:15, color:'#1F2544'}} 
              placeholder="search" 
              placeholderTextColor="#000"
              value={search} 
              clearButtonMode="always"
              onChangeText={handleSearch}
              autoCorrect={false}/>
          </View>
          <TouchableOpacity
              onPress={() => navigation.navigate ('PersediaanPakan')} 
              style={{ marginVertical: 0, marginLeft: 0 ,flexDirection:'row'}}>
              <Icon name="add" size={40} color={'#1F2544'} style={{marginTop:20,}}/>
              <Text style={{marginTop:22, fontSize:20,color:'#030637'}}>Add</Text>
          </TouchableOpacity>
        </View>
      {/* <ScrollView contentContainerStyle={{ flexGrow: 1 }}> */}
      <FlatList
      // data={feed}
      data={feed || []} 
      renderItem={this.renderItem}
      keyExtractor={(item,index)=> index.toString()}
      // ListEmptyComponent={emptyList}
      ListEmptyComponent={this.renderEmptyComponent}
      onEndReached={this.handleLoadMore}
      onEndReachedThreshold={0.1}
      style={listStyle.container12}
      contentContainerStyle={{ flexGrow: 1, paddingBottom: 50 }}
      ListFooterComponent={renderFooter}
      />
      {/* </ScrollView> */}
      </View>}
      </SafeAreaView>
    )
}
export default DaftarPersediaanPakan;