import { Text, StyleSheet, View, ScrollView} from "react-native";
import BackButton from "../../components/BackButton";
import Button from "../../components/Button";
import TextInput from "../../components/TextInput";
import { theme } from "../../core/theme";
import Header from "../../components/HeaderInputKandang";

function Ternak({navigation}) {
    return (
      <ScrollView style={style.ScrollView}>
       <View style={style.View}>
            <BackButton goBack={navigation.goBack}/>
            <Header>ISI KANDANG</Header>
            <Text style={style.Text} >Umur</Text>
            <TextInput
            label='Masukkan Umur'/>
            <Text style={style.Text} >Total</Text>
            <TextInput
            label= 'Total Ayam'/>
            <Text style={style.Text} >Tanggal</Text>
            <TextInput
            label='Masukkan Tanggal'/>
            <Text style={style.Text} >Harga</Text>
            <TextInput
            label='Harga'/>

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
export default Ternak;
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
    fontSize:20,
    fontWeight: 'bold',
  },
  ScrollView:{
    flex:1,
    width:'100%',
    paddingBottom:1,
    backgroundColor:theme.colors.backgroundColor,
  }
})