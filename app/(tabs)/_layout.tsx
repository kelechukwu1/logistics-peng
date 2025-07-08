import { Feather } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: '#3b82f6',
                tabBarInactiveTintColor: '#6b7280',
                tabBarStyle: {
                    backgroundColor: '#dbeafe',
                    borderTopColor: '#e5e7eb',
                    height: 80,
                    paddingBottom: 12,
                    paddingTop: 12,
                },
            }}
        >
            <Tabs.Screen
                name="home"
                options={{
                    title: 'Home',
                    tabBarLabel: 'Dashboard',
                    tabBarIcon: ({ size, color }) => (
                        <Feather name="bar-chart-2" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="update"
                options={{
                    title: 'Update Status',
                    tabBarLabel: 'Update',
                    tabBarIcon: ({ size, color }) => (
                        <Feather name="edit" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="settings"
                options={{
                    title: 'Settings',
                    tabBarLabel: 'Settings',
                    tabBarIcon: ({ size, color }) => (
                        <Feather name="settings" size={size} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}