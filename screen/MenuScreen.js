import { View, StyleSheet, FlatList, ScrollView } from 'react-native'
import { Card, Text, Appbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

const MenuScreen = (props) => {
  const navigation = useNavigation();
  const item = props.route.params;
  return (

    <View style={{ flex: 1 }}>
      <Appbar.Header style={styles.Appbar}>
        <Appbar.BackAction onPress={() => navigation.goBack()} mode="small" />
        <Appbar.Content title="Home" />
      </Appbar.Header>
    <ScrollView style={{ height:'100%' }}>
        <Card style={{ }}>
          <Card.Cover source={item.image} style={styles.img} />
          <Card.Content style={styles.content}>
            <View style={styles.iconContainer}>
              <Icon name="cutlery" size={24} color="#900" style={{ marginRight: 5 }} />
              <Text style={styles.text}>{item.name}</Text>
            </View>
            <View style={{ height: 10 }}></View>
            <View style={styles.iconContainer}>
              <Icon name="shopping-basket" size={24} color="#006400" style={{ marginRight: 5 }} />
              <Text style={{ fontWeight: 'bold', fontSize: 19 }}>วัตถุดิบ</Text>
            </View>

            <FlatList
              numColumns={1}
              keyExtractor={(item) => item.id}
              data={item.ingrediant}
              scrollEnabled={false}
              style={styles.Flat}
              renderItem={({ item }) => (
                <View style={styles.ingredientItem}>
                  <Text style={{ fontSize: 17, paddingLeft: 32 }}>{item.name}</Text>
                </View>
              )}
            />
            <View style={{ height: 10 }}></View>
            <View style={styles.iconContainer}>
              <Icon name="spoon" size={24} color="#900" style={{ marginRight: 5 }} />
              <Text style={{ fontWeight: 'bold', fontSize: 19 }}>วิธีทำ</Text>

            </View>

            <View style={{ height: 10 }}></View>
            <Text style={{ fontSize: 17, paddingLeft: 32 }}>{item.detail}</Text>
          </Card.Content>
        </Card>
      </ScrollView>
    </View>

  );
}

const styles = StyleSheet.create({
  img: {
    height: 350,
    width: '100%',
    borderRadius: 10
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    padding: 15,
  },
  ingredientItem: {
    flexDirection: 'row',
    alignItems: 'center',

  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  }

});

export default MenuScreen;
