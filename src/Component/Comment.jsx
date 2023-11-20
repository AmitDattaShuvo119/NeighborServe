import React from "react";
import { persons } from "./profileComponent/persons";

const Comment = ({ reviewer, reviewerImg, date, review }) => {
  return (
    <div>
      <div
        style={{
          marginTop: "5%",
          display: "flex",
          marginLeft: "2%",
          alignItems: "center",
        }}
      >
        {" "}
        <img
          className="rounded-sm"
          src={reviewerImg}
          alt=""
          style={{ height: "30px", width: "30px", marginLeft: "1%" }}
        />
        <p
          style={{
            fontWeight: "bold",
            marginLeft: "1%",
            color: "black",
            marginTop: "-1.5%",
          }}
        >
          {reviewer}
        </p>
        <img
          src="vip.png"
          alt=""
          style={{
            height: "15px",
            width: "15px",
            marginLeft: "1%",
          }}
        />
        <p
          style={{
            color: "#B6B6B9",
            fontSize: "12px",
            marginLeft: "12.5%",

            
          }}
        >
          {date}
        </p>
      </div>
      <p
        style={{
          color: "#766C6C",
          fontSize: "12px",
          marginLeft: "2.5%",
        }}
      >
        {review}
      </p>
    </div>
  );
};

const CommentList = ({ userReviews }) => {
  // const filtered = persons[props.user_id - 1];

  return (
    <div>
      {userReviews.map((review) => (
        <Comment
          key={review.reviewId}
          reviewer={review.reviewer}
          reviewerImg={review.reviewerImg}
          date={review.date}
          review={review.review}
        />
      ))}
    </div>
  );
};

export default CommentList;
