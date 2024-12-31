import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Modal, StyleSheet, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function ShoppingList({ navigation }) {  // Accept navigation prop
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null); // Store selected item for modal
  const [modalVisible, setModalVisible] = useState(false);

  // Load shopping list from AsyncStorage
  useEffect(() => {
    const loadItems = async () => {
      try {
        const existingItems = await AsyncStorage.getItem('shoppingList');
        if (existingItems) {
          setItems(JSON.parse(existingItems));
        }
      } catch (error) {
        console.error('Failed to load items from AsyncStorage', error);
      }
    };

    loadItems();
  }, []); // Empty dependency array to run only once on component mount

  // Handle item click to open modal
  const handleItemClick = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  // Handle item bought status change
  const handleItemBought = async () => {
    const updatedItems = items.map((item) =>
      item.name === selectedItem.name ? { ...item, bought: !item.bought } : item
    );
    setItems(updatedItems); // Update state

    // Save updated items to AsyncStorage
    try {
      await AsyncStorage.setItem('shoppingList', JSON.stringify(updatedItems));
    } catch (error) {
      console.error('Failed to save updated shopping list', error);
    }
  };

  // Function to delete an item
  const deleteItem = async () => {
    const updatedItems = items.filter(item => item.name !== selectedItem.name); // Remove only the selected item
    setItems(updatedItems); // Update state

    // Save updated list to AsyncStorage
    try {
      await AsyncStorage.setItem('shoppingList', JSON.stringify(updatedItems));
      setModalVisible(false); // Close modal after deletion
    } catch (error) {
      console.error('Failed to save updated shopping list', error);
    }
  };

  // Calculate the count of bought and unbought items
  const boughtCount = items.filter(item => item.bought).length;
  const unboughtCount = items.length - boughtCount;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Dashboard')} style={styles.backButton}>
          <Text style={styles.backButtonText}>Back to Dashboard</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Your Shopping List</Text>
        <View style={styles.countContainer}>
          <Text style={styles.countText}>Bought: {boughtCount}</Text>
          <Text style={styles.countText}>Unbought: {unboughtCount}</Text>
        </View>
      </View>

      <FlatList
        data={items}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.item} onPress={() => handleItemClick(item)}>
            <Text style={[styles.itemText, item.bought && styles.itemBought]}>
              {item.name} - {item.quantity} {item.unit}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.name} // Use a unique identifier for each item (name in this case)
      />

      {/* Modal for item details */}
      {selectedItem && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>{selectedItem.name} Details</Text>
              <Text style={styles.modalText}>Quantity: {selectedItem.quantity}</Text>
              <Text style={styles.modalText}>Unit: {selectedItem.unit}</Text>

              {/* Check item as bought */}
              <TouchableOpacity
                style={[styles.checkButton, selectedItem.bought && styles.boughtButton]}
                onPress={handleItemBought}
              >
                <Text style={styles.checkButtonText}>
                  {selectedItem.bought ? 'Mark as Unbought' : 'Mark as Bought'}
                </Text>
              </TouchableOpacity>

              {/* Delete Button */}
              <TouchableOpacity style={styles.deleteButton} onPress={deleteItem}>
                <Text style={styles.deleteText}>Delete Item</Text>
              </TouchableOpacity>

              <Button title="Close" onPress={() => setModalVisible(false)} />
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f2f4f8',
    paddingTop: 40,
  },
  header: {
    backgroundColor: '#2C3E50',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 25,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  backButton: {
    marginBottom: 10,
  },
  backButtonText: {
    fontSize: 16,
    color: '#fff',
    textDecorationLine: 'underline',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  countContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  countText: {
    fontSize: 18,
    color: '#fff',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#ffffff',
    marginBottom: 12,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  itemText: {
    fontSize: 18,
    color: '#333',
    flex: 1,
  },
  itemBought: {
    textDecorationLine: 'line-through', // Strike-through for bought items
    color: '#28a745', // Green color for bought items
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 25,
    borderRadius: 10,
    width: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 18,
    color: '#333',
    marginBottom: 15,
  },
  checkButton: {
    backgroundColor: '#FF6F61',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginBottom: 15,
    alignItems: 'center',
  },
  boughtButton: {
    backgroundColor: '#28a745', // Green for bought items
  },
  checkButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  deleteButton: {
    backgroundColor: '#e74c3c',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginBottom: 15,
    alignItems: 'center',
  },
  deleteText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ShoppingList;
