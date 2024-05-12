import { View, Image, StyleSheet, Dimensions } from 'react-native'
import {  Text } from 'react-native-paper';
import { LineChart } from 'react-native-chart-kit';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';


const Graph = ({item}) => {
    const nutritionData = item.nutritionData; 
    const vitaminData = item.vitaminData; 

    // สร้าง labels และ data จากข้อมูลที่ได้
    const nutritionLabels = nutritionData.map(data => data.label);
    const nutritionValues = nutritionData.map(data => data.value);

    const vitaminLabels = vitaminData.map(data => data.label);
    const vitaminValues = vitaminData.map(data => data.value);
    return (
        <View style={{ marginBottom:20 }}>
            <View style={styles.iconContainer}>
                <Icon name="heart" size={24} color="#900" style={{ marginRight: 5 }} />
                <Text style={{ fontWeight: 'bold', fontSize: 19 }}>กราฟแสดงปริมาณสารอาหาร</Text>
            </View>
            <LineChart
                data={{
                    labels: nutritionLabels,
                    datasets: [{ data: nutritionValues }]
                }}
                width={Dimensions.get("window").width} // from react-native
                height={220}
                yAxisInterval={1} // optional, defaults to 1
                chartConfig={{
                    backgroundColor: "#fff", // เปลี่ยนเป็นสีชมพูพาสเทล
                    backgroundGradientFrom: "#FF69B4", // เปลี่ยนเป็นสีชมพูพาสเทล
                    backgroundGradientTo: "#FF69B4",
                    decimalPlaces: 2, // optional, defaults to 2dp
                    
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    style: {
                        borderRadius: 16,
                        fontWeight:'bold'
                    },
                    propsForDots: {
                        r: "6",
                        strokeWidth: "2",
                        stroke: "#FF0000",
                    },
                    propsForLabels:{
                        fontWeight:'bold'
                    },
                    yAxisLabel:["500","400","300","200"],
                    labelFontSize:100
                }}
                bezier
                
                style={{
                    marginVertical: 8,
                    borderRadius: 20,
                    marginRight: 30,
                    marginLeft: 15,
                }}
            />
            <View style={styles.iconContainer}>
                <Icon name="heart" size={24} color="#900" style={{ marginRight: 5 }} />
                <Text style={{ fontWeight: 'bold', fontSize: 19 }}>กราฟแสดงปริมาณวิตามิน</Text>
            </View>
            <LineChart
                data={{
                    labels: vitaminLabels,
                    datasets:[{ data: vitaminValues }]
                }}
                width={Dimensions.get("window").width} // from react-native
                height={220}
                yAxisLabel=""
                yAxisSuffix=""
                yAxisInterval={1} // optional, defaults to 1
                chartConfig={{
                    backgroundColor: "#1E90FF",
                    backgroundGradientFrom: "#1E90FF", // เปลี่ยนเป็นสีฟ้าเข้ม
                    backgroundGradientTo: "#1E90FF",
                    decimalPlaces: 1, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    style: {
                        borderRadius: 16,
                        fontWeight:'bold',
                    },
                    propsForDots: {
                        r: "6",
                        strokeWidth: "2",
                        stroke: "#FF0000",
                    },
                    propsForLabels:{
                        fontWeight:'bold',
                    },
                    yAxisLabel:["500","400","300","200"],
                }}
                bezier
                style={{
                    marginVertical: 8,
                    marginHorizontal: 0,
                    borderRadius: 16,
                    marginRight: 30,
                    marginLeft: 15,
                    
                  }}
            />

        </View>

    );
}
const styles = StyleSheet.create({
    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 10,
        marginLeft:18
    }

});
export default Graph;
