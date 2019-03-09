import dotenv from 'dotenv'
dotenv.config()

const world = process.env.NAME || 'World'

export function hello(word: string = world): string {
  return `Hello, ${word}!`
}

console.log(hello(), 'Do not forget to rename the package!')
