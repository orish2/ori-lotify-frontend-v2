import { useState } from "react"

export const ShowModal = (props) => {
  const [active, setActive] = useState(true)
  // setTimeout(() => {
  //   setActive(false)
  // }, 3000);
  return (
    <div className={active ? 'modal active' : 'modal'}>
      {/* <button className="close-modal-btn" onClick={() => setActive(false)}>X</button>. */}
      {props.msg}
    </div>
  )
}