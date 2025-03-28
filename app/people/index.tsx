import { View, TextInput, StyleSheet, FlatList, RefreshControl, SafeAreaView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { COLORS } from '@/constants/colors';
import { People } from '@/types/interfaces';
import {PeopleItem} from '@/app/people/PeopleItem';
import {ListEmptyComponent} from '@/components/ListEmptyComponent';
import { filter, includes } from 'lodash';


const people = () => { 
  const [people, setPeople] = useState<People[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState(false);
  const [filteredPeople, setFilteredPeople] = useState<People[]>([]);
  

  const fetchPeople = async () => {
    setLoading(true);
    try{
      const response = await fetch('https://swapi.dev/api/people/');
      const data = await response.json();
      setPeople(data.results);
      setFilteredPeople(data.results);
      

    } catch (error){
      console.error(error);
    } finally{
      setLoading(false);
      setRefreshing(false);
    }
  };
  useEffect(() => {
    fetchPeople();
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const formattedQuery = query.toLowerCase();
    const filteredPeople = filter(people, (person) => {
      return includes(person.name.toLowerCase(), formattedQuery);
    });
    setFilteredPeople(filteredPeople);
    };

    
  
  

  

  return (
    <SafeAreaView style={styles.container}>
      <TextInput style={styles.searchBar}
      placeholder='search characters'
      clearButtonMode='always'
      autoCapitalize="none"
      autoCorrect={false}
      value={searchQuery}
      onChangeText={(query) => handleSearch(query)}
      
      />
      <FlatList
      data={filteredPeople}
      keyExtractor={(item) => item.url}
      renderItem={({item}) => <PeopleItem item={item}/>}
      refreshControl={
        <RefreshControl
        refreshing={refreshing}
        onRefresh={fetchPeople}
        tintColor={COLORS.text}
        />
      }
      ListEmptyComponent={<ListEmptyComponent loading={loading} message='No people found'/>}      
      
      />

    </SafeAreaView>
      
  )
}

export default people;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.containerBackground,
  },
  searchBar: {
    textAlign: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: COLORS.text,
    borderRadius: 8,
  }
});