import { Link } from 'react-router-dom'
import { ReactComponent as CogIcon } from '../icons/cog.svg'
export const DropdownMenu = () => {

  const DropdownItem = (props) => {
    return (
      <Link className="menu-item">
        {/* <span className="icon-button">{props.leftIcon}</span> */}
        {props.children}
        {/* <span className="icon-button">{props.rightIcon}</span> */}
      </Link>
    )
  }

  return (
    <div className="dropdown">
      <DropdownItem>my profile</DropdownItem>
      {/* <DropdownItem leftIcon={<CogIcon />} /> */}

    </div>
  )
}