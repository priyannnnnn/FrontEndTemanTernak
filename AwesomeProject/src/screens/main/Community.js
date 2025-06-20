"use client"

import { useState, useContext, useCallback } from "react"
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Alert,
  RefreshControl,
  ActivityIndicator,
} from "react-native"
import { TextInput as PaperTextInput } from "react-native-paper"
import LinearGradient from "react-native-linear-gradient"
import Icon from "react-native-vector-icons/MaterialIcons"
import { AxiosContext } from "../../context/AxiosContext"
import { useFocusEffect } from "@react-navigation/native"

const Community = ({ navigation }) => {
  const axiosContext = useContext(AxiosContext)
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [searchText, setSearchText] = useState("")
  const [expandedComments, setExpandedComments] = useState({})
  const [commentText, setCommentText] = useState({})
  const [likedPosts, setLikedPosts] = useState(new Set())

  // Fetch all posts
  const fetchPosts = async () => {
    try {
      setLoading(true)
      const response = await axiosContext.authAxios.get("/api/v1/community/posts")
      setPosts(response.data.content || [])
    } catch (error) {
      console.error("Error fetching posts:", error)
      Alert.alert("Error", "Gagal memuat postingan")
    } finally {
      setLoading(false)
    }
  }

  // Navigate to create post screen
  const navigateToCreatePost = () => {
    navigation.navigate("CreatePost")
  }

  // Like/Unlike post
  const toggleLike = async (postId) => {
    const isCurrentlyLiked = likedPosts.has(postId)

    try {
      const endpoint = isCurrentlyLiked ? "/api/v1/community/unlike" : "/api/v1/community/like"
      await axiosContext.authAxios.post(endpoint, { postId })

      // Update local state immediately for better UX
      setLikedPosts((prev) => {
        const newSet = new Set(prev)
        if (isCurrentlyLiked) {
          newSet.delete(postId)
        } else {
          newSet.add(postId)
        }
        return newSet
      })

      // Update posts state
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId
            ? { ...post, likeCount: isCurrentlyLiked ? post.likeCount - 1 : post.likeCount + 1 }
            : post,
        ),
      )
    } catch (error) {
      console.error("Error toggling like:", error)
      // Revert the optimistic update
      setLikedPosts((prev) => {
        const newSet = new Set(prev)
        if (isCurrentlyLiked) {
          newSet.add(postId)
        } else {
          newSet.delete(postId)
        }
        return newSet
      })
    }
  }

  // Add comment
  const addComment = async (postId) => {
    const content = commentText[postId]?.trim()
    if (!content) return

    try {
      await axiosContext.authAxios.post("/api/v1/community/comment", {
        postId,
        content,
      })

      setCommentText((prev) => ({ ...prev, [postId]: "" }))
      fetchPosts() // Refresh to get updated comments
    } catch (error) {
      console.error("Error adding comment:", error)
      Alert.alert("Error", "Gagal menambahkan komentar")
    }
  }

  // Format time
  const formatTime = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Baru saja"
    if (diffInHours < 24) return `${diffInHours} jam lalu`
    if (diffInHours < 48) return "1 hari lalu"
    return `${Math.floor(diffInHours / 24)} hari lalu`
  }

  // Refresh posts
  const onRefresh = useCallback(async () => {
    setRefreshing(true)
    await fetchPosts()
    setRefreshing(false)
  }, [])

  useFocusEffect(
    useCallback(() => {
      fetchPosts()
    }, []),
  )

  // Custom TextInput Component for search and comments
  const CommunityTextInput = ({ value, onChangeText, placeholder, multiline = false, style, ...props }) => (
    <View style={[styles.inputContainer, style]}>
      <PaperTextInput
        style={[styles.paperInput, multiline && styles.multilineInput]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        mode="outlined"
        multiline={multiline}
        numberOfLines={multiline ? 3 : 1}
        outlineColor="#E0E0E0"
        activeOutlineColor="#179574"
        theme={{
          colors: {
            background: "#FFFFFF",
            placeholder: "#999",
            text: "#333",
          },
        }}
        {...props}
      />
    </View>
  )

  const PostCard = ({ post }) => {
    const isCommentsExpanded = expandedComments[post.id]
    const isLiked = likedPosts.has(post.id)

    return (
      <View style={styles.postCard}>
        {/* Post Header */}
        <View style={styles.postHeader}>
          <View style={styles.userInfo}>
            <LinearGradient colors={["#179574", "#20c498"]} style={styles.avatar}>
              <Icon name="person" size={20} color="#FFFFFF" />
            </LinearGradient>
            <View>
              <Text style={styles.userName}>{post.userFullName}</Text>
              <Text style={styles.postTime}>{formatTime(post.createdAt)}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.moreButton}>
            <Icon name="more-vert" size={20} color="#666" />
          </TouchableOpacity>
        </View>

        {/* Post Topic */}
        {post.topic && (
          <View style={styles.topicContainer}>
            <Text style={styles.postTopic}>{post.topic}</Text>
          </View>
        )}

        {/* Post Content */}
        <Text style={styles.postDescription}>{post.description}</Text>

        {/* Post Image */}
        {post.imageUrl && (
          <TouchableOpacity onPress={() => Alert.alert("Image", "Full screen view coming soon!")}>
            <Image source={{ uri: post.imageUrl }} style={styles.postImage} resizeMode="cover" />
          </TouchableOpacity>
        )}

        {/* Post Actions */}
        <View style={styles.postActions}>
          <TouchableOpacity
            style={[styles.actionButton, isLiked && styles.likedButton]}
            onPress={() => toggleLike(post.id)}
          >
            <Icon name={isLiked ? "favorite" : "favorite-border"} size={20} color={isLiked ? "#FF6B6B" : "#666"} />
            <Text style={[styles.actionText, isLiked && styles.likedText]}>{post.likeCount}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => setExpandedComments((prev) => ({ ...prev, [post.id]: !prev[post.id] }))}
          >
            <Icon name="chat-bubble-outline" size={20} color="#179574" />
            <Text style={styles.actionText}>{post.comments.length}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <Icon name="share" size={20} color="#F8CE5A" />
            <Text style={styles.actionText}>Bagikan</Text>
          </TouchableOpacity>
        </View>

        {/* Comments Section */}
        {isCommentsExpanded && (
          <View style={styles.commentsSection}>
            {/* Existing Comments */}
            {post.comments.length > 0 ? (
              post.comments.map((comment) => (
                <View key={comment.id} style={styles.commentItem}>
                  <LinearGradient colors={["#179574", "#20c498"]} style={styles.commentAvatar}>
                    <Icon name="person" size={12} color="#FFFFFF" />
                  </LinearGradient>
                  <View style={styles.commentContent}>
                    <Text style={styles.commentUser}>{comment.userFullName}</Text>
                    <Text style={styles.commentText}>{comment.content}</Text>
                    <Text style={styles.commentTime}>{formatTime(comment.createdAt)}</Text>
                  </View>
                </View>
              ))
            ) : (
              <Text style={styles.noCommentsText}>Belum ada komentar. Jadilah yang pertama!</Text>
            )}

            {/* Add Comment */}
            <View style={styles.addCommentContainer}>
              <LinearGradient colors={["#179574", "#20c498"]} style={styles.commentAvatar}>
                <Icon name="person" size={12} color="#FFFFFF" />
              </LinearGradient>
              <CommunityTextInput
                value={commentText[post.id] || ""}
                onChangeText={(text) => setCommentText((prev) => ({ ...prev, [post.id]: text }))}
                placeholder="Tulis komentar..."
                multiline
                style={styles.commentInputContainer}
              />
              <TouchableOpacity
                style={styles.sendCommentButton}
                onPress={() => addComment(post.id)}
                disabled={!commentText[post.id]?.trim()}
              >
                <Icon name="send" size={16} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    )
  }

  const filteredPosts = posts.filter(
    (post) =>
      post.description.toLowerCase().includes(searchText.toLowerCase()) ||
      post.userFullName.toLowerCase().includes(searchText.toLowerCase()) ||
      (post.topic && post.topic.toLowerCase().includes(searchText.toLowerCase())),
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
        <CommunityTextInput
          value={searchText}
          onChangeText={setSearchText}
          placeholder="Cari postingan..."
          style={styles.searchInputContainer}
        />
      </View>

      {/* Create Post Button */}
      <TouchableOpacity style={styles.createPostButton} onPress={navigateToCreatePost}>
        <View style={styles.createPostContent}>
          <LinearGradient colors={["#179574", "#20c498"]} style={styles.avatar}>
            <Icon name="person" size={20} color="#FFFFFF" />
          </LinearGradient>
          <Text style={styles.createPostText}>Bagikan pengalaman ternak Anda...</Text>
          <Icon name="chevron-right" size={20} color="#179574" />
        </View>
      </TouchableOpacity>

      {/* Posts Feed */}
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        keyboardShouldPersistTaps="handled"
      >
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#179574" />
            <Text style={styles.loadingText}>Memuat postingan...</Text>
          </View>
        ) : filteredPosts.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Icon name="forum" size={64} color="#E0E0E0" />
            <Text style={styles.emptyText}>Belum ada postingan</Text>
            <Text style={styles.emptySubtext}>Jadilah yang pertama berbagi pengalaman!</Text>
            <TouchableOpacity style={styles.createFirstPostButton} onPress={navigateToCreatePost}>
              <LinearGradient colors={["#179574", "#20c498"]} style={styles.createFirstPostGradient}>
                <Icon name="add" size={20} color="#FFFFFF" />
                <Text style={styles.createFirstPostText}>Buat Postingan Pertama</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        ) : (
          filteredPosts.map((post) => <PostCard key={post.id} post={post} />)
        )}
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab} onPress={navigateToCreatePost}>
        <LinearGradient colors={["#179574", "#20c498"]} style={styles.fabGradient}>
          <Icon name="add" size={24} color="#FFFFFF" />
        </LinearGradient>
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
  searchInputContainer: {
    flex: 1,
    marginVertical: 0,
  },
  inputContainer: {
    width: "100%",
    marginVertical: 8,
  },
  paperInput: {
    backgroundColor: "#FFFFFF",
    fontSize: 16,
  },
  multilineInput: {
    minHeight: 80,
  },
  commentInputContainer: {
    flex: 1,
    marginVertical: 0,
    marginHorizontal: 8,
  },
  createPostButton: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 16,
    marginBottom: 8,
    borderRadius: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  createPostContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  createPostText: {
    flex: 1,
    fontSize: 16,
    color: "#999",
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  postCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    marginBottom: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  postHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    paddingBottom: 8,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  postTime: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
  moreButton: {
    padding: 4,
  },
  topicContainer: {
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  postTopic: {
    fontSize: 14,
    fontWeight: "600",
    color: "#179574",
    backgroundColor: "#E8F5E8",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    alignSelf: "flex-start",
  },
  postDescription: {
    fontSize: 15,
    color: "#333",
    lineHeight: 22,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  postImage: {
    width: "92%",
    height: 250,
    marginBottom: 12,
    borderRadius: 8,
    alignSelf: "center",
  },
  postActions: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 24,
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 20,
  },
  likedButton: {
    backgroundColor: "rgba(255, 107, 107, 0.1)",
  },
  actionText: {
    fontSize: 14,
    color: "#666",
    marginLeft: 6,
    fontWeight: "500",
  },
  likedText: {
    color: "#FF6B6B",
  },
  commentsSection: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
  },
  commentItem: {
    flexDirection: "row",
    marginTop: 12,
  },
  commentAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  commentContent: {
    flex: 1,
    backgroundColor: "#F8F9FA",
    borderRadius: 12,
    padding: 10,
  },
  commentUser: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#179574",
    marginBottom: 2,
  },
  commentText: {
    fontSize: 14,
    color: "#333",
    lineHeight: 18,
  },
  commentTime: {
    fontSize: 10,
    color: "#999",
    marginTop: 4,
  },
  noCommentsText: {
    fontSize: 14,
    color: "#999",
    textAlign: "center",
    fontStyle: "italic",
    marginTop: 12,
  },
  addCommentContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
    backgroundColor: "#F8F9FA",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  sendCommentButton: {
    padding: 6,
    backgroundColor: "#179574",
    borderRadius: 15,
  },
  loadingContainer: {
    padding: 40,
    alignItems: "center",
  },
  loadingText: {
    fontSize: 16,
    color: "#666",
    marginTop: 12,
  },
  emptyContainer: {
    padding: 40,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#666",
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: "#999",
    marginTop: 8,
    textAlign: "center",
  },
  createFirstPostButton: {
    marginTop: 20,
    borderRadius: 25,
  },
  createFirstPostGradient: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
  },
  createFirstPostText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
  fab: {
    position: "absolute",
    bottom: 90,
    right: 20,
    borderRadius: 28,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  fabGradient: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
  },
})

export default Community
