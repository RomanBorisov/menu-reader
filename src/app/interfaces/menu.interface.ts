export interface MenuItem {
    name: string;
    price: string;
    description: string;
    ingredients: string[];
    allergens: string[];
    history: string;
    images?: string[];
}

export interface MenuCategory {
    name: string;
    items: MenuItem[];
}

export interface Menu {
    categories: MenuCategory[];
}
