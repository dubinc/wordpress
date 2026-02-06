# Release Process

This document outlines the release process for the Dub WordPress plugin.

## Quick Start: Creating a Release

1. **Update version numbers** in these files:
   - `dubinc.php` - Plugin header `Version:` field
   - `dubinc.php` - `DUBCO_PLUGIN_VERSION` constant (line 20)
   - `readme.txt` - `Stable tag:` field

2. **Update the changelog** in `readme.txt`

3. **Commit and tag**:
   ```bash
   git add dubinc.php readme.txt
   git commit -m "Release version 1.0.1"
   git tag v1.0.1
   git push origin main
   git push origin v1.0.1
   ```

4. **Automated process**:
   - GitHub Actions will automatically build the plugin
   - Create a zip file
   - Create a GitHub release
   - (Optional) Deploy to WordPress.org if configured

## GitHub Workflows

### 1. Build and Release (`build-release.yml`)

**Triggers:**
- Pushing a tag matching `v*` pattern (e.g., `v1.0.1`)
- Manual trigger via GitHub Actions UI

**What it does:**
- Installs Node.js and PHP dependencies
- Builds assets using `npm run build`
- Creates a production-ready zip file (excludes dev files)
- Creates a GitHub Release with the zip file attached
- Uploads artifact for download

**To trigger manually:**
1. Go to repository Actions tab
2. Select "Build and Release" workflow
3. Click "Run workflow"

### 2. Deploy to WordPress.org (`deploy-wporg.yml`)

**Triggers:**
- Pushing a tag matching `v*` pattern
- Manual trigger via GitHub Actions UI

**What it does:**
- Builds the plugin
- Deploys to WordPress.org SVN repository
- Creates a new version tag on WordPress.org

**Prerequisites:**
- Plugin must be approved on WordPress.org
- GitHub Secrets must be configured:
  - `SVN_USERNAME`: WordPress.org username
  - `SVN_PASSWORD`: WordPress.org password

**To configure secrets:**
1. Go to repository Settings > Secrets and variables > Actions
2. Click "New repository secret"
3. Add `SVN_USERNAME` and `SVN_PASSWORD`

**To trigger manually:**
1. Go to repository Actions tab
2. Select "Deploy to WordPress.org" workflow
3. Click "Run workflow"
4. Enter version number (without 'v' prefix)

## Files Included in Distribution

The `.distignore` file controls which files are excluded from the distribution.

**Included:**
- `dubinc.php` - Main plugin file
- `uninstall.php` - Uninstall script
- `readme.txt` - WordPress.org readme
- `LICENSE` - License file
- `includes/` - All PHP code
- `dist/` - Built JavaScript, CSS, and images
- `vendor/` - Composer dependencies (production only)
- `languages/` - Translation files
- `screenshots/` - Plugin screenshots

**Excluded:**
- `.github/` - GitHub configuration
- `node_modules/` - Node dependencies
- `assets/js/` and `assets/css/` - Source files (only built files in `dist/`)
- Development configuration files (`.eslintrc.json`, `ruleset.xml`, etc.)
- `README.md` - Developer documentation (use `readme.txt` for WordPress.org)
- `package.json`, `composer.lock` - Build configuration

## Testing the Build Locally

To test the build process locally before pushing:

```bash
# Build assets
npm ci
npm run build

# Install production Composer dependencies
composer install --no-dev --optimize-autoloader

# Create a test build directory
mkdir -p build/dubinc

# Copy files (excluding dev files)
rsync -rc --exclude-from=".distignore" . build/dubinc/ \
  --exclude=build \
  --exclude=.git \
  --exclude=.github \
  --exclude=node_modules \
  --exclude=assets/js \
  --exclude=assets/css

# Create zip
cd build
zip -r ../dubinc.zip dubinc
cd ..

# Test the zip
unzip -l dubinc.zip

# Clean up
rm -rf build dubinc.zip
```

## Version Numbering

Follow [Semantic Versioning](https://semver.org/):

- **Major** (1.0.0): Breaking changes
- **Minor** (1.1.0): New features, backward compatible
- **Patch** (1.0.1): Bug fixes, backward compatible

## Pre-Release Checklist

Before creating a new release:

- [ ] All changes tested locally
- [ ] Version numbers updated in all files
- [ ] Changelog updated in `readme.txt`
- [ ] `Tested up to` field updated if needed
- [ ] All linting passes (`npm run lint-js`, `npm run lint-php`)
- [ ] Build succeeds locally (`npm run build`)
- [ ] No console errors in browser
- [ ] Plugin tested in fresh WordPress installation
- [ ] Composer dependencies up to date (`composer update`)
- [ ] Node dependencies up to date (`npm update`)

## Troubleshooting

### Build fails in GitHub Actions

**Check:**
- Node.js and PHP versions match requirements
- All dependencies are in `package.json` and `composer.json`
- `npm run build` succeeds locally

**Fix:**
```bash
# Test locally
npm ci
composer install --no-dev
npm run build
```

### Zip file missing files

**Check:**
- `.distignore` is not excluding necessary files
- Files exist in repository

**Fix:**
- Review `.distignore` patterns
- Test build locally to verify files

### WordPress.org deploy fails

**Check:**
- SVN credentials are correct in GitHub Secrets
- Plugin slug matches WordPress.org slug (`dubinc`)
- Version format is correct (no 'v' prefix)

**Fix:**
- Update GitHub Secrets
- Verify slug in `deploy-wporg.yml`
- Check WordPress.org plugin status

## Additional Resources

- [WordPress.org Deployment Guide](.wordpress-org/README.md)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [WordPress Plugin Handbook](https://developer.wordpress.org/plugins/)
