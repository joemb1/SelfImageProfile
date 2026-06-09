export function helloShared() {
  return "Hello from shared logic :)";
}

export type Score = 0 | 1 | 2 | 3 | 4 | 5 | 6 ;


export const TRAIT_IDS = [
  "Enthusiastic",
  "Happy",
  "Optimistic",
  "EasyGoing",
  "Patient"
] as const;

export type Trait = typeof TRAIT_IDS[number];

export type ScoreVector = Record<Trait, Score>;


export type PartialScoreVector = Record<Trait, Score | null>;

export function calculateDelta(before: Score, after: Score): number {
  return after - before;
}

export function createEmptyScoreVector(): PartialScoreVector {
  return Object.fromEntries(
    TRAITS.map(trait => [trait, null])
  ) as PartialScoreVector;
}

const LABEL_OVERRIDES: Partial<Record<Trait, string>> = {
  EasyGoing: "Easy Going",
};

export const TRAITS = TRAIT_IDS.map((id) => ({
  id,
  label: LABEL_OVERRIDES[id] ?? id,
}));