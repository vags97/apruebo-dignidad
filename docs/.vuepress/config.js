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

const articulos = getFiles('../articulos')
    .map(file => {
        const fileInfo = fileToMdMetaFileName(file);
        if ( fileInfo.fileName === 'README') return;
        const mdMeta = fileInfo.mdMeta;
        return {
            route: '/articulos/' + fileInfo.fileName + '.html',
            title: mdMeta.title,
            description: mdMeta.description,
            image: mdMeta.image,
            date: mdMeta.date,
        }
    })
    .sort((a,b) => Date.parse(b.date)- Date.parse(a.date))

const actividades = getFiles('../actividades')
  .map(file => {
    const fileInfo = fileToMdMetaFileName(file);
    if ( fileInfo.fileName === 'README') return;
    const mdMeta = fileInfo.mdMeta;
    const ubicacionJson = mdMeta.ubicacion? JSON.parse(mdMeta.ubicacion): null;
    const ubicacion = {
      lat: ubicacionJson? ubicacionJson.coordinates[1]: null,
      lng: ubicacionJson? ubicacionJson.coordinates[0]: null
    }
    return {
      route: '/actividades/' + fileInfo.fileName + '.html',
      title: mdMeta.title,
      description: mdMeta.description,
      image: mdMeta.image,
      date: mdMeta.date,
      organizador: mdMeta.organizador,
      direccion: mdMeta.direccion,
      ubicacion
    }
  })
  .sort((a,b) => Date.parse(b.date)- Date.parse(a.date))

const mainPages = [
  {route: '/actividades.html'},
  {route: '/articulos.html'},
  {route: '/noticias.html'},
  {route: '/'}
]

const allPages = [
  ...actividades,
  ...articulos,
  ...noticias,
  ...mainPages
]

module.exports = {
  plugins: [
      ['sitemap', {
          hostname: 'https://www.apruebodignidad.cl/',
          urls: allPages.map(page=> {
              return {
                  url: page.route,
                  changeFreq: 'daily'
              }
          })
      }]
  ],
  locales: {
      /* This is where you place your general locale config */
      '/': {
          lang: 'es',
      },
  },
  shouldPrefetch: () => false,
  title: "Apruebo Dignidad",
  description: "Página de Conglomerado Apruebo Dignidad",
  image: "/media/apruebo-dignidad-logo-oficial.jpg",
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
      { text: "Artículos", link: "/articulos" },
      { text: "Actividades", link: "/actividades" },
      { text: "Kit Gráfico", link: "https://drive.google.com/drive/folders/1h0IpZDSzC3x32sCpW8Sao9wcKxUyW5TG?usp=sharing" },
    ],
    noticias,
    articulos,
    actividades,
    domain: "https://www.apruebodignidad.cl",
    logo: '/media/logo-apruebo-dignidad.png',
    facebook: 'ADignidadCL',
    twitter: 'ADignidadCL',
    instagram: 'adignidadcl',
    wikipedia: 'https://es.wikipedia.org/wiki/Apruebo_Dignidad',
    gkey: 'AIzaSyDXVzczbFe4QYKecXDGZPEfIH3UI3VdFsQ',
    jsonLd: {
        boric: {
            "@type": "Person",
            "id": "candidatoBoric",
            "name": "Gabriel Boric",
            "url": "https://www.boricpresidente.cl",
            "image": "https://www.apruebodignidad.cl/media/gabriel-boric.jpg",
            "sameAs": [
                "https://www.facebook.com/gabrielboric",
                "https://twitter.com/gabrielboric",
                "https://www.instagram.com/gabrielboric",
                "https://boricpresidente.cl/",
                "https://www.youtube.com/user/gabrielboric",
                "https://es.wikipedia.org/wiki/Gabriel_Boric",
                "https://www.tiktok.com/@gabrielboric"
            ],
            "jobTitle": ["Diputado",  "Candidato Presidente", 'Militante Político'],
        },
        chile: {
            "@type": "Organization",
            "name": "Chile",
            "id": "paisChile",
            "alternateName": "República de Chile",
            "sameAs": [
                'https://es.wikipedia.org/wiki/Chile',
                'https://www.gob.cl/'
            ]
        },
        aprueboDignidad: {
            "@type": "Organization",
            "name": "Apruebo Dignidad",
            "id": "aprueboDignidad",
            "alternateName": "Conglomerado Apruebo Dignidad",
            "url": "https://www.apruebodignidad.cl",
            "logo": "https://www.apruebodignidad.cl/media/logo-apruebo-dignidad.png",
            "sameAs": [
                "https://www.facebook.com/ADignidadCL",
                "https://www.twitter.com/ADignidadCL",
                "https://www.instagram.com/adignidadcl",
                "https://es.wikipedia.org/wiki/Apruebo_Dignidad",
            ]
        },
        convergenciaSocial: {
            "@type": "Organization",
            "name": "Convergencia Social",
            "id": "convergenciaSocial",
            "alternateName": "Partido Convergencia Social",
            "url": 'https://convergenciasocial.cl/',
            "logo": 'https://convergenciasocial.cl/wp-content/uploads/2020/03/logo_vertical-copia.png',
            "sameAs": [
                'https://www.facebook.com/laconvergenciasocial/',
                'https://twitter.com/la_convergencia',
                'https://www.instagram.com/convergenciasocial/?hl=es-la',
                'https://www.youtube.com/channel/UC-MNegJS21Q_mZbmI9Fe5mA',
                'https://es.wikipedia.org/wiki/Convergencia_Social'
            ]
        },
        frenteAmplio: {
            "@type": "Organization",
            "name": "Frente Amplio",
            "id": "frenteAmplio",
            "alternateName": "Conglomerado Frente Amplio",
            "url": 'https://www.frente-amplio.cl/',
            "logo": 'https://www.frente-amplio.cl/sites/default/files/logowebfa.png',
            "sameAs": [
                'https://www.facebook.com/FrenteAmpliodeChile',
                'https://twitter.com/elfrente_amplio',
                'https://www.youtube.com/channel/UC35UWpLZQchdul3lT4l1soQ/featured',
                'https://www.instagram.com/frenteamplio_chile/',
                'https://es.wikipedia.org/wiki/Frente_Amplio_(Chile)'
            ]
        },
      convencion: {
        "@type": "Organization",
        "name": "Frente Amplio",
        "id": "frenteAmplio",
        "alternateName": "Conglomerado Frente Amplio",
        "url": 'https://www.chileconvencion.cl/',
        "logo": 'https://www.chileconvencion.cl/wp-content/themes/convencionconstitucional/assets/images/logo_cc.svg',
        "sameAs": [
          'https://www.instagram.com/convencioncl/',
          'https://twitter.com/convencioncl',
          'https://web.facebook.com/convencioncl?_rdc=1&_rdr',
          'https://www.youtube.com/channel/UCRlIWVAxQdAnCl4D4UR9r3Q',
          'https://es.wikipedia.org/wiki/Convenci%C3%B3n_Constitucional_(Chile)'
        ]
      }
    }
  },
};
