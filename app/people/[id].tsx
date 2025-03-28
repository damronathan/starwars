import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS } from '@/constants/colors';
import { useLocalSearchParams } from 'expo-router';
import { People, Film, Species, Planet, Starship, Vehicle } from '@/types/interfaces';



const Page = () => {
    const {id} = useLocalSearchParams();
    const [person, setPerson] = useState<People | null>(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchPerson = async () => {
            try{
                const response = await fetch(`https://swapi.dev/api/people/${id}`);
                const data = await response.json();
                setPerson(data);
            } catch (error){
                console.error(error);
            } finally{
                setLoading(false);
            }
        }

        fetchPerson();    
    }, [id]);
    
    

    if (loading) {
            return (
            <View>
            <Text style={{color: '#fff'}}>Loading...</Text>
            </View>
            );
        }
        if (!person){
            return (
                <View>
                    <Text style={{color: '#fff'}}>Character not found</Text>
                </View>
            );
        }
        


  return (
    <ScrollView style={styles.container}>            
          <Text style={styles.name}>{person.name}</Text>     
          <Text style={styles.details}>Height: {person.height}</Text>     
          <Text style={styles.details}>Mass: {person.mass}</Text>     
          <Text style={styles.details}>Hair Color: {person.hair_color}</Text>     
          <Text style={styles.details}>Skin Color: {person.skin_color}</Text>     
          <Text style={styles.details}>Eye Color: {person.eye_color}</Text>     
          <Text style={styles.details}>Birth Year: {person.birth_year}</Text>     
          <Text style={styles.details}>Gender: {person.gender}</Text>                  
        </ScrollView>
  )
}

export default Page
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: COLORS.containerBackground,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORS.text,
        marginBottom: 16,
    },
    details: {
        fontSize: 16,
        color: 'white',
        marginBottom: 8,
    },
    
})