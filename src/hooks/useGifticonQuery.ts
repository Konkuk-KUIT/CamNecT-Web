import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import type { GifticonProduct, GifticonPurchaseRequest } from "../api-types/gifticonApiTypes";
import { purchaseProduct, viewGifticonList, viewGifticonProduct } from "../api/gifticon";
import { useAuthStore } from "../store/useAuthStore";
import { usePointStore } from "../store/usePointStore";

// data.ts의 ShopItem 형식으로 매핑하는 헬퍼 함수
const mapToShopItem = (product: GifticonProduct) => ({
    id: product.productId,
    company: product.brandName,
    name: product.productName,
    point: product.pricePoints,
    imageUrl: product.imageUrl,
});

// 기프티콘 리스트 조회
export const useGifticonListQuery = () => {
    const {user} = useAuthStore();
    const setPoint = usePointStore((state) => state.setPoint);
    
    const query = useQuery({
        queryKey: ['gifticonList', user?.id],
        queryFn: async () => {
            const response = await viewGifticonList({
                userId: Number(user?.id)
            })
            return {
                myPoint: response.data.myPoint,
                shopItems: response.data.products.map(mapToShopItem),
                lastSyncedAt: response.data.lastSyncedAt
            };
        },
        enabled: !!user?.id,
        staleTime: 60 * 60 * 10000
    })

    // API에서 가져온 포인트를 전역 스토어에 동기화
    useEffect(() => {
        if (query.data?.myPoint !== undefined) {
            setPoint(query.data.myPoint);
        }
    }, [query.data?.myPoint, setPoint]);

    return query;
}

// 기프티콘 상세 조회
export const useGifticonProductQuery = (productId: string) => {
    
    return useQuery({
        queryKey: ['gifticonProduct', productId],
        queryFn: async () => {
            const response = await viewGifticonProduct({
                productId: Number(productId)
            })
            return mapToShopItem(response.data);
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