/// <reference lib="webworker" />
import type { FrameSnapshot, NodeType, SimParams, SimState } from './model'
import { GRID_W, GRID_H, idx, hIdx, vIdx } from './model'
import { growAndShrink } from './rules'
import { solvePotentials, computeFlows } from './solver'

let running = false
let state: SimState = {
width: 800, height: 600, dpr: 1, t: 0,
P: new Float32Array(GRID_W*GRID_H),
slime: new Float32Array(GRID_W*GRID_H),
D_h: new Float32Array((GRID_W-1)*GRID_H), Q_h: new Float32Array((GRID_W-1)*GRID_H),
D_v: new Float32Array(GRID_W*(GRID_H-1)), Q_v: new Float32Array(GRID_W*(GRID_H-1)),
nodes: [],
}
let params: SimParams


function gridToPx(x:number,y:number){
const cellW = state.width/GRID_W
const cellH = state.height/GRID_H
return { x: (x+0.5)*cellW, y: (y+0.5)*cellH }
}


function makeSnapshot(): FrameSnapshot {
let cost=0, energy=0
const edges: any[] = []
// Horizontal segments
for (let y=0;y<GRID_H;y++){
for (let x=0;x<GRID_W-1;x++){
const D = state.D_h[hIdx(x,y)]
if (D>params.pruneEps){
const Q = state.Q_h[hIdx(x,y)]
const a = gridToPx(x,y), b = gridToPx(x+1,y)
cost += D; energy += Math.abs(Q)
edges.push({ id:`h-${x}-${y}`, ax:a.x, ay:a.y, bx:b.x, by:b.y, D, Q })
}
}
}
// Vertical segments
for (let y=0;y<GRID_H-1;y++){
for (let x=0;x<GRID_W;x++){
const D = state.D_v[vIdx(x,y)]
if (D>params.pruneEps){
const Q = state.Q_v[vIdx(x,y)]
const a = gridToPx(x,y), b = gridToPx(x,y+1)
cost += D; energy += Math.abs(Q)
edges.push({ id:`v-${x}-${y}`, ax:a.x, ay:a.y, bx:b.x, by:b.y, D, Q })
}
}
}
const nodes = state.nodes.map(n=>{ const p = gridToPx(n.gx,n.gy); return { x:p.x, y:p.y, type:n.type } })
return { width: state.width, height: state.height, dpr: state.dpr, nodes, edges, cost, energy }
}

function tick(){
    if (!params) return
    solvePotentials(state, params)
    computeFlows(state)
    
    
    // deposit slime proportional to |flow| on edges
    for (let y=0;y<GRID_H;y++){
    for (let x=0;x<GRID_W-1;x++){
    const q = Math.abs(state.Q_h[hIdx(x,y)])
    state.slime[idx(x,y)] += params.slimeDeposit*q
    state.slime[idx(x+1,y)] += params.slimeDeposit*q
    }
    }
    for (let y=0;y<GRID_H-1;y++){
    for (let x=0;x<GRID_W;x++){
    const q = Math.abs(state.Q_v[vIdx(x,y)])
    state.slime[idx(x,y)] += params.slimeDeposit*q
    state.slime[idx(x,y+1)] += params.slimeDeposit*q
    }
    }
    
    
    growAndShrink(state, params)
    state.t += params.dt
    ;(postMessage as any)({ type:'frame', snapshot: makeSnapshot() })
    }
    
    
    let timer: number | undefined
    function loop(){ if (running) tick(); timer = setTimeout(loop, 16) as unknown as number }
    
    
    onmessage = (ev: MessageEvent)=>{
    const msg = ev.data
    switch (msg.type){
    case 'init': params = msg.params; running = false; loop(); break
    case 'play': running = true; break
    case 'pause': running = false; break
    case 'reset':
    state.P.fill(0); state.D_h.fill(0); state.D_v.fill(0); state.Q_h.fill(0); state.Q_v.fill(0); state.slime.fill(0); state.nodes=[]
    break
    case 'resize': state.width=Math.floor(msg.width); state.height=Math.floor(msg.height); state.dpr=msg.dpr; break
    case 'params': params = msg.params; break
    case 'action': handleAction(msg.action); break
    }
    }
    
    
    function handleAction(action:any){
    if (action.kind==='addNode'){
    const type: NodeType = action.type
    const gx = Math.floor(Math.random()*GRID_W)
    const gy = Math.floor(Math.random()*GRID_H)
    state.nodes.push({ id: crypto.randomUUID(), gx, gy, type, strength: 1, radius: 4 })
    }
}