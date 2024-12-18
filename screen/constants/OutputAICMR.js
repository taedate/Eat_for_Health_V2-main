import { View, Text, StyleSheet ,ScrollView, Image} from "react-native";
import { useNavigation } from '@react-navigation/native';
import { Appbar } from "react-native-paper";
import Icon from 'react-native-vector-icons/FontAwesome';
import React from 'react'

const OutputAICMR = ({ route }) => {
    const { response, imageUri } = route.params; // รับค่า imageUri จาก route params
    const navigation = useNavigation();
    const Home = () => {
        navigation.navigate("Main");
    };

    return (
        <View>
            <Appbar.Header style={styles.Appbar}>
                <Appbar.BackAction
                    onPress={Home}
                    mode="small"
                    color="#fff"
                />
                <Appbar.Content title="KidsCusineHub AI Camera" color="#fff" />
                <Icon name="cutlery" size={24} color="#fff" style={{ marginRight: 5 }} />
            </Appbar.Header>
            <ScrollView style={{ height:"100%", padding:20}}>
                <Image source={{ uri: imageUri }} style={styles.Image}/>
                <Text style={styles.Content}>{response}</Text>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    Appbar: {
        padding: 10,
        backgroundColor: "#f48fb1",
    },
    container: {
        height: "100%",
        backgroundColor: "#f8bbd0",
        flex:1
    },
    Image: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
        borderRadius:20,
    },
    Content: {
        marginTop: 20,
        fontSize: 16,
    },
});

export default OutputAICMR;
