export interface ProductDetail {
    key: string;
    value: string;
  }
  
  export interface Product {
    id: string;
    title: string;
    price: number;
    selling_price?: string;
    category: string;
    image: string;
    images?: string[];
    rating: number;
    average_rating?: string;
    brand?: string;
    description?: string;
    discount?: string;
    out_of_stock?: boolean;
    product_details?: ProductDetail[];
    seller?: string;
    sub_category?: string;
  }