import { ButtonHTMLAttributes } from 'react'
export function Button(props: ButtonHTMLAttributes<HTMLButtonElement>){
    const { className='', ...rest } = props
    return (
    <button className={`px-3 py-1.5 rounded-2xl bg-blob text-black shadow hover:opacity-90 disabled:opacity-50 ${className}`} {...rest} />
    )
}