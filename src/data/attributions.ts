import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';

export interface IconAttribution {
  title: string;
  image: string;
  attribution: string;
  description?: string;
  include_attribution: boolean;
}

export interface PackageAttribution {
  title: string;
  image?: string;
  attribution: string;
  description: string;
  include_attribution: boolean;
}

export interface PersonAttribution {
  name: string;
  socials: Array<{
    icon: typeof GitHubIcon;
    url: string;
    label: string;
  }>;
  notes: string;
  include_attribution: boolean;
}

export const iconAttributions: IconAttribution[] = [
  {
    title: 'Zen Circle',
    image: 'https://raw.githubusercontent.com/BrokeDesign/BrokeReact/a2b162accef0e79ab49bc32fcfb1c4e56fd92808/src/assets/images/logo.svg',
    attribution: '',
    include_attribution: false,
  },
  {
    title: 'Browser',
    image: '/icons/browser.png',
    attribution: 'Attribution needed',
    include_attribution: true,
  },
  {
    title: 'Cyber Threat',
    image: '/icons/cyber-threat.png',
    attribution: 'Cyber threat icons created by [Eklip Studio](https://www.flaticon.com/authors/eklip-studio) - [Flaticon](https://www.flaticon.com/free-icons/cyber-threat)',
    include_attribution: true,
  },
  {
    title: 'Cloud Firewall',
    image: '/icons/dangerous.png',
    attribution: 'Fire icons created by [Freepik](https://www.flaticon.com/authors/freepik) - [Flaticon](https://www.flaticon.com/free-icons/fire)',
    include_attribution: true,
  },
  {
    title: 'Data',
    image: '/icons/data.png',
    attribution: 'Quality icons created by [Eucalyp](https://www.flaticon.com/authors/eucalyp) - [Flaticon](https://www.flaticon.com/free-icons/quality)',
    include_attribution: true,
  },
  {
    title: 'Data Server',
    image: '/icons/data-server.png',
    attribution: 'Infrastructure icons created by [SBTS2018](https://www.flaticon.com/authors/sbts2018) - [Flaticon](https://www.flaticon.com/free-icons/infrastructure)',
    include_attribution: true,
  },
  {
    title: 'Database Storage',
    image: '/icons/database-storage.png',
    attribution: 'Database icons created by [phatplus](https://www.flaticon.com/authors/phatplus) - [Flaticon](https://www.flaticon.com/free-icons/database)',
    include_attribution: true,
  },
  {
    title: 'DNS',
    image: '/icons/dns.png',
    attribution: 'DNS icons created by [Freepik](https://www.flaticon.com/authors/freepik) - [Flaticon](https://www.flaticon.com/free-icons/dns)',
    include_attribution: true,
  },
  {
    title: 'Easy Access',
    image: '/icons/easy-access.png',
    attribution: 'Easy access icons created by [Freepik](https://www.flaticon.com/authors/freepik) - [Flaticon](https://www.flaticon.com/free-icons/easy-access)',
    include_attribution: true,
  },
  {
    title: 'Mail',
    image: '/icons/mail.png',
    attribution: 'Email icons created by [ChilliColor](https://www.flaticon.com/authors/chillicolor) - [Flaticon](https://www.flaticon.com/free-icons/email)',
    include_attribution: true,
  },
  {
    title: 'Modeling',
    image: '/icons/modeling.png',
    attribution: 'Simulation icons created by [Futuer](https://www.flaticon.com/authors/futuer) - [Flaticon](https://www.flaticon.com/free-icons/simulation)',
    include_attribution: true,
  },
  {
    title: 'Monitor',
    image: '/icons/monitor.png',
    attribution: 'Big data icons created by [xnimrodx](https://www.flaticon.com/authors/xnimrodx) - [Flaticon](https://www.flaticon.com/free-icons/big-data)',
    include_attribution: true,
  },
  {
    title: 'People',
    image: '/icons/people.png',
    attribution: 'Fight icons created by [Leremy](https://www.flaticon.com/authors/leremy) - [Flaticon](https://www.flaticon.com/free-icons/fight)',
    include_attribution: true,
  },
  {
    title: 'Proxy',
    image: '/icons/proxy.png',
    attribution: 'Proxy icons created by [Freepik](https://www.flaticon.com/authors/freepik) - [Flaticon](https://www.flaticon.com/free-icons/proxy)',
    include_attribution: true,
  },
  {
    title: 'Server',
    image: '/icons/server.png',
    attribution: 'Firewall icons created by [Creaticca Creative Agency](https://www.flaticon.com/authors/creaticca-creative-agency) - [Flaticon](https://www.flaticon.com/free-icons/firewall)',
    include_attribution: true,
  },
  {
    title: 'Server 1',
    image: '/icons/server-1.png',
    attribution: 'Server icons created by [RaftelDesign](https://www.flaticon.com/authors/rafteldesign) - [Flaticon](https://www.flaticon.com/free-icons/server)',
    include_attribution: true,
  },
  {
    title: 'Target',
    image: '/icons/target.png',
    attribution: 'Define icons created by [iconmas](https://www.flaticon.com/authors/iconmas) - [Flaticon](https://www.flaticon.com/free-icons/define)',
    include_attribution: true,
  },
  {
    title: 'Two Factor Authentication',
    image: '/icons/two-factor-authentication.png',
    attribution: 'Two factor authentication icons created by [Dewi Sari](https://www.flaticon.com/authors/dewi-sari) - [Flaticon](https://www.flaticon.com/free-icons/two-factor-authentication)',
    include_attribution: true,
  },
  {
    title: 'VPN',
    image: '/icons/vpn.png',
    attribution: 'VPN icons created by [Cyber Olympus](https://www.flaticon.com/authors/cyber-olympus) - [Flaticon](https://www.flaticon.com/free-icons/vpn)',
    include_attribution: true,
  },
];

