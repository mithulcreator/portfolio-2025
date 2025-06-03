# Portfolio 2025

## Frontend (Vercel Deployment)
- **URL**: https://portfolio-2025-beta-roan.vercel.app
- **Repository**: https://github.com/mithulcreator/portfolio-2025
- **Framework**: Vite + React
- **Styling**: TailwindCSS

### Local Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Environment Variables
Create a `.env` file in the root directory:
```env
VITE_SANITY_PROJECT_ID=2h4b4cv1
VITE_SANITY_DATASET=mithport56
```

## Backend (Sanity Studio)
- **Project ID**: 2h4b4cv1
- **Dataset**: mithport56
- **Studio URL**: http://localhost:3333 (when running locally)

### Local Sanity Studio Setup
```bash
# Navigate to Sanity project
cd mithul-portfolio

# Install dependencies
npm install

# Start Sanity Studio
npm run dev
# or
sanity dev
```

### CORS Settings
In Sanity Dashboard (sanity.io/manage):
1. Go to API tab
2. Under CORS Origins, add:
   - http://localhost:5173
   - http://localhost:3333
   - https://portfolio-2025-beta-roan.vercel.app
3. For each URL:
   - Check "Allow Credentials"
   - Select "Production" environment

### Content Types
1. **Homepage**
   - Hero Title
   - Hero Subtitle
   - Hero Image
   - Featured Projects
   - CTA Text and Link

2. **Projects**
   - Title
   - Slug
   - Cover Image
   - Gallery
   - Type
   - Role
   - Tools
   - Timeline
   - Description
   - Process
   - Outcome

3. **About**
   - Bio
   - Skills
   - Experience
   - Education
   - Profile Image

4. **Testimonials**
   - Name
   - Company
   - Quote
   - Rating
   - Image

5. **Site Settings**
   - Logo
   - Contact Email
   - Social Links

## Deployment
### Frontend (Vercel)
1. Push changes to GitHub
2. Vercel automatically deploys
3. Environment variables are set in Vercel dashboard

### Backend (Sanity)
1. Run Sanity Studio locally
2. Make content changes
3. Click "Publish" to update live site

## Security
- HTTPS enabled (Vercel)
- CORS properly configured
- Environment variables for sensitive data
- Production build with optimized code

## Maintenance
1. **Regular Updates**
   - Keep dependencies updated
   - Run `npm audit` for security checks
   - Monitor Vercel and Sanity dashboards

2. **Content Updates**
   - Use Sanity Studio locally
   - Publish changes to update live site

3. **Performance Monitoring**
   - Use Vercel Analytics
   - Check Lighthouse scores
   - Monitor Sanity API usage

## Support
For any issues:
1. Check Vercel deployment logs
2. Verify Sanity CORS settings
3. Ensure environment variables are set correctly
4. Check browser console for errors
