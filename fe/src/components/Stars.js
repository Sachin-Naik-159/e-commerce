import React from "react";
import "./stars.css";

function Stars(prop) {
  let rate = prop.rate.reduce((a, b) => a + b, 0) / prop.rate.length;
  const ratingStar = Array.from({ length: 5 }, (v, i) => {
    return (
      <span key={i}>
        {rate >= i + 1 ? (
          <i className="fa-solid fa-star icon"></i>
        ) : rate >= i + 0.5 ? (
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
        {"    "}({prop.rate.length} Reviews)
      </p>
    </div>
  );
}

export default Stars;
