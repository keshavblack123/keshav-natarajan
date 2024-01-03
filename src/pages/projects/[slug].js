import Image from 'next/image'
import { performRequest } from '../../../lib/datocms'
import { Image as DatoImage, StructuredText } from "react-datocms";
import { useState } from 'react'
import { formatTagsString, formatDate } from '@/utils/utils';
import { montserrat, accent_color, content_color, text_accent, accent_content, border_accent } from '@/utils/utils';
import Link from 'next/link';

export default function Projects(props) {
  const { projectData } = props;
  const content = projectData.content;

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
          <div className={`flex flex-col flex-shrink gap-5`}> {/*side ba*/}
            <div className={`flex h-28 w-full`}>
              <Image
                src="/favicon.ico"
                width={165}
                height={100}
                alt="logo"
              />
            </div>
            <div className={`flex w-full h-full justify-center`}>
              <p className={`flex self-center text-5xl rotate-180`} style={{ writingMode: 'vertical-rl' }}>
                <span className={`${content_color}`}>Keshav</span>&nbsp;
                <span className={`${text_accent}`}>Natarajan</span>
              </p>
            </div>
            <div className={`flex h-28 items-start justify-center`}>
              <button className={`relative h-9 w-16 p-1 cursor-pointer rounded-full transition-all duration-800 border-2 border-accent-dark dark:border-accent-light`} onClick={toggleDarkMode}>
                <span className={`absolute h-6 w-6 left-1 top-1 rounded-full bg-accent-dark dark:bg-accent-light ${darkMode ? 'translate-x-7' : 'translate-x-0'}`}></span>
              </button>
            </div>
          </div> {/*end side ba*/}
          <div className={`flex flex-col w-full gap-5 overflow-auto`}>
            <div className={`flex flex-row min-h-28 w-full justify-between items-end`}>
              <button className={`flex gap-4 ${text_accent} transition-all hover:italic`}>
                <Link href="/">
                  <span className="mr-2 text-xl">&larr;</span>
                  <span>Back</span>
                </Link>
              </button>
              <div className={`flex gap-4 ${text_accent}`}>
                {projectData.prevProject?.slug && (
                  <button>
                    <Link href={`/projects/${projectData.prevProject.slug}`}>
                      <span className="text-xl">&larr;</span>
                    </Link>
                  </button>
                )}
                {projectData.nextProject?.slug && (
                  <button>
                    <Link href={`/projects/${projectData.nextProject.slug}`}>
                      <span className="text-xl">&rarr;</span>
                    </Link>
                  </button>
                )}
              </div>

            </div>
            <div className={`flex flex-col w-full gap-10 ${content_color}`}>
              <div className={`flex flex-col w-full gap-3 ${content_color}`}>
                <h1 className={`mb-2`}>{projectData.title}</h1>
                <DatoImage data={projectData.heroImage.responsiveImage} />
                <div className={`flex flex-row w-full justify-between`}>
                  <div className={`flex flex-col w-1/3`}>
                    <p>Date: {formattedDate}</p>
                    <p>Tags: {tagsString}</p>
                    <p><a href={projectData.githubLink} target="_blank" rel="noopener noreferrer">Github Link</a></p>
                  </div>
                  <div className={`w-2/3`}>
                    <StructuredText data={projectData.summary} />
                  </div>
                </div>
              </div>
              <div>
                {content && content.map((content) => (
                  <ImageAndTextBlock key={content.id} block={content} />
                ))}
              </div>
              <div>
                {content && content.map((content) => (
                  <ImageBlock key={content.id} block={content} />
                ))}
              </div>
              <div>
                {content && content.map((content) => (
                  <VideoBlock key={content.id} block={content} />
                ))}
              </div>
            </div>
            <div className={`min-h-5`}></div>
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

  return {
    paths,
    fallback: false,
  };
};

const PROJECT_QUERY = `
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
    prevProject {
      slug
    }
    nextProject {
      slug
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
    content {
      ... on ImageDesctiptRecord {
        id
        imageAndText {
          ... on ImageRecord {
            id
            image {
              responsiveImage {
                alt
                aspectRatio
                base64
                bgColor
                height
                sizes
                srcSet
                src
                title
                webpSrcSet
                width
              }
            }
          }
          ... on ParagraphRecord {
            id
            para {
              value
            }
          }
        }
      }
      ... on VideoRecord {
        id
        title
        url
      }
      ... on ImageGalleryRecord {
        id
        image {
          image {
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
      }
    }
  }
}`

export const getStaticProps = async ({ params }) => {
  const { data } = await performRequest({
    query: PROJECT_QUERY,
    variables: { slug: params.slug },
  });

  return { props: { projectData: data.project } };
};

const ImageAndTextBlock = ({ block }) => {
  const { imageAndText } = block;

  if (imageAndText !== undefined) {
    return (
      <div className={`flex flex-row-reverse gap-5`}>
        {imageAndText.map((item, index) => (
          <div key={index}>
            {item.para && item.para.value && (
              <StructuredText data={item.para} />
            )}
            {item.image && item.image.responsiveImage && (
              <DatoImage data={item.image.responsiveImage} />
            )}
          </div>
        ))}
      </div>
    );
  }
}

const ImageBlock = ({ block }) => {
  const { image } = block;

  if (image !== undefined) {
    return (
      <div className={`flex flex-wrap justify-center gap-8`}>
        {image.map((item, index) => (
          <div key={index} className={`w-3/5`}>
            {item.image && (
              <DatoImage data={item.image.responsiveImage} />
            )}
          </div>
        ))}
      </div>
    );
  }
}

const VideoBlock = ({ block }) => {
  const { url } = block;

  if (url !== undefined) {
    return (
      <div className="youtube">
        <iframe className='video' src={block.url} title={block.title} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
      </div>
    );
  }
}

{/* <iframe width="1347" height="566" src="https://www.youtube.com/embed/iEqAuV2Tl_Q" title="Game Dev Midterm Exam Part B, Pinkmans Playground" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> */ }