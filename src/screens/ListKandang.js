import { Text,TouchableOpacity } from "react-native";
import BackButton from "../components/BackButton";
import Background from "../components/Background";
import Header from "../components/HeaderInputKandang";
import Button from "../components/ButtonInputKandang";

//import Ternak from "./Ternak";


function ListKandang({navigation}){
    return (
        <Background>
            <BackButton goBack={navigation.goBack}/>
            <Header>List Kandang</Header>
               
                <Button
                 mode='contained'
                onPress={() =>
                  navigation.reset({
                    index: 0,
                    routes: [{ name: 'Ternak' }],
                  })
                }
               >
                TERNAK</Button>
                <Button   mode='contained'
                onPress={() =>
                  navigation.reset({
                    index: 0,
                    routes: [{ name: 'Telur' }],
                  })
                }
                >TELUR</Button>
                <Button 
                 mode='contained'
                onPress={() =>
                  navigation.reset({
                    index: 0,
                    routes: [{ name: 'PenggunaanPakan' }],
                  })
                }
                >Penggunaan Pakan</Button>
                <Button 
                 mode='contained' onPress={() =>
                  navigation.reset({
                    index: 0,
                    routes: [{ name: 'PersediaanPakan' }],
                  })
                }>Persediaan Pakan</Button>
                <Button 
                 mode='contained'
                 onPress={() =>
                  navigation.reset({
                    index: 0,
                    routes: [{ name: 'BiayaOperasional' }],
                  })
                }>Biaya Operasional</Button>
                <Button 
                 mode='contained' onPress={() =>
                  navigation.reset({
                    index: 0,
                    routes: [{ name: 'Pengurangan' }],
                  })
                }>Pengurangan</Button>
                <Button 
                 mode='contained' onPress={() =>
                  navigation.reset({
                    index: 0,
                    routes: [{ name: 'Report' }],
                  })
                }>Report</Button>
               <Button 
            mode='contained'
                onPress={() =>
                  navigation.reset({
                    index: 0,
                    routes: [{ name: 'BuatKandang' }],
                  })
                }
            >Kembali</Button>
            
        </Background>
    )
}
export default ListKandang;