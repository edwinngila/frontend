import { Button, Container, Table } from "react-bootstrap"

const Users=()=>{
    return(
        <Container className="mt-3">
            <div className="row">
                <Table responsive>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Roll</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Edwin Ngila</td>
                            <td>Admin</td>
                            <td style={{color:"green"}}>online</td>
                            <td><Button>Log out</Button> <Button className="m-1">Delete</Button></td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Peter kyalo</td>
                            <td>Admin</td>
                            <td style={{color:"red"}}>offline</td>
                            <td><Button>Log out</Button> <Button className="m-1">Delete</Button></td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>John Kim</td>
                            <td>Admin</td>
                            <td style={{color:"green"}}>Active</td>
                            <td><Button>Log out</Button> <Button className="m-1">Delete</Button></td>
                        </tr>
                    </tbody>
                </Table>
            </div>
            <div className="row">
                <div className="col-6">
                </div>
                <div className="col-6">
                </div>
            </div>
        </Container>
    )
}
export default Users;