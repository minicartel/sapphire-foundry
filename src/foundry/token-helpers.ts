import { conditionIcons } from '@src/features/conditions';
import { nonNegative } from '@src/utility/helpers';
import { concat, first, pipe, uniq } from 'remeda';
import type { ActorEP, MaybeToken } from '../entities/actor/actor';
import { readyCanvas } from './canvas';

export const panToToken = (token: Token) => {
  if (token?.isVisible && token.scene?.isView) {
    token.control();
    readyCanvas()?.animatePan({
      x: token.x,
      y: token.y,
      scale: undefined,
      speed: undefined,
    });
  }
};

export const releaseTargetToken = (token: Token) =>
  token.setTarget(false, { releaseOthers: false });

export const releaseAllTargets = () =>
  first([...game.user.targets])?.setTarget(false, { releaseOthers: true });

export const activateTargetingTool = () => {
  if (ui.controls.activeControl !== 'token') {
    document
      .querySelector<HTMLElement>("#controls [data-control='token']")
      ?.click();
  }
  requestAnimationFrame(() => {
    ui.controls.control.activeTool = 'target';
    ui.controls.render();
  });
};

export const activeTokenStatusEffects = ({ document: data, actor }: Token) =>
  ((actor as ActorEP | undefined)?.conditions ?? []).map(
    (condition) => conditionIcons[condition],
  );

const squareCentres = (token: Token) => {
  const { x, y, width, height } = token.document;
  if (width < 1 || height < 1) return [token.center];
  const size = readyCanvas()!.grid.size;
  const centres: { x: number; y: number }[] = [];
  for (let col = 0; col < width; col++) {
    for (let row = 0; row < height; row++) {
      centres.push({
        x: x + (col + 0.5) * size,
        y: y + (row + 0.5) * size,
      });
    }
  }
  return centres;
};

export const distanceBetweenTokens = (tokenA: Token, tokenB: Token) => {
  const grid = readyCanvas()!.grid;
  let shortest = Infinity;

  if (grid.type === CONST.GRID_TYPES.SQUARE) {
    for (const a of squareCentres(tokenA)) {
      for (const b of squareCentres(tokenB)) {
        shortest = Math.min(shortest, grid.measurePath([a, b]).distance);
      }
    }
  } else {
    shortest = grid.measurePath([tokenA.center, tokenB.center]).distance;
  }

  const distance = Math.hypot(
    shortest,
    Math.abs(tokenA.document.elevation - tokenB.document.elevation),
  );
  return nonNegative(Math.round(distance * 10) / 10);
};

export const getTokenPlaceable = (
  tokenDoc: MaybeToken,
  actor?: ActorEP | null,
) => {
  return (
    tokenDoc?.object ??
    (actor?.getActiveTokens(true, false)[0] as undefined | Token)
  );
};
