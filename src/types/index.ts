export interface IProducts  {
    id: string;
    title: string;
    desc: string;
    price: number;
    urls: string[];
    star: number;
    size: string[];
}

export interface IComment  {
    id: string;
    name: string;
    comment: string;
    star: number;
    clotheId: string;
    createdAt: string;
}