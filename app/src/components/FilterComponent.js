import { Text, TouchableOpacity, StyleSheet, View } from "react-native";

export default function FilterComponent({children, isActivate, onPressFilter}) {
  return(
        <TouchableOpacity activeOpacity={0.8} onPress={onPressFilter} style={[styles.filterComponent, isActivate && { backgroundColor: '#F7A072', borderColor: 'transparent' }]}>
            <Text style={[styles.textLabel, isActivate && {
                color: '#601300'
            }]}>{children}</Text>
        </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    filterComponent: {
        minWidth: '100',
        width: 'auto',
        height: 45,
        padding: 10,
        backgroundColor: '#EDDEA4',
        borderRadius: 400,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 3,        
    },
    textLabel: {
        fontSize: 16,
        //color: '#c8c8c8',
        textAlign: 'center',
        fontFamily: 'Inter-SemiBold'
    }
})