import { Package } from '@/store/useStore';
import React from 'react';
import { Text, View } from 'react-native';

interface StatusBadgeProps {
    status: Package['status'];
}

export function StatusBadge({ status }: StatusBadgeProps) {
    const getStatusConfig = () => {
        switch (status) {
            case 'pending':
                return {
                    text: 'Pending',
                    className: 'bg-orange-100 border-orange-200',
                    textClassName: 'text-orange-700',
                };
            case 'in_transit':
                return {
                    text: 'In Transit',
                    className: 'bg-blue-100 border-blue-200',
                    textClassName: 'text-blue-700',
                };
            case 'delivered':
                return {
                    text: 'Delivered',
                    className: 'bg-green-100 border-green-200',
                    textClassName: 'text-green-700',
                };
            case 'failed':
                return {
                    text: 'Failed',
                    className: 'bg-red-100 border-red-200',
                    textClassName: 'text-red-700',
                };
        }
    };

    const config = getStatusConfig();

    return (
        <View className={`${config.className} px-3 py-1 rounded-full border`}>
            <Text className={`${config.textClassName} text-sm font-medium`}>
                {config.text}
            </Text>
        </View>
    );
}