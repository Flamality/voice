import React from "react";

export default function QuestionContainer({ index, data, next, prev }) {
  return (
    <div className='question-container'>
      <p className='question-title'>{data.question}</p>
      <div className='question-options'>
        {data.type == "1" && (
          <div className='question-short'>
            <input
              type='text'
              placeholder={data.placeholder || "Your answer..."}
              className='question-short-input'
              autoFocus
            />
          </div>
        )}
        {data.type == "2" && (
          <div className='question-long'>
            <textarea
              placeholder={data.placeholder || "Your answer..."}
              className='question-long-input'
              rows='4'
              autoFocus
            />
          </div>
        )}
        {data.type == "3" && data.placeholder.length > 0 && (
          <div className='question-multiple-choice'>
            {data.placeholder.map((option, index) => (
              <div key={index} className='question-multiple-choice-option'>
                <input
                  type='radio'
                  id={`option-${index}`}
                  name='multiple-choice'
                  value={option}
                />
                <label htmlFor={`option-${index}`}>{option}</label>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className='question-navigation'>
        {prev && (
          <button className='question-prev question-nav-btn' onClick={prev}>
            Previous
          </button>
        )}
        {next && (
          <button className='question-next question-nav-btn' onClick={next}>
            Next
          </button>
        )}
      </div>
    </div>
  );
}
