const generateEmptyColumn = (x: number) => {
    const isLong = ((x+1)%2) != 0;
    const tiles =  Array.from({ length: isLong ? 6 : 7 }).map((_,y) => ({ 
        x,
        y, 
        letter: ' ',
        selected: false
    }))
    return {tiles};
}
const generateEmptyBoard = () => {
    const columns = Array.from({ length: 5 }).map((_,x) => generateEmptyColumn(x))
    return {columns}
};

export const _EMPTY_BOARD = generateEmptyBoard();

export const EMPTY_BOARD = {
  columns: [
      {
          tiles: [
              {
                  x: 0,
                  y: 0,
                  letter: " ",
 selected: false              },
              {
                  x: 0,
                  y: 1,
                  letter: "L",
 selected: false              },
              {
                  x: 0,
                  y: 2,
                  letter: " ",
 selected: false              },
              {
                  x: 0,
                  y: 3,
                  letter: " ",
 selected: false              },
              {
                  x: 0,
                  y: 4,
                  letter: " ",
 selected: false              },
              {
                  x: 0,
                  y: 5,
                  letter: " ",
 selected: false              }
          ]
      },
      {
          tiles: [
              {
                  x: 1,
                  y: 0,
                  letter: " ",
 selected: false              },
              {
                  x: 1,
                  y: 1,
                  letter: " ",
 selected: false              },
              {
                  x: 1,
                  y: 2,
                  letter: " ",
 selected: false              },
              {
                  x: 1,
                  y: 3,
                  letter: " ",
 selected: false              },
              {
                  x: 1,
                  y: 4,
                  letter: " ",
 selected: false              },
              {
                  x: 1,
                  y: 5,
                  letter: " ",
 selected: false              },
              {
                  x: 1,
                  y: 6,
                  letter: " ",
 selected: false              }
          ]
      },
      {
          tiles: [
              {
                  x: 2,
                  y: 0,
                  letter: " ",
 selected: false              },
              {
                  x: 2,
                  y: 1,
                  letter: " ",
 selected: false              },
              {
                  x: 2,
                  y: 2,
                  letter: " ",
 selected: false              },
              {
                  x: 2,
                  y: 3,
                  letter: " ",
 selected: false              },
              {
                  x: 2,
                  y: 4,
                  letter: " ",
 selected: false              },
              {
                  x: 2,
                  y: 5,
                  letter: " ",
 selected: false              }
          ]
      },
      {
          tiles: [
              {
                  x: 3,
                  y: 0,
                  letter: " ",
 selected: false              },
              {
                  x: 3,
                  y: 1,
                  letter: " ",
 selected: false              },
              {
                  x: 3,
                  y: 2,
                  letter: " ",
 selected: false              },
              {
                  x: 3,
                  y: 3,
                  letter: " ",
 selected: false              },
              {
                  x: 3,
                  y: 4,
                  letter: " ",
 selected: false              },
              {
                  x: 3,
                  y: 5,
                  letter: " ",
 selected: false              },
              {
                  x: 3,
                  y: 6,
                  letter: " ",
 selected: false              }
          ]
      },
      {
          tiles: [
              {
                  x: 4,
                  y: 0,
                  letter: " ",
 selected: false              },
              {
                  x: 4,
                  y: 1,
                  letter: " ",
 selected: false              },
              {
                  x: 4,
                  y: 2,
                  letter: " ",
 selected: false              },
              {
                  x: 4,
                  y: 3,
                  letter: " ",
 selected: false              },
              {
                  x: 4,
                  y: 4,
                  letter: " ",
 selected: false              },
              {
                  x: 4,
                  y: 5,
                  letter: " ",
 selected: false              }
          ]
      }
  ]
}