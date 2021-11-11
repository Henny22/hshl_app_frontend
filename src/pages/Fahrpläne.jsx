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
	 AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
Button
} from '@chakra-ui/react'
import React, {useState, useEffect} from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Layout } from '../components/Layout'
import { useAuth } from '../contexts/AuthContext'
import { Navbar } from '../components/Navbar'
import { db } from "../firebase-config";
import { IconButton } from "@chakra-ui/react"
import { DeleteIcon,SettingsIcon, ViewIcon, ViewOffIcon, AddIcon } from '@chakra-ui/icons'
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
	query,
	where,
} from "firebase/firestore";





export default function Fahrpläne() {

	const [campusSelected, setcampusSelected] = useState([]);
	const [busSelected, setBusSelected] = useState([]);

	const [fahrplanBusLippstadt, setFahrplanBusLippstadt] = useState([]);
	const [fahrplanZugLippstadt, setFahrplanZugLippstadt] = useState([]);
	const [fahrplanBusHamm, setFahrplanBusHamm] = useState([]);
	const [fahrplanZugHamm, setFahrplanZugHamm] = useState([]);


	useEffect(() => {
			const getCampusplan = async () => {
				setcampusSelected('Lippstadt');
				setBusSelected(true);

				const campusplanLippstadtL1CollectionQuery = query(collection(db, "Fahrplan_Bus_Lippstadt"))
				const campusplanLippstadtL2CollectionQuery = query(collection(db, "Fahrplan_Zug_Lippstadt"))
				const campusplanLippstadtL3CollectionQuery = query(collection(db, "Fahrplan_Bus_Hamm"));
				const campusplanLippstadtL4CollectionQuery = query(collection(db, "Fahrplan_Zug_Hamm"));

				const dataLippstadtL1 = await getDocs(campusplanLippstadtL1CollectionQuery);
				const dataLippstadtL2 = await getDocs(campusplanLippstadtL2CollectionQuery);
				const dataLippstadtL3 = await getDocs(campusplanLippstadtL3CollectionQuery);
				const dataLippstadtL4 = await getDocs(campusplanLippstadtL4CollectionQuery);

				setFahrplanBusLippstadt(dataLippstadtL1.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
				setFahrplanZugLippstadt(dataLippstadtL2.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
				setFahrplanBusHamm(dataLippstadtL3.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
				setFahrplanZugHamm(dataLippstadtL4.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
			};

			getCampusplan();
		}, []);


  return (
   <Layout>
      <Navbar />
			<Heading>Fahrpläne Bus & Bahn</Heading>
      {/* <Text my={6}>{currentUser?.email}</Text> */}

{campusSelected != "Lippstadt" ?
			<Button
      type='submit'
      colorScheme='pink'
      size='lg'
      fontSize='md'
			onClick={() => setcampusSelected('Lippstadt') }>
      Wechseln zu Übersicht Lippstadt
    </Button>

		:
		<Button
      type='submit'
      colorScheme='pink'
      size='lg'
      fontSize='md'
			onClick={() => setcampusSelected('Hamm') }>
    	Wechseln zu Übersicht Hamm
    	</Button>
		}

		{campusSelected == 'Lippstadt' ?
		<Table variant="simple" >
			<Thead>
					<heading>Bus</heading>
				<Tr>
					<Th >Buslinie</Th>
					<Th >Tag</Th>
					<Th >Uhrzeit_Einfahrt</Th>
					<Th >Uhrzeit_Ankunft</Th>
				</Tr>
					</Thead>

					<Tbody>
																			{ fahrplanBusLippstadt.map (fahrplanBusLippstadt=> (
																							<tr key={fahrplanBusLippstadt.id  }>
																									<td align="left" >{fahrplanBusLippstadt.Buslinie  }</td>
																									<td align="left">{fahrplanBusLippstadt.TagTyp }</td>
																									<td align="left">{fahrplanBusLippstadt.Uhrzeit_Einfahrt }</td>
																									<td align="left">{fahrplanBusLippstadt.Uhrzeit_Ankunft }</td>
																									<td align="left">

																												<HStack  spacing='2'>

																												<IconButton  icon={<ViewOffIcon /> } />
																												<Link to={`/fahrpläne_details/${fahrplanBusLippstadt.id}`}>
																												<IconButton  icon={<SettingsIcon />} />
																												</Link>
																												<IconButton  icon={<DeleteIcon />} />
																												</HStack>

																									</td>
																							</tr>
																					))
																			}
						</Tbody>
					</Table>
:
<Table variant="simple">
		<Thead>
					<heading>Bus</heading>
				<Tr>
					<Th >Buslinie</Th>
					<Th >Tag</Th>
					<Th >Uhrzeit_Einfahrt</Th>
					<Th >Uhrzeit_Ankunft</Th>
				</Tr>
					</Thead>

					<Tbody>
																			{ fahrplanBusHamm.map (fahrplanBusHamm=> (
																							<tr key={fahrplanBusHamm.id  }>
																									<td align="left" >{fahrplanBusHamm.Buslinie  }</td>
																									<td align="left">{fahrplanBusHamm.TagTyp }</td>
																									<td align="left">{fahrplanBusHamm.Uhrzeit_Einfahrt }</td>
																									<td align="left">{fahrplanBusHamm.Uhrzeit_Ankunft }</td>
																									<td align="left">

																												<HStack  spacing='2'>
																												<IconButton  icon={<ViewOffIcon /> } />
																												<Link to={`/fahrpläne_details/${fahrplanBusHamm.id}`}>
																												<IconButton  icon={<SettingsIcon />} />
																												</Link>
																												<IconButton  icon={<DeleteIcon />} />
																												</HStack>

																									</td>
																							</tr>
																					))
																			}
						</Tbody>
					</Table>
					}
{campusSelected == 'Lippstadt' ?
		<Table variant="simple">
			<Thead>
					<heading>Zug</heading>
				<Tr>
					<Th >Zug</Th>
					<Th >Gleis</Th>
					<Th >Tag</Th>
					<Th >Uhrzeit_Einfahrt</Th>
				</Tr>
					</Thead>

					<Tbody>
																			{ fahrplanZugLippstadt.map (fahrplanZugLippstadt=> (
																							<tr key={fahrplanBusLippstadt.id  }>
																									<td align="left" >{fahrplanZugLippstadt.Zug  }</td>
																									<td align="left">{fahrplanZugLippstadt.Gleis }</td>
																									<td align="left">{fahrplanZugLippstadt.TagTyp }</td>
																									<td align="left">{fahrplanZugLippstadt.Uhrzeit_Einfahrt }</td>
																									<td align="left">

																												<HStack  spacing='2'>
																												<IconButton  icon={<ViewOffIcon /> } />
																												<Link to={`/fahrpläne_details/${fahrplanZugLippstadt.id}`}>
																												<IconButton  icon={<SettingsIcon />} />
																												</Link>
																												<IconButton  icon={<DeleteIcon />} />
																												</HStack>

																									</td>
																							</tr>
																					))
																			}
						</Tbody>
					</Table>
:
<Table variant="simple">
		<Thead>
					<heading>Zug</heading>
				<Tr>
					<Th >Zug</Th>
					<Th >Gleis</Th>
					<Th >Tag</Th>
					<Th >Uhrzeit_Einfahrt</Th>
				</Tr>
					</Thead>

					<Tbody>
																			{ fahrplanZugHamm.map (fahrplanZugHamm=> (
																							<tr key={fahrplanBusHamm.id  }>
																									<td align="left" >{fahrplanZugHamm.Zug }</td>
																									<td align="left">{fahrplanZugHamm.Gleis }</td>
																									<td align="left">{fahrplanZugHamm.TagTyp }</td>
																									<td align="left">{fahrplanZugHamm.Uhrzeit_Einfahrt }</td>
																									<td align="left">

																												<HStack  spacing='2'>
																												<IconButton  icon={<ViewOffIcon /> } />
																												<Link to={`/fahrpläne_details/${fahrplanZugHamm.id}`}>
																												<IconButton  icon={<SettingsIcon />} />
																												</Link>
																												<IconButton  icon={<DeleteIcon />} />
																												</HStack>

																									</td>
																							</tr>
																					))
																			}
						</Tbody>
					</Table>
					}

    </Layout>
  )
}
