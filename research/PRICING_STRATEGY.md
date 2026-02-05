# PflegeAI Pricing Strategy Analysis

**Date:** 2026-02-05  
**Purpose:** Define optimal pricing model for investor pitch and go-to-market

---

## Executive Summary

**Recommended Model:** Hybrid facility-based + per-resident pricing with Hardware-as-a-Service (HaaS)

| Component | Price | Rationale |
|-----------|-------|-----------|
| Base Platform | €299/month/facility | Nurse documentation module (VOIZE-competitive) |
| Resident Communication | €8/resident/month | Premium bidirectional feature (UNIQUE) |
| Smartwatch (HaaS) | €12/device/month | Includes device, maintenance, replacement |
| **Average Deal** | **€650-750/month** | For 50-bed facility with 30 watches |

**Key Insight:** Price nurse documentation competitively, then charge premium for the blue ocean (resident→caregiver communication).

---

## 1. Pricing Model Options Analysis

### A. Per-Facility (Flat Fee)

**How it works:** Fixed monthly fee regardless of size

| Pros | Cons |
|------|------|
| Simple to sell | Doesn't scale with value |
| Predictable for buyer | Small facilities overpay |
| Easy to forecast | Large facilities underpay |

**Competitors using this:** CareSocial (€199-399/mo), most ambulant software

**Verdict:** ❌ Not recommended as primary model - leaves money on table for larger facilities

---

### B. Per-User (Seat-Based)

**How it works:** Charge per nurse/caregiver account

| Pros | Cons |
|------|------|
| Common SaaS model | Discourages adoption |
| Scales with usage | Facilities may limit users |
| Easy to understand | Doesn't capture resident value |

**Competitors using this:** VOIZE (~€15-25/user/month estimated)

**Verdict:** ⚠️ Suboptimal for PflegeAI - we want maximum nurse adoption, and resident communication doesn't fit this model

---

### C. Per-Bed/Resident

**How it works:** Charge based on facility capacity (beds) or active residents

| Pros | Cons |
|------|------|
| Scales with facility size | New concept for market |
| Captures resident communication value | Requires explaining |
| Aligns with how facilities budget | Need to track residents |

**Competitors using this:** VOIZE (hybrid), enterprise ERP systems

**Verdict:** ✅ Perfect for resident communication module - natural value metric

---

### D. Hardware-as-a-Service (HaaS)

**How it works:** Bundle smartwatch hardware into monthly subscription

| Pros | Cons |
|------|------|
| Low upfront cost for buyer | Working capital needs |
| Recurring revenue stream | Device logistics |
| Creates switching costs | Replacement costs |
| Predictable (investors love) | Inventory management |

**Best Practice:** "Razor and blades" model - sell hardware at/below cost, monetize software

**Verdict:** ✅ Essential for smartwatch deployment - reduces friction, creates moat

---

## 2. Competitive Pricing Landscape

### German Nursing Software Pricing

| Competitor | Model | Price Range | Notes |
|------------|-------|-------------|-------|
| **VOIZE** | Per-user | €15-25/user/mo (est.) | No public pricing, enterprise sales |
| **MEDIFOX DAN** | Enterprise license | €500-2,000/mo (est.) | Full ERP, complex pricing |
| **Connext VIVENDI** | Module-based | €500+/mo | Enterprise, integration-heavy |
| **CareSocial** | Per-facility | €199-399/mo | Simpler features |
| **Ambulante SW** | Per-facility | €195+/mo | Ambulant focus |

### Price Sensitivity Analysis

**Average facility (80 beds, 60 nurses):**
- Operating costs: ~€250,000-400,000/month
- Resident fees: €3,000-5,000/resident/month revenue
- Software tolerance: 0.1-0.3% of operating costs = **€250-1,200/month**

**Key Insight:** Facilities can easily afford €500-1,000/month for meaningful efficiency gains. The barrier is proving ROI, not price.

---

## 3. Recommended PflegeAI Pricing Model

### Three-Tier Hybrid Structure

#### Tier 1: "Dokumentation" (Compete with VOIZE)
**Nurse voice documentation module**

| Item | Price |
|------|-------|
| Platform fee | €299/month/facility |
| Includes | Unlimited nurse users, voice-to-text, AI structuring |
| Target | All facilities, land-and-expand |

**Positioning:** Same price or cheaper than VOIZE to win on documentation

---

#### Tier 2: "Kommunikation" (Blue Ocean Premium)
**Resident → Caregiver communication module**

| Item | Price |
|------|-------|
| Per-resident fee | €8/resident/month |
| Includes | AI prioritization, push notifications, analytics |
| Requirements | Tier 1 + smartwatch deployment |

**Calculation for 50-bed facility:**
- 50 residents × €8 = €400/month additional
- **Value proposition:** "Less than €0.27/day per resident for peace of mind"

---

#### Tier 3: "Hardware" (Smartwatch HaaS)
**Devices on subscription**

| Item | Price |
|------|-------|
| Per-device fee | €12/device/month |
| Includes | Smartwatch, SIM/connectivity, replacement warranty |
| Hardware cost | ~€80-150 device (amortized over 24mo) |
| Margin | ~30-50% after COGS |

**Calculation for 30 devices:**
- 30 × €12 = €360/month
- Device cost: 30 × €120 = €3,600 upfront (recovered in 10 months)

