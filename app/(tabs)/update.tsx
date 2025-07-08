import { HeaderLayout } from '@/components/header';
import { StatusModal } from '@/components/status-modal';
import { StatusBadge } from '@/components/StatusBadge';
import { Toast } from '@/components/Toast';
import { useStore } from '@/store/useStore';
import Fontisto from '@expo/vector-icons/Fontisto';
import React, { useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';


export default function UpdateStatus() {
    const { packages, updatePackageStatus, fontScalingEnabled } = useStore();
    const [toast, setToast] = useState({
        visible: false,
        message: '',
        type: 'success' as 'success' | 'error' | 'warning',
    });

    const [showStatusModal, setShowStatusModal] = useState(false);
    const [selectedPackageId, setSelectedPackageId] = useState<string | null>(null);
    const selectedPackage = packages.find((p) => p.id === selectedPackageId);
    const [status, setStatus] = useState<'pending' | 'in_transit' | 'delivered' | 'failed'>('pending');

    const fontSizeClasses = {
        title: fontScalingEnabled ? 'text-2xl' : 'text-xl',
        subtitle: fontScalingEnabled ? 'text-lg' : 'text-base',
        body: fontScalingEnabled ? 'text-base' : 'text-sm',
        caption: fontScalingEnabled ? 'text-sm' : 'text-xs',
    };

    return (
        <HeaderLayout title='Update Status' description='Select a package to update its status'>
            <Toast
                visible={toast.visible}
                message={toast.message}
                type={toast.type}
                onHide={() => setToast({ ...toast, visible: false })}
            />

            <FlatList
                data={packages}
                keyExtractor={(item) => item.id.toString()}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 20 }}
                renderItem={({ item: pkg }) => (
                    <TouchableOpacity
                        className="bg-white rounded-lg border border-gray-200 p-4 mb-3"
                        onPress={() => {
                            setSelectedPackageId(pkg.id);
                            setStatus(pkg.status);
                            setShowStatusModal(true);
                        }}
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

            {selectedPackage && (
                <StatusModal
                    visible={showStatusModal}
                    status={status}
                    onSelect={(value) => {
                        setStatus(value);
                        console.log(value)
                        updatePackageStatus(selectedPackage.id, value);
                        setToast({
                            visible: true,
                            message: `Package ${selectedPackage.id} status updated`,
                            type: 'success',
                        });
                        setShowStatusModal(false);
                    }}
                    onClose={() => setShowStatusModal(false)}
                />
            )}
        </HeaderLayout>
    );
}
