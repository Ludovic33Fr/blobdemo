'use client'
import { useStore } from '@/lib/store/useStore'
export function HUDStats(){
const s = useStore()
return (
<div className="text-xs opacity-80 flex gap-4">
<span>nodes: {s.snapshot.nodes.length}</span>
<span>edges: {s.snapshot.edges.length}</span>
<span>cost: {s.snapshot.cost.toFixed(1)}</span>
<span>energy: {s.snapshot.energy.toFixed(1)}</span>
<span>grid: 30×30</span>
</div>
)
}