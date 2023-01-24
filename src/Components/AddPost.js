import React, { useState, useEffect, useRef } from 'react';
import { Button, Card, CardBody, CardHeader, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import { loadAllCategories } from '../Services/category-service';
import JoditEditor from 'jodit-react';
import { toast } from 'react-toastify';
import { getCurrentUserDetails } from '../Auth/auth';
import { createPost as doCreatePost } from '../Services/post-service';

const AddPost = () => {

    const [categories, setCategories] = useState([]);

    const editor = useRef(null);

    const [user, setUser] = useState(undefined);


    useEffect(() => {
        setUser(getCurrentUserDetails());
        loadAllCategories().then(response => {
            console.log(response.content);
            setCategories(response.content);
        })
            .catch(error => {
                console.log(error);
            })
    }, []);


    //implementing two way data binding
    const [post, setPost] = useState({
        title: '',
        content: '',
        categoryId: -1
    });


    const changeHandler = (event => {
        setPost(prevPost => {
            return {
                ...prevPost,
                [event.target.name]: event.target.value
            }
        })
    })


    //Since the Jodit editor returns the text content directly, we don't have to bother for the target or name of the event
    const contentChangeHandler = (data => {
        setPost(prevPost => {
            return {
                ...prevPost,
                content: data
            }
        })
    })


    //Creating post on successful form submission
    const createPost = (event => {
        event.preventDefault();

        if(post.title.trim()===''){
            toast.error("Title is required")
            return;
        }
        else if(post.content.trim()===''){
            toast.error("Post Caption is required")
            return;
        }
        else if(post.categoryId===-1){
            toast.error("Please select a post category!!!")
            return;
        }

        const postData = {
            postTitle : post.title,
            postContent : post.content,
            categoryId : post.categoryId,
            userId : user.userId
        }
        doCreatePost(postData);
        console.log("Form submitted");
        toast.success("Post Created")
        console.log(post);
        resetForm(event);
    })


    const resetForm = (event) => {
        event.preventDefault();

        setPost({
            title : '',
            content : '',
            categoryId : -1
        })
    }



    return (
        <Container className='my-4'>
            <Card className='shadow-sm'>
                <CardHeader style={{ background: '#616161', color: '#e0e0e0' }}>
                    <h3>Whats going on in your mind?</h3>
                </CardHeader>
                <CardBody>
                    <Form onSubmit={createPost} onReset={resetForm}>
                        {/* {JSON.stringify(post)} */}
                        <FormGroup>
                            <Label for='postTitle'>
                                Title :
                            </Label>
                            <Input
                                id='postTitle'
                                name='title'
                                type='text'
                                value={post.title}
                                placeholder='Enter Post Title Here'
                                onChange={changeHandler}
                            >
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for='postContent'>
                                Content :
                            </Label>
                            <JoditEditor
                                ref={editor}
                                value={post.content}
                                name='content'
                                onChange={contentChangeHandler}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="category">
                                Post Category :
                            </Label>
                            <Input
                                id="category"
                                name="categoryId"
                                type="select"
                                onChange={changeHandler}
                                defaultValue={0}
                            // placeholder='Select Category'
                            >
                                {/* Here we will use categories from server and not our own */}
                                <option disabled value={0}> --Select Category--</option>
                                {categories.map(category => {
                                    return <option key={category.categoryId} value={category.categoryId}>{category.categoryTitle}</option>
                                })}
                            </Input>
                        </FormGroup>

                        <Container className='text-center'>
                            <Button type='submit' color='primary' style={{ marginRight: '10px' }}>Create Post</Button>
                            <Button color='danger' type='reset'>Reset</Button>
                        </Container>
                    </Form>


                </CardBody>
            </Card>
        </Container>
    );
}

export default AddPost;
