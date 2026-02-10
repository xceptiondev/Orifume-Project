# How to Manage Images for GitHub Pages

Since your website is hosted on **GitHub Pages** (a static hosting service), it does not have a database. This means images uploaded through the Admin Panel are saved only to your **browser's Local Storage** and are **not** visible to other people who visit your site.

To fix this, we have updated the website to load images from the project files.

## 1. Replacing the Default Images
The current images are placeholders located in the `images/` folder. To replace them:
1.  Rename your own perfume image files to match the ones in the folder (e.g., `terre-sacree.jpg`, `lumiere-pure.jpg`, etc.).
2.  Replace the existing files in the `images/` folder with your new ones.
3.  Push these changes to GitHub.

## 2. Adding New Products Permanently
If you add a product via the Admin Panel, only **you** will see it. To add a product permanently for **everyone**:

1.  Place your new product image in the `images/` folder (e.g., `my-new-scent.jpg`).
2.  Open `js/store.js`.
3.  Add a new entry to the `DEFAULT_PRODUCTS` list at the top of the file:
    ```javascript
    {
        id: '7', // Unique ID
        name: 'My New Scent',
        tagline: 'YOUR TAGLINE HERE',
        price: 55000,
        top: 'Note 1, Note 2',
        heart: 'Note 3, Note 4',
        base: 'Note 5, Note 6',
        colorFrom: 'purple-500', // Tailwind color name
        colorTo: 'blue-600',
        image: 'images/my-new-scent.jpg' // Path to your image file
    },
    ```
4.  Commit and push to GitHub.

## 3. Why the Admin Panel "Upload" Doesn't Work Online
The Admin Panel uses your browser's memory. This is perfect for testing, but since there is no backend server (like a database), the data cannot be shared with other visitors. To share data/images, you must include them in the website's code and files as described above.
