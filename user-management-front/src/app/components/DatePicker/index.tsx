'use client'

import { useState, useEffect } from 'react'
import { format, getMonth, getYear, setMonth, setYear, isAfter } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'
import { ptBR } from 'date-fns/locale'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface DatePickerProps {
  startYear?: number
  selected?: Date
  onSelect?: (date: Date | undefined) => void
}
export function DatePickerDemo({
  startYear = getYear(new Date()) - 100,
  selected,
  onSelect,
}: DatePickerProps) {
  const [date, setDate] = useState<Date | undefined>(selected)
  const currentYear = getYear(new Date())
  const currentMonth = getMonth(new Date())

  useEffect(() => {
    setDate(selected)
  }, [selected])

  const months = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ]

  const years = Array.from(
    { length: currentYear - startYear + 1 },
    (_, i) => startYear + i,
  )

  const getAvailableMonths = (selectedYear: number) => {
    return selectedYear === currentYear
      ? months.slice(0, currentMonth + 1)
      : months
  }

  const handleMonthChange = (month: string) => {
    const monthIndex = months.indexOf(month)
    const newDate = date
      ? setMonth(date, monthIndex)
      : new Date(currentYear, monthIndex, 1)
    setDate(newDate)
    onSelect?.(newDate)
  }

  const handleYearChange = (year: string) => {
    const yearNumber = parseInt(year)
    const currentMonth = date ? getMonth(date) : 0
    const adjustedMonth = Math.min(currentMonth, 11)

    const newDate = date
      ? setYear(setMonth(date, adjustedMonth), yearNumber)
      : new Date(yearNumber, adjustedMonth, 1)

    setDate(newDate)
    onSelect?.(newDate)
  }

  const handleSelect = (selectedData: Date | undefined) => {
    if (!selectedData) return

    if (isAfter(selectedData, new Date())) {
      alert('A data selecionada não pode ser maior que a data atual.')
      return
    }

    setDate(selectedData)
    onSelect?.(selectedData)
  }

  const isDateDisabled = (day: Date) => isAfter(day, new Date())

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(!date && 'text-muted-foreground')}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, 'dd/MM/yyyy') : 'Selecione uma data'}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <div className="flex justify-between p-2">
          {/* Seletor de Mês */}
          <Select
            value={date ? months[getMonth(date)] : ''}
            onValueChange={handleMonthChange}
          >
            <SelectTrigger className="w-[110px]">
              <SelectValue placeholder="Mês" />
            </SelectTrigger>
            <SelectContent>
              {getAvailableMonths(date ? getYear(date) : currentYear).map(
                (month) => (
                  <SelectItem key={month} value={month}>
                    {month}
                  </SelectItem>
                ),
              )}
            </SelectContent>
          </Select>

          <Select
            value={date ? getYear(date).toString() : currentYear.toString()}
            onValueChange={handleYearChange}
          >
            <SelectTrigger className="w-[110px]">
              <SelectValue placeholder="Ano" />
            </SelectTrigger>
            <SelectContent>
              {years.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Calendar
          mode="single"
          selected={date}
          onSelect={handleSelect}
          month={date || new Date()}
          onMonthChange={setDate}
          disabled={isDateDisabled}
          locale={ptBR}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
