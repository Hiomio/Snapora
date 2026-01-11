// hooks/useApi.js
"use client";

import { useSession } from 'next-auth/react';
import { api } from '@/lib/api';
import { useEffect } from 'react';

export const useApi = () => {
  const { data: session } = useSession();

  useEffect(() => {
    // Add request interceptor
    const requestInterceptor = api.interceptors.request.use((config) => {
      if (session?.backendToken) {
        config.headers.Authorization = `Bearer ${session.backendToken}`;
      }
      return config;
    });

    return () => {
      // Cleanup interceptor on unmount
      api.interceptors.request.eject(requestInterceptor);
    };
  }, [session?.backendToken]); // Only depend on the token, not the entire session object

  return api;
};