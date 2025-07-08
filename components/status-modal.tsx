// components/StatusModal.tsx
import React from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';

interface StatusModalProps {
    visible: boolean;
    status: 'pending' | 'in_transit' | 'delivered' | 'failed';
    onSelect: (value: 'pending' | 'in_transit' | 'delivered' | 'failed') => void;
    onClose: () => void;
}

export const StatusModal = ({ visible, status, onSelect, onClose }: StatusModalProps) => {
    const options: StatusModalProps['status'][] = ['pending', 'in_transit', 'delivered', 'failed'];

    return (
        <Modal
            visible={visible}
            transparent
            animationType="none"
            onRequestClose={onClose}
        >
            <TouchableOpacity
                activeOpacity={1}
                onPressOut={onClose}
                className="flex-1 justify-center items-center bg-black/50"
            >
                <TouchableOpacity
                    activeOpacity={1}
                    className="bg-white w-[80%] rounded-lg p-10"
                    onPress={() => { }}
                >
                    <Text className="text-base font-semibold mb-4">Select Status</Text>

                    {options.map((option) => (
                        <TouchableOpacity
                            key={option}
                            onPress={() => {
                                onSelect(option);
                                onClose();
                            }}
                            className="flex-row items-center mb-5"
                        >
                            <View className={`w-5 h-5 rounded-full border mr-3 ${status === option ? 'bg-blue-500 border-blue-500' : 'border-gray-400'}`} />
                            <Text className="capitalize text-gray-800">{option.replace('_', ' ')}</Text>
                        </TouchableOpacity>
                    ))}
                </TouchableOpacity>
            </TouchableOpacity>
        </Modal>
    );
};
