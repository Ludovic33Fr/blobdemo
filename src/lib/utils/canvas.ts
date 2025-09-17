import type { FrameSnapshot } from '@/lib/engine/model'


export function drawFrame(ctx: CanvasRenderingContext2D, snap: FrameSnapshot){
const { width, height, dpr } = snap
ctx.setTransform(dpr,0,0,dpr,0,0)
ctx.clearRect(0,0,width,height)


// Grid centrée avec nuances de gris et intersections visibles
const gridSize = Math.min(width, height) * 0.8 // 80% de la plus petite dimension
const cellW = gridSize/30, cellH = gridSize/30
const offsetX = (width - gridSize) / 2
const offsetY = (height - gridSize) / 2

// Fond de grille subtil
ctx.fillStyle = 'rgba(30, 30, 30, 0.4)'
ctx.fillRect(offsetX, offsetY, gridSize, gridSize)

// Lignes verticales
ctx.strokeStyle = 'rgba(80, 80, 80, 0.3)'
ctx.lineWidth = 0.5
for (let x=0; x<=30; x++){
  ctx.beginPath()
  ctx.moveTo(offsetX + x*cellW, offsetY)
  ctx.lineTo(offsetX + x*cellW, offsetY + gridSize)
  ctx.stroke()
}

// Lignes horizontales
ctx.strokeStyle = 'rgba(80, 80, 80, 0.3)'
ctx.lineWidth = 0.5
for (let y=0; y<=30; y++){
  ctx.beginPath()
  ctx.moveTo(offsetX, offsetY + y*cellH)
  ctx.lineTo(offsetX + gridSize, offsetY + y*cellH)
  ctx.stroke()
}

// Intersections (points de grille)
ctx.fillStyle = 'rgba(150, 150, 150, 0.4)'
for (let x=0; x<=30; x++){
  for (let y=0; y<=30; y++){
    ctx.beginPath()
    ctx.arc(offsetX + x*cellW, offsetY + y*cellH, 0.8, 0, Math.PI*2)
    ctx.fill()
  }
}

// Lignes principales (tous les 5)
ctx.strokeStyle = 'rgba(120, 120, 120, 0.4)'
ctx.lineWidth = 1
for (let x=0; x<=30; x+=5){
  ctx.beginPath()
  ctx.moveTo(offsetX + x*cellW, offsetY)
  ctx.lineTo(offsetX + x*cellW, offsetY + gridSize)
  ctx.stroke()
}
for (let y=0; y<=30; y+=5){
  ctx.beginPath()
  ctx.moveTo(offsetX, offsetY + y*cellH)
  ctx.lineTo(offsetX + gridSize, offsetY + y*cellH)
  ctx.stroke()
}


// Blob tubes (yellow) avec contraste amélioré
for (const e of snap.edges){
const thickness = Math.max(2, Math.sqrt(e.D) * 1.5) // Plus épais
const alpha = Math.min(1, 0.4 + Math.min(0.6, Math.abs(e.Q) * 0.8)) // Plus opaque
ctx.strokeStyle = `rgba(255, 193, 7, ${alpha})` // Jaune plus vif
ctx.lineWidth = thickness
ctx.lineCap = 'round'
ctx.beginPath()
ctx.moveTo(e.ax, e.ay)
ctx.lineTo(e.bx, e.by)
ctx.stroke()
}


// Food, poison & blob nodes avec contraste amélioré
for (const n of snap.nodes){
ctx.beginPath()
ctx.arc(n.x, n.y, 8, 0, Math.PI*2) // Plus gros
if (n.type === 'food') {
  ctx.fillStyle = 'rgba(34, 197, 94, 1)' // Vert plus vif
  ctx.strokeStyle = 'rgba(22, 163, 74, 1)' // Bordure verte foncée
} else if (n.type === 'poison') {
  ctx.fillStyle = 'rgba(220, 38, 38, 1)' // Rouge plus vif
  ctx.strokeStyle = 'rgba(185, 28, 28, 1)' // Bordure rouge foncée
} else if (n.type === 'blob') {
  ctx.fillStyle = 'rgba(234, 179, 8, 1)' // Jaune plus vif
  ctx.strokeStyle = 'rgba(202, 138, 4, 1)' // Bordure jaune foncée
}
ctx.fill()
ctx.lineWidth = 2
ctx.stroke()

// Indicateur de double-clic (petit X)
ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)'
ctx.lineWidth = 1.5
ctx.beginPath()
ctx.moveTo(n.x - 3, n.y - 3)
ctx.lineTo(n.x + 3, n.y + 3)
ctx.moveTo(n.x + 3, n.y - 3)
ctx.lineTo(n.x - 3, n.y + 3)
ctx.stroke()
}
}