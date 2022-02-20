import React, { useState } from 'react';
import { Form, FloatingLabel, Button, Row, Col, Container } from 'react-bootstrap';

const SearchBar = (props) => {
	const [jobString, setJobString] = useState('');
	const [cityString, setCityString] = useState('');
	const [radius, setRadius] = useState('25');
	const [sort, setSort] = useState('relevance');
	const [numberOfPages, setNumberOfPages] = useState('1');

	const handleSubmit = (e) => {
		e.preventDefault();
		props.getJobs({
			jobString: jobString,
			cityString: cityString,
			radius: radius,
			sort: sort,
			numberOfPages: numberOfPages,
		});
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
					</Col>
				</Row>
				<Row md="auto" sm="auto" lg="auto" className="justify-content-start px-2 mx-2">
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
				</Row>
			</Container>
		</div>
	);
};

export default SearchBar;
