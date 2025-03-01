import Button from "../client/src/ui/Button"
import {Meta} from "@storybook/react";


const meta: Meta = {
    title: 'Components/Button',
    component: Button,
    argTypes: {
        variant: {
            control: {
                type: 'select',
                options: ['primary', 'secondary', 'accent'],
            },
        },
        onClick: { action: 'clicked' },
    },
};

export default meta;

const Template: Story<React.ComponentProps<typeof Button>> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    label: 'Primary Button',
    variant: 'primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
    label: 'Secondary Button',
    variant: 'secondary',
};

export const Accent = Template.bind({});
Accent.args = {
    label: 'Accent Button',
    variant: 'accent',
};

export const WithChildren = Template.bind({});
WithChildren.args = {
    variant: 'primary',
    children: <span>Click Me!</span>,
};

export const Disabled = Template.bind({});
Disabled.args = {
    label: 'Disabled Button',
    variant: 'primary',
    disabled: true,
};

