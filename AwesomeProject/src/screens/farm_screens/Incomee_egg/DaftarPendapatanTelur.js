import { FlatList, StyleSheet, Text, View, ActivityIndicator, TextInput, Alert, Image, SafeAreaView, TouchableOpacity } from "react-native";
import { useContext, useEffect, useState } from "react";
import { AxiosContext } from "../../../context/AxiosContext";
import Icon from 'react-native-vector-icons/MaterialIcons';
import BackButton from "../../../components/BackButton";
import listStyle from "../../../helpers/styles/list.style";

function DaftarPendapatanTelur({ route, navigation }) {
  const [incomeEgg, setIncomeEgg] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageCurrent, setPageCurrent] = useState(1);
  const [search, setSearch] = useState('');
  const axiosContext = useContext(AxiosContext);
  const { itemp } = route.params;
  const [isDataFinished, setIsDataFinished] = useState(false);
  const [totalpage, settotalpage]= useState(10);
  const [isPaginating, setIsPaginating] = useState(false);

  const getData = () => {
    axiosContext.authAxios
      .get(`/api/v1/incomeEgg?orders=createdAt-desc&size=${totalpage}&page=${pageCurrent}`)
      .then(res => {
        // setLoading(false);
        // setIncomeEgg(prevData => itemp ? res.data.content : [...prevData, ...res.data.content]);
        const data = res.data.content || [];

        if (data.length === 0) {
          setIsDataFinished(true);
        } else {
          setIncomeEgg((prevFeed) => [...prevFeed, ...data]);
        }
        setLoading(false);
        setIsPaginating(false);
      })
      .catch(console.error);
  };

  const newGetData = () => {
    setLoading(true);
    axiosContext.authAxios
      .get(`/api/v1/incomeEgg?orders=createdAt-desc&size=10&page=${pageCurrent}`)
      .then(res => {
        setLoading(false);
        setIncomeEgg(res.data.content);
      })
      .catch(e => {
        setLoading(false);
        Alert.alert("Error", "Silahkan Login Kembali?");
        console.error(e);
      });
  };

  const handleDelete = (id) => {
    axiosContext.authAxios.delete(`/api/v1/incomeEgg/${id}`)
      .then(() => {
        newGetData();
      })
      .catch(console.error);
  };

  const showConfirmDialog = (id) => {
    Alert.alert(
      "Apakah kamu yakin?",
      "Apakah Kamu Yakin Untuk Menghapus Data?",
      [
        { text: "Yes", onPress: () => handleDelete(id) },
        { text: "No" }
      ]
    );
  };

  // const handleLoadMore = () => {
  //   if (loading) return;
  //   setPageCurrent(prevPage => prevPage + 1);
  // };
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
    const newData = await setPageCurrent(nextPage);  
 }

  const handleSearch = (query) => {
    setSearch(query);
    const filteredData = incomeEgg.filter(({ date }) => date.toLowerCase().includes(query.toLowerCase()));
    setIncomeEgg(filteredData);
  };
  const formatAmountWithDots = (value) => {
    if (!value) return '0'; // Handle empty or undefined value
    const onlyNumbers = value.toString().replace(/[^0-9]/g, ''); // Ensure only numeric characters
    return onlyNumbers.replace(/\B(?=(\d{3})+(?!\d))/g, '.'); // Add dots every 3 digits
  };

  useEffect(() => {
    console.log("page current = ", pageCurrent)
    // itemp ? newGetData() : getData();
    if (itemp == null) {
      newGetData();
    } else {
      getData();
    }
  }, [itemp, pageCurrent]);

   renderItem = ({ item }) => (
    <View style={listStyle.container} key={item.id}>
      <TouchableOpacity onPress={() => console.log('test_data')} style={listStyle.button}>
        <Text style={listStyle.buttonText}>Dibuat : {item.date}</Text>
      </TouchableOpacity>
      <View style={listStyle.employeeListContainer}>
        <Text style={listStyle.listItem}>Jumlah Telur : {formatAmountWithDots(item.quantity)}</Text>
        <Text style={listStyle.listItem}>Tanggal : {item.date}</Text>
        <View style={listStyle.buttonContainer}>
          <TouchableOpacity onPress={() => showConfirmDialog(item.id)} style={{ ...listStyle.button, backgroundColor: "tomato", marginLeft: 10 }}>
            <Text style={listStyle.buttonText}>Hapus</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('UpdatePendapatanTelur', { id: item.id })} style={{ ...listStyle.button, backgroundColor: "tomato", marginLeft: 10 }}>
            <Text style={listStyle.buttonText}>Edit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
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
              onPress={() => navigation.navigate ('PendapatanTelur')} 
              style={{ marginVertical: 0, marginLeft: 0 ,flexDirection:'row'}}>
              <Icon name="add" size={40} color={'#1F2544'} style={{marginTop:20,}}/>
              <Text style={{marginTop:22, fontSize:20,color:'#030637'}}>Add</Text>
          </TouchableOpacity>
        </View>
      {/* <ScrollView contentContainerStyle={{ flexGrow: 1 }}> */}
      <FlatList
      // data={feed}
      data={incomeEgg || []} 
      renderItem={this.renderItem}
      keyExtractor={(item,index)=> index.toString()}
      ListFooterComponent={renderFooter}
      // ListEmptyComponent={emptyList}
      ListEmptyComponent={this.renderEmptyComponent}
      onEndReached={this.handleLoadMore}
      onEndReachedThreshold={0.1}
      style={listStyle.container12}
      contentContainerStyle={{ flexGrow: 1, paddingBottom: 50 }}
      />
      {/* </ScrollView> */}
      </View>}
      </SafeAreaView>
  );
}

export default DaftarPendapatanTelur;
