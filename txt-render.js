const fs = require('fs'),
      md = require('marked');

function renderWords(words, linePrefix, linePrefixOnce = false) {
  const perLine = 79 - linePrefix.length;
  const blankPrefix = ' '.repeat(linePrefix.length);
  let otherLine = false;
  let cnt = perLine;
  let out = '';
  words.forEach(word => {
    if (cnt + word.length > perLine) {
      if (otherLine) {
        out += '\n';
      }
      out += (otherLine && linePrefixOnce) ? blankPrefix : linePrefix;
      otherLine = true;
      cnt = 0;
    }
    if (cnt > 0) {
      out += ' ';
      cnt++;
    }
    out += word;
    cnt += word.length;
  });
  return out;
}

function parseP(tokens, linePrefix) {
  let out = '';
  let words = [];
  tokens.forEach(token => {
    switch (token.type) {
      case 'text':
        // process on .raw instead since .text does unwanted html escaping
        words = words.concat(token.raw.trim().replaceAll('\n', ' ').split(' '));
        break;

      case 'escape':
        // TODO handle this being the first in the line
        words[words.length-1] = words[words.length-1] + token.text;
        break;

      case 'link':
        if (words.length == 0 && token.raw.startsWith('[')) {
          // markdown link at the beginning of the line, prepend -->
          // no line break here, it's already covered by br token
          out += '--> ' + token.text;
        } else {
          // http link or markdown link in the paragraph
          words.push(token.text)
        }
        break;

      case 'codespan':
        words.push(token.text);
        break;

      case 'em':
        words.push(token.raw);
        break;

      case 'br':
        out += renderWords(words, linePrefix) + '\n';
        words = [];
        break;

      case 'html':
        // simply don't render the tag
        break;

      case 'image':
        words.push('(Image: ' + token.text + ')');
        break;

      case 'strong':
        words.push(token.raw);
        break;

      default:
        console.log('Unknown token ' + token.type);
        break;
    }
  });
  out += renderWords(words, linePrefix);
  return out;
}

if (!fs.existsSync(process.argv[2])) {
  console.log(process.argv[2] + ' does not exist');
  process.exit();
}
const src = md.lexer(fs.readFileSync(process.argv[2]).toString());
var out = '';
src.forEach(element => {
  switch (element.type) {
    case 'heading':
      switch (element.depth) {
        case 1:
          out += '\n' + element.text + '\n' +
                 '='.repeat(element.text.length) + '\n\n';
          break;
        case 2:
          out += element.text + '\n' +
                 '-'.repeat(element.text.length) + '\n\n';
          break;
        default:
          // just treat it as normal text
          out += element.text + '\n\n';
          break;
      }
      break;

    case 'paragraph':
      out += parseP(element.tokens, '') + '\n\n';
      break;

    case 'code':
      // print it as-is
      out += element.text + '\n\n';
      break;

    case 'blockquote':
      element.tokens.forEach(token => {
        if (token.type == 'paragraph') {
          out += parseP(token.tokens, '> ');
        }
      });
      out += '\n\n'
      break;

    case 'list':
      element.items.forEach(item => {
        const words = item.text.trim().replaceAll('\n', ' ').split(' ');
        out += renderWords(words, '- ', true) + '\n';
      });
      out += '\n'
      break;

    case 'space':
      break;

    default:
      console.log('Unknown type ' + element.type);
      break;
  }
});
fs.writeFileSync(process.argv[3], out.trim());
