"use client"

import { useCallback, useContext, useEffect, useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView, ActivityIndicator } from "react-native"
import * as Keychain from "react-native-keychain"
import { AuthContext } from "../../context/AuthContext"
import Icon from "react-native-vector-icons/Feather"
import { LinearGradient } from "react-native-linear-gradient"

function Account({ navigation }) {
  const authContext = useContext(AuthContext)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const handleLogOut = async () => {
    try {
      await Keychain.resetGenericPassword()
      authContext.setAuthState({
        authenticated: false,
        refreshToken: null,
        accessToken: null,
      })
      navigation.navigate("LoginScreen")
    } catch (error) {
      console.error("Error during logout:", error)
    }
  }

  const showLogOutConfirmation = () => {
    return Alert.alert(
      "Konfirmasi Logout",
      "Apakah Anda yakin ingin keluar dari akun?",
      [
        {
          text: "Batal",
          style: "cancel",
        },
        {
          text: "Ya, Keluar",
          onPress: handleLogOut,
          style: "destructive",
        },
      ],
      { cancelable: true },
    )
  }

  const fetchUserData = useCallback(async () => {
    setLoading(true)
    try {
      const value = await Keychain.getGenericPassword()
      if (value) {
        const jwt = JSON.parse(value.password)
        const userData = jwt.accessToken.userr
        setUser(userData)
      }
    } catch (error) {
      console.error("Error fetching user data:", error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchUserData()
  }, [fetchUserData])

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#179574" />
      </View>
    )
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Profile Card */}
      <LinearGradient
        colors={["#179574", "#20c498"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.profileCard}
      >
        <View style={styles.avatarContainer}>
          <Icon name="user" size={50} color="#FFFFFF" />
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>{user?.fullName || "User Name"}</Text>
          <Text style={styles.profilePhone}>{user?.phoneNumber || "+62 XXX-XXXX-XXXX"}</Text>
        </View>
      </LinearGradient>

      {/* Account Settings */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Icon name="settings" size={22} color="#179574" />
          <Text style={styles.sectionTitle}>Akun</Text>
        </View>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate("EditProfile")}
          activeOpacity={0.7}
        >
          <View style={styles.menuItemLeft}>
            <Icon name="edit" size={20} color="#555" style={styles.menuItemIcon} />
            <Text style={styles.menuItemText}>Ubah Profil</Text>
          </View>
          <Icon name="chevron-right" size={20} color="#AAA" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate("ChangePassword")}
          activeOpacity={0.7}
        >
          <View style={styles.menuItemLeft}>
            <Icon name="lock" size={20} color="#555" style={styles.menuItemIcon} />
            <Text style={styles.menuItemText}>Ubah Kata Sandi</Text>
          </View>
          <Icon name="chevron-right" size={20} color="#AAA" />
        </TouchableOpacity>
      </View>

      {/* Help & Support */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Icon name="help-circle" size={22} color="#179574" />
          <Text style={styles.sectionTitle}>Bantuan</Text>
        </View>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("AboutApp")} activeOpacity={0.7}>
          <View style={styles.menuItemLeft}>
            <Icon name="info" size={20} color="#555" style={styles.menuItemIcon} />
            <Text style={styles.menuItemText}>Tentang Aplikasi</Text>
          </View>
          <Icon name="chevron-right" size={20} color="#AAA" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("HowToUse")} activeOpacity={0.7}>
          <View style={styles.menuItemLeft}>
            <Icon name="book-open" size={20} color="#555" style={styles.menuItemIcon} />
            <Text style={styles.menuItemText}>Cara Penggunaan</Text>
          </View>
          <Icon name="chevron-right" size={20} color="#AAA" />
        </TouchableOpacity>
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={showLogOutConfirmation} activeOpacity={0.8}>
        <Icon name="log-out" size={20} color="#FF4757" />
        <Text style={styles.logoutText}>Keluar</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.versionText}>Version 1.0.0</Text>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8F9FA",
  },
  profileCard: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 16,
    padding: 24,
    margin: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  avatarContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  profilePhone: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.9)",
  },
  section: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    margin: 16,
    marginTop: 8,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#179574",
    marginLeft: 10,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuItemIcon: {
    marginRight: 12,
  },
  menuItemText: {
    fontSize: 16,
    color: "#333",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    margin: 16,
    marginTop: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FF4757",
    marginLeft: 10,
  },
  footer: {
    alignItems: "center",
    padding: 16,
    marginBottom: 16,
  },
  versionText: {
    fontSize: 12,
    color: "#999",
  },
})

export default Account
