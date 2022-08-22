import React from "react";
import { Pagination as PaginationAntd } from "antd";

import "./Pagination.scss";

export default function Pagination(props) {
  const { posts, location, history } = props;
  //console.log("posts,page,limit-->",posts,posts.page,posts.totalPages,posts.limit);
  // console.log("location-->",location);
  // console.log("history-->",history);
  const {totalDocs,limit}=posts

  const onChangePage = newPage => {
    console.log('Page: ', newPage);
    history.push(`${location.pathname}?page=${newPage}`);
  };

  return (
    <PaginationAntd
      defaultCurrent={posts.page}
      total={totalDocs}
      pageSize={limit}
      responsive={true}
      onChange={newPage => onChangePage(newPage)}
      className="pagination"
      // itemRender={itemRender}  //poner texto prev or next al paginador
    />
  );
}

//función para poner texto al paginador como next or prev
function itemRender(current, type, originalElement) {
  if (type === 'prev') {
    return <a>Previo</a>;
  }
  if (type === 'next') {
    return <a>Siguiente</a>;
  }
  return originalElement;
}
