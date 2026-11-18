export const repositoryApiUrl =
  'https://api.github.com/repos/Akshay-Morwal2612/Data-Structures-concepts-code/contents/DS?ref=main'

export const supportedSourceFile = /\.(py|c|h|cpp|cc|java|js|ts|go|rs|cs|php|rb|swift)$/i

export const programCategories = [
  {
    id: 'arrays',
    name: 'Arrays',
    description: 'Browse array programs from the code repository.',
    cardDescription: 'Insert, delete, search, sort and more...',
    icon: '♙',
    colorClass: 'blue-bg',
  },
  {
    id: 'linked-list',
    name: 'Linked List',
    description: 'Browse linked list programs from the code repository.',
    cardDescription: 'Create, Insert, Delete,Traverse and more...',
    icon: '↗',
    colorClass: 'green-bg',
  },
  {
    id: 'stack',
    name: 'Stack',
    description: 'Browse stack programs from the code repository.',
    cardDescription: 'Push, Pop, Peek and more...',
    icon: '▤',
    colorClass: 'purple-bg',
  },
  {
    id: 'queue',
    name: 'Queue',
    description: 'Browse queue programs from the code repository.',
    cardDescription: 'Enqueue, Dequeue, Peek and more...',
    icon: '⇄',
    colorClass: 'orange-bg',
  },
  {
    id: 'trees',
    name: 'Trees',
    description: 'Browse tree programs from the code repository.',
    cardDescription: 'Insert, Delete, Traverse and more...',
    icon: '🌳',
    colorClass: 'teal-bg',
  },
  {
    id: 'searching',
    name: 'Searching',
    description: 'Browse searching programs from the code repository.',
    cardDescription: 'Linear Search, Binary Search and more...',
    icon: '🔍',
    colorClass: 'red-bg',
  },
  {
    id: 'sorting',
    name: 'Sorting',
    description: 'Browse sorting programs from the code repository.',
    cardDescription: 'Bubble Sort, Selection Sort, Insertion Sort and more...',
    icon: '↕',
    colorClass: 'yellow-bg',
  },
  {
    id: 'graph',
    name: 'Graph',
    description: 'Browse graph programs from the code repository.',
    cardDescription: 'DFS, BFS and more...',
    icon: '⛓',
    colorClass: 'purple-bg',
  },
]

const categoryRules = [
  { id: 'linked-list', pattern: /linked.?list/i },
  { id: 'queue', pattern: /circular.?queue|queue|deque/i },
  { id: 'stack', pattern: /stack/i },
  { id: 'arrays', pattern: /array/i },
  { id: 'searching', pattern: /search/i },
  { id: 'sorting', pattern: /sort/i },
  { id: 'trees', pattern: /tree|bst/i },
  { id: 'graph', pattern: /graph|bfs|dfs|topological/i },
]

export const getProgramCategoryId = (fileName) =>
  categoryRules.find(({ pattern }) => pattern.test(fileName))?.id ?? null

export const getProgramLanguage = (fileName) => {
  const extension = fileName.split('.').pop()?.toLowerCase() ?? ''
  const languages = {
    py: 'Python',
    c: 'C',
    h: 'C',
    cpp: 'C++',
    cc: 'C++',
    java: 'Java',
    js: 'JavaScript',
    ts: 'TypeScript',
    go: 'Go',
    rs: 'Rust',
    cs: 'C#',
    php: 'PHP',
    rb: 'Ruby',
    swift: 'Swift',
  }

  return languages[extension] ?? extension.toUpperCase()
}
