import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Share, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Dashboard({ navigation }) {
  const [itemCount, setItemCount] = useState(0);
  const [shoppingList, setShoppingList] = useState([]);

  // Load shopping list from AsyncStorage
  const loadItems = async () => {
    try {
      const existingItems = await AsyncStorage.getItem('shoppingList');
      if (existingItems) {
        const items = JSON.parse(existingItems);
        setShoppingList(items);
        setItemCount(items.length); // Set the number of items
      } else {
        setItemCount(0); // Set to 0 if no items exist
        setShoppingList([]); // Empty array if no items
      }
    } catch (error) {
      console.error('Failed to load items from AsyncStorage', error);
    }
  };

  useEffect(() => {
    loadItems(); // Update count when component mounts
  }, []); // Run only once when the component mounts

  // Function to share the shopping list
  const shareShoppingList = async () => {
    try {
      const existingItems = await AsyncStorage.getItem('shoppingList');
      let shoppingList = existingItems ? JSON.parse(existingItems) : [];
  
      // Ensure it's an array
      if (!Array.isArray(shoppingList)) {
        console.error('shoppingList is not an array');
        shoppingList = []; // Default to empty array
      }
  
      const currentDate = new Date().toLocaleDateString();
  
      let tableContent = `Shopping List - ${currentDate}\n\n`;
      tableContent += `No.  Item Name           Quantity    Unit\n`;
      tableContent += `-----------------------------------------\n`;
  
      shoppingList.forEach((item, index) => {
        if (item && item.name && item.quantity && item.unit) {
          const itemName = item.name.padEnd(20, ' ');
          const quantity = item.quantity.toString().padEnd(10, ' ');
          const unit = item.unit.padEnd(10, ' ');
          tableContent += `${index + 1}.   ${itemName} ${quantity} ${unit}\n`;
        } else {
          console.warn('Invalid item:', item);
        }
      });
  
      const result = await Share.share({
        message: tableContent,
      });
  
      if (result.action === Share.sharedAction) {
        console.log('Shopping list shared successfully');
      } else if (result.action === Share.dismissedAction) {
        console.log('Share action dismissed');
      }
    } catch (error) {
      console.error('Error sharing the shopping list:', error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <Text style={styles.greeting}>Welcome to Your Shopping List!</Text>
        <Text style={styles.dashboardTitle}>Your Dashboard Overview</Text>

        {/* Shopping List Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Shopping List Overview</Text>
          <Text style={styles.cardContent}>Total items: {itemCount}</Text>

          <TouchableOpacity
            style={styles.cardButton}
            onPress={() => navigation.navigate('ShoppingList')}>
            <Text style={styles.cardButtonText}>View Shopping List</Text>
          </TouchableOpacity>
        </View>

        {/* Share Shopping List Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Share Your Shopping List</Text>
          <TouchableOpacity
            style={styles.cardButton}
            onPress={shareShoppingList}>
            <Text style={styles.cardButtonText}>Share List</Text>
          </TouchableOpacity>
        </View>

        {/* Add New Item Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Add a New Item</Text>
          <TouchableOpacity
            style={styles.cardButton}
            onPress={() => navigation.navigate('AddItem')}>
            <Text style={styles.cardButtonText}>Add Item</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Footer with About Us */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>About Us</Text>
        <Text style={styles.footerDescription}>
          This app helps you create and manage your shopping lists with ease. You can add, view, and keep track of your items quickly!
        </Text>
        <TouchableOpacity onPress={() => alert('Thank you for using our app ❤️ Developed by Sankarshan Sinha')}>
          <Text style={styles.footerLink}>Learn More</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F4F7FC',
  },
  scrollViewContainer: {
    paddingBottom: 80, // Give space for footer at the bottom
  },
  greeting: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#1E2A78',
    textAlign: 'center',
    marginVertical: 15,
  },
  dashboardTitle: {
    fontSize: 22,
    color: '#333',
    textAlign: 'center',
    marginBottom: 25,
    fontWeight: '600',
  },
  card: {
    backgroundColor: '#fff',
    padding: 25,
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4, // For Android shadow effect
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  cardContent: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  cardButton: {
    backgroundColor: '#1E2A78',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 30,
    alignItems: 'center',
  },
  cardButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
    position: 'absolute',
    bottom: 0,
    left: 20,
    right: 20,
  },
  footerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E2A78',
    textAlign: 'center',
    marginBottom: 10,
  },
  footerDescription: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginBottom: 15,
  },
  footerLink: {
    fontSize: 16,
    color: '#1E2A78',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default Dashboard;
