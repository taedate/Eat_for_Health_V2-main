import { View, Text, TouchableOpacity, StyleSheet, ScrollView, FlatList, TextInput, Image} from 'react-native'
import { Card } from 'react-native-paper';
import React, { useState } from 'react'
import { categoriesData } from './index'
import { useNavigation } from '@react-navigation/native'

const Menu = ({ navigation }) => {
  const navigate  = useNavigation();
  const [searchText, setSearchText] = useState('');
  const [newCategoriesData, setcategoriesData] = useState(categoriesData);
  const onPress = (cat) => {
    navigation.navigate('MenuScreen', cat, navigation)
  }

  const searchFunction = (text) => {
    setSearchText(text);
    text = text.toLowerCase();
    if (text === "") {
      setcategoriesData(categoriesData);
    }
    else {
      let filteredLanguages = categoriesData.filter(categoriesData => (categoriesData.name.toLowerCase().startsWith(text)))
      setcategoriesData(filteredLanguages);
    }
  }
  
  
  return (
    <View >
      <View>
        <Text style={{ fontSize:20, fontWeight:'bold' , marginBottom:10}}>Most Dish</Text>
        <ScrollView horizontal style={styles.trend}>
            {
              categoriesData.map((cat,index) =>{
                return (
                  <TouchableOpacity key={index} style={styles.touchableOpacity} 
                    onPress={() => onPress(cat)}
                    >
                    <View style={styles.flex}>
                      <Image source={ cat.image } style={{height:100, width:100, borderRadius:50}} />
                    </View>
                    <Text style={{ fontSize:15 , marginBottom:10}}>
                      Top {index+1}
                    </Text>
                  </TouchableOpacity>
                )
              })
            }
          </ScrollView>
        </View>
      
        <TextInput
          style={styles.input}
          onChangeText={text => searchFunction(text)}
          value={searchText}
          placeholder='Search food'
        />
        <FlatList
          numColumns={2}
          columnWrapperStyle={{gap:15, paddingHorizontal:0, marginVertical:10}}
          keyExtractor={(item) => item.id} 
          data={newCategoriesData}
          extraData={ newCategoriesData }
          scrollEnabled={false}
          style={styles.Flat}
          renderItem={({item}) => { 
            return(
              <TouchableOpacity key={item} style={styles.touchableOpacity} 
                onPress={() => onPress(item)}>
                <Card style={styles.card}>
                  <Card.Cover source={ item.image } style={styles.img} />
                  <Card.Content style={styles.content}>
                    <Text style={styles.text} numberOfLines={2}>{item.name}</Text>
                    <Text style={styles.detail} numberOfLines={2}></Text>
                  </Card.Content>
                </Card>
              </TouchableOpacity>
            );
          }}
          
        />
        
    </View>
  )
}

const styles = StyleSheet.create({
  img: {
    height:200,
    width:185,
    borderRadius:10
  },
  flex: {
    marginRight:10
  },
  touchableOpacity: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    flexWrap: 'wrap'
  },
  menu: {
    marginTop: 20,
    padding:20,
  },
  Flat:{
    marginTop:5
  },
  content: {
    padding: 10,
  },
  input: {
    justifyContent: 'center',
    height: 40,
    width: 386,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
  },
  detail: {
    flexWrap: 'wrap'
  },
  card:{
    height: 300,
    width: 185,
  }
})


export default Menu