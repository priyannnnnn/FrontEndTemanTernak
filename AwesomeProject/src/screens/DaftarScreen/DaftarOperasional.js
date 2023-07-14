import { useContext, useEffect, useState } from "react";
import { AxiosContext } from "../../context/AxiosContext";
import { log } from "react-native-reanimated";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { theme } from "../../core/theme";
import { GlobalStyles } from "../../components/style";

function DaftarOperasional(){
    const [Operasional, setOperasional] = useState([])
    const [Loading, setLoading] = useState()
    const axiosContext = useContext(AxiosContext);

    const getData = () => {
        axiosContext.authAxios.get(`/api/v1/operatingCosh`)
        .then(res => {
            console.log("Get Data = ", res.data)
            setOperasional(Operasional.concat(res.data.content))
        })
        .then((e) => {
            console.log(e)
        })
    }
    const Delete = (id) => {
        console.log(id)
        axiosContext.authAxios.delete(`/api/v1/operatingCosh/`+id)
        .then(res => {
            console.log(res.data)
            setOperasional (res.data)
        })
        .catch((error) => {
            console.log(error)
        })
    
      }

    useEffect(() => {
        console.log("Get Data Useeffect = ")
        getData()
        return () => {}
    },[])

    const renderItem = ({item}) =>{
        console.log(item)
        return (
            <View style={styles.container}>
                <View style={styles.employeeListContainer}>
                    <Text style={styles.listItem}> Deskripsi : {item.description}</Text>
                    <Text style={styles.listItem}>Tanggal : {item.date} </Text>
                    <Text style={styles.listItem}> Jumlah : {item.amount}</Text>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                        onPress={() => {Delete(item.id)}}
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

    }
    return (
        <FlatList
        style={styles.container12}
        data={Operasional}
        renderItem={renderItem}
        keyExtractor={(item,index) => index.toString()}
        onEndReachedThreshold={0}/>
    )
}
export default DaftarOperasional;
const styles = StyleSheet.create({
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
      container12:{
        marginTop:20,
        backgroundColor:'#7FFFD4'
      }
})