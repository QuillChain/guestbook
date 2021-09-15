import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Table, Tab, Container, Button } from 'react-bootstrap';

// image
import { Image } from 'react-bootstrap';
import { async } from 'regenerator-runtime';


const home = props => {
    const [promptList, changePromptList] = useState([]);
    useEffect(() => {
        const getPrompts = async () => {
            changePromptList(await window.contract.getAllPrompt());
            console.log(await window.contract.getAllPrompt());
        };
        getPrompts();
    },[])

    // const promptList = [
    //     "Who would win in Smash bros?",
    //     "Who is the better actor?",
    //   ];
    return (
        <Container>
            <h2>Vote Blockchain:</h2>
            <hr></hr>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>List Polls</th>
                        <th>Go To Poll</th>
                    </tr>
                </thead>
                <tbody>
                    {promptList.map((el, index) => {
                        return (
                            <tr key={index}>
                                <td >
                                    {index + 1}
                                </td>
                                <td >
                                    {el}
                                </td>
                                <td className="text-center" >
                                    {" "}
                                    <Button variant="primary" onClick = {() => props.changeCandidates(el)} >Go to Poll</Button>
                                </td>


                            </tr>
                        );

                    })}

                </tbody>
            </Table>

        </Container>
    );
};



export default home;