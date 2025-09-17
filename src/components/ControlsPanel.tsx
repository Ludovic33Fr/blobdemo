'use client'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { useStore } from '@/lib/store/useStore'
import { Apple, Skull, Circle, Play, Pause, RotateCcw } from 'lucide-react'


export function ControlsPanel(){
const p = useStore(s=>s.params)
const setParam = useStore(s=>s.setParam)
const engine = useStore(s=>s.engine)
const addFood = ()=>useStore.getState().scene.addNode('food')
const addPoison = ()=>useStore.getState().scene.addNode('poison')
const addBlob = ()=>useStore.getState().scene.addNode('blob')


return (
<div className="space-y-3">
<Card>
<CardTitle>Simulation</CardTitle>
<CardContent className="flex gap-2">
{engine.running ? (
<Button onClick={engine.pause} title="Pause"><Pause size={16}/></Button>
):(
<Button onClick={engine.play} title="Play"><Play size={16}/></Button>
)}
<Button onClick={engine.reset} title="Reset"><RotateCcw size={16}/></Button>
</CardContent>
</Card>


<Card>
<CardTitle>Type Node</CardTitle>
<CardContent className="flex gap-2">
<Button onClick={addBlob} title="Ajouter blob"><Circle size={16}/></Button>
<Button onClick={addFood} title="Ajouter nourriture"><Apple size={16}/></Button>
<Button onClick={addPoison} title="Ajouter poison"><Skull size={16}/></Button>
</CardContent>
</Card>

<Card>
<CardTitle>Interaction</CardTitle>
<CardContent>
<p className="text-xs text-gray-400">
Cliquez sur un nœud pour le supprimer
</p>
</CardContent>
</Card>


<Card>
<CardTitle>Paramètres</CardTitle>
<CardContent>
<label className="text-xs">dt: {p.dt.toFixed(2)}</label>
<Slider value={p.dt} onChange={v=>setParam('dt', v)} min={0.01} max={0.2} step={0.005} />


<label className="text-xs">Exploration (bruit): {p.epsNoise.toFixed(3)}</label>
<Slider value={p.epsNoise} onChange={v=>setParam('epsNoise', v)} min={0} max={0.2} step={0.005} />

<label className="text-xs">Poids Blob: {p.wBlob.toFixed(2)}</label>
<Slider value={p.wBlob} onChange={v=>setParam('wBlob', v)} min={0} max={2} step={0.1} />
</CardContent>
</Card>
</div>
)
}