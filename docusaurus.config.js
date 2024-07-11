// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const { themes } = require('prism-react-renderer')
const lightCodeTheme = themes.github
const darkCodeTheme = themes.dracula

const docs = {
  sidebarCollapsed: false,
  sidebarPath: require.resolve('./sidebars.js'),
  // Please change this to your repo.
  // Remove this to remove the "edit this page" links.
  // editUrl:
  // 'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
}

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: '码上学英语',
  tagline: "Practice to Progress",
  url: 'https://justdo.in',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'Cheau', // Usually your GitHub org/user name.
  projectName: 'mashangxue', // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans'],
  },

  // Mermaid config.
  markdown: {
    mermaid: true,
  },
  themes: [
    '@docusaurus/theme-mermaid',
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      ({
        hashed: true,
        language: ['en', 'zh'],
      })
    ]
  ],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: false,
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl:
          //   'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  plugins: [
    [
      './src/plugins/docs-ext',
      {
        ...docs,
        ext: {
          latest: {
            filters: ['sc/dc'],
          }
        },
      },
    ],
    [
      './src/plugins/e-tcm',
      {
        dir: '/static/audio/e-tcm',
      }
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: '码上学英语',
        logo: {
          alt: 'Logo',
          src: 'img/logo.png',
        },
        items: [
          {
            type: 'doc',
            docId: 'intro',
            position: 'left',
            label: '课程',
          },
          {to: '/blog', label: '博客', position: 'left'},
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: '学英语，共进步',
            items: [
              {
                label: '课程',
                to: '/docs/intro',
              },
              {
                label: '博客',
                to: '/blog',
              },
            ],
          },
          {
            title: '关注我，不迷路',
            items: [
              {
                label: '今日头条',
                href: 'https://www.toutiao.com/c/user/token/MS4wLjABAAAA6cQ5W5H1CyTtQ6XGNv3onDbwb-1aKZqerd8Awwfggxw-1vRJEJsLoewn8Qyiozxd/?',
              },
              {
                label: '抖音',
                href: 'https://www.douyin.com/user/MS4wLjABAAAA2nCt9miTGKqwBjRluIBTJnNQ1ixZV3uqMXunnJBqfcpiTuL1KM-Wclz6xkExqAw7',
              },
              {
                label: '西瓜视频',
                href: 'https://www.ixigua.com/home/3127433904798535/',
              },
              {
                label: '哔哩哔哩',
                href: 'https://space.bilibili.com/1921010525',
              },
            ],
          },
          {
            title: '发现精彩',
            items: [
              {
                label: '电子中药播放器',
                to: '/e-tcm',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} 码上学英语`,
      },
      mermaid: {
        // https://mermaid.js.org/config/theming.html#available-themes
        theme: {light: 'base', dark: 'forest'},
      },
      prism: {
        additionalLanguages: ['bash', 'diff', 'json'],
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
