import { Text, TouchableOpacity, View , StyleSheet, ScrollView} from "react-native";
import BackButton from "../../components/BackButton";
import Background from "../../components/Background";
import Button from "../../components/Button";

import Header from "../../components/HeaderInputKandang";
import TextInput from "../../components/TextInput";
import { theme } from "../../core/theme";

function PersediaanPakan({navigation}) {
    return (
      <ScrollView style={styles.ScrollView}>
        <View style={styles.View}>
            <BackButton goBack={navigation.goBack}/>
            <Header>PERSEDIAAN PAKAN</Header>
            <Text style={styles.Text}>Jumlah per KG</Text>
            <TextInput
            label='Masukkan Per KG'/>
            <Text style={styles.Text}>Type</Text>
            <TextInput
            label='Nama Produk Pakan'/>
            <Text style={styles.Text}>Harga Total</Text>
            <TextInput
            label='Harga keseluruhan'/>
            <Text style={styles.Text}>Tanggal</Text>
            <TextInput
            label= 'Tanggal'/>

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
                    routes: [{ name: 'DaftarPersediaanPakan' }],
                  })
                }
            >Kembali</Button>
        </View>
       </ScrollView>
    )
}
export default PersediaanPakan;
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
  },
  ScrollView:{
    flex:1,
    backgroundColor:theme.colors.backgroundColor,
    marginTop:35
  }
}) 