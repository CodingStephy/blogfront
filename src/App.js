import AllBlogs from "./pages/AllBlogs"
import SingleBlog from "./pages/SingleBlog";
import Form from "./pages/Form";
import { Route, Switch, Link } from "react-router-dom";

// Import React and hooks
import React, { useState, useEffect } from "react";




function App(props) {
  ////////////////////
  // Style Objects
  ////////////////////

  const h1 = {
    textAlign: "center",
    margin: "10px"
  }
  const button = {
    background:"navy",
    display:"block",
    margin: "auto"
  }

  ///////////////
  // State & Other Variables
  ///////////////

  // Our Api Url
  const url = "https://sl-blog-backend.herokuapp.com/blog/";

  // State to Hold The List of Posts
  const [blogs, setBlogs] = useState([]);

  const nullBlog = {
    title: "",
    body: "",
  };

  const [targetBlog, setTargetBlog] = useState(nullBlog);
  //////////////
  // Functions
  //////////////
  const getBlogs = async () => {
    const response = await fetch(url);
    const data = await response.json();
    setBlogs(data);
  };

  // Function to add todo from form data
const addBlogs = async (newBlog) => {
  const response = await fetch(url, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newBlog),
  });

  // get updated list of todos
  getBlogs();
};
  // Function to select todo to edit
const getTargetBlog = (blog) => {
  setTargetBlog(blog);
  props.history.push("/edit");
};

// Function to edit todo on form submission
const updateBlog = async (blog) => {
  const response = await fetch(url + blog.id + "/", {
    method: "put",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(blog),
  });

  // get updated list of todos
  getBlogs();
};

const deleteBlog = async (blog) => {
  const response = await fetch(url + blog.id + "/", {
    method: "delete",
  });

  // get updated list of todos
  getBlogs();
  props.history.push("/");
};

  //////////////
  // useEffects
  //////////////
  // useEffect to get list of blogs when page loads
  useEffect(() => {getBlogs();}, []);
  

  /////////////////////
  // returned JSX
  /////////////////////
  return (
    <div>
      <h1 style={h1}>My Blog</h1>
      <Link to="/new"><button style={button}>Create New Blog Post</button></Link>
      <Switch>
        <Route
          exact
          path="/"
          render={(routerProps) => <AllBlogs {...routerProps} blogs={blogs} />}
        />
        <Route
          path="/blog/:id"
          render={(routerProps) => (
            <SingleBlog {...routerProps} blogs={blogs} edit={getTargetBlog}  deleteBlog={deleteBlog}/>
          )}
        />
        <Route
         path="/new"
        render={(routerProps) => (
         <Form
         {...routerProps}
        initialBlog={nullBlog}
        handleSubmit={addBlogs}
        buttonLabel="create todo"
    />
  )}
/>
        <Route
          path="/edit"
          render={(routerProps) => <Form {...routerProps} 
          initialBlog={targetBlog}
          handleSubmit={updateBlog}
          buttonLabel="Update Blog"/>}
        />
      </Switch>
    </div>
  );
}

export default App;