export const packageAttributions: PackageAttribution[] = [
  {
    title: 'React',
    image: 'https://reactjs.org/favicon.ico',
    attribution: 'Created by [Meta Open Source](https://github.com/facebook/react)',
    description: 'A JavaScript library for building user interfaces',
    include_attribution: true,
  },
  {
    title: 'Material-UI',
    image: 'https://mui.com/favicon.ico',
    attribution: 'Created by [MUI](https://github.com/mui/material-ui)',
    description: 'React components that implement Google\'s Material Design',
    include_attribution: true,
  },
  {
    title: 'Chart.js',
    image: 'https://www.chartjs.org/favicon.ico',
    attribution: 'Created by [Chart.js](https://github.com/chartjs/Chart.js)',
    description: 'Simple yet flexible JavaScript charting',
    include_attribution: true,
  },
  {
    title: 'React Router',
    image: 'https://reactrouter.com/favicon.ico',
    attribution: 'Created by [Remix Software](https://github.com/remix-run/react-router)',
    description: 'Declarative routing for React applications',
    include_attribution: true,
  },
  {
    title: 'Zustand',
    attribution: 'Created by [Poimandres](https://github.com/pmndrs/zustand)',
    description: 'A small, fast and scalable state management solution',
    include_attribution: true,
  },
  {
    title: 'React Hook Form',
    image: 'https://react-hook-form.com/favicon.ico',
    attribution: 'Created by [React Hook Form](https://github.com/react-hook-form/react-hook-form)',
    description: 'Performant, flexible and extensible forms with easy-to-use validation',
    include_attribution: true,
  },
  {
    title: 'Leaflet',
    image: 'https://leafletjs.com/favicon.ico',
    attribution: 'Created by [Vladimir Agafonkin](https://github.com/Leaflet/Leaflet)',
    description: 'An open-source JavaScript library for mobile-friendly interactive maps',
    include_attribution: true,
  },
  {
    title: 'React Leaflet',
    attribution: 'Created by [Paul Le Cam](https://github.com/PaulLeCam/react-leaflet)',
    description: 'React components for Leaflet maps',
    include_attribution: true,
  },
  {
    title: 'React Markdown',
    attribution: 'Created by [Remarkjs](https://github.com/remarkjs/react-markdown)',
    description: 'Markdown component for React',
    include_attribution: true,
  },
  {
    title: 'React Tooltip',
    attribution: 'Created by [ReactJS Community](https://github.com/ReactTooltip/react-tooltip)',
    description: 'Tooltip component for React applications',
    include_attribution: true,
  },
  {
    title: 'Recharts',
    image: 'https://recharts.org/favicon.ico',
    attribution: 'Created by [Recharts Group](https://github.com/recharts/recharts)',
    description: 'A composable charting library built on React components',
    include_attribution: true,
  },
  {
    title: 'Faker',
    attribution: 'Created by [Faker](https://github.com/faker-js/faker)',
    description: 'Generate massive amounts of realistic fake data',
    include_attribution: true,
  },
  {
    title: 'TypeScript',
    image: 'https://www.typescriptlang.org/favicon.ico',
    attribution: 'Created by [Microsoft](https://github.com/microsoft/TypeScript)',
    description: 'A typed superset of JavaScript that compiles to plain JavaScript',
    include_attribution: true,
  },
  {
    title: 'Vite',
    image: 'https://vitejs.dev/favicon.ico',
    attribution: 'Created by [Evan You](https://github.com/vitejs/vite)',
    description: 'Next generation frontend tooling',
    include_attribution: true,
  },
];

export const people: PersonAttribution[] = [
  {
    name: 'Christian Gorke',
    socials: [
      {
        icon: GitHubIcon,
        url: 'https://github.com/skothasec',
        label: 'GitHub',
      },
      {
        icon: LinkedInIcon,
        url: 'https://linkedin.com/in/christiangorke',
        label: 'LinkedIn',
      },
      {
        icon: TwitterIcon,
        url: 'https://twitter.com/christiangorke',
        label: 'Twitter',
      },
    ],
    notes: 'Project architecture and core functionality',
    include_attribution: true,
  },
];

export const defaultPackageIcon =
  'https://raw.githubusercontent.com/npm/logos/master/npm%20logo/npm-logo-red.png';