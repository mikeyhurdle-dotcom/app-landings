/**
 * Founding Studio cohort tracker — single source of truth for the public site.
 *
 * Update FOUNDING_SLOTS_TAKEN as studios are confirmed. When it reaches
 * FOUNDING_SLOTS_TOTAL, flip the site copy to Early Access messaging.
 *
 * Taken so far: Ellie Moorhouse (founding #1) + Josh Ingram (founding #2).
 */
export const FOUNDING_SLOTS_TOTAL = 5;
export const FOUNDING_SLOTS_TAKEN = 2;
export const FOUNDING_SLOTS_LEFT = FOUNDING_SLOTS_TOTAL - FOUNDING_SLOTS_TAKEN;
