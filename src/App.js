import { useState } from 'react';
import SearchBar from './components/SearchBar';
import MainList from './components/MainList';
import axios from 'axios';
import './App.css';

function App() {
	const [jobArr, setJobArr] = useState(null);

	const getJobs = async ({ jobString, cityString, radius, sort, numberOfPages }) => {
		const jobsEndpoint = 'http://localhost:8080/indeedJobs';

		let queryUrl = jobsEndpoint + '?job=' + jobString;
		queryUrl += '&city=' + cityString;
		queryUrl += '&radius=' + radius;
		queryUrl += '&sort=' + sort;
		queryUrl += '&pages=' + numberOfPages;

		// const qUrlEncoded = encodeURI(queryUrl);

		axios
			.get(queryUrl)
			.then((data) => {
				// console.log(data.data);
				setJobArr({
					jobArr: data.data,
				});
				// setTimeout(console.log(jobArr[0].title), 5000);
			})
			.catch((err) => console.log(err));
	};

	return (
		<div className="App">
			<SearchBar getJobs={getJobs} />
			{jobArr !== null ? <MainList jobArr={jobArr} /> : <></>}
		</div>
	);
}

export default App;
