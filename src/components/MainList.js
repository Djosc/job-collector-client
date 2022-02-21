import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';

const MainList = (props) => {
	const { jobArr } = props;

	const openFullJob = (link) => {
		const url = link;
		window.open(url, '_blank');
	};

	return (
		<Container fluid className="px-4">
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
							{/* <Card.Body className="d-flex justify-content-end"> */}
							<Card.Body className="d-flex justify-content-between">
								<div>
									<span>{job.tags}</span>
								</div>
								<div>
									<Button
										variant="primary"
										className="mx-3"
										onClick={() => openFullJob(job.linkToFullJob)}
									>
										View Full Job
									</Button>
									<Button className="mx-3">
										<BsFillEyeFill style={{ fontSize: '30px' }} />
									</Button>
									<Button className="mx-3">
										<BsFillEyeSlashFill style={{ fontSize: '30px' }} />
									</Button>
								</div>
							</Card.Body>
							<Card.Footer>{job.postDate}</Card.Footer>
						</Card>
					</Col>
					{/* <Col className="text-center d-flex justify-content-center align-items-center">
						<div></div>
					</Col> */}
				</Row>
			))}
		</Container>
	);
};

export default MainList;