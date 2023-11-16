/*
 * @Author: 叶毅 yeyi@brandnewdata.com
 * @Date: 2023-11-06 13:16:41
 * @LastEditors: 叶毅 yeyi@brandnewdata.com
 * @LastEditTime: 2023-11-16 09:48:15
 * @FilePath: /designable/formily/antd/src/schemas/Switch.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { ISchema } from '@formily/react'

export const Switch: ISchema = {
  type: 'object',
  properties: {
    autoFocus: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
    size: {
      type: 'string',
      enum: ['large', 'small', 'default', ''],
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'x-component-props': {
        defaultValue: 'default',
      },
    },
  },
}
