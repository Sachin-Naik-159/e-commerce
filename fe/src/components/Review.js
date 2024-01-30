import React from "react";
import Stars from "./Stars";

function Review({ data }) {
  return (
    <>
      {data.map((r) => {
        return (
          <div className="ml-2 mr-2 pt-1 pb-1 shadow rounded" key={r._id}>
            <b>{r.ratedBy.username}</b>
            <Stars rate={[r.rate]} type={false} />
            <small className="text-muted">
              {` ${new Date(r.createdAt)}`.substring(4, 16)}
            </small>
            <p className="mt-3">{r.comment}</p>
          </div>
        );
      })}
    </>
  );
}

export default Review;
