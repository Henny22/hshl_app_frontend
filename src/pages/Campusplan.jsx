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
Button
} from '@chakra-ui/react'
import React, {useState, useEffect} from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Layout } from '../components/Layout'
import { useAuth } from '../contexts/AuthContext'
import { db } from "../firebase-config";
import { Navbar } from '../components/Navbar'
import { DeleteIcon,SettingsIcon, ViewIcon, ViewOffIcon, AddIcon } from '@chakra-ui/icons'
import { IconButton } from "@chakra-ui/react"
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
import { getAuth, deleteUser } from "firebase/auth";

export default function Campusplan() {

	const [campusplanLippstadt, setCampusplanLippstadt] = useState([]);
	const [campusplanLippstadtL1, setCampusplanLippstadtL1] = useState([]);
	const [campusplanLippstadtL2, setCampusplanLippstadtL2] = useState([]);
	const [campusplanLippstadtL3, setCampusplanLippstadtL3] = useState([]);
	const [campusplanLippstadtL4, setCampusplanLippstadtL4] = useState([]);



	const [campusplanHamm, setCampusplanHamm] = useState([]);
	const [campusSelected, setcampusSelected] = useState([]);


	useEffect(() => {
			const getCampusplan = async () => {
				setcampusSelected('Lippstadt');


				const campusplanLippstadtL1CollectionQuery = query(collection(db, "CampusPlan"), where("Gebaeude", "==", "L1"));
				const campusplanLippstadtL2CollectionQuery = query(collection(db, "CampusPlan"), where("Gebaeude", "==", "L2"));
				const campusplanLippstadtL3CollectionQuery = query(collection(db, "CampusPlan"), where("Gebaeude", "==", "L3"));
				const campusplanLippstadtL4CollectionQuery = query(collection(db, "CampusPlan"), where("Gebaeude", "==", "L4"));

				const dataLippstadtL1 = await getDocs(campusplanLippstadtL1CollectionQuery);
				const dataLippstadtL2 = await getDocs(campusplanLippstadtL2CollectionQuery);
				const dataLippstadtL3 = await getDocs(campusplanLippstadtL3CollectionQuery);
				const dataLippstadtL4 = await getDocs(campusplanLippstadtL4CollectionQuery);

				setCampusplanLippstadtL1(dataLippstadtL1.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
				setCampusplanLippstadtL2(dataLippstadtL2.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
				setCampusplanLippstadtL3(dataLippstadtL3.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
				setCampusplanLippstadtL4(dataLippstadtL4.docs.map((doc) => ({ ...doc.data(), id: doc.id })));


				const campusplanHammCollectionQuery = query(collection(db, "CampusPlan"), where("Campus", "==", "Hamm"));
				const dataHamm = await getDocs(campusplanHammCollectionQuery);

				setCampusplanHamm(dataHamm.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
			};

			getCampusplan();
		}, []);

	const consolelogevent = (button) => {
		console.log(campusplanLippstadtL3)
}

  return (
   <Layout>
      <Navbar />

      {/* <Text my={6}>{currentUser?.email}</Text> */}
		<HStack>
		{campusSelected != "Lippstadt" ?
			<Button
      type='submit'
      colorScheme='pink'
      size='lg'
      fontSize='md'
			onClick={() => setcampusSelected('Lippstadt') }
      >
      Wechseln zu Übersicht Lippstadt
    </Button>

		:
		<Button
      type='submit'
      colorScheme='pink'
      size='lg'
      fontSize='md'
			onClick={() => setcampusSelected('Hamm') }
			>
    	Wechseln zu Übersicht Hamm
    	</Button>
		}
		<Link to={`/campusplan_erstellen`}>
		<IconButton  icon={<AddIcon />} />
		</Link>
		</HStack>
		<div>
		{campusSelected == 'Lippstadt' ?
		<Table variant="simple">
			<Thead>
					<heading>L1</heading>
				<Tr>
					<Th >Gebaeude + Raumbezeichnung</Th>
					<Th >RaumName</Th>
					<Th >Bearbeiten</Th>
				</Tr>
					</Thead>

					<Tbody>
																			{ campusplanLippstadtL1.map (campusplanLippstadt=> (
																							<tr key={campusplanLippstadt.id  }>
																									<td align="left" >{campusplanLippstadt.RaumBezeichnung  }</td>
																									<td align="left">{campusplanLippstadt.RaumName }</td>
																									<td align="left">

																												<HStack  spacing='2'>
																												<IconButton  icon={<ViewOffIcon /> } />
																												<Link to={`/campusplan_details/${campusplanLippstadt.id}`}>
																												<IconButton  icon={<SettingsIcon />} />
																												</Link>
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
				<heading>H 1.1</heading>
				<Tr>
					<Th >Gebaeude + Raumbezeichnung</Th>
					<Th >RaumName</Th>
					<Th >Bearbeiten</Th>
				</Tr>
					</Thead>
						<Tbody>
																			{ campusplanHamm.map (campusplanHamm=> (
																							<tr key={campusplanHamm.id  }>
																									<td align="left" >{campusplanHamm.RaumBezeichnung  }</td>
																									<td align="left">{campusplanHamm.RaumName   }</td>
																									<td align="left">

																												<HStack  spacing='2'>
																												<IconButton  icon={<ViewOffIcon /> } />
																												<Link to={`/campusplan_details/${campusplanHamm.id}`}>
																													<IconButton  icon={<SettingsIcon />} />
																												</Link>
																												</HStack>

																									</td>
																							</tr>
																					))
																			}
						</Tbody>




					</Table>


					}


					</div>
<div>
		{campusSelected == 'Lippstadt' ?
		<Table variant="simple">
			<Thead>
					<heading>L2</heading>
				<Tr>
					<Th >Gebaeude + Raumbezeichnung</Th>
					<Th >RaumName</Th>
					<Th >Bearbeiten</Th>
				</Tr>
					</Thead>

					<Tbody>
																			{ campusplanLippstadtL2.map (campusplanLippstadtL1=> (
																							<tr key={campusplanLippstadtL1.id  }>
																									<td align="left" >{campusplanLippstadtL1.RaumBezeichnung  }</td>
																									<td align="left">{campusplanLippstadtL1.RaumName   }</td>
																									<td align="left">

																												<HStack  spacing='2'>
																												<IconButton  icon={<ViewOffIcon /> } />
																												<Link to={`/campusplan_details/${campusplanLippstadtL1.id}`}>
																												<IconButton  icon={<SettingsIcon />} />
																												</Link>
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
				<heading>H 1.2</heading>
				<Tr>
					<Th >Gebaeude + Raumbezeichnung</Th>
					<Th >RaumName</Th>
					<Th >Bearbeiten</Th>
				</Tr>
					</Thead>
						<Tbody>
																			{ campusplanHamm.map (campusplanHamm=> (
																							<tr key={campusplanHamm.id  }>
																									<td align="left" >{campusplanHamm.RaumBezeichnung  }</td>
																									<td align="left">{campusplanHamm.RaumName   }</td>
																									<td align="left">

																												<HStack  spacing='2'>
																												<IconButton  icon={<ViewOffIcon /> } />
																												<Link to={`/campusplan_details/${campusplanHamm.id}`}>
																												<	IconButton  icon={<SettingsIcon />} />
																												</Link>
																												</HStack>

																									</td>
																							</tr>
																					))
																			}
						</Tbody>
					</Table>
					}
					</div>

<div>
		{campusSelected == 'Lippstadt' ?
		<Table variant="simple">
			<Thead>
					<heading>L3</heading>
				<Tr>
					<Th >Gebaeude + Raumbezeichnung</Th>
					<Th >RaumName</Th>
					<Th >Bearbeiten</Th>
				</Tr>
					</Thead>

					<Tbody>
																			{ campusplanLippstadtL3.map (campusplanLippstadt=> (
																							<tr key={campusplanLippstadt.id  }>

																									<td align="left" >{campusplanLippstadt.RaumBezeichnung  }</td>
																									<td align="left">{campusplanLippstadt.RaumName }</td>
																									<td align="left">

																												<HStack  spacing='2'>
																												<IconButton  icon={<ViewOffIcon /> } />
																												<Link to={`/campusplan_details/${campusplanLippstadt.id}`}>
																													<IconButton  icon={<SettingsIcon />} />
																												</Link>
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
				<heading>H 2.1</heading>
				<Tr>
					<Th >Gebaeude + Raumbezeichnung</Th>
					<Th >RaumName</Th>
					<Th >Bearbeiten</Th>
				</Tr>
					</Thead>
						<Tbody>
																			{ campusplanHamm.map (campusplanHamm=> (
																							<tr key={campusplanHamm.id  }>
																									<td align="left" >{campusplanHamm.RaumBezeichnung  }</td>
																									<td align="left">{campusplanHamm.RaumName   }</td>
																									<td align="left">

																												<HStack  spacing='2'>
																												<IconButton  icon={<ViewOffIcon /> } />
																												<Link to={`/campusplan_details/${campusplanHamm.id}`}>
																												<IconButton  icon={<SettingsIcon />} />
																												</Link>
																												</HStack>

																									</td>
																							</tr>
																					))
																			}
						</Tbody>
					</Table>
					}
					</div>

<div>
		{campusSelected == 'Lippstadt' ?
		<Table variant="simple">
			<Thead>
					<heading>L4</heading>
				<Tr>
					<Th >Gebaeude + Raumbezeichnung</Th>
					<Th >RaumName</Th>
					<Th >Bearbeiten</Th>
				</Tr>
					</Thead>

					<Tbody>
																			{ campusplanLippstadtL4.map (campusplanLippstadt=> (
																							<tr key={campusplanLippstadt.id  }>
																									<td align="left" >{campusplanLippstadt.RaumBezeichnung  }</td>
																									<td align="left">{campusplanLippstadt.RaumName   }</td>
																									<td align="left">

																												<HStack  spacing='2'>
																												<IconButton  icon={<ViewOffIcon /> } />
																												<Link to={`/campusplan_details/${campusplanLippstadt.id}`}>
																												<IconButton  icon={<SettingsIcon />} />
																												</Link>
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
				<heading >H 4.1-3</heading>
				<Tr>
					<Th >Gebaeude + Raumbezeichnung</Th>
					<Th >RaumName</Th>
					<Th >Bearbeiten</Th>
				</Tr>
					</Thead>
						<Tbody>
																			{ campusplanHamm.map (campusplanHamm=> (
																							<tr key={campusplanHamm.id  }>
																									<td align="left" >{campusplanHamm.RaumBezeichnung  }</td>
																									<td align="left">{campusplanHamm.RaumName   }</td>
																									<td align="left">

																												<HStack  spacing='2'>
																												<IconButton  icon={<ViewOffIcon /> } />
																												<Link to={`/campusplan_details/${campusplanHamm.id}`}>
																												<IconButton  icon={<SettingsIcon />} />
																												</Link>
																												</HStack>

																									</td>
																							</tr>
																					))
																			}
						</Tbody>
					</Table>
					}
					</div>

				</Layout>
  )
}
