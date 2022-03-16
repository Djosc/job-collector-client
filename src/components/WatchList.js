import React, { useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';

import ConfirmModal from './ConfirmModal';

const WatchList = (props) => {
	const [modalShow, setModalShow] = useState(false);
	const [modalJobData, setModalJobData] = useState(null);

	const { watchedArr } = props;

	return (
		<Container fluid className="px-4">
			{/* Using one instance of the modal outside the map function. 
				It is given the current job from within the map function via setModalJobData  */}
			<ConfirmModal
				show={modalShow}
				onHide={() => setModalShow(false)}
				rmvJob={() => props.removeJob(modalJobData)}
			/>
			<h1 className="text-center my-4">Watched Jobs</h1>

			{watchedArr.watchedArr.map((job, index) => (
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
										className="mx-1 px-3 py-2"
										onClick={() => props.openFullJob(job.linkToFullJob)}
									>
										View Full Job
									</Button>
									{props.checkWatchedArr(job) ? (
										<>
											{props.checkApplied(job) ? (
												<Button
													variant="success"
													className="mx-2 px-3 py-2"
													onClick={() => props.unmarkApplied(job)}
												>
													Applied
												</Button>
											) : (
												<Button
													variant="primary"
													className="mx-2 px-3 py-2"
													onClick={() => props.markApplied(job)}
												>
													Not Applied
												</Button>
											)}
											<Button
												className="mx-2"
												// Modal data is set and displayed from here
												onClick={() => {
													setModalJobData(job);
													setModalShow(true);
												}}
												style={{ backgroundColor: 'red' }}
											>
												<BsFillEyeSlashFill style={{ fontSize: '28px' }} />
											</Button>
										</>
									) : (
										<Button className="mx-2" onClick={() => props.addJob(job)}>
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

export default WatchList;
