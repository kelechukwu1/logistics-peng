import { Package, Store } from '@/interfaces/store.interface';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import packagesData from '../data/packages.json';

export const useStore = create<Store>((set, get) => ({
    packages: packagesData as Package[],
    fontScalingEnabled: true,

    updatePackageStatus: (id: string, status: Package['status']) => {
        set((state) => ({
            packages: state.packages.map((pkg) =>
                pkg.id === id ? { ...pkg, status } : pkg
            ),
        }));
    },

    setFontScaling: async (enabled) => {
        set({ fontScalingEnabled: enabled });
        try {
            await AsyncStorage.setItem('logisticsSettings', JSON.stringify({ fontScalingEnabled: enabled }));
        } catch (error) {
            console.error('Failed to save settings:', error);
        }
    },

    loadSettings: async () => {
        try {
            const settings = await AsyncStorage.getItem('logisticsSettings');
            if (settings) {
                const parsed = JSON.parse(settings);
                set({ fontScalingEnabled: parsed.fontScalingEnabled ?? true });
            }
        } catch (error) {
            console.error('Failed to load settings:', error);
        }
    },
}));