import { Version } from '@io-swap/token-list'

export default function listVersionLabel(version: Version): string {
  return `v${version.major}.${version.minor}.${version.patch}`
}
