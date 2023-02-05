import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import { Card, CardBody, CardText, Col, Container, Row } from 'reactstrap';
import { getPost } from '../../Services/post-service';
import { BASE_URL } from '../../Services/Helper';

export default function PostPage() {

    const {postId}=useParams();

    const [post, setpost] = useState(null);

    useEffect(() => {
        getPost(postId).then(post =>{
            setpost(post)
        }).catch(error=>{
            toast.error(error);
        })
    }, []);

    console.log(post);


  return (
    <Container className='mt-4'>

        <Link to='/home' className='btn btn-bg btn-outline-secondary'>Back to Posts</Link>

        <Row className='mt-3'>
            <Col md={{
                size: 12
            }}>
                <Card>

                    <CardBody className='mx-2'>
                        <CardText >Posted by <b>{post?.user?.name}</b> on <b>{new Date(post?.addedDate).toLocaleString()}</b></CardText>


                        <CardText><span className='text-muted'>{post?.category.categoryTitle}</span></CardText>

                        <div className="divider" style={{width:'100%',height:'1px',background:'#e2e2e2'}}></div>

                        <CardText className='mt-3'>
                            <h3>{post?.postTitle}</h3>
                        </CardText>

                        

                        <div className='image-container mt-3 shadow'  style={{width:'50%'}}>
                            <img className='img-fluid' src={`${BASE_URL}/posts/image/${post?.image}`} alt="Post" />
                        </div>

                        
                        <CardText dangerouslySetInnerHTML={{__html:post?.postContent}} className='mt-5'></CardText>


                    </CardBody>



                </Card>

            </Col>
        </Row>

    </Container>
  )
}
