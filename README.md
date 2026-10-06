# Saukhya Speech, Language & Hearing Clinic Website

A fast, mobile-first, production-ready website for **Saukhya**, a speech, language and hearing clinic located in Vikhroli, Mumbai.

Built with **Astro**, **Tailwind CSS**, and **Vanilla JavaScript** for maximum performance (Lighthouse 90+), Core Web Vitals, accessibility (WCAG AA), and high conversion for phone calls, WhatsApp enquiries, and Google Maps directions.

---

## Table of Contents
1. [Project Setup](#1-project-setup)
2. [Install Dependencies](#2-install-dependencies)
3. [Development Command](#3-development-command)
4. [Production Build](#4-production-build)
5. [Preview Command](#5-preview-command)
6. [How to Edit site.config.json](#6-how-to-edit-siteconfigjson)
7. [How to Add/Edit Translations](#7-how-to-addedit-translations)
8. [How to Replace Images](#8-how-to-replace-images)
9. [How to Change Phone Number](#9-how-to-change-phone-number)
10. [How to Change WhatsApp Number](#10-how-to-change-whatsapp-number)
11. [How to Change Google Maps Link & Embed](#11-how-to-change-google-maps-link--embed)
12. [How to Change Google Review Link](#12-how-to-change-google-review-link)
13. [How to Change Clinic Timings](#13-how-to-change-clinic-timings)
14. [How to Configure Camp Banner & Registrations](#14-how-to-configure-camp-banner--registrations)
15. [How to Configure Holiday / Closure Notice](#15-how-to-configure-holiday--closure-notice)
16. [How to Configure Fees & Pricing](#16-how-to-configure-fees--pricing)
17. [How to Configure Analytics (GA4 / Plausible)](#17-how-to-configure-analytics-ga4--plausible)
18. [How to Configure Decap CMS](#18-how-to-configure-decap-cms)
19. [How to Give Receptionist CMS Access](#19-how-to-give-receptionist-cms-access)
20. [Netlify Deployment](#20-netlify-deployment)
21. [Vercel Deployment](#21-vercel-deployment)
22. [Custom Domain Setup](#22-custom-domain-setup)
23. [HTTPS Setup](#23-https-setup)
24. [SEO Verification](#24-seo-verification)
25. [Google Search Console Setup](#25-google-search-console-setup)
26. [Placeholder Replacement Checklist](#26-placeholder-replacement-checklist)

---

## 1. Project Setup

Ensure you have **Node.js v20+** or higher installed on your system.

```bash
git clone https://github.com/your-username/saukhya.git
cd saukhya
```

---

## 2. Install Dependencies

```bash
npm install
```

---

## 3. Development Command

Run the local development server:

```bash
npm run dev
```

Or run in background mode (per Astro guidelines):
```bash
npx astro dev --background
```

The site will be accessible locally at `http://localhost:4321`.

---

## 4. Production Build

Compile the static production bundle:

```bash
npm run build
```

The static output is generated in the `dist/` directory, ready to deploy to Netlify, Vercel, or any static host.

---

## 5. Preview Command

Preview the production build locally:

```bash
npm run preview
```

---

## 6. How to Edit `site.config.json`

All clinic parameters, address details, doctor qualifications, services, opening hours, pricing, and photo paths are centrally managed in:

`src/content/site.config.json`

### File Structure:
- `clinic`: Name, phone, WhatsApp number, email, address, landmark, parking, entrance information, geo coordinates.
- `hours`: Monday through Sunday schedules (`open`, `close`, `isClosed`, `label`).
- `google`: Verified star rating, review count, direct review link, Google Maps link, and Google Maps iframe embed URL.
- `trust`: Years of clinical experience, multidisciplinary tag, languages.
- `pricing`: Pricing display mode (`"from"` or `"contact"`), consultation starting fee, disclaimer.
- `camp`: Camp announcement settings (`enabled`, `title`, `description`, `date`, `time`, `location`, `registrationStatus`).
- `holiday`: Holiday notice banner (`enabled`, `message`, `startDate`, `endDate`).
- `team`: Specialists profiles (Name, role, qualification, experience, areas of focus, languages, photo, RCI registration).
- `services`: Detailed list of speech and audiology services.
- `reviews`: Genuine patient and parent feedback quotes.
- `photos`: Image paths for hero, clinic gallery, and about page facilities.
- `analytics`: Provider (`"none"`, `"ga4"`, `"plausible"`) and tracking ID.

---

## 7. How to Add/Edit Translations

User-facing UI copy and labels are localized across three languages:
- **English**: `src/i18n/en.json`
- **Hindi (हिन्दी)**: `src/i18n/hi.json`
- **Marathi (मराठी)**: `src/i18n/mr.json`

All three files share identical key structures. When editing existing copy or adding new keys, update all three files to keep translations in sync. The browser client automatically persists user language selection in `localStorage.getItem('saukhya_lang')`.

---

## 8. How to Replace Images

Replace the placeholder SVGs in `public/images/` with real photographs provided by the clinic:

- **Hero Photo**: `public/images/hero-clinic.svg` &rarr; replace with `hero-clinic.webp` (800x600px recommended).
- **Specialist Portraits**:
  - `public/images/team/doctor-1.svg` (400x400px square portrait).
  - `public/images/team/doctor-2.svg` (400x400px square portrait).
- **Clinic Facilities**:
  - `public/images/clinic/entrance.svg` (Clinic front & accessibility ramp).
  - `public/images/clinic/therapy-room.svg` (Pediatric therapy room).
  - `public/images/clinic/audiology-booth.svg` (Sound-treated testing booth).
  - `public/images/clinic/consultation-area.svg` (Doctor desk).
  - `public/images/clinic/waiting-area.svg` (Reception lounge).
  - `public/images/clinic/camp-photo.svg` (Community outreach photo).

*Tip: Use modern WebP or AVIF formats for smallest file size and fastest mobile load times.*

---

## 9. How to Change Phone Number

Open `src/content/site.config.json` and update:

```json
"clinic": {
  "phone": "+91 98200 XXXXX",
  "phoneRaw": "+9198200XXXXX"
}
```

- `phone`: Formatted number displayed on screen.
- `phoneRaw`: Digits with country code used in `tel:` click-to-call links.

---

## 10. How to Change WhatsApp Number

Open `src/content/site.config.json` and update:

```json
"clinic": {
  "whatsapp": "+91 98200 XXXXX",
  "whatsappRaw": "9198200XXXXX"
}
```

- `whatsappRaw`: Pure digits with country code `91` (no spaces, plus signs, or hyphens) used in `https://wa.me/91XXXXXXXXXX`.

---

## 11. How to Change Google Maps Link & Embed

1. Search for **Saukhya Clinic** on Google Maps.
2. Click **Share** &rarr; **Copy link** &rarr; Paste into `mapsLink`.
3. Click **Embed a map** &rarr; Copy the `src="..."` URL from the iframe code &rarr; Paste into `mapsEmbedUrl`.

In `src/content/site.config.json`:
```json
"google": {
  "mapsLink": "https://maps.google.com/?q=Saukhya+Clinic+Vikhroli+Mumbai",
  "mapsEmbedUrl": "https://www.google.com/maps/embed?pb=..."
}
```

---

## 12. How to Change Google Review Link

1. Open your Google Business Profile manager.
2. Click **Ask for reviews** &rarr; Copy the short review URL (e.g. `https://g.page/r/.../review`).
3. Paste into `src/content/site.config.json`:

```json
"google": {
  "reviewLink": "https://g.page/r/YOUR_VERIFIED_REVIEW_LINK/review"
}
```

*Note: The website directs users straight to this genuine Google Review URL without any review gating.*

---

## 13. How to Change Clinic Timings

Edit the schedule in `src/content/site.config.json`:

```json
"hours": {
  "monday": { "open": "10:00", "close": "20:00", "isClosed": false, "label": "10:00 AM – 8:00 PM" },
  "sunday": { "open": "10:00", "close": "14:00", "isClosed": true, "label": "Closed" }
}
```

The website dynamically calculates whether the clinic is currently **"Open now"**, **"Opens today at 10:00 AM"**, or **"Closed · Opens tomorrow at 10:00 AM"** in Indian Standard Time (IST).

---

## 14. How to Configure Camp Banner & Registrations

To activate the camp banner across the site:

```json
"camp": {
  "enabled": true,
  "title": "Free Pediatric Speech & Hearing Screening Camp",
  "description": "Comprehensive evaluation for speech delay, stammering, and hearing issues.",
  "date": "Sunday, 25 October",
  "time": "10:00 AM – 3:00 PM",
  "location": "Saukhya Clinic, Vikhroli, Mumbai",
  "registrationStatus": "Open"
}
```

When visitors click **Register on WhatsApp**, a modal opens to collect their name, child's age, and concern, and creates a pre-filled WhatsApp message. No patient data is stored on web servers.

---

## 15. How to Configure Holiday / Closure Notice

To announce a holiday closure at the top of the website:

```json
"holiday": {
  "enabled": true,
  "message": "Clinic closed on 2 October (Gandhi Jayanti). We reopen on 3 October at 10:00 AM.",
  "startDate": "2026-10-02",
  "endDate": "2026-10-02"
}
```

The banner automatically hides once `endDate` passes.

---

## 16. How to Configure Fees & Pricing

In `src/content/site.config.json`:

### Mode A: Show Starting Fee
```json
"pricing": {
  "mode": "from",
  "consultationFrom": "900",
  "currency": "₹",
  "note": "Fees may vary depending on the service. Please contact the clinic for current fees."
}
```

### Mode B: Message for Fees
```json
"pricing": {
  "mode": "contact",
  "note": "Fees may vary depending on the service. Please contact the clinic for current fees."
}
```

---

## 17. How to Configure Analytics (GA4 / Plausible)

In `src/content/site.config.json`:

### Google Analytics 4 (GA4):
```json
"analytics": {
  "provider": "ga4",
  "id": "G-XXXXXXXXXX"
}
```

### Plausible Analytics:
```json
"analytics": {
  "provider": "plausible",
  "id": "saukhyaclinic.com"
}
```

### Tracked Events (Privacy-Safe, Zero PII):
- `call_click`
- `whatsapp_click` (includes `service` identifier)
- `directions_click`
- `review_click`
- `camp_form_submit`
- `language_change`

---

## 18. How to Configure Decap CMS

Decap CMS is available at:

`https://yourdomain.com/admin/`

Configuration file: `public/admin/config.yml`

The CMS is configured with strict field definitions that **only** allow editing:
1. Clinic timings (`hours`)
2. Camp banner details (`camp`)
3. Holiday notice banner (`holiday`)
4. Google rating & review count (`google.rating`, `google.reviewCount`)

All critical technical settings (phone numbers, WhatsApp numbers, SEO tags, analytics IDs, Google embed links, scripts, and privacy terms) are completely locked out from CMS access.

---

## 19. How to Give Receptionist CMS Access

### On Netlify:
1. Go to your Netlify site dashboard &rarr; **Site configuration** &rarr; **Identity**.
2. Click **Enable Identity**.
3. Under **Registration preferences**, set to **Invite only**.
4. Under **Services** &rarr; **Git Gateway**, click **Enable Git Gateway**.
5. Click **Invite users** &rarr; Enter the receptionist's email address.
6. The receptionist will receive an email invitation to create a password.
7. They can log in at `https://yourdomain.com/admin/` to update hours and banners.

---

## 20. Netlify Deployment

1. Push your repository to GitHub / GitLab.
2. In Netlify, click **Add new site** &rarr; **Import an existing project**.
3. Build settings are auto-detected:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
4. Click **Deploy Saukhya**.

---

## 21. Vercel Deployment

1. Import your GitHub repository in the Vercel Dashboard.
2. Framework Preset: **Astro**.
3. **Build Command**: `npm run build`
4. **Output Directory**: `dist`
5. Click **Deploy**.

---

## 22. Custom Domain Setup

1. In Netlify / Vercel, navigate to **Domain Management** &rarr; **Add custom domain** (e.g. `saukhyaclinic.com`).
2. Log into your domain registrar (GoDaddy, Namecheap, Google Domains, etc.).
3. Add the DNS records:
   - **A Record**: `@` &rarr; Points to host IP (e.g., `75.2.60.5` for Netlify or `76.76.21.21` for Vercel).
   - **CNAME Record**: `www` &rarr; Points to your host site URL.

---

## 23. HTTPS Setup

Both Netlify and Vercel automatically provision and renew a free **Let's Encrypt SSL Certificate** once DNS propagates. Ensure "Enforce HTTPS" is toggled ON in your host settings.

---

## 24. SEO Verification

1. **Schema.org Structured Data**: Validate `MedicalBusiness` schema using Google's [Rich Results Test](https://search.google.com/test/rich-results).
2. **Sitemap**: Verify `https://yourdomain.com/sitemap-index.xml` is accessible.
3. **Robots.txt**: Verify `https://yourdomain.com/robots.txt` is accessible.
4. **Hreflang Tags**: Supports `en`, `hi`, `mr`, and `x-default`.

---

## 25. Google Search Console Setup

1. Open [Google Search Console](https://search.google.com/search-console).
2. Add Property &rarr; Enter your domain (`saukhyaclinic.com`).
3. Verify ownership via DNS TXT record or HTML file.
4. Under **Sitemaps**, submit: `https://saukhyaclinic.com/sitemap-index.xml`.

---

## 26. Placeholder Replacement Checklist

Before launching on a live domain, replace every placeholder marked in brackets:

- [ ] **Clinic phone number**: Replace `+91 98200 00000` / `+919820000000` with actual clinic phone.
- [ ] **WhatsApp number**: Replace `919820000000` with actual WhatsApp business number.
- [ ] **Email address**: Replace `contact@saukhyaclinic.com` with actual contact email.
- [ ] **Full address**: Replace `[SHOP_NO]`, `[BUILDING_NAME]`, `[STREET_NAME]` with verified clinic address in Vikhroli.
- [ ] **Pincode**: Verify Vikhroli pincode (`400083` or exact local zone).
- [ ] **Landmark**: Verify proximity notes (e.g., Near Vikhroli Station East / West).
- [ ] **Parking information**: Update `[PARKING_INFO]` with real parking availability.
- [ ] **Entrance information**: Update `[ENTRANCE_INFO]` with ground floor / wheelchair access details.
- [ ] **Opening hours**: Verify exact weekday and Saturday timings.
- [ ] **Doctor 1 Name**: Replace `Dr. [DOCTOR_NAME_1]` with certified specialist name.
- [ ] **Doctor 1 Qualification**: Replace with verified degree (`BASLP, MASLP`, etc.).
- [ ] **Doctor 1 Photo**: Replace `public/images/team/doctor-1.svg` with high-resolution doctor portrait.
- [ ] **Doctor 1 Experience**: Replace `[X]+ years` with verified years of clinical practice.
- [ ] **Doctor 1 RCI Registration**: Replace `[RCI_NUMBER_1]` with Rehabilitation Council of India reg number.
- [ ] **Doctor 2 Name & Details**: Replace Doctor 2 placeholders or remove if solo practitioner.
- [ ] **Languages spoken**: Confirm languages spoken by staff (English, Hindi, Marathi, Gujarati).
- [ ] **Actual service list**: Confirm all offered speech therapy and audiology services.
- [ ] **Consultation fee**: Set starting fee amount (e.g., `₹900`) or set `"mode": "contact"`.
- [ ] **Google rating**: Enter actual verified Google star rating.
- [ ] **Google review count**: Enter actual verified number of reviews.
- [ ] **Google review link**: Replace `[GOOGLE_REVIEW_LINK]` with verified Google Business review URL.
- [ ] **Google Maps link**: Replace with verified Google Maps sharing URL.
- [ ] **Google Maps embed URL**: Replace `[GOOGLE_MAPS_EMBED_URL]` with verified Google Maps iframe embed URL.
- [ ] **Latitude & Longitude**: Update coordinates for exact map pin.
- [ ] **Clinic logo**: Replace `public/images/logo.svg` and `public/favicon.svg` with official logo files.
- [ ] **Hero image**: Replace `public/images/hero-clinic.svg` with authentic clinic therapy photo.
- [ ] **Clinic photos**: Replace `public/images/clinic/*.svg` with authentic therapy room and audiology booth photos.
- [ ] **Equipment photos**: Replace placeholder graphics with verified diagnostic audiometer photos.
- [ ] **Camp information**: Update or keep `"enabled": false` until a real camp is scheduled.
- [ ] **Holiday notice**: Update or keep `"enabled": false` until a holiday closure occurs.
- [ ] **Privacy contact details**: Confirm legal contact phone and email for DPDP queries.
- [ ] **Analytics ID**: Insert Google Analytics (`G-XXXXXXXXXX`) or Plausible domain.
- [ ] **Social media links**: Add verified Instagram / Facebook links or leave blank.

---

*Site developed with Astro, Tailwind CSS, and standard web technologies for Saukhya Speech, Language & Hearing Clinic.*
