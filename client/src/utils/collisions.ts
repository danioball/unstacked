import type { Element } from "../types";

const BOX_SIZE = 60;
const ITERATIONS = 5;

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(value, max));
}

export function resolveCollisions(
  elements: Element[],
  sandboxWidth: number,
  sandboxHeight: number
): Element[] {
  const result = elements.map(el => ({ ...el }));

  for (let pass = 0; pass < ITERATIONS; pass++) {
    for (let i = 0; i < result.length; i++) {
      for (let j = i + 1; j < result.length; j++) {
        separate(result[i], result[j], sandboxWidth, sandboxHeight);
      }
    }
  }

  return result;
}

function separate(a: Element, b: Element, sandboxWidth: number, sandboxHeight: number) {
  const dx = (a.x + BOX_SIZE / 2) - (b.x + BOX_SIZE / 2);
  const dy = (a.y + BOX_SIZE / 2) - (b.y + BOX_SIZE / 2);

  const overlapX = BOX_SIZE - Math.abs(dx);
  const overlapY = BOX_SIZE - Math.abs(dy);

  if (overlapX <= 0 || overlapY <= 0) return;

  if (overlapX < overlapY) {
    const dir = dx > 0 ? 1 : -1;
    const push = overlapX / 2;
    a.x = clamp(a.x + dir * push, 0, sandboxWidth - BOX_SIZE);
    b.x = clamp(b.x - dir * push, 0, sandboxWidth - BOX_SIZE);
  } else {
    const dir = dy > 0 ? 1 : -1;
    const push = overlapY / 2;
    a.y = clamp(a.y + dir * push, 0, sandboxHeight - BOX_SIZE);
    b.y = clamp(b.y - dir * push, 0, sandboxHeight - BOX_SIZE);
  }
}