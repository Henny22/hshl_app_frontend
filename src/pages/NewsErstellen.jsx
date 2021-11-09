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
	Image,
	Divider,
	Input,
	Textarea,
  Flex,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
	  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@chakra-ui/react'
import React, {useState, useEffect} from 'react'
import { Link, useLocation,useParams, useHistory } from 'react-router-dom'

import { Layout } from '../components/Layout'
import { useAuth } from '../contexts/AuthContext'
import { Navbar } from '../components/Navbar'
import ResizeTextarea from "react-textarea-autosize";
import { db } from "../firebase-config";
import { DeleteIcon,SettingsIcon, ViewIcon, ViewOffIcon, EditIcon,ArrowBackIcon, CheckIcon, CloseIcon, UnlockIcon } from '@chakra-ui/icons'
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
	getDoc,
} from "firebase/firestore";
import { getAuth, deleteUser } from "firebase/auth";


export default function NewsErstellen() {
	var url_bild;
	const [news, setNews] = useState([]);
	const [preview, setPreview] = useState(false)
	const [bildURL, setbildURL]= useState([]);
	const [text, setText]= useState([]);
	const [ueberschrift, setUeberschrift]= useState([]);
	const [bearbeiten, setbearbeiten] = useState([]);
	const [isOpen, setIsOpen] = React.useState(false)
	const [button, setButton] = useState([]);
	const cancelRef = React.useRef()
	const newsCollectionRef = collection(db, "News");
	const {id} = useParams()
	const history = useHistory()
	const currentDay = new Date;
useEffect(() => {
  }, []);

const onClose = (e) => {
	if(e.target.id =='speichern_button'){
		news.text = document.getElementById("textarea_text").value
		news.ueberschrift = document.getElementById("textarea_ueberschrift").value
		news.url_bild = bildURL;
		news.url_bild_String = bildURL;
		const docRef = doc(db, "News", id);
		updateDoc(docRef, {
			text 				   : news.text,
			ueberschrift	 : news.ueberschrift,
			url_bild_String: news.url_bild_String,
			url_bild			 : news.url_bild
		}).then(function () {
			setbearbeiten(false);
			setIsOpen(false);
		}).catch(function (error) {
			console.log(error);
		})

	}else if (e.target.id =='rückgängig_button'){
		setbildURL(news.url_bild);
		setbearbeiten(false);
		setIsOpen(false);
	}
	else if (e.target.id =='abbrechen_button'){
		console.log('im in abbrechen')
		setIsOpen(false);

	}
}


const handleChange_Url_Bild = (event) => {
	if(event.target.value == null || event.target.value == "" ){
	setbildURL(news.url_bild)
	}else{
		setbildURL(event.target.value);
	}
}

const doAlertDialog = (button) => {
	setIsOpen(true);
	setButton(button);
}

const handleChange_check = (event) => {
	url_bild = bildURL;
	setText(document.getElementById("textarea_text").value)
	setUeberschrift(document.getElementById("textarea_ueberschrift").value)
	setPreview(true)



}

const resetForm = (event) => {
setText('');
setUeberschrift('');
setbildURL('');
url_bild= '';
document.getElementById("textarea_text").value = '';
document.getElementById("textarea_ueberschrift").value = '';
document.getElementById("input_url_bild").value ='';
}


const createNewsDoc = () =>{
	addDoc(collection(db, "News"), {
		public:true,
		ueberschrift: ueberschrift,
		url_bild: bildURL,
		url_bild_String: bildURL,
		text: text,
		created_time: currentDay,
	}).then((res) =>{
		history.push("/news");
	});
}

  return (
	<>
   <Layout>
      <Navbar />
			<Heading>	<IconButton icon={<ArrowBackIcon /> } onClick={() => history.goBack()}/> News</Heading>
      {/* <Text my={6}>{currentUser?.email}</Text> */}
		<div>
			 <Center py={6}>
      <Box
        maxW={'445px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.900')}
        boxShadow={'2xl'}
        rounded={'md'}
        p={10}
        overflow={'hidden'}>
				 <Box
          h={'50px'}
          mt={-6}
          mx={-6}
          mb={6}

          pos={'relative'}
					align="right"
			>
			<HStack spacing="24px" alignItems="right">
			{preview ?   null :  <IconButton  id='checkButton' icon={<CheckIcon />} onClick={() => handleChange_check() }/> }
			{preview ?   null :  <IconButton  id='closeButton' icon={<CloseIcon />} onClick={() => resetForm()}/> }
			{preview ?   <IconButton  id='checkButton' onClick={() => createNewsDoc() } icon={<UnlockIcon />} /> :  null }
			{preview ?   <IconButton  id='checkButton' icon={<EditIcon />}  onClick={() => setPreview(false) } /> :  null }
				</HStack>
        </Box>


				 { preview ? null: <Box
          h={'50px'}
          mt={-6}
          mx={-6}
          mb={6}
          pos={'relative'}
					align="right"
					>	< Input name="input_url_bild" id="input_url_bild" placeholder="Neuen Bild Link hier einfügen" defaultValue={bildURL} onChange={handleChange_Url_Bild}/> </Box>}


					<Box
          h={'210px'}
          bg={'gray.100'}
          mt={-6}
          mx={-6}
          mb={6}
          pos={'relative'}>
          <Image eight={'210px'} width={'100%'}
            src={
              bildURL
            }
            layout={'fill'}
          />
        </Box>
        <Stack>
          <Text
            color={'Grey.400'}
            fontSize={'sm'}
            letterSpacing={1.1}>
            {currentDay.toString()}
          </Text>
          <Heading
            color={useColorModeValue('gray.700', 'white')}
            fontSize={'2xl'}
            fontFamily={'body'} >
           {preview ? ueberschrift : < Textarea id="textarea_ueberschrift" defaultValue={ueberschrift} as={ResizeTextarea} /> }
          </Heading>
					<Divider orientation="horizontal" />
          <Text color={'gray.500'}>

				{preview ?  text : < Textarea id="textarea_text" defaultValue={text} as={ResizeTextarea}/>}
          </Text>

        </Stack>
        <Stack mt={6} direction={'row'} spacing={4} align={'center'}>

        </Stack>
      </Box>
    </Center>
			</div>
    </Layout>
		</>
  )
}
