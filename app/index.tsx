import { StyleSheet, Text, View, StatusBar, TextInput, Platform, Pressable, ScrollView, ActivityIndicator, Alert, Keyboard } from "react-native";
import { MaterialIcons } from '@expo/vector-icons'
import { useState } from 'react'
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Slider from '@react-native-community/slider';

const statusBarHeight = StatusBar.currentHeight
const GEMINI_API_KEY = 'AIzaSyAeUT2e9nSnv8KymTBSfexqTmlkCjXhgy0';

export default function App() {
    
    const [city, setCity] = useState("");
    const [days, setDays] = useState(1);
    const [loading, setLoading] = useState(false);
    const [travel, setTravel] = useState("");

    

    async function handleGenerate() {
        if (city === "") {
            Alert.alert("Atenção", "Preencha o nome da cidade!");
            return;
        }
    
        setTravel("");
        setLoading(true);
        Keyboard.dismiss();
    
        const prompt = `Crie um roteiro para uma viagem de exatos ${days.toFixed(0)} dias na cidade de ${city}, busque por lugares turisticos, lugares mais visitados, seja preciso nos dias de estadia fornecidos e limite o roteiro apenas na cidade fornecida. Forneça apenas em tópicos com nome do local onde ir em cada dia.`
    
        fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                contents: [
                    {
                        parts: [{ text: prompt }]
                    }
                ]
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data); // Log da resposta

            // Verifique se a resposta contém o conteúdo esperado
        if (data && data.candidates && data.candidates.length > 0) {
            const content = data.candidates[0].content;

            // Verifique se 'content.parts' é um array
        if (Array.isArray(content.parts)) {
            // Defina o tipo de 'part' explicitamente
            const fullText = content.parts.map((part: { text: string }) => part.text).join("\n\n");
            setTravel(fullText);
            } else {
                console.error("O formato do conteúdo não é uma string:", content);
                Alert.alert("Erro", "Formato inesperado do conteúdo retornado pela API.");
            }
        } else {
            console.error("Dados da resposta não estão no formato esperado:", data);
            Alert.alert("Erro", "Não foi possível gerar o roteiro.");
        }
    })
    .catch(error => {
        console.log(error);
        Alert.alert("Erro", "Houve um erro ao acessar a API.");
    })
    .finally(() => {
        setLoading(false);
    });
}
    

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
        <View style={styles.container}>
        <StatusBar barStyle="dark-content" translucent={true} backgroundColor="#F1F1F1" />
        <Text style={styles.heading}>WanderGuide.IA</Text>

        <View style={styles.form}>
            <Text style={styles.label}>Informe a cidade de destino</Text>
            <TextInput
                placeholderTextColor={"#000"}
                placeholder="Ex: Curitiba, PR"
                style={styles.input}
                value={city}
                onChangeText={ (text) => setCity(text)}
            />

            <Text style={styles.label}>Tempo de estadia: <Text style={styles.days}> {days.toFixed(0)} </Text> dias</Text>
            <Slider
                minimumValue={1}
                maximumValue={7}
                minimumTrackTintColor="#009688"
                maximumTrackTintColor="#000000"
                value={days}
                onValueChange={ (value) => setDays(value)}
            />
        </View>
        
        <Pressable style={styles.button} onPress={handleGenerate}>
            <Text style={styles.buttonText}>Gerar roteiro</Text>
            <MaterialIcons name="travel-explore" size={24} color="#FFF"/>
        </Pressable>

        <ScrollView contentContainerStyle={{ paddingBottom: 18, marginTop: 4, }} style={styles.containerScroll} showsVerticalScrollIndicator={false}>
            {loading && (
                <View style={styles.content}>
                    <Text style={styles.title}>Carregando roteiro...</Text>
                    <ActivityIndicator color="#000" size="large"/>
                </View>
            )}
            
            {travel && (
                <View style={styles.content}>
                    <Text style={styles.title}>Roteiro da sua viagem 🧳</Text>
                {travel
                .replace(/#/g, '')  // Remove todos os #
                .replace(/\*\*/g, '')  // Remove todos os **
                .split('\n')
                .map((line, index) => {

        // Negrito para os títulos de "Dia"
        if (line.toLowerCase().includes("dia")) {
            return (
            <Text key={index} style={styles.dayTitle}>
                {line.trim()}
            </Text>
            );
        }

        // Negrito para os períodos "Manhã", "Tarde", "Noite"
        if (line.toLowerCase().includes("manhã") || line.toLowerCase().includes("tarde") || line.toLowerCase().includes("noite")) {
            return (
            <Text key={index} style={styles.periodTitle}>
              {line.trim().replace('*', '')} {/* Remove o * */}
            </Text>
            );
        }

        // Adicionar emojis ou bullets para as atividades
        if (line.trim() !== '') {
            return (
            <Text key={index} style={styles.activityText}>
              👉 {line.trim().replace('*', '')} {/* Remove o * e adiciona emoji */}
            </Text>
            );
        }
        return null;
        })}
    </View>
)}
    </ScrollView>
        </View>
            </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#f1f1f1',
        alignItems: 'center',
        paddingTop: 20,
    },
    heading:{
        fontSize: 32,
        fontWeight: 'bold',
        paddingTop: Platform.OS === 'android' ? statusBarHeight : 54
    },
    form:{
        backgroundColor: '#FFF',
        width: '90%',
        borderRadius: 8,
        padding: 16,
        marginTop: 16,
        marginBottom: 8,
    },
    label:{
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 8,
    },
    input:{
        borderWidth: 1,
        borderRadius: 4,
        borderColor: '#94a3b8',
        padding: 8,
        fontSize: 16,
        marginBottom: 16,
    },
    days:{
        backgroundColor: "F1F1F1"
    },
    button: {
        backgroundColor: '#FF5656',
        width: '90%',
        borderRadius: 8,
        flexDirection: 'row',
        padding: 14,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
    },
    buttonText:{
        fontSize: 18,
        color: "#FFF",
        fontWeight: 'bold'
    },
    content:{
        backgroundColor: '#FFF',
        padding: 16,
        width: '100%',
        marginTop: 16,
        borderRadius: 8,
    },
    title:{
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 14

    },
    containerScroll:{
        width: '90%',
        marginTop: 8,
    },
    travelText:{
        fontSize: 16,
        lineHeight: 24,
        marginBottom: 8,
        color: '#333',
    },
    dayTitle: {
        fontWeight: 'bold',
        fontSize: 18,
        marginVertical: 10,
    },
        periodTitle: {
        fontWeight: 'bold',
        fontSize: 16,
        marginVertical: 5,
    },
        activityText: {
        fontSize: 14,
        marginVertical: 2,
    },
    
    
});