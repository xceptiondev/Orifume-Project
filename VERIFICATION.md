# Verification: How to Test Your Live Website

I have updated the code to use **Firebase**. Now you need to connect it to your project.

## 1. Add Your Keys
1.  Open `js/firebase-config.js` in VS Code.
2.  Paste the `firebaseConfig` code you copied from the Firebase Console (as described in `SETUP_FIREBASE.md`).
3.  Save the file.

## 2. Test Admin Panel
1.  Open `admin.html` in your browser.
    - *Note: If you just open the file directly, it might not work due to browser security (CORS). It is best to use a local server (like "Live Server" extension in VS Code) or push to GitHub Pages to test.*
2.  Login with `admin` / `admin123`.
3.  Add a new product with an image.
    - The button should change to "PROCESSING...".
    - You should see "Product added successfully!".
    - The product should appear in the list.

## 3. Test Live Update
1.  Open `index.html` in a **different** browser (or Incognito window).
2.  You should see the product you just added.
3.  If you add another product in Admin, refresh the Index page, and it should appear instantly.

## Troubleshooting
- **"Loading..." stuck**: Check the browser console (F12 -> Console) for red error messages.
- **Permission Denied**: Ensure you set your Firestore and Storage rules to "Test Mode" (allow read/write).
