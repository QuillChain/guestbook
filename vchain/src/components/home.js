import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Table, Tab, Container, Button } from 'react-bootstrap';

// image
import { Image } from 'react-bootstrap';
import { async } from 'regenerator-runtime';


const home = props => {
    const [promptList, changePromptList] = useState([]);
    const [companyList, changeCompanyList] = useState([]);
    useEffect(() => {
        const getPrompts = async () => {
            changePromptList(await window.contract.getAllPrompt());
            console.log(await window.contract.getAllPrompt());
        };
        getPrompts();

        const getCompanys = async () => {
            changeCompanyList(await window.contract.getAllCompany());
            console.log(await window.contract.getAllCompany());
        };
        getCompanys();
    }, [])


    return (
        <Container>
            <h2>Reviews Company Blockchain:</h2>
            <hr></hr>
            <Table variant="warning" striped bordered hover size="sm" >
                <thead>
                    <tr>
                        <th>#</th>
                        <th>List Company</th>
                        <th  className="text-center">Go To Company Reviews</th>
                    </tr>
                </thead>
                <tbody>
                    {companyList.map((el, index) => {
                        return (
                            <tr key={index}>
                                <td >
                                    {index + 1}
                                </td>
                                <td >
                                    {el}
                                </td>
                                <td  className="text-center" >
                                    {" "}
                                    <Button variant="primary" onClick={() => props.changeCompany(el)} >Go to Review</Button>
                                </td>


                            </tr>
                        );

                    })}

                </tbody>
            </Table>
            <h2>Polling Blockchain:</h2>
            <hr></hr>
            <Table variant="success" striped bordered hover size="sm" >
                <thead>
                    <tr>
                        <th>#</th>
                        <th  >List Polls</th>
                        <th  className="text-center">Go To Polling Station</th>
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
                                    <Button variant="primary" onClick={() => props.changeCandidates(el)} >Go to Poll</Button>
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