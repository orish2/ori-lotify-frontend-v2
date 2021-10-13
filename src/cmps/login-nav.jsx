export const LoginNav = (props) => {
  return (
    <nav className="login-navbar">
      <ul className="login-navbar-nav">
        {props.children}
      </ul>
    </nav>
  )
}
