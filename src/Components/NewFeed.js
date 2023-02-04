import React,{useEffect,useState} from 'react'
import {Col, Row,Pagination,PaginationItem,PaginationLink} from 'reactstrap'
import { loadAllPosts } from '../Services/post-service';
import Post from './Post';
import {toast} from 'react-toastify'



export default function NewFeed() {


    const [postContent, setPostContent] = useState({
      content : [],
      totalPages : 0,
      lastPage : false,
      pageSize : 10,
      pageNumber : '',
      totalElements : 0,
    });

    //First page of posts is loaded on rendering home page

    //load all posts from the server at the time of initial rendering
    useEffect(() => {
        changePage();
    }, []);

    //function to change page number
    const changePage = (pageNumber=1,pageSize=2)=>{
      loadAllPosts(pageNumber,pageSize).then(response=>{
        console.log(response.content);
        setPostContent(response)
        window.scroll(0,0);//scroll to top when new page is loaded
      }).catch(error=>{
        console.log(error);
        toast.error("Error Loading posts");
      });
    }

  return (
      <div className="container-fluid">
        <Row>
          <Col md={
            {
            size : '10',
            offset : 1
            }
          }>
              <h1>This is the feed section ({postContent?.totalElements})</h1>

              {/* <Post/> */}
              {postContent?.content?.map(post =>{
                return <Post post={post} key={post.postId}/>
              })}

              {/* Implemented Pagination here, the first and previous button will get disabled if first page is rendered */}
              <Pagination>
              <PaginationItem disabled={postContent.pageNumber===1}>
                  <PaginationLink first onClick={()=>{changePage(1)}}>First</PaginationLink>
                </PaginationItem>
                <PaginationItem disabled={postContent.pageNumber===1}>
                  <PaginationLink previous onClick={()=>{changePage(--postContent.pageNumber)}}>Previous</PaginationLink>
                </PaginationItem>

                {[...Array(postContent.totalPages)].map((item,index) =>{
                  return (
                    <PaginationItem key={index} active={postContent.pageNumber===index+1} onClick={()=>changePage(index+1)}>
                  <PaginationLink>{index+1}</PaginationLink>
                </PaginationItem>
                  )
                })}
                {/* All the page Numbers are showed in Pagination and if any pageNumber is clicked respective data will be feteched */}
                
                <PaginationItem disabled={postContent.lastPage}>
                  <PaginationLink next onClick={()=>changePage(++postContent.pageNumber)}>Next</PaginationLink>
                </PaginationItem>
                <PaginationItem disabled={postContent.lastPage}>
                  <PaginationLink last onClick={()=>changePage(postContent.totalPages)}>Last</PaginationLink>
                  </PaginationItem>
              </Pagination>
          </Col>
        </Row>
      </div>
  )
}
