import React from "react";
import { useState } from "react";
import data from "./data";

function Accord() {
  const [Selected, SetSelected] = useState(null);
  const [EnableMSelection, SetEnableMSelection] = useState(false);
  const [MultiSelection, SetMultiSelection] = useState([]);

  function handleSSelection(getItemID) {
    SetSelected(getItemID === Selected ? null : getItemID);
  }
  function handleMSelection(getItemID) {
    let copyMulti = [...MultiSelection];
    let findIndexOfItem = copyMulti.indexOf(getItemID);

    if(findIndexOfItem === -1){copyMulti.push(getItemID)}
    else{copyMulti.splice(findIndexOfItem,1)}

    SetMultiSelection(copyMulti)
  }

  return (
    <>
      <div className="wrapper flex flex-col items-center">
        <button
          onClick={() => {
            SetEnableMSelection(!EnableMSelection);
          }}
          className="bg-gray-800 w-fit py-3 px-6 rounded-lg cursor-pointer font-semibold mb-4 text-white"
        >
          Enable Multi Selection
        </button>
        <div className="accordion">
          {data && data.length > 0 ? (
            data.map((dataItem) => (
              <div className="item text-white w-2xl bg-amber-700 mb-4">
                <div
                  onClick={
                    EnableMSelection
                      ? () => handleMSelection(dataItem.id)
                      : () => handleSSelection(dataItem.id)
                  }
                  className="title font-semibold flex justify-between py-4 px-4 cursor-pointer">
                  <h3>{dataItem.question}</h3>
                  <span>+</span>
                </div>
                {
                    EnableMSelection ?
                    MultiSelection.indexOf(dataItem.id) !== -1 && (
                        <div className="content p-4">{dataItem.answer}</div>
                    )
                    :Selected === dataItem.id &&(
                        <div className="content p-4">{dataItem.answer}</div>
                    )
                }

              </div>
            ))
          ) : (
            <div>no data found !</div>
          )}
        </div>
      </div>
    </>
  );
}

export default Accord;
