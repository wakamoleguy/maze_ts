const world = 'World'

export function hello(word: string = world): string {
  return `Hello, ${word}!`
}

console.log(hello(), 'Do not forget to rename the package!')
