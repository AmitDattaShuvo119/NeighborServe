import React, { useState } from "react"
import { questions } from "./questions"
import SingleQuestion from "./SingleQuestion"

export default function App() {
  const [cards] = useState(questions);

  return (
      
    <>
    <h2 className="text-yellow-500 ml-12 pt-3"> S U P P O R T</h2>
        <h1 className=" text-xl lg:text-3xl font-semibold my-2 ml-12">
        FAQ
        </h1>
    <section className="max-w-xl mx-auto py-1 px-4 text-center">
    
        <section className="grid grid-cols-1 gap-4">
          
        
          {cards.map((card, faq) => (
            <SingleQuestion {...card} key={faq} />
          ))}
        </section>
      </section>
    </>
  );
}
