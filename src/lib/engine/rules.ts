import type { SimParams, SimState } from './model'
import { GRID_W, GRID_H, idx, hIdx, vIdx } from './model'
import { nutrientAt, riskAt, blobAt, decaySlime } from './fields'


export function growAndShrink(state:SimState, p:SimParams){
// La croissance ne se fait que depuis les nœuds blob vers les nœuds nourriture
// Trouver tous les nœuds blob comme points de départ
const blobNodes = state.nodes.filter(n => n.type === 'blob')
const foodNodes = state.nodes.filter(n => n.type === 'food')

if (blobNodes.length === 0) return // Pas de nœuds blob, pas de croissance

// Pour chaque nœud blob, chercher le chemin vers les nœuds nourriture
for (const blobNode of blobNodes) {
  const startX = blobNode.gx
  const startY = blobNode.gy
  
  // Explorer depuis le nœud blob
  for (let y=0; y<GRID_H; y++){
    for (let x=0; x<GRID_W; x++){
      // Calculer la distance au nœud blob de départ
      const distToBlob = Math.sqrt((x - startX)**2 + (y - startY)**2)
      
      // Seulement considérer les cellules proches d'un nœud blob existant ou déjà connectées
      const hasExistingConnection = state.D_h[hIdx(x,y)] > 0.01 || 
                                   (x > 0 && state.D_h[hIdx(x-1,y)] > 0.01) ||
                                   state.D_v[vIdx(x,y)] > 0.01 || 
                                   (y > 0 && state.D_v[vIdx(x,y-1)] > 0.01)
      
      // Ou être proche d'un nœud blob
      const nearBlob = distToBlob <= 3
      
      if (!nearBlob && !hasExistingConnection) continue
      
      const base = p.wFood*nutrientAt(state,x,y) - p.wPoison*riskAt(state,x,y) + p.wBlob*blobAt(state,x,y) - p.wSlime*state.slime[idx(x,y)]
      
      // Evaluate 4 dirs
      const dirs = [
        { dx:1, dy:0, kind:'h' as const, key:hIdx(x,y), valid: x<GRID_W-1 },
        { dx:-1, dy:0, kind:'h' as const, key:hIdx(x-1,y), valid: x>0 },
        { dx:0, dy:1, kind:'v' as const, key:vIdx(x,y), valid: y<GRID_H-1 },
        { dx:0, dy:-1, kind:'v' as const, key:vIdx(x,y-1), valid: y>0 },
      ]
      
      let best = -Infinity, bestDir: { dx: number; dy: number; kind: 'h' | 'v'; key: number; valid: boolean } | null = null
      for (const d of dirs){ 
        if (!d.valid) continue
        const nx = x + d.dx, ny = y + d.dy
        
        // Bonus pour se diriger vers la nourriture
        let foodBonus = 0
        for (const foodNode of foodNodes) {
          const distToFood = Math.sqrt((nx - foodNode.gx)**2 + (ny - foodNode.gy)**2)
          foodBonus += foodNode.strength * Math.exp(-distToFood/5) // Attraction vers la nourriture
        }
        
        const score = base + p.wFood*nutrientAt(state,nx,ny) - p.wPoison*riskAt(state,nx,ny) + p.wBlob*blobAt(state,nx,ny) + foodBonus - p.wCost
        + (Math.random()-0.5)*p.epsNoise
        
        if (score > best){ best = score; bestDir = d }
      }
      
      if (best > p.thetaGrow && bestDir){
        if (bestDir.kind==='h') state.D_h[bestDir.key] = Math.min(p.Dmax, state.D_h[bestDir.key] + p.alpha)
        else state.D_v[bestDir.key] = Math.min(p.Dmax, state.D_v[bestDir.key] + p.alpha)
      }
      
      if (best < p.thetaShrink){
        // decay nearby edges slightly
        if (x<GRID_W-1) state.D_h[hIdx(x,y)] *= (1-p.beta)
        if (x>0) state.D_h[hIdx(x-1,y)] *= (1-p.beta)
        if (y<GRID_H-1) state.D_v[vIdx(x,y)] *= (1-p.beta)
        if (y>0) state.D_v[vIdx(x,y-1)] *= (1-p.beta)
      }
    }
  }
}
// Global decay/prune & slime update
let mass = 0
for (let i=0;i<state.D_h.length;i++){ state.D_h[i] = Math.max(0, state.D_h[i] - p.beta*state.D_h[i]); mass += state.D_h[i] }
for (let i=0;i<state.D_v.length;i++){ state.D_v[i] = Math.max(0, state.D_v[i] - p.beta*state.D_v[i]); mass += state.D_v[i] }
// Soft mass budget
const Mmax = p.Mmax
if (mass>Mmax){ const s = Mmax/mass; for (let i=0;i<state.D_h.length;i++) state.D_h[i]*=s; for (let i=0;i<state.D_v.length;i++) state.D_v[i]*=s }
decaySlime(state,p)
}