import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const listHtml = (dir: string): string[] =>
  readdirSync(dir).flatMap((name) => {
    const path = join(dir, name)
    if (statSync(path).isDirectory()) return listHtml(path)
    return name.endsWith('.html') ? [path] : []
  })

const resolves = (distDir: string, href: string): boolean => {
  const path = decodeURI(href.split(/[?#]/)[0] ?? '')
  if (path === '' || path === '/') return existsSync(join(distDir, 'index.html'))
  const target = join(distDir, path)
  return existsSync(path.endsWith('/') ? join(target, 'index.html') : target)
}

export const checkDistLinks = (distDir: string): string[] =>
  listHtml(distDir).flatMap((file) => {
    const html = readFileSync(file, 'utf8')
    const page = `/${relative(distDir, file)}`
    return [...html.matchAll(/\s(?:href|src)="(\/[^"]*)"/g)]
      .map((match) => match[1] ?? '')
      .filter((href) => !href.startsWith('//') && !resolves(distDir, href))
      .map((href) => `${page} -> ${href}`)
  })

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const broken = checkDistLinks(process.argv[2] ?? 'dist')
  if (broken.length) {
    console.error(`Broken internal links:\n${broken.join('\n')}`)
    process.exit(1)
  }
  console.log('All internal links resolve.')
}
