import { Operation } from '@oxygen/designable-core'
import { onFieldInputValueChange } from '@formily/core'
import { globalThisPolyfill } from '@oxygen/designable-shared'

let timeRequest = 0

export const useSnapshot = (operation: Operation) => {
  onFieldInputValueChange('*', () => {
    clearTimeout(timeRequest)
    timeRequest = globalThisPolyfill.setTimeout(() => {
      operation.snapshot('update:node:props')
    }, 1000)
  })
}
