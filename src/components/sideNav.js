import { Container, Nav, NavLink } from "react-bootstrap";
import { Link } from "react-router-dom";

const SideNav=()=>{
    return(
        <Container fluid>
            <div className="row" style={{minHeight:"100vh"}}>
                <div className="col-12 bg-dark d-flex">
                    <Nav>
                        <NavLink>
                            <Link>Home</Link>
                        </NavLink>
                        <NavLink>
                            <Link>Users</Link>
                        </NavLink>
                        <NavLink>
                            <Link>Sell</Link>
                        </NavLink>
                        <NavLink>
                            <Link>Daily</Link>
                        </NavLink>
                        <NavLink>
                            <Link>Inventory</Link>
                        </NavLink>
                        <NavLink>
                            <Link>Food Available</Link>
                        </NavLink>
                    </Nav>
                </div>
            </div>
        </Container>        
    )
}
export default SideNav;