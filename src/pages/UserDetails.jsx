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
	Box,
  Center,
  Text,
  Stack,
  Avatar,
  useColorModeValue,
} from '@chakra-ui/react'
import React, {useState, useEffect} from 'react'
import { Link, useLocation,useParams, useHistory } from 'react-router-dom'
import { Layout } from '../components/Layout'
import { useAuth } from '../contexts/AuthContext'
import { Navbar } from '../components/Navbar'
import { db } from "../firebase-config";
import { ViewIcon, ViewOffIcon,ArrowBackIcon } from '@chakra-ui/icons'
import { IconButton } from "@chakra-ui/react"
import {
  collection,
  getDocs,
  addDoc,
	getDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { getAuth, deleteUser } from "firebase/auth";



export default function UserDetails() {

const [user, setUser] = useState([]);
const [admin, setAdmin]= useState();

const history = useHistory()
const {id} = useParams()
var adminStatus= false;

useEffect(() => {
	const docRef = doc(db, "Users", id);
	getDoc(docRef).then((result) =>{

	if (result.exists()) {

	setUser(result.data())

	} else {
  // doc.data() will be undefined in this case
	}
	})
  }, []);

	async function updateUser(){

	const userRef = doc(db, "Users", user.uid);

	if(user.admin === 'Admin'){
	await updateDoc(userRef, {
  admin: 'User'
	});
	}
	else{
	await updateDoc(userRef, {
  admin: 'Admin'
	});
	}
	}

  return (

   <Layout>
      <Navbar />
			<Heading>	<IconButton icon={<ArrowBackIcon /> } onClick={() => history.goBack()}/> User Details</Heading>
      {/* <Text my={6}>{currentUser?.email}</Text> */}
			<div>
			<Center py={6}>
      <Box
        maxW={'445px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.900')}
        boxShadow={'2xl'}
        rounded={'md'}
        p={6}
        overflow={'hidden'}>
				<Stack  align="right" >
				<IconButton  icon={user.admin === 'Admin' ? <ViewOffIcon />  : <ViewIcon />  } onClick={() => updateUser()}/>
				</Stack>
        <Stack>

          <Text
            color={'green.500'}
            textTransform={'uppercase'}
            fontWeight={800}
            fontSize={'sm'}
            letterSpacing={1.1}>
            {user.uid}
          </Text>
          <Heading
            color={useColorModeValue('gray.700', 'white')}
            fontSize={'2xl'}
            fontFamily={'body'}>
           {user.display_name}
          </Heading>
          <Text color={'gray.500'}>
            {user.email}
          </Text>
        </Stack>
        <Stack mt={3} direction={'row'} spacing={4} align={'center'}>
          <Stack direction={'column'} spacing={0} fontSize={'sm'}>
            <Text fontWeight={600}>{user.admin} </Text>
            <Text color={'gray.500'}></Text>
          </Stack>
        </Stack>
      </Box>
    </Center>

			</div>
    </Layout>
  )
}
