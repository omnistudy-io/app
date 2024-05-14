import { useContext, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/Accordion";
import * as Dialog from "@radix-ui/react-dialog";
import { motion } from "framer-motion";
import { Textarea } from "../ui/Textarea";
import { Trash, X } from "lucide-react";
import { UserStudySetQuestionSchema, UserStudySetSchema } from "@/schema";
import { Card } from "../ui/Card";
import AuthContext from "@/context/AuthContext";
import post from "@/utils/post";
import get from "@/utils/get";
import { useNavigate } from "react-router-dom";

export default function StudySetModal(props: StudySetModalProps) {
  // Hooks
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // State
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState("");

  const addQuestion = () => {
    if (!newQuestion && !newAnswer) {
      alert("Please fill out all of the fields");
      return;
    }
    setQuestions([...questions, { question: newQuestion, answer: newAnswer }]);
  };

  const removeQuestion = (index: number) => {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(index, 1);
    setQuestions(updatedQuestions);
  };

  const handleSubmit = () => {
    if (!name || !description || questions.length === 0) {
      alert(
        "Please fill out all required fields and add at least one question."
      );
      return;
    }

    const data = {
      user_id: user?.id,
      title: name,
      description: description,
      questions: questions,
    };

    console.log(data);

    post(
      (data: any) => {
        get(props.updateStudySets, "study_sets", "/users/{uid}/study-sets");
        navigate(`/study-sets/${data.id}`);
      },
      "/study-sets",
      data
    );

    props.setShow(false);
  };

  return (
    <Dialog.Root open={props.show}>
      <Dialog.Portal>
        <Dialog.Overlay
          onClick={() => props.setShow(false)}
          className="bg-[#00000090] data-[state=open]:animate-overlayShow data-[state=closed]:animate-overlayHide fixed inset-0"
        />
        <Dialog.Content className="overflow-scroll data-[state=open]:animate-contentShow data-[state=closed]:animate-contentHide fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[600px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <div className="flex justify-between items-center mb-6 px-1 pb-2 border-b border-[#34354a]">
            <Dialog.Title className=" m-0 text-[17px] font-medium">
              Create a Study Set
            </Dialog.Title>
            <button
              className="text-black hover:text-[#00adb5] transition-all duration-300 ease-in-out"
              onClick={() => props.setShow(false)}
            >
              <X />
            </button>
          </div>
          <fieldset className="flex flex-col gap-y-4">
            <div className="flex w-full gap-x-4">
              <div className="flex flex-col text-left w-full">
                <label className="text-sm ml-1">Name</label>
                <input
                  type="text"
                  className="text-sm border bg-stone-100 rounded-md outline-none focus:border-[#34354a] p-2"
                  placeholder="Web Programming Questions"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
            {/* Description field */}
            <div className="mb-2">
              <label className="text-sm ml-1">Description</label>
              <Textarea
                className="bg-[#f5f5f5] border-gray-300"
                placeholder="Be as descriptive as possible, our AI will help you with the rest!"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Add Question</AccordionTrigger>
                <AccordionContent className="flex flex-col gap-2 p-0">
                  <div className="flex flex-col gap-1">
                    <label className="text-sm ml-1">Question</label>
                    <input
                      type="text"
                      className="text-sm border bg-stone-100 rounded-md outline-none focus:border-[#34354a] p-2"
                      placeholder="What is node.js?"
                      onChange={(e) => setNewQuestion(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-sm ml-1">Answer</label>
                    <input
                      type="text"
                      className="text-sm border bg-stone-100 rounded-md outline-none focus:border-[#34354a] p-2"
                      placeholder="Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine."
                      onChange={(e) => setNewAnswer(e.target.value)}
                    />
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    className="rounded-sm border mt-2 py-1.5 px-4 hover:bg-[#00adb5] hover:text-white hover:shadow-lg transition-all duration-300 ease-in-out"
                    onClick={addQuestion}
                  >
                    Add
                  </motion.button>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            {questions.length > 0 && (
              <Card className="bg-[#f5f5f5] p-4">
                {questions.map((question, index) => (
                  <div>
                    <h4 className="text-sm mb-2">Questions</h4>
                    <div className="bg-[#fff] border p-2 rounded-md flex justify-between">
                      <p key={index} className="flex text-sm gap-4">
                        <span>{index + 1}.</span>
                        <span>{question.question}?</span>
                      </p>
                      <button onClick={() => removeQuestion(index)}>
                        <Trash size={16} color="#ef4444" />
                      </button>
                    </div>
                  </div>
                ))}
              </Card>
            )}
          </fieldset>
          <div className="mt-[25px] flex justify-end gap-x-2">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              className="py-1.5 px-4 hover:bg-[#00adb5] hover:text-white rounded-md hover:shadow-lg transition-all duration-300 ease-in-out"
              onClick={() => props.setShow(false)}
            >
              Close
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              className="py-1.5 px-4 bg-[#00adb5] text-white rounded-md"
              onClick={handleSubmit}
            >
              Create
            </motion.button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

// ---------- TYPE DEFINITIONS ---------- //

type StudySetModalProps = {
  show: boolean;
  setShow: (value: boolean) => void;
  updateStudySets: React.Dispatch<React.SetStateAction<UserStudySetSchema[]>>;
  updateStudySetQuestions: React.Dispatch<
    React.SetStateAction<UserStudySetQuestionSchema[]>
  >;
};

type Question = {
  question: string;
  answer: string;
};
