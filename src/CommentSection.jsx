import React from "react";
import Comment from "./Component/Comment";
import { user } from "./user";

function CommentSection() {
  const x1 = user[0];
  return (
    <section>
      {x1.reviews.map((review, reviewIndex) => {
        console.log("Hello world");
        if (reviewIndex < 3) {
          return <Comment {...review} key={reviewIndex} />;
        }
      })}
    </section>
  );
}
export default CommentSection;
