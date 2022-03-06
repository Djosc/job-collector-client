import React, { useState } from 'react';
import { Form, FloatingLabel, Button, Row, Col, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const SearchBar = (props) => {
	const [jobString, setJobString] = useState('');
	const [cityString, setCityString] = useState('');
	const [radius, setRadius] = useState('25');
	const [sort, setSort] = useState('relevance');
	const [numberOfPages, setNumberOfPages] = useState('1');

	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();
		props.getJobs({
			jobString: jobString,
			cityString: cityString,
			radius: radius,
			sort: sort,
			numberOfPages: numberOfPages,
		});
		navigate('/mainList');
	};

	return (
		<div className="search-bar-wrap">
			<Container fluid className="px-2">
				<Row className="justify-content-sm-center align-items-center text-center mt-4 mx-3">
					<Col sm={6} md={5}>
						<FloatingLabel
							controlId="floatingInput"
							label="Job Title (eg. Web Developer)"
							className="mb-3"
						>
							<Form.Control
								type="text"
								value={jobString}
								onChange={(e) => setJobString(e.target.value)}
								placeholder="Job Title"
							/>
						</FloatingLabel>
					</Col>
					<Col sm={5} md={5}>
						<FloatingLabel
							controlId="floatingInput"
							label="City (eg. Dayton, OH)"
							className="mb-3"
						>
							<Form.Control
								type="text"
								value={cityString}
								onChange={(e) => setCityString(e.target.value)}
								placeholder="City"
							/>
						</FloatingLabel>
					</Col>
					<Col sm={6} md={2} className="">
						<Link to="/mainList">
							<Button
								variant="primary"
								size="lg"
								type="submit"
								onClick={handleSubmit}
								className="mb-2"
								style={{ minWidth: '80%' }}
							>
								Search
							</Button>
						</Link>
					</Col>
				</Row>
				<Row
					md="auto"
					sm="auto"
					lg="auto"
					className="justify-content-between px-2 mx-2 mb-3"
				>
					{/* <div className="bar-inputs-left"> */}
					<Col>
						<Form.Label>Search Radius</Form.Label>
						<Form.Select
							style={{ width: 'min-content' }}
							onChange={(e) => {
								setRadius(e.target.value);
							}}
						>
							<option value="25">25 mi.</option>
							<option value="50">50 mi.</option>
							<option value="75">75 mi.</option>
							<option value="100">100 mi.</option>
						</Form.Select>
					</Col>
					<Col>
						<Form.Label>Sort by</Form.Label>
						<Form.Select
							style={{ width: 'min-content' }}
							onChange={(e) => {
								setSort(e.target.value);
							}}
						>
							<option value="relevance">Relevance</option>
							<option value="date">Date</option>
						</Form.Select>
					</Col>
					<Col>
						<Form.Label># of Pages</Form.Label>
						<Form.Select
							style={{ width: 'min-content' }}
							onChange={(e) => {
								setNumberOfPages(e.target.value);
							}}
						>
							<option value="1">1</option>
							<option value="2">2</option>
							<option value="3">3</option>
							<option value="4">4</option>
							<option value="5">5</option>
						</Form.Select>
					</Col>
					{/* </div> */}
					{/* buttons are not centered on some screen sizes */}
					<div className="bar-buttons-right d-flex text-center align-items-center mt-3">
						<Col>
							<Link to="/mainList">
								<Button
									variant="primary"
									size="lg"
									type="submit"
									className="mx-2"
									style={{ minWidth: 'max-content' }}
								>
									Jobs
								</Button>
							</Link>
						</Col>
						<Col>
							<Link to="/watchList">
								<Button
									variant="primary"
									size="lg"
									type="submit"
									className="mx-2"
									style={{ minWidth: 'max-content' }}
								>
									Watched
								</Button>
							</Link>
						</Col>
						<Col>
							<Button
								variant="primary"
								size="lg"
								type="submit"
								className="mx-2"
								style={{ minWidth: 'max-content' }}
							>
								Export to CSV
							</Button>
						</Col>
					</div>
				</Row>
			</Container>
		</div>
	);
};

export default SearchBar;
