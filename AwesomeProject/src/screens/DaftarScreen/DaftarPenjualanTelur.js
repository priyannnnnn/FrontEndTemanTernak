import { ScrollView, View,Text, StyleSheet, FlatList,ActivityIndicator, TextInput, Alert, Image } from "react-native";
import { TouchableOpacity } from "react-native";
import { theme } from "../../core/theme";
import { GlobalStyles } from "../../components/style";
import Button from "../../components/Button";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AxiosContext } from "../../context/AxiosContext";
import filter from "lodash.filter"
import Icon from 'react-native-vector-icons/MaterialIcons';

function DaftarPenjualanTelur({navigation}){

  const [ saleEgg, setsaleEgg]=useState([])
  // const [loading, setLoading] = useState(true)
  const [ loading, setLoading ] = useState(true)
  const [rrorMessage, setErrorMessage ] = useState('')
  const [totalpage, settotalpage]= useState(10);
  const [pageCurrent, setpageCurrent]= useState(1);
  const axiosContext = useContext(AxiosContext);
  const [search, setsearch]= useState('');

  const toggleAddEmployeeModal = () => {
    console.log('test_data');
}
  const GetData = () => {
    console.log("get data = ")
      setLoading(true)
      axiosContext.authAxios.get(`/api/v1/saleEgg?orders=createdAt-desc?size=10&page=${pageCurrent}`)
      .then(res => {
        console.log("Elements = ",res.data);
        setsaleEgg(saleEgg.concat(res.data.content))
        // setLoading(false)
        // setErrorMessage('')
      })
      .catch((e)=>{
        console.log(e)
        return Alert.alert(
          "Error",
          "Silahkan Login Kembali?"
        );
      })
  }

  const newGetData = () => {
    console.log("get data = ")
      setLoading(true)
      axiosContext.authAxios.get(`/api/v1/saleEgg?orders=createdAt-desc?`)
      .then(res => {
        setsaleEgg(res.data.content)
      })
      .catch((e)=>{
        return Alert.alert(
          "Error",
          "Silahkan Login Kembali?"
        );
      })
  }

  const DeleteData=(id)=>{
    console.log(id)
    axiosContext.authAxios.delete('/api/v1/saleEgg/'+id)
    .then (res =>{
      setsaleEgg(res.data.content)
      newGetData()
    })
    .catch((e) => {
      console.error(e)
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
    console.log("PageCurrent",pageCurrent)
    // setLoading(true)
    GetData()
    return()=>{}
  },[pageCurrent])
  

  renderItem=({item})=>{
    return(
    <View style={styles.container}>
        <TouchableOpacity
                  onPress={toggleAddEmployeeModal} style={styles.button}>
                  <Text style={styles.buttonText}>Dibuat : {item.date}</Text>
        </TouchableOpacity>
      <View style={styles.employeeListContainer}>
            <Text style={styles.listItem}>Jumlah Pendapatan : {item.quantity.toLocaleString()}</Text>
            <Text style={styles.listItem}>Jumlah telur : {item.amount.toLocaleString()}</Text>
            <Text style={styles.listItem}>Tanggal : {item.date}</Text>   
          <View style={styles.buttonContainer}>
              <TouchableOpacity
                        onPress={() => {showConfirmDialog(item.id)}}
                        style={{ ...styles.button, marginVertical: 0, marginLeft: 10, backgroundColor: "tomato" }}>
                        <Text style={styles.buttonText}>Hapus</Text>
              </TouchableOpacity>
              <TouchableOpacity
                        onPress={() => navigation.navigate ('UpdatePenjualanTelur',{id:item.id})} 
                        onLongPress={()=> navigation.navigate('UpdatePenjualanTelur',{id:item.id})}
                        style={{ ...styles.button, marginVertical: 0, marginLeft: 10, backgroundColor: "tomato" }}>
                        <Text style={styles.buttonText}>Edit</Text>
              </TouchableOpacity>
          </View>
        </View>
    </View>
    )
  };

  handleLoadMore = async()=>{
    // if(loading)return;
    // renderFooter()
    const nextPage = pageCurrent + 1
    renderFooter()
    const newData = await setpageCurrent(nextPage);
    renderFooter()
  }
  renderFooter=()=>{
    return(
      loading?
    <View style={styles.loader}>
      <ActivityIndicator size="large"/>
      <Image source={require('../../assets/logo2.png')} style={{width:100,height:100}}/>
    </View> :null
    )}

    const handleSearch= (item) =>{
      setsearch(item);
      const formattedQuery = item.toLowerCase();
      const filterData= filter(saleEgg, (item)=> {
        return contains(item , formattedQuery)
      })
      console.log("Format Query =",formattedQuery)
      console.log("Filter Data = ",filterData)
      setsaleEgg(filterData)
    };
    const contains= ({date, quantity,amount}, item) => {
      if(date.includes(item) || quantity.toString().includes(item) || amount.toString().includes(item)){
        return true;
      }
      return false;
    }

    return(
      <View style={{backgroundColor:'#F5EEE6'}}>
        <View style={{flexDirection:'row'}}>
          <View style={styles.input}>
            <TextInput placeholder="search" 
              placeholderTextColor="#000"
              style={{fontSize:15,color:'#1F2544'}}
              value={saleEgg} 
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
      data={saleEgg}
      renderItem={this.renderItem}
      keyExtractor={(item,index)=> index.toString()}
      ListFooterComponent={this.renderFooter}
      onEndReached={this.handleLoadMore}
      onEndReachedThreshold={0}
      />
      </View>



    //     <ScrollView>
    //     <View style={styles.container}>
    //     <TouchableOpacity style={styles.button}>
         
    //         <Text style={styles.buttonText}> DaftarPenjualanTelur</Text>
    //     </TouchableOpacity>
    //     <Text style={styles.title}>Penjualan Telur</Text>
    //     {saleEgg.map((data, index)=>  <View
    //         style={styles.employeeListContainer} 
    //         key={data.id}>
    //         <Text style={{...styles.listItem, color:"tomato"}}>{data.date}</Text>
    //         <Text style={styles.name}>{data.saleEgg_name}</Text>
    //         <Text style={styles.listItem}>Jumlah Telur : {data.amount}</Text>
    //         <Text style={styles.listItem}>Tanggal : {data.date}</Text>
    //         <Text style={styles.listItem}>Total Pendapatan Telur  : {data.quantity}</Text>
    
    //    </View>)}
    //     </View>
    //     <Button 
    //         mode='contained' onPress={() => 
    //             navigation.reset({index: 0,
    //             routes: [{ name: 'Penjualan' }],})}
    //     >Kembali</Button>
        
    // </ScrollView>
    )

}
export default DaftarPenjualanTelur;
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
      loader:{
        marginTop:10,
        marginBottom:35,
        alignItems:"center"
      },
})