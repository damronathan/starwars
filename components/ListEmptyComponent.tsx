import { StyleSheet, View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
import { COLORS } from '@/constants/colors';

interface ListEmptyComponentProps {
    loading: boolean;
    message?: string;
};

export const ListEmptyComponent = ({loading, message = 'No items found'}: ListEmptyComponentProps) => {
  return (
    <View style={styles.emptyContainer}>
        {loading ? (
            <ActivityIndicator size="large" color={COLORS.text}/>
        ) : 
        (<Text style={styles.emptyText}>{message}</Text>)}
      
    </View>
  );
};

export default ListEmptyComponent
const styles = StyleSheet.create({
    emptyContainer:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 200,
 },
    emptyText: {
        fontSize: 18,
        color: COLORS.inactive,
    }
});
