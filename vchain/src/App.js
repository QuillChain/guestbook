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
import NewReview from './components/NewReview';
import PollingStation from './components/PollingStation';
import CompanyReview from './components/CompanyReview';

import getConfig from './config'
import { async } from 'regenerator-runtime/runtime';
const { networkId } = getConfig(process.env.NODE_ENV || 'development')

export default function App() {
  const changeCompanyFunction = async (companyName) => {
    console.log(companyName);
    let companyUrl = await window.contract.getCompanyByName({companyName: companyName });
    console.log(companyUrl);
    localStorage.setItem("imageUrl",companyUrl[0]);
    localStorage.setItem("webUrl",companyUrl[1]);
    localStorage.setItem("companyName",companyName);
    window.location.replace(window.location.href + "CompanyReview" );
  }
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
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark"  >  {/*sticky="top"*/}
      <Container>
        <Navbar.Brand href="/">
          <img src={blocklogo}></img>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href='/' >Home</Nav.Link>
            <Nav.Link href='/NewReview' >New Review</Nav.Link>
            <Nav.Link href='/newpoll' >New Poll</Nav.Link>
          </Nav>
          <Nav>
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
        <Home changeCandidates = {changeCandidatesFunction} changeCompany={changeCompanyFunction} />
        {/* <Home changeCompany={changeCompanyFunction} /> */}
      </Route>
      <Route exact path="/PollingStation">
        <PollingStation />
      </Route>
      <Route exact path="/CompanyReview">
        <CompanyReview />
      </Route>
      <Route exact path="/NewPoll">
        <NewPoll />
      </Route>
      <Route exact path="/NewReview">
        <NewReview />
      </Route>
    </Switch>






  </Router>)
}
