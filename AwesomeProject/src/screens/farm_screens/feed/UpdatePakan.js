import { StyleSheet, View, Text, ScrollView } from "react-native";
import { useContext, useEffect, useState } from "react";
import { AxiosContext } from "../../../context/AxiosContext";
import { theme } from "../../../core/theme";
import Button from "../../../components/Button";
import TextInput from "../../../components/TextInput";
import DateTimePicker from "@react-native-community/datetimepicker";
import Header from "../../../components/HeaderInputKandang";
import kandangStyle from "../../../helpers/styles/kandang.style";
import RNPickerSelect from 'react-native-picker-select';

function UpdatePakan({ navigation, route }) {
  const { id } = route.params;
  const axiosContext = useContext(AxiosContext);

  const [feed, setFeed] = useState({
    quantity: { value: "", error: "" },
    type: { value: "", error: "" },
    amount: { value: "", error: "" },
    date: { value: "", error: "" },
  });

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchData(id);
  }, [id]);

  const fetchData = (id) => {
    setLoading(true);
    axiosContext.authAxios
      .get(`/api/v1/feed/${id}`)
      .then((res) => {
        const data = res.data;
        setFeed({
          quantity: { value: `${data.quantity}`, error: "" },
          type: { value: `${data.type}`, error: "" },
          amount: { value: `${data.amount}`, error: "" },
          date: { value: `${data.date}`, error: "" },
        });
        setLoading(false);
      })
      .catch((error) => {
        setErrorMessage("Error fetching data.");
        console.error(error);
        setLoading(false);
      });
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);

    setFeed((prev) => ({
      ...prev,
      date: { value: currentDate.toISOString().split("T")[0], error: "" },
    }));
  };

  const showDatepicker = () => setShow(true);

  const updateData = () => {
    const data = {
      amount: parseInt(feed.amount.value),
      type: feed.type.value,
      quantity: parseInt(feed.quantity.value),
      date: feed.date.value,
    };

    axiosContext.authAxios
      .put(`/api/v1/feed/${id}`, data)
      .then((res) => {
        navigation.navigate("DaftarPersediaanPakan", { item: res.data });
      })
      .catch((error) => {
        console.error("Update failed:", error);
      });
  };

  return (
    <ScrollView style={kandangStyle.ScrollView}>
      <View style={styles.container}>
        <Header>Update Persediaan Pakan</Header>

        <Text style={kandangStyle.Text}>Jumlah (Kg)</Text>
        <TextInput
          value={feed.quantity.value}
          onChangeText={(text) =>
            setFeed({ ...feed, quantity: { value: text, error: "" } })
          }
          keyboardType="numeric"
        />

        <Text style={kandangStyle.Text}>Tipe Pakan</Text>
        <RNPickerSelect
            onValueChange={(text) => {setFeed({...feed, type:{value: text, error:''}})}}
            items={[
                { label: 'PEDAGING', value: 'PEDAGING' },
                { label: 'PETELUR', value: 'PETELUR' },
            ]}
            value={feed.type.value}
            style={{
                inputIOS: styles.input,
                inputAndroid: styles.input,
                placeholder: styles.placeholder,
            }}
            placeholder={{ label: 'Jenis Pakan ', value: null, color: 'gray' }}
            useNativeAndroidPickerStyle={true}
        />

        <Text style={kandangStyle.Text}>Total Harga</Text>
        <TextInput
          value={feed.amount.value}
          onChangeText={(text) =>
            setFeed({ ...feed, amount: { value: text, error: "" } })
          }
          keyboardType="numeric"
        />

        <Text style={kandangStyle.Text}>Tanggal</Text>
        <TextInput
          value={feed.date.value}
          onFocus={showDatepicker}
          editable={false}
        />
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour
            onChange={handleDateChange}
          />
        )}

        <Button mode="contained" style={styles.button} onPress={updateData}>
          Simpan
        </Button>
        <Button
          mode="contained"
          onPress={() =>
            navigation.reset({
              index: 0,
              routes: [{ name: "DaftarPersediaanPakan" }],
            })
          }
        >
          Kembali
        </Button>
      </View>
    </ScrollView>
  );
}

export default UpdatePakan;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: theme.colors.screen,
    padding: 20,
    justifyContent: "center",
    marginTop: 20,
  },
  button: {
    marginTop: 4,
  },
  placeholder: {
    color: 'gray',
    fontSize: 12,
  },
  input:{
    width: '100%',
    marginVertical: 17,
    backgroundColor:'white'
  }
});
