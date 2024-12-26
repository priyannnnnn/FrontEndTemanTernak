import { 
  ActivityIndicator, 
  Alert, 
  FlatList, 
  Image, 
  SafeAreaView, 
  StyleSheet, 
  Text, 
  TextInput, 
  View 
} from "react-native";
import { useContext, useEffect, useState } from "react";
import filter from "lodash.filter"
import { TouchableOpacity } from "react-native";
import { AxiosContext } from "../../../context/AxiosContext";
import Icon from 'react-native-vector-icons/MaterialIcons';
import listStyle from "../../../helpers/styles/list.style";
import Styles from "../../../helpers/styles/Styles";

function DaftarPersediaanPakan({route, navigation}){
    const axiosContext = useContext(AxiosContext);
    const [feed, setfeed]= useState([])
    const [ loading, setLoading ] = useState(true)
    const [ errorMessage, setErrorMessage ] = useState('')
    const [pageCurrent, setpageCurrent]= useState(1)
    const [totalpage, settotalpage]= useState(10);
    const [search, setsearch]= useState('');
    const [hasMoreData, setHasMoreData] = useState(true);
    console.log('router', route.params);
    const item = (route && route.params) ? route.params.item : null;
    const [isDataFinished, setIsDataFinished] = useState(false);
    const [isPaginating, setIsPaginating] = useState(false);

  const getData = () => {
    axiosContext.authAxios
      .get(`/api/v1/feed?orders=createdAt-desc&size=${totalpage}&page=${pageCurrent}`)
      .then((res) => {
        console.log(" Get Data")
        const data = res.data.content || [];

        if (data.length === 0) {
          setIsDataFinished(true);
        } else {
          setfeed((prevFeed) => [...prevFeed, ...data]);
        }
        setLoading(false);
        setIsPaginating(false);
      })
      .catch((error) => {
        setLoading(false);
        setIsPaginating(false);
        setErrorMessage("Network Error. Please try again.");
        console.error(error);
      });
  };

    const refreshFeedData = () => {
        axiosContext.authAxios.get(`/api/v1/feed?orders=createdAt-desc`)
          .then(res => {
            console.log("New Get Data")
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
          refreshFeedData()
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
    if (item == null) {
      refreshFeedData();
    } else {
      getData();
    }
  }, [item, pageCurrent]);

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
  const renderFooter = () => (
    isDataFinished ? (
      <View style={listStyle.footerContainer}>
        <Text style={listStyle.footerText}>Data sudah habis</Text>
      </View>
    ) : (
      isPaginating && (
        <View style={listStyle.footerContainer}>
          <ActivityIndicator size="small" />
          <Text style={listStyle.footerText}>Memuat data...</Text>
        </View>
      )
    )
  );

 handleLoadMore= async()=>{
    if (!loading && !isDataFinished) {
      setpageCurrent((prevPage) => prevPage + 1);
    }
 }

 const handleSearch = (query) => {
  setsearch(query);
  const formattedQuery = query.toLowerCase();
  const filteredData = filter(feed, (item) => contains(item, formattedQuery));
  setfeed(filteredData);
};

const contains = ({ age, note, date, quantity, type, amount }, query) => {
  return (
    date.includes(query) ||
    type.includes(query) ||
    quantity.toString().includes(query) ||
    amount.toString().includes(query) ||
    age?.toString().includes(query) ||
    note?.toString().includes(query)
  );
};

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