import fs from 'node:fs'
import path from 'node:path'
import { parse } from 'smol-toml'

export default {
  paths() {
    const file = path.resolve(process.cwd(), 'docs/data/titles.toml')
    const { titles = [] } = parse(fs.readFileSync(file, 'utf8'))

    return titles
      .filter(title => title.title_id)
      .map(title => ({
        params: {
          titleId: title.title_id
        }
      }))
  }
}
