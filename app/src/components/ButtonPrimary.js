import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';

export default function ButtonPrimary({ children, color, ...rest }) {
  return (
    <TouchableOpacity
    activeOpacity={0.7}
    {...rest}
    className={`${color ? color: 'bg-[#0FA3B1]'}  p-4 rounded-2xl`}>
      <Text className="text-white text-xl font-semibold text-center">{children}</Text>
    </TouchableOpacity>
  )
}