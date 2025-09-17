export function Slider({ value, onChange, min=0, max=1, step=0.01 }:{ value:number; onChange:(v:number)=>void; min?:number; max?:number; step?:number; }){
    return <input type="range" min={min} max={max} step={step} value={value} onChange={e=>onChange(parseFloat(e.currentTarget.value))} className="w-full" />
    }