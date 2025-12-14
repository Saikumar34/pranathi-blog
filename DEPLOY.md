# 🚀 Deploying to GitHub Pages

## Quick Setup for pranathi.in

### 1. Push to GitHub

```bash
cd /Users/saikumarreddy.nadenl/Downloads/pranathi-blog

# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "✨ Beautiful new blog design"

# Add your GitHub repository
git remote add origin https://github.com/YOUR_USERNAME/pranathi-blog.git

# Push to main branch
git push -u origin main
```

### 2. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings**
3. Scroll down to **Pages** (in the left sidebar)
4. Under **Source**, select **main** branch
5. Click **Save**

### 3. Custom Domain (pranathi.in)

Your `CNAME` file is already configured with `pranathi.in`!

To connect it:
1. In your domain registrar (where you bought pranathi.in):
2. Add these DNS records:
   ```
   Type: CNAME
   Name: www
   Value: YOUR_USERNAME.github.io
   
   Type: A
   Name: @
   Values:
   185.199.108.153
   185.199.109.153
   185.199.110.153
   185.199.111.153
   ```

### 4. Access Your Blog

After deployment (takes 1-2 minutes):
- Direct: `https://YOUR_USERNAME.github.io/pranathi-blog/`
- Custom domain: `https://pranathi.in/` (after DNS setup)

**Clean URLs (no .html!):**
- Home: `pranathi.in/`
- Feed: `pranathi.in/feed/`
- Admin: `pranathi.in/admin/`

## 📝 Making Updates

When you add new posts or make changes:

```bash
# Add changes
git add .

# Commit with a message
git commit -m "Added new post"

# Push to GitHub
git push
```

GitHub Pages will automatically update your site within 1-2 minutes!

## ✅ Files Ready for GitHub

All files are now optimized for GitHub Pages:
- ✅ `.nojekyll` - Ensures proper file serving
- ✅ `CNAME` - Custom domain configured
- ✅ Static HTML - No server needed
- ✅ All paths are relative - Works everywhere

## 🎉 You're All Set!

Your blog is now ready to be pushed to GitHub and will work perfectly on pranathi.in!
