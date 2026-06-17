import { RiDeleteBin5Line } from "react-icons/ri";
import Modal from "./Model"; 
import { useContext } from "react";
import { ModalContext } from "./Model"; 

export default function DeleteBtn({ resource, onConfirm }) {
  const { close } = useContext(ModalContext);

  return (
    <>
      <Modal.Open opens="delete">
        <button className="text-red-600 hover:text-red-800">
          <RiDeleteBin5Line />
        </button>
      </Modal.Open>
      <Modal.Window name="delete">
        <div className="p-4">
          <h3 className="font-bold text-lg">Delete {resource}</h3>
          <p className="my-2">
            Are you sure you want to delete this{" "}
            <span className="text-red-600 font-extrabold text-xl">{resource}</span> permanently? This action
            cannot be undone.
          </p>
          <div className="flex justify-end gap-3 mt-4">
            <button
              className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded"
              onClick={close}
            >
              Cancel
            </button>
            <button
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
              onClick={() => {
                onConfirm();
                close();
              }}
            >
              Delete
            </button>
          </div>
        </div>
      </Modal.Window>
    </>
  );
}