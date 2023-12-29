import { performRequest } from '../../../lib/datocms'
import { Image as DatoImage, StructuredText } from "react-datocms";
import { useState } from 'react'
import { formatTagsString, formatDate } from '@/utils/utils';
import { montserrat, accent_color, content_color, text_accent, accent_content, border_accent } from '@/utils/utils';
import Link from 'next/link';

export default function Projects(props) {
  const { projectData } = props;

  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  }
  const tagsString = formatTagsString(projectData.tags);
  const formattedDate = formatDate(projectData.date);

  return (
    <main className={` ${montserrat.className} ${darkMode && 'dark'}`}>
      <div className={`flex h-screen flex-col items-center p-5 gap-5 bg-light dark:bg-dark`}>
        <div className={`flex flex-row h-full w-full gap-5`}>
          <div className={`flex flex-col min-w-32 gap-5`}> {/*side ba*/}
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
          </div> {/*end side ba*/}
          <div className={`flex flex-col w-full gap-5`}>
            <div className={`flex flex-row h-28 w-full justify-between items-end`}>
              <button className={`flex gap-4 ${text_accent} transition-all hover:italic`}>
                <Link href="/">
                  <span className="mr-2 text-xl">&larr;</span>
                  <span>Back</span>
                </Link>
              </button>
              <div className={`flex gap-4 ${text_accent}`}>
                <button>
                  <span className="text-xl">&larr;</span>
                </button>
                <button>
                  <span className="text-xl">&rarr;</span>
                </button>
              </div>

            </div>
            <div className={`flex flex-col h-full w-full gap-5 ${content_color}`}>
              <h1>{projectData.title}</h1>
              <DatoImage data={projectData.heroImage.responsiveImage} />
              <div className={`flex flex-row w-full justify-between`}>
                <div className={`flex flex-col w-1/3`}>
                  <h4>Date: {formattedDate}</h4>
                  <h4>Tags: {tagsString}</h4>
                  <h4><a href={projectData.githubLink} target="_blank" rel="noopener noreferrer">Github Link</a></h4>
                </div>
                <div className={`w-2/3`}>
                  <StructuredText data={projectData.summary} />
                </div>
              </div>
            </div>
          </div>
          <div className={`flex w-1/12 min-w-0`}> {/*side ba*/}
            <></>
          </div> {/*end side ba*/}
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
  console.log(paths);

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
    githubLink
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