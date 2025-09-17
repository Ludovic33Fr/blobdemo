import type { FrameSnapshot } from '@/lib/engine/model'


export function drawFrame(ctx: CanvasRenderingContext2D, snap: FrameSnapshot){
const { width, height, dpr } = snap
ctx.setTransform(dpr,0,0,dpr,0,0)
ctx.clearRect(0,0,width,height)


// Grid (light)
ctx.strokeStyle = 'rgba(255,255,255,0.05)'
ctx.lineWidth = 1
const cellW = width/30, cellH = height/30
for (let x=0;x<=30;x++){ ctx.beginPath(); ctx.moveTo(x*cellW,0); ctx.lineTo(x*cellW,height); ctx.stroke() }
for (let y=0;y<=30;y++){ ctx.beginPath(); ctx.moveTo(0,y*cellH); ctx.lineTo(width,y*cellH); ctx.stroke() }


// Blob tubes (yellow)
for (const e of snap.edges){
const thickness = Math.max(1, Math.sqrt(e.D))
const alpha = Math.min(0.9, 0.2 + Math.min(1, Math.abs(e.Q)))
ctx.strokeStyle = `rgba(252, 211, 77, ${alpha})` // yellow
ctx.lineWidth = thickness
ctx.lineCap = 'round'
ctx.beginPath()
ctx.moveTo(e.ax, e.ay)
ctx.lineTo(e.bx, e.by)
ctx.stroke()
}


// Food, poison & blob nodes
for (const n of snap.nodes){
ctx.beginPath()
ctx.arc(n.x, n.y, 6, 0, Math.PI*2)
if (n.type === 'food') {
  ctx.fillStyle = 'rgba(52, 211, 153, 0.9)' // green
} else if (n.type === 'poison') {
  ctx.fillStyle = 'rgba(239, 68, 68, 0.9)' // red
} else if (n.type === 'blob') {
  ctx.fillStyle = 'rgba(59, 130, 246, 0.9)' // blue
}
ctx.fill()
}
}