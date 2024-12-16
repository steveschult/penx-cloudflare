import React, { forwardRef } from 'react'
import { matchNumber } from '@/lib/utils'
import { Input } from '@/components/ui/input'

export interface NumberInputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'onChange' | 'size'
  > {
  precision?: number
  onChange?: (value: string) => void
}

export const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
  function NumberInput({ onChange, precision = 6, ...rest }, ref) {
    return (
      <Input
        ref={ref}
        placeholder="0.0"
        {...rest}
        onChange={(e) => {
          let value = e.target.value
          if ((e.nativeEvent as any)?.data === '。') {
            value = value.replace('。', '.')
          }

          if (!matchNumber(value, precision) && value.length) {
            if (/^\.\d+$/.test(value)) {
              onChange?.('0' + value)
              e.preventDefault()
            }

            return
          }

          onChange?.(value)
        }}
      />
    )
  },
)
