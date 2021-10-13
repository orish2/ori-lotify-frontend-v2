import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import { MainLayout } from '../cmps/layout/MainLayout.jsx';
import { setUserPref, loadUser } from '../store/user.actions'
import { userService } from '../services/user.service.js';
import logo from '../assets/img/gramophone.png'



class _UserPref extends Component {
    state = {
        artists: [{ artist: 'ed sheeran', img: 'https://yt3.ggpht.com/2uiMtw7drxpcP4J7s61C0x1cK_fdX0Fp_RJ9t9l-RVnal24xyqSLPhIkWYN2I8QneubJAA8J_Fo=s800-c-k-c0xffffffff-no-rj-mo' },
        { artist: 'billie eilish', img: 'https://yt3.ggpht.com/ytc/AKedOLTAirqzFYUbcrpr8K0Bh8iDCZvBopbEb3K9klVNBA=s800-c-k-c0xffffffff-no-rj-mo' }
        ]
    }

    componentDidMount() {
        this.props.loadUser()
    }


    selectArtist = ({ target }, artist) => {
        if (target.parentElement.classList.contains('selected')) return
        target.parentElement.classList.add('selected')
        const img = target.parentElement.children[0].src;
        this.setState((prevState) => ({ artists: [...prevState.artists, { artist, img }] }), () => {
            if (this.state.artists.length >= 6) {
                this.props.setUserPref([...this.state.artists, { artist, img }])
            }
        })
        // this.props.loadUser()
    }


