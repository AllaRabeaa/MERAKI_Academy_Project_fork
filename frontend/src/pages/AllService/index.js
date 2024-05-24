import React, { Suspense, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { setDeleteService, setAllService, setUpdateService } from '../../Service/redux/reducers/serviceprovider'

import "./style.css"

import {
    Button,
    Image,
    Flex,
    Heading,
    Text,
    VStack,
    HStack,
    Container,
} from "@chakra-ui/react";

import { FaHome, FaUser, FaComments, FaArrowLeft } from "react-icons/fa";

export default function GetAllService() {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [shwo, setShwo] = useState(false);
    const [description, setDescription] = useState("");
    const [address, setAddress] = useState("");
    const [img, setImg] = useState("");
    const [price, setPrice] = useState("");
    const token = useSelector((state) => state.auth.token)
    const { service } = useSelector((state) => {
        return {
            service: state.service.service
        }
    })
    const allSerivces = async () => {
        try {
            const results = await axios.get(`http://localhost:5001/serviceProvider/`);
            console.log(results)
            dispatch(setAllService(results.data.result))
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {

        allSerivces()
    }, [])




    return (
        <VStack spacing={8} align="center" p={4}>
            <Text fontSize="2xl" fontWeight="bold">
                All Service
            </Text>
            <VStack spacing={4} align="stretch">
                {service &&

                    service.map((elem, i) => {

                        return <div
                            key={i}
                            className="cat1"
                            style={{
                                border: "2px solid #CBD5E0",
                                borderRadius: "5%",
                                boxShadow: "5px 5px 5px teal",
                                transition: "transform 0.3s",
                                _hover: { transform: "scale(1.05)" },
                            }}
                        >
                            <Text fontSize="xl" fontWeight="bold">{elem.title}</Text>
                            <Text textAlign="center">{elem.description}</Text>
                            <Text>Address: {elem.address}</Text>
                            <Text>Price: {elem.price} JD</Text>
                            <Container centerContent className="container">
                                <Image
                                    src={elem.img}
                                    className="image"
                                    style={{ borderRadius: "5%", boxShadow: "2px 2px 2px teal" }}
                                />
                                <HStack spacing={4} className="b1" mt={5} mb={5} >
                                
                                <Button colorScheme="blue"
                                variant="outline"
                                 onClick={() => {
                                    axios.delete(`http://localhost:5001/serviceProvider/${elem.id}`,
                                        {
                                            headers: { Authorization: `Bearer ${token}` }
                                        })
                                        .then((result) => {

                                            dispatch(setDeleteService(result.data.result[0].id))
                                        })
                                        .catch((error) => {
                                            console.log(error);
                                        })

                                }}>Delet</Button>
                                
                                
                                    {shwo && (
                                        <div className="inpu">
                                            <input className="te"
                                                placeholder="Title"
                                                type="text"
                                                onChange={(e) => setTitle(e.target.value)}
                                            />
                                            <input className="te"
                                                placeholder="Description"
                                                type="text"
                                                onChange={(e) => setDescription(e.target.value)}
                                            />
                                            <input className="te"
                                                placeholder="Address"
                                                type="text"
                                                onChange={(e) => setAddress(e.target.value)}
                                            />
                                            <input className="te"
                                                placeholder="Image"
                                                type="text"
                                                onChange={(e) => setImg(e.target.value)}
                                            />
                                            <input className="te"
                                                placeholder="Price"
                                                type="number"
                                                onChange={(e) => setPrice(e.target.value)}
                                            />
                                        </div>
                                    )}
                                    <Button colorScheme="blue"
                                    variant="outline" onClick={() => setShwo(true)}>Show Update</Button>
                                    
                                    <Button colorScheme="blue"
                                    variant="outline"
                                        onClick={() => {
                                            axios
                                                .put(`http://localhost:5001/serviceProvider/${elem.id}`, { title, description, address, img, price }, {
                                                    headers: { Authorization: `Bearer ${token}` }
                                                })
                                                .then((result) => {
                                                    setShwo(false);
                                                    console.log(result);
                                                    dispatch(setUpdateService({
                                                        title: result.data.result[0].title,

                                                        description: result.data.result[0].description,
                                                        address: result.data.result[0].address,
                                                        img: result.data.result[0].img,
                                                        price: result.data.result[0].price,
                                                        id: elem.id

                                                    }));
                                                })
                                                .catch((error) => {
                                                    console.log(error);
                                                });
                                        }}
                                    >
                                        Update
                                    </Button>
                                
                                </HStack>
                            </Container>
                        </div>
                    })}

            </VStack>
          
            <HStack spacing={8} className="navigation-buttons">
            
            <Button colorScheme="yellow" onClick={() => {
                navigate('/createprovider')
            }}>
                Create Provider</Button>
            <Button
              colorScheme="yellow"
              leftIcon={<FaHome />}
              onClick={() => {
                navigate("/");
              }}
            >
              Home
            </Button>
            <Button
              colorScheme="yellow"
              leftIcon={<FaArrowLeft />}
              onClick={() => {
                navigate(-1);
              }}
            >
              Back
            </Button>
          </HStack>

        </VStack>
    )
};

