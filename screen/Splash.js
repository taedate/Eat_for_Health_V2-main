import { View, ImageBackground, StyleSheet, TouchableOpacity, Text} from 'react-native'
import React from 'react'

const Splash = ({navigation}) => {
  const Main = () => {
    navigation.navigate('Main')
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../img/Splash.png")}
        style={styles.image}
      >
        <TouchableOpacity style={styles.button} onPress={(Main)}>
          <Text style={styles.buttonText}>Enter to KidsCusineHub</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#e0b2c6',
    padding: 10,
    borderRadius: 10,
    margin: 20,
  },
  buttonText: {
    color: 'black',
    fontSize: 20,
  },
  
})


export default Splash