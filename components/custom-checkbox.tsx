/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import * as React from "react"
import { Check } from 'lucide-react'
import { cn } from "@/lib/utils"

interface CustomCheckboxProps {
  id: string
  label: string
  description?: string
  checked: boolean
  onChangeAction: () => void
  className?: string
}

export function CustomCheckbox({
  id,
  label,
  description,
  checked,
  onChangeAction,
  className,
}: CustomCheckboxProps) {
  return (
    <div
      className={cn(
        "flex items-start space-x-2 p-3 rounded-md border transition-colors cursor-pointer",
        checked ? "border-primary/50 bg-primary/5" : "border-border hover:border-primary/30 hover:bg-muted/30",
        className
      )}
      onClick={onChangeAction}
    >
      <div className="relative flex h-5 w-5 shrink-0 items-center justify-center rounded-sm border border-primary shadow-sm mt-0.5">
        {checked && (
          <Check className="h-4 w-4 text-primary" />
        )}
      </div>
      <div className="space-y-1">
        <p className="text-base font-medium leading-none">{label}</p>
        {description && <p className="text-xs text-muted-foreground">{description}</p>}
      </div>
    </div>
  )
}
