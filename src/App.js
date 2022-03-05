import { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import MainList from './components/MainList';
import axios from 'axios';
import './App.css';

function App() {
	const [jobArr, setJobArr] = useState(null);
	const [watchedArr, setWatchedArr] = useState(null);

	useEffect(() => {
		// Read from backend db.json file and populate watchedArr on first render
		axios
			.get('http://localhost:8080/watchList')
			.then((data) => {
				console.log(data);
				console.log(data.data.jobs);
				setWatchedArr({
					watchedArr: data.data.jobs,
				});
			})
			.catch((err) => console.log(err));
	}, []);

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
				setJobArr({
					jobArr: data.data,
				});
			})
			.catch((err) => console.log(err));
	};

	const addJob = async (job) => {
		const data = await axios.post('http://localhost:8080/addJob', {
			title: job.title,
			company: job.company,
			location: job.location,
			tags: job.tags,
			postDate: job.postDate,
			description: job.description,
			linkToFullJob: job.linkToFullJob,
		});
		console.log(data);
	};

	const removeJob = async (job) => {
		const data = await axios.delete('http://localhost:8080/removeJob', {
			data: {
				title: job.title,
				company: job.company,
				location: job.location,
				tags: job.tags,
				postDate: job.postDate,
				description: job.description,
				linkToFullJob: job.linkToFullJob,
			},
		});
		console.log(data);
	};

	return (
		<div className="App">
			<SearchBar getJobs={getJobs} />
			{jobArr !== null ? (
				<MainList jobArr={jobArr} addJob={addJob} removeJob={removeJob} />
			) : (
				<></>
			)}
		</div>
	);
}

export default App;
