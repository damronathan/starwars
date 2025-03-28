import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { People } from '@/types/interfaces';
import { Link } from 'expo-router';
import { COLORS } from '@/constants/colors';




export const PeopleItem: React.FC<{item: People}> = ({item}) => {
    const id = item.url.split('/').filter(Boolean).pop();
  return (
    <Link href={{ pathname: "/people/[id]", params: { id: String(id) } }} asChild>
      <TouchableOpacity>
        <View style ={styles.peopleItem}>
          <Text style ={styles.peopleName}>{item.name}</Text>              
        </View>
      </TouchableOpacity>
    </Link>
  )
}

export default PeopleItem
const styles = StyleSheet.create({
  peopleItem:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: COLORS.itemBackground,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
  },
  peopleName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 8,
  },
});