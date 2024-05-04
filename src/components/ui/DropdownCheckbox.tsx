"use client"

import * as React from "react"
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu"

import { Button } from "@/components/ui/Button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/Dropdown";

import { ChevronDownIcon } from "lucide-react";

type Checked = DropdownMenuCheckboxItemProps["checked"]

type DropdownCheckboxProps = {
  title: string;
  items: any[] | null;
  itemTitleField: string;
}

export function DropdownCheckbox(props: DropdownCheckboxProps) {
  const [showStatusBar, setShowStatusBar] = React.useState<Checked>(true)
  const [showActivityBar, setShowActivityBar] = React.useState<Checked>(false)
  const [showPanel, setShowPanel] = React.useState<Checked>(false)

  console.log("PROPS:");
  console.log(props);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          {props.title}
          <ChevronDownIcon className="w-5 h-5 ml-2" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{props.title}</DropdownMenuLabel>
        <DropdownMenuSeparator />

        {props.items?.map((item, i) => {
          return (
            <DropdownMenuCheckboxItem
              key={i}
              checked={false}
              // onCheckedChange={false}
            >
              {item.title}
            </DropdownMenuCheckboxItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
