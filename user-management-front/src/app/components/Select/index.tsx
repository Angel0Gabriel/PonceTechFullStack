import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import type { SelectProps } from '@radix-ui/react-select'

interface SelectDemoProps {
  data: {
    label: string
    value: string
  }[]
  placeholder?: string
}

export function SelectDemo({
  value,
  onValueChange,
  data,
  placeholder,
  ...props
}: SelectDemoProps & SelectProps) {
  return (
    <Select value={value} onValueChange={onValueChange} {...props}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {data.map(({ label, value }) => {
            return (
              <SelectItem
                key={value}
                className="hover:bg-gray-200"
                value={value}
              >
                {label}
              </SelectItem>
            )
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
