import { ScrollView, View,Text, StyleSheet,FlatList,ActivityIndicator } from "react-native";
import { TouchableOpacity } from "react-native";
import { theme } from "../../core/theme";
import { GlobalStyles } from "../../components/style";
import Button from "../../components/Button";
import { useContext, useEffect, useState } from "react";
import { AxiosContext } from "../../context/AxiosContext";

function DaftarPersediaanPakan({navigation}){

  const [feed, setfeed]= useState([])
  const [loading, setLoading]= useState(false)
  const [errormessage, setErrorMessage]= useState('')
  const [pageCurrent, setpageCurrent]= useState(0);
  const [totalpage, settotalpage]= useState(10);
  const axiosContext = useContext(AxiosContext);

  // const config={
  //   headers:{Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0XzI0QGdtYWlsLmNvbSIsImlhdCI6MTY4NjQ2MjE2NSwiZXhwIjoxNjg2NDYzNjA1fQ.zZdRLcc_6ul4aQu5eRy9i_hsF_afoSLGXPjKHxWfbEM"}`}
  // }
  const toggleAddEmployeeModal = () => {
    console.log('test_data');}

  const getData = () =>{
    // if (totalpage < pageCurrent)
    // return;

    console.log("get data")
    setLoading(true)
    axiosContext.authAxios.get(`/api/v1/feed?size=10&page=${pageCurrent}`)
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

  //  const updateData = (id )=> {
  //   console.log(id)
  //   fetch ('http://139.162.6.202:8000/api/v1/feed/'+id, {method: "PUT" })
  //  }
  
  
  useEffect(()=> {
    console.log("PageCurrent = ",pageCurrent)
    setLoading(true)
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
                    onPress={() => {DeleteData(item.id)}}
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
    console.log("HandleLoadMore")
    setpageCurrent(pageCurrent+1)
    // getData()
    setLoading(true)
  };

  renderFooter=()=>{
    return(
      loading?
    <View style={styles.loader}>
      <ActivityIndicator size="large"/>
    </View> :null
    )
  }

  
    return(
      <FlatList
      style={styles.container12}
      data={feed}
      renderItem={this.renderItem}
      keyExtractor={(item,index)=> index.toString()}
      ListFooterComponent={this.renderFooter}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0}/>)

        // <ScrollView>
        //     <View style={styles.container}>
        //     <TouchableOpacity style={styles.button}>
        //         <Text style={styles.buttonText}> PersediaanPakan</Text>
        //     </TouchableOpacity>
        //     <Text style={styles.title}>Daftar Persediaan Pakan</Text>
        //     {feed.map((data, index) =>
        //     <View style={styles.employeeListContainer} key={data.id}>
        //         <Text style={{ ...styles.listItem, color:"tomato"}}>{data.date}</Text>
        //         <Text style ={styles.name}>{data.feed_name}</Text>
        //         <Text style={styles.listItem}>Pakan :{data.type}</Text>
        //         <Text style={styles.listItem}>Jumlah/KG :{data.quantity}</Text>
        //         <Text style={styles.listItem}>Tanggal :{data.date}</Text>
        //         <Text style={styles.listItem}>Harga :{data.amount}</Text>

        //         <View style={styles.buttonContainer}>


        //         <TouchableOpacity
        //             onPress={() => navigation.navigate ('UpdatePakan',{id:data.id})
                        
        //             } onLongPress={()=> navigation.navigate('UpdatePakan',{id:data.id})}
        //             style={{ ...styles.button, marginVertical: 0 }}>
        //             <Text style={styles.buttonText}>Edit</Text>
        //         </TouchableOpacity>

        //         <TouchableOpacity
        //             onPress={() => {deleteData(data.id)
                    
        //             }}
        //             style={{ ...styles.button, marginVertical: 0, marginLeft: 10, backgroundColor: "tomato" }}>
        //             <Text style={styles.buttonText}>Delete</Text>
        //         </TouchableOpacity>
                {/* <TouchableOpacity
                    onPress={() => {
                        
                    }}
                    style={{ ...styles.button, marginVertical: 0 }}>
                  
                </TouchableOpacity> */}
  
                {/* <Button mode='contained'
                onPress={() =>
                  navigation.navigate('UpdatePakan', {id: data.id})
                } style={styles.buttonText}>Edit</Button>

                <Button onPress={()=> deleteData(data.id)} style={styles.buttonText}>Delete</Button> */}
                {/* <Button onPress={()=> updateData(data.id)} style={styles.buttonText}>Delete</Button> */}
                
               
//                 </View>
//             </View> )}
//             </View>
//             <Button 
//             mode='contained'
//                 onPress={() =>
//                   navigation.reset({
//                     index: 0,
//                     routes: [{ name: 'PersediaanPakan' }],
//                   })
//                 }
//             >Kembali</Button>
//         </ScrollView>
//     )
 
 
}
export default DaftarPersediaanPakan;
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
    }
})