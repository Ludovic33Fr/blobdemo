'use client'
import { useEffect, useRef } from 'react'
import { useStore } from '@/lib/store/useStore'
import { drawFrame } from '@/lib/utils/canvas'


export function CanvasViewport(){
const canvasRef = useRef<HTMLCanvasElement>(null)
const snap = useStore(s=>s.snapshot)
const setSize = useStore(s=>s.engine.setCanvasSize)


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


return <canvas ref={canvasRef} className="w-full h-full canvas" />
}