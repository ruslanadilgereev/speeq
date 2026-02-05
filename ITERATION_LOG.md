# PflegeAI Iteration Log

## 2025-07-17: Hero Section Layout Fix

**Issue:** Homepage text ("Pflege, intelligent...") was being hidden behind the phone mockup overlay.

**Root Cause:** The ProductMockup component was using absolute positioning (`lg:absolute lg:right-0 lg:top-1/2`) which caused it to overlap with the text content that extended too far right.

**Solution:** 
- Changed hero section from single-column with absolute positioned mockup to proper 2-column CSS Grid layout
- Left column: Text content (badge, headline, subheadline, CTAs, trust signals) with `max-w-xl`
- Right column: Phone mockup with proper spacing
- Slightly adjusted headline size on larger screens for better visual balance

**Commit:** `71fcb6c` - fix: hero section layout - use grid to prevent text/mockup overlap

---
