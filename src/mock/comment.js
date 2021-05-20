import {generateRandom} from '../utils/comon';
import {generateDate} from '../utils/date';

const COMMENT_EMOJI = [
  'images/emoji/smile.png',
  'images/emoji/angry.png',
  'images/emoji/puke.png',
];

const COMMENT_TEXT = [
  'new text comment',
  'bad film',
  'good film',
];

const COMMENT_AUTHOR = [
  'Carl',
  'Norman',
  'Flin',
];

let commentId = 0;

export const generateComment = () => {

  return {
    id: commentId++,
    emoji: generateRandom(COMMENT_EMOJI),
    text: generateRandom(COMMENT_TEXT),
    author: generateRandom(COMMENT_AUTHOR),
    date: generateDate(),
  };
};
