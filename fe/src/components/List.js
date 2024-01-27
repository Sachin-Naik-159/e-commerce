import React from "react";
import BtnRemove from "./BtnRemove";
import BtnAddCart from "./BtnAddCart";

function List({ prod, count }) {
  let jsonObj = prod.map(JSON.stringify);
  let unqSet = new Set(jsonObj);
  let unqProdArr = Array.from(unqSet).map(JSON.parse);

  return (
    <div>
      {unqProdArr.map((e, i) => (
        <div className="row" key={i}>
          <div className="col-1">
            <BtnRemove data={e} />
          </div>
          <div className="col-2">
            {e.name}: {count[`${e.name}`]}
          </div>
          <div className="col-1">
            <BtnAddCart data={e} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default List;
