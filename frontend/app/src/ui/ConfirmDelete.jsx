// ConfirmDelete.js
import React from "react";
import styled from "styled-components";


const StyledConfirmDelete = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  background-color: rgb(238, 238, 238, 0.8);
  border-radius: 20px;
  padding: 20px;
  z-index: 1;

  & p {
    color: black;
    margin-bottom: 1.2rem;
  }

  & div {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

function ConfirmDelete({ resource, onConfirm, disabled, onCloseModal }) {
  return (
    <StyledConfirmDelete>
      <h3 type="h3">Delete {resource}</h3>
      <p>
        Are you sure you want to delete this {resource} permanently? This action
        cannot be undone.
      </p>

      <div>
        <button className="bg-sky-400 p-2 rounded-md text-white text-sm hover:bg-sky-600" onClick={onCloseModal}>
          Cancel
        </button>
        <button
          className="bg-red-400 p-2 rounded-md text-white text-sm hover:bg-red-600"
          onClick={onConfirm}
          disabled={disabled}
        >
          Delete
        </button>
      </div>
    </StyledConfirmDelete>
  );
}

export default ConfirmDelete;


