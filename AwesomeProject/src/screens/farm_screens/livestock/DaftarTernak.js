import { 
  ActivityIndicator, 
  Alert, 
  FlatList, 
  Image, 
  SafeAreaView, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  View 
} from "react-native";
import Button from "../../../components/Button";
import { theme } from "../../../core/theme";
import { Ionicons } from '@expo/vector-icons';
import { useContext, useEffect, useState } from "react";
import filter from "lodash.filter";
import { AxiosContext } from "../../../context/AxiosContext";
import Icon from 'react-native-vector-icons/MaterialIcons';
import listStyle from "../../../helpers/styles/list.style";

function DaftarTernak({ route, navigation }) {
  const axiosContext = useContext(AxiosContext);
  const [employee, setEmployee] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [pageCurrent, setPageCurrent] = useState(1);
  const [totalPage, setTotalPage] = useState(10);
  const [search, setSearch] = useState('');
  const [hasMoreData, setHasMoreData] = useState(true);
  const [isDataFinished, setIsDataFinished] = useState(false);
  
  const { itemp } = route.params;

  const getData = () => {
    axiosContext.authAxios.get(`/api/v1/livestock?orders=createdAt-desc&size=${totalPage}&page=${pageCurrent}`)
      .then(res => {
        setLoading(false);
        if (itemp !== undefined) {
          setEmployee(res.data.content);
        } else {
          setEmployee(prevData => [...prevData, ...res.data.content]);
        }
      })
      .catch((e) => {
        setLoading(false);
        setErrorMessage("Network Error. Please try again.");
      });
  };

  const newGetData = () => {
    axiosContext.authAxios.get(`/api/v1/livestock?orders=createdAt-desc`)
      .then(res => {
        setLoading(false);
        setEmployee(res.data.content);
      })
      .catch((e) => {
        setLoading(false);
        setErrorMessage("Network Error. Please try again.");
      });
  };

  const deleteData = (id) => {
    setLoading(true);
    axiosContext.authAxios.delete(`/api/v1/livestock/${id}`)
      .then(() => {
        newGetData();
      })
      .catch((e) => {
        setLoading(false);
      });
  };

  const showConfirmDialog = (id) => {
    return Alert.alert(
      "Apakah kamu yakin?",
      "Apakah Kamu Yakin Untuk Menghapus Data?",
      [
        { text: "Yes", onPress: () => deleteData(id) },
        { text: "No" },
      ]
    );
  };

  const formatAmountWithDots = (value) => {
    if (!value) return '0';
    const onlyNumbers = value.toString().replace(/[^0-9]/g, '');
    return onlyNumbers.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  const handleSearch = (text) => {
    setSearch(text);
    const formattedQuery = text.toLowerCase();
    const filteredData = filter(employee, (item) => contains(item, formattedQuery));
    setEmployee(filteredData);
  };

  const contains = (item, query) => {
    return item.age.toString().includes(query) ||
           item.note.toLowerCase().includes(query) ||
           item.date.toLowerCase().includes(query) ||
           item.quantity.toString().includes(query) ||
           item.amount.toString().includes(query) ||
           item.type.toLowerCase().includes(query);
  };

  const renderItem = ({ item }) => {
    return (
      <View style={listStyle.container} key={item.id}>
        <TouchableOpacity style={listStyle.button}>
          <Text style={listStyle.buttonText}>{item.date}</Text>
        </TouchableOpacity>
        <View style={listStyle.employeeListContainer}>
          <Text style={listStyle.listItem}>Umur: {item.age}</Text>
          <Text style={listStyle.listItem}>Jumlah: {formatAmountWithDots(item.quantity)}</Text>
          <Text style={listStyle.listItem}>Harga: {formatAmountWithDots(item.amount)}</Text>
          <Text style={listStyle.listItem}>Jenis: {item.type}</Text>
          <Text style={listStyle.listItem}>Catatan: {item.note}</Text>
          <Text style={listStyle.listItem}>Tanggal: {item.date}</Text>
          <View style={listStyle.buttonContainer}>
            <TouchableOpacity
              onPress={() => showConfirmDialog(item.id)}
              style={{ ...listStyle.button, marginVertical: 0, marginLeft: 10, backgroundColor: "tomato" }}>
              <Text style={listStyle.buttonText}>Hapus</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('UpdateTernak', { id: item.id })}
              style={{ ...listStyle.button, marginVertical: 0, marginLeft: 10, backgroundColor: "tomato" }}>
              <Text style={listStyle.buttonText}>Edit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  const renderFooter = () => {
    if (isDataFinished) {
      return (
        <View style={listStyle.footerContainer}>
          <Text style={listStyle.footerText}>Data sudah habis</Text>
        </View>
      );
    }
    return null;
  };

  const handleLoadMore = async () => {
    if (loading) return;
    setIsDataFinished(true);
    setPageCurrent(prevPage => prevPage + 1);
  };

  useEffect(() => {
    if (itemp !== undefined) {
      newGetData();
    } else {
      getData();
    }
  }, [itemp, pageCurrent]);

  return (
    <SafeAreaView style={listStyle.safearea}>
      {loading ? (
        <View style={listStyle.loadingflatlist}>
          <ActivityIndicator size="large" />
          <Image source={require('../../assets/logo2.png')} style={{ width: 100, height: 100 }} />
        </View>
      ) : (
        <View style={{ backgroundColor: '#F5EEE6' }}>
          <View style={{ flexDirection: 'row' }}>
            <View style={listStyle.input}>
              <Icon name="search" size={25} color="#1F2544" style={{ marginTop: 10 }} />
              <TextInput
                style={{ fontSize: 15, color: '#1F2544' }}
                placeholder="Search"
                placeholderTextColor="#000"
                value={search}
                clearButtonMode="always"
                onChangeText={handleSearch}
                autoCorrect={false}
              />
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate('Ternak')}
              style={{ flexDirection: 'row', marginVertical: 0, marginLeft: 0 }}>
              <Icon name="add" size={40} color="#1F2544" style={{ marginTop: 20 }} />
              <Text style={{ marginTop: 22, fontSize: 20, color: '#030637' }}>Add</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={employee}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            ListFooterComponent={renderFooter}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0}
            style={listStyle.container12}
            contentContainerStyle={{ flexGrow: 1, paddingBottom: 50 }}
          />
        </View>
      )}
    </SafeAreaView>
  );
}

export default DaftarTernak;
