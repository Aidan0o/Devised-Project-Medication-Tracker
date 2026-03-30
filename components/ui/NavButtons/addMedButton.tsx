import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text } from "react-native";


export default function  addMedButton(){

    const router = useRouter();
    

    return(
        <Pressable
        onPress={() => router.navigate('/addPrescription')}
        style={({ pressed }) => [
            styles.unPressed,
            pressed && styles.pressed,
        ]}
        >
            <Text style={styles.text}>Add Medication</Text>
        </Pressable>
    );
}                                                                           

const styles = StyleSheet.create({
    unPressed:{
        backgroundColor: '#8BF582',
        borderColor: '#5FF153',
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
        color: 'black',
        height: 68,
        width:158,
    },
    text:{
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
        letterSpacing: 0.5,           
    },

});