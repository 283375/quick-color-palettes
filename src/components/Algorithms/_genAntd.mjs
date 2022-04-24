import generate from './AntdAlgorithm.mjs'

const colors = [
  ['Dust Red', '#f5222d'],
  ['Volcano', '#fa541c'],
  ['Sunset Orange', '#fa8c16'],
  ['Calendula Gold', '#faad14'],
  ['Sunrise Yellow', '#fadb14'],
  ['Lime', '#a0d911'],
  ['Polar Green', '#52c41a'],
  ['Cyan', '#13c2c2'],
  ['Daybreak Blue', '#1890ff'],
  ['Geek Blue', '#2f54eb'],
  ['Golden Purple', '#722ed1'],
  ['Magenta', '#eb2f96'],
]

let outputJson = {}

for (const colorGroup of colors) {
  outputJson[colorGroup[0]] = generate({ primaryColor: colorGroup[1] }).map(
    (c, i) => ({ name: String(i + 1), color: c })
  )
}

console.log(JSON.stringify(outputJson))
