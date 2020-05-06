import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import "./index.less";

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const moduleName   = this.props.location.pathname.split("/")[1] || "";
        const isAdminModle = moduleName === 'admin'
        return (
            <div>
                <Navbar bg={isAdminModle ? `dark` : `info`} variant={isAdminModle ? `dark` : `light`} >
                    <Navbar.Brand href="/">
                        <img
                          alt="Milan-Texi Logo"
                          src="https://www.clipartmax.com/png/middle/191-1914567_taxi-airport-bus-yellow-cab-clip-art-taxi-logo-transparent.png"
                          width="30"
                          height="30"
                          className="d-inline-block align-top"
                        />
                        <span className="company-name"> Milan-Texi </span>
                        { isAdminModle ? <span className="module-name"> Admin </span> : "" }
                    </Navbar.Brand>
                    { this.navList()}
                    { !isAdminModle ?
                        <Nav className="mr-auto" className="justify-content-end">
                            <Nav.Link href="/admin">Go to Admin</Nav.Link>
                        </Nav> : ""
                    }
                    <Navbar.Text>
                        <span className="creater-area"> created by <a href="#">Milan C</a> in MERN </span>
                    </Navbar.Text>
                </Navbar>
                <Container>
                    { this.props.children }
                </Container>
            </div>
        );
    }

    navList() {
        const pathArray    = this.props.location.pathname.split("/");
        const moduleName   = pathArray[1] || "";
        const moduleAction = pathArray[2] || "";
        const currentKey   = moduleAction ? `/${moduleName}/${moduleAction}` : `/${moduleName}`;

        switch (moduleName) {
            case 'admin':
                return (
                    <Nav className="mr-auto" activeKey={currentKey || null} defaultActiveKey="/admin/orders">
                      <Nav.Link href="/admin/orders" >Orders</Nav.Link>
                      <Nav.Link href="/admin/users">Users</Nav.Link>
                      <Nav.Link href="/admin/drivers">Drivers</Nav.Link>
                      <Nav.Link href="/admin/price-setting">Pricing</Nav.Link>
                    </Nav>
                )
                break;
            default:
                return (
                    <Nav className="mr-auto" activeKey={currentKey || null} defaultActiveKey="/booking">
                      <Nav.Link href="/booking">Booking</Nav.Link>
                      <Nav.Link href="/my-orders">View Ordes</Nav.Link>
                      <Nav.Link href="/login">Login</Nav.Link>
                    </Nav>
                )
                break;
        }
    }
}

export default Index;
