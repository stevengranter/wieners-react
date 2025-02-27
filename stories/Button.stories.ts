import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'

import Button from '../client/src/ui/Button'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
    title: 'Components/Button',
    component: Button,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
        layout: 'centered',
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/api/argtypes
    argTypes: {
        label: { control: 'text' },
        size: { control: 'select', options: ['small', 'medium', 'large'] },
        variant: {
            control: 'select',
            options: ['primary', 'secondary', 'accent', 'ghost'],
        },
    },
    // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
    args: { onClick: fn() },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
    args: {
        variant: 'primary',
        label: 'Button',
    },
}

export const Secondary: Story = {
    args: {
        variant: 'secondary',
        label: 'Button',
    },
}

export const Accent: Story = {
    args: {
        variant: 'accent',
        label: 'Button',
    },
}

export const Ghost: Story = {
    args: {
        variant: 'ghost',
        label: 'Button',
    },
}

export const Small: Story = {
    args: {
        size: 'small',
        label: 'Button',
    },
}
export const Medium: Story = {
    args: {
        size: 'medium',
        label: 'Button',
    },
}
export const Large: Story = {
    args: {
        size: 'large',
        label: 'Button',
    },
}
