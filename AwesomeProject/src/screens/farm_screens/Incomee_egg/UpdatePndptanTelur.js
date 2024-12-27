import { useContext, useEffect, useState } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import TextInput from "../../../components/TextInput";
import { theme } from "../../../core/theme";
import Button from "../../../components/Button";
import DateTimePicker from "@react-native-community/datetimepicker";
import { AxiosContext } from "../../../context/AxiosContext";
import Header from "../../../components/HeaderInputKandang";
import kandangStyle from "../../../helpers/styles/kandang.style";

function UpdatePendapatanTelur({ navigation, route }) {
  const { id } = route.params;
  const axiosContext = useContext(AxiosContext);

  const [incomeEgg, setIncomeEgg] = useState({
    quantity: { value: "", error: "" },
    date: { value: "", error: "" },
  });

  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState("date");

  useEffect(() => {
    fetchData(id);
  }, [id]);

  const fetchData = (id) => {
    axiosContext.authAxios
      .get(`/api/v1/incomeEgg/${id}`)
      .then((res) => {
        const data = res.data;
        setIncomeEgg({
          quantity: { value: `${data.quantity}`, error: "" },
          date: { value: `${data.date}`, error: "" },
        });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const handleUpdate = () => {
    const data = {
      quantity: parseInt(incomeEgg.quantity.value),
      date: incomeEgg.date.value,
    };

    axiosContext.authAxios
      .put(`/api/v1/incomeEgg/${id}`, data)
      .then((res) => {
        navigation.navigate("DaftarPendapatanTelur", { itemp: res.data });
      })
      .catch((error) => {
        console.error("Error updating data:", error);
      });
  };

  const handleDateChange = (event, selectedDate) => {
    if (event.type === "set") {
      const currentDate = selectedDate || date;
      setShow(false);
      setDate(currentDate);

      setIncomeEgg((prev) => ({
        ...prev,
        date: { value: currentDate.toISOString().split("T")[0], error: "" },
      }));
    } else {
      setShow(false);
    }
  };

  const showDatePicker = () => setShow(true);

  return (
    <ScrollView style={kandangStyle.ScrollView}>
      <View style={styles.container}>
        <Header>Update Pendapatan Telur</Header>

        <Text style={kandangStyle.Text}>Jumlah Telur</Text>
        <TextInput
          value={incomeEgg.quantity.value}
          onChangeText={(text) =>
            setIncomeEgg((prev) => ({ ...prev, quantity: { value: text, error: "" } }))
          }
          keyboardType="numeric"
        />

        <Text style={kandangStyle.Text}>Tanggal</Text>
        <TextInput
          value={incomeEgg.date.value}
          onFocus={showDatePicker}
          editable={false} // Date is only editable via DatePicker
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

        <Button mode="contained" style={styles.button} onPress={handleUpdate}>
          Simpan
        </Button>
        <Button
          mode="contained"
          onPress={() =>
            navigation.reset({
              index: 0,
              routes: [{ name: "DaftarPendapatanTelur" }],
            })
          }
        >
          Kembali
        </Button>
      </View>
    </ScrollView>
  );
}

export default UpdatePendapatanTelur;

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
});
