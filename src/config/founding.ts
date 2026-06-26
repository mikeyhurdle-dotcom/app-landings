/**
 * Founding Studio cohort tracker — single source of truth for the public site.
 *
 * Update FOUNDING_SLOTS_TAKEN as studios are confirmed. When it reaches
 * FOUNDING_SLOTS_TOTAL, flip the site copy to Early Access messaging.
 *
 * Confirmed: Ellie Moorhouse (#1) + Josh Ingram (#2). Slot #3 is counted as
 * held to reflect the 6-week founding timeline (one studio onboarded every
 * ~2 weeks) — bump this number manually each fortnight as the round fills.
 */
export const FOUNDING_SLOTS_TOTAL = 5;
export const FOUNDING_SLOTS_TAKEN = 3;
export const FOUNDING_SLOTS_LEFT = FOUNDING_SLOTS_TOTAL - FOUNDING_SLOTS_TAKEN;
