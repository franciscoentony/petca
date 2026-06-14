import { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList } from 'react-native';
import { FontAwesome6 } from "@expo/vector-icons";

export default function SelectInput({ label, options, placeholder = "Selecione uma opção...", onSelect }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const handleSelect = (item) => {
        setSelectedItem(item);
        setIsOpen(false);
        if (onSelect) onSelect(item.value); // Dispara a função de callback passando o valor
    };

    return (
        <View className="w-full gap-1">
            <Text className="text-2xl">{label}</Text>
            
            {/* Botão que abre o Select */}
            <TouchableOpacity 
                activeOpacity={0.7}
                onPress={() => setIsOpen(true)}
                className="bg-stone-400/20 h-15 px-5 rounded-2xl w-full flex-row justify-between items-center"
            >
                <Text className={`text-xl ${selectedItem ? 'text-stone-800' : 'text-stone-400'}`}>
                    {selectedItem ? selectedItem.label : placeholder}
                </Text>
                <FontAwesome6 name="chevron-down" size={16} className="text-stone-400" />
            </TouchableOpacity>

            {/* Modal que surge de baixo para cima */}
            <Modal 
                visible={isOpen} 
                transparent 
                animationType="slide"
                onRequestClose={() => setIsOpen(false)}
            >
                {/* Background escurecido ao fundo */}
                <TouchableOpacity 
                    activeOpacity={1} 
                    onPress={() => setIsOpen(false)}
                    className="flex-1 bg-black/40 justify-end"
                >
                    {/* Menu de Opções (Bottom Sheet) */}
                    <View className="bg-white w-full rounded-t-[2.5rem] p-6 pb-12 max-h-[50%]">
                        {/* Tracinho de arrastar apenas visual */}
                        <View className="w-12 h-1.5 bg-stone-200 rounded-full self-center mb-6" />
                        
                        <Text className="text-2xl font-bold mb-4 text-stone-800">{label}</Text>
                        
                        <FlatList
                            data={options}
                            keyExtractor={(item) => item.value}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item }) => {
                                const isSelected = selectedItem?.value === item.value;
                                return (
                                    <TouchableOpacity
                                        activeOpacity={0.5}
                                        onPress={() => handleSelect(item)}
                                        className="py-4 border-b border-stone-100 flex-row justify-between items-center"
                                    >
                                        <Text className={`text-xl ${isSelected ? 'text-stone-900 font-semibold' : 'text-stone-600'}`}>
                                            {item.label}
                                        </Text>
                                        {isSelected && (
                                            <FontAwesome6 name="check" size={16} className="text-[#0FA3B1]" />
                                        )}
                                    </TouchableOpacity>
                                );
                            }}
                        />
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    );
}