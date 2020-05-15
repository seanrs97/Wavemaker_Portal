import React from "react";
import { withRouter } from "react-router";

// Used to direct the user to the top of the page when the navigate through the portal
// For some reason React automatically directs users to the last place they were at on the previous page which is really annoying.

class ScrollToTop extends React.Component {
    componentDidUpdate(prevProps){
        if(this.props.location !== prevProps.location){
            window.scrollTo(0,0)
        }
    }
    render(){
        return this.props.children
    }
}

export default withRouter(ScrollToTop);