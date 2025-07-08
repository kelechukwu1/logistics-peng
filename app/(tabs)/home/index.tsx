import { HeaderLayout } from '@/components/header';
import { StatusBadge } from '@/components/StatusBadge';
import { useStore } from '@/store/useStore';
import Fontisto from '@expo/vector-icons/Fontisto';
import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';


export default function Dashboard() {
    const router = useRouter();
    const { packages, fontScalingEnabled } = useStore();

    const fontSizeClasses = {
        title: fontScalingEnabled ? 'text-2xl' : 'text-xl',
        subtitle: fontScalingEnabled ? 'text-lg' : 'text-base',
        body: fontScalingEnabled ? 'text-base' : 'text-sm',
        caption: fontScalingEnabled ? 'text-sm' : 'text-xs',
    };

    return (
        <HeaderLayout title='Logistics Dashboard'>
            <FlatList
                data={packages}
                keyExtractor={(item) => item.id.toString()}
                showsVerticalScrollIndicator={false}
                renderItem={({ item: pkg }) => (
                    <TouchableOpacity
                        className="bg-white rounded-lg border border-gray-200 p-4 mb-3"
                        onPress={() => router.push(`/(tabs)/home/package/${pkg.id}`)}
                    >
                        <View className="flex-row items-start justify-between">
                            <View className="flex-row items-center flex-1">
                                <View className="bg-blue-50 p-2 rounded-lg mr-3">
                                    <Fontisto name="shopping-package" size={24} color="black" />
                                </View>
                                <View className="flex-1">
                                    <Text className={`${fontSizeClasses.subtitle} font-semibold text-gray-900`}>
                                        {pkg.id}
                                    </Text>
                                    <Text className={`${fontSizeClasses.body} text-gray-600 mt-1`}>
                                        {pkg.recipientName}
                                    </Text>
                                </View>
                            </View>
                            <StatusBadge status={pkg.status} />
                        </View>
                    </TouchableOpacity>
                )}
            />
        </HeaderLayout>
    );
}