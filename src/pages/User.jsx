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
import { DeleteIcon,SettingsIcon } from '@chakra-ui/icons'
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



export default function User() {

const [users, setUsers] = useState([]);
const usersCollectionRef = collection(db, "Users");


useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getUsers();
  }, []);

  return (

   <Layout>
      <Navbar />
			<Heading>Benutzer Liste</Heading>
      {/* <Text my={6}>{currentUser?.email}</Text> */}
			<div>
<Table variant="simple">
  <Thead>
    <Tr>
      <Th>User ID</Th>
      <Th>User Name</Th>
      <Th>Email</Th>
			<Th>Admin</Th>
			<Th>Bearbeiten</Th>
    </Tr>
  </Thead>
  <Tbody>
																	{ users.map(user => (
																					<tr key={user.id}>
																							<td >{user.id}</td>
																							<td align="center" >{user.display_name}</td>
																							<td align="center">{user.email}</td>
																							<td align="center">{user.admin}</td>
																							<td align="center">
																									<Link to={`/user_details/${user.id}`}>
																										<IconButton  icon={<SettingsIcon />} />
																									</Link>
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
