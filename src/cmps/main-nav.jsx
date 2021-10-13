import React from 'react'
import { connect } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import logo from '../assets/img/gramophone-svgrepo-com.svg'
import { eventBusService } from '../services/event-bus.service'

class _MainNav extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      links: [
        {
          id: 1,
          name: "Home",
          to: "/",
          fa: 'fa-home'
        },
        {
          id: 2,
          name: "Search",
          to: "/search",
          fa: 'fa-search'
        },
        {
          id: 3,
          name: "My Stations",
          to: "/stations",
          fa: 'fa-library'
        },
        {
          id: 4,
          name: "Liked Songs",
          to: "/station/likedTracks",
          fa: 'fa-heart'
        },
        {
          id: 5,
          name: "Friends",
          to: "/friends",
          fa: 'fa-user-friends'
        }
      ],
      activLink: 1,
      selectedStationId: null,
      isMenuOpen: false

    }

    // Methods Binding:
    // this.toggleMenu = this.toggleMenu.bind(this)

  }
  componentDidUpdate(prevProps){
    if(prevProps.stations?.length!==this.props.stations?.length){
      this.setState(prevState=>({...prevState}))
    }
  }

  handleClick = async (linkId) => {
    if (this.state.isMenuOpen)
      await this.toggleMenu(!this.state.isMenuOpen)
    this.setState({ activLink: linkId })
  }

  setSelectedStationId = (stationId) => {
    this.setState(prevState => ({ ...prevState, selectedStationId: stationId }))
  }

  toggleMenu = async (newIsMenuOpen) => {
    this.setState({ isMenuOpen: newIsMenuOpen })
  }

  render() {
    const { stations } = this.props
    const { activLink, links, selectedStationId, isMenuOpen } = this.state
    if (!links) {
      return <div>loading.</div>
    }
    return (
      <>
        {/* {isMenuOpen && <div className="screen" onClick={this.toggleMenu.bind(this, !isMenuOpen)}></div>} */}
        <div className="hamburger-wrapper">
          <div className={`hamburger ${isMenuOpen ? "active" : ""}`} onClick={this.toggleMenu.bind(this, !isMenuOpen)}>
            <div></div>
          </div>

        </div>

        <nav className={isMenuOpen ? 'main-nav active' : 'main-nav'}>

          <Link to='/Home'>
            <div className="banner">
              {/* src\assets\img */}
              <div className="logo-img-container">
                <img src={logo} alt="" />
              </div>
              <h4>Lotify
                <span>.</span>
              </h4>
            </div>
          </Link>
          <ul className="primary-nav">
            {/* {links.map(link => {
              return <li key={link.id} onClick={() => this.handleClick(link.id)} className={link.id === activLink ? 'active' : ''}> */}
            {links.map(link => {
              return <li key={link.id} onClick={this.handleClick.bind(this, link.id)} className={link.id === activLink ? 'active' : ''}>

                <NavLink to={link.to}>
                  <span className={`nav-icon fas ${link.fa}`}></span>
                  {link.name}</NavLink>
              </li>
            })}
            <li onClick={() => { eventBusService.emit("create-playlist") }} className="nav-create">
              <a>
                <span className="nav-icon fas fa-plus-square"></span>
                Create Playlist
              </a>
            </li>
          </ul>
          <ul className="stations">
            {
              stations.map(station => {
                if(station.genre!=="likedTracks")
                return <li key={station._id} onClick={() => this.setSelectedStationId(station._id)}>
                  <NavLink to={`/station/${station._id}`}
                    className={selectedStationId === station._id ? 'station-link selected-station' : 'station-link'}>
                    {station.name}
                  </NavLink></li>
              })
            }

          </ul>
        </nav>
      </>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    stations: state.stationMoudle.stations
  }
}
export const MainNav = connect(mapStateToProps)(_MainNav)