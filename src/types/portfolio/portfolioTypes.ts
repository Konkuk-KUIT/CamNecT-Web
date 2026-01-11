import { type User } from "../user/userTypes";

export type UserId = Pick<User, "id">;

export interface PortfolioImage {
    portfolioImgId: string;
    url: string;
}

export interface Portfolio extends UserId {
    portfolioId: string;

    title: string;
    thumbnailUrl?: string;

    content: string;
    images: PortfolioImage[];

    viewCount: number;

    createdAt: string;
    updatedAt?: string;

    portfolioVisibility: boolean;
}
