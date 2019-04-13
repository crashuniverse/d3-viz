window.onload = init;

function init() {
  d3.json('./data/javascript.json')
    .then(data => consume(data))
}

function consume(data) {
  const width = window.innerWidth * 0.9
  const height = window.innerHeight * 0.9

  const g = d3.select('svg')
    .attr('width', width)
    .attr('height', height)
    .select('g')
    .attr('transform', 'translate(20, 20)')

  const layout = d3.tree()
    .size([height- 80, width - 240])
  const root = d3.hierarchy(data)
  const nodes = root.descendants()
  console.log(nodes)
  const links = layout(root).links()

  g.selectAll('path')
    .data(links)
    .enter()
    .append('path')
    .attr('d', d3.linkHorizontal()
      .x(d => d.y)
      .y(d => d.x)
    )

  g.append('g')
    .attr('class', 'nodes')
    .selectAll('circle')
    .data(nodes)
    .enter()
    .append('circle')
    .attr('r', 10)
    .attr('transform', d => `translate(${d.y}, ${d.x})`)

  g.append('g')
    .attr('class', 'labels')
    .selectAll('text')
    .data(nodes)
    .enter()
    .append('text')
    .attr('dx', 12)
    .attr('dy', '1em')
    .attr('transform', d => `translate(${d.y}, ${d.x})`)
    .text(d => d.data.name)

}