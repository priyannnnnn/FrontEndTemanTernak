import { useEffect, useState } from "react";
import axios from "axios";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { Item } from "react-native-paper/lib/typescript/src/components/Drawer/Drawer";

const Kandang =()=>{
    const [user, setUser] = useState([])

    const config={
          headers:{Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0XzI0QGdtYWlsLmNvbSIsImlhdCI6MTY4NjQ2MjE2NSwiZXhwIjoxNjg2NDYzNjA1fQ.zZdRLcc_6ul4aQu5eRy9i_hsF_afoSLGXPjKHxWfbEM"}`}
        }
        
    const getUser = () => {
        axios.get('https:randomuser.me/api/?page=3&result=10')
        .then(res => {
            console.log(res)
            setUser(res.data.results);
        })
    }

    const renderItem= ({item}) => {
        console.log("Item = ", item)
        return(
            <View>
                <Image source={{uri:item.picture.large}}/>
            <View>
                <Text style={styles.text}>{`${item.name.title} ${item.name.first} ${item.name.last}`}</Text>
            </View>
            </View>
        )
    }

    useEffect(() => {
        getUser();
    },[]);

    return(
        <FlatList
        data={user}
        renderItem={renderItem}/>
    );
};
export default Kandang;
const styles =StyleSheet.create({
    text:{
        fontSize:20,
        flex:1,
        marginTop:35,
        textAlign:'center',
        color:'#FF4500'
    },
})