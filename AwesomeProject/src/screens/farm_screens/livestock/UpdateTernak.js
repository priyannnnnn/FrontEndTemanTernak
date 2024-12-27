import { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { AxiosContext } from "../../../context/AxiosContext";
import Button from "../../../components/Button";
import TextInput from "../../../components/TextInput";
import DateTimePicker from "@react-native-community/datetimepicker";
import Header from "../../../components/HeaderInputKandang";
import kandangStyle from "../../../helpers/styles/kandang.style";
import { theme } from "../../../core/theme";

function UpdateTernak({ navigation, route }) {
  const { id } = route.params;
  const axiosContext = useContext(AxiosContext);

  const [livestock, setLiveStock] = useState({
    age: { value: "", error: "" },
    quantity: { value: "", error: "" },
    date: { value: "", error: "" },
    amount: { value: "", error: "" },
    type: { value: "", error: "" },
    note: { value: "", error: "" },
  });

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  useEffect(() => {
    getData(id);
  }, [id]);

  const getData = (id) => {
    axiosContext.authAxios
      .get(`/api/v1/livestock/${id}`)
      .then((res) => {
        const data = res.data;
        setLiveStock({
          ...livestock,
          id: data.id,
          age: { value: `${data.age}`, error: "" },
          quantity: { value: `${data.quantity}`, error: "" },
          date: { value: `${data.date}`, error: "" },
          amount: { value: `${data.amount}`, error: "" },
          type: { value: `${data.type}`, error: "" },
          note: { value: `${data.note}`, error: "" },
        });
      })
      .catch(console.error);
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);

    setLiveStock((prev) => ({
      ...prev,
      date: { value: currentDate.toISOString().split("T")[0], error: "" },
    }));
  };

  const showDatepicker = () => setShow(true);

  const updateData = () => {
    const Data = {
      age: livestock?.age?.value,
      quantity: livestock?.quantity?.value,
      date: livestock?.date?.value,
      amount: livestock?.amount?.value,
      type: livestock?.type?.value,
      note: livestock?.note?.value,
    };

    axiosContext.authAxios
      .put(`/api/v1/livestock/${id}`, Data)
      .then((res) => {
        navigation.navigate("DaftarTernak", { item: res.data });
      })
      .catch(console.error);
  };

  return (
    <ScrollView style={kandangStyle.ScrollView}>
      <View style={styles.container}>
        <Header>Update Ternak</Header>

        <Text style={kandangStyle.Text}>Umur</Text>
        <TextInput
          value={livestock?.age?.value}
          onChangeText={(text) =>
            setLiveStock({ ...livestock, age: { value: text, error: "" } })
          }
          label="Masukkan Umur"
          keyboardType="numeric"
        />

        <Text style={kandangStyle.Text}>Total</Text>
        <TextInput
          value={livestock?.quantity?.value}
          onChangeText={(text) =>
            setLiveStock({ ...livestock, quantity: { value: text, error: "" } })
          }
          label="Total Ayam"
          keyboardType="numeric"
        />

        <Text style={kandangStyle.Text}>Tanggal</Text>
        <TextInput
          value={livestock?.date?.value}
          onChangeText={(text) =>
            setLiveStock({ ...livestock, date: { value: text, error: "" } })
          }
          onFocus={showDatepicker}
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

        <Text style={kandangStyle.Text}>Harga Total</Text>
        <TextInput
          value={livestock?.amount?.value}
          onChangeText={(text) =>
            setLiveStock({ ...livestock, amount: { value: text, error: "" } })
          }
          label="Total harga ayam"
          keyboardType="numeric"
        />

        <Text style={kandangStyle.Text}>Type</Text>
        <TextInput
          value={livestock?.type?.value}
          onChangeText={(text) =>
            setLiveStock({ ...livestock, type: { value: text, error: "" } })
          }
          label="Jenis Ayam"
        />

        <Text style={kandangStyle.Text}>Catatan</Text>
        <TextInput
          value={livestock?.note?.value}
          onChangeText={(text) =>
            setLiveStock({ ...livestock, note: { value: text, error: "" } })
          }
          label="Masukkan Catatan"
        />

        <Button mode="contained" onPress={updateData}>
          Simpan
        </Button>
        <Button
          mode="contained"
          onPress={() =>
            navigation.reset({
              index: 0,
              routes: [{ name: "DaftarTernak" }],
            })
          }
        >
          Kembali
        </Button>
      </View>
    </ScrollView>
  );
}

export default UpdateTernak;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: theme.colors.screen,
    padding: 20,
    justifyContent: "center",
    marginTop: 20,
  },
});
