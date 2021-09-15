import 'regenerator-runtime/runtime'
import React from 'react'
import { login, logout } from './utils'
import './global.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

//image
import blocklogo from './assets/blocklogo.png';

//components
import Home from './components/Home';
import NewPoll from './components/NewPoll';
import PollingStation from './components/PollingStation';

import getConfig from './config'
import { async } from 'regenerator-runtime/runtime';
const { networkId } = getConfig(process.env.NODE_ENV || 'development')

export default function App() {
  const changeCandidatesFunction = async (prompt) => {
    console.log(prompt);
    let namePair = await window.contract.getCandidatePair({prompt: prompt });
    localStorage.setItem("Candidate1",namePair[0]);
    localStorage.setItem("Candidate2",namePair[1]);
    localStorage.setItem("prompt",prompt);
    window.location.replace(window.location.href + "PollingStation" )
  }

  return (<Router>
    {/****************** 
    * End Nav bar
    ********************/}
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">
          <img src={blocklogo}></img>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
          </Nav>
          <Nav>
            <Nav.Link href='/newpoll' >New Poll</Nav.Link>
            {/* <Nav.Link href='/pollingstation' >Polling Station</Nav.Link> */}
            <Nav.Link onClick={window.accountId === "" ? login : logout} >
              {window.accountId === "" ? "Login" : window.accountId}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    {/* End Nav Bar */}

    {/****************** 
    * Frontend
    ********************/}
    <Switch>
      <Route exact path="/">
        <Home changeCandidates = {changeCandidatesFunction} />
      </Route>
      <Route exact path="/PollingStation">
        <PollingStation />
      </Route>
      <Route exact path="/NewPoll">
        <NewPoll />
      </Route>
    </Switch>






  </Router>)
}
