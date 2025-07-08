import { IHeaderLayoutInterface } from '@/interfaces/header-layout.interface';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';

export function HeaderLayout({ title, description, showBack = false, children }: IHeaderLayoutInterface) {
    const router = useRouter();

    return (
        <SafeAreaView className="flex-1 bg-white">
            <View className="px-5 bg-white flex-row items-center py-3">
                {showBack && (
                    <TouchableOpacity onPress={() => router.back()} className="mr-3 p-2 -ml-2">
                        <Feather name="arrow-left" size={24} color="#374151" />
                    </TouchableOpacity>
                )}
                <View className='gap-2'>
                    <Text className="text-xl font-bold text-gray-900">{title}</Text>
                    {description && (
                        <Text className="text-sm text-gray-600">{description}</Text>
                    )}
                </View>
            </View>

            <View className='flex-1 px-5'>
                {children}
            </View>
        </SafeAreaView>
    );
}
