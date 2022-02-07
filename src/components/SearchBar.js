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
		// console.log(cityString, jobString);
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
				<Row className="justify-content-center align-items-center mt-4 mx-3">
					<Col sm={5} md={5}>
						<FloatingLabel
							controlId="floatingInput"
							label="Job Title (eg. Web Developer)"
							className="mb-3"
						>
							<Form.Control
								type="text"
								value={jobString}
								onChange={(e) => setJobString(e.target.value)}
							></Form.Control>
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
							></Form.Control>
						</FloatingLabel>
					</Col>
					<Col sm={2} md={2} className="">
						<Button
							variant="primary"
							size="lg"
							type="submit"
							onClick={handleSubmit}
							className="mb-2"
						>
							Search
						</Button>
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export default SearchBar;
