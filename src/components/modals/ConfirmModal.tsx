import { ReactNode } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { XIcon } from "lucide-react";

export default function ConfirmModal(props: ConfirmModalProps) {
    return(
        <Dialog.Root open={props.show}>
            <Dialog.Portal>
                <Dialog.Overlay
                    onClick={() => {
                        props.setShow(false);
                    }}
                    className="bg-[#00000090] data-[state=open]:animate-overlayShow data-[state=closed]:animate-overlayHide fixed inset-0"
                />
                <Dialog.Content className="data-[state=open]:animate-contentShow data-[state=closed]:animate-contentHide fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[600px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                    <div className="flex flex-col items-center">
                        {/* Header, title and X button */}
                        <div className="w-full flex flex-row border-b border-stone-200 px-4 py-3">
                            <div className="mr-auto">
                                <h1 className="text-lg text-stone-600">{props.title}</h1>
                            </div>
                            <XIcon className="text-stone-600 cursor-pointer hover:text-red-500 transition-all duration-200" onClick={() => props.setShow(false)}></XIcon>
                        </div>

                        {/* Message container */}
                        <div className="w-full py-6 px-4 flex flex-row gap-x-4">
                            {props.messageIcon}
                            <div>
                                <h1 className="text-lg text-stone-500">{props.message}</h1>
                            </div>
                        </div>

                        {/* Confirm and cancel buttons */}
                        <div className="w-full flex flex-row justify-end border-t border-stone-200 px-4 py-3">
                            <button
                                onClick={() => props.setShow(false)}
                                className="py-1 px-4 text-md rounded-md bg-stone-400 hover:bg-[#f44336] transition-all duration-200 text-white shadow-lg mr-4"
                                >Cancel</button>
                            <button
                                onClick={() => {
                                    props.setShow(false);
                                    props.confirmCallback();
                                }}
                                className="py-1 px-4 text-md rounded-md bg-[#00adb5] text-white shadow-lg"
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}

// Props
type ConfirmModalProps = {
    title: string;
    message: string | ReactNode;
    messageIcon?: ReactNode;
    show: boolean;
    setShow: (show: boolean) => void;
    confirmCallback: () => void;
}