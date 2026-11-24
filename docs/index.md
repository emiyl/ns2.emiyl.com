---
layout: home
---

<script setup>
import { parse } from 'smol-toml'
import titlesToml from './data/titles.toml?raw'

const titlesData = parse(titlesToml).titles ?? []

function compareVersions(a, b) {
  const aParts = a.replace(/[^\d.]/g, '').split('.').map(Number)
  const bParts = b.replace(/[^\d.]/g, '').split('.').map(Number)
  const length = Math.max(aParts.length, bParts.length)

  for (let i = 0; i < length; i++) {
    const difference = (aParts[i] ?? 0) - (bParts[i] ?? 0)
    if (difference !== 0) return difference
  }
  return 0
}

const titles = titlesData
  .filter(title => title.title_id)
  .map(title => {
    const versions = title.updates ?? []
    const earliest = versions.reduce((current, update) =>
      !current || compareVersions(update.version, current.version) < 0
        ? update
        : current,
      null
    )
    const latest = versions.reduce((current, update) =>
      !current || compareVersions(update.version, current.version) > 0
        ? update
        : current,
      null
    )

    return {
      ...title,
      earliestFirmware: earliest?.required_firmware ?? '',
      latestFirmware: latest?.required_firmware ?? ''
    }
  })
  .filter(title => title.earliestFirmware || title.latestFirmware)
  .sort((a, b) => a.name.localeCompare(b.name))
</script>

# Nintendo Switch 2 title firmware table

<table>
  <thead>
    <tr>
      <th>Title</th>
      <th>Title ID</th>
      <th>Earliest update firmware</th>
      <th>Latest update firmware</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="title in titles" :key="title.title_id">
      <td>
        <a :href="`/titles/${title.title_id}`">{{ title.name }}</a>
      </td>
      <td>{{ title.title_id }}</td>
      <td>{{ title.earliestFirmware || 'Unknown' }}</td>
      <td>{{ title.latestFirmware || 'Unknown' }}</td>
    </tr>
  </tbody>
</table>

