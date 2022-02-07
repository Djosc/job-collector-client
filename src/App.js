import SearchBar from './components/SearchBar';
import axios from 'axios';
import './App.css';

function App() {
	const getJobs = async ({ jobString, cityString, radius, sort, numberOfPages }) => {
		const jobsEndpoint = 'https://localhost:8080/indeedJobs';

		let queryUrl = jobsEndpoint + '?job=' + jobString;
		queryUrl += '&city=' + cityString;
		queryUrl += '&radius=' + radius;
		queryUrl += '&sort=' + sort;
		queryUrl += '&pages=' + numberOfPages;

		// const qUrlEncoded = encodeURI(queryUrl);

		axios
			// .get(qUrlEncoded)
			.get(queryUrl)
			.then((jobData) => {
				console.log(jobData);
			})
			.catch((err) => console.log(err));
	};

	return (
		<div className="App">
			<SearchBar getJobs={getJobs} />
		</div>
	);
}

export default App;
