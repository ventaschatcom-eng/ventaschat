import type { DbAnalysis } from "@/lib/db";
import type { AnalysisResult } from "@/lib/types";

export type WordFrequency = {
  word: string;
  count: number;
  inWon: number;
  inLost: number;
};

export type CoachingInsight = {
  totalWon: number;
  totalLost: number;
  closeRate: number | null;
  avgScoreWon: number | null;
  avgScoreLost: number | null;
  winningWords: WordFrequency[];
  losingWords: WordFrequency[];
  topObjectionsWon: WordFrequency[];
  topObjectionsLost: WordFrequency[];
  avgEngagementWon: number | null;
  avgEngagementLost: number | null;
  enoughData: boolean;
};

const STOPWORDS = new Set([
  "el", "la", "los", "las", "de", "del", "y", "a", "en", "es", "por", "para",
  "que", "se", "con", "un", "una", "unos", "unas", "lo", "le", "su", "sus",
  "al", "como", "más", "mas", "muy", "ya", "no", "si", "sí",
]);

function safeParseResult(json: string): AnalysisResult | null {
  try {
    return JSON.parse(json) as AnalysisResult;
  } catch {
    return null;
  }
}

function aggregateWords(items: string[]) {
  const map = new Map<string, number>();
  for (const raw of items) {
    const word = raw.trim().toLowerCase();
    if (!word || STOPWORDS.has(word)) continue;
    map.set(word, (map.get(word) ?? 0) + 1);
  }
  return map;
}

export function computeCoachingInsight(
  wonAnalyses: DbAnalysis[],
  lostAnalyses: DbAnalysis[],
): CoachingInsight {
  const totalWon = wonAnalyses.length;
  const totalLost = lostAnalyses.length;
  const closed = totalWon + totalLost;
  const enoughData = closed >= 5;

  const wonResults = wonAnalyses
    .map((a) => safeParseResult(a.outputJson))
    .filter((r): r is AnalysisResult => r !== null);

  const lostResults = lostAnalyses
    .map((a) => safeParseResult(a.outputJson))
    .filter((r): r is AnalysisResult => r !== null);

  const wonWords = aggregateWords(wonResults.flatMap((r) => r.recommended_words ?? []));
  const lostWords = aggregateWords(lostResults.flatMap((r) => r.words_to_avoid ?? []));
  const wonObjections = aggregateWords(wonResults.flatMap((r) => r.objections ?? []));
  const lostObjections = aggregateWords(lostResults.flatMap((r) => r.objections ?? []));

  const winningWords: WordFrequency[] = Array.from(wonWords.entries())
    .map(([word, count]) => ({
      word,
      count,
      inWon: count,
      inLost: lostWords.get(word) ?? 0,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 12);

  const losingWords: WordFrequency[] = Array.from(lostWords.entries())
    .map(([word, count]) => ({
      word,
      count,
      inWon: wonWords.get(word) ?? 0,
      inLost: count,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  const topObjectionsWon: WordFrequency[] = Array.from(wonObjections.entries())
    .map(([word, count]) => ({ word, count, inWon: count, inLost: lostObjections.get(word) ?? 0 }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  const topObjectionsLost: WordFrequency[] = Array.from(lostObjections.entries())
    .map(([word, count]) => ({ word, count, inWon: wonObjections.get(word) ?? 0, inLost: count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  const avg = (arr: number[]) =>
    arr.length ? Math.round(arr.reduce((s, n) => s + n, 0) / arr.length) : null;

  return {
    totalWon,
    totalLost,
    closeRate: closed ? Math.round((totalWon / closed) * 100) : null,
    avgScoreWon: avg(wonAnalyses.map((a) => a.conversionScore)),
    avgScoreLost: avg(lostAnalyses.map((a) => a.conversionScore)),
    winningWords,
    losingWords,
    topObjectionsWon,
    topObjectionsLost,
    avgEngagementWon: avg(
      wonResults
        .map((r) => r.key_metrics?.customer_engagement)
        .filter((n): n is number => typeof n === "number"),
    ),
    avgEngagementLost: avg(
      lostResults
        .map((r) => r.key_metrics?.customer_engagement)
        .filter((n): n is number => typeof n === "number"),
    ),
    enoughData,
  };
}
