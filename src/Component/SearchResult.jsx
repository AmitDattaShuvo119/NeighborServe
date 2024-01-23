import React from "react";

const SearchResult = ({ results }) => {
  return (
    <div className="p-12 mt-12">
      {results.slice(0, 10).map((result, id) => (
        <p key={id} className="text-black">
          {result.user_email}
        </p>
      ))}
    </div>
  );
};

export default SearchResult;
