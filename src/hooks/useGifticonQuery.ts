import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
    const { setPoint, setPhoneNum } = usePointStore();
    
    const query = useQuery({
        queryKey: ['gifticonList', user?.id],
        queryFn: async () => {
            const response = await viewGifticonList({
                userId: Number(user?.id)
            })
            return {
                myPoint: response.data.myPoint,
                phoneNum: response.data.phoneNum,
                shopItems: response.data.products.map(mapToShopItem),
                lastSyncedAt: response.data.lastSyncedAt
            };
        },
        enabled: !!user?.id,
        staleTime: 60 * 60 * 10000
    })

    // API에서 가져온 데이터(포인트, 핸드폰번호)를 전역 스토어에 동기화
    useEffect(() => {
        if (query.data?.myPoint !== undefined) {
            setPoint(query.data.myPoint);
        }
        if (query.data?.phoneNum) {
            setPhoneNum(query.data.phoneNum);
        }
    }, [query.data?.myPoint, query.data?.phoneNum, setPoint, setPhoneNum]);

    return query;
}

// 기프티콘 상세 조회
export const useGifticonProductQuery = (productId: string | undefined) => {
    
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

type PurchaseMutationParams = Omit<GifticonPurchaseRequest, 'userId'>;

// 기프티콘 구매
export const useGifticonPurchaseMutation = () => {
    const {user} = useAuthStore();
    const deductPoint = usePointStore((state) => state.deductPoint);
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: async (params: PurchaseMutationParams) => {
            const response = await purchaseProduct({
                ...params,
                userId: Number(user?.id)
            })
            return response.data;
        },
        onSuccess: (_, variables) => {
            deductPoint(variables.spendPoints);

            queryClient.invalidateQueries({ queryKey: ['gifticonList'] });
            queryClient.invalidateQueries({ queryKey: ['home'] });
        }
    })
}