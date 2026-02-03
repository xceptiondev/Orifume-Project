const STORE_KEY = 'orifume_products';

const DEFAULT_PRODUCTS = [
    {
        id: '1',
        name: 'Terre Sacrée',
        tagline: 'EARTHY · GROUNDED · PROFOUND',
        price: 45000,
        top: 'Bergamot, Pink Pepper',
        heart: 'Vetiver, Cedar',
        base: 'Oud, Sandalwood',
        colorFrom: 'stone-600',
        colorTo: 'stone-800'
    },
    {
        id: '2',
        name: 'Lumière Pure',
        tagline: 'CLEAN · CRISP · LUMINOUS',
        price: 42000,
        top: 'Yuzu, Sea Salt',
        heart: 'White Tea, Iris',
        base: 'White Musk, Cashmere',
        colorFrom: 'sky-200',
        colorTo: 'slate-300'
    },
    {
        id: '3',
        name: 'Velours Rouge',
        tagline: 'BOLD · SENSUAL · PASSIONATE',
        price: 48000,
        top: 'Saffron, Cardamom',
        heart: 'Rose Absolute, Jasmine',
        base: 'Amber, Vanilla Orchid',
        colorFrom: 'amber-600',
        colorTo: 'red-900'
    },
    {
        id: '4',
        name: 'Forêt Noire',
        tagline: 'MYSTERIOUS · DEEP · ENCHANTING',
        price: 46000,
        top: 'Black Pepper, Juniper',
        heart: 'Pine, Violet Leaf',
        base: 'Moss, Leather, Patchouli',
        colorFrom: 'emerald-700',
        colorTo: 'teal-900'
    },
    {
        id: '5',
        name: 'Nuit Étoilée',
        tagline: 'DREAMY · ETHEREAL · MAGNETIC',
        price: 50000,
        top: 'Star Anise, Lavender',
        heart: 'Orris, Incense',
        base: 'Benzoin, Tonka, Musk',
        colorFrom: 'violet-400',
        colorTo: 'indigo-700'
    },
    {
        id: '6',
        name: 'Sol Doré',
        tagline: 'WARM · RADIANT · JOYFUL',
        price: 44000,
        top: 'Neroli, Mandarin',
        heart: 'Orange Blossom, Honey',
        base: 'Blonde Woods, Ambrette',
        colorFrom: 'amber-200',
        colorTo: 'orange-300'
    }
];

const Store = {
    init() {
        if (!localStorage.getItem(STORE_KEY)) {
            localStorage.setItem(STORE_KEY, JSON.stringify(DEFAULT_PRODUCTS));
        }
    },

    getProducts() {
        this.init();
        try {
            return JSON.parse(localStorage.getItem(STORE_KEY)) || [];
        } catch (e) {
            return [];
        }
    },

    addProduct(product) {
        const products = this.getProducts();
        const newProduct = {
            id: Date.now().toString(),
            ...product
        };
        products.push(newProduct);
        localStorage.setItem(STORE_KEY, JSON.stringify(products));
        return newProduct;
    },

    removeProduct(id) {
        const products = this.getProducts();
        const filtered = products.filter(p => p.id !== id);
        localStorage.setItem(STORE_KEY, JSON.stringify(filtered));
    },

    checkLogin(username, password) {
        // Hardcoded for demo purposes
        return username === 'admin' && password === 'admin123';
    },

    formatPrice(price) {
        return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', minimumFractionDigits: 0 }).format(price);
    }
};

window.Store = Store;
