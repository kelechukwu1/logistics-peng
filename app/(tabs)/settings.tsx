import { HeaderLayout } from '@/components/header';
import { useStore } from '@/store/useStore';
import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export default function Settings() {
    const { fontScalingEnabled, setFontScaling } = useStore();

    const fontSizeClasses = {
        title: 'text-xl',
        subtitle: 'text-base',
        body: 'text-sm',
        caption: 'text-xs',
    };

    return (
        <HeaderLayout title='Settings' description='Customize your app experience'>


            <View className="py-4">
                <View className="bg-white rounded-lg border border-gray-200 p-4">
                    <View className="flex-row items-center mb-3">
                        <View className="bg-blue-100 p-2 rounded-lg mr-3">
                            <Feather name="type" size={20} color="#3b82f6" />
                        </View>
                        <View className="flex-1">
                            <Text className={`${fontSizeClasses.subtitle} font-semibold text-gray-900`}>
                                Font Scaling
                            </Text>
                            <Text className={`${fontSizeClasses.body} text-gray-600 mt-1`}>
                                Enable larger text throughout the app
                            </Text>
                        </View>
                    </View>

                    <TouchableOpacity
                        onPress={() => setFontScaling(!fontScalingEnabled)}
                        className={`rounded-lg p-4 border-2 ${fontScalingEnabled
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-300 bg-gray-50'
                            }`}
                    >
                        <View className="flex-row items-center justify-between">
                            <Text className={`${fontSizeClasses.body} font-medium text-gray-900`}>
                                {fontScalingEnabled ? 'Enabled' : 'Disabled'}
                            </Text>
                            <View className={`w-6 h-6 rounded-full ${fontScalingEnabled ? 'bg-blue-500' : 'bg-gray-300'
                                }`}>
                                {fontScalingEnabled && (
                                    <View className="w-2 h-2 bg-white rounded-full mt-2 ml-2" />
                                )}
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>

                <View className="bg-white rounded-lg border border-gray-200 p-4 mt-4">
                    <View className="flex-row items-center mb-3">
                        <View className="bg-gray-100 p-2 rounded-lg mr-3">
                            <Feather name="settings" size={20} color="#6b7280" />
                        </View>
                        <View className="flex-1">
                            <Text className={`${fontSizeClasses.subtitle} font-semibold text-gray-900`}>
                                App Information
                            </Text>
                        </View>
                    </View>

                    <View className="space-y-2">
                        <View className="flex-row justify-between py-2">
                            <Text className={`${fontSizeClasses.body} text-gray-600`}>
                                Version
                            </Text>
                            <Text className={`${fontSizeClasses.body} text-gray-900`}>
                                1.0.0
                            </Text>
                        </View>
                        <View className="flex-row justify-between py-2">
                            <Text className={`${fontSizeClasses.body} text-gray-600`}>
                                Build
                            </Text>
                            <Text className={`${fontSizeClasses.body} text-gray-900`}>
                                2024.01.01
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        </HeaderLayout >
    );
}