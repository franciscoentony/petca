import { View, Text, TextInput } from 'react-native'
import { FontAwesome6 } from "@expo/vector-icons";

export default function Input({ label, placeholder, icon, height, ...rest }) {
  return (
    <View className="w-full gap-1">
      <Text className="text-2xl">{label}</Text>
      <View className="relative justify-center">
        <FontAwesome6 name={icon} size={18} className="text-stone-400 absolute left-4 z-10" />
        <TextInput
        placeholder={placeholder}
        {...rest}
         className={`bg-stone-400/20 py-3 ${height ? height : 'h-15' }  ${icon ? 'pl-12' : 'pl-4'} text-xl rounded-2xl w-full`}/>
      </View>
    </View>
  )
}