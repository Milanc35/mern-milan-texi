import React from "react";
import { Row, Container, Button, Col} from "react-bootstrap";
import "./index.less";
import HttpApi from "@/Utils/http";

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <Container>
                <Row>
                    <Col>1 of 2</Col>
                    <Col>2 of 2</Col>
                </Row>
                <Row>
                    <Col>1 of 3</Col>
                    <Col>2 of 3</Col>
                    <Col>3 of 3</Col>
                </Row>
            </Container>
        );
    }

    componentDidMount() {
        this.getDriverList();
    }

    getDriverList() {
        HttpApi.get('/driver')
          .then(response => {
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });
    }
}

export default Index;
