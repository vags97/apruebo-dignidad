const path = require('path');
const dirTree = require('directory-tree');
const MarkdownIt = require('markdown-it');
const meta = require('markdown-it-meta');
const fs = require('fs');

function fileToMdMetaFileName(file){
  const fileName = path.parse(file.name).name;
  const filePath = file.path;
  const md = new MarkdownIt();
  md.use(meta);
  const fileRead = fs.readFileSync(filePath, 'utf8');
  md.render(fileRead);
  return {
    fileName,
    mdMeta: md.meta
  }
}

function getFiles (pathRead) {
  return dirTree(path.join(__dirname, pathRead), {extensions: /\.md/}).children;
}

const noticias = getFiles('../noticias')
    .map(file => {
      const fileInfo = fileToMdMetaFileName(file);
      if ( fileInfo.fileName === 'README') return;
      const mdMeta = fileInfo.mdMeta;
      return {
        route: '/noticias/' + fileInfo.fileName + '.html',
        title: mdMeta.title,
        description: mdMeta.description,
        image: mdMeta.image,
        date: mdMeta.date,
      }
    })
    .sort((a,b) => Date.parse(b.date)- Date.parse(a.date))

const candidaturasDiputados = getFiles('../candidatos-diputados')
    .map(file => {
      const fileInfo = fileToMdMetaFileName(file);
      if ( fileInfo.fileName === 'README') return;
      const mdMeta = fileInfo.mdMeta;
      return {
        tipoCandidatura: 1,
        route: '/candidatos-diputados/' + fileInfo.fileName + '.html',
        title: mdMeta.title,
        papeleta: mdMeta.papeleta,
        image: mdMeta.image,
        distrito: mdMeta.distrito
      }
    })

const candidaturasSenadores = getFiles('../candidatos-senadores')
    .map(file => {
      const fileInfo = fileToMdMetaFileName(file);
      if ( fileInfo.fileName === 'README') return;
      const mdMeta = fileInfo.mdMeta;
      return {
        tipoCandidatura: 2,
        route: '/candidatos-senadores/' + fileInfo.fileName + '.html',
        title: mdMeta.title,
        papeleta: mdMeta.papeleta,
        image: mdMeta.image,
        circunscripcionSenatorial: mdMeta.circunscripcionSenatorial
      }
    })

const candidaturasCores = getFiles('../candidatos-cores')
    .map(file => {
      const fileInfo = fileToMdMetaFileName(file);
      if ( fileInfo.fileName === 'README') return;
      const mdMeta = fileInfo.mdMeta;
      return {
        tipoCandidatura: 3,
        route: '/candidatos-cores/' + fileInfo.fileName + '.html',
        title: mdMeta.title,
        papeleta: mdMeta.papeleta,
        image: mdMeta.image,
        circunscripcionProvincial: mdMeta.circunscripcionProvincial
      }
    })

const candidatos = [
    ...candidaturasDiputados,
    ...candidaturasSenadores,
    ...candidaturasCores
]

const mainPages = [
    {route: '/candidatos'},
    {route: '/noticias'},
    {route: '/'}
]

const allPages = [
    ...candidatos,
    ...noticias,
    ...mainPages
]

module.exports = {
  plugins: [
      ['sitemap', {
          hostname: 'https://www.apruebo-dignidad.cl/',
          urls: allPages.map(page=> {
              return {
                  url: page.route,
                  changeFreq: 'daily'
              }
          })
      }],
  ],
  locales: {
      /* This is where you place your general locale config */
      '/': {
          lang: 'es',
      },
  },
  title: "Apruebo Dignidad",
  description: "Página de Conglomerado Apruebo Dignidad",
  image: "/media/apruebo-dignidad-logo-oficial.jpg",
  head: [
    ['link', { rel: "apple-touch-icon", sizes: "180x180", href: "/media/favicons/apple-touch-icon.png"}],
    ['link', { rel: "icon", type: "image/png", sizes: "32x32", href: "/media/favicons/favicon-32x32.png"}],
    ['link', { rel: "icon", type: "image/png", sizes: "16x16", href: "/media/favicons/favicon-16x16.png"}],
    ['meta', { name: "viewport", content: "width=device-width, initial-scale=1.0"} ],
    [
        'script',
        {
            async: true,
            src: 'https://www.googletagmanager.com/gtag/js?id=G-ET19WB2WXP',
        },
    ],
    [
        'script',
        {},
        [
            "window.dataLayer = window.dataLayer || [];\nfunction gtag(){dataLayer.push(arguments);}\ngtag('js', new Date());\ngtag('config', 'G-ET19WB2WXP');",
        ],
    ],
  ],
  themeConfig: {
    author: 'Apruebo Dignidad',
    title: "Apruebo Dignidad",
    nav: [
      { text: "Noticias", link: "/noticias" },
      { text: "Candidatos", link: "/candidatos" },
      { text: "Apoderados", link: "https://boricpresidente.cl/apoderados" },
      { text: "Propuestas", link: "https://boricpresidente.cl/propuestas" },
      { text: "Aporta", link: "https://boricpresidente.cl/aporta" },
    ],
    noticias,
    candidatos,
    domain: "https://www.apruebo-dignidad.cl",
    logo: '/media/logo-apruebo-dignidad.png',
    facebook: 'ADignidadCL',
    twitter: '@ADignidadCL',
    instagram: 'adignidadcl'
  },
};
