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
	Select,
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

export default function FahrpläneErstellen() {
	const history = useHistory()
	const [standort, setStandort] = useState([]);
	const [transport, setTransport] = useState([]);
	const [bus, setBus]= useState([]);
	const [zug, setZug]= useState([]);
	const [gleis, setGleis]= useState([]);
	const [preview, setPreview] = useState(false)
	const [tag,setTag] = useState([]);
	const [id,setID] = useState([]);
	const [haltestelleAbfahrt, setHaltestelleAbfahrt ] = useState([]);
	const [haltestelleEinfahrt, setHaltestelleEinfahrt ] = useState([]);
	const [uhrzeitEinfahrt, setUhrzeitEinfahrt ] = useState([]);
	const [uhrzeitAnkunft, setUhrzeitAnkunft ] = useState([]);
	const	[haltestellen, setHaltstellen] = useState([]);

	useEffect(() => {
		setStandort("Lippstadt")
		setTransport("Bus");
		}, []);

const handleChange_check = (event) => {
	setStandort(document.getElementById("select_standort").value)
	setTransport(document.getElementById("select_transport").value)
	setTag(document.getElementById("select_tag").value)
	setID(document.getElementById("input_id").value)


	if(transport == "Bus"){
		setBus(document.getElementById("input_bus").value)
		setHaltestelleAbfahrt(document.getElementById("input_haltestelleAbfahrt").value)
		setHaltestelleEinfahrt(document.getElementById("input_haltestelleEinfahrt").value)
		setUhrzeitEinfahrt(document.getElementById("input_uhrzeitEinfahrt").value)
		setUhrzeitAnkunft(document.getElementById("input_uhrzeitAnkunft").value)
	}else if (transport =="Bahn"){
	setZug(document.getElementById("input_zug").value)
	setGleis(document.getElementById("input_gleis").value)
	setHaltestelleAbfahrt(document.getElementById("input_haltestelleAbfahrt").value)
	setHaltestelleEinfahrt(document.getElementById("input_haltestelleEinfahrt").value)
	setUhrzeitEinfahrt(document.getElementById("input_uhrzeitEinfahrt").value)
	setUhrzeitAnkunft(document.getElementById("input_uhrzeitAnkunft").value)
	setHaltstellen(document.getElementById("textarea_haltstellen").value)
	}
	setPreview(true)
}

const resetForm = (event) => {
	setID("")
	setBus("")
	setHaltestelleAbfahrt("")
	setHaltestelleEinfahrt("")
	setUhrzeitEinfahrt("")
	setUhrzeitAnkunft("")
	setZug("")
	setGleis("")
	setHaltestelleAbfahrt("")
	setUhrzeitEinfahrt("")
	setUhrzeitAnkunft("")
	setHaltstellen("")

		document.getElementById("input_id").value = "";

		if(transport == "Bus"){
		document.getElementById("input_bus").value = "";
		document.getElementById("input_haltestelleAbfahrt").value = "";
		document.getElementById("input_haltestelleEinfahrt").value = "";
		document.getElementById("input_uhrzeitEinfahrt").value = "";
		document.getElementById("input_uhrzeitAnkunft").value = "";
		}else if (transport =="Bahn"){
		document.getElementById("input_haltestelleAbfahrt").value = "";
		document.getElementById("input_uhrzeitEinfahrt").value = "";
		document.getElementById("input_uhrzeitAnkunft").value = "";
		document.getElementById("input_zug").value = "";
		document.getElementById("input_gleis").value = "";
		document.getElementById("textarea_haltstellen").value = "";
		}
}


const creatFahrplanDoc = () =>{

	if(standort == "Lippstadt" && transport =="Bahn" || standort == "Hamm" && transport =="Bahn" ){
		var einfahrtStunde = uhrzeitEinfahrt.slice(0,2);
		var einfahrtMinuten= uhrzeitEinfahrt.slice(3,5);
	}else{
		var einfahrtStunde = uhrzeitEinfahrt.slice(0,2);
		var einfahrtMinuten= uhrzeitEinfahrt.slice(3,5);
		var ankunftStunde = uhrzeitAnkunft.slice(0,2);
		var ankunftMinuten= uhrzeitAnkunft.slice(3,5);
	}

	if(standort == "Lippstadt" && transport =="Bus"){

		addDoc(collection(db, "Fahrplan_Bus_Lippstadt"), {
			Buslinie: bus,
			Haltestelle_Abfahrt_Name: haltestelleAbfahrt,
			Haltestelle_Ankunft_Name: haltestelleEinfahrt,
			TagTyp: tag,
			Uhrzeit_Ankunft: uhrzeitAnkunft,
			Uhrzeit_Einfahrt: uhrzeitEinfahrt,
			id: parseInt(id),
			}).then((res) =>{
		history.push("/fahrpläne");
	});
	} else if (standort == "Lippstadt" && transport =="Bahn"){
			addDoc(collection(db, "Fahrplan_Zug_Lippstadt"), {
			Gleis: gleis,
			Zug: zug,
			Haltestelle_Abfahrt_Name: haltestelleAbfahrt,
			Haltestelle_Ankunft_Name: haltestelleEinfahrt,
			Haltestellen: haltestellen,
			TagTyp: tag,
			Uhrzeit_Einfahrt: uhrzeitEinfahrt,
			id: parseInt(id),
			}).then((res) =>{
		history.push("/fahrpläne");
	});
	}	else if (standort == "Hamm" && transport =="Bus"){
			addDoc(collection(db, "Fahrplan_Bus_Hamm"), {
			Buslinie: bus,
			Haltestelle_Abfahrt_Name: haltestelleAbfahrt,
			Haltestelle_Ankunft_Name: haltestelleEinfahrt,
			TagTyp: tag,
			Uhrzeit_Ankunft: new Date(2021,11,3, ankunftStunde,ankunftMinuten),
			Uhrzeit_Einfahrt: new Date(2021,11,3, einfahrtStunde,einfahrtMinuten),
			id: parseInt(id),
			}).then((res) =>{
		history.push("/fahrpläne");
	});
	} else if (standort == "Hamm" && transport =="Bahn"){
			addDoc(collection(db, "Fahrplan_Zug_Hamm"), {
			Gleis: gleis,
			Zug: zug,
			Haltestelle_Abfahrt_Name: haltestelleAbfahrt,
			Haltestelle_Ankunft_Name: haltestelleEinfahrt,
			Haltestellen: haltestellen,
			TagTyp: tag,
			Uhrzeit_Einfahrt: new Date(2021,12,3, einfahrtStunde,einfahrtMinuten),
			id: parseInt(id),
			}).then((res) =>{
		history.push("/fahrpläne");
	});
	}
}

  return (
	<>
   <Layout>
      <Navbar />
			<Heading>	<IconButton icon={<ArrowBackIcon /> } onClick={() => history.goBack()}/> News</Heading>
      {/* <Text my={6}>{currentUser?.email}</Text> */}

			<Center py={6}>
      <Box
        maxW={'445px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.900')}
        boxShadow={'2xl'}
        rounded={'md'}
        p={10}
        overflow={'hidden'}>

				<HStack alignItems="right" mb={5}>
					{preview ? null : <IconButton  id='checkButton' icon={<CheckIcon />}  onClick={() => handleChange_check() } /> }
					{preview ? null : <IconButton  id='closeButton' icon={<CloseIcon />} onClick={() => resetForm()} /> }
					{preview ?   <IconButton  id='checkButton'  onClick={() => creatFahrplanDoc() } icon={<UnlockIcon />} /> :  null }
					{preview ?   <IconButton  id='checkButton' icon={<EditIcon />}  onClick={() => setPreview(false) } /> :  null }
				</HStack>

				{preview ? null :
					"Standort:" }
					{preview ? standort : <Select id="select_standort" size="md"  defaultValue={"Lippstadt"}>
							<option id="select_lippstadt"value="Lippstadt" onClick={() => setStandort("Lippstadt")}>Lippstadt</option>
							<option id="select_Hamm"value="Hamm"  onClick={() => setStandort("Hamm")} >Hamm</option>
					</Select>
				}
				 {preview ?"  |   "  : null  }
					{preview ? null :
					"Transport :" }
						{preview ? transport :
					<Select id="select_transport" size="md"  defaultValue={"Bus"}>
							<option id="select_bus"value="Bus" onClick={() => setTransport("Bus")}>Bus</option>
							<option id="select_bahn"value="Bahn"  onClick={() => setTransport("Bahn")} >Bahn</option>
					</Select>
					}
					 {preview ?"  |   "  : null  }

					{preview ? null :
					"Tag:" }
					{preview ? tag :
					<Select id="select_tag" size="md"  defaultValue={"WT"}>
							<option id="select_wt"value="WT">WT</option>
							<option id="select_sa"value="SA" >SA</option>
							<option id="select_si"value="SO">SO</option>
					</Select>
					}
				{transport == "Bus" ?

				<Stack mt={4}>
				{preview ? <p> id: {id}</p> : 									< Input type="number" id="input_id" placeholder="ID" defaultValue={id} /> }
				{preview ? <p>bus: {bus}</p> : 										< Input id="input_bus"  placeholder="Bus (z.B. R63)"  defaultValue={bus} /> }
				{preview ? <p>haltestelleAbfahrt: {haltestelleAbfahrt}</p> :			< Input id="input_haltestelleAbfahrt" placeholder="Haltestelle Abfahrt"  defaultValue={haltestelleAbfahrt} />}
				{preview ? <p>haltestelleEinfahrt: {haltestelleEinfahrt}</p> :		< Input id="input_haltestelleEinfahrt" placeholder="Haltestelle Einfahrt"  defaultValue={haltestelleEinfahrt}/>}
				{preview ? <p>uhrzeitEinfahrt: {uhrzeitEinfahrt}</p> :				< Input id="input_uhrzeitEinfahrt" placeholder="Uhrzeit Einfahrt" defaultValue={uhrzeitEinfahrt}/>}
				{preview ? <p>uhrzeitAnkunft: {uhrzeitAnkunft}</p> :					< Input id="input_uhrzeitAnkunft" placeholder="Uhrzeit Ankunft" defaultValue={uhrzeitAnkunft} />}
				</Stack>



				:

				<Stack mt={4}>
					{preview ? <p> id: {id}</p> : < Input id="input_id" placeholder="ID" defaultValue={id} /> }
					{preview ? <p> Zug: {zug}</p> : < Input id="input_zug" placeholder="Zug (z.B. RB 89)" defaultValue={zug}/>}
					{preview ? <p> Gleis: {gleis}</p> : < Input id="input_gleis" placeholder="Gleis" defaultValue={gleis}/>}
				{preview ? <p> HaltestelleAbfahrt: {haltestelleAbfahrt}</p> : 	< Input id="input_haltestelleAbfahrt" placeholder="Haltestelle Abfahrt" defaultValue={haltestelleAbfahrt}/>}
					{preview ? <p>haltestelleEinfahrt: {haltestelleEinfahrt}</p> :		< Input id="input_haltestelleEinfahrt" placeholder="Haltestelle Einfahrt"  defaultValue={haltestelleEinfahrt}/>}
				{preview ? <p> UhrzeitEinfahrt: {uhrzeitEinfahrt}</p> : 	< Input id="input_uhrzeitEinfahrt" placeholder="Uhrzeit Einfahrt" defaultValue={uhrzeitEinfahrt}/>}
				{preview ? <p> UhrzeitAnkunft: {uhrzeitAnkunft}</p> : 	< Input id="input_uhrzeitAnkunft" placeholder="Uhrzeit Ankunft" defaultValue={uhrzeitAnkunft}/>}
				{preview ? <p> Haltestellen: {haltestellen}</p> : 	< Textarea id="textarea_haltstellen"  placeholder="Haltestellen" as={ResizeTextarea} defaultValue={haltestellen}/>}
		  	</Stack>

				}

			</Box>
			</Center>
    </Layout>
		</>
  )
}
