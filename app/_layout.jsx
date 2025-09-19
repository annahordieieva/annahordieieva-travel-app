// app/_layout.js (or Layout.js)
import { AntDesign } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

function Header() {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>Waya</Text>
    </View>
  );
}

function Footer() {
  const router = useRouter();

  return (
    <View style={styles.footer}>
      {/* Left button */}
      <TouchableOpacity onPress={() => router.push("screens/explore")}>
        <Text style={styles.textButton}>Explore</Text>
      </TouchableOpacity>

      {/* Center Add Trip button */}
      <TouchableOpacity style={styles.addButton} onPress={() => router.push("screens/itinerary")}>
        <AntDesign name="plus" size={16} color="#fff" style={{ marginRight: 8 }} />
        <Text style={styles.addButtonText}>Add Trip</Text>
      </TouchableOpacity>

      {/* Right button */}
      <TouchableOpacity onPress={() => router.push("screens/mytrips")}>
        <Text style={styles.textButton}>My Trips</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function Layout() {
  return (
    <View style={{ flex: 1 }}>
      <Header />

      {/* Stack content */}
      <View style={{ flex: 1 }}>
        <Stack screenOptions={{ headerShown: false }} />
      </View>

      {/* Footer */}
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 10,
    backgroundColor: "#320BBE",
  },
  headerText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around", // buttons spaced evenly
    alignItems: "center",
    paddingVertical: 25,
    backgroundColor: "#320BBE",
  },
  textButton: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#000",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
