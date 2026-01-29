# Debugging Image Loading Issues

## Changes Made

I've improved error handling and logging throughout the image fetching system to help diagnose why images aren't appearing on your remote site.

### Key Improvements:

1. **Enhanced Error Logging** (`common/images.js`):
   - Added detailed error messages for API failures
   - Logs HTTP status codes and error responses
   - Warns when no images are found in folders
   - Logs successful image fetches with counts

2. **Better Build-Time Error Reporting** (`pages/galleries/[gallerySlug].js`):
   - Added logging in `getStaticProps` to track which folders are being fetched
   - Warns when folders return empty results
   - Logs full error details for debugging

3. **Configurable API Key**:
   - API key can now be set via environment variables:
     - `GOOGLE_CLOUD_STORAGE_API_KEY` (server-side)
     - `NEXT_PUBLIC_GOOGLE_CLOUD_STORAGE_API_KEY` (client-side)
   - Falls back to hardcoded key if not set

## How to Debug

### 1. Check Build Logs

When you run `npm run build`, you should now see detailed logs like:
```
[getStaticProps] Fetching images for folder: landscapes/arizona/antelepe-canyon
Successfully fetched 15 images from folder landscapes/arizona/antelepe-canyon
[getStaticProps] Successfully fetched 15 images for folder landscapes/arizona/antelepe-canyon
```

If you see errors or warnings, that's where the problem is.

### 2. Test the API Key

You can test if your API key is working by running this in your browser console or a Node.js script:

```javascript
const apiKey = "YOUR_API_KEY";
const folder = "landscapes/arizona/antelepe-canyon";
const url = `https://storage.googleapis.com/storage/v1/b/swamiphoto/o?prefix=photos/${folder}/&key=${apiKey}`;

fetch(url)
  .then(res => res.json())
  .then(data => {
    console.log("Response:", data);
    if (data.error) {
      console.error("API Error:", data.error);
    } else if (data.items) {
      console.log(`Found ${data.items.length} items`);
    }
  })
  .catch(err => console.error("Fetch error:", err));
```

### 3. Verify Images Are Accessible

Test if individual images are accessible by opening them directly in a browser:
```
https://storage.googleapis.com/swamiphoto/photos/landscapes/arizona/antelepe-canyon/AR503758.jpg
```

If images don't load directly, there might be:
- CORS issues
- Bucket permissions issues
- Images don't exist at those paths

### 4. Common Issues and Solutions

#### Issue: API Key Invalid or Restricted
**Symptoms**: HTTP 403 or 401 errors in build logs
**Solution**: 
- Verify the API key is valid in Google Cloud Console
- Check that the API key has permissions for Cloud Storage API
- Consider using environment variables instead of hardcoded key

#### Issue: Images Fetched at Build Time But Not Showing
**Symptoms**: Build succeeds but images don't appear on site
**Solution**:
- Check if images were actually fetched (look for "Successfully fetched X images" in build logs)
- If folders return 0 images, verify the folder paths are correct
- Rebuild the site after fixing issues

#### Issue: Some Images Work Locally But Not on Server
**Symptoms**: Images appear in development but not in production
**Solution**:
- This suggests a build-time issue - the static site was built with empty image arrays
- Rebuild the site: `npm run build`
- Check that the build environment can access Google Cloud Storage API
- Verify API key works in the deployment environment

#### Issue: CORS Errors
**Symptoms**: Browser console shows CORS errors
**Solution**:
- Configure CORS on your Google Cloud Storage bucket
- Or use a proxy/API route to fetch images server-side

### 5. Next Steps

1. **Run a build and check the logs**:
   ```bash
   npm run build
   ```
   Look for warnings and errors about image fetching.

2. **If images aren't being fetched**:
   - Verify the API key is valid
   - Check that folder paths in `galleries.js` match actual folder structure in Google Cloud Storage
   - Test the API endpoint manually (see step 2 above)

3. **If images are fetched but not displaying**:
   - Check browser console for errors
   - Verify image URLs are correct
   - Check if `getCloudimageUrl` is modifying URLs incorrectly

4. **Consider using ISR (Incremental Static Regeneration)**:
   If images change frequently, consider switching from `getStaticProps` to `getServerSideProps` or using ISR with `revalidate`.

## Environment Variables

To use environment variables for the API key, create a `.env.local` file:

```
GOOGLE_CLOUD_STORAGE_API_KEY=your_api_key_here
```

Or for client-side access:
```
NEXT_PUBLIC_GOOGLE_CLOUD_STORAGE_API_KEY=your_api_key_here
```

**Note**: Be careful not to commit `.env.local` to git if it contains sensitive keys.

