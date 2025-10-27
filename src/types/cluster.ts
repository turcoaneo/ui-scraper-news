export interface Article {
  title: string
  url: string
  site: string
}

export interface Cluster {
  summary: string
  score: number
  sites: string[]
  articles: Article[]
}

export interface ClusterResponse {
  clusters: Cluster[]
  timestamp: string
  delta?: string
}
