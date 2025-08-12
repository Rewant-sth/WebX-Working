export interface IPagesResponse {
    status: string;
    results: number;
    data: IPages[];
}

export interface IPages {
    _id: string;
    title: string;
    slug: string;
    description: string;
    subDescription?: string;
    subTitle?: string;
    metaTitle: string;
    metaDescription: string;
    metaKeywords: string[];
    image: string;
    status: 'published' | 'draft' | 'archived';
    publishDate: string; // ISO format
    createdAt: string;
    updatedAt: string;
    __v: number;
}
