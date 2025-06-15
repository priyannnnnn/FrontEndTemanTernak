"use client"

import { useState } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image, SafeAreaView } from "react-native"
import LinearGradient from "react-native-linear-gradient"
import Icon from "react-native-vector-icons/MaterialIcons"

const Community = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState("groups")
  const [searchText, setSearchText] = useState("")

  const communityGroups = [
    {
      id: 1,
      name: "Peternak Puyuh Jawa Timur",
      members: 1250,
      lastMessage: "Tips pemberian pakan saat musim hujan",
      time: "2 jam lalu",
      image: require("../../image/ternak.png"),
      isActive: true,
    },
    {
      id: 2,
      name: "Komunitas Telur Puyuh",
      members: 890,
      lastMessage: "Harga telur hari ini bagaimana?",
      time: "5 jam lalu",
      image: require("../../image/pendepatan.png"),
      isActive: true,
    },
    {
      id: 3,
      name: "Peternak Pemula",
      members: 456,
      lastMessage: "Cara mengatasi puyuh yang tidak bertelur",
      time: "1 hari lalu",
      image: require("../../image/ternak.png"),
      isActive: false,
    },
  ]

  const discussions = [
    {
      id: 1,
      title: "Tips Meningkatkan Produksi Telur",
      author: "Pak Budi",
      replies: 23,
      time: "3 jam lalu",
      category: "Tips & Trik",
    },
    {
      id: 2,
      title: "Penyakit Puyuh dan Cara Mengatasinya",
      author: "Dr. Sari",
      replies: 45,
      time: "6 jam lalu",
      category: "Kesehatan",
    },
    {
      id: 3,
      title: "Harga Pakan Naik, Bagaimana Solusinya?",
      author: "Ibu Ani",
      replies: 67,
      time: "1 hari lalu",
      category: "Ekonomi",
    },
  ]

  const GroupCard = ({ group }) => (
    <TouchableOpacity style={styles.groupCard}>
      <View style={styles.groupHeader}>
        <Image source={group.image} style={styles.groupImage} />
        <View style={styles.groupInfo}>
          <Text style={styles.groupName}>{group.name}</Text>
          <Text style={styles.groupMembers}>{group.members} anggota</Text>
        </View>
        <View style={styles.groupStatus}>
          <View style={[styles.statusDot, { backgroundColor: group.isActive ? "#4CAF50" : "#FFC107" }]} />
        </View>
      </View>
      <Text style={styles.lastMessage}>{group.lastMessage}</Text>
      <Text style={styles.messageTime}>{group.time}</Text>
    </TouchableOpacity>
  )

  const DiscussionCard = ({ discussion }) => (
    <TouchableOpacity style={styles.discussionCard}>
      <View style={styles.discussionHeader}>
        <Text style={styles.discussionTitle}>{discussion.title}</Text>
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{discussion.category}</Text>
        </View>
      </View>
      <View style={styles.discussionFooter}>
        <Text style={styles.authorText}>oleh {discussion.author}</Text>
        <View style={styles.discussionStats}>
          <Icon name="chat-bubble-outline" size={16} color="#666" />
          <Text style={styles.repliesText}>{discussion.replies}</Text>
          <Text style={styles.timeText}>{discussion.time}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={["#179574", "#20c498"]} style={styles.header}>
        <Text style={styles.headerTitle}>Komunitas Teman Ternak</Text>
        <Text style={styles.headerSubtitle}>Berbagi pengalaman dengan sesama peternak</Text>
      </LinearGradient>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Cari grup atau diskusi..."
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "groups" && styles.activeTab]}
          onPress={() => setActiveTab("groups")}
        >
          <Icon name="groups" size={20} color={activeTab === "groups" ? "#FFFFFF" : "#666"} />
          <Text style={[styles.tabText, activeTab === "groups" && styles.activeTabText]}>Grup Saya</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "discussions" && styles.activeTab]}
          onPress={() => setActiveTab("discussions")}
        >
          <Icon name="forum" size={20} color={activeTab === "discussions" ? "#FFFFFF" : "#666"} />
          <Text style={[styles.tabText, activeTab === "discussions" && styles.activeTabText]}>Diskusi</Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {activeTab === "groups" ? (
          <View>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Grup Aktif</Text>
              <TouchableOpacity style={styles.addButton}>
                <Icon name="add" size={20} color="#179574" />
                <Text style={styles.addButtonText}>Buat Grup</Text>
              </TouchableOpacity>
            </View>
            {communityGroups.map((group) => (
              <GroupCard key={group.id} group={group} />
            ))}
          </View>
        ) : (
          <View>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Diskusi Terbaru</Text>
              <TouchableOpacity style={styles.addButton}>
                <Icon name="add" size={20} color="#179574" />
                <Text style={styles.addButtonText}>Buat Topik</Text>
              </TouchableOpacity>
            </View>
            {discussions.map((discussion) => (
              <DiscussionCard key={discussion.id} discussion={discussion} />
            ))}
          </View>
        )}
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab}>
        <Icon name="chat" size={24} color="#FFFFFF" />
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  header: {
    padding: 20,
    paddingTop: 40,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.9)",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    margin: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: "#333",
  },
  tabContainer: {
    flexDirection: "row",
    marginHorizontal: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 4,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tab: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: "#179574",
  },
  tabText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
  },
  activeTabText: {
    color: "#FFFFFF",
  },
  content: {
    flex: 1,
    padding: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8CE5A",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  addButtonText: {
    marginLeft: 4,
    fontSize: 12,
    fontWeight: "600",
    color: "#179574",
  },
  groupCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  groupHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  groupImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  groupInfo: {
    flex: 1,
  },
  groupName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  groupMembers: {
    fontSize: 12,
    color: "#666",
  },
  groupStatus: {
    alignItems: "center",
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  lastMessage: {
    fontSize: 14,
    color: "#333",
    marginBottom: 8,
  },
  messageTime: {
    fontSize: 12,
    color: "#999",
  },
  discussionCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  discussionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  discussionTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginRight: 12,
  },
  categoryBadge: {
    backgroundColor: "#F8CE5A",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryText: {
    fontSize: 10,
    fontWeight: "600",
    color: "#179574",
  },
  discussionFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  authorText: {
    fontSize: 12,
    color: "#666",
  },
  discussionStats: {
    flexDirection: "row",
    alignItems: "center",
  },
  repliesText: {
    fontSize: 12,
    color: "#666",
    marginLeft: 4,
    marginRight: 12,
  },
  timeText: {
    fontSize: 12,
    color: "#999",
  },
  fab: {
    position: "absolute",
    bottom: 90,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#179574",
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
})

export default Community
