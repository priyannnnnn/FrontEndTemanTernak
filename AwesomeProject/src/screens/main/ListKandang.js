import { ScrollView, StyleSheet, Text,TouchableOpacity, View } from "react-native";
import BackButton from "../../components/BackButton";
import Background from "../../components/Background";
import Header from "../../components/HeaderInputKandang";
import Button from "../../components/ButtonInputKandang";
import { useContext } from "react";
import { pembantu } from "../../helpers/pembantu";
import Expensesoutput from "../../helpers/ExpensesOutput";
import TextInput from "../../components/TextInputKandang";

function ListKandang({navigation}){
 
      return (
        <Background>
            <BackButton goBack={navigation.goBack}/>
            <ScrollView>
            <View style={{height:30, width:300, backgroundColor:'#D0F0C0',marginBottom:30}}>
            <Header>List Kandang</Header>
              <Text></Text>
            </View>         
                <Button
                 mode='contained' onPress={() => 
                  navigation.reset({index: 0,
                  routes: [{ name: 'Ternak' }],
                  })}>
                  Ternak</Button>
                <Button   mode='contained' onPress={() =>
                  navigation.reset({index: 0,
                  routes: [{ name: 'PendapatanTelur' }],
                  })}>
                  Pendapatan Telur</Button>
                <Button 
                mode='contained' onPress={() =>
                  navigation.reset({index: 0,
                  routes: [{ name: 'Penjualan' }],
                  })}>
                    Penjualan Telur
                </Button>
                {/* <Button 
                 mode='contained' onPress={() =>
                  navigation.reset({ index: 0,
                  routes: [{ name: 'PenggunaanPakan' }],
                  })}>
                    Penggunaan Pakan</Button> */}
                <Button 
                 mode='contained' onPress={() =>
                  navigation.reset({index: 0,
                  routes: [{ name: 'PersediaanPakan' }],
                  })}>
                    Persediaan Pakan</Button>
                <Button 
                  mode='contained' onPress={() =>
                  navigation.reset({index: 0,
                  routes: [{ name: 'BiayaOperasional' }],
                  })}>
                    Biaya Operasional</Button>
                {/* <Button 
                  mode='contained' onPress={() =>
                  navigation.reset({index: 0,
                  routes: [{ name: 'Pengurangan' }],
                  })}>
                    Pengurangan</Button> */}
                {/* <Button 
                 mode='contained' onPress={() =>
                  navigation.reset({
                    index: 0,
                    routes: [{ name: 'Report' }],
                  })
                }>Report</Button> */}
               <Button 
            mode='contained'
                onPress={() =>
                  navigation.reset({
                    index: 0,
                    routes: [{ name: 'Dashboard' }],
                  })
                }
                
            >Kembali</Button>
            </ScrollView>
        </Background>
      )
    
}
export default ListKandang;

const styles=StyleSheet.create({
  text:{
    fontSize:15,
    textAlign:'left'
  }
})