import { useEffect } from 'react';
import { onlineManager } from '@tanstack/react-query';
import NetInfo, { NetInfoState } from '@react-native-community/netinfo';
import { useUserStore } from '@/state';

export function useOnlineManager() {
  const { setIsOnline } = useUserStore();

  useEffect(() => {
    // Function to handle connectivity changes
    const handleConnectivityChange = (state: NetInfoState) => {
      const isConnected = !!state.isConnected;
      onlineManager.setOnline(isConnected);
      setIsOnline(isConnected);
    };

    // Subscribe to network status updates
    const unsubscribe = NetInfo.addEventListener(handleConnectivityChange);

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [setIsOnline]);
}
