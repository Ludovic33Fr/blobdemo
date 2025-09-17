'use client'
import { ControlsPanel } from '@/components/ControlsPanel'
import { CanvasViewport } from '@/components/CanvasViewport'
import { HUDStats } from '@/components/HUDStats'
import { useEffect } from 'react'
import { useStore } from '@/lib/store/useStore'


export default function Page(){
const init = useStore(s=>s.engine.init)
useEffect(()=>{ init() },[init])


return (
<div className="h-screen w-screen grid grid-cols-[320px_1fr] grid-rows-[1fr_auto]">
<aside className="col-start-1 row-span-2 p-3 border-r border-muted/50 overflow-y-auto">
<h1 className="text-xl font-semibold mb-3">Blob Grid 30×30</h1>
<ControlsPanel />
</aside>
<main className="col-start-2 row-start-1">
<CanvasViewport />
</main>
<footer className="col-start-2 row-start-2 p-2 border-t border-muted/50">
<HUDStats />
</footer>
</div>
)
}