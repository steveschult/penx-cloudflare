export enum AuthType {
  GOOGLE = 'GOOGLE',
  REOWN = 'REOWN',
  RAINBOW_KIT = 'RAINBOW_KIT',
  PRIVY = 'PRIVY',
}

export enum StorageProvider {
  IPFS = 'IPFS',
  R2 = 'R2',
  VERCEL_BLOB = 'VERCEL_BLOB',
  SUPABASE_STORAGE = 'SUPABASE_STORAGE',
}

export enum SiteMode {
  BASIC = 'BASIC',
  NOTE_TAKING = 'NOTE_TAKING',
}

export enum UserRole {
  ADMIN = 'ADMIN',
  AUTHOR = 'AUTHOR',
  READER = 'READER',
}

export enum PostType {
  ARTICLE = 'ARTICLE',
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO',
  AUDIO = 'AUDIO',
  NFT = 'NFT',
  FIGMA = 'FIGMA',
  NOTE = 'NOTE',
}

export enum GateType {
  FREE = 'FREE',
  PAID = 'PAID',
  MEMBER_ONLY = 'MEMBER_ONLY',
}

export enum PostStatus {
  PUBLISHED = 'PUBLISHED',
  DRAFT = 'DRAFT',
  ARCHIVED = 'ARCHIVED',
}

export enum CommentStatus {
  OPEN = 'OPEN',
  CLOSED = 'CLOSED',
}

export enum ProviderType {
  GOOGLE = 'GOOGLE',
  GITHUB = 'GITHUB',
  WALLET = 'WALLET',
  FARCASTER = 'FARCASTER',
}
