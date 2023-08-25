import { Card, CardImg, Container } from "react-bootstrap"
import users from '../img/Screenshot 2023-07-23 215758.jpg'
import sells from '../img/Graphing-Tool.jpg'
import food from '../img/set-food_24640-79023.jpg'
import stored from '../img/online-supermarket-foods-flat-icons-set-meat-fish-fruits-vegetables-isolated-vector-illustration_1284-2170.jpg'
import '../css/Home.css'
import { useContext } from "react"
import { Color } from "../components/context"
import {Link} from 'react-router-dom'
const Home=()=>{
    const {bgColor} = useContext(Color)
    console.log(bgColor);
    return(
        <Container style={{backgroundColor:`${bgColor? "#f8f9fa":"#707e8b"}`}}>
            <div className="row mt-3 d-flex justify-content-center align-items-center">
                <div className="col-12 col-md-4 col-sm-9 col-lg-4 mt-3">
                 <Link to="/users" style={{textDecoration:"none"}}>
                    <Card className="bg-">
                        <CardImg src={users} alt="users"/>
                        <div className="card-body">
                            <h4>User info</h4>
                                <p>
                                    Get user information in reel time, for the users that are currently logged in to the system 
                                </p>
                        </div>
                    </Card>
                 </Link>
                </div>
                <div className="col-12 col-md-4 col-sm-9 col-lg-4 mt-3">
                <Link to="/Daily" style={{textDecoration:"none"}}>
                    <Card className="bg-">
                        <CardImg src={sells} alt="users"/>
                        <div className="card-body">
                            <h4>Daily</h4>
                            <p>
                               Get reel time statistics of your business performance and the number of sells that are occurring from opening time to closing every day all day 
                            </p>
                        </div>
                    </Card>
                </Link>
                </div>
            </div>
            <div className="row mt-3 d-flex justify-content-center align-items-center">
                <div className="col-12 col-md-4 col-sm-9 col-lg-4 mt-3">
                <Link  to="/Inventory" style={{textDecoration:"none"}}>
                <Card className="bg-">
                        <CardImg src={stored} alt="users"/>
                        <div className="card-body">
                            <h4>Inventory</h4>
                            <p>
                              Get items that have been kept in the storage unit an get alerted when the items are about to run out                             
                            </p>
                        </div>
                    </Card>
                </Link>
                </div>
                <div className="col-12 col-md-4 col-sm-9 col-lg-4 mt-3">
                <Link to="/FoodAvailable" style={{textDecoration:"none"}}>
                <Card className="bg-">
                        <CardImg src={food} alt="users"/>
                        <div className="card-body">
                            <h4>Food Available</h4>
                            <p>
                              Get to know foods that are available for sell to the customer and get notifications of food items that have run out of stock                        
                            </p>
                        </div>
                </Card>
                </Link>
                </div>
            </div>
        </Container>
    )
}
export default Home;