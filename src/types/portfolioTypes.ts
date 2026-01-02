export type PortfolioId = string;
export type UserId = string;

export interface PortfolioImage {
    id: string;
    url: string;
}

export interface Portfolio {
    id: PortfolioId;
    ownerId: UserId;

    title: string;
    thumbnailUrl?: string;

    content: string;
    images: PortfolioImage[];

    viewCount: number;
    likeCount: number;

    createdAt: string;
    updatedAt?: string;
}
