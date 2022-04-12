import React from 'react';
import { Pagination } from 'react-bootstrap';

const JobsPagination = ({ currentPage, setCurrentPage, totalPages }) => {
	const adjustPage = (amount) => {
		setCurrentPage((prevPage) => prevPage + amount);
	};

	const checkForNextPage = () => {
		if (totalPages > currentPage) return true;
		else return false;
	};

	return (
		<Pagination>
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
			{checkForNextPage() && (
				<Pagination.Item onClick={() => adjustPage(1)}>{currentPage + 1}</Pagination.Item>
			)}
		</Pagination>
	);
};

export default JobsPagination;
