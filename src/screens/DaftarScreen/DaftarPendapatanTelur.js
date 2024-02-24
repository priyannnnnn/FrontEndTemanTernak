import { StyleSheet, Text, View } from "react-native";
import Button from "../../components/Button";
import { GlobalStyles } from "../../components/style";
import { theme } from "../../core/theme";
import {Ionicons} from '@expo/vector-icons';
import { useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { TouchableOpacity } from "react-native";
// import MaterialComunityIcons from 'react-native-vector-icons/MaterialComunityIcons'

function DaftarPendapatanTelur({navigation}){

    const [ IncomeEgg, setIncomeEgg ] = useState([])
    const [ loading, setLoading ] = useState(false)
    const [ errorMessage, setErrorMessage ] = useState('')

    const toggleAddEmployeeModal = () => {
        console.log('test_data');
    }

    const getData = () => {
        setLoading(true)
        fetch('http://139.162.6.202:8000/api/v1/incomeEgg', {
          method: "GET"
        })
          .then(res => res.json())
          .then(res => {
            console.log(res);
            setLoading(false)
            setErrorMessage('')
            setIncomeEgg(res.content)
          })
          .catch(() => {
            setLoading(false)
            setErrorMessage("Network Error. Please try again.")
          })
      }

      const DeleteData=(id)=>{
        console.log(id)
        fetch ('http://139.162.6.202:8000/api/v1/incomeEgg/'+id,{method:"DELETE"})
        .then (res => res.json())
        .then(res=> {
          console.log(res)
          getData()
        })
        .catch((errror)=>{
          console.log(errror)
          }
        )}

      useEffect(() => {
        getData()
      }, [])

    return(
        <ScrollView>

            <View style={styles.container}>
            <TouchableOpacity
                onPress={toggleAddEmployeeModal}
                style={styles.button}>
                <Text style={styles.buttonText}>Tambah PendapatanTelur</Text>
            </TouchableOpacity>

            <Text style={styles.title}>Daftar PendapatanTelur</Text>
            {IncomeEgg.map((data, index) => <View
                style={styles.employeeListContainer}
                key={data.id}>
                <Text style={{ ...styles.listItem, color: "tomato" }}>{data.date}</Text>
                <Text style={styles.name}>{data.employee_name}</Text>
                <Text style={styles.listItem}>Jumlah telur: {data.quantity}</Text>
                <Text style={styles.listItem}>Tanggal: {data.quantity}</Text>
              
                <View style={styles.buttonContainer}>
                  {/* <TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnLeft]} onPress={onEdit}>
                    <MaterialComunityIcons name="close-circle-outline" size={25} color="#fff" />
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnLeft]} onPress={onDelete}>
                    <MaterialComunityIcons name="close-can-outline" size={25} color="#fff" />
                  </TouchableOpacity> */}
                <TouchableOpacity
                    onPress={() => navigation.navigate ('UpdatePendapatanTelur',{id:data.id})
                        
                    } onLongPress={()=> navigation.navigate('UpdatePendapatanTelur',{id:data.id})}
                    style={{ ...styles.button, marginVertical: 0 }}>
                    <Text style={styles.buttonText}>Edit</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {DeleteData(data.id)
                    
                    }}
                    style={{ ...styles.button, marginVertical: 0, marginLeft: 10, backgroundColor: "tomato" }}>
                    <Text style={styles.buttonText}>Hapus</Text>
                </TouchableOpacity>
                </View>
            </View>)}

            {loading ? <Text
                style={styles.message}>Please Wait...</Text> : errorMessage ? <Text
                style={styles.message}>{errorMessage}</Text> : null}

            <Button 
            mode='contained'
            onPress={() =>
            navigation.reset({
                index: 0,
                routes: [{ name: 'Dashboard' }],
            })
            }>Kembali</Button>
        </View>

      </ScrollView>
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
        marginBottom: 10
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