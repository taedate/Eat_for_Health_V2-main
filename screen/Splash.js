import { View, Image} from 'react-native'
import React from 'react'
import { Button } from '@rneui/themed';


const Splash = ({navigation}) => {
  const onPress = () => {
    navigation.navigate('Main')
  }
  return (
    <View style={{ height: "100%", alignItems:"center"}}>
      <View style={{ flex: 0.95, justifyContent:"center", alignItems:"center"}} >
        <Image source={require('../img/logo.png')} style={{ width:170 , height: 100, borderRadius:20}}/>
        <Button
            buttonStyle={{
              backgroundColor: 'rgba(111, 202, 186, 1)',
              borderRadius: 5,
            }}
            titleStyle={{ fontWeight: 'bold', fontSize: 23 }}
              containerStyle={{
                marginHorizontal: 50,
                height: 50,
                width: 200,
                marginVertical: 10,
              }}
            loading={false}
            loadingProps={{ size: 'small', color: 'white' }}
            title="Get Start"
            onPress={onPress}
        />
      </View>
    </View>
  )
}


export default Splash