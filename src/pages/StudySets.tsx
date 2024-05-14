import { useState, useEffect } from "react";
import { DashboardContainer } from "@/components/ui/DashboardContainer";
import { NotebookIcon as StudySetsIcon } from "lucide-react";

import SearchBar from "@/components/filter/SearchBar";
import CoursesFilter from "@/components/filter/CoursesFilter";
import { DropdownCheckbox } from "@/components/ui/DropdownCheckbox";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/Table";
import { UserStudySetSchema } from "@/schema";
import { UserStudySetQuestionSchema } from "@/schema";

import get from "@/utils/get";
import StudySetModal from "@/components/modals/StudySetModal";

export default function StudySets() {
  const [showForm, setShowForm] = useState(false);
  const [sets, setSets] = useState<UserStudySetSchema[]>([]);
  const [questions, setQuestions] = useState<UserStudySetQuestionSchema[]>([]);
  const [filterSets, setFilterSets] = useState<UserStudySetSchema[]>([]);

  console.log(sets);

  useEffect(() => {
    get(setSets, "studySets", "/users/{uid}/study-sets");
    get(setFilterSets, "studySets", "/users/{uid}/study-sets");
  }, []);

  return (
    <DashboardContainer
      subHeader={"Study Sets"}
      header="Study Sets"
      headerIcon={<StudySetsIcon />}
      callToAction={() => {
        setShowForm(!showForm);
      }}
      callToActionText="Create New"
      dropdown={false}
    >
      <StudySetModal
        show={showForm}
        setShow={setShowForm}
        updateStudySets={setSets}
        updateStudySetQuestions={setQuestions}
      />
      <div className="flex items-center gap-x-2">
        <SearchBar
          data={sets}
          setData={setFilterSets}
          fields={["title", "description"]}
        />

        {/* <CoursesFilter/> */}
      </div>

      {/* Study sets table */}
      <div className="py-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="">Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Questions</TableHead>
              <TableHead className="text-right">Created</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sets &&
              filterSets.map((set, i) => {
                return (
                  <TableRow
                    className="cursor-pointer"
                    onClick={() =>
                      (window.location.href = `/study-sets/${set.id}`)
                    }
                  >
                    <TableCell>{set.title}</TableCell>
                    <TableCell>{set.description}</TableCell>
                    <TableCell>{set.num_questions}</TableCell>
                    <TableCell className="text-right">
                      {new Date(set.created_at).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </div>
    </DashboardContainer>
  );
}
