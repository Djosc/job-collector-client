import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';

const MainList = (props) => {
	const { jobArr } = props;

	return (
		<Container fluid className="px-4">
			<h1 className="text-center my-4">Job Results</h1>
			{jobArr.jobArr.map((job, index) => (
				<Row className="justify-content-center" key={index}>
					<Col md={10} className="">
						<Card className="my-3">
							<Card.Header>{job.title}</Card.Header>
							<Card.Body>
								<Card.Title>{job.company}</Card.Title>
								<Card.Subtitle className="py-1 mb-2">{job.location}</Card.Subtitle>
								<Card.Text className="w-75">{job.description}</Card.Text>
							</Card.Body>
							<Card.Body className="d-flex justify-content-between">
								<div>
									<span>{job.tags}</span>
								</div>
								<div>
									<Button
										variant="primary"
										className="mx-3 px-3 py-2"
										onClick={() => props.openFullJob(job.linkToFullJob)}
									>
										View Full Job
									</Button>

									{/* If job is in the watched array, show remove button. 
											If not, show add button */}
									{props.checkWatchedArr(job) ? (
										<Button
											className="mx-3"
											onClick={() => props.removeJob(job)}
											style={{ backgroundColor: 'red' }}
										>
											<BsFillEyeSlashFill style={{ fontSize: '28px' }} />
										</Button>
									) : (
										<Button className="mx-3" onClick={() => props.addJob(job)}>
											<BsFillEyeFill style={{ fontSize: '28px' }} />
										</Button>
									)}
								</div>
							</Card.Body>
							<Card.Footer>{job.postDate}</Card.Footer>
						</Card>
					</Col>
				</Row>
			))}
		</Container>
	);
};

export default MainList;
