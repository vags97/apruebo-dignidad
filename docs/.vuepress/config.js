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

const noticias = getFiles('../_noticias')
    .map(file => {
      const fileInfo = fileToMdMetaFileName(file);
      if ( fileInfo.fileName === 'README') return;
      const mdMeta = fileInfo.mdMeta;
      return {
        route: fileInfo.fileName + '.html',
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

module.exports = {
  plugins: {
      'sitemap': {
          hostname: 'https://www.apruebo-dignidad.cl/',
          urls: candidatos.map(candidato=> {
              return {
                  url: candidato.route,
                  changeFreq: 'daily'
              }
          })
      },
      '@vuepress/google-analytics': {
          ga: 'UA-212306154-1'
      }
  },
  locales: {
      /* This is where you place your general locale config */
      '/': {
          lang: 'es',
      },
  },
  title: "Apruebo Dignidad",
  description:
    "Candidatura Apruebo Dignidad",
  head: [
    ['link', { rel: "apple-touch-icon", sizes: "180x180", href: "/media/favicons/apple-touch-icon.png"}],
    ['link', { rel: "icon", type: "image/png", sizes: "32x32", href: "/media/favicons/favicon-32x32.png"}],
    ['link', { rel: "icon", type: "image/png", sizes: "16x16", href: "/media/favicons/favicon-16x16.png"}],
    ['meta', { name: "viewport", content: "width=device-width, initial-scale=1.0"} ]
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
    logo: '/media/logo.png',
    facebook: 'ADignidadCL',
    twitter: 'ADignidadCL',
    instagram: 'adignidadcl'
  },
};
