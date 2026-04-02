import { RiskLevel } from './types';

/**
 * Parse the risk level tag from the AI response text.
 * Looks for [ROUTINE], [URGENT], or [EMERGENCY] anywhere in the response.
 */
export function parseRiskLevel(response: string): RiskLevel {
  if (/\[EMERGENCY\]/i.test(response)) return 'EMERGENCY';
  if (/\[URGENT\]/i.test(response)) return 'URGENT';
  if (/\[ROUTINE\]/i.test(response)) return 'ROUTINE';
  return null;
}

/**
 * Remove the risk level tag from the response text for clean display.
 */
export function stripRiskTag(response: string): string {
  return response
    .replace(/\[EMERGENCY\]/gi, '')
    .replace(/\[URGENT\]/gi, '')
    .replace(/\[ROUTINE\]/gi, '')
    .trim();
}
