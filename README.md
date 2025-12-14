# 💖 Pranathi's Stories - Personal Blog

A beautiful, private blog designed to capture and cherish life's most precious moments.

## ✨ Features

- 🔐 **Password Protected** - Keep your memories private and secure
  - Multi-layer authentication check
  - Immediate redirect if not authenticated
  - No content visible without password
  - Session-based security
- 📱 **Responsive Design** - Beautiful on all devices
- 🎨 **Modern UI** - Elegant, Instagram-inspired design
- 🖼️ **Image Support** - Share photos from URLs or local files
- ✏️ **Easy Admin** - Simple interface to add new posts
- 🌙 **Dark Theme** - Easy on the eyes, stunning visuals
- 🔗 **Clean URLs** - No .html extensions in URLs

## 🚀 Getting Started

### Opening the Blog

1. Open `index.html` in your browser
2. Enter the password: `pranathi@love`
3. Enjoy browsing your memories!

### Adding New Posts

1. Click the **"New Post"** button in the navigation
2. Fill in the details:
   - **Image URL**: Paste any image URL from the internet, or upload an image to the `/images` folder and use `images/yourphoto.jpg`
   - **Location**: Where was this moment captured?
   - **Date**: When did this happen?
   - **Caption**: Write something beautiful about this memory
3. Click **"Save Post"**
4. Copy the generated JSON
5. Open `data/posts.json` and add the new post to the array
6. Refresh the feed to see your new post!

## 📁 Project Structure

```
pranathi-blog/
├── index.html          # Login/entrance page (pranathi.in/)
├── feed/
│   └── index.html      # Main blog feed (pranathi.in/feed/)
├── admin/
│   └── index.html      # Create new posts (pranathi.in/admin/)
├── css/
│   └── style.css       # All the beautiful styles
├── js/
│   ├── auth.js         # Authentication logic
│   ├── feed.js         # Feed display logic
│   └── admin.js        # Admin panel logic
├── data/
│   └── posts.json      # All your blog posts
├── images/             # Store your local images here
└── README.md           # This file!
```

## 🔗 Clean URLs (No .html!)

- **Home**: `pranathi.in/`
- **Feed**: `pranathi.in/feed/`
- **Admin**: `pranathi.in/admin/`

## 🎨 Customization

### Change the Password

Edit `js/auth.js` and change the `PASSWORD` constant:
```javascript
const PASSWORD = "your-new-password";
```

### Change Colors

Edit `css/style.css` and modify the color variables:
- Primary gradient: `#ff5fa2` to `#ff8fab` (pink)
- Background: `#0a0a0f` to `#1a1a2e` (dark blue)

### Personalize Text

- **Blog Title**: Edit the `blog-title` in `feed.html`
- **Entrance Message**: Edit the `entrance-subtitle` in `index.html`

## 💡 Tips

1. **Image Sources**:
   - Use [Unsplash](https://unsplash.com) for high-quality free images
   - Upload personal photos to the `/images` folder
   - Make sure image URLs are publicly accessible

2. **Post Order**:
   - Posts are displayed newest first automatically
   - The date you set determines the order

3. **Backup**:
   - Keep a backup of `data/posts.json` regularly
   - This file contains all your posts!

## 🌐 Deploying Online

To make this blog accessible online:

1. **GitHub Pages** (Free):
   - Push this folder to a GitHub repository
   - Enable GitHub Pages in repository settings
   - Your blog will be live at `username.github.io/repo-name`

2. **Netlify** (Free):
   - Drag and drop this folder to [Netlify](https://netlify.com)
   - Your blog will be live instantly with a custom URL

## ❤️ Made with Love

This blog was crafted with care to preserve and celebrate life's beautiful moments. Every feature was designed with love and attention to detail.

---

**Remember**: The best stories are the ones we live and share. Keep creating beautiful memories! ✨
