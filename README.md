# Mark Marasigan Portfolio

A lightweight portfolio for Mark's transition into no-code AI automation.

## Included

- Responsive single-page portfolio
- Featured Dental Booking System project
- Lead Reactivation Workflow project
- Transferable freelance experience
- GA4-ready event tracking
- Microsoft Clarity-ready behavior tracking
- Section-view tracking
- CTA tracking for contact, GitHub, projects, and navigation

## Analytics setup

Open `analytics-config.js` and add your IDs:

```js
window.PORTFOLIO_ANALYTICS = {
  gaMeasurementId: "G-XXXXXXXXXX",
  clarityProjectId: "XXXXXXXXXX"
};
```

If the IDs are blank, the site still works and analytics events are logged to the browser console for testing.

## Suggested GA4 events

- `hero_view_projects`
- `hero_contact`
- `github_click`
- `nav_about`
- `nav_projects`
- `nav_experience`
- `nav_contact`
- `section_view`
- `back_to_top`

## Publishing

This project is static and can be hosted on GitHub Pages, Netlify, Cloudflare Pages, or Vercel.
