import { useAuthStore } from "../store/useAuthStore";
import { useMutation, useQuery } from "@tanstack/react-query";
import { viewGifticonList, viewGifticonProduct, purchaseProduct } from "../api/gifticon";
import type { GifticonPurchaseRequest } from "../api-types/gifticonApiTypes";

// 기프티콘 리스트 조회
export const useGifticonListQuery = () => {
    const {user} = useAuthStore();
    
    return useQuery({
        queryKey: ['gifticonList', user?.id],
        queryFn: async () => {
            const response = await viewGifticonList({
                userId: Number(user?.id)
            })
            return response.data;
        },
        enabled: !!user?.id,
        staleTime: 60 * 60 * 10000
    })
}

// 기프티콘 상세 조회
export const useGifticonProductQuery = (productId: string) => {
    
    return useQuery({
        queryKey: ['gifticonProduct', productId],
        queryFn: async () => {
            const response = await viewGifticonProduct({
                productId: Number(productId)
            })
            return response.data;
        },
        enabled: !!productId,
        staleTime: 60 * 60 * 10000
    })
}

// 기프티콘 구매
export const useGifticonPurchaseMutation = () => {
    
    return useMutation({
        mutationFn: async (params: GifticonPurchaseRequest) => {
            const response = await purchaseProduct({
                ...params
            })
            return response.data;
        },
    })

}