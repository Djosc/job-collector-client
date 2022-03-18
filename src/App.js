import { useState, useEffect } from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import SearchBar from './components/SearchBar';
import MainList from './components/MainList';
import WatchList from './components/WatchList';
import JobsPagination from './components/JobsPagination';

import './App.css';

function App() {
	const [currentJobsArr, setCurrentJobsArr] = useState(null);
	const [allJobsArr, setAllJobsArr] = useState(null);
	const [watchedArr, setWatchedArr] = useState(null);

	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [hasNextPage, setHasNextPage] = useState(true);
	const [jobsPerPage, setJobsPerPage] = useState(15);

	const [effectTrigger, setEffectTrigger] = useState(false);

	useEffect(() => {
		// Read from backend db.json file and populate watchedArr on first render
		axios
			.get('http://localhost:8080/watchList')
			.then((data) => {
				console.log(data);
				console.log(data.data.jobs);
				return data;
			})
			.then((data) => {
				setWatchedArr({
					watchedArr: data.data.jobs,
				});
			})
			.catch((err) => console.log(err));
	}, [effectTrigger]);

	const getJobs = async ({ jobString, cityString, radius, sort, numberOfPages }) => {
		const jobsEndpoint = 'http://localhost:8080/indeedJobs';

		let queryUrl = jobsEndpoint + '?job=' + jobString;
		queryUrl += '&city=' + cityString;
		queryUrl += '&radius=' + radius;
		queryUrl += '&sort=' + sort;
		queryUrl += '&pages=' + numberOfPages;

		setTotalPages({ numberOfPages });
		console.log(totalPages);

		axios
			.get(queryUrl)
			.then((data) => {
				setAllJobsArr({
					allJobsArr: data.data,
				});
			})
			.catch((err) => console.log(err));
	};

	// Slice off one page of jobs and store it with setCurrentJobsArr
	const setCurrentJobs = () => {
		const indexOfLastJob = currentPage * jobsPerPage;
		const indexOfFirstJob = indexOfLastJob - jobsPerPage;
		const currentJobs = allJobsArr.allJobsArr.slice(indexOfFirstJob, indexOfLastJob);

		console.log(currentJobs);

		setCurrentJobsArr({
			currentJobsArr: currentJobs,
		});
	};

	// This will run when allJobsArr populates and when the current page changes
	useEffect(() => {
		if (allJobsArr === null) return;

		setCurrentJobs();
	}, [allJobsArr, currentPage]);

	const handlePageSwitch = ({ page }) => {};

	const checkWatchedArr = (job) => {
		const { description } = job;

		for (const item of watchedArr.watchedArr) {
			if (description.includes(item.description)) {
				return true;
			}
		}
		return false;
	};

	const checkApplied = (job) => {
		const { applied } = job;
		// console.log(job.applied);
		if (applied === true) {
			return true;
		}
		return false;
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
			applied: false,
		});
		setEffectTrigger(!effectTrigger);
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
				applied: false,
			},
		});
		setEffectTrigger(!effectTrigger);
		console.log(data);
	};

	const markApplied = async (job) => {
		const data = await axios.put('http://localhost:8080/markApplied', {
			description: job.description,
			applied: false,
		});
		setEffectTrigger(!effectTrigger);
		console.log(data);
	};

	const unmarkApplied = async (job) => {
		const data = await axios.put('http://localhost:8080/unmarkApplied', {
			description: job.description,
			applied: true,
		});
		setEffectTrigger(!effectTrigger);
		console.log(data);
	};

	const openFullJob = (link) => {
		const url = link;
		window.open(url, '_blank');
	};

	const headers = [
		{ label: 'Title', key: 'title' },
		{ label: 'Company', key: 'company' },
		{ label: 'Location', key: 'location' },
		{ label: 'Tags', key: 'tags' },
		{ label: 'Post Date', key: 'postDate' },
		{ label: 'Description', key: 'description' },
		{ label: 'Link to Job', key: 'linkToFullJob' },
		{ label: 'Applied', key: 'applied' },
	];

	return (
		<div className="App">
			<Router>
				<SearchBar getJobs={getJobs} watchedArr={watchedArr} headers={headers} />
				<Routes>
					<Route
						path="/"
						element={
							<>
								<h1 className="text-center my-4">Enter a Search</h1>
							</>
						}
					></Route>
					{/* Check if job array is populated.
					 When it is, render list; otherwise render nothing and wait */}
					{currentJobsArr !== null ? (
						<Route
							path="/mainList"
							element={
								<>
									<div className="pagination-wrap">
										<div className="pagination-el">
											<JobsPagination
												currentPage={currentPage}
												setCurrentPage={setCurrentPage}
												totalPages={totalPages}
												setTotalPages={setTotalPages}
												hasNextPage={hasNextPage}
											/>
										</div>
										<h1 className="text-center my-4">Job Results</h1>
									</div>
									<MainList
										currentJobsArr={currentJobsArr}
										watchedArr={watchedArr}
										checkWatchedArr={checkWatchedArr}
										checkApplied={checkApplied}
										addJob={addJob}
										removeJob={removeJob}
										markApplied={markApplied}
										unmarkApplied={unmarkApplied}
										openFullJob={openFullJob}
									/>
									<div className="pagination-wrap">
										<div className="pagination-el">
											<JobsPagination
												currentPage={currentPage}
												setCurrentPage={setCurrentPage}
												totalPages={totalPages}
												setTotalPages={setTotalPages}
												hasNextPage={hasNextPage}
											/>
										</div>
									</div>
								</>
							}
						></Route>
					) : (
						<Route path="/mainList" element={<></>}></Route>
					)}
					{watchedArr !== null ? (
						<Route
							path="/watchList"
							element={
								<WatchList
									watchedArr={watchedArr}
									checkWatchedArr={checkWatchedArr}
									checkApplied={checkApplied}
									addJob={addJob}
									removeJob={removeJob}
									markApplied={markApplied}
									unmarkApplied={unmarkApplied}
									openFullJob={openFullJob}
								/>
							}
						></Route>
					) : (
						<></>
					)}
				</Routes>
			</Router>
		</div>
	);
}

export default App;
