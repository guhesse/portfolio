import { readFile, readdir, stat, unlink } from "node:fs/promises"
import path from "node:path"
import sharp from "sharp"

const root = path.resolve("public/images")

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  const files = []
  for (const entry of entries) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) files.push(...(await walk(full)))
    else files.push(full)
  }
  return files
}

const files = (await walk(root)).filter((file) => /\.(png|jpe?g)$/i.test(file))
let before = 0
let after = 0

for (const file of files) {
  const input = await stat(file)
  before += input.size
  const isAbout = file.includes(`${path.sep}about${path.sep}`)
  const maxWidth = isAbout ? 640 : 1100
  const out = file.replace(/\.(png|jpe?g)$/i, ".webp")
  const source = await readFile(file)

  const meta = await sharp(source, { limitInputPixels: false }).metadata()
  await sharp(source, { limitInputPixels: false })
    .rotate()
    .resize({ width: maxWidth, withoutEnlargement: true })
    .webp({ quality: 72, effort: 5 })
    .toFile(out)

  const thumb = out.replace(/\.webp$/i, "-thumb.webp")
  await sharp(out)
    .resize({ width: 240, withoutEnlargement: true })
    .webp({ quality: 60, effort: 4 })
    .toFile(thumb)

  const output = await stat(out)
  const thumbStat = await stat(thumb)
  after += output.size + thumbStat.size
  for (let attempt = 0; attempt < 5; attempt++) {
    try {
      await unlink(file)
      break
    } catch (error) {
      if (attempt === 4) throw error
      await new Promise((resolve) => setTimeout(resolve, 200 * (attempt + 1)))
    }
  }
  const from = Math.round(input.size / 1024)
  const to = Math.round(output.size / 1024)
  const thumbKb = Math.round(thumbStat.size / 1024)
  console.log(`${path.relative(root, file)} ${meta.width}x${meta.height} ${from}KB -> ${to}KB + thumb ${thumbKb}KB`)
}

console.log(`TOTAL ${Math.round(before / 1024)}KB -> ${Math.round(after / 1024)}KB`)
