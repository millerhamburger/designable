import { ICustomEvent } from '@oxygen/designable-shared'
import { AbstractHistoryEvent } from './AbstractHistoryEvent'

export class HistoryRedoEvent
  extends AbstractHistoryEvent
  implements ICustomEvent
{
  type = 'history:redo'
}
