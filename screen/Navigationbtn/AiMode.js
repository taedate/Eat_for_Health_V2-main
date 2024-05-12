import { View, Text, Pressable, StyleSheet, Image} from 'react-native'
import React from 'react'

const AiMode = ({navigation}) => {
    const Ai = () => {
        navigation.navigate('FormFood')
      }
      const CameraAi = () => {
        navigation.navigate('CameraAi')
      }
      const CameraPicAi = () => {
        navigation.navigate('CameraPicAi')
      }
  return (
    <View style={styles.menu}>
      <View style={styles.logo}>
        <Image source={require('../../img/childrenEat.jpeg')} style={{ width:60, height: 50, borderRadius:20,marginRight: 10,marginTop: 40,}}/>
        <Text style={{ fontSize:30 ,fontWeight:'bold', alignItems:'center', justifyContent:'center',marginTop: 40, color:'#fff'}}>KidsCusineHub</Text>
      </View>
      <View style={{ flexDirection:'column', justifyContent:'space-around' ,height:'100%', padding:20, flex:1}}>
        <Pressable onPress={Ai}>
            <Image source={require('../../img/1.png')} style={{ width:'100%', height: 200, borderRadius:20}}/>
        </Pressable>
        <Pressable onPress={CameraAi}>
            <Image source={require('../../img/2.png')} style={{ width:'100%', height: 200, borderRadius:20}}/>
        </Pressable>
        <Pressable onPress={CameraPicAi}>
            <Image source={require('../../img/3.png')} style={{ width:'100%', height:200, borderRadius:20}}/>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  menu: {
    flex:1
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


export default AiMode