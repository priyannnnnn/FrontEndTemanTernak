import { Text, TouchableOpacity,StyleSheet, View, ScrollView } from "react-native";
import BackButton from "../../components/BackButton";
import Background from "../../components/Background";
import Button from "../../components/Button";
import TextInput from "../../components/TextInput";
import { theme } from "../../core/theme";
import Header from "../../components/HeaderInputKandang"

function Pengurangan({navigation}) {
    return (
      <ScrollView style={styles.ScrollView}>
        <View style={styles.View}>
            <BackButton goBack={navigation.goBack}/>
            <Header>PENGURANGAN TERNAK</Header>
            <Text style={styles.Text}>Jumlah Ternak</Text>
            <TextInput
            label='Jumlah Ternak'/>
            <Text style={styles.Text}>Tanggal</Text>
            <TextInput
            label= 'Masukkan Tanggal'/>
            <Text style={styles.Text}>Umur</Text>
            <TextInput
            label='Bisa Perkiraan'/>
            <Text style={styles.Text}>Alasa</Text>
            <TextInput
            label='Alasan Afkir'/>
            <Text style={styles.Text}>Harga Jual</Text>
            <TextInput
            label='Masukkan Harga Jual'/>
            <Text style={styles.Text}>Keterangan</Text>
            <TextInput
            label='Masukkan Keterangan'/>

            <Button
            mode='contained'
            style={{ marginTop: 1 }}>
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
export default Pengurangan;
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
  }
})