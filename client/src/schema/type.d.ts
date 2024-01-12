export type BlogType = {
    id: string;
    username: string;
    body: string;
    createdAt: string;
    updatedAt: string;
    rating: number;
    title: string;
};

export type BlogInputType = {
    title: string;
    username: string;
    body: string;
    rating: number;
    createdAt: string;
    updatedAt: string;
};

export type BlogUpdateInputType = {
    body?: string;
    rating?: number;
    title?: string;
};
