# Newsletter Maker

Next.js (App Router) + Tailwind. **Banner, Sponsors, and Socials are hardcoded components** (replace their markup with your own). Three content layout options as requested. Repeater adds multiple pages and exports to true A4 PDF.

## Run
```bash
npm i
npm run dev
```

## Export to PDF
- **Download PDF**: client-side (html2canvas + jsPDF)
- **Print**: system print dialog; A4 via `@page` CSS

## Customize
- `components/BannerHardcoded.jsx` → top banner
- `components/SponsorsHardcoded.jsx` → sponsors strip
- `components/SocialsHardcoded.jsx` → socials bar
- Content layouts: `LayoutOne/Two/Three.jsx`
