import React,{useState,useEffect,useRef} from 'react';
import { Button, Card, CardBody, CardHeader, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import { loadAllCategories } from '../Services/category-service';
import JoditEditor from 'jodit-react';

const AddPost = () => {

    const [categories, setCategories] = useState([]);

    const editor = useRef(null);
	const [content, setContent] = useState('');


    useEffect(() => {
        loadAllCategories().then(response=>{
            console.log(response.content);
            setCategories(response.content);
        })
        .catch(error=>{
            console.log(error);
        })
    }, []);
    
    return (
        <Container className='my-4'>
            <Card className='shadow-sm'>
                <CardHeader style={{background : '#616161',color : '#e0e0e0'}}>
                    <h3>Whats going on in your mind?</h3>
                </CardHeader>
                <CardBody>
                    <Form>
                        <FormGroup>
                            <Label for='postTitle'>
                                Title :
                            </Label>
                            <Input id='postTitle' name='' type='text' placeholder='Enter Post Title Here'></Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for='postContent'>
                                Title :
                            </Label>
                           <JoditEditor
                           ref={editor}
                           value={content}
                           onChange={(cont)=>setContent(cont)}
                           />
                        </FormGroup>
                        <FormGroup>
                            <Label for="category">
                                Post Category :
                            </Label>
                            <Input
                                id="category"
                                name="select"
                                type="select"
                                // placeholder='Select Category'
                            >
                                {/* Here we will use categories from server and not our own */}
                               {categories.map(category=>{
                                return <option key={category.categoryId}>{category.categoryTitle}</option>
                               })}
                            </Input>
                        </FormGroup>
                    </Form>

                    <Container className='text-center'>
                  <Button color='primary' style={{ marginRight: '10px' }} type='submit'>Create Post</Button>
                  <Button color='danger' type='reset'>Reset</Button>
                </Container>
                </CardBody>
            </Card>
        </Container>
    );
}

export default AddPost;
