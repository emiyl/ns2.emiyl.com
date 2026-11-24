---
layout: doc
---

<script setup>
import { useData } from 'vitepress'
import { parse } from 'smol-toml'
import titlesToml from '../data/titles.toml?raw'

const { params } = useData()
const title = parse(titlesToml).titles.find(
  item => item.title_id === params.value.titleId
)
const updates = (title?.updates ?? [])
  .slice()
  .sort((a, b) => b.version.localeCompare(a.version, undefined, {
    numeric: true,
    sensitivity: 'base'
  }))
</script>

# {{ title?.name ?? 'Title' }} updates

<table>
  <thead>
    <tr>
      <th>Version</th>
      <th>Required firmware</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="update in updates" :key="update.version">
      <td>{{ update.version }}</td>
      <td>{{ update.required_firmware }}</td>
    </tr>
  </tbody>
</table>

[Back to all titles](/)
