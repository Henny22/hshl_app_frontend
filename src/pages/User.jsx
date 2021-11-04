import {
  Badge,
  chakra,
  Code,
  Heading,
  List,
  ListItem,
  OrderedList,
} from '@chakra-ui/react'
import React, {useState, useEffect} from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Layout } from '../components/Layout'
import { useAuth } from '../contexts/AuthContext'
import { Navbar } from '../components/Navbar'
import { collection, getDocs } from "firebase/firestore";
import { getFirestore } from "firebase/firestore"
const db = getFirestore();






export default function User() {

const [data, setData] = useState([])

useEffect ( () =>{
	async function handleRedirectToOrBack() {
		try{
		const querySnapshot = await getDocs(collection(db, "Users"));
			querySnapshot.forEach((doc) => {
				console.log(doc.displayName)
			});
		}catch(err){
		console.log(err);
		}
		handleRedirectToOrBack();
  }
},[data]);


  return (

   <Layout>
      <Navbar />
			<Heading>User Liste</Heading>
      {/* <Text my={6}>{currentUser?.email}</Text> */}
		{data}
    </Layout>
  )
}
