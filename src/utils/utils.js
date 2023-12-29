
export const formatTagsString = (tags) => {
    return tags.map((tag) => tag.tagName).join(' / ');
};

export const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', { month: '2-digit', year: 'numeric' }).replace('/', ' / ');
};

