import type { SimParams, SimState } from './model'


export function nutrientAt(state:SimState, gx:number, gy:number){
let v = 0
for (const n of state.nodes){ if (n.type==='food'){
const dx = gx-n.gx, dy = gy-n.gy
v += n.strength * Math.exp(-(dx*dx+dy*dy)/(n.radius*n.radius))
}}
return v
}
export function riskAt(state:SimState, gx:number, gy:number){
let v = 0
for (const n of state.nodes){ if (n.type==='poison'){
const dx = gx-n.gx, dy = gy-n.gy
v += n.strength * Math.exp(-(dx*dx+dy*dy)/(n.radius*n.radius))
}}
return v
}

export function blobAt(state:SimState, gx:number, gy:number){
let v = 0
for (const n of state.nodes){ if (n.type==='blob'){
const dx = gx-n.gx, dy = gy-n.gy
v += n.strength * Math.exp(-(dx*dx+dy*dy)/(n.radius*n.radius))
}}
return v
}
export function decaySlime(state:SimState, p:SimParams){
const k = Math.max(0, 1 - p.slimeDecay)
for (let i=0;i<state.slime.length;i++) state.slime[i] *= k
}