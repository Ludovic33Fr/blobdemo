'use client'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import type { FrameSnapshot, NodeType, SimParams } from '@/lib/engine/model'


let worker: Worker | null = null


export const useStore = create<{
snapshot: FrameSnapshot
params: SimParams
scene: { addNode: (type: NodeType)=>void }
engine: {
running: boolean
play: ()=>void
pause: ()=>void
reset: ()=>void
init: ()=>void
setCanvasSize: (w:number,h:number,dpr:number)=>void
}
setParam: <K extends keyof SimParams>(k:K, v:SimParams[K])=>void
}>()(immer((set, get)=>({
snapshot: { width: 800, height: 600, dpr: 1, nodes: [], edges: [], cost: 0, energy: 0 },
params: {
dt: 0.06, K: 4, epsNoise: 0.05,
wFood: 1.5, wPoison: 1.0, wBlob: 0.8, wSlime: 0.15, wCost: 0.05,
thetaGrow: 0.15, thetaShrink: -0.1, pruneEps: 0.01,
alpha: 0.3, beta: 0.02, Dmax: 2.0, Mmax: 800,
slimeDeposit: 0.04, slimeDecay: 0.01,
},
scene: {
addNode: (type)=>{ worker?.postMessage({ type:'action', action:{ kind:'addNode', type } }) }
},
engine: {
running: false,
play: ()=>{ worker?.postMessage({ type:'play' }); set(s=>{ s.engine.running = true }) },
pause: ()=>{ worker?.postMessage({ type:'pause' }); set(s=>{ s.engine.running = false }) },
reset: ()=>{ worker?.postMessage({ type:'reset' }) },
setCanvasSize: (w,h,dpr)=>{ worker?.postMessage({ type:'resize', width:w, height:h, dpr }) },
init: ()=>{
if (worker) return
worker = new Worker(new URL('@/lib/engine/worker.ts', import.meta.url), { type: 'module' })
worker.postMessage({ type:'init', params: get().params })
worker.onmessage = (ev: MessageEvent)=>{
const msg = ev.data
if (msg.type==='frame') set(s=>{ s.snapshot = msg.snapshot })
}
}
},
setParam: (k,v)=>{ set(s=>{ (s.params as Record<string, unknown>)[k] = v }); worker?.postMessage({ type:'params', params: get().params }) }
})))