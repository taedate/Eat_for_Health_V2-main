import React, { useState, useEffect} from "react";
import { View, Text, StyleSheet , ActivityIndicator} from "react-native";
import { useNavigation } from '@react-navigation/native';
import { Appbar, Card } from "react-native-paper";
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from "axios";

const OutputAI = (props) => {
  const navigation = useNavigation();
  const Home = () => {
    navigation.navigate("Main");
  };
  const [response, setResponse] = useState("");
  const [showCard, setShowCard] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasSentMessage, setHasSentMessage] = useState(false);
  const sendMessage = async () => {
    setLoading(true); // Set loading to true when sending message
    const message = props.route.params;
    console.log(message);
    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          max_tokens: 1500,
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: "You are a helpful assistant.",
            },
            {
              role: "user",
              content: message,
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer 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`,
            "Content-Type": "application/json",
          },
        }
      );
      setResponse(response.data.choices[0].message.content);
      setShowCard(true); // Show card when response received
    } catch (error) {
      console.error("Error sending message to ChatGPT:", error);
    } finally {
      setLoading(false); // Set loading to false when response is received or error occurs
    }
  };
  useEffect(() => {
    if (!hasSentMessage) {
      sendMessage();
      setHasSentMessage(true);
    }
  }, []);
  return (
    <View>
      <Appbar.Header style={styles.Appbar}>
        <Appbar.BackAction
          onPress={Home}
          mode="small"
          color="#fff"
        />
        <Appbar.Content title="EatForHealth AI FormFood" color="#fff" /><Icon name="cutlery" size={24} color="#fff" style={{ marginRight: 5 }} />
      </Appbar.Header>
      <View style={styles.container}>
        {loading && (
          <ActivityIndicator
            size="large"
            color="#0000ff"
            style={styles.loadingIndicator}
          />
        )}
        {showCard && (
          <Card style={styles.Card}>
            <Card.Content>
              <Text style={styles.Content}>{response}</Text>
            </Card.Content>
          </Card>
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  Appbar: {
    padding: 10,
    backgroundColor: "#f48fb1",
  },
  container: {
    height: "100%",
    backgroundColor: "#f8bbd0",
    alignItems: "center",
  },
  loadingIndicator: {
    marginTop: 20,
  },
  Card:{
    padding:10,
  },
  Content: {
    fontSize: 16,
  },
});
export default OutputAI;