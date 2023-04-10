export const highLight = (props) => {
  const { filter, str } = props
  if (!filter) return str
  const regexp = new RegExp(filter, 'ig')
  const matchValue = str.match(regexp)

  if (matchValue) {
    // console.log('matchValue', matchValue)
    // console.log('str.split(regexp)', str.split(regexp))

    return str.split(regexp).map((s, index, array) => {
      if (index < array.length - 1) {
        const c = matchValue.shift()
        return `${s}<span class="highlight">${c}</span>`
      }
      return s
    }).join('');
  }
  return str
}

export function convertNewLinesToBr(str) {
  return str ? str.replace(/(?:\r\n|\r|\n)/g, '<br/></br>') : str;
}

export const createMarkup = (content) => {
  const data = {__html: content};
  return data;
}

// export const convertUrlToLink = (str) => {
//   const re = /\*([^)]+)\*/g;
//   const matchValue = str.match(re).map(item => item.slice(1, -1));
//   const html = str.replace(re, '*');
//   console.log(html);
// }

export const convertUrlToLink = (str) => {
  let urlRegex = /\*(https?:\/\/[^\s]+)\*/g;
  let replacedText = str.replace(urlRegex, '<a href="$1" target="_blank">$1</a>');

  return replacedText;
}
// \(\**.*\*\)