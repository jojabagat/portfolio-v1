export const hex2rgba = (hex: string, alpha: number = 1) => {
  const match = hex.match(/\w\w/g)

  if (!match || match.length < 3) {
    throw new Error('Invalid hex color format')
  }

  const [r, g, b] = match.map((x) => parseInt(x, 16))
  return `rgba(${r},${g},${b},${alpha})`
}

export const navDelay = 1000
export const loaderDelay = 2000

export const KEY_CODES = {
  ARROW_LEFT: 'ArrowLeft',
  ARROW_LEFT_IE11: 'Left',
  ARROW_RIGHT: 'ArrowRight',
  ARROW_RIGHT_IE11: 'Right',
  ARROW_UP: 'ArrowUp',
  ARROW_UP_IE11: 'Up',
  ARROW_DOWN: 'ArrowDown',
  ARROW_DOWN_IE11: 'Down',
  ESCAPE: 'Escape',
  ESCAPE_IE11: 'Esc',
  TAB: 'Tab',
  SPACE: ' ',
  SPACE_IE11: 'Spacebar',
  ENTER: 'Enter',
}
