import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import ScrollToTop from "./components/ScrollToTop";

import { library } from '@fortawesome/fontawesome-svg-core'
import { faHeart, faLightbulb, faHourglass} from '@fortawesome/free-solid-svg-icons'

library.add(faHeart, faLightbulb, faHourglass)

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      coreTopics: [],
    }
  }
  async componentDidMount(){
    const coreTopics = await (await (fetch("/store.json"))).json();
    this.setState({coreTopics});
  }

  render(){
   const {coreTopics} = this.state;
   return (
      <Router>
        <ScrollToTop>
            <NavBar/>
              <div className = "content">
                <Switch>
                  <Route path = "/core-topics" render = { 
                    props =>  
                      <Header 
                        {...props} 
                        coreTopics = {coreTopics}
                        />
                    }/>
                  <Route exact path = "/" component = {Home}/>
                </Switch>
              </div>
          </ScrollToTop>
        </Router>
    );
  }
}
export default App;
