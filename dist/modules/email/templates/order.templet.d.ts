export interface OrederCreated {
    products: {
        name: string;
        product: {
            img: string;
            name: string;
            price: number;
        };
    }[];
}
export declare const orederTepm: ({ products }: OrederCreated) => string;
