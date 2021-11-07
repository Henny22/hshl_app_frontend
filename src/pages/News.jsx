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
import { DeleteIcon,SettingsIcon, ViewIcon, ViewOffIcon, AddIcon } from '@chakra-ui/icons'
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
			<Link to={`/news_erstellen`}>
			<IconButton  icon={<AddIcon />} />
			</Link>
      {/* <Text my={6}>{currentUser?.email}</Text> */}

<div>
<Table variant="simple">
  <Thead>
    <Tr>
      <Th >Public</Th>
      <Th >Erstellt</Th>
      <Th >Überschrift</Th>
			<Th >Text</Th>
			<Th >Bearbeiten</Th>
    </Tr>
			</Thead>
				<Tbody>
																	{ news.map(news => (
																					<tr key={news.id}>
																							<td align="center">{news.public.toString()}</td>
																							<td align="center" >{news.created_time.toDate().toString() }</td>
																							<td align="center">{news.ueberschrift}</td>
																							<td align="center">{news.text.slice(0,150)}</td>
																							<td align="center">

																										<HStack  spacing='2'>
																										<IconButton  icon={news.public ? <ViewOffIcon /> : <ViewIcon />} />
																										<Link to={`/news_details/${news.id}`}>
																										<IconButton  icon={<SettingsIcon />} />
																										</Link>
																										</HStack>

																							</td>
																					</tr>
																			))
																	}
				</Tbody>
			</Table>
			</div>

    </Layout>
  )
}
