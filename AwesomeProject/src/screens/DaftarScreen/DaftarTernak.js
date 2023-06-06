import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";
import Button from "../../components/Button";
import { GlobalStyles } from "../../components/style";
import { theme } from "../../core/theme";
import {Ionicons} from '@expo/vector-icons';
import { useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { TouchableOpacity } from "react-native";

function DaftarTernak({navigation}){

    const [ employee, setEmployee ] = useState([])
    const [ loading, setLoading ] = useState(true)
    const [ errorMessage, setErrorMessage ] = useState('')
    const [pageCurrent, setpageCurrent]= useState(1)

    const toggleAddEmployeeModal = () => {
        console.log('test_data');
    }

    const getData = () => {
        setLoading(true)
        fetch('http://139.162.6.202:8000/api/v1/livestock', {
          method: "GET"
        })
          .then(res => res.json())
          .then(res => {
            console.log(res);
            setLoading(false)
            setErrorMessage('')
            setEmployee(res.content)
          })
          .catch(() => {
            setLoading(false)
            setErrorMessage("Network Error. Please try again.")
          })
      }

      const DeleteData = () => {
        setLoading(true)
        fetch('http://139.162.6.202:8000/api/v1/livestock',
        {method: "DELETE"})
        .then(res => res.json())
        .then(res =>{
          console.log(res)
          setLoading(false)
          setErrorMessage('')
          setEmployee(res.content)
          getData()
        })
        .catch(()=> {
          setLoading(false)
          setErrorMessage("hdr")
        })
      }

      useEffect(() => {
        getData()
      }, [])

      useEffect(()=>{
        DeleteData()
      },[])
//yarn add react-native-bootsplash
//yarn react-native generate-bootsplash assets/bootsplash_logo_original.png --background-color=F5FCFF --logo-width=100  --assets-path=assets  --flavor=main 
renderItem=({item})=>{
  return(
    <View style={styles.container} key={data.id}>
      <Text style={styles.listItem}>{item.age}</Text>
      <Text style={styles.listItem}>{item.quantity}</Text>
      <Text style={styles.listItem}>{item.amount}</Text>
      <Text style={styles.listItem}>{item.note}</Text>
      <Text style={styles.listItem}>{item.type}</Text>
      <Text style={styles.listItem}>{item.date}</Text>
    </View>
  )
 }

 renderFooter=()=>{
  return(
    loading?
    <View style={styles}>
      <ActivityIndicator size="large"/>
    </View> :null
  )
 }
 handleLoadMore=()=>{
    setpageCurrent(pageCurrent+1)
    setLoading(true)
 }
    // return(
      //   <ScrollView>

    //         <View style={styles.container}>
    //         <TouchableOpacity
    //             onPress={toggleAddEmployeeModal}
    //             style={styles.button}>
    //             <Text style={styles.buttonText}>Tambah Ternak</Text>
    //         </TouchableOpacity>

    //         <Text style={styles.title}>Daftar Ternak</Text>
    //         {employee.map((data, index) => <View
    //             style={styles.employeeListContainer}
    //             key={data.id}>
    //             <Text style={{ ...styles.listItem, color: "tomato" }}>{data.date}</Text>
    //             <Text style={styles.name}>{data.employee_name}</Text>
    //             <Text style={styles.listItem}>Umur: {data.age}</Text>
    //             <Text style={styles.listItem}>Jumlah: {data.quantity}</Text>
    //             <Text style={styles.listItem}>Harga Total: {data.amount}</Text>
    //             <Text style={styles.listItem}>Catatan: {data.note}</Text>
    //             <Text style={styles.listItem}>Type: {data.type}</Text>
    //             <Text style={styles.listItem}>Tanggal: {data.date}</Text>

    //             <View style={styles.buttonContainer}>
    //             {/* <TouchableOpacity
    //                 onPress={() => {
                        
    //                 }}
    //                 style={{ ...styles.button, marginVertical: 0 }}>
    //                 <Text style={styles.buttonText}>Edit</Text>
    //             </TouchableOpacity> */}

    //               <TouchableOpacity
    //                 onPress={() => navigation.navigate ('UpdateTernak',{id:data.id})
                        
    //                 } onLongPress={()=> navigation.navigate('UpdateTernak',{id:data.id})}
    //                 style={{ ...styles.button, marginVertical: 0 }}>
    //                 <Text style={styles.buttonText}>Edit</Text>
    //             </TouchableOpacity>

    //             <TouchableOpacity
    //                 onPress={() => { DeleteData
                    
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
    //             routes: [{ name: 'Ternak' }],
    //         })
    //         }>Kembali</Button>
    //     </View>

    //   //</ScrollView>
    // )
    return(
      <FlatList
      style={styles}
      data={employee}
      renderItem={this.renderItem}
      keyExtractor={(item,index)=> index.toString()}
      ListFooterComponent={this.renderFooter}
      onEndReached={this.handleLoadMore}
      onEndReachedThreshold={0}
      />
    )
}
export default DaftarTernak;
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
        color:'#DC143C'
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