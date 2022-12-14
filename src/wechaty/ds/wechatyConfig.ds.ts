export interface IWechatyConfigDomain {
  contacts: string[]
  groups: string[]
}

export interface IWechatyConfigMenuItem {
  name: string
  keys: string[]
  input?: string[]
  output?: string
  todo?: string
  domain?: IWechatyConfigDomain
}

export interface IWechatyConfig {
  menu: {
    regex: string
    domain: IWechatyConfigDomain
    subscribes: IWechatyConfigMenuItem[]
  }
}

export interface ISubscribeFromKey {
  name: string
  groups: string[]
  contacts: string[]
}