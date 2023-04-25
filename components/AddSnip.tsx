import React from 'react'

const AddSnip = () => {
  return (
    <div className="basis-full flex flex-col gap-3">
        <input type="text" className="w-full" placeholder='Title your snippet here...'></input>
        <textarea className="w-full" placeholder="Paste your snippet here..."></textarea>
        <textarea className="w-full" placeholder="Talk about what you learned here..."></textarea>
    </div>
  )
}

export default AddSnip