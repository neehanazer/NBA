'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { PricingConfig } from '@/types';

export function usePricing() {
  const queryClient = useQueryClient();

  const pricingQuery = useQuery({
    queryKey: ['pricing'],
    queryFn: () => api.getPricing(),
    staleTime: 60000,
  });

  const updatePricingMutation = useMutation({
    mutationFn: (updated: Partial<PricingConfig>) => api.updatePricing(updated),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pricing'] });
    },
  });

  return {
    pricing: pricingQuery.data,
    isLoading: pricingQuery.isLoading,
    updatePricing: updatePricingMutation.mutateAsync,
    isUpdating: updatePricingMutation.isPending,
  };
}
