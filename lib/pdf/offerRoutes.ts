/**
 * Deterministic, localized "Uw route bij Agentic Mindshift" data for the PDF.
 *
 * The PDF must show a CONCRETE link from the scorecard result to a real,
 * priced Agentic Mindshift service — not a vague suggestion. All copy here is
 * pulled from the same localized message catalog the live website uses
 * (messages/{locale}.json → scorecard.variants + werkwijze.offering_*), so the
 * report stays perfectly in sync with the public pricing and naming.
 *
 * Nothing here calls a model: it is a pure function of the offer type derived
 * from Q4 via determineOffer().
 */

import type { OfferType } from '@/lib/scoring';
import type { ReportLocale } from '@/lib/report/locale';

import nl from '@/messages/nl.json';
import en from '@/messages/en.json';
import de from '@/messages/de.json';
import es from '@/messages/es.json';
import pt from '@/messages/pt.json';

/* eslint-disable @typescript-eslint/no-explicit-any */
const MESSAGES: Record<ReportLocale, any> = { nl, en, de, es, pt };

export interface Intervention {
  title: string;
  body: string;
}

export interface OfferRoute {
  offerName: string;
  /** Price line, may be '' for the free Sparring session. */
  price: string;
  /** 2-3 concrete interventions this route delivers. */
  interventions: Intervention[];
}

/** One rung of the 4-route ladder shown so the lead sees where they sit. */
export interface RouteRung {
  /** Stable id so the template can mark which rung matches the offer. */
  id: 'sparring' | 'advies' | 'fractional' | 'dd';
  name: string;
  price: string;
  badge: string;
}

/** Maps an A–F offer type onto one of the four public route rungs. */
const OFFER_TO_RUNG: Record<OfferType, RouteRung['id'] | null> = {
  A: 'dd',
  B: 'dd',
  E: 'dd',
  C: 'fractional',
  D: 'advies',
  F: 'sparring',
  none: null,
};

function msg(locale: ReportLocale): any {
  return MESSAGES[locale] ?? MESSAGES.nl;
}

/** The active route's full detail (name, price, interventions). */
export function getOfferRoute(locale: ReportLocale, offer: OfferType): OfferRoute | null {
  if (offer === 'none') return null;
  const variants = msg(locale)?.scorecard?.variants ?? msg('nl').scorecard.variants;
  const v = variants?.[offer];
  if (!v) return null;
  const iv = v.interventions ?? {};
  const interventions: Intervention[] = Object.keys(iv)
    .sort()
    .map((k) => ({ title: iv[k]?.title ?? '', body: iv[k]?.body ?? '' }))
    .filter((i) => i.title);
  return {
    offerName: v.offerName ?? '',
    price: v.price ?? '',
    interventions,
  };
}

/** The full 4-route ladder, localized, with the active rung resolvable by id. */
export function getRouteLadder(locale: ReportLocale): RouteRung[] {
  const w = msg(locale)?.werkwijze ?? msg('nl').werkwijze;
  const o1 = w.offering_1 ?? {};
  const o2 = w.offering_2 ?? {};
  const o3 = w.offering_3 ?? {};
  const o4 = w.offering_4 ?? {};
  return [
    { id: 'sparring', name: o1.title ?? 'AI Sparring Sessie', price: o1.price_note ?? '', badge: o1.badge ?? '' },
    { id: 'advies', name: o2.title ?? 'AI-advies & Implementatie', price: o2.price ?? '', badge: o2.badge ?? '' },
    { id: 'fractional', name: o3.title ?? 'Fractional AI Officer', price: o3.price ?? '', badge: o3.badge ?? '' },
    { id: 'dd', name: o4.title ?? 'AI-gedreven Due Diligence & Portfolio', price: o4.price ?? '', badge: o4.badge ?? '' },
  ];
}

export function activeRungId(offer: OfferType): RouteRung['id'] | null {
  return OFFER_TO_RUNG[offer];
}
