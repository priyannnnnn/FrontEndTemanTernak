"use client"

import { useState, useContext } from "react"
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Alert,
  ActivityIndicator,
  PermissionsAndroid,
  Platform,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  TextInput,
} from "react-native"
import LinearGradient from "react-native-linear-gradient"
import Icon from "react-native-vector-icons/MaterialIcons"
import { AxiosContext } from "../../context/AxiosContext"
import { launchImageLibrary, launchCamera } from "react-native-image-picker"

const CreatePostScreen = ({ navigation, route }) => {
  const axiosContext = useContext(AxiosContext)
  const [newPost, setNewPost] = useState({ topic: "", description: "", image: null })
  const [creatingPost, setCreatingPost] = useState(false)
  const [showImageOptions, setShowImageOptions] = useState(false)

  // Get callback function from route params if provided
  const { onPostCreated } = route?.params || {}

  // Request camera permission for Android
  const requestCameraPermission = async () => {
    if (Platform.OS === "android") {
      try {
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA, {
          title: "Camera Permission",
          message: "App needs camera permission to take photos",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        })
        return granted === PermissionsAndroid.RESULTS.GRANTED
      } catch (err) {
        console.warn(err)
        return false
      }
    }
    return true
  }

  // Image picker options
  const imagePickerOptions = {
    mediaType: "photo",
    includeBase64: false,
    maxHeight: 2000,
    maxWidth: 2000,
    quality: 0.8,
  }

  // Select image from gallery
  const selectFromGallery = () => {
    launchImageLibrary(imagePickerOptions, (response) => {
      if (response.didCancel || response.errorMessage) {
        console.log("Gallery picker cancelled or error:", response.errorMessage)
        return
      }

      if (response.assets && response.assets[0]) {
        const asset = response.assets[0]
        setNewPost((prev) => ({
          ...prev,
          image: {
            uri: asset.uri,
            type: asset.type,
            name: asset.fileName || `image_${Date.now()}.jpg`,
            size: asset.fileSize,
          },
        }))
        setShowImageOptions(false)
      }
    })
  }

  // Take photo with camera
  const takePhoto = async () => {
    const hasPermission = await requestCameraPermission()
    if (!hasPermission) {
      Alert.alert("Permission Denied", "Camera permission is required to take photos")
      return
    }

    launchCamera(imagePickerOptions, (response) => {
      if (response.didCancel || response.errorMessage) {
        console.log("Camera cancelled or error:", response.errorMessage)
        return
      }

      if (response.assets && response.assets[0]) {
        const asset = response.assets[0]
        setNewPost((prev) => ({
          ...prev,
          image: {
            uri: asset.uri,
            type: asset.type,
            name: asset.fileName || `photo-${Date.now()}.jpg`,
            size: asset.fileSize,
          },
        }))
        setShowImageOptions(false)
      }
    })
  }

  // Show image selection options
  const showImagePicker = () => {
    setShowImageOptions(true)
  }

  // Remove selected image
  const removeImage = () => {
    setNewPost((prev) => ({ ...prev, image: null }))
  }

  // Create new post with image
  const createPost = async () => {
    if (!newPost.topic.trim() || !newPost.description.trim()) {
      Alert.alert("Error", "Topik dan deskripsi harus diisi")
      return
    }

    try {
      setCreatingPost(true)
      const formData = new FormData()

      // Add text fields
      formData.append("topic", newPost.topic)
      formData.append("description", newPost.description)

      // Add image if selected
      if (newPost.image) {
        formData.append("image", {
          uri: newPost.image.uri,
          type: newPost.image.type,
          name: newPost.image.name,
        })
      }

      await axiosContext.authAxios.post("/api/v1/community/posts", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      // Reset form
      setNewPost({ topic: "", description: "", image: null })

      // Call callback if provided
      if (onPostCreated) {
        onPostCreated()
      }

      Alert.alert("Sukses", "Postingan berhasil dibuat!", [
        {
          text: "OK",
          onPress: () => navigation.goBack(),
        },
      ])
    } catch (error) {
      console.error("Error creating post:", error)
      Alert.alert("Error", "Gagal membuat postingan")
    } finally {
      setCreatingPost(false)
    }
  }

  // Save draft function
  const saveDraft = () => {
    Alert.alert("Info", "Fitur simpan draft akan segera hadir!")
  }

  // Native TextInput Component (like DaftarTernak)
  const CreatePostTextInput = ({ value, onChangeText, placeholder, multiline = false, style, icon, ...props }) => (
    <View style={[styles.inputContainer, style]}>
      <View style={styles.textInputWrapper}>
        {icon && <Icon name={icon} size={20} color="#179574" style={styles.inputIcon} />}
        <TextInput
          style={[styles.textInput, multiline && styles.multilineTextInput]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#999"
          multiline={multiline}
          textAlignVertical={multiline ? "top" : "center"}
          autoCorrect={true}
          {...props}
        />
      </View>
    </View>
  )

  const ImageOptionsModal = () => (
    <Modal visible={showImageOptions} animationType="slide" transparent>
      <View style={styles.modalOverlay}>
        <View style={styles.imageOptionsContent}>
          <Text style={styles.imageOptionsTitle}>Pilih Sumber Gambar</Text>

          <TouchableOpacity style={styles.imageOption} onPress={takePhoto}>
            <Icon name="camera-alt" size={24} color="#179574" />
            <Text style={styles.imageOptionText}>Ambil Foto</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.imageOption} onPress={selectFromGallery}>
            <Icon name="photo-library" size={24} color="#179574" />
            <Text style={styles.imageOptionText}>Pilih dari Galeri</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.cancelOption} onPress={() => setShowImageOptions(false)}>
            <Text style={styles.cancelOptionText}>Batal</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => {
              Keyboard.dismiss()
              navigation.goBack()
            }}
          >
            <Icon name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Buat Postingan Baru</Text>
          <View style={styles.headerSpacer} />
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* User Info */}
          <View style={styles.userSection}>
            <LinearGradient colors={["#179574", "#20c498"]} style={styles.avatar}>
              <Icon name="person" size={24} color="#FFFFFF" />
            </LinearGradient>
            <View style={styles.userInfo}>
              <Text style={styles.userName}>Anda</Text>
              <Text style={styles.postVisibility}>Publik</Text>
            </View>
          </View>

          {/* Topic Input */}
          <View style={styles.inputSection}>
            <Text style={styles.inputLabel}>Topik Diskusi</Text>
            <CreatePostTextInput
              value={newPost.topic}
              onChangeText={(text) => setNewPost((prev) => ({ ...prev, topic: text }))}
              placeholder="Contoh: Tips Pakan, Penyakit Puyuh, Manajemen Kandang..."
              icon="topic"
            />
          </View>

          {/* Description Input */}
          <View style={styles.inputSection}>
            <Text style={styles.inputLabel}>Ceritakan Pengalaman Anda</Text>
            <CreatePostTextInput
              value={newPost.description}
              onChangeText={(text) => setNewPost((prev) => ({ ...prev, description: text }))}
              placeholder="Bagikan tips, pengalaman, atau pertanyaan Anda tentang peternakan puyuh..."
              multiline
              icon="description"
            />
            <Text style={styles.characterCount}>{newPost.description.length}/1000 karakter</Text>
          </View>

          {/* Selected Image Preview */}
          {newPost.image && (
            <View style={styles.selectedImageContainer}>
              <Text style={styles.inputLabel}>Foto Terlampir</Text>
              <View style={styles.imagePreview}>
                <Image source={{ uri: newPost.image.uri }} style={styles.selectedImage} />
                <TouchableOpacity style={styles.removeImageButton} onPress={removeImage}>
                  <Icon name="close" size={16} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* Add Photo Section */}
          <TouchableOpacity style={styles.addPhotoButton} onPress={showImagePicker}>
            <Icon name="photo-camera" size={24} color="#179574" />
            <Text style={styles.addPhotoText}>{newPost.image ? "Ganti Foto" : "Tambah Foto (Opsional)"}</Text>
            <Icon name="chevron-right" size={20} color="#999" />
          </TouchableOpacity>

          {/* Tips Section */}
          <View style={styles.tipsSection}>
            <Text style={styles.tipsTitle}>💡 Tips Postingan yang Baik:</Text>
            <Text style={styles.tipsText}>• Gunakan topik yang jelas dan spesifik</Text>
            <Text style={styles.tipsText}>• Bagikan pengalaman atau tips yang bermanfaat</Text>
            <Text style={styles.tipsText}>• Sertakan foto jika memungkinkan</Text>
            <Text style={styles.tipsText}>• Gunakan bahasa yang sopan dan mudah dipahami</Text>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionButtonsContainer}>
            <TouchableOpacity style={styles.draftButton} onPress={saveDraft}>
              <Icon name="save" size={20} color="#666" />
              <Text style={styles.draftButtonText}>Simpan Draft</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.postButton, creatingPost && styles.postButtonDisabled]}
              onPress={createPost}
              disabled={creatingPost || !newPost.topic.trim() || !newPost.description.trim()}
            >
              {creatingPost ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <>
                  <Icon name="send" size={20} color="#FFFFFF" />
                  <Text style={styles.postButtonText}>Posting</Text>
                </>
              )}
            </TouchableOpacity>
          </View>

          {/* Extra padding at bottom */}
          <View style={styles.bottomPadding} />
        </ScrollView>
      </SafeAreaView>

      <ImageOptionsModal />
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#179574",
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingTop: 40,
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
  },
  headerSpacer: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  userSection: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  postVisibility: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  inputSection: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  // Native TextInput Styles (like DaftarTernak)
  inputContainer: {
    marginBottom: 8,
  },
  textInputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    paddingHorizontal: 12,
    paddingVertical: 8,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  inputIcon: {
    marginRight: 8,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: "#333",
    minHeight: 48,
    paddingVertical: 8,
  },
  multilineTextInput: {
    minHeight: 120,
    maxHeight: 200,
    textAlignVertical: "top",
    paddingTop: 12,
  },
  characterCount: {
    fontSize: 12,
    color: "#999",
    textAlign: "right",
    marginTop: 4,
  },
  selectedImageContainer: {
    marginBottom: 20,
  },
  imagePreview: {
    position: "relative",
    borderRadius: 12,
    overflow: "hidden",
  },
  selectedImage: {
    width: "100%",
    height: 200,
    borderRadius: 12,
  },
  removeImageButton: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    borderRadius: 16,
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  addPhotoButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  addPhotoText: {
    flex: 1,
    fontSize: 16,
    color: "#333",
    marginLeft: 12,
  },
  tipsSection: {
    backgroundColor: "#E8F5E8",
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#179574",
    marginBottom: 8,
  },
  tipsText: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
    marginBottom: 4,
  },
  actionButtonsContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  draftButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    marginRight: 12,
  },
  draftButtonText: {
    fontSize: 14,
    color: "#666",
    marginLeft: 8,
  },
  postButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#179574",
    paddingVertical: 12,
    borderRadius: 8,
  },
  postButtonDisabled: {
    backgroundColor: "#A0A0A0",
  },
  postButtonText: {
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "bold",
    marginLeft: 8,
  },
  bottomPadding: {
    height: 50,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  imageOptionsContent: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  imageOptionsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
  },
  imageOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  imageOptionText: {
    fontSize: 16,
    color: "#333",
    marginLeft: 16,
  },
  cancelOption: {
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 10,
  },
  cancelOptionText: {
    fontSize: 16,
    color: "#FF6B6B",
    fontWeight: "600",
  },
})

export default CreatePostScreen