    render() {
        const { stations, user } = this.props
        if (!stations || !user) return <h1>loading...</h1>
        if (user.userPref?.length >= 5) {
            return <Redirect to='/home' />
        }
        return (
            <div className="user-pref">
                <header>
                    <h1>Choose at least 4 of your favorite artists</h1>
                    <p>Improve your experience</p>
                </header>
                <MainLayout>
                    <div className="artists">
                        <div className="circle-container" onClick={(ev) => this.selectArtist(ev, 'kaleo')}>
                            <img src="https://yt3.ggpht.com/ytc/AKedOLRrZSbWTyBAENocILL6FsPxL0FcSRdA0XNnDExc8A=s800-c-k-c0xffffffff-no-rj-mo" alt="" onError={(e) => { e.target.onerror = null; e.target.src = logo }} />
                            <h3>Kaleo</h3>

                        </div>
                        <div className="circle-container" onClick={(ev) => this.selectArtist(ev, 'donald glover')}>
                            <img src="https://yt3.ggpht.com/ytc/AKedOLR54qbXPUrgKCf0tmiquuqTiYDElO_Cekw-pSCs_g=s800-c-k-c0xffffffff-no-rj-mo" alt="" onError={(e) => { e.target.onerror = null; e.target.src = logo }} />
                            <h3>Donald Glover</h3>

                        </div>
                        <div className="circle-container" onClick={(ev) => this.selectArtist(ev, 'sia')}>
                            <img src="https://yt3.ggpht.com/0xb0rVHF2QHhnmQA5xKQiqPPPuq0gQbHkM8zCvR4vEpvWDNhSSJYUuGXmWZHAjNHJYebQim2=s800-c-k-c0xffffffff-no-rj-mo" alt="" onError={(e) => { e.target.onerror = null; e.target.src = logo }} />
                            <h3>Sia</h3>

                        </div>
                        <div className="circle-container" onClick={(ev) => this.selectArtist(ev, 'justin bieber')}>
                            <img src="https://yt3.ggpht.com/ytc/AKedOLTKwkiuIDMtT7w-C55QJm3-FxExhi3So7EWofYGuQ=s800-c-k-c0xffffffff-no-rj-mo" alt="" onError={(e) => { e.target.onerror = null; e.target.src = logo }} />
                            <h3>Justin Bieber</h3>

                        </div>
                        <div className="circle-container" onClick={(ev) => this.selectArtist(ev, 'led zepplin')}>
                            <img src="https://yt3.ggpht.com/ytc/AKedOLRfwQJh6x8tdSDOPuMENrMgWxp6c9Wyi4k5dL3QeA=s800-c-k-c0xffffffff-no-rj-mo" alt="" onError={(e) => { e.target.onerror = null; e.target.src = logo }} />
                            <h3>Led Zeppelin</h3>

                        </div>
                        <div className="circle-container" onClick={(ev) => this.selectArtist(ev, 'eminem')}>
                            <img src="https://yt3.ggpht.com/ytc/AKedOLSk-AeebphZllYPnC6dyL4Ebaufx9EfWWcpWi5kvw=s800-c-k-c0xffffffff-no-rj-mo" alt="" onError={(e) => { e.target.onerror = null; e.target.src = logo }} />
                            <h3>Eminem</h3>

                        </div>
                        <div className="circle-container" onClick={(ev) => this.selectArtist(ev, 'ed sheeran')}>
                            <img src="https://yt3.ggpht.com/2uiMtw7drxpcP4J7s61C0x1cK_fdX0Fp_RJ9t9l-RVnal24xyqSLPhIkWYN2I8QneubJAA8J_Fo=s800-c-k-c0xffffffff-no-rj-mo" alt="" onError={(e) => { e.target.onerror = null; e.target.src = logo }} />
                            <h3>Ed Sheeran</h3>

                        </div>
                        <div className="circle-container" onClick={(ev) => this.selectArtist(ev, 'ariana grande')}>
                            <img src="https://yt3.ggpht.com/ytc/AKedOLRrULhlsqTk0LW6WZ4ufoPC2vRrI-Hv7iQMcwALzA=s800-c-k-c0xffffffff-no-rj-mo" alt="" onError={(e) => { e.target.onerror = null; e.target.src = logo }} />
                            <h3>Ariana Grande</h3>

                        </div>
                        <div className="circle-container" onClick={(ev) => this.selectArtist(ev, 'nirvana')}>
                            <img src="https://yt3.ggpht.com/ytc/AKedOLTcKOFg-V_beC58driCSWsjY01b2yASCkXpLo6z=s800-c-k-c0xffffffff-no-rj-mo" alt="" onError={(e) => { e.target.onerror = null; e.target.src = logo }} />
                            <h3>Nirvana</h3>

                        </div>
                        <div className="circle-container" onClick={(ev) => this.selectArtist(ev, 'avicii')}>
                            <img src="https://yt3.ggpht.com/ytc/AKedOLRxjYtdXH5SpVo0Hbgj-MV9iSYOZkPnyGBPX3dBtQ=s800-c-k-c0xffffffff-no-rj-mo" alt="" onError={(e) => { e.target.onerror = null; e.target.src = logo }} />
                            <h3>Avicii</h3>
                            <i class="fas fa-check"></i>
                        </div>
                        <div className="circle-container" onClick={(ev) => this.selectArtist(ev, 'motzart')}>
                            <img src="https://yt3.ggpht.com/ytc/AKedOLR-UxFlle0Li25HB_1AmFLgE1EZ5oF5lsGIojom=s800-c-k-c0xffffffff-no-rj-mo" alt="" onError={(e) => { e.target.onerror = null; e.target.src = logo }} />
                            <h3>Motzart</h3>

                        </div>
                        <div className="circle-container" onClick={(ev) => this.selectArtist(ev, 'beyonce')}>
                            <img src="https://yt3.ggpht.com/ytc/AKedOLSYFl86h5I9oWxAlUCb9ujyZVYus_NrMBnLnQZq=s800-c-k-c0xffffffff-no-rj-mo" alt="" onError={(e) => { e.target.onerror = null; e.target.src = logo }} />
                            <h3>Beyoncé</h3>

                        </div>
                        <div className="circle-container" onClick={(ev) => this.selectArtist(ev, 'taylor swift')}>
                            <img src="https://yt3.ggpht.com/MqKm9xyjonzkICKA78ir0AM-WUR47ntkBeJlgHeIk_rUnPuukiWtzOEmU7UjO8cFoPrBatCh3As=s800-c-k-c0xffffffff-no-rj-mo" alt="" onError={(e) => { e.target.onerror = null; e.target.src = logo }} />
                            <h3>Taylor Swift</h3>

                        </div>
                        <div className="circle-container" onClick={(ev) => this.selectArtist(ev, 'blink 182')}>
                            <img src="https://yt3.ggpht.com/ytc/AKedOLS9wSSSch2T5RCOqeWes0CQPq6CuE7n6BH6SGqp9g=s800-c-k-c0xffffffff-no-rj-mo" alt="" onError={(e) => { e.target.onerror = null; e.target.src = logo }} />
                            <h3>Blink-182</h3>
                            <i class="fas fa-check"></i>
                        </div>
                        <div className="circle-container" onClick={(ev) => this.selectArtist(ev, 'twenty one pilots')}>
                            <img src="https://yt3.ggpht.com/ytc/AKedOLShoAv85PyHPQZXkdEYAirEFkVlHT7QL0SO4jnLPQ=s800-c-k-c0xffffffff-no-rj-mo" alt="" onError={(e) => { e.target.onerror = null; e.target.src = logo }} />
                            <h3>Twenty one pilots</h3>
                            <i class="fas fa-check"></i>
                        </div>
                        <div className="circle-container" onClick={(ev) => this.selectArtist(ev, 'coldplay')}>
                            <img src="https://yt3.ggpht.com/gDGaWA0ykI0RuD-x0tOtlZQp_pmfqXMastg2rAJhCoGXeG7a44LL0BlSOZ1nQpuaj5apqzjxa4Y=s800-c-k-c0xffffffff-no-rj-mo" alt="" onError={(e) => { e.target.onerror = null; e.target.src = logo }} />
                            <h3>Coldplay</h3>

                        </div>
                        <div className="circle-container" onClick={(ev) => this.selectArtist(ev, 'imagine dragons')}>
                            <img src="https://yt3.ggpht.com/aXBmHKABw-J-0ZMxj39wkXpLDEHViOdL5UD71cDG2s5vbeQBWk9mdX3rRxT5U6Wfkvm6o8Uu-dU=s800-c-k-c0xffffffff-no-rj-mo" alt="" onError={(e) => { e.target.onerror = null; e.target.src = logo }} />
                            <h3>Imagine Dragons</h3>

                        </div>
                        <div className="circle-container" onClick={(ev) => this.selectArtist(ev, 'AC-DC')}>
                            <img src="https://yt3.ggpht.com/ytc/AKedOLR5p4C0mvYOySvgi0lcJEQ2b9GQ5RENU_js8bHV=s800-c-k-c0xffffffff-no-rj-mo" alt="" onError={(e) => { e.target.onerror = null; e.target.src = logo }} />
                            <h3>AC/DC</h3>
                            <i class="fas fa-check"></i>
                        </div>
                        <div className="circle-container" onClick={(ev) => this.selectArtist(ev, 'martin garrix')}>
                            <img src="https://yt3.ggpht.com/in7ji16oeon_ypiAMeH-ZdTWSaIC54yZqMsFg0X3uhTBk4MDCuIkRf6TIoQQCqjl20DSdakhSQ=s800-c-k-c0xffffffff-no-rj-mo" alt="" onError={(e) => { e.target.onerror = null; e.target.src = logo }} />
                            <h3>Martin Garrix</h3>
                            <i class="fas fa-check"></i>
                        </div>
                        <div className="circle-container" onClick={(ev) => this.selectArtist(ev, 'chainsmokers')}>
                            <img src="https://yt3.ggpht.com/ytc/AKedOLReODCO_8A0kTfEi7hIofuikdVUmLtUI31Y3JTk8g=s800-c-k-c0xffffffff-no-rj-mo" alt="" onError={(e) => { e.target.onerror = null; e.target.src = logo }} />
                            <h3>Chainsmokers</h3>
                            <i class="fas fa-check"></i>
                        </div>
                        <div className="circle-container" onClick={(ev) => this.selectArtist(ev, 'stromae')}>
                            <img src="https://yt3.ggpht.com/ytc/AKedOLRmW311L8rsVEfFzaHyrhrSlxLBdMpzimz6IbmjFQ=s800-c-k-c0xffffffff-no-rj-mo" alt="" onError={(e) => { e.target.onerror = null; e.target.src = logo }} />
                            <h3>Stromae</h3>
                            <i class="fas fa-check"></i>
                        </div>
                        <div className="circle-container" onClick={(ev) => this.selectArtist(ev, 'billie eilish')}>
                            <img src="https://yt3.ggpht.com/ytc/AKedOLTAirqzFYUbcrpr8K0Bh8iDCZvBopbEb3K9klVNBA=s800-c-k-c0xffffffff-no-rj-mo" alt="" onError={(e) => { e.target.onerror = null; e.target.src = logo }} />
                            <h3>Billie Eilish</h3>
                            <i class="fas fa-check"></i>
                        </div>
                        <div className="circle-container" onClick={(ev) => this.selectArtist(ev, 'james arthur')}>
                            <img src="https://yt3.ggpht.com/ytc/AKedOLTBGfA-SCl13HK2wvNgIlYp4csR75r4iedoDbDQ=s800-c-k-c0xffffffff-no-rj-mo" alt="" onError={(e) => { e.target.onerror = null; e.target.src = logo }} />
                            <h3>James Arthur</h3>
                            <i class="fas fa-check"></i>
                        </div>
                        <div className="circle-container" onClick={(ev) => this.selectArtist(ev, 'metallica')}>
                            <img src="https://yt3.ggpht.com/cZ87jDcUyng8WCTC_FZIZhtjd0VQIoyla_GLOCqCJwiePKbnsgMFAoJlJXO3JUdIDiG0U-W-Q-U=s800-c-k-c0xffffffff-no-rj-mo" alt="" onError={(e) => { e.target.onerror = null; e.target.src = logo }} />
                            <h3>Metallica</h3>
                            <i class="fas fa-check"></i>
                        </div>
                        <div className="circle-container" onClick={(ev) => this.selectArtist(ev, 'beartooth')}>
                            <img src="https://yt3.ggpht.com/ytc/AKedOLTrxAVj8B25pE4f3QOevhtu2aQPCeu9s6JSqR9hOg=s800-c-k-c0xffffffff-no-rj-mo" alt="" onError={(e) => { e.target.onerror = null; e.target.src = logo }} />
                            <h3>Beartooth</h3>
                            <i class="fas fa-check"></i>
                        </div>
                        <div className="circle-container" onClick={(ev) => this.selectArtist(ev, 'michael jackson')}>
                            <img src="https://yt3.ggpht.com/ytc/AKedOLRKkpURBGspdclOcPs6lr2Ds0S6VEIWIImSCQ63iA=s800-c-k-c0xffffffff-no-rj-mo" alt="" onError={(e) => { e.target.onerror = null; e.target.src = logo }} />
                            <h3>Michael Jackson</h3>
                            <i class="fas fa-check"></i>
                        </div>
                        <div className="circle-container" onClick={(ev) => this.selectArtist(ev, 'lily allen')}>
                            <img src="https://yt3.ggpht.com/ytc/AKedOLSlQDVT6TciEB3aqI4j98pAANAN37aLz6TIUCVX1g=s800-c-k-c0xffffffff-no-rj-mo" alt="" onError={(e) => { e.target.onerror = null; e.target.src = logo }} />
                            <h3>Lily Allen</h3>
                            <i class="fas fa-check"></i>
                        </div>
                        <div className="circle-container" onClick={(ev) => this.selectArtist(ev, 'the lumineers')}>
                            <img src="https://yt3.ggpht.com/JeSo37nuDNtXpYeRCXkdSd0BY1EBwOX3DjsoI7h5qS8qtURwdacx87aGyLsW-Zt_xHst5YN0j2A=s800-c-k-c0xffffffff-no-rj-mo" alt="" onError={(e) => { e.target.onerror = null; e.target.src = logo }} />
                            <h3>The Lumineers</h3>
                            <i class="fas fa-check"></i>
                        </div>
                        <div className="circle-container" onClick={(ev) => this.selectArtist(ev, 'the neighbourhood')}>
                            <img src="https://yt3.ggpht.com/ytc/AKedOLQuDzCsZ6o-eJrE-VN4V6hEvVasPCudmbpW1etVWQ=s800-c-k-c0xffffffff-no-rj-mo" alt="" onError={(e) => { e.target.onerror = null; e.target.src = logo }} />
                            <h3>The Neighbourhood</h3>
                            <i class="fas fa-check"></i>
                        </div>
                        <div className="circle-container" onClick={(ev) => this.selectArtist(ev, 'aerosmith')}>
                            <img src="https://yt3.ggpht.com/GVz2Q0BOmqNFKQvNXSoC5rVJWqvsajttYdF0VN6lYfwK2Misv-NJr_5akFEHxc8YkyGquGoZ=s800-c-k-c0xffffffff-no-rj-mo" alt="" onError={(e) => { e.target.onerror = null; e.target.src = logo }} />
                            <h3>Aerosmith</h3>
                            <i class="fas fa-check"></i>
                        </div>
                        <div className="circle-container" onClick={(ev) => this.selectArtist(ev, 'earth wind and fire')}>
                            <img src="https://yt3.ggpht.com/ytc/AKedOLSluhlgTQdg-VPnftxDahd5w3uqU7gZzQ2HN2Ocig=s800-c-k-c0xffffffff-no-rj-mo" alt="" onError={(e) => { e.target.onerror = null; e.target.src = logo }} />
                            <h3>Earth ,wind and fire </h3>
                            <i class="fas fa-check"></i>
                        </div>
                        <div className="circle-container" onClick={(ev) => this.selectArtist(ev, 'MGMT')}>
                            <img src="https://yt3.ggpht.com/uAFVZ2fFM7MshpUPfUxDWC_zZoXS9LYYKVu9WtmERQsei97F7oG0EJxLKZpmIxCBk-ZO6I2FiQ=s800-c-k-c0xffffffff-no-rj-mo" alt="" onError={(e) => { e.target.onerror = null; e.target.src = logo }} />
                            <h3>MGMT</h3>
                            <i class="fas fa-check"></i>
                        </div>
                        <div className="circle-container" onClick={(ev) => this.selectArtist(ev, 'bruno mars')}>
                            <img src="https://yt3.ggpht.com/ytc/AKedOLRRqICmdfNojkf55KFwEqi1A2Yh0dcSyIsXxkOWmFM=s800-c-k-c0xffffffff-no-rj-mo" alt="" onError={(e) => { e.target.onerror = null; e.target.src = logo }} />
                            <h3>Bruno Mars</h3>
                            <i class="fas fa-check"></i>
                        </div>
                        <div className="circle-container" onClick={(ev) => this.selectArtist(ev, 'kanye west')}>
                            <img src="https://yt3.ggpht.com/OZ6-K14IWCEu6rgIgmox9cID8hTUObJ9uPn_BRwr4O1CNyB_u6N3BqpaztggGYfKVv4rdR0zPYU=s800-c-k-c0xffffffff-no-rj-mo" alt="" onError={(e) => { e.target.onerror = null; e.target.src = logo }} />
                            <h3>Kanye West</h3>
                            <i class="fas fa-check"></i>
                        </div>
                        <div className="circle-container" onClick={(ev) => this.selectArtist(ev, 'tash sultana')}>
                            <img src="https://yt3.ggpht.com/iWAic-fKa7o7IGIzND9MiSKPqjL6Kb3fkd4gr_jRX7tKkjOMgZ5Ems3COKImBF8-szRTswzU8A=s800-c-k-c0xffffffff-no-rj-mo" alt="" onError={(e) => { e.target.onerror = null; e.target.src = logo }} />
                            <h3>Tash Sultana</h3>
                            <i class="fas fa-check"></i>
                        </div>
                        <div className="circle-container" onClick={(ev) => this.selectArtist(ev, 'milky chance')}>
                            <img src="https://yt3.ggpht.com/rxuJTmm-nGWtgvPdVyePl4PdDIwhEopv78WM7jyj6UI3ChJYjCOMd7c_AbuYSdzYMs2AMCu1WQ=s800-c-k-c0xffffffff-no-rj-mo" alt="" onError={(e) => { e.target.onerror = null; e.target.src = logo }} />
                            <h3>Milky Chance</h3>
                            <i class="fas fa-check"></i>
                        </div>
                    </div>
                </MainLayout >
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        stations: state.stationMoudle.stations,
        user: state.userMoudle.user
    }
}
const mapDispatchToProps = {
    setUserPref,
    loadUser
}


export const UserPref = connect(mapStateToProps, mapDispatchToProps)(_UserPref)