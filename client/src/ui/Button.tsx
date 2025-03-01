import React from 'react'
import cx from 'classix'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    label?: string
    variant?: 'primary' | 'secondary' | 'accent'
    size?: 'small' | 'medium' | 'large'
    children?: React.ReactNode
}

export default function Button({
    label,
    variant = 'primary',
    size = 'medium',
    children,
    ...props
}: ButtonProps) {
    const classes = cx(
        (variant === 'primary') && 
        'bg-primary-300 border-primary-800 hover:bg-primary-600',
        (variant === 'secondary') && 'bg-secondary',
        (variant === 'accent') && 'bg-accent',
        (size === 'small') && 'p-2 text-sm rounded-sm border-1',
        (size === 'medium') && 'py-2 px-4 text-md rounded-md border-2',
        (size === 'large') && 'py-4 px-6 text-lg rounded-xl border-3',
        
    )
    return (
        <button {...props} className={classes}>
            {label || children}
        </button>
    )
}
