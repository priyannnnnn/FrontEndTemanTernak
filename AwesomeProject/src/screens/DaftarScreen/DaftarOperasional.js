import { useContext, useEffect, useState } from "react";
import { AxiosContext } from "../../context/AxiosContext";
import { log } from "react-native-reanimated";
import { FlatList, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { theme } from "../../core/theme";
import { GlobalStyles } from "../../components/style";
import Button from "../../components/Button";
import filter from "lodash.filter"

function DaftarOperasional({navigation}){
    const [Operasional, setOperasional] = useState([])
    const [Loading, setLoading] = useState()
    const [pageCurrent, setpageCurrent]= useState(1);
    const axiosContext = useContext(AxiosContext);
    const [search, setsearch]= useState('');
    const [totalpage, settotalpage]= useState(10);

    const getData = () => {
        axiosContext.authAxios.get(`/api/v1/operatingCosh`)
        .then(res => {
            console.log("Get Data = ", res.data)
            setOperasional(Operasional.concat(res.data.content))
            console.log("data",res.data)
        })
        .catch((e) => {
            console.error(e)
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
            console.error(error)
        })
    
      }

    useEffect(() => {
        console.log("Get Data Useeffect = ",pageCurrent)
        setLoading(true)
        getData()
    },[pageCurrent])

     handleLoadMore=()=>{
      console.log("Page current =",pageCurrent)
      console.log("Total page",totalpage)
       if (pageCurrent < totalpage){
         console.log("HandleLoadMore 1 = ",totalpage)
         setpageCurrent(pageCurrent+1)
         //getData()
         setLoading(false)
       }else {
         console.log("HandleLoadMore 2 = ",totalpage)
         setpageCurrent(pageCurrent+1)
         //getData()
         setLoading(false)
       }
    }
    const handleSearch= (item) =>{
      setsearch(item);
      const data =[];
      const formattedQuery = item.toLowerCase();
      const filterData= filter(Operasional, (item)=> {
        return contains(item , formattedQuery)
      })
      console.log("Data = ",data)
      console.log("Format Query =",formattedQuery)
      console.log("Filter Data = ",filterData)
      setOperasional(filterData)
      if (formattedQuery === 0){
        return getData
      }
    };
    const contains= ({date, description, amount }, item) => {
      if( date.includes(item) || description.includes(item) 
          || amount.toString().includes(item)){
        return true;
      }
      return false;
    }
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
      <View>
        <TextInput style={styles.input} placeholder="search" 
          value={Operasional} 
          clearButtonMode="always"
          onChangeText={handleSearch}
          autoCorrect={false}/>
        <FlatList
        style={styles.container12}
        data={Operasional}
        renderItem={renderItem}
        keyExtractor={(item,index) => index.toString()}
        onEndReachedThreshold={0}
        onEndReached={this.handleLoadMore}/>
        </View>
    )
}
    // const handleScroll = (event) => {
    //   const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    //   const isEndReached = layoutMeasurement.height + contentOffset.y >= contentSize.height;
    //   if (isEndReached) {
    //     setpageCurrent(pageCurrent + 1);
    //   }
    // };
    // return(
    //   <View style={styles.view}>
    //     <ScrollView 
    //     //horizontal={false}
    //    disableIntervalMomentum={true}
    //     onScroll={handleScroll} 
    //     >
    //       <View style={styles.container}>
    //         <TouchableOpacity>
    //           <Text style={styles.title}DaftarOperasional></Text>
    //         </TouchableOpacity>
    //         <Text style={styles.title}> DaftarOperasional</Text>
    //         {Operasional.map((data, index) => 
    //         <View style={styles.employeeListContainer}>
    //           <Text style={{ ...styles.listItem, color: "tomato" }}>{data.date}</Text>
    //           <Text style={styles.listItem}>Deskripsi : {data.description}</Text>
    //           <Text style={styles.listItem}>Jumlah telur: {data.amount}</Text>
    //           <Text style={styles.listItem}>Tanggal: {data.date}</Text>
    //           <View style={styles.buttonContainer}>
    //             <TouchableOpacity
    //               onPress={() =>{}}
    //               style={{...styles.button, marginVertical:0, marginLeft:10, backgroundColor:"tomato"}} >
    //               <Text style={styles.buttonText}>Delete</Text>
    //             </TouchableOpacity>
    //             <TouchableOpacity
    //               onPress={() => navigation.navigate()}
    //               style={{...styles.button, marginVertical:0, marginLeft:10, backgroundColor:"tomato"}}>
    //             <Text style={styles.buttonText}>Update</Text>
    //             </TouchableOpacity>
    //           </View>
    //         </View>)}
    //       </View>
    //       {pageCurrent !== 1 && <Text style={styles.text}>Loading ..</Text>}
    //     </ScrollView>
    //     <Button mode="contained"
    //     onPress={() => navigation.reset({index: 0,
    //     routes: [{ name: 'ListKandang' }],})}>Kembali</Button>
    //   </View>
    // )

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
      },
      input: {
        height:45,
        borderWidth:1,
        paddingLeft:20,
        margin:5,
        borderColor:'#009688',
        backgroundColor:'blue',
      }
})