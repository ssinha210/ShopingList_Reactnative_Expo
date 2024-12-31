import React from 'react';
import { Share, Platform } from 'react-native';

// Function to share the shopping list
export const shareShoppingList = async (shoppingList) => {
  try {
    // Get the current date
    const currentDate = new Date().toLocaleDateString();

    // Create the table header
    let tableContent = `Shopping List - ${currentDate}\n\n`;
    tableContent += `No.  Item Name           Quantity\n`;
    tableContent += `----------------------------------\n`;

    // Add items to the table
    shoppingList.forEach((item, index) => {
      const itemName = item.name.padEnd(20, ' '); // Align the item name
      const quantity = item.quantity.toString().padEnd(10, ' '); // Align the quantity
      tableContent += `${index + 1}.   ${itemName} ${quantity}\n`;
    });

    // Open the share dialog with the formatted message
    const result = await Share.share({
      message: tableContent, // Share the formatted table as a message
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
