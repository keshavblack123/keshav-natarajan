import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { performRequest } from '../../lib/datocms'
import Link from 'next/link'
import { formatTagsString, formatDate } from '@/utils/utils'
import { Panel, PanelGroup, PanelResizeHandle, } from "react-resizable-panels";
import { montserrat } from '@/utils/utils';
import { StructuredText } from 'react-datocms/structured-text'
import { SocialIcon } from 'react-social-icons'

const accent_color = 'hover:bg-accent-dark dark:hover:bg-accent-light';
const content_color = 'text-dark dark:text-light';
const text_accent = 'text-accent-dark dark:text-accent-light';
const accent_content = 'text-dark hover:text-light dark:text-light dark:hover:text-dark';
const border_accent = 'border-accent-dark dark:border-accent-light';

const PAGE_CONTENT_QUERY = `
query Projects {
  allProjects(orderBy: date_DESC) {
    title
    slug
    tags {
      tagName
    }
    date
    id
  }
}`;

const ABOUT_ME_QUERY = `
query AboutMe {
  aboutMe {
    pastWorkExperience {
      value
    }
    skills {
      tagName
    }
    summary {
      value
    }
    education {
      value
    }
  }
}`

export async function getStaticProps() {
  const { data: allProjects } = await performRequest({ query: PAGE_CONTENT_QUERY });
  const { data: aboutMe } = await performRequest({ query: ABOUT_ME_QUERY });
  const projects = allProjects.allProjects;
  const about = aboutMe.aboutMe;
  return { props: { projects, about } };
}

const ProjectPreview = (props) => {
  const { data } = props;
  const tagsString = formatTagsString(data.tags);
  const formattedDate = formatDate(data.date);

  return (
    <Link href={`/projects/${data.slug}`}>
      <div className={`flex flex-col justify-between p-6 h-28 w-full rounded-sm ${accent_content} ${accent_color}`}>
        <h3 className={`truncate`}>{data.title}</h3>
        <div className={`flex flex-row justify-between w-full`}>
          <p>{tagsString}</p>
          <p>{formattedDate}</p>
        </div>
      </div>
    </Link>
  )
}

export default function Home(props) {
  const { projects, about } = props;

  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  }

  return (
    <main className={` ${montserrat.className} ${darkMode && 'dark'} bg-light dark:bg-dark`}>
      <div className={`flex h-screen flex-col items-center p-5 gap-5 bg-light dark:bg-dark transition-colors`}>
        <div className={`flex flex-row h-full w-full gap-5`}>
          <div className={`flex flex-col flex-shrink gap-5`}>
            <div className={`flex h-28`}>
              <Image
                src={darkMode ? "/lightLogo.png" : "/darkLogo.png"}
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
          </div>

          <PanelGroup direction='horizontal' className={`flex flex-row w-full gap-3`}>
            <Panel
              className={`flex flex-col gap-5`}
              minSize={30}>
              <div className={`flex items-end min-h-28 w-full ${text_accent}`}>
                <h1>Projects</h1>
              </div>
              <div className={`flex h-full flex-col gap-3`} style={{ overflow: 'auto' }}>
                {projects.map((p) => (
                  <ProjectPreview key={p.id} data={p} />
                ))}
              </div>
            </Panel>
            <PanelResizeHandle className={`flex border-box self-center w-1 h-24 rounded-full bg-accent-dark dark:bg-accent-light`} />
            <Panel
              className={`flex flex-col gap-5`}
              minSize={30}>
              <div className={`flex items-end min-h-28 w-full ${text_accent}`}>
                <h1>About</h1>
              </div>
              <div className={`flex flex-col border h-full gap-5 p-6 rounded-sm ${border_accent} ${content_color}`} style={{ overflow: 'auto' }}>
                <StructuredText data={about.summary} />
                <div className={`flex flex-col gap-2`}>
                  <h3 className={`${text_accent}`}>Skills</h3>
                  <ul className={`flex flex-wrap gap-5 list-disc pl-4`}>
                    {about.skills.map((tag, index) => (
                      <li key={index} className='mr-5 text-sm'>{tag.tagName}</li>
                    ))}
                  </ul>
                </div>
                <div className={`flex flex-col gap-2`}>
                  <h3 className={`${text_accent}`}>Education</h3>
                  <StructuredText data={about.education} />
                </div>
                <div className={`flex flex-col gap-2`}>
                  <h3 className={`${text_accent}`}>Past Work Experience</h3>
                  <StructuredText data={about.pastWorkExperience} />
                </div>
                <div className={`flex flex-col gap-3`}>
                  <h3 className={`${text_accent}`}>Contact</h3>
                  <div className={`flex flex-row gap-2`}>
                    <SocialIcon url="https://www.linkedin.com/in/keshavnatarajan/" target='_blank' rel="noopener noreferrer" />
                    <SocialIcon url="https://github.com/keshavblack123" target='_blank' rel="noopener noreferrer" />
                    <SocialIcon href="mailto:keshavnatarajan@gmail.com" network='google' />
                  </div>
                </div>
              </div>
            </Panel>
          </PanelGroup>

        </div>
      </div>
    </main>
  )
}

