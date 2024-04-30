import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import {
  Appbar,
  TextInput,
  RadioButton,
} from "react-native-paper";
import axios from "axios";

const FormFood = ({ navigation }) => {
  const OutputAI = () => {
    navigation.navigate("OutputAI", message);
  };
  // FORM GPT
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [response, setResponse] = useState("");
  const [value, setValue] = useState("ชาย");
  const [showCard, setShowCard] = useState(false);
  const [loading, setLoading] = useState(false);
  const message = `เด็กอายุ:${age}, น้ำหนัก:${weight}, ส่วนสูง:${height} เพศ:${value} ควรกินอาหารอย่างไรให้ครบ 5หมู่แบบละเอียด พร้อมยกตัวอย่างอาหาร(ไทย)มา 5 อย่าง`;
  const sendMessage = async () => {
    setLoading(true); // Set loading to true when sending message
    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          max_tokens: 1500,
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: "นักโภชนาการอาหารเด็ก",
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

    setAge("");
    setHeight("");
    setWeight("");
  };
  return (
    <View style={{ alignContent:'center', flex:1}}>
      <Appbar.Header style={styles.Appbar}>
        <Appbar.BackAction onPress={() => navigation.goBack()} mode="small" color="#FFF"/>
        <Appbar.Content title="AI MODE" color="#fff"/>
      </Appbar.Header>
      <View style={styles.container}>
        <Text style={styles.label}>อายุของน้อง (Age):</Text>
        <TextInput
          style={styles.input}
          value={age}
          onChangeText={setAge}
          keyboardType="default"
        />
        <Text style={styles.label}>น้ำหนักของน้อง (Weight):</Text>
        <TextInput
          style={styles.input}
          value={weight}
          onChangeText={setWeight}
          keyboardType="default"
        />
        <Text style={styles.label}>ส่วนสูงของน้อง (Height):</Text>
        <TextInput
          style={styles.input}
          value={height}
          onChangeText={setHeight}
          keyboardType="default"
        />
        <Text style={styles.label}>เพศของน้อง (Gender):</Text>
        <RadioButton.Group
          onValueChange={(newValue) => setValue(newValue)}
          value={value}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent:"space-around",
              alignItems: "center",
              width: "50%",
            }}
            >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <RadioButton value="ชาย" backgroundColor='#ffff'/>
              <Text style={styles.radioText}>ชาย</Text>
            </View>
            <View style={{flexDirection: "row", alignItems: "center"}}>
              <RadioButton value="หญิง" backgroundColor='#ffff'/>
              <Text style={styles.radioText}>หญิง</Text>
            </View>
          </View>
        </RadioButton.Group>
        <TouchableOpacity
          onPress={OutputAI}
          disabled={loading}
          style={[
            styles.button,
            {
              backgroundColor: loading ? "#ccc" : "#fff",
            },
          ]}
        >
          <Text style={styles.buttonText}>ยืนยันการกรอกข้อมูล</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  label: {
    fontSize: 22,
    marginBottom: 20,
    marginTop: 20,
  },
  input: {
    height: 40,
    width: '100%',
    alignItems:"center",
    justifyContent:"center",
    borderWidth: 1,
    backgroundColor:'#fff',
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 5,
    marginBottom: 10,
  },
  Appbar: {
    backgroundColor: "#f48fb1",
  },
  container: {
    height: "100%",
    flex:1,
    backgroundColor: "#f8bbd0",
    alignItems: "center",
    padding:20
  },
  loadingIndicator: {
    marginTop: 20,
  },
  button: {
    padding: 15,
    borderRadius: 5,
    marginTop: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
  },
  radioText: {
    fontSize: 18,
    marginLeft: 10,
  },
});
export default FormFood;