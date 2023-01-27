import React, { useState, useEffect } from "react";
import { Marker, Popup, TileLayer } from "react-leaflet";
import { MapContainer } from "react-leaflet";
import Pagination from "./components/Pagination.js";
function App() {
    const ZOOM_LEVEL = 9;
    const [city, setCity] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(10);

//    "build": "react-scripts build",

    const loadData = async () => {
       // let response = await fetch("/cities"); // in case of 5000
        let response =await fetch("http://localhost:5000/cities"); 
        response = await response.json();
        setCity(response.cities);
        // console.log(response.cities);
    }

    useEffect(() => {
        loadData();
    }, [])

    //Get current Page.
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = city.slice(indexOfFirstPost, indexOfLastPost);

    //change page .
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    return (
        <> 
        <div className="card  text-center bg-primary text-white">
            <h1>Get Weather Info on Map ......Data </h1>
            <p>Data Refresh every 5 minutes delay......</p>
        </div>
            <div className='container'>
                {
                    currentPosts !== []
                        ? currentPosts && currentPosts.map((data) => {
                            return (

                                <div id="map" className="col-12 col-md-6 col-lg-3" >
                                    <h1>{data.city}</h1>

                                    <div className="card" style={{ width: "20rem" }}>
                                        <div className="card-body">
                                            <MapContainer
                                                center={[data.lat, data.lon]} zoom={ZOOM_LEVEL}
                                                style={{ width: "100%", height: "60vh" }}>
                                                <TileLayer
                                                    url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                                                    attribution='&copy; <a href= "http://www.openstreetmap.org/copyright">OpenStreetMap</a>'>
                                                </TileLayer>
                                                <Marker position={[data.lat, data.lon]}>
                                                    <Popup>
                                                        <h4>{data.city} </h4>
                                                        <p>temp : {data.temp} °F</p>
                                                        <p>Desc :{data.descp}</p>

                                                        You are here .
                                                    </Popup>
                                                </Marker>
                                            </MapContainer>

                                        </div>
                                    </div>


                                </div>
                            )
                        }
                        )
                        : ""
                }
            </div>
            <div className="container mx-auto " style={{marginTop:"20px"}}>
                <Pagination postsPerPage={postsPerPage} totalPosts={city.length} paginate={paginate} />

            </div>
          



        </>
    );
}

export default App;



