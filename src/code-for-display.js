//frontend
socketService.emit('add like', { creatorId: stationToUpdate.createdBy.id, currUser: user, stationName: stationToUpdate.name })


//backend
socket.on('add like', ({ userIdliked, currUser, stationName }) => {
    if (userIdliked === currUser._id) return
    let obj = { username: currUser.username, stationName: stationName };
    socket.broadcast.to(`${userIdliked}`).emit('send notification', obj);
})


socketService.on('send notification', (obj) => {
    showNotificationMsg(obj.username + ' liked your playlist: ' + obj.stationName)
})


class UserMsg extends React.Component {
    componentDidMount() {
        eventBusService.on('show-user-msg', (msg) => {
            this.setState({ msg })
            setTimeout(() => {
                this.setState({ msg: null })
            }, 5000)
        })
    }

    render() {
        return (
            <div id={`toast`} className={`show  ${msgClass}`}><div id="img"><img style={{ height: '20px', width: "20px" }} src={ringing} /></div><div id="desc"> {this.state.msg.txt}</div></div>
        )
    }
}
