import JoditEditor from "jodit-react";
import React, { useRef } from "react";

const BodyEditor = ({ content, setContent, label }) => {
  const editor = useRef(null);
  return (
    <div className='mb-5'>
      <div className='pb-2'>{label}</div>
      <JoditEditor
        ref={editor}
        value={content}
        tabIndex={1}
        onBlur={(newContent) => setContent(newContent)}
        onChange={(newContent) => setContent(newContent)}
      />
    </div>
  );
};

export default BodyEditor;
