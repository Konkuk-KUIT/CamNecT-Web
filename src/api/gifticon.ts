import type { GifticonHomeRequest, GifticonHomeResponse, GifticonProductRequest, GifticonProductResponse, GifticonPurchaseRequest, GifticonPurchaseResponse } from "../api-types/gifticonApiTypes";
import { axiosInstance } from "./axiosInstance";

// 기프티콘 샵 홈 조회 [GET] (/api/gifticons/home)
export const viewGifticonList = async (params: GifticonHomeRequest): Promise<GifticonHomeResponse> => {
    
    const response = await axiosInstance.get<GifticonHomeResponse>(
        "/api/gifticons/home",
        { params }
    );
    return response.data;
};

// 상품 상세 조회 [GET] (/api/gifticons/products/{productId})
export const viewGifticonProduct = async (params: GifticonProductRequest): Promise<GifticonProductResponse> => {
    const { productId } = params;
    
    const response = await axiosInstance.get<GifticonProductResponse>(`/api/gifticons/products/${productId}`);
    return response.data;
}

// 상품 구매 [POST] (/api/gifticons/purchases/confirm)
export const purchaseProduct = async (params: GifticonPurchaseRequest): Promise<GifticonPurchaseResponse> => {

    const { userId, ...body } = params;

    const response = await axiosInstance.post<GifticonPurchaseResponse>(
        "/api/gifticons/purchases/confirm",
        body,
        { params: { userId } }
    );
    return response.data;
}