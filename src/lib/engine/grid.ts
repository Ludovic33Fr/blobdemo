import { GRID_W, GRID_H } from './model'
export const idx = (x:number,y:number)=> y*GRID_W + x
export const inside = (x:number,y:number)=> x>=0 && x<GRID_W && y>=0 && y<GRID_H
export const hIdx = (x:number,y:number)=> y*(GRID_W-1) + x // horizontal edge between (x,y)-(x+1,y)
export const vIdx = (x:number,y:number)=> y*GRID_W + x // vertical edge between (x,y)-(x,y+1)