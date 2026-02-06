# WordPress.org Deployment Guide

This guide explains how to deploy the Dub WordPress plugin to WordPress.org.

## Prerequisites

1. **WordPress.org Plugin Directory Account**
   - Your plugin must be approved and listed on WordPress.org
   - You need SVN credentials for your WordPress.org account

2. **GitHub Secrets**
   - Go to your GitHub repository Settings > Secrets and variables > Actions
   - Add the following secrets:
     - `SVN_USERNAME`: Your WordPress.org username
     - `SVN_PASSWORD`: Your WordPress.org password

## Automated Deployment

The automated deployment workflow is configured in `.github/workflows/deploy-wporg.yml`.

### Method 1: Deploy via Git Tag (Recommended)

1. Update the version in both files:
   - `dubinc.php` (Version in header and `DUBCO_PLUGIN_VERSION` constant)
   - `readme.txt` (Stable tag)

2. Commit the version changes:
   ```bash
   git add dubinc.php readme.txt
   git commit -m "Bump version to 1.0.1"
   ```

3. Create and push a git tag:
   ```bash
   git tag v1.0.1
   git push origin v1.0.1
   ```

4. The workflow will automatically:
   - Build the plugin
   - Deploy to WordPress.org SVN repository
   - Create a GitHub release

### Method 2: Manual Trigger

1. Go to Actions tab in GitHub
2. Select "Deploy to WordPress.org" workflow
3. Click "Run workflow"
4. Enter the version number (without 'v' prefix)
5. Click "Run workflow"

## Manual Deployment (If GitHub Actions Unavailable)

If you need to deploy manually via SVN:

### 1. Build the Plugin

```bash
# Install dependencies
composer install --no-dev --optimize-autoloader
npm ci
npm run build
```

### 2. Checkout SVN Repository

```bash
# Checkout the WordPress.org SVN repository
svn co https://plugins.svn.wordpress.org/dubinc dubinc-svn
cd dubinc-svn
```

### 3. Copy Files to Trunk

```bash
# Copy plugin files to trunk (excluding dev files)
rsync -rc --exclude-from="../.distignore" ../ trunk/ \
  --exclude=dubinc-svn \
  --exclude=.git \
  --exclude=.github \
  --exclude=node_modules \
  --exclude=assets/js \
  --exclude=assets/css
```

### 4. Update Assets

Copy screenshots and banner images to the `assets` folder:

```bash
# Copy screenshots (if not already in trunk/screenshots/)
cp trunk/screenshots/* assets/

# Optionally add banner and icon images
# banner-772x250.png
# banner-1544x500.png
# icon-128x128.png
# icon-256x256.png
```

### 5. Commit to Trunk

```bash
# Add new files
svn add trunk/* --force

# Remove deleted files
svn status | grep '^!' | awk '{print $2}' | xargs svn delete

# Commit changes
svn ci -m "Update to version 1.0.1"
```

### 6. Create a Tag

```bash
# Copy trunk to a new tag
svn cp trunk tags/1.0.1
svn ci -m "Tagging version 1.0.1"
```

### 7. Update Stable Tag

Make sure `readme.txt` has the correct stable tag:

```
Stable tag: 1.0.1
```

## WordPress.org Plugin Assets

The WordPress.org plugin directory supports additional assets:

### Screenshots
- Place in `/screenshots/` directory in your plugin
- Referenced in `readme.txt` like: `1. Screenshot description`
- Supported formats: PNG, JPG, GIF

### Plugin Header Images
Place these in the SVN `assets/` directory (not in plugin trunk):

- `banner-772x250.png` - Plugin header (required)
- `banner-1544x500.png` - High-DPI header
- `icon-128x128.png` - Plugin icon (required)
- `icon-256x256.png` - High-DPI icon

### Creating Assets via SVN

```bash
# Navigate to your SVN checkout
cd dubinc-svn/assets

# Add your banner and icon files here
# Then commit
svn add banner-772x250.png icon-128x128.png
svn ci -m "Add plugin assets"
```

## Troubleshooting

### Build Fails
- Ensure Node.js 18+ and PHP 7.4+ are available
- Check that all dependencies install correctly
- Verify `npm run build` works locally

### SVN Authentication Issues
- Verify your SVN credentials are correct
- Try manually: `svn co https://plugins.svn.wordpress.org/dubinc --username=your-username`
- Update GitHub secrets if credentials changed

### Version Mismatch
- Ensure version is consistent in:
  - `dubinc.php` (plugin header)
  - `dubinc.php` (DUBCO_PLUGIN_VERSION constant)
  - `readme.txt` (Stable tag)
  - Git tag (v prefix)

## Version Checklist

Before releasing a new version:

- [ ] Update version in `dubinc.php` plugin header
- [ ] Update `DUBCO_PLUGIN_VERSION` constant in `dubinc.php`
- [ ] Update `Stable tag` in `readme.txt`
- [ ] Update `Tested up to` in `readme.txt` (if needed)
- [ ] Add changelog entry in `readme.txt`
- [ ] Commit all changes
- [ ] Create git tag: `git tag v1.0.x`
- [ ] Push tag: `git push origin v1.0.x`
- [ ] Verify GitHub Action completes successfully
- [ ] Check plugin page on WordPress.org

## Resources

- [WordPress Plugin Developer Handbook](https://developer.wordpress.org/plugins/)
- [WordPress Plugin SVN Guide](https://developer.wordpress.org/plugins/wordpress-org/how-to-use-subversion/)
- [WordPress readme.txt Validator](https://wordpress.org/plugins/developers/readme-validator/)
- [10up WordPress Plugin Deploy Action](https://github.com/10up/action-wordpress-plugin-deploy)
