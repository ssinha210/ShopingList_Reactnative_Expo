import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';  // Correct import

function AddItem({ navigation }) {
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('Piece'); // Default unit is Piece
  const [modalVisible, setModalVisible] = useState(false); // State for modal visibility

  const handleAddItem = async () => {
    if (itemName && quantity && unit) {
      const newItem = { name: itemName, quantity, unit };

      // Get the existing shopping list from AsyncStorage
      const existingItems = await AsyncStorage.getItem('shoppingList');
      let shoppingList = existingItems ? JSON.parse(existingItems) : [];

      // Add the new item to the list
      shoppingList.push(newItem);

      // Save the updated shopping list back to AsyncStorage
      await AsyncStorage.setItem('shoppingList', JSON.stringify(shoppingList));

      // Reset the input fields
      setItemName('');
      setQuantity('');
      setUnit('Piece'); // Reset the unit to default

      // Show success modal
      setModalVisible(true);
    }
  };

  // Handlers for modal options
  const handleGoToList = () => {
    setModalVisible(false);
    navigation.navigate('ShoppingList');
  };

  const handleGoToDashboard = () => {
    setModalVisible(false);
    navigation.navigate('Dashboard');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add a New Item</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter item name"
        value={itemName}
        onChangeText={setItemName}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter quantity"
        value={quantity}
        onChangeText={setQuantity}
        keyboardType="numeric"
      />
      <Text style={styles.label}>Select Unit</Text>
      <Picker
        selectedValue={unit}
        style={styles.picker}
        onValueChange={(itemValue) => setUnit(itemValue)}
      >
        <Picker.Item label="Piece" value="Piece" />
        <Picker.Item label="Kg" value="Kg" />
        <Picker.Item label="Gram" value="Gram" />
      </Picker>
      <TouchableOpacity style={styles.button} onPress={handleAddItem}>
        <Text style={styles.buttonText}>Add Item</Text>
      </TouchableOpacity>

      {/* Success Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.successText}>Item Added Successfully!</Text>
            <TouchableOpacity style={styles.modalButton} onPress={handleGoToList}>
              <Text style={styles.modalButtonText}>Go to Item List</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={handleGoToDashboard}>
              <Text style={styles.modalButtonText}>Go to Dashboard</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4A90E2',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    padding: 12,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  picker: {
    width: '80%',
    height: 50,
    marginBottom: 20,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#4A90E2',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },

  // Modal Styles
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Transparent background
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 25,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
  },
  successText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4CAF50', // Green for success
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#4A90E2',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    marginBottom: 15,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default AddItem;
