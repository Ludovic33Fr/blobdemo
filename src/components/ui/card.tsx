import { HTMLAttributes } from 'react'
export function Card(p: HTMLAttributes<HTMLDivElement>){
return <div {...p} className={`rounded-2xl bg-muted/60 p-3 shadow-inner ${p.className??''}`} />
}
export const CardTitle = (p: HTMLAttributes<HTMLDivElement>) => <div {...p} className={`font-semibold mb-2 ${p.className??''}`} />
export const CardContent = (p: HTMLAttributes<HTMLDivElement>) => <div {...p} className={`${p.className??''}`} />