---

### Complete Deal Example

**Mid-size facility (80 beds, 50 communication-enabled residents, 40 watches):**

| Component | Calculation | Monthly |
|-----------|-------------|---------|
| Platform (Tier 1) | Base | €299 |
| Communication (Tier 2) | 50 × €8 | €400 |
| Hardware (Tier 3) | 40 × €12 | €480 |
| **Total** | | **€1,179/month** |
| **Annual Contract** | | **€14,148/year** |

---

## 4. Pricing Psychology & Tactics

### Anchoring Strategy
1. **Lead with full value:** "Complete solution for €1,500/month"
2. **Then offer modular:** "Or start with documentation only at €299"
3. **Upsell path clear:** Easy expansion when they see value

### Discount Policy
| Scenario | Discount |
|----------|----------|
| Annual prepay | 10-15% |
| Multi-facility (3+) | 15-20% |
| Pilot (3 months) | 30-50% |
| Reference customer | 20% |

### Competitive Responses
- **"VOIZE is cheaper"** → "We include resident communication, they don't. Compare total value."
- **"Too expensive"** → "What's the cost of one fall that wasn't caught early?"
- **"Need to see ROI"** → "30 min/nurse/day × €25/hr × 60 nurses = €750/day savings"

---

## 5. Unit Economics

### Revenue Metrics (Target)

| Metric | Year 1 | Year 2 | Year 3 |
|--------|--------|--------|--------|
| Customers | 20 | 150 | 600 |
| ACV (Avg Contract Value) | €8,000 | €10,000 | €12,000 |
| ARR | €160K | €1.5M | €7.2M |
| MRR | €13K | €125K | €600K |

### Per-Customer Economics

| Metric | Value | Notes |
|--------|-------|-------|
| **ACV** | €10,000-14,000 | Full solution |
| **Gross Margin** | 70-75% | After hardware COGS, cloud costs |
| **CAC** | €3,000-5,000 | Enterprise sales cycle |
| **LTV** | €30,000-40,000 | 3-4 year avg retention |
| **LTV:CAC** | 6-10x | Healthy for B2B SaaS |
| **Payback** | 4-6 months | Fast for enterprise |

### Hardware Economics (Per Watch)

| Item | Value |
|------|-------|
| Device cost | €100-150 |
| Monthly fee | €12 |
| Payback period | 10-12 months |
| Gross margin after payback | 85%+ |
| Expected device life | 3 years |
| Lifetime margin | €250+ per device |

---

## 6. Go-to-Market Pricing Phases

### Phase 1: Pilot (Month 1-6)
- **Price:** €0-€199/month (pilot rate)
- **Goal:** 5-10 reference customers
- **Terms:** 3-month minimum, case study rights

### Phase 2: Early Adopter (Month 6-12)
- **Price:** 30% discount from list
- **Goal:** 50 paying customers
- **Terms:** Annual contracts, testimonials

### Phase 3: Scale (Month 12+)
- **Price:** Full list price
- **Goal:** Volume sales
- **Terms:** Standard enterprise terms

---

## 7. Strategic Recommendations

### 1. Don't Compete on Price for Documentation
VOIZE has €50M in funding. They can undercut us. Instead:
- Match their documentation pricing (€250-350/mo range)
- Win on the UNIQUE resident communication feature
- Position documentation as "table stakes" bundled in

### 2. Hardware is Your Moat
- Smartwatches create switching costs (can't easily swap)
- HaaS model = recurring revenue investors love
- Consider subsidizing devices heavily in Year 1 to drive adoption

### 3. Price to Value, Not Cost
- One prevented fall = €20,000+ in liability/care costs
- 30 min/nurse/day saved = €10,000+/month in labor
- Price €1,000/month against €30,000/month value = easy sell

### 4. Build Expansion Revenue
- Land with Tier 1 (documentation) at competitive price
- Expand to Tier 2+3 (communication + hardware) for 3-4x revenue
- Target 120%+ Net Revenue Retention

---

## 8. Pitch Deck Pricing Slide

**Headline:** "€650/month average for complete care communication"

**Key Points:**
- Modular pricing: Start simple, expand with value
- €8/resident/month for peace of mind
- Hardware included in subscription (no CAPEX)
- ROI positive in &lt;90 days

**Comparison:**
```
VOIZE: €X/month for documentation only
PflegeAI: €650/month for documentation + resident communication + hardware

What VOIZE can't do: Hear from residents.
```

---

## 9. Open Questions for Validation

1. **Price sensitivity testing:** Would facilities pay €10/resident vs €8 vs €5?
2. **Hardware preference:** Buy outright vs HaaS vs facility provides own?
3. **Module bundling:** Force bundle or allow à la carte?
4. **Contract length:** Annual vs monthly vs multi-year?

**Action:** Test these in pilot partner interviews (see INTERVIEW_GUIDE_PILOT_PARTNER.md)

---

## Key Takeaways

1. **Hybrid model wins:** Facility base + per-resident + HaaS
2. **Blue ocean pricing:** Charge premium for resident communication (no competitor)
3. **Land and expand:** Cheap documentation → premium communication upgrade
4. **Target ACV:** €10,000-14,000/year/facility
5. **LTV:CAC > 6x:** Healthy unit economics for VC pitch

---

*Analysis prepared for PflegeAI investor materials*
