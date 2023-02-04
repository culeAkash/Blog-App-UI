import React from 'react'
import { Button, Card, CardBody, CardText, Container } from 'reactstrap'

export default function Post({post={postTitle:"This is default post title",postContent:"This is default post content"}}) {
  return (
    <Card className='border-0 shadow-sm my-2'>
        <CardBody>
            <h1>{post.postTitle}</h1>
            <CardText dangerouslySetInnerHTML={{__html:post.postContent.substring(0,60)}}></CardText>
        </CardBody>
        <Container className='mb-2'>
            <Button color='primary' outline>Read More</Button>
        </Container>
    </Card>
  )
}
