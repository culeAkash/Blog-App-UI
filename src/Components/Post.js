import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Card, CardBody, CardText, Container } from 'reactstrap'

export default function Post({post={postTitle:"This is default post title",postContent:"This is default post content"}}) {
  return (
    <Card className='border-0 shadow-sm my-2'>
        <CardBody>
            <h1>{post.postTitle}</h1>
            <CardText dangerouslySetInnerHTML={{__html:post.postContent.substring(0,60)}}></CardText>
        </CardBody>
        <Container className='mb-2'>
            <Link className='btn btn-outline-primary' to={`/post/${post.postId}`}>Read More</Link>
        </Container>
    </Card>
  )
}
