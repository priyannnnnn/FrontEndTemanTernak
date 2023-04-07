import { ScrollView, Text, StyleSheet, View } from "react-native";
import BackButton from "../../components/BackButton";
import Background from "../../components/Background";
import Button from "../../components/Button";
import Header from "../../components/HeaderInputKandang";
//import TextInput from "../../components/TextInput";
import { theme } from "../../core/theme";
import TextInput from "../../components/TextInputKandang";
import { useState } from "react";
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from "moment";

function Telur({ navigation }) {

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    if (Platform.OS === 'android') {
      setShow(true);
    }
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  return (
    <ScrollView style={styles.ScrollView}>
      <View style={styles.View}>
        <BackButton goBack={navigation.goBack} />
        <Header>Telur</Header>
        <Text style={styles.Text}>Jumlah Telur</Text>
        <TextInput label='Masukkan Jumlah Telur' keyboardType="numeric" />
        <Text style={styles.Text}>Tanggal</Text>
        <TextInput value={`${moment(date).format('YYYY-MM-DD')}`} onBlur={showDatepicker} onFocus={showDatepicker} label='Tanggal' />
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            onChange={onChange}
          />
        )}

        <Button
          mode='contained'
          onPress={() =>
            navigation.reset({
              index: 0,
              routes: [{ name: 'DaftarTelur' }],
            })
          }
        >
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
export default Telur;
const styles = StyleSheet.create({
  View: {
    flex: 1,
    width: '100%',
    backgroundColor: theme.colors.backgroundColor,
    padding: 20,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  Text: {
    textAlign: 'left',
    fontSize: 18,
    fontWeight: 'bold',
  },
  ScrollView: {
    flex: 1,
    backgroundColor: theme.colors.backgroundColor,
    marginTop: 40
  }

})