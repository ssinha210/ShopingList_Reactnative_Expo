import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from 'react-native';

function HomeScreen({ navigation }) {
  const [showImage, setShowImage] = useState(true);

  // Show the image for 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowImage(false); // Hide the image after 3 seconds
    }, 3000); // 3000 ms = 3 seconds

    return () => clearTimeout(timer); // Clear timer if component unmounts
  }, []);

  return (
    <View style={styles.container}>
      {showImage ? (
        <View style={styles.imageContainer}>
          <Image
            source={require('./assets/home.jpg')} // Ensure the path is correct
            style={styles.image}
          />
          <ActivityIndicator size="large" color="#FF6347" style={styles.loader} />
          <Text style={styles.welcomeText}>Welcome to Your Shopping List App</Text>
        </View>
      ) : (
        <>
          <Image
            source={require('./assets/logo.jpg')} // Ensure logo path is correct
            style={styles.logo}
          />
          <Text style={styles.subtitle}>Manage your shopping items effortlessly</Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.replace('Dashboard')} // Prevent back navigation
          >
            <Text style={styles.buttonText}>Go to Dashboard</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8', // Light background color for a clean look
    padding: 20,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',  // Set the image to take full width
    height: '100%', // Set the image to take full height
    position: 'absolute',  // Position the image in the background
    top: 0,
    left: 0,
    resizeMode: 'cover', // Scale the image proportionally to cover the entire container
  },
  loader: {
    position: 'absolute',  // Position the loader in the center of the image
  },
  welcomeText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FF6347', // Beautiful accent color for welcome text
    position: 'absolute', // Position it over the image
    top: '40%', // Position the text a bit lower in the image
    textAlign: 'center',
    width: '100%', // Ensure the text is centered
    fontFamily: 'Roboto', // Elegant font
    zIndex: 1, // Ensure the text is above the image
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
    resizeMode: 'contain', // Keep the logo proportions intact
  },
  subtitle: {
    fontSize: 16,
    color: '#888',
    marginBottom: 30,
    textAlign: 'center',
    fontFamily: 'Roboto', // Elegant font for subtitle
  },
  button: {
    backgroundColor: '#4A90E2', // Button color
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    elevation: 5, // Add shadow effect on Android
    shadowColor: '#000', // Shadow on iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default HomeScreen;
