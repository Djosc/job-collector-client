import React from 'react';
import { Pagination } from 'react-bootstrap';

const JobsPagination = ({ currentPage, setCurrentPage, hasNextPage }) => {
	const adjustPage = (amount) => {
		setCurrentPage((prevPage) => prevPage + amount);
	};

	return (
		<Pagination>
			{currentPage !== 1 && <Pagination.Prev onClick={() => adjustPage(-1)} />}
			{currentPage !== 1 && (
				<Pagination.Item onClick={() => setCurrentPage(1)}>1</Pagination.Item>
			)}
			{currentPage > 2 && <Pagination.Ellipsis />}
			{currentPage > 2 && (
				<Pagination.Item onClick={() => adjustPage(-1)}>
					{currentPage - 1}
				</Pagination.Item>
			)}
			<Pagination.Item active>{currentPage}</Pagination.Item>
			{hasNextPage && (
				<Pagination.Item onClick={() => adjustPage(1)}>{currentPage + 1}</Pagination.Item>
			)}
			{hasNextPage && <Pagination.Next onClick={() => adjustPage(1)} />}
		</Pagination>
	);
};

export default JobsPagination;
