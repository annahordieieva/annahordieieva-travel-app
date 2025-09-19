import { Entypo } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
    FlatList,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

const ExploreScreen = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false); // toggle state

  // Fetch countries from REST API
  const fetchCountries = async (search) => {
    if (!search) {
      setResults([]);
      return;
    }

    try {
      const response = await fetch(
        `https://restcountries.com/v3.1/name/${search}`
      );
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error("Error fetching countries:", error);
      setResults([]);
    }
  };

  useEffect(() => {
    fetchCountries(query);
  }, [query]);

  const handleSearchPress = () => {
    // toggle dropdown when tapping inside search bar
    setIsOpen((prev) => !prev);
  };

  const handleResultPress = (countryName) => {
    setQuery(countryName);
    setIsOpen(false); // close after selection
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 50 }}>
      {/* Welcome text */}
      <Text style={styles.headerText}>Welcome!</Text>
      <Text style={styles.regularText}>
        Explore the world,{"\n"}
        plan your itinerary and find top activities{"\n"}
        along the way!{"\n"}
      </Text>

      <Text style={styles.mediumText}>Where to?</Text>

      {/* Search bar + scrollable results */}
      <View style={styles.searchWrapper}>
        <TouchableOpacity
          activeOpacity={1}
          style={styles.searchBar}
          onPress={handleSearchPress}
        >
          <Entypo
            name="location-pin"
            size={24}
            color="#000"
            style={{ marginRight: 10 }}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search destination..."
            value={query}
            onChangeText={(text) => {
              setQuery(text);
              if (!isOpen) setIsOpen(true); // open when typing
            }}
          />
        </TouchableOpacity>

        {/* Scrollable search results */}
        {isOpen && results.length > 0 && (
          <View style={styles.resultsContainer}>
            <ScrollView style={{ maxHeight: 200 }}>
              {results.map((item) => (
                <TouchableOpacity
                  key={item.cca3}
                  style={styles.resultItem}
                  onPress={() => handleResultPress(item.name.common)}
                >
                  <Text style={styles.resultText}>{item.name.common}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}
      </View>

      <Text style={styles.mediumText}>Plan your trip to</Text>

      {/* Horizontal favorites scroll */}
      <FlatList
        data={["France", "Spain", "Belgium", "Croatia", "Italy", "Switzerland", "Portugal"]}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        style={{ marginVertical: 10 }}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.favoriteItem}>
            <View style={styles.favoriteCircle}>
            </View>
            <Text style={styles.favoriteLabel}>{item}</Text>
          </TouchableOpacity>
        )}
      />

      <Text style={styles.mediumText}>Top must-visit experiences</Text>
    </ScrollView>
  );
};

export default ExploreScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 80,
    backgroundColor: "#fff",
    flex: 1,
  },
  headerText: {
    fontSize: 35,
    fontWeight: "bold",
    marginBottom: 10,
  },
  regularText: {
    fontSize: 14,
    color: "#320BBE",
    fontWeight: "bold",
    lineHeight: 20,
    marginBottom: 30,
  },
  mediumText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  searchWrapper: {
    position: "relative",
    width: "100%",
    marginBottom: 20,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#320BBE",
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 5,
    width: 300,
    backgroundColor: "#fff",
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  resultsContainer: {
    position: "absolute",
    top: 55,
    width: 300,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#320BBE",
    borderRadius: 10,
    zIndex: 999,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  resultItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  resultText: {
    fontSize: 16,
  },
  favoriteItem: {
    alignItems: "center",
    marginRight: 15,
  },
  favoriteCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#320BBE",
    justifyContent: "center",
    alignItems: "center",
  },
  favoriteText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
  },
  favoriteLabel: {
    marginTop: 5,
    fontSize: 12,
    color: "#000",
    textAlign: "center",
  },
});
