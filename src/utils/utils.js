import { Montserrat } from 'next/font/google'

export const formatTagsString = (tags) => {
    return tags.map((tag) => tag.tagName).join(' / ');
};

export const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};

export const montserrat = Montserrat({ subsets: ['latin'] });
export const accent_color = 'hover:bg-accent-dark dark:hover:bg-accent-light';
export const content_color = 'text-dark dark:text-light';
export const text_accent = 'text-accent-dark dark:text-accent-light';
export const accent_content = 'text-dark hover:text-light dark:text-light dark:hover:text-dark';
export const border_accent = 'border-accent-dark dark:border-accent-light';

// const accent_color = 'bg-accent-dark dark:bg-accent-light';
// const content_color = 'text-dark dark:text-light';
// const text_accent = 'text-accent-dark dark:text-accent-light';
// const accent_content = 'text-light dark:text-dark';
// const border_accent = 'border-accent-dark dark:border-accent-light';