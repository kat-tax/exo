import type {SidebarItem} from 'vocs';

export default {
  text: 'Components',
  collapsed: false,
  items: [
    {
      text: 'Base',
      items: [
        {
          text: 'Button',
          link: '/library/Button',
        },
        {
          text: 'Prompt',
          link: '/library/Prompt',
        },
        {
          text: 'InputText',
          link: '/library/InputText',
        },
        {
          text: 'InputEmail',
          link: '/library/InputEmail',
        },
        {
          text: 'InputPassword',
          link: '/library/InputPassword',
        },
        {
          text: 'InputTextArea',
          link: '/library/InputTextArea',
        },
      ],
    },
    {
      text: 'Form',
      items: [
        {
          text: 'Login',
          link: '/library/login',
        },
        {
          text: 'Signup',
          link: '/library/signup',
        },
        {
          text: 'Validate Email',
          link: '/library/validate-email',
        },
        {
          text: 'Reset Password',
          link: '/library/reset-password',
        },
      ],
    },
  ],
} as SidebarItem;
