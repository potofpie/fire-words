import { Position, PopoverStylesObj } from '@reactour/popover';


export default [
  {
    selector: '#root',
    content: `Welcome to Fire Words!`
  },
  {
    selector: '[data-tut="0, 0"]',
    content: `Tap or click the letter tiles!`,
  },
  {
    selector: '[data-tut="leters_selected"]',
    content: `The letters selected will appear here! Use the red X to clear the selected characters here!`
  },
  {
    selector: '#root',
    content: `Lets make a word!`,
    position: [ 20, 20] as Position
  },
  {
    selector: '[data-tut="submit"]',
    content: `Submit your word!`,

  }
];
