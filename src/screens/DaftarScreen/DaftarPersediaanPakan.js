import { ScrollView, View,Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native";
import { theme } from "../../core/theme";
import { GlobalStyles } from "../../components/style";
import Button from "../../components/Button";
import { useEffect, useState } from "react";

function DaftarPersediaanPakan({navigation, route}){

  const [feed, setfeed]= useState([])
  const [loading, setLoading]= useState(true)
  const [errormessage, setErrorMessage]= useState('')

  const  getData = () =>{
    // setLoading(true)
    fetch ('http://139.162.6.202:8000/api/v1/feed?page=1&size=10',{
      method: "GET"
    })
    .then (sen => sen.json())
    .then (sen => {
      // setLoading (false)
      setErrorMessage('')
      console.log(sen);
      setfeed(sen.content)
    })
    .catch(()=> {
    //   setLoading(false)
    //   setErrorMessage("try")
     })
  }

  const deleteData = (id) => {
    console.log(id);
    setLoading(true)
    fetch('http://139.162.6.202:8000/api/v1/feed/'+id,
    {method: "DELETE"})
    // .then(res => res.json())
    // .then(res =>{
    //   console.log(res)
    //   setLoading(false)
    //   setErrorMessage('')
    //   getData()
    // })
    // .catch(()=> {
    //   setLoading(false)
    //   setErrorMessage("hdr")
    // })
    }

   const updateData = (id )=> {
    console.log(id)
    fetch ('http://139.162.6.202:8000/api/v1/feed/'+id, {method: "PUT" })
   }
  
  useEffect(()=> {
    getData()
  },[])

  
    return(
        <ScrollView>
            <View style={styles.container}>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}> PersediaanPakan</Text>
            </TouchableOpacity>
            <Text style={styles.title}>DaftartPersediaan</Text>
            {feed.map((data, index) =>
            <View style={styles.employeeListContainer} key={data.id}>
                <Text style={{ ...styles.listItem, color:"tomato"}}>{data.date}</Text>
                <Text style ={styles.name}>{data.feed_name}</Text>
                <Text style={styles.listItem}>Pakan :{data.type}</Text>
                <Text style={styles.listItem}>Jumlah/KG :{data.quantity}</Text>
                <Text style={styles.listItem}>Tanggal :{data.date}</Text>
                <Text style={styles.listItem}>Harga :{data.amount}</Text>

                <View style={styles.buttonContainer}>
                {/* <TouchableOpacity
                    onPress={() => {
                        
                    }}
                    style={{ ...styles.button, marginVertical: 0 }}>
                  
                </TouchableOpacity> */}
  
                <Button mode='contained'
                onPress={() =>
                  navigation.navigate('UpdatePakan', {id: data.id})
                } style={styles.buttonText}>Edit</Button>

                <Button onPress={()=> deleteData(data.id)} style={styles.buttonText}>Delete</Button>
                {/* <Button onPress={()=> updateData(data.id)} style={styles.buttonText}>Delete</Button> */}
                
               
                </View>
            </View> )}
            </View>
            <Button 
            mode='contained'
                onPress={() =>
                  navigation.reset({
                    index: 0,
                    routes: [{ name: 'PersediaanPakan' }],
                  })
                }
            >Kembali</Button>
        </ScrollView>
    )
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
            fontSize: 10
          },
          title: {
            fontWeight: "bold",
            fontSize: 20,
            marginBottom: 10
          },
          employeeListContainer: {
            marginBottom: 25,
            elevation: 4,
            backgroundColor: "white",
            padding: 40,
            borderRadius: 6,
            borderTopWidth: 1,
            borderColor: "rgba(0,0,0,0.1)"
          },
          name: {
            fontWeight: "bold",
            fontSize: 16
          },
          listItem: {
            fontSize: 16
          },
          buttonContainer: {
            marginTop: 10,
            flexDirection: "row",
            alignItems: "center"
          },
          message: {
            color: "tomato",
            fontSize: 17
          }
})