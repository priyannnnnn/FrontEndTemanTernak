import { StyleSheet, View, Image } from "react-native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import AmountKandang from "./AmountKandang"
import Dashboardkandang from "./Dashboardkandang"
import Account from "./account"
import Community from "./Community"
import Medical from "./Medical"
import FontAwesome from "react-native-vector-icons/AntDesign"
import Icon from "react-native-vector-icons/FontAwesome"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"

const Tab = createBottomTabNavigator()

export default function Dashboard({ navigation }) {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#179574" },
        headerTintColor: "#FFFFFF",
        headerTitleStyle: { fontWeight: "bold", fontSize: 18 },
        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          height: 75,
          position: "absolute",
          bottom: 15,
          borderRadius: 20,
          marginHorizontal: 15,
          paddingBottom: 10,
          paddingTop: 5,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 5 },
          shadowOpacity: 0.15,
          shadowRadius: 10,
          elevation: 8,
          borderTopWidth: 0,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
          marginTop: 2,
        },
        tabBarActiveTintColor: "#179574",
        tabBarInactiveTintColor: "#8E8E93",
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={AmountKandang}
        options={{
          title: "Dashboard",
          tabBarIcon: ({ focused, color }) => (
            <View style={[styles.iconContainer, focused && styles.activeIconContainer]}>
              <FontAwesome name="home" size={24} color={focused ? "#FFFFFF" : color} />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Kandang"
        component={Dashboardkandang}
        options={{
          title: "Kandang",
          tabBarIcon: ({ focused, color }) => (
            <View style={[styles.iconContainer, focused && styles.activeIconContainer]}>
              <Image
                source={require("../../image/kandang.png")}
                style={[styles.imageIcon, { tintColor: focused ? "#FFFFFF" : color }]}
              />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Community"
        component={Community}
        options={{
          title: "Komunitas",
          tabBarIcon: ({ focused, color }) => (
            <View style={[styles.iconContainer, focused && styles.activeIconContainer]}>
              <MaterialIcons name="groups" size={24} color={focused ? "#FFFFFF" : color} />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Medical"
        component={Medical}
        options={{
          title: "Medis",
          tabBarIcon: ({ focused, color }) => (
            <View style={[styles.iconContainer, focused && styles.activeIconContainer]}>
              <MaterialIcons name="medical-services" size={24} color={focused ? "#FFFFFF" : color} />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Akun"
        component={Account}
        options={{
          headerShown: false,
          title: "Akun",
          tabBarIcon: ({ focused, color }) => (
            <View style={[styles.iconContainer, focused && styles.activeIconContainer]}>
              <Icon name="user-circle" size={24} color={focused ? "#FFFFFF" : color} />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 2,
  },
  activeIconContainer: {
    backgroundColor: "#179574",
  },
  imageIcon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
})
