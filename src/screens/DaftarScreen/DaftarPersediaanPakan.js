import { ScrollView, View,Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native";
import { theme } from "../../core/theme";
import { GlobalStyles } from "../../components/style";
import Button from "../../components/Button";

function DaftarPersediaanPakan({navigation}){
    return(
        <ScrollView>
            <View style={styles.container}>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}> PersediaanPakan</Text>
            </TouchableOpacity>
            <Text style={styles.title}></Text>
            <View style={styles.employeeListContainer}>
                <Text style={styles.listItem}>Pakan :</Text>
                <Text style={styles.listItem}>Jumlah/KG :</Text>
                <Text style={styles.listItem}>Tanggal :</Text>
                <Text style={styles.listItem}>Harga :</Text>
            </View> 
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