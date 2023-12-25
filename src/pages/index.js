import Image from 'next/image'
import { useState } from 'react';
import { Montserrat } from 'next/font/google'
import { performRequest } from '../../lib/datocms'

const montserrat = Montserrat({ subsets: ['latin'] })

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

const ToneButton = () => {
  const [tone, setTone] = useState("light");

  const handleButtonClick = () => {
    // Toggle between "light" and "dark" when the button is clicked
    setTone((prevTone) => (prevTone === "light" ? "dark" : "light"));
  };

  return (
    <div className={`flex h-28 items-start justify-center bg-accent-${tone}`}>
      <button onClick={handleButtonClick}>Toggle Tone</button>
    </div>
  );
};

const ProjectPreview = (props) => {
  const { data } = props;
  const tagsString = data.tags.map((tag) => tag.tagName).join(' / ');
  const formattedDate = new Date(data.date).toLocaleDateString('en-US', { month: '2-digit', year: 'numeric' }).replace('/', ' / ');

  console.log(data.date)
  return (
    <div className={`flex flex-row items-end justify-between p-6 h-28 w-full bg-accent-dark`}>
      <div className={`flex flex-col justify-between h-full`}>
        <h3>{data.title}</h3>
        <p>{tagsString}</p>
      </div>
      <p>{formattedDate}</p>
    </div>
  )
}

export default function Home({ projects }) {
  const { data } = projects;
  // posts = data.allProjects;
  console.log(data);
  return (
    <main className={`flex h-screen flex-col items-center p-5 gap-5 bg-light ${montserrat.className}`}>

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
              <span className='text-dark'>Keshav</span>&nbsp;
              <span className='text-accent-dark'>Natarajan</span>
            </p>
          </div>
          <div className={`flex h-28 items-start justify-center`}>
            <ToneButton />
          </div>
        </div>
        <div className={`flex flex-row w-full gap-5`}>
          <div className={`flex flex-col w-full gap-5`}>
            <div className={`flex items-end h-28 w-full text-accent-dark`}>
              <h1>Projects</h1>
            </div>
            <div className={`flex flex-col gap-3`}>
              {projects.map((p) => (
                <ProjectPreview key={p.id} data={p} />
              ))}
            </div>
          </div>
          <div className={`flex flex-col w-full gap-5`}>
            <div className={`flex items-end h-28 w-full text-accent-dark`}>
              <h1>About</h1>
            </div>
          </div>
        </div>

      </div>
    </main>
  )
}

