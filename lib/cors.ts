/**
 * CORS-headers voor token-protected API-routes die vanuit een browser-origin
 * (Claude Cowork / Claude in Chrome, marketing-tools) worden aangeroepen.
 *
 * Origin is `*` omdat de bearer/query-token de daadwerkelijke beveiliging is —
 * zonder geldige token komt niemand langs de auth-check, ongeacht origin.
 * De headers worden óók op error-responses (401/503/500) meegestuurd, anders
 * maskeert de browser de echte statuscode als een generieke "CORS error".
 */

const CORS_HEADERS: Record<string, string> = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
  'Access-Control-Allow-Headers': 'Authorization, Content-Type',
  'Access-Control-Max-Age': '86400',
};

export function corsHeaders(extra?: Record<string, string>): Record<string, string> {
  return extra ? { ...CORS_HEADERS, ...extra } : { ...CORS_HEADERS };
}

export function corsPreflight(): Response {
  return new Response(null, { status: 204, headers: CORS_HEADERS });
}
