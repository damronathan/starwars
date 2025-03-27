import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { COLORS } from '@/constants/colors';

const people = () => {
  return (
    <View style={styles.container}>
      <Text>people</Text>
    </View>
  )
}

export default people
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.containerBackground,
  },
});