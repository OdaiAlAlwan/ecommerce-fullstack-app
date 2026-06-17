import React from "react";
import Modal from "../ui/Model"
import Filter from "./Filter";
import PriceRange from "./PriceRange";

export default function ContinerFilter() {
  return (
    <div className="container px-2 py-3">
      <div className="hidden lg:visible lg:flex flex-col px-2 py-3 ">
        <Modal>
          <Modal.Open opens="Filter">
            <button className="bg-blue-500 text-white p-2 " >F i l t e r</button>
          </Modal.Open>
          <Modal.Window name="Filter">
          <Filter />
          <PriceRange />
          </Modal.Window>
        </Modal>
      </div>
      <div className="lg:hidden flex flex-col px-2 py-3 ">
      <Filter />
      <PriceRange />
      </div>
    </div>
  );
}
