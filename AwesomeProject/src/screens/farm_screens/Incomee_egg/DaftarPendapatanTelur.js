import { FlatList, StyleSheet, Text, View, ActivityIndicator, TextInput, Alert, Image, SafeAreaView, TouchableOpacity } from "react-native";
import { useContext, useEffect, useState } from "react";
import { AxiosContext } from "../../../context/AxiosContext";
import Icon from 'react-native-vector-icons/MaterialIcons';
import BackButton from "../../../components/BackButton";
import listStyle from "../../../helpers/styles/list.style";

function DaftarPendapatanTelur({ route, navigation }) {
  const [incomeEgg, setIncomeEgg] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageCurrent, setPageCurrent] = useState(1);
  const [search, setSearch] = useState('');
  const axiosContext = useContext(AxiosContext);
  const { itemp } = route.params;

  const getData = () => {
    axiosContext.authAxios
      .get(`/api/v1/incomeEgg?orders=createdAt-desc&size=10&page=${pageCurrent}`)
      .then(res => {
        setLoading(false);
        setIncomeEgg(prevData => itemp ? res.data.content : [...prevData, ...res.data.content]);
      })
      .catch(console.error);
  };

  const newGetData = () => {
    setLoading(true);
    axiosContext.authAxios
      .get(`/api/v1/incomeEgg?orders=createdAt-desc&size=10&page=${pageCurrent}`)
      .then(res => {
        setLoading(false);
        setIncomeEgg(res.data.content);
      })
      .catch(e => {
        setLoading(false);
        Alert.alert("Error", "Silahkan Login Kembali?");
        console.error(e);
      });
  };

  const handleDelete = (id) => {
    axiosContext.authAxios.delete(`/api/v1/incomeEgg/${id}`)
      .then(() => {
        newGetData();
      })
      .catch(console.error);
  };

  const showConfirmDialog = (id) => {
    Alert.alert(
      "Apakah kamu yakin?",
      "Apakah Kamu Yakin Untuk Menghapus Data?",
      [
        { text: "Yes", onPress: () => handleDelete(id) },
        { text: "No" }
      ]
    );
  };

  const handleLoadMore = () => {
    if (loading) return;
    setPageCurrent(prevPage => prevPage + 1);
  };

  const handleSearch = (query) => {
    setSearch(query);
    const filteredData = incomeEgg.filter(({ date }) => date.toLowerCase().includes(query.toLowerCase()));
    setIncomeEgg(filteredData);
  };

  useEffect(() => {
    itemp ? newGetData() : getData();
  }, [itemp, pageCurrent]);

  const renderItem = ({ item }) => (
    <View style={listStyle.container} key={item.id}>
      <TouchableOpacity onPress={() => console.log('test_data')} style={listStyle.button}>
        <Text style={listStyle.buttonText}>Dibuat : {item.date}</Text>
      </TouchableOpacity>
      <View style={listStyle.employeeListContainer}>
        <Text style={listStyle.listItem}>Jumlah Telur : {item.quantity}</Text>
        <Text style={listStyle.listItem}>Tanggal : {item.date}</Text>
        <View style={listStyle.buttonContainer}>
          <TouchableOpacity onPress={() => showConfirmDialog(item.id)} style={{ ...listStyle.button, backgroundColor: "tomato", marginLeft: 10 }}>
            <Text style={listStyle.buttonText}>Hapus</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('UpdatePendapatanTelur', { id: item.id })} style={{ ...listStyle.button, backgroundColor: "tomato", marginLeft: 10 }}>
            <Text style={listStyle.buttonText}>Edit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={{ backgroundColor: '#F5EEE6' }}>
      <BackButton goBack={navigation.goBack} />
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={listStyle.input}>
          <Icon name="search" size={25} color="#1F2544" style={{ marginTop: 10 }} />
          <TextInput
            placeholder="search"
            placeholderTextColor="#000"
            style={{ fontSize: 15, color: '#1F2544' }}
            value={search}
            clearButtonMode="always"
            onChangeText={handleSearch}
            autoCorrect={false}
          />
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('PendapatanTelur')} style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10 }}>
          <Icon name="add" size={40} color="#1F2544" />
          <Text style={{ fontSize: 20, color: '#030637', marginLeft: 5 }}>Add</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={listStyle.loadingflatlist}>
          <ActivityIndicator size="large" />
          <Image source={require('../../assets/logo2.png')} style={{ width: 100, height: 100 }} />
        </View>
      ) : (
        <FlatList
          data={incomeEgg}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0}
          style={listStyle.container12}
        />
      )}
    </View>
  );
}

export default DaftarPendapatanTelur;
