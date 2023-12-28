import Image from 'next/image'
import { useState } from 'react'
import { performRequest } from '../../lib/datocms'
import Link from 'next/link'
import { Montserrat } from 'next/font/google'

const montserrat = Montserrat({ subsets: ['latin'] });
const accent_color = 'bg-accent-dark dark:bg-accent-light';
const content_color = 'text-dark dark:text-light';
const text_accent = 'text-accent-dark dark:text-accent-light';
const accent_content = 'text-light dark:text-dark';

const PAGE_CONTENT_QUERY = `
query Projects {
  allProjects {
    title
    slug
    tags {
      tagName
    }
    date
    id
  }
}`;

export async function getStaticProps() {
  const { data } = await performRequest({ query: PAGE_CONTENT_QUERY });
  const projects = data.allProjects;
  return { props: { projects } };
}


const ProjectPreview = (props) => {
  const { data } = props;
  const tagsString = data.tags.map((tag) => tag.tagName).join(' / ');
  const formattedDate = new Date(data.date).toLocaleDateString('en-US', { month: '2-digit', year: 'numeric' }).replace('/', ' / ');

  return (
    <Link href={`/projects/${data.slug}`}>
      <div className={`flex flex-row items-end justify-between p-6 h-28 w-full ${accent_color}`}>
        <div className={`flex flex-col justify-between h-full ${accent_content}`}>
          <h3>{data.title}</h3>
          <p>{tagsString}</p>
        </div>
        <p className={`${accent_content}`}>{formattedDate}</p>
      </div>
    </Link>
  )
}

export default function Home({ projects }) {
  const { data } = projects;

  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  }

  return (
    <main className={` ${montserrat.className} ${darkMode && 'dark'}`}>
      <div className={`flex h-screen flex-col items-center p-5 gap-5 bg-light dark:bg-dark`}>
        <div className={`flex flex-row h-full w-full gap-5`}>
          <div className={`flex flex-col w-48 gap-5`}>
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
            <div className={`flex h-28 items-start justify-center ${accent_color} ${accent_content}`}
              onClick={toggleDarkMode}>
              <button>Toggle Tone</button>
            </div>
          </div>
          <div className={`flex flex-row w-full gap-5`}>
            <div className={`flex flex-col w-full gap-5`}>
              <div className={`flex items-end h-28 w-full ${text_accent}`}>
                <h1>Projects</h1>
              </div>
              <div className={`flex flex-col gap-3`}>
                {projects.map((p) => (
                  <ProjectPreview key={p.id} data={p} />
                ))}
              </div>
            </div>
            <div className={`flex flex-col w-full gap-5`}>
              <div className={`flex items-end h-28 w-full ${text_accent}`}>
                <h1>About</h1>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  )
}

