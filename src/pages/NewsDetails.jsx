import {
  Badge,
  chakra,
  Code,
  Heading,
  List,
  ListItem,
  OrderedList,
 	Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
	HStack,
} from '@chakra-ui/react'
import React, {useState, useEffect} from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Layout } from '../components/Layout'
import { useAuth } from '../contexts/AuthContext'
import { Navbar } from '../components/Navbar'
import { db } from "../firebase-config";
import { DeleteIcon,SettingsIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { IconButton } from "@chakra-ui/react"
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { getAuth, deleteUser } from "firebase/auth";


export default function News() {

const [news, setNews] = useState([]);
const [statusNews, setStatusNews]= useState();
const newsCollectionRef = collection(db, "News");

useEffect(() => {
    const getNews = async () => {
      const data = await getDocs(newsCollectionRef);

      setNews(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getNews();
  }, []);

  return (
   <Layout>
      <Navbar />
			<Heading>News</Heading>
      {/* <Text my={6}>{currentUser?.email}</Text> */}
		<div>
			</div>
    </Layout>
  )
}
