import { Text, TouchableOpacity, View,StyleSheet, ScrollView} from "react-native";
import BackButton from "../../components/BackButton";
import Background from "../../components/Background";
import Button from "../../components/Button";
import TextInput from "../../components/TextInput";
import { theme } from "../../core/theme";
import Header from "../../components/HeaderInputKandang"

function BiayaOperasional({navigation}) {
    return (
      <ScrollView style={styles.ScrollView}>
         <View style={styles.View}>
            <BackButton goBack={navigation.goBack}/>
            <Header>Biaya Operasional</Header>
            <Text style={styles.Text}>Keterangan</Text>
            <TextInput
            label='Tuliskan Keterangan'/>
            <Text style={styles.Text}>Tanggal</Text>
            <TextInput
            label= 'Tanggal'/>
            <Text style={styles.Text}>Kategori</Text>
            <TextInput
            label='Lain-lain'/>

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
export default BiayaOperasional;
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