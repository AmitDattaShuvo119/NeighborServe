import React from "react";

const SearchResult = ({ results }) => {
  return (


<table className="table w-full">
          
        
          <tbody>
            {results.slice(0, 10).map((result, id) => (
              <tr key={id}>
                <th>{result.user_email}</th>

                {/* <td>{user.user_fullname}</td>
                <td>{user.user_email}</td>
                <td>{user.user_phone}</td>
                <td>{user.user_location}</td>
                <td>{user.admin_approval}</td> */}
             

               
              </tr>
            ))}
          </tbody>
        </table>


  )










  //   <div className="p-12 mt-12">
  //     {results.slice(0, 10).map((result, id) => (
  //       <p key={id} className="text-black">
  //         {result.user_email}
  //       </p>
  //     ))}
  //   </div>
  // );
};

export default SearchResult;
