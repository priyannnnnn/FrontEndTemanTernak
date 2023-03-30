import { StyleSheet, Text, View } from "react-native";
import Button from "../../components/Button";
import { GlobalStyles } from "../../components/style";
import { theme } from "../../core/theme";
import {Ionicons} from '@expo/vector-icons';

function DaftarTelur({navigation}){
    return(
        <View style={styles.view}>
        <Text style={styles.text}>trt</Text>
        <View style={styles.view1}>
            <Text style={styles.text}>bchchd</Text>
        </View>
        <Ionicons name="trash"/>
        <Button 
        mode='contained'
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [{ name: 'Dashboard' }],
          })
        }>Kembali</Button>
        </View>
    )
}
export default DaftarTelur;
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

    }
})