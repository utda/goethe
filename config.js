export default {
  title: "ゲーテ自署付書簡テキストデータ（TEI準拠）",
  color: {
    main: "primary",
  },
  hostname: {
    "production": "https://utda.github.io/",
    "development": "http://localhost:52441/"
  },
  baseURL: "/goethe",
  description: "ゲーテ書簡の特設サイトです。",
  top_image_url: "/home.jpg",
  show_top_div: true,
  footer: {
    ja: "東京大学附属図書館　学術資産アーカイブ化推進室<br/>E-mail：digital-archive [at] lib.u-tokyo.ac.jp",
    en: "UTokyo Academic Archives Project Office（General Affairs Division, University of Tokyo Library System)<br/>E-mail：digital-archive [at] lib.u-tokyo.ac.jp",
  },
  _footer2: "Historiographical Institute The University of Tokyo",
  _footer:
    '<p><a style="color: inherit;" href="https://www.hi.u-tokyo.ac.jp/">東京大学史料編纂所</a></p><br/><p><a style="color: inherit;" href="https://www.hi.u-tokyo.ac.jp/">Glossary PJ</a></p>',
  colSearch: 4,
  menus: [
    {
      title: "top",
      to: { name: "index" },
      header: true,
    },
    {
      title: "about",
      to: {
        name: "page-slug",
        params: {
          slug: "about",
        },
      },
      top: true,
      type: "about_this_site",
      weight: 0,
    },
    {
      title: "東京大学",
      href: "https://www.u-tokyo.ac.jp/",
      target: "_blank",
    },
  ],
};
