import React from 'react'
import cx from 'classix'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    label?: string
    variant?: 'primary' | 'secondary' | 'accent'
    children?: React.ReactNode
}

export default function Button({
    label,
    variant,
    children,
    ...props
}: ButtonProps) {
    const classes = cx(variant === 'primary' ? 'bg-pink-600' : 'bg-amber-200')
    return (
        <button {...props} className={classes}>
            {label} | {children}
        </button>
    )
}
