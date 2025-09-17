'use client'
import { useEffect, useRef } from 'react'
import { useStore } from '@/lib/store/useStore'
import { drawFrame } from '@/lib/utils/canvas'


export function CanvasViewport(){
const canvasRef = useRef<HTMLCanvasElement>(null)
const snap = useStore(s=>s.snapshot)
const setSize = useStore(s=>s.engine.setCanvasSize)
const removeNode = useStore(s=>s.scene.removeNode)


useEffect(()=>{
const el = canvasRef.current!
const resize = ()=>{
const dpr = window.devicePixelRatio || 1
el.width = el.clientWidth * dpr
el.height = el.clientHeight * dpr
const rect = el.getBoundingClientRect()
setSize(rect.width, rect.height, dpr)
}
resize();
window.addEventListener('resize', resize)
return ()=>window.removeEventListener('resize', resize)
},[setSize])


useEffect(()=>{
const el = canvasRef.current!
const ctx = el.getContext('2d')!
let raf = 0
const loop = ()=>{ drawFrame(ctx, snap); raf = requestAnimationFrame(loop) }
raf = requestAnimationFrame(loop)
return ()=>cancelAnimationFrame(raf)
},[snap])

// Gestion du clic pour supprimer les nœuds
useEffect(()=>{
const el = canvasRef.current!
if (!el) return

const handleClick = (event: MouseEvent) => {
const rect = el.getBoundingClientRect()
const x = event.clientX - rect.left
const y = event.clientY - rect.top

// Trouver le nœud le plus proche du clic
let closestNode = null
let minDistance = 200 // Tolérance de 200px

for (const node of snap.nodes) {
const distance = Math.sqrt((x - node.x)**2 + (y - node.y)**2)
if (distance < minDistance) {
minDistance = distance
closestNode = node
}
}

if (closestNode) {
// Utiliser directement les coordonnées grille du nœud
const gx = closestNode.gx
const gy = closestNode.gy

// Vérifier que les coordonnées sont valides
if (gx >= 0 && gx < 30 && gy >= 0 && gy < 30) {
removeNode(gx, gy)
}
}
}

el.addEventListener('click', handleClick)
return () => el.removeEventListener('click', handleClick)
}, [snap, removeNode])


return <canvas ref={canvasRef} className="w-full h-full canvas" />
}