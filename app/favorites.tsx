import { View, Text, StyleSheet, FlatList, RefreshControl, TouchableOpacity } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { Film } from '@/types/interfaces';
import {FAVORITES_KEY} from '@/constants/keys';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {COLORS} from '@/constants/colors';
import { FilmItem } from './films/FilmItem';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from 'expo-router';

const Page = () => {
  const [favorites, setFavorites] = useState<Film[]>([]);
  const [refreshing, setRefreshing] = useState(false);

const fetchFavorites = async () => {
  try{
    const favorites = await AsyncStorage.getItem(FAVORITES_KEY);
    if (favorites) {
        setFavorites(JSON.parse(favorites));
    }
}
catch(error){
    console.error(error);
} finally {
    setRefreshing(false);
}

};

useFocusEffect(
  useCallback(() => {
    fetchFavorites();
  }, [])
);


const onRefresh = () => {
  setRefreshing(true);
  fetchFavorites();
};

const removeFavorite = async (film: Film) => {
  const updateFavorites = favorites.filter((f) => f.episode_id !== film.episode_id);
  await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updateFavorites));
  setFavorites(updateFavorites);

  try {
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updateFavorites));
  } catch (error) {
    console.error(error);
  }
};

const renderItem = ({item}: {item: Film}) => (
  <View style={styles.itemContainer}>
    <Text style={styles.itemText}>{item.title}</Text>
    <TouchableOpacity onPress={() => removeFavorite(item)}>
    <Ionicons name="trash-outline" size={24} color={COLORS.text}/>
    </TouchableOpacity>
  </View>
);

  return (
    <View style={styles.contatiner}>
      <FlatList
      data={favorites} 
      keyExtractor={(item) => item.episode_id.toString()} 
      renderItem={renderItem} 
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={COLORS.text}/>}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  contatiner: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: COLORS.itemBackground,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
  },
  itemText: {
    fontSize: 16,
    color: COLORS.text,
  },

})
export default Page;