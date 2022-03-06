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

	const checkWatchedArr = (job) => {
		const { description } = job;

		for (const item of watchedArr.watchedArr) {
			// console.log(item);
			// console.log(item.description);
			if (description.includes(item.description)) {
				return true;
			} else {
				return false;
			}
		}
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
		// if (data.data === 'Entry added successfully') {
		// 	setWatchedArr({ watchedArr: [...watchedArr.watchedArr, job] });
		// }
		console.log(data);
		// console.log(watchedArr);
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
		// const { description } = job;
		// for (const [idx, item] of watchedArr.watchedArr.entries()) {
		// 	if (description.includes(item.description)) {
		// 		watchedArr.watchedArr.splice(idx, 1);
		// 		setWatchedArr(watchedArr);
		// 	} else {
		// 	}
		// }
		console.log(data);
		// console.log(watchedArr);
	};

	return (
		<div className="App">
			<SearchBar getJobs={getJobs} />
			{jobArr !== null ? (
				<MainList
					jobArr={jobArr}
					watchedArr={watchedArr}
					checkWatchedArr={checkWatchedArr}
					addJob={addJob}
					removeJob={removeJob}
				/>
			) : (
				<></>
			)}
		</div>
	);
}

export default App;
