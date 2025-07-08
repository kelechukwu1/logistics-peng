import { HeaderLayout } from '@/components/header';
import { StatusModal } from '@/components/status-modal';
import { StatusBadge } from '@/components/StatusBadge';
import { Toast } from '@/components/Toast';
import { useStore } from '@/store/useStore';
import { Feather } from '@expo/vector-icons';
import Fontisto from '@expo/vector-icons/Fontisto';
import { useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { Linking, Text, TouchableOpacity, View } from 'react-native';


export default function PackageDetails() {
    const { id } = useLocalSearchParams();
    const { packages, updatePackageStatus } = useStore();
    const [toast, setToast] = useState<{ visible: boolean; message: string; type: 'success' | 'error' | 'warning' }>({
        visible: false,
        message: '',
        type: 'success',
    });
    const [showStatusModal, setShowStatusModal] = useState(false);

    const packageData = packages.find((pkg) => pkg.id === id);
    const [status, setStatus] = useState<'pending' | 'in_transit' | 'delivered' | 'failed'>(packageData!.status);

    if (!packageData) {
        return (
            <HeaderLayout title='Package Details' showBack={true}>
                <View className="flex-1 justify-center items-center">
                    <Text className="text-lg text-gray-600">Oops, this package is not found</Text>
                </View>
            </HeaderLayout>
        );
    }

    const handleMarkAsDelivered = (packageId: string) => {
        updatePackageStatus(packageId, 'delivered');
        setStatus('delivered');
        setToast({
            visible: true,
            message: `Package ${packageId} marked as delivered!`,
            type: 'success',
        });
    };

    const handleContactRecipient = () => {
        Linking.openURL(`tel:${packageData.recipientPhone}`);
    };

    const fontSizeClasses = {
        title: 'text-xl',
        subtitle: 'text-base',
        body: 'text-sm',
        caption: 'text-xs',
    };

    return (
        <HeaderLayout
            title='Package Details'
            showBack={true}>
            <Toast
                visible={toast.visible}
                message={toast.message}
                type={toast.type}
                onHide={() => setToast({ ...toast, visible: false })}
            />

            <View className="bg-white rounded-lg border border-gray-200 p-4 mb-4">
                <View className="flex-row items-center justify-between">
                    <View className="flex-row items-center">
                        <View className="bg-blue-100 p-2 rounded-lg mr-3">
                            <Fontisto name="shopping-package" size={24} color="black" />
                        </View>
                        <View>
                            <Text className={`${fontSizeClasses.subtitle} font-semibold text-gray-900`}>
                                {packageData.id}
                            </Text>
                            <Text className={`${fontSizeClasses.body} text-gray-600`}>
                                {packageData.description}
                            </Text>
                        </View>
                    </View>
                    <TouchableOpacity onPress={() => setShowStatusModal(true)}>
                        <StatusBadge status={packageData.status} />
                    </TouchableOpacity>
                </View>
            </View>

            <View className="bg-white rounded-lg border border-gray-200 p-4 mb-4">
                <Text className={`${fontSizeClasses.subtitle} font-semibold text-gray-900 mb-3`}>
                    Recipient Information
                </Text>

                <View className="flex-row items-center mb-3">
                    <Feather name="map-pin" size={16} color="#6b7280" />
                    <View className="ml-3 flex-1">
                        <Text className={`${fontSizeClasses.body} font-medium text-gray-900`}>
                            {packageData.recipientName}
                        </Text>
                        <Text className={`${fontSizeClasses.body} text-gray-600`}>
                            {packageData.recipientAddress}
                        </Text>
                    </View>
                </View>

                <View className="flex-row items-center">
                    <Feather name="phone" size={16} color="#6b7280" />
                    <Text className={`${fontSizeClasses.body} ml-3 flex-1`}>
                        {packageData.recipientPhone}
                    </Text>
                </View>
            </View>

            <View className="bg-white rounded-lg border border-gray-200 p-4 mb-4">
                <Text className={`${fontSizeClasses.subtitle} font-semibold text-gray-900 mb-3`}>
                    Package Information
                </Text>

                <View className="flex-row items-center mb-3">
                    <Feather name="box" size={16} color="#6b7280" />
                    <Text className={`${fontSizeClasses.body} text-gray-600 ml-3`}>
                        Weight: {packageData.weight}
                    </Text>
                </View>

                <View className="flex-row items-center">
                    <Feather name="tag" size={16} color="#6b7280" />
                    <Text className={`${fontSizeClasses.body} text-gray-600 ml-3`}>
                        Type: {packageData.type}
                    </Text>
                </View>
            </View>

            <View className="mt-auto mb-3">
                <TouchableOpacity
                    onPress={() => handleMarkAsDelivered(packageData.id)}
                    className={`${packageData.status === 'delivered' ? "bg-green-300" : "bg-green-500"} rounded-lg p-4 mb-3`}
                    disabled={packageData.status === 'delivered'}
                >
                    <Text className={`${fontSizeClasses.subtitle} font-semibold text-white text-center`}>
                        {packageData.status === 'delivered' ? 'Already Delivered' : 'Mark as Delivered'}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={handleContactRecipient}
                    className="bg-blue-500 rounded-lg p-4"
                >
                    <Text className={`${fontSizeClasses.subtitle} font-semibold text-white text-center`}>
                        Contact Recipient
                    </Text>
                </TouchableOpacity>
            </View>

            <StatusModal
                visible={showStatusModal}
                status={status}
                onSelect={(value) => {
                    setStatus(value);
                    updatePackageStatus(packageData.id, value);
                }}
                onClose={() => setShowStatusModal(false)}
            />
        </HeaderLayout>
    );
}