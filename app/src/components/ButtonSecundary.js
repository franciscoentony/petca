import { Text, TouchableOpacity } from 'react-native';
import React from 'react';

export default function ButtonSecundary({ children, ...props }) {
  return (
    <TouchableOpacity
    activeOpacity={0.7}
    {...props}
    className="border-[0.2rem] border-[#F7A072] p-4 rounded-3xl">
      <Text className="text-[#F7A072] text-xl font-semibold text-center">{children}</Text>
    </TouchableOpacity>
  )
}