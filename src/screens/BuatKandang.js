import { Text, StyleSheet, ScrollView, View } from "react-native";
import Button from "../components/Button";
import Header from "../components/Header";

import BackButton from "../components/BackButton";
import { theme } from '../core/theme'
import TextInput from "../components/TextInputKandang";


function BuatKandang({ route, navigation }) {

  return (
    <ScrollView style={style.ssss}>
      <View style={style.View}>
        <BackButton goBack={navigation.goBack} />
        <Header>Buat Kandang</Header>

        <Text style={style.Text}>Nama Kandang</Text>
        <TextInput label='Nama kandang' />

        <Text style={style.Text} >Kapasitas Kandang</Text>
        <TextInput label='Bisa input perkiraan' />

        <Text style={style.Text}>Total Biaya</Text>
        <TextInput label='Biaya pembuatan kandang' />

        <Text style={style.Text}>Tanggal Mulai Operasi</Text>
        <TextInput label='Masukkan tanggal operasi' />

        <Text style={style.Text}>Tipe Kandang</Text>
        <TextInput label='Puyuh/Ayam petelur' />

        <Button mode='contained' style={{ marginTop: 4 }}
          onPress={() =>
            navigation.reset({
              index: 0,
              routes: [{ name: 'ListKandang' }],
            })
          }
        >
          Simpan
        </Button>

        <Button mode='contained'
          onPress={() =>
            navigation.reset({
              index: 0,
              routes: [{ name: 'Dashboard' }],
            })
          }
        >
          Kembali
        </Button>
      </View>
    </ScrollView>
  )
}

export default BuatKandang;
const style = StyleSheet.create({
  Text: {
    textAlign: 'left',
    fontSize: 18,
    fontWeight: 'bold',
  },
  Button: {
    width: '100%',
    marginVertical: 10,
    paddingVertical: 2,
    fontWeight: 'bold',
    color: theme.colors.surface,
    backgroundColor: theme.colors.primary,
  },
  View: {
    flex: 1,
    width: '100%',
    backgroundColor: theme.colors.backgroundColor,
    padding: 20,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  style1: {
    textAlign: 'center',
  },
  ssss: {
    flex: 1,
    backgroundColor: theme.colors.backgroundColor,
    marginBottom: 1,
    marginTop: 30
  },
  input: {
    flex: 1
  }
})
