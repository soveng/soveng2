import { slug } from 'github-slugger';
import { marked } from 'marked';

// slugify
export const slugify = (content: string) => {
  return slug(content);
};

// markdownify
export const markdownify = async (content: string, div?: boolean) => {
  const html = await (div ? marked.parse(content) : marked.parseInline(content));
  // Add target="_blank" and rel="noopener noreferrer" to external links
  return html.replace(
    /<a href="(https?:\/\/[^"]+)"([^>]*)>/g,
    '<a href="$1"$2 target="_blank" rel="noopener noreferrer">'
  );
};

// humanize
export const humanize = (content: string) => {
  return content
    .replace(/^[\s_]+|[\s_]+$/g, '')
    .replace(/[_\s]+/g, ' ')
    .replace(/[-\s]+/g, ' ')
    .replace(/^[a-z]/, (m) => {
      return m.toUpperCase();
    });
};

// titleify
export const titleify = (content: string) => {
  const humanized = humanize(content);
  return humanized
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

// plainify
export const plainify = async (content: string) => {
  const parseMarkdown: any = await marked.parse(content);
  const filterBrackets = parseMarkdown.replace(/<\/?[^>]+(>|$)/gm, '');
  const filterSpaces = filterBrackets.replace(/[\r\n]\s*[\r\n]/gm, '');
  const stripHTML = htmlEntityDecoder(filterSpaces);
  return stripHTML;
};

// strip entities for plainify
const htmlEntityDecoder = (htmlWithEntities: string) => {
  const entityList: { [key: string]: string } = {
    '&nbsp;': ' ',
    '&lt;': '<',
    '&gt;': '>',
    '&amp;': '&',
    '&quot;': '"',
    '&#39;': "'",
  };
  const htmlWithoutEntities: string = htmlWithEntities.replace(
    /(&amp;|&lt;|&gt;|&quot;|&#39;)/g,
    (entity: string): string => {
      return entityList[entity];
    }
  );
  return htmlWithoutEntities;
};
