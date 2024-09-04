import React from 'react';

const SeeAll = ({ currentPage, totalPages, handleNextPage, handlePrevPage }) => {
    return (
        <div id="pagination">
            {currentPage > 1 && <button onClick={handlePrevPage}>Previous Page</button>}
            {currentPage < totalPages && <button onClick={handleNextPage}>Next Page</button>}
        </div>
    );
};

export default SeeAll;
