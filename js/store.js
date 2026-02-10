const COLLECTION_NAME = 'products';

// Helper to get DB and Storage from the global firebase object (initialized in firebase-config.js)
const getDb = () => firebase.firestore();
const getStorage = () => firebase.storage();

const Store = {
    // Fetch products from Firestore
    async getProducts() {
        try {
            const snapshot = await getDb().collection(COLLECTION_NAME).get();
            return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        } catch (error) {
            console.error("Error fetching products:", error);
            return [];
        }
    },

    // Add product to Firestore (and upload image if exists)
    async addProduct(product) {
        try {
            let imageUrl = null;

            // 1. Upload Image if it's a File object (from Admin input) or a Base64 string (legacy)
            // Note: In the new admin flow, we should pass the File object directly.
            // If product.image is a Data URL (base64) from the old code, we can try to upload it, 
            // but for best results, we'll update admin.html to pass the File object.

            // Let's assume product.imageFile is passed if it's a new upload
            if (product.imageFile) {
                const storageRef = getStorage().ref();
                const fileRef = storageRef.child(`products/${Date.now()}_${product.imageFile.name}`);
                await fileRef.put(product.imageFile);
                imageUrl = await fileRef.getDownloadURL();
            } else if (product.image && product.image.startsWith('data:')) {
                // Fallback for base64 if needed, users might not change admin.html immediately
                const storageRef = getStorage().ref();
                const fileRef = storageRef.child(`products/${Date.now()}_image`);
                await fileRef.putString(product.image, 'data_url');
                imageUrl = await fileRef.getDownloadURL();
            } else if (product.image) {
                // Keep existing URL/path if valid
                imageUrl = product.image;
            }

            // 2. Prepare Data
            const newProduct = {
                name: product.name,
                tagline: product.tagline,
                price: Number(product.price),
                top: product.top,
                heart: product.heart,
                base: product.base,
                colorFrom: product.colorFrom,
                colorTo: product.colorTo,
                image: imageUrl,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            };

            // 3. Save to Firestore
            const docRef = await getDb().collection(COLLECTION_NAME).add(newProduct);
            return { id: docRef.id, ...newProduct };

        } catch (error) {
            console.error("Error adding product:", error);
            throw error;
        }
    },

    // Update product
    async updateProduct(product) {
        try {
            let imageUrl = product.image;

            if (product.imageFile) {
                const storageRef = getStorage().ref();
                const fileRef = storageRef.child(`products/${Date.now()}_${product.imageFile.name}`);
                await fileRef.put(product.imageFile);
                imageUrl = await fileRef.getDownloadURL();
            }

            const updateData = {
                name: product.name,
                tagline: product.tagline,
                price: Number(product.price),
                top: product.top,
                heart: product.heart,
                base: product.base,
                colorFrom: product.colorFrom,
                colorTo: product.colorTo
            };

            if (imageUrl) {
                updateData.image = imageUrl;
            }

            await getDb().collection(COLLECTION_NAME).doc(product.id).update(updateData);
            return { id: product.id, ...updateData };
        } catch (error) {
            console.error("Error updating product:", error);
            throw error;
        }
    },

    // Remove product
    async removeProduct(id) {
        try {
            await getDb().collection(COLLECTION_NAME).doc(id).delete();
        } catch (error) {
            console.error("Error deleting product:", error);
            throw error;
        }
    },

    checkLogin(username, password) {
        return username === 'admin' && password === 'admin123';
    },

    formatPrice(price) {
        return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', minimumFractionDigits: 0 }).format(price);
    }
};

window.Store = Store;
