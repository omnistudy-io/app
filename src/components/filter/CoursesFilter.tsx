import { useState, useEffect } from "react";
import get from "@/utils/get";

import { Button } from "@/components/ui/Button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/Dropdown";

import { DropdownCheckbox } from "@/components/ui/DropdownCheckbox";
import { ChevronDownIcon } from "lucide-react";
import { CourseSchema } from "@/schema";

export default function CoursesFilter() {
    const [data, setData] = useState<{ courses: CourseSchema[] } | null>(null);
    const [selectedItems, setSelectedItems] = useState<number[]>([]);

    useEffect(() => {
        get(setData, "/users/1/courses");
    }, []);

    function handleCheckChange(item: CourseSchema) {
        if (item.id in selectedItems) {
            setSelectedItems(selectedItems.filter((id) => id !== item.id));
        } else {
            setSelectedItems([...selectedItems, item.id]);
        }
        console.log(item.id, selectedItems);
    }

    return(
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">
                    Course
                    <ChevronDownIcon className="w-5 h-5 ml-2" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                {data?.courses.map((item, i) => {
                    return (
                        <DropdownMenuCheckboxItem
                            key={i}
                            checked={item.id in selectedItems}
                            onCheckedChange={() => handleCheckChange(item)}
                        >
                            {item.subject} {item.number}: {item.title}
                        </DropdownMenuCheckboxItem>
                    )
                })}
            </DropdownMenuContent>
        </DropdownMenu>
    );  
}