import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { async } from 'regenerator-runtime';

const PollingStation = props => {
    const [candidate1Url, changeCandidate1Url] = useState('https://cutewallpaper.org/21/loading-gif-transparent-background/Bee-Hollow-Farm-beekeeping-classes-and-events-near-Schodack-.gif')
    const [candidate2Url, changeCandidate2Url] = useState('https://cutewallpaper.org/21/loading-gif-transparent-background/Bee-Hollow-Farm-beekeeping-classes-and-events-near-Schodack-.gif')
    const [showresults, changeResultsDisplay] = useState(false);
    const [candidate1Votes, changeVote1] = useState('--');
    const [candidate2Votes, changeVote2] = useState('--');
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
            <Row>
                <Col className='jutify-content-center d-flex'>
                    <Container>
                        <Row style={{ marginTop: "5vh", backgroundColor: '#c4c4c4' }}>
                            <div style={{
                                display: "flex",
                                justifyContent: "center",
                                paddding: "3vw",
                            }} >
                                <img style={{ height: '35vh', width: '20vw ' }}
                                    src={candidate1Url}
                                >
                                </img>
                            </div>
                        </Row>

                        {showresults ? (
                            <Row className="justify-content-center d-flex" style={{ marginTop: "5vh" }}>
                                <div style={{ display: "flex", justifyContent: "center", fontSize: "8vw", padding: "10px", backgroundColor: "#c4c4c4" }}>
                                    {candidate1Votes}</div>
                            </Row>) : null}

                        <Row style={{ marginTop: "5vh" }} className="justify-content-center d-flex" >
                            <Button disabled={showresults} onClick={() => addVote(0)}>Vote</Button>
                        </Row>

                    </Container>
                </Col>

                <Col className="justify-content-center d-flex align-items-center">
                    <div style={{
                        display: "flex", justifyContent: "center",
                        height: "20vh", padding: "2vw",
                        textAlign: "center", backgroundColor: "#c4c4c4"
                    }}>
                        Who will be the next President?
                    </div>

                </Col>


                <Col className='jutify-content-center d-flex'>
                    <Container>
                        <Row style={{ marginTop: "5vh", backgroundColor: '#c4c4c4' }}>
                            <div style={{
                                display: "flex",
                                justifyContent: "center",
                                paddding: "3vw",
                            }} >
                                <img style={{ height: '35vh', width: '20vw ' }}
                                    src={candidate2Url}
                                >
                                </img>
                            </div>
                        </Row>

                        {showresults ? (
                            <Row className="justify-content-center d-flex" style={{ marginTop: "5vh" }}>
                                <div style={{ display: "flex", justifyContent: "center", fontSize: "8vw", padding: "10px", backgroundColor: "#c4c4c4" }}>
                                    {candidate2Votes}   </div>
                            </Row>) : null}

                        <Row style={{ marginTop: "5vh" }} className="justify-content-center d-flex" >
                            <Button disabled={showresults} onClick={() => addVote(1)} >Vote</Button>
                        </Row>

                    </Container>
                </Col>

            </Row>
        </Container>
    );
};



export default PollingStation;