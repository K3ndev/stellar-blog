export type Blog = {
    id: string;
    username: string;
    body: string;
    createdAt: string;
    updatedAt: string;
    rating: number;
    title: string;
};

export type BlogInput = {
    title: string;
    username: string;
    body: string;
    rating: number;
    createdAt: string;
    updatedAt: string;
};

export type BlogUpdateInput = {
    body?: string;
    rating?: number;
    title?: string;
};
