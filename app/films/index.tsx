import React, { useEffect } from 'react'
import { COLORS } from '@/constants/colors'
import {FlatList, RefreshControl, StyleSheet , Text, View} from 'react-native';
import {Film} from '@/types/interfaces';
import { useState } from 'react';
import {FilmItem} from '@/app/films/FilmItem';
import {ListEmptyComponent} from '@/components/ListEmptyComponent';



const films = () => {
    const [films, setFilms] = useState<Film[]>([]);
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(false);

    const fetchFilms = async () => {
        setLoading(true);
        try{
            const response = await fetch('https://swapi.dev/api/films/');
            const data = await response.json();
            console.log('fetchFilms data:', data);
            setFilms(data.results);
        } catch (error){
            console.error(error);
        } finally{
            setLoading(false);
            setRefreshing(false);
        }
    };
useEffect(() => {
    fetchFilms();
}, []);



const onRefresh = () => {
    setRefreshing(true);
    fetchFilms();
}

  return (
    <View style={styles.container}>
      <FlatList
      data={films}
      keyExtractor={(item) => item.episode_id.toString()}
      renderItem={({item}) => <FilmItem item={item}/>} 
      refreshControl={
        <RefreshControl
        refreshing={refreshing}
        onRefresh={fetchFilms}
        tintColor={COLORS.text}
        />
      }
      ListEmptyComponent={<ListEmptyComponent loading={loading} message='No films foound   '/>}
       />
    </View>
  )
}

export default films
const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: COLORS.containerBackground,
    }
});