import type { SimParams, SimState } from './model'
import { GRID_W, GRID_H, idx, hIdx, vIdx } from './model'
import { nutrientAt, riskAt, blobAt } from './fields'


export function solvePotentials(state:SimState, p:SimParams){
// Jacobi-like relaxation using nutrient-risk as external drive
// Seulement calculer les potentiels dans les zones connectées au blob
for (let iter=0; iter<3; iter++){
for (let y=0;y<GRID_H;y++){
for (let x=0;x<GRID_W;x++){
const i = idx(x,y)

// Vérifier si cette cellule est connectée au réseau blob
const hasConnection = state.D_h[hIdx(x,y)] > 0.01 || 
                     (x > 0 && state.D_h[hIdx(x-1,y)] > 0.01) ||
                     state.D_v[vIdx(x,y)] > 0.01 || 
                     (y > 0 && state.D_v[vIdx(x,y-1)] > 0.01)

// Ou être proche d'un nœud blob
const blobNodes = state.nodes.filter(n => n.type === 'blob')
let nearBlob = false
for (const blobNode of blobNodes) {
  const dist = Math.sqrt((x - blobNode.gx)**2 + (y - blobNode.gy)**2)
  if (dist <= 3) {
    nearBlob = true
    break
  }
}

if (!hasConnection && !nearBlob) {
  state.P[i] = 0 // Pas de potentiel si pas connecté
  continue
}

const base = nutrientAt(state,x,y) - riskAt(state,x,y) + p.wBlob*blobAt(state,x,y)
let sum = 0, cnt = 0
if (x>0) { sum += state.P[idx(x-1,y)]; cnt++ }
if (x<GRID_W-1){ sum += state.P[idx(x+1,y)]; cnt++ }
if (y>0) { sum += state.P[idx(x,y-1)]; cnt++ }
if (y<GRID_H-1){ sum += state.P[idx(x,y+1)]; cnt++ }
const avgN = cnt? sum/cnt : 0
state.P[i] = 0.85*state.P[i] + 0.15*(avgN + base)
}
}
}
}


export function computeFlows(state:SimState){
// Horizontal edges
for (let y=0;y<GRID_H;y++){
for (let x=0;x<GRID_W-1;x++){
const a = idx(x,y), b = idx(x+1,y)
const C = state.D_h[hIdx(x,y)]
state.Q_h[hIdx(x,y)] = (C>0? C : 0) * (state.P[a]-state.P[b])
}
}
// Vertical edges
for (let y=0;y<GRID_H-1;y++){
for (let x=0;x<GRID_W;x++){
const a = idx(x,y), b = idx(x,y+1)
const C = state.D_v[vIdx(x,y)]
state.Q_v[vIdx(x,y)] = (C>0? C : 0) * (state.P[a]-state.P[b])
}
}
}