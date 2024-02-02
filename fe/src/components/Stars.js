import React from "react";
import "./css/stars.css";

function Stars({ rate, type }) {
  let rating = rate.reduce((a, b) => a + b, 0) / rate.length;
  const ratingStar = Array.from({ length: 5 }, (v, i) => {
    return (
      <span key={i}>
        {rating >= i + 1 ? (
          <i className="fa-solid fa-star icon"></i>
        ) : rating >= i + 0.5 ? (
          <i className="fa-solid fa-star-half-stroke icon"></i>
        ) : (
          <i className="fa-regular fa-star icon"></i>
        )}
      </span>
    );
  });

  return (
    <div className="rate-star">
      <p>
        {ratingStar}
        {type ? (
          <>
            {"    "}({rate.length} Reviews)
          </>
        ) : (
          <></>
        )}
      </p>
    </div>
  );
}

export default Stars;
