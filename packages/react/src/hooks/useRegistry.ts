import { GlobalRegistry, IDesignerRegistry } from '@oxygen/designable-core'
import { globalThisPolyfill } from '@oxygen/designable-shared'

export const useRegistry = (): IDesignerRegistry => {
  return globalThisPolyfill['__DESIGNER_REGISTRY__'] || GlobalRegistry
}
