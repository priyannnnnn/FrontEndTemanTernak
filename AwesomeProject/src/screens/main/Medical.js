"use client"

import { useState } from "react"
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  FlatList,
  SafeAreaView,
} from "react-native"
import LinearGradient from "react-native-linear-gradient"
import Icon from "react-native-vector-icons/MaterialIcons"

const Medical = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState("diseases")
  const [searchText, setSearchText] = useState("")
  const [expandedDisease, setExpandedDisease] = useState(null)

  const diseases = [
    {
      id: 1,
      name: "Newcastle Disease (ND) / Tetelo",
      cause: "Virus Newcastle Disease",
      symptoms: [
        "Susah bernafas, ngorok",
        "Lesu, batuk, bersin",
        "Mata mengantuk",
        "Feses encer kehijauan",
        "Sayap terkulai",
        "Jalan mundur/berputar",
        "Kepala menunduk/memutar ke belakang",
      ],
      treatment:
        "Tidak ada obat spesifik untuk virus ND, penanganan berupa pencegahan dengan vaksinasi dan meningkatkan daya tahan tubuh puyuh. Segera isolasi puyuh sakit dan lakukan sanitasi kandang.",
      medicines: ["Vaksin ND untuk pencegahan", "Vita Stress untuk meningkatkan daya tahan tubuh"],
      severity: "Tinggi",
      image: require("../../image/ternak.png"),
      type: "Virus",
    },
    {
      id: 2,
      name: "Avian Influenza (AI) / Flu Burung",
      cause: "Virus Avian Influenza",
      symptoms: [
        "Kematian mendadak massal",
        "Lesu, hilang nafsu makan",
        "Bulu rontok",
        "Pembengkakan kepala/kelopak mata",
        "Pendarahan kulit/kaki",
        "Penurunan produksi telur",
      ],
      treatment:
        "Tidak ada obat untuk AI, lakukan pencegahan dengan biosekuriti ketat, vaksinasi, dan segera musnahkan puyuh yang mati.",
      medicines: ["Vaksin AI untuk pencegahan", "Suplemen imunostimulan untuk daya tahan tubuh"],
      severity: "Tinggi",
      image: require("../../image/ternak.png"),
      type: "Virus",
    },
    {
      id: 3,
      name: "Infectious Bronchitis",
      cause: "Virus Infectious Bronchitis",
      symptoms: [
        "Lesu, mata/hidung berlendir",
        "Badan gemetar",
        "Batuk/ngorok",
        "Sulit bernafas, bersin",
        "Kerabang telur tipis/tidak berkerabang",
      ],
      treatment:
        "Tidak ada obat spesifik, lakukan vaksinasi dan sanitasi kandang. Berikan suplemen untuk mempercepat pemulihan.",
      medicines: ["Vaksin IB untuk pencegahan", "Suplemen vitamin dan mineral"],
      severity: "Sedang",
      image: require("../../image/ternak.png"),
      type: "Virus",
    },
    {
      id: 4,
      name: "Infectious Coryza (Snot)",
      cause: "Bakteri Avibacterium paragallinarum",
      symptoms: [
        "Pembengkakan muka (sinus infraorbitalis)",
        "Mata berair",
        "Lendir/kotoran dari hidung",
        "Bau menyengat",
      ],
      treatment: "Isolasi puyuh sakit, berikan antibiotik sesuai anjuran, lakukan sanitasi kandang.",
      medicines: ["Therapy", "Neo Meditril", "Trimezyn", "Doctril (3-5 hari)"],
      severity: "Sedang",
      image: require("../../image/ternak.png"),
      type: "Bakteri",
    },
    {
      id: 5,
      name: "Quail Enteritis",
      cause: "Infeksi bakteri/virus pada saluran pencernaan",
      symptoms: ["Lesu, mata tertutup", "Bulu kusam", "Feses cair mengandung asam urat putih"],
      treatment: "Berikan antibiotik spektrum luas, jaga kebersihan kandang dan air minum.",
      medicines: ["Therapy", "Neo Meditril (antibiotik spektrum luas)"],
      severity: "Sedang",
      image: require("../../image/ternak.png"),
      type: "Bakteri/Virus",
    },
    {
      id: 6,
      name: "Salmonellosis (Pullorum/Berak Kapur)",
      cause: "Bakteri Salmonella pullorum",
      symptoms: [
        "Nafsu makan menurun",
        "Feses putih seperti kapur menempel di dubur",
        "Sayap menggantung",
        "Suka bergerombol",
        "Hati kuning dan keras",
      ],
      treatment: "Isolasi puyuh sakit, berikan antibiotik, lakukan sanitasi ketat.",
      medicines: ["Trimezyn", "Doctril"],
      severity: "Tinggi",
      image: require("../../image/ternak.png"),
      type: "Bakteri",
    },
    {
      id: 7,
      name: "Koksidiosis",
      cause: "Parasit Eimeria tenella",
      symptoms: ["Lesu, sayap terkulai", "Bulu kasar", "Nafsu makan rendah", "Menggigil", "Feses encer berdarah"],
      treatment: "Berikan obat anti-koksidia, jaga kebersihan kandang dan air minum.",
      medicines: ["Obat anti-koksidia (coccidiostat) sesuai anjuran dokter hewan"],
      severity: "Sedang",
      image: require("../../image/ternak.png"),
      type: "Parasit",
    },
  ]

  const medicines = [
    {
      id: 1,
      name: "Vita Stress",
      producer: "Medion",
      type: "Suplemen",
      usage: "Meningkatkan daya tahan tubuh dan mengatasi stress",
      image: require("../../image/pakan12.png"),
      price: "Rp 25.000",
      diseases: ["Newcastle Disease", "Avian Influenza"],
    },
    {
      id: 2,
      name: "Therapy",
      producer: "Mensana",
      type: "Antibiotik",
      usage: "Pengobatan infeksi bakteri spektrum luas",
      image: require("../../image/pakan12.png"),
      price: "Rp 45.000",
      diseases: ["Infectious Coryza", "Quail Enteritis"],
    },
    {
      id: 3,
      name: "Neo Meditril",
      producer: "Medion",
      type: "Antibiotik",
      usage: "Pengobatan infeksi bakteri dan enteritis",
      image: require("../../image/pakan12.png"),
      price: "Rp 35.000",
      diseases: ["Infectious Coryza", "Quail Enteritis"],
    },
    {
      id: 4,
      name: "Trimezyn",
      producer: "Sanbe",
      type: "Antibiotik",
      usage: "Pengobatan salmonellosis dan infeksi bakteri",
      image: require("../../image/pakan12.png"),
      price: "Rp 40.000",
      diseases: ["Infectious Coryza", "Salmonellosis"],
    },
    {
      id: 5,
      name: "Doctril",
      producer: "Romindo",
      type: "Antibiotik",
      usage: "Pengobatan infeksi saluran pernapasan dan pencernaan",
      image: require("../../image/pakan12.png"),
      price: "Rp 38.000",
      diseases: ["Infectious Coryza", "Salmonellosis"],
    },
    {
      id: 6,
      name: "Vaksin ND",
      producer: "Medion",
      type: "Vaksin",
      usage: "Pencegahan Newcastle Disease",
      image: require("../../image/pakan12.png"),
      price: "Rp 15.000",
      diseases: ["Newcastle Disease"],
    },
    {
      id: 7,
      name: "Vaksin AI",
      producer: "Medion",
      type: "Vaksin",
      usage: "Pencegahan Avian Influenza",
      image: require("../../image/pakan12.png"),
      price: "Rp 20.000",
      diseases: ["Avian Influenza"],
    },
    {
      id: 8,
      name: "Coccidiostat",
      producer: "Medion",
      type: "Anti Koksidiosis",
      usage: "Pencegahan dan pengobatan koksidiosis",
      image: require("../../image/pakan12.png"),
      price: "Rp 30.000",
      diseases: ["Koksidiosis"],
    },
  ]

  const producers = [
    { id: 1, name: "Medion", logo: require("../../image/pakan12.png"), products: 15 },
    { id: 2, name: "Mensana", logo: require("../../image/pakan12.png"), products: 12 },
    { id: 3, name: "Sanbe", logo: require("../../image/pakan12.png"), products: 8 },
    { id: 4, name: "Romindo", logo: require("../../image/pakan12.png"), products: 10 },
  ]

  const DiseaseCard = ({ disease }) => {
    const isExpanded = expandedDisease === disease.id

    return (
      <TouchableOpacity style={styles.card} onPress={() => setExpandedDisease(isExpanded ? null : disease.id)}>
        <View style={styles.cardHeader}>
          <Image source={disease.image} style={styles.cardImage} />
          <View style={styles.cardInfo}>
            <Text style={styles.cardTitle}>{disease.name}</Text>
            <View style={styles.diseaseMetaContainer}>
              <View
                style={[
                  styles.severityBadge,
                  {
                    backgroundColor:
                      disease.severity === "Tinggi" ? "#FF5252" : disease.severity === "Sedang" ? "#FFC107" : "#4CAF50",
                  },
                ]}
              >
                <Text style={styles.severityText}>{disease.severity}</Text>
              </View>
              <View style={[styles.typeBadge, { backgroundColor: getTypeColor(disease.type) }]}>
                <Text style={styles.typeText}>{disease.type}</Text>
              </View>
            </View>
          </View>
          <Icon name={isExpanded ? "expand_less" : "expand_more"} size={24} color="#666" />
        </View>

        <Text style={styles.causeText}>
          <Text style={styles.boldText}>Penyebab: </Text>
          {disease.cause}
        </Text>

        {isExpanded && (
          <View style={styles.expandedContent}>
            <View style={styles.symptomsContainer}>
              <Text style={styles.sectionTitle}>Gejala:</Text>
              {disease.symptoms.map((symptom, index) => (
                <Text key={index} style={styles.symptomText}>
                  • {symptom}
                </Text>
              ))}
            </View>

            <View style={styles.treatmentContainer}>
              <Text style={styles.sectionTitle}>Cara Menyembuhkan:</Text>
              <Text style={styles.treatmentText}>{disease.treatment}</Text>
            </View>

            <View style={styles.medicinesContainer}>
              <Text style={styles.sectionTitle}>Rekomendasi Obat:</Text>
              {disease.medicines.map((medicine, index) => (
                <Text key={index} style={styles.medicineText}>
                  • {medicine}
                </Text>
              ))}
            </View>
          </View>
        )}
      </TouchableOpacity>
    )
  }

  const MedicineCard = ({ medicine }) => (
    <TouchableOpacity style={styles.card}>
      <View style={styles.cardHeader}>
        <Image source={medicine.image} style={styles.medicineImage} />
        <View style={styles.cardInfo}>
          <Text style={styles.cardTitle}>{medicine.name}</Text>
          <Text style={styles.producerText}>{medicine.producer}</Text>
          <View style={styles.typeBadge}>
            <Text style={styles.typeText}>{medicine.type}</Text>
          </View>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.priceText}>{medicine.price}</Text>
        </View>
      </View>
      <Text style={styles.usageText}>{medicine.usage}</Text>
      {medicine.diseases && (
        <View style={styles.diseasesContainer}>
          <Text style={styles.diseasesTitle}>Untuk penyakit:</Text>
          <View style={styles.diseasesTagsContainer}>
            {medicine.diseases.map((disease, index) => (
              <View key={index} style={styles.diseaseTag}>
                <Text style={styles.diseaseTagText}>{disease}</Text>
              </View>
            ))}
          </View>
        </View>
      )}
    </TouchableOpacity>
  )

  const ProducerCard = ({ producer }) => (
    <TouchableOpacity style={styles.producerCard}>
      <Image source={producer.logo} style={styles.producerLogo} />
      <Text style={styles.producerName}>{producer.name}</Text>
      <Text style={styles.producerProducts}>{producer.products} produk</Text>
    </TouchableOpacity>
  )

  const getTypeColor = (type) => {
    switch (type) {
      case "Virus":
        return "#FF6B6B"
      case "Bakteri":
        return "#4ECDC4"
      case "Parasit":
        return "#9C27B0"
      case "Bakteri/Virus":
        return "#FF9800"
      default:
        return "#179574"
    }
  }

  const filteredDiseases = diseases.filter(
    (disease) =>
      disease.name.toLowerCase().includes(searchText.toLowerCase()) ||
      disease.cause.toLowerCase().includes(searchText.toLowerCase()),
  )

  const filteredMedicines = medicines.filter(
    (medicine) =>
      medicine.name.toLowerCase().includes(searchText.toLowerCase()) ||
      medicine.type.toLowerCase().includes(searchText.toLowerCase()),
  )

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={["#179574", "#20c498"]} style={styles.header}>
        <Text style={styles.headerTitle}>Pusat Kesehatan Ternak</Text>
        <Text style={styles.headerSubtitle}>Panduan lengkap penyakit dan pengobatan puyuh</Text>
      </LinearGradient>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Cari penyakit atau obat..."
          value={searchText}
          onChangeText={setSearchText}
        />
        <TouchableOpacity style={styles.scanButton}>
          <Icon name="camera_alt" size={20} color="#179574" />
        </TouchableOpacity>
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "diseases" && styles.activeTab]}
          onPress={() => setActiveTab("diseases")}
        >
          <Icon name="coronavirus" size={18} color={activeTab === "diseases" ? "#FFFFFF" : "#666"} />
          <Text style={[styles.tabText, activeTab === "diseases" && styles.activeTabText]}>Penyakit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "medicines" && styles.activeTab]}
          onPress={() => setActiveTab("medicines")}
        >
          <Icon name="medication" size={18} color={activeTab === "medicines" ? "#FFFFFF" : "#666"} />
          <Text style={[styles.tabText, activeTab === "medicines" && styles.activeTabText]}>Obat-obatan</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "producers" && styles.activeTab]}
          onPress={() => setActiveTab("producers")}
        >
          <Icon name="business" size={18} color={activeTab === "producers" ? "#FFFFFF" : "#666"} />
          <Text style={[styles.tabText, activeTab === "producers" && styles.activeTabText]}>Produsen</Text>
        </TouchableOpacity>
      </View>

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <TouchableOpacity style={styles.quickActionButton}>
          <LinearGradient colors={["#F8CE5A", "#F3B93D"]} style={styles.quickActionGradient}>
            <Icon name="emergency" size={24} color="#FFFFFF" />
          </LinearGradient>
          <Text style={styles.quickActionText}>Darurat</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.quickActionButton}>
          <LinearGradient colors={["#FF6B6B", "#FF5252"]} style={styles.quickActionGradient}>
            <Icon name="schedule" size={24} color="#FFFFFF" />
          </LinearGradient>
          <Text style={styles.quickActionText}>Jadwal Vaksin</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.quickActionButton}>
          <LinearGradient colors={["#4ECDC4", "#44A08D"]} style={styles.quickActionGradient}>
            <Icon name="health_and_safety" size={24} color="#FFFFFF" />
          </LinearGradient>
          <Text style={styles.quickActionText}>Tips Sehat</Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {activeTab === "diseases" && (
          <View>
            <Text style={styles.sectionTitle}>Penyakit Umum Puyuh ({filteredDiseases.length})</Text>
            {filteredDiseases.map((disease) => (
              <DiseaseCard key={disease.id} disease={disease} />
            ))}
          </View>
        )}

        {activeTab === "medicines" && (
          <View>
            <Text style={styles.sectionTitle}>Obat-obatan Ternak ({filteredMedicines.length})</Text>
            {filteredMedicines.map((medicine) => (
              <MedicineCard key={medicine.id} medicine={medicine} />
            ))}
          </View>
        )}

        {activeTab === "producers" && (
          <View>
            <Text style={styles.sectionTitle}>Produsen Obat Ternak</Text>
            <FlatList
              data={producers}
              renderItem={({ item }) => <ProducerCard producer={item} />}
              keyExtractor={(item) => item.id.toString()}
              numColumns={2}
              columnWrapperStyle={styles.producerRow}
              scrollEnabled={false}
            />
          </View>
        )}
      </ScrollView>

      {/* Emergency Button */}
      <TouchableOpacity style={styles.emergencyFab}>
        <LinearGradient colors={["#FF6B6B", "#FF5252"]} style={styles.emergencyGradient}>
          <Icon name="local_hospital" size={28} color="#FFFFFF" />
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
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: "#333",
  },
  scanButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: "#F8CE5A",
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
    paddingVertical: 10,
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: "#179574",
  },
  tabText: {
    marginLeft: 6,
    fontSize: 12,
    fontWeight: "600",
    color: "#666",
  },
  activeTabText: {
    color: "#FFFFFF",
  },
  quickActions: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  quickActionButton: {
    alignItems: "center",
  },
  quickActionGradient: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  quickActionText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
  },
  content: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
  },
  card: {
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
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  cardImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
  },
  medicineImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 12,
  },
  cardInfo: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  diseaseMetaContainer: {
    flexDirection: "row",
    gap: 8,
  },
  severityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  severityText: {
    fontSize: 10,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  typeBadge: {
    backgroundColor: "#F8CE5A",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  typeText: {
    fontSize: 10,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  causeText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
    lineHeight: 20,
  },
  boldText: {
    fontWeight: "bold",
    color: "#333",
  },
  expandedContent: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
  },
  symptomsContainer: {
    marginBottom: 16,
  },
  treatmentContainer: {
    marginBottom: 16,
  },
  medicinesContainer: {
    marginBottom: 8,
  },
  symptomText: {
    fontSize: 13,
    color: "#666",
    marginBottom: 4,
    lineHeight: 18,
  },
  treatmentText: {
    fontSize: 13,
    color: "#666",
    lineHeight: 18,
  },
  medicineText: {
    fontSize: 13,
    color: "#179574",
    marginBottom: 4,
    lineHeight: 18,
    fontWeight: "500",
  },
  producerText: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
  },
  priceContainer: {
    alignItems: "flex-end",
  },
  priceText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#179574",
  },
  usageText: {
    fontSize: 14,
    color: "#666",
    fontStyle: "italic",
    marginBottom: 12,
  },
  diseasesContainer: {
    marginTop: 8,
  },
  diseasesTitle: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  diseasesTagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  diseaseTag: {
    backgroundColor: "#E8F5E8",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  diseaseTagText: {
    fontSize: 10,
    color: "#179574",
    fontWeight: "600",
  },
  producerCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    flex: 1,
    margin: 6,
  },
  producerLogo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 12,
  },
  producerName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  producerProducts: {
    fontSize: 12,
    color: "#666",
  },
  producerRow: {
    justifyContent: "space-between",
  },
  emergencyFab: {
    position: "absolute",
    bottom: 90,
    right: 20,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  emergencyGradient: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
})

export default Medical
