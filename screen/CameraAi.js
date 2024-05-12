import { View, Text, StyleSheet, Image, Modal } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import * as MediaLibrary from 'expo-media-library';
import { Camera } from 'expo-camera';
import CameraButton from './Components/CameraButton';
import * as FileSystem from 'expo-file-system';
import { useNavigation } from '@react-navigation/native';
import { Appbar} from "react-native-paper";
import axios from 'axios';

const CameraAi = () => {
    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [imageUri, setImageUri] = useState(null);
    const [response, setResponse] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const cameraRef = useRef(null);
    const navigation = useNavigation();

    useEffect(() => {
        (async () => {
            await MediaLibrary.requestPermissionsAsync();
            const cameraStatus = await Camera.requestCameraPermissionsAsync();
            setHasCameraPermission(cameraStatus.status === 'granted');
        })();
    }, []);

    const takePicture = async () => {
        if (cameraRef) {
            try {
                const data = await cameraRef.current.takePictureAsync();
                setImageUri(data.uri);
            } catch (error) {
                console.log(error);
            }
        }
    };

    const sendMessage = async () => {
        try {
            setModalVisible(true);
            const base64String = await FileSystem.readAsStringAsync(imageUri, { encoding: FileSystem.EncodingType.Base64 });
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
            console.log(imageUri)
            navigation.navigate("OutputAICMR", { response: response.data.choices[0].message.content, imageUri: imageUri });
        } catch (error) {
            console.error('Error sending message to ChatGPT:', error);
        } finally {
            setModalVisible(false);
        }
    }

    const Home = () => {
        navigation.navigate("Main");
    };

    if (hasCameraPermission === false) {
        return <Text>No access to camera</Text>;
    }

    const ModalView = () => (
        <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
                <Text style={{ fontSize:20, fontWeight:'bold' }}>กรุณารอสักครู่..</Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <Appbar.Header style={{ backgroundColor:'#f48fb1' }}>
                <Appbar.BackAction
                    onPress={Home}
                    mode="small"
                    color='#fff'
                />
                <Appbar.Content title="KidsCusineHub AI Camera" color='#fff' />
            </Appbar.Header>
            {!imageUri ?
                <Camera
                    style={styles.camera}
                    ref={cameraRef}>
                </Camera>
                :
                <Image source={{ uri: imageUri }} style={styles.camera} />
            }
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(false);
                }}
            >
                <ModalView />
            </Modal>
            <View>
                {imageUri ?
                    <View
                        style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 50 }}>
                        <CameraButton title={'Re-Take'} icon={"camera"} onPress={() => setImageUri(null)} />
                        <CameraButton title={'Sent to Chat-GPT'} icon={"camera"} onPress={sendMessage} />
                    </View>
                    :
                    <CameraButton title={'Take a picture'} icon={"camera"} onPress={takePicture} />
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#fff',
        padding: 0,
    },
    camera: {
        flex: 5,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 30,
        borderRadius: 10,
    },
});

export default CameraAi;
