import { useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import DatePicker from "react-native-ui-datepicker";
import Octicons from "react-native-vector-icons/Octicons";

const ItineraryScreen = () => {
  const [date, setDate] = useState(null);
  const [open, setOpen] = useState(false);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={styles.headerText}>Start to plan your trip!</Text>

      <View style={styles.dateWrapper}>
        <Octicons name="home" color="#000" size={24} style={{ marginRight: 10 }} />

        <TouchableOpacity onPress={() => setOpen(true)}>
          <Text style={styles.dateText}>
            {date ? date.toISOString().split("T")[0] : "Add starting date"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Modal for DatePicker */}
      <Modal visible={open} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.pickerContainer}>
            <DatePicker
              mode="single"
              date={date || new Date()}
              display="spinner"
              minDate={new Date(2000, 0, 1)} // allow past if you want
              maxDate={new Date(2100, 11, 31)} // allow many years into future
              onChange={({ date: selectedDate }) => {
                setDate(selectedDate);
                setOpen(false);
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ItineraryScreen;

const styles = StyleSheet.create({
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  dateWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    paddingHorizontal: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  pickerContainer: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
});
