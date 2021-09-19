import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { async } from 'regenerator-runtime';
import { MDBCard, MDBCardTitle, MDBCardText, MDBCardBody, MDBCardImage, MDBRow, MDBCol, MDBBtn } from 'mdb-react-ui-kit';


const PollingStation = props => {
    const [candidate1Url, changeCandidate1Url] = useState('https://cutewallpaper.org/21/loading-gif-transparent-background/Bee-Hollow-Farm-beekeeping-classes-and-events-near-Schodack-.gif')
    const [candidate2Url, changeCandidate2Url] = useState('https://cutewallpaper.org/21/loading-gif-transparent-background/Bee-Hollow-Farm-beekeeping-classes-and-events-near-Schodack-.gif')
    const [showresults, changeResultsDisplay] = useState(false);
    const [candidate1Votes, changeVote1] = useState('--');
    const [candidate2Votes, changeVote2] = useState('--');
    const [promptTitle, changePrompt] = useState('--');
    useEffect(() => {

        const getInfo = async () => {

            //vote count stuff
            let voteCount = await window.contract.getVotes({ prompt: localStorage.getItem("prompt") });
            changeVote1(voteCount[0]);
            changeVote2(voteCount[1]);

            //image stuff
            changeCandidate1Url(
                await window.contract.getUrl({ name: localStorage.getItem("Candidate1") })
            )
            changeCandidate2Url(
                await window.contract.getUrl({ name: localStorage.getItem("Candidate2") })
            )

            //prompt title stuff
            changePrompt(
                localStorage.getItem("prompt")
            )

            //vote checking stuff
            let didUserVote = await window.contract.didParticipate({
                prompt: localStorage.getItem("prompt"),
                user: window.accountId
            })
            changeResultsDisplay(didUserVote);
        }
        getInfo();
    }, []);

    const addVote = async (index) => {
        await window.contract.addVote({
            prompt: localStorage.getItem("prompt"),
            index: index
        })
        await window.contract.recordUser({
            prompt: localStorage.getItem("prompt"),
            user: accountId
        })
        changeResultsDisplay(true);
    }

    return (
        <Container>

           
            <Row style={{ marginTop: "5vh" }} >

                <Col sm className='jutify-content-center d-flex' style={{ marginTop: "5vh" }}>
                    <Container>
                        <Row >
                            <MDBCard style={{ maxWidth: '22rem' }}>
                                <MDBCardImage style={{ marginTop: "5vh" }} src={candidate1Url} position='top' alt='...' />
                                <MDBCardBody>

                                    {showresults ? (
                                        <Row className="justify-content-center d-flex" style={{ marginTop: "5vh" }}>
                                            <div style={{ display: "flex", justifyContent: "center", fontSize: "8vw", padding: "10px", backgroundColor: "#c4c4c4" }}>
                                            {candidate1Votes}</div>
                                        </Row>) : null}


                                    <Row style={{ marginTop: "5vh" }} className="justify-content-center d-flex" >

                                        <MDBBtn className="" disabled={showresults} onClick={() => addVote(0)} >Vote</MDBBtn>
                                    </Row>

                                </MDBCardBody>
                            </MDBCard>
                        </Row>
                    </Container>
                </Col>

                <Col sm className="justify-content-center d-flex align-items-center" style={{ marginTop: "5vh" }}>

                    <MDBCard style={{ maxWidth: '22rem' }}>
                        <MDBCardImage src="https://static.wikia.nocookie.net/roosterteeth/images/f/ff/VS_logo.png" position='top' alt='...' />
                        <MDBCardBody>
                            <MDBCardTitle className="text-center">{promptTitle}</MDBCardTitle>
                            {/* <MDBCardText className="text-center">
                            {promptTitle}
                            </MDBCardText> */}
                        </MDBCardBody>
                    </MDBCard>

                </Col>


                <Col sm className='jutify-content-center d-flex' style={{ marginTop: "5vh" }}>
                    <Container>


                        <Row>
                            <MDBCard style={{ maxWidth: '22rem' }}>
                                <MDBCardImage style={{ marginTop: "5vh" }} src={candidate2Url} position='top' alt='...' />
                                <MDBCardBody>

                                    {showresults ? (
                                        <Row className="justify-content-center d-flex" style={{ marginTop: "5vh" }}>
                                            <div style={{ display: "flex", justifyContent: "center", fontSize: "8vw", padding: "10px", backgroundColor: "#c4c4c4" }}>
                                            {candidate2Votes}</div>
                                        </Row>) : null}


                                    <Row style={{ marginTop: "5vh" }} className="justify-content-center d-flex" >

                                        <MDBBtn className="" disabled={showresults} onClick={() => addVote(1)} >Vote</MDBBtn>
                                    </Row>

                                </MDBCardBody>
                            </MDBCard>
                        </Row>

                    </Container>
                </Col>

            </Row>
        </Container>
    );
};



export default PollingStation;