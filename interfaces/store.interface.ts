export interface Package {
    id: string;
    recipientName: string;
    recipientPhone: string;
    recipientAddress: string;
    status: 'pending' | 'in_transit' | 'delivered' | 'failed';
    weight: string;
    type: string;
    description: string;
}

export interface Store {
    packages: Package[];
    fontScalingEnabled: boolean;
    updatePackageStatus: (id: string, status: Package['status']) => void;
    setFontScaling: (enabled: boolean) => void;
    loadSettings: () => Promise<void>;
}