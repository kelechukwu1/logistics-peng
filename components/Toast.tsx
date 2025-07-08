import { Feather } from '@expo/vector-icons';
import React, { useEffect } from 'react';
import { Animated, Text } from 'react-native';

interface ToastProps {
    message: string;
    type: 'success' | 'error' | 'warning';
    visible: boolean;
    onHide: () => void;
}

export function Toast({ message, type, visible, onHide }: ToastProps) {
    const fadeAnim = new Animated.Value(0);

    useEffect(() => {
        if (visible) {
            Animated.sequence([
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.delay(2000),
                Animated.timing(fadeAnim, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                }),
            ]).start(() => {
                onHide();
            });
        }
    }, [visible]);

    if (!visible) return null;

    const getIconProps = () => {
        switch (type) {
            case 'success':
                return { name: 'check-circle', color: '#22c55e' };
            case 'error':
                return { name: 'x-circle', color: '#ef4444' };
            case 'warning':
                return { name: 'alert-circle', color: '#f59e0b' };
            default:
                return { name: 'info', color: '#3b82f6' };
        }
    };

    const getBackgroundColor = () => {
        switch (type) {
            case 'success':
                return 'bg-green-50 border-green-200';
            case 'error':
                return 'bg-red-50 border-red-200';
            case 'warning':
                return 'bg-yellow-50 border-yellow-200';
            default:
                return 'bg-blue-50 border-blue-200';
        }
    };

    const iconProps = getIconProps();

    return (
        <Animated.View
            style={{
                opacity: fadeAnim,
            }}
            className={`${getBackgroundColor()} absolute bottom-4 left-[20px] right-[20px] z-50 p-4 rounded-lg border flex-row items-center`}
        >
            <Feather name={iconProps.name as any} size={20} color={iconProps.color} />
            <Text className="ml-2 text-gray-800 font-medium">{message}</Text>
        </Animated.View>
    );
}
