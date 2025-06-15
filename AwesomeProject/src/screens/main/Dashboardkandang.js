"use client"

import { useContext, useState, useCallback } from "react"
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, SafeAreaView, Image } from "react-native"
import LinearGradient from "react-native-linear-gradient"
import Icon from "react-native-vector-icons/MaterialIcons"
import { AxiosContext } from "../../context/AxiosContext"
import { useFocusEffect } from "@react-navigation/native"

const { width, height } = Dimensions.get("window")

function Dashboardkandang({ navigation }) {
  const axiosContext = useContext(AxiosContext)
  const [dashboardData, setDashboardData] = useState({})

  const getData = () => {
    axiosContext.authAxios
      .get(`/api/v1/dashboard`)
      .then((res) => {
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

  const cageManagementData = [
    {
      id: "livestock",
      title: "Ternak",
      subtitle: `${formatAmountWithDots(dashboardData.livestock)} Ekor`,
      image: require("../../image/quail.png"),
      gradient: ["#F8CE5A", "#F3B93D"],
      onPress: () => navigation.navigate("DaftarTernak", { item: 8 }),
    },
    {
      id: "feed",
      title: "Pakan",
      subtitle: `${formatAmountWithDots(dashboardData.feed)} Kg`,
      image: require("../../image/pakan12.png"),
      gradient: ["#F8CE5A", "#F3B93D"],
      onPress: () => navigation.navigate("DaftarPersediaanPakan", { item: 8 }),
    },
    {
      id: "eggs",
      title: "Telur",
      subtitle: `${formatAmountWithDots(dashboardData.egg)} Butir`,
      image: require("../../image/pendepatan.png"),
      gradient: ["#F8CE5A", "#F3B93D"],
      onPress: () => navigation.navigate("DaftarPendapatanTelur", { item: 8 }),
    },
    {
      id: "feedstock",
      title: "Stok Pakan",
      subtitle: "Monitor Persediaan",
      image: require("../../image/pakan12.png"),
      gradient: ["#F8CE5A", "#F3B93D"],
      onPress: () => navigation.navigate("ListFeedsUse", { item: 8 }),
    },
    {
      id: "sales",
      title: "Penjualan",
      subtitle: "Kelola Penjualan",
      image: require("../../image/income.png"),
      gradient: ["#F8CE5A", "#F3B93D"],
      onPress: () => navigation.navigate("DaftarPenjualanTelur", { item: 8 }),
    },
    {
      id: "culling",
      title: "Afkir Ternak",
      subtitle: "Catat Puyuh Afkir",
      image: require("../../image/quail.png"),
      gradient: ["#F8CE5A", "#F3B93D"],
      onPress: () => navigation.navigate("ListQuailReduction", { item: 8 }),
    },
    {
      id: "operational",
      title: "Operasional",
      subtitle: "Biaya & Catatan",
      image: require("../../image/date.png"),
      gradient: ["#F8CE5A", "#F3B93D"],
      onPress: () => navigation.navigate("ListOperational", { item: 8 }),
    },
  ]

  const CageManagementBox = ({ item, index }) => (
    <TouchableOpacity
      style={[
        styles.managementBox,
        index === cageManagementData.length - 1 && cageManagementData.length % 2 === 1
          ? styles.fullWidthBox
          : styles.halfWidthBox,
      ]}
      onPress={item.onPress}
      activeOpacity={0.8}
    >
      <LinearGradient colors={item.gradient} style={styles.boxGradient}>
        <View style={styles.boxContent}>
          <View style={styles.boxHeader}>
            <View style={styles.iconContainer}>
              <Image source={item.image} style={styles.boxImage} />
            </View>
            <View style={styles.arrowContainer}>
              <Icon name="arrow-forward" size={20} color="rgba(255, 255, 255, 0.8)" />
            </View>
          </View>
          <View style={styles.boxInfo}>
            <Text style={styles.boxTitle}>{item.title}</Text>
            {/* <Text style={styles.boxSubtitle}>{item.subtitle}</Text> */}
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  )

  // const QuickStatsCard = ({ icon, label, value, color }) => (
  //   <View style={[styles.quickStatsCard, { borderTopColor: color }]}>
  //     <Icon name={icon} size={24} color={color} />
  //     <Text style={styles.quickStatsValue}>{value}</Text>
  //     <Text style={styles.quickStatsLabel}>{label}</Text>
  //   </View>
  // )
  const QuickStatsCard = ({ icon, image, label, value, color }) => (
    <View style={[styles.quickStatsCard, { borderTopColor: color }]}>
      {image ? (
        <Image source={image} style={[styles.quickStatsImage, { tintColor: color }]} />
      ) : (
        <Icon name={icon} size={24} color={color} />
      )}
      <Text style={styles.quickStatsValue}>{value}</Text>
      <Text style={styles.quickStatsLabel}>{label}</Text>
    </View>
  )

  const SummaryItem = ({ label, value }) => (
    <View style={styles.summaryItem}>
      <Text style={styles.summaryLabel}>{label}</Text>
      <Text style={styles.summaryValue}>{value}</Text>
    </View>
  )

  useFocusEffect(
    useCallback(() => {
      getData()
    }, []),
  )

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <LinearGradient colors={["#179574", "#20c498"]} style={styles.header}>
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.headerTitle}>Manajemen Kandang</Text>
            <Text style={styles.headerSubtitle}>Kelola semua aktivitas peternakan</Text>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Icon name="notifications" size={24} color="#FFFFFF" />
            <View style={styles.notificationBadge}>
              <Text style={styles.notificationBadgeText}>3</Text>
            </View>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView 
        style={styles.content} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}>
        <View style={styles.quickStatsContainer}>
          <QuickStatsCard
            image={require("../../image/ternak.png")}
            label="Total Puyuh"
            value={formatAmountWithDots(dashboardData.livestock) + " Ekor"}
            color="#179574"
          />
          <QuickStatsCard
            image={require("../../image/pendepatan.png")}
            label="Produksi Hari Ini"
            // value="245 Butir"
            value={formatAmountWithDots(dashboardData.egg) + " Butir"}
            color="#FF9800"
          />
          <QuickStatsCard 
            icon="trending-up" 
            label="Total Pakan" 
            // value="85%" 
            value={formatAmountWithDots(dashboardData.feed)+ " KG"}
            color="#4CAF50" />
        </View>

        {/* Management Boxes Grid */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Kelola Kandang</Text>
          <View style={styles.boxesContainer}>
            {cageManagementData.map((item, index) => (
              <CageManagementBox key={item.id} item={item} index={index} />
            ))}
          </View>
        </View>

        {/* Summary Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ringkasan Peternakan</Text>
          <View style={styles.summaryContainer}>
            <SummaryItem label="Pendapatan" value={`Rp ${formatAmountWithDots(dashboardData.profit)}`} />
            <SummaryItem label="Biaya" value={`Rp ${formatAmountWithDots(dashboardData.cost)}`} />
            <SummaryItem
              label="Keuntungan"
              value={`Rp ${formatAmountWithDots((dashboardData.profit || 0) - (dashboardData.cost || 0))}`}
            />
          </View>
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
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.9)",
  },
  notificationButton: {
    position: "relative",
    padding: 8,
  },
  notificationBadge: {
    position: "absolute",
    top: 4,
    right: 4,
    backgroundColor: "#FF5722",
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  notificationBadgeText: {
    fontSize: 12,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  quickStatsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
    marginBottom: 20,
  },
  quickStatsCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    flex: 1,
    marginHorizontal: 4,
    borderTopWidth: 3,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  quickStatsValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginTop: 8,
  },
  quickStatsLabel: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
    marginTop: 4,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
  },
  boxesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12,
  },
  managementBox: {
    borderRadius: 16,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    marginBottom: 12,
  },
  halfWidthBox: {
    width: (width - 52) / 2,
  },
  fullWidthBox: {
    width: width - 40,
  },
  boxGradient: {
    borderRadius: 16,
    padding: 20,
    minHeight: 120,
  },
  boxContent: {
    flex: 1,
    justifyContent: "space-between",
  },
  boxHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  iconContainer: {
    width: 70,
    height: 70,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  arrowContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    justifyContent: "center",
    alignItems: "center",
  },
  boxInfo: {
    flex: 1,
  },
  boxTitle: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 0,
  },
  boxSubtitle: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.9)",
    lineHeight: 16,
  },
  summaryContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  summaryItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  summaryLabel: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#179574",
  },
  taskContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  taskItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  taskText: {
    flex: 1,
    fontSize: 14,
    color: "#333",
    marginLeft: 12,
  },
  activityContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  activityItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  activityIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 2,
  },
  activityTime: {
    fontSize: 12,
    color: "#666",
  },
  boxImage: {
    width: 70,
    height: 70,
    tintColor: "#FFFFFF",
    resizeMode: "contain",
  },
  quickStatsImage: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
})

export default Dashboardkandang
