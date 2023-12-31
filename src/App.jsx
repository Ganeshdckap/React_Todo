import React, { useState } from 'react';
import { Button, Modal, Card } from 'antd';

const App = () => {
  const [open, setOpen] = useState(false);
  const [bookName, setBookName] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [description, setDescription] = useState('');
  const [visibility, setVisibility] = useState('');
  const [errors, setErrors] = useState({});
  const [value, setValue] = useState([]);

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const bookhandler = (e) => {
    const { name, value } = e.target
    setBookName(value)
    delete errors[name]
  }
  const authorHandler = (e) => {
    const { name, value } = e.target
    setAuthorName(value)
    delete errors[name]
  }
  const desHandler = (e) => {
    const { name, value } = e.target
    setDescription(value)
    delete errors[name]
  }

  const visibleHandler = (e) => {
    const { name, value } = e.target
    setVisibility(value)
    delete errors[name]
  }


  const validedInput = () => {
    let isValid = true;
    const newErrors = {};

    if (!bookName.trim()) {
      newErrors["bookName"] = 'Book Name is required';
      isValid = false;
    }

    if (!authorName.trim()) {
      newErrors.authorName = 'Author Name is required';
      isValid = false;
    }

    if (!description.trim()) {
      newErrors.description = 'Description is required';
      isValid = false;
    }

    if (!visibility.trim()) {
      newErrors.visibility = 'visibility is required';
      isValid = false;
    }

    setErrors(newErrors);

    return isValid;

  }
  const validateForm = (e) => {
    e.preventDefault()

    if (validedInput()) {
      let todo = {
        bookName: bookName,
        authorName: authorName,
        description: description,
        visibility: visibility
      }

      setValue([...value, todo]);

      setBookName("");
      setAuthorName("");
      setDescription("");
      setVisibility("");
      setOpen(false)
    }

  };


  const remove = (id) => {
    let update = [...value]
    update.splice(id, 1);
    setValue(update)
  }

  return (
    <>

      <Button type="primary" onClick={showModal}>Create New Book</Button>
      <div>
        {value.map((todo, index) => {
          if (todo.visibility === "yes") {
            return (
              <div key={index}>
                <Card
                  title={`BookName:${todo.bookName}`}
                  bordered={false}
                  style={{
                    width: 300,
                  }}
                >
                  <p>AuthorName:{todo.authorName}</p>
                  <p>Description:{todo.description}</p>
                  <button onClick={() => remove(index)}>Delete</button>
                </Card>
              </div>
            )
          }
        })}
      </div>
      <Modal open={open} onCancel={handleCancel} okText={"Submit"} onOk={validateForm}>
        <div>
          <form action="">
            <div className='form-group'>
              <label>Book Name</label>
              <input type='text' className='form-control' name='bookName' value={bookName} onChange={bookhandler} />
              <div className="error-message">{errors["bookName"] ? errors["bookName"] : ""}</div>
            </div>

            <div className='form-group'>
              <label>Author Name</label>
              <input type='text' className='form-control' name='authorName' value={authorName} onChange={authorHandler} />
              <div className="error-message">{errors["authorName"] ? errors["authorName"] : ""}</div>

            </div>

            <div className='form-group'>
              <label>Description</label>
              <textarea rows="5" className='form-control' name='description' value={description} onChange={desHandler}></textarea>
              <div className="error-message">{errors["description"] ? errors["description"] : ""}</div>

            </div>

            <div className='form-group'>
              <label>Visibility</label>
              <input type="radio" name='visibility' value="yes" checked={visibility === "yes"} onChange={visibleHandler} />
              <label>Yes</label>
              <input type="radio" name='visibility' value="no" checked={visibility === "no"} onChange={visibleHandler} />
              <label>No</label>
              <div className="error-message">{errors["visibility"] ? errors["visibility"] : ""}</div>
            </div>
            {/* <button type='submit' onClick={validateForm}>Submit </button> */}
          </form>
        </div>
      </Modal>

    </>
  );
};

export default App;




