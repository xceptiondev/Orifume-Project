# How to Set Up Firebase for Your Website

To make your website "live" so everyone sees the same products and images, you need a backend. We will use **Firebase** (by Google) because it is free and powerful.

Follow these steps to get your **Configuration Keys**:

## Step 1: Create a Project
1.  Go to [console.firebase.google.com](https://console.firebase.google.com/) and sign in with your Google account.
2.  Click **"Create a project"** (or "Add project").
3.  Name it `Orifume-Project` (or anything you like).
4.  Disable Google Analytics (not needed for now) and click **"Create project"**.
5.  Wait for it to finish and click **"Continue"**.

## Step 2: Create a Web App
1.  In your project dashboard, look for the **Web** icon (looks like `</>`) under "Get started by adding Firebase to your app".
2.  Register the app with a nickname (e.g., `Orifume Web`).
3.  **Uncheck** "Also set up Firebase Hosting" (we are using GitHub Pages).
4.  Click **"Register app"**.
5.  **Copy the `firebaseConfig` object**. It looks like this:
    ```javascript
    const firebaseConfig = {
      apiKey: "AIzaSy...",
      authDomain: "...",
      projectId: "...",
      storageBucket: "...",
      messagingSenderId: "...",
      appId: "..."
    };
    ```
6.  **Paste this into the `js/firebase-config.js` file in your project folder.**

## Step 3: Setup Database (Firestore)
1.  In the left sidebar, click **"Build"** -> **"Firestore Database"**.
2.  Click **"Create database"**.
3.  Choose a location (e.g., `eur3` for Europe or `us-central` for US).
4.  **Important**: Choose **"Start in test mode"**.
    - *Note: This allows anyone to read/write for 30 days. For a real production app, we would add security rules later.*
5.  Click **"Create"**.

## Step 4: Setup Storage (Images)
1.  In the left sidebar, click **"Build"** -> **"Storage"**.
2.  Click **"Get started"**.
3.  Choose **"Start in test mode"**.
4.  Click **"Done"**.
5.  (Optional) Go to the **Rules** tab in Storage and ensure it allows read/write:
    ```
    rules_version = '2';
    service firebase.storage {
      match /b/{bucket}/o {
        match /{allPaths=**} {
          allow read, write: if true;
        }
      }
    }
    ```

**You are done!** The website is now ready to connect to your live database.
