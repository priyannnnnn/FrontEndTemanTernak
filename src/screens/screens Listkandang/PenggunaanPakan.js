import { Text, TouchableOpacity, View, StyleSheet, ScrollView } from "react-native";
import BackButton from "../../components/BackButton";
import Button from "../../components/Button";
import Header from "../../components/HeaderInputKandang";
import TextInput from "../../components/TextInput";
import { theme } from "../../core/theme";

function PenggunaanPakan({navigation}) {
    return (
      <ScrollView style={style.ScrollView}>
        <View style={style.View}>
            <BackButton goBack={navigation.goBack}/>
            <Header>PENGGUNAAN PAKAN</Header>
            <Text style={style.Text}>Pilih Pakan</Text>
            <TextInput
            label='Masukkan Produk Pakan'/>
            <Text style={style.Text}>Jumlah perKG</Text>
            <TextInput
            label= 'Tanggal'/>
            <Text style={style.Text}>Type</Text>
            <TextInput
            label='Nama Produk Pakan'/>
            <Text style={style.Text}>Tanggal</Text>
            <TextInput
            label='Tanggal'/>

            <Button
            mode='contained'
            style={{ marginTop: 4 }}>
                Simpan
            </Button>
            <Button 
            mode='contained'
                onPress={() =>
                  navigation.reset({
                    index: 0,
                    routes: [{ name: 'ListKandang' }],
                  })
                }
            >Kembali</Button>
        </View>
      </ScrollView>
    )
}
export default PenggunaanPakan;
const style=StyleSheet.create({
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
      },
      ScrollView:{
        flex:1,
        backgroundColor:theme.colors.backgroundColor,
      }
})