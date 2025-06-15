"use client"

import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native"
import { Text } from "react-native-paper"
import LinearGradient from "react-native-linear-gradient"
import Icon from "react-native-vector-icons/MaterialIcons"
import { useContext, useState, useCallback } from "react"
import { AxiosContext } from "../../context/AxiosContext"
import { useFocusEffect } from "@react-navigation/native"
import * as Keychain from "react-native-keychain"

const { width, height } = Dimensions.get("screen")

function AmountKandang({ navigation }) {
  const axiosContext = useContext(AxiosContext)
  const [dashboardData, setDashboardData] = useState({})
  const [weatherData, setWeatherData] = useState({ temp: 28, condition: "Cerah" })
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const getData = () => {
    axiosContext.authAxios
      .get(`/api/v1/dashboard`)
      .then((res) => {
        console.log("data = ", res.data)
        setDashboardData(res.data)
      })
      .catch((err) => {
        console.error(err)
      })
  }

  const formatAmountWithDots = (value) => {
    if (!value) return "0"
    const onlyNumbers = value.toString().replace(/[^0-9]/g, "")
    if (value < 0) return "-" + onlyNumbers.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    return onlyNumbers.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
  }

  const quickAccessData = [
    {
      title: "Kandang",
      icon: require("../../image/kandang.png"),
      color: ["#179574", "#20c498"],
      onPress: () => navigation.navigate("Kandang"),
    },
    {
      title: "Komunitas",
      icon: "groups",
      color: ["#F8CE5A", "#F3B93D"],
      onPress: () => navigation.navigate("Community"),
    },
    {
      title: "Medis",
      icon: "medical-services",
      color: ["#FF6B6B", "#FF5252"],
      onPress: () => navigation.navigate("Medical"),
    },
  ]

  const farmingTips = [
    {
      id: 1,
      title: "Tips Meningkatkan Produksi Telur",
      description: "Berikan pakan berkualitas tinggi dengan protein 20-24% untuk puyuh petelur",
      image: require("../../image/management.jpg"),
      category: "Produksi",
      readTime: "3 menit",
    },
    {
      id: 2,
      title: "Cara Menjaga Kesehatan Puyuh",
      description: "Lakukan vaksinasi rutin dan jaga kebersihan kandang untuk mencegah penyakit",
      image: require("../../image/person.jpg"),
      category: "Kesehatan",
      readTime: "5 menit",
    },
    {
      id: 3,
      title: "Cara Merawat DOQ",
      description: "Cara tepat untuk bagaimana merawat DOQ yang tepat",
      image: require("../../image/quail.jpg"),
      category: "DOQ",
      readTime: "4 menit",
    },
  ]

  const QuickAccessCard = ({ item }) => (
    <TouchableOpacity style={styles.quickAccessCard} onPress={item.onPress}>
      <LinearGradient colors={item.color} style={styles.quickAccessGradient}>
        {typeof item.icon === "string" ? (
          <Icon name={item.icon} size={32} color="#FFFFFF" />
        ) : (
          <Image source={item.icon} style={styles.quickAccessIcon} />
        )}
        <Text style={styles.quickAccessText}>{item.title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  )

  const SummaryCard = ({ icon, image, label, value, unit, color }) => (
    <View style={[styles.summaryCard, { borderLeftColor: color }]}>
      <View style={styles.summaryHeader}>
        {image ? (
          <Image source={image} style={[styles.summaryImage, { tintColor: color }]} />
        ) : (
          <Icon name={icon} size={32} color={color} />
        )}
        <Text style={styles.summaryLabel}>{label}</Text>
      </View>
      <Text style={styles.summaryValue}>
        {value} <Text style={styles.summaryUnit}>{unit}</Text>
      </Text>
    </View>
  )

  const TipCard = ({ tip }) => (
    <TouchableOpacity style={styles.tipCard}>
      <Image source={tip.image} style={styles.tipImage} />
      <View style={styles.tipContent}>
        <View style={styles.tipHeader}>
          <View style={[styles.categoryBadge, { backgroundColor: getCategoryColor(tip.category) }]}>
            <Text style={styles.categoryText}>{tip.category}</Text>
          </View>
          {/* <Text style={styles.readTime}>{tip.readTime}</Text> */}
        </View>
        <Text style={styles.tipTitle}>{tip.title}</Text>
        <Text style={styles.tipDescription}>{tip.description}</Text>
      </View>
    </TouchableOpacity>
  )

  const getCategoryColor = (category) => {
    switch (category) {
      case "Produksi":
        return "#179574"
      case "Kesehatan":
        return "#FF6B6B"
      case "Pakan":
        return "#F8CE5A"
      case "DOQ":
        return "#9C27B0"
      default:
        return "#179574"
    }
  }

  const fetchUserData = useCallback(async () => {
    console.log("Fetching user data...")
    setLoading(true)
    try {
      const value = await Keychain.getGenericPassword()
      if (value) {
        const jwt = JSON.parse(value.password)
        const userData = jwt.accessToken.userr
        setUser(userData)
        console.log("User data:", userData)
      }
    } catch (error) {
      console.error("Error fetching user data:", error)
    } finally {
      setLoading(false)
    }
  }, [])

  useFocusEffect(
    useCallback(() => {
      getData()
      fetchUserData()
    }, [fetchUserData]),
  )

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#179574" barStyle="light-content" />

      {/* Header */}
      <LinearGradient colors={["#179574", "#20c498"]} style={styles.header}>
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.headerGreeting}>Selamat Datang!</Text>
            <Text style={styles.headerTitle}>{loading ? "Loading..." : user?.fullName || "Teman Ternak"}</Text>
          </View>
          <View style={styles.weatherContainer}>
            <Icon name="wb_sunny" size={24} color="#F8CE5A" />
            <Text style={styles.weatherText}>{weatherData.temp}°C</Text>
            <Text style={styles.weatherCondition}>{weatherData.condition}</Text>
          </View>
        </View>
      </LinearGradient>

      <ScrollView 
        style={styles.content} 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={{ paddingBottom: 100 }} >
        {/* Quick Access */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Akses Cepat</Text>
          <View style={styles.quickAccessContainer}>
            {quickAccessData.map((item, index) => (
              <QuickAccessCard key={index} item={item} />
            ))}
          </View>
        </View>

        {/* Farm Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ringkasan Peternakan</Text>
          <View style={styles.summaryContainer}>
            <SummaryCard
              icon="account-balance-wallet"
              label="Pendapatan"
              value={formatAmountWithDots(dashboardData.profit)}
              unit="Rupiah"
              color="#4CAF50"
            />
            <SummaryCard
              image={require("../../image/income.png")}
              label="Biaya"
              value={formatAmountWithDots(dashboardData.cost)}
              unit="Rupiah"
              color="#FF5722"
            />
            <SummaryCard
              image={require("../../image/quail.png")}
              label="Ternak"
              value={formatAmountWithDots(dashboardData.livestock)}
              unit="Ekor"
              color="#179574"
            />
            <SummaryCard
              image={require("../../image/pakan12.png")}
              label="Pakan"
              value={formatAmountWithDots(dashboardData.feed)}
              unit="Kg"
              color="#F8CE5A"
            />
            <SummaryCard
              image={require("../../image/pendepatan.png")}
              label="Telur"
              value={formatAmountWithDots(dashboardData.egg)}
              unit="Butir"
              color="#FF9800"
            />
          </View>
        </View>

        {/* Farming Tips - Back to Vertical Layout */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Tips & Panduan</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>Lihat Semua</Text>
            </TouchableOpacity>
          </View>
          {farmingTips.map((tip) => (
            <TipCard key={tip.id} tip={tip} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  header: {
    paddingTop: 20,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerGreeting: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.9)",
    marginBottom: 4,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  weatherContainer: {
    alignItems: "center",
  },
  weatherText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginTop: 4,
  },
  weatherCondition: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.8)",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginVertical: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
  },
  seeAllText: {
    fontSize: 14,
    color: "#179574",
    fontWeight: "600",
  },
  quickAccessContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  quickAccessCard: {
    flex: 1,
    marginHorizontal: 4,
  },
  quickAccessGradient: {
    padding: 20,
    borderRadius: 16,
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  quickAccessIcon: {
    width: 32,
    height: 32,
    tintColor: "#FFFFFF",
    marginBottom: 8,
  },
  quickAccessText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
    textAlign: "center",
  },
  summaryContainer: {
    gap: 16,
  },
  summaryCard: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 16,
    borderLeftWidth: 5,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  summaryHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  summaryImage: {
    width: 32,
    height: 32,
    marginRight: 12,
  },
  summaryLabel: {
    fontSize: 18,
    color: "#333",
    marginLeft: 8,
    fontWeight: "700",
  },
  summaryValue: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
  },
  summaryUnit: {
    fontSize: 16,
    color: "#666",
    fontWeight: "normal",
  },
  tipCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    overflow: "hidden",
  },
  tipImage: {
    width: "100%",
    height: 120,
    resizeMode: "cover",
  },
  tipContent: {
    padding: 16,
  },
  tipHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryText: {
    fontSize: 10,
    color: "#FFFFFF",
    fontWeight: "600",
  },
  readTime: {
    fontSize: 12,
    color: "#666",
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  tipDescription: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
})

export default AmountKandang
