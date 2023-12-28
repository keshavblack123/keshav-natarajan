import { performRequest } from '../../../lib/datocms'
import { useState } from 'react'
import { Montserrat } from 'next/font/google'

const montserrat = Montserrat({ subsets: ['latin'] });
const accent_color = 'bg-accent-dark dark:bg-accent-light';
const content_color = 'text-dark dark:text-light';
const text_accent = 'text-accent-dark dark:text-accent-light';
const accent_content = 'text-light dark:text-dark';


export default function Projects(props) {
  const { projectData } = props;

  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  }

  console.log(projectData)

  return (
    <main className={` ${montserrat.className} ${darkMode && 'dark'}`}>
      <div className={`flex h-screen flex-col items-center p-5 gap-5 bg-light dark:bg-dark`}>
        <div className={`flex flex-row h-full w-full gap-5`}>
          <div className={`flex flex-col w-48 gap-5`}>
            <div className={`flex h-28 w-full`}>
              <p>Logo</p>
            </div>
            <div className={`flex w-full h-full justify-center`}>
              <p className={`flex self-center text-5xl rotate-180`} style={{ writingMode: 'vertical-rl' }}>
                <span className={`${content_color}`}>Keshav</span>&nbsp;
                <span className={`${text_accent}`}>Natarajan</span>
              </p>
            </div>
            <div className={`flex h-28 items-start justify-center ${accent_color} ${accent_content}`}
              onClick={toggleDarkMode}>
              <button>Toggle Tone</button>
            </div>
          </div>
          <div className={`flex flex-col w-full gap-5`}>
            <div className={`flex flex-col h-28 w-full bg-dark`}>
              <p>Back Button, prev and next</p>
            </div>
            <div className={`flex flex-col h-full w-full bg-dark`}>
              <h1>{projectData.title}</h1>
              {/* <p>content here</p> */}
            </div>
          </div>

        </div>
      </div>
    </main>
  )
}

const PATHS_QUERY = `
query Projects {
  allProjects {
    slug
  }
}`;

export const getStaticPaths = async () => {
  const slugQuery = await performRequest({ query: PATHS_QUERY });

  let paths = [];
  slugQuery.data.allProjects.map((p) => paths.push(`/projects/${p.slug}`));

  return {
    paths,
    fallback: false,
  };
};

const PROJECTS_QUERY = `
query Project($slug: String) {
  project(filter: {slug: {eq: $slug}}) {
    title
    date
    tags {
      tagName
    }
    link {
      value
    }
    summary {
      value
    }
    heroImage {
      responsiveImage {
        width
        webpSrcSet
        title
        srcSet
        src
        sizes
        height
        bgColor
        base64
        aspectRatio
        alt
      }
    }
    images {
      responsiveImage {
        alt
        aspectRatio
        base64
        bgColor
        height
        sizes
        src
        srcSet
        title
        webpSrcSet
        width
      }
    }
  }
}`

export const getStaticProps = async ({ params }) => {
  const { data } = await performRequest({
    query: PROJECTS_QUERY,
    variables: { slug: params.slug },
  });

  return { props: { projectData: data.project } };
};