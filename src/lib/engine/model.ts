export const GRID_W = 30
export const GRID_H = 30

// Utility functions for grid indexing
export function idx(x: number, y: number): number {
  return y * GRID_W + x
}

export function hIdx(x: number, y: number): number {
  return y * (GRID_W - 1) + x
}

export function vIdx(x: number, y: number): number {
  return y * GRID_W + x
}


export type NodeType = 'food' | 'poison' | 'blob'
export interface SceneNode { id: string; gx: number; gy: number; type: NodeType; strength: number; radius: number }


// For drawing we snapshot explicit segments with endpoints
export interface Segment { id: string; ax:number; ay:number; bx:number; by:number; D:number; Q:number }


export interface SimParams {
dt: number; K: number; epsNoise: number;
wFood: number; wPoison: number; wBlob: number; wSlime: number; wCost: number;
thetaGrow: number; thetaShrink: number; pruneEps: number;
alpha: number; beta: number; Dmax: number; Mmax: number;
slimeDeposit: number; slimeDecay: number;
}


export interface SimState {
width:number; height:number; dpr:number
t:number
// lattice-based
P: Float32Array // potentials per grid node (GRID_W*GRID_H)
slime: Float32Array // same shape
// conductance & flow per edge set (H and V)
D_h: Float32Array; Q_h: Float32Array // (GRID_W-1)*GRID_H
D_v: Float32Array; Q_v: Float32Array // GRID_W*(GRID_H-1)
nodes: SceneNode[]
}


export interface FrameSnapshot {
width:number; height:number; dpr:number
nodes: { x:number; y:number; type:NodeType }[]
edges: Segment[]
cost:number; energy:number
}