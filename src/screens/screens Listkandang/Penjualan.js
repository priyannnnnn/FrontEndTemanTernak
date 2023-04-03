import { theme } from "../../core/theme"; 
import TextInput from "../../components/TextInputKandang";
import { ScrollView, StyleSheet, View,Text } from "react-native";
import BackButton from "../../components/BackButton";
import Button from "../../components/Button";
import Header from "../../components/HeaderInputKandang";

function Penjualan({navigation}){
    return(
        <ScrollView>
        <View style={styles.View}>
        <BackButton goBack={navigation.goBack}/>
            <Header>Penjualan Telur</Header>
            <Text style={styles.Text}>Jumlah Telur</Text>
            <TextInput
            label='Masukkan Jumlah Telur'/>
            <Text style={styles.Text}>Tanggal</Text>
            <TextInput
            label= 'Tanggal'/>
            <Text style={styles.Text}>Total Pendapatan Telur</Text>
            <TextInput
            label='Pendapatan Total'/>
            
        </View> 
        </ScrollView>
    )
}
export default Penjualan;
const styles=StyleSheet.create({
    View:{
        flex: 1,
        width: '100%',
        backgroundColor: theme.colors.backgroundColor,
        padding: 20,
        alignSelf: 'center',
        justifyContent: 'center',
    },
    Text:{
        textAlign:'left',
        fontSize:18,
        fontWeight: 'bold',
    }
})