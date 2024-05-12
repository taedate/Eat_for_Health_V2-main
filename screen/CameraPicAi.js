import  { useState } from 'react';
import { Button, Image, View, StyleSheet, Text, TouchableOpacity, Modal, ActivityIndicator } from 'react-native'; // เพิ่ม Modal และ ActivityIndicator
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import { Appbar} from "react-native-paper";
import axios from 'axios';

const CameraPicAi = () => {
    const [image, setImage] = useState(null);
    const [response, setResponse] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(false); // เพิ่ม state เพื่อตรวจสอบว่ากำลังโหลดหรือไม่
    const navigation = useNavigation();
    const Home = () => {
        navigation.navigate("Main");
    };

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        console.log(result);
    
        if (!result.canceled) {
          setImage(result.assets[0].uri);
        }
      };

      const sendMessage = async () => {
        try {
            setModalVisible(true);
            setLoading(true); // เริ่มโหลด
            const base64String = await FileSystem.readAsStringAsync(image, { encoding: FileSystem.EncodingType.Base64 });
            console.log(base64String);
            const response = await axios.post(
                'https://api.openai.com/v1/chat/completions',
                {
                    max_tokens: 2000,
                    model: "gpt-4-turbo",
                    messages: [
                        {
                            role: 'user',
                            content: [
                                {
                                    type: 'text',
                                    text: 'นี้คือรูปอาหาร จงตอบว่าอาหารชนิดนี้มีสารอาหารครบ 5 หมู่ไหม? และควรกินอะไรเพื่อให้ครบ 5 หมู่',
                                },
                                {
                                    type: 'image_url',
                                    image_url: {
                                        url: `data:image/jpeg;base64,${base64String}`,
                                    },
                                },
                            ],
                        },
                    ],
                },
                {
                    headers: {
                        Authorization: `Bearer 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`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            setResponse(response.data.choices[0].message.content);
            navigation.navigate("OutputAiPic", { response: response.data.choices[0].message.content, image: image });
        } catch (error) {
            console.error('Error sending message to ChatGPT:', error);
        } finally {
            setLoading(false); // สิ้นสุดการโหลด
            setModalVisible(false);
        }
    }

  return (
    <View style={{ flex:1 }}>
        <Appbar.Header style={{ backgroundColor:'#f48fb1' }}>
                <Appbar.BackAction
                    onPress={Home}
                    mode="small"
                    color='#fff'
                />
                <Appbar.Content title="KidsCusineHub AI UpLoad Image" color='#fff' />
            </Appbar.Header>
        <View style={styles.container}>
            <View style={styles.imgBox}>
                {image && <Image source={{ uri: image }} style={styles.image} />}
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
                <TouchableOpacity onPress={pickImage} style={{ padding:10, backgroundColor:'#f48fb1', margin:20, borderRadius:20}}>
                    <Text style={{color:'#fff', fontSize:20, fontWeight:'bold', color:'#fff'}}>Pick Image</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setImage(null)} style={{ padding:10, backgroundColor:'#f48fb1', margin:20, borderRadius:20}}>
                    <Text style={{color:'#fff', fontSize:20, fontWeight:'bold', color:'#fff'}}>Reset</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={sendMessage} style={{ marginTop:10 }}>
                <Text style={{color:'#fff', fontSize:20, fontWeight:'bold', color:'#f48fb1'}}>Sent to Chat-GPT</Text>
            </TouchableOpacity>

            {/* Modal เพื่อแสดงข้อความรอการตอบกลับ */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.modalBackground}>
                    <View style={styles.activityIndicatorWrapper}>
                        <ActivityIndicator size="large" color="#0000ff" animating={loading} />
                        {loading && <Text>Please wait...</Text>}
                    </View>
                </View>
            </Modal>
        </View>
    </View>
    
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 0,
      alignItems: "center",
      justifyContent: "center",
      padding:20
    },
    image: {
      width: 300,
      height: 300,
      borderRadius: 10,
      borderWidth: 5,
      padding:'10px',
      alignItems: 'center',
      
    },
    imgBox: {
        width: '100%',
        height: 400,
        borderWidth: 5, // ความกว้างของเส้นกรอบ
        borderColor: 'pink', // สีของเส้นกรอบ
        padding:'10px',
        alignItems: 'center',
        justifyContent:'center',
        borderRadius: '10px',
        backgroundColor:'pink'
    },
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    activityIndicatorWrapper: {
        backgroundColor: '#FFFFFF',
        height: 100,
        width: 200,
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
});

export default CameraPicAi;
