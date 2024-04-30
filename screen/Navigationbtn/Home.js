import { View, Text, StyleSheet, Image, ScrollView} from 'react-native'
import React from 'react'
import Menu from '../constants/Menu';


const Home = ({navigation}) => {
  return (
    <View style={styles.menu}>
      <View style={styles.logo}>
        <Image source={require('../../img/childrenEat.jpeg')} style={{ width:60, height: 50, borderRadius:20,marginRight: 10,marginTop: 40,}}/>
        <Text style={{ fontSize:30 ,fontWeight:'bold', alignItems:'center', justifyContent:'center',marginTop: 40, color:'#fff'}}>EatForHeath</Text>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false} 
       showsHorizontalScrollIndicator={false}
       style={{ padding:20 }}
       >
        <Menu navigation={navigation} />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  menu: {
    flex:1
  },
  input: {
    justifyContent: 'center',
    height: 40,
    width: 386,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
  },
  logo: {
    flexDirection: 'row',
    justifyContent: 'between',
    alignItems: 'center',
    height:'15%',
    padding:20,
    backgroundColor: '#f48fb1'
  }
})


export default Home