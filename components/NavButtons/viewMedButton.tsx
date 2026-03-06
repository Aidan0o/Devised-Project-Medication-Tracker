import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text } from "react-native";


export default function  ViewMedButton(){

    const router = useRouter();
    

    return(
        <Pressable
        onPress={() => router.navigate('/viewPrescriptions')}
        style={({ pressed }) => [
            styles.unPressed,
            pressed && styles.pressed,
        ]}
        >
            <Text style={styles.text}>View Medication</Text>
        </Pressable>
    );
}                                                                           

const styles = StyleSheet.create({
    unPressed:{
        
        backgroundColor: '#89CFF0',
        borderColor: '#6EBCF3',
        borderRadius: 15,
        borderBottomWidth: 4,
        borderRightWidth: 4,
        color: 'white',
        height: 70,
        width:160,
        alignItems: 'center',
        justifyContent: 'center'
    },

    pressed:{
        opacity: .6,
        // backgroundColor: 'blue',
        color: 'black',
        height: 68,
        width:158,
    },
    text:{
        color: '#2c2c2c',
        fontSize: 16,
        fontWeight: 'bold',
        letterSpacing: 0.5,
        // fontFamily: 'Lexend_700Bold'             
    },

});