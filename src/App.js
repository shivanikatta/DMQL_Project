
import React, { Component } from 'react';  

// import ReactTable from "react-table";  
// import "react-table/react-table.css";  
import TableComponent from './TableComponent';
import { TextField ,Button, Box,SelectChangeEvent,Select,FormControl,InputLabel,MenuItem} from '@mui/material';
// import TextField from '@mui/material/TextField';
  
class App extends Component { 

  state = {
    query : " ",
    columns: null,
    rows: null,
    num_movies : null,
    columns1: null,
    rows1: null,
}

OnSubmitQuery = () => {

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: this.state.query })
  };
  fetch('http://34.229.0.41:5000/query', requestOptions)
      .then(response => response.json())
      .then(data => this.setState({ columns: data.columns, rows:data.rows}))
 
};

OnMovieSubmit = () => {
  console.log("hello",this.state.num_movies)
  let moviequery = "select original_title,average_rating from project.titles, project.title_ratings where titles.title_id =  title_ratings.title_id and num_votes > 10000 order by average_rating desc limit "+this.state.num_movies;
  console.log("moviequery",moviequery)
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: moviequery})
  };
  fetch('http://34.229.0.41:5000/query', requestOptions)
      .then(response => response.json())
      .then(data => this.setState({ columns1: data.columns, rows1:data.rows}))
 
};
  
  handleChange = (e) => {
    this.setState({ query: e.target.value})
    console.log(this.state.query);
  };


  MovieNum = (e) => {
    this.setState({ num_movies: e.target.value})
    console.log(this.state.num_movies);
  };

  HandleGenres = (event) => {
    console.log(event.target.value);
  };

  render() {  
    let Queryresult = <p> </p>
    console.log("col and rows",this.state.columns)
    if(this.state.columns != null && this.state.rows != null){
      Queryresult = <TableComponent columns = {this.state.columns} rows = {this.state.rows}/>
    }

    let movieresult = <p> </p>
    console.log("col and rows",this.state.columns1)
    if(this.state.columns1 != null && this.state.rows1 != null){
      movieresult = <TableComponent columns = {this.state.columns1} rows = {this.state.rows1}/>
    }
    return (  
          <div>
            <p>Enter the Query! </p>
            <TextField
          id="outlined-multiline-static"
          label="Enter the Query"
          // value={name}
          onChange={this.handleChange}
          multiline
          // fullWidth
          sx={{
            width: 850}}
          rows={3}
          // defaultValue="Default Value"
        />
        <p> </p>
        <Button
          variant="contained"
          onClick={this.OnSubmitQuery}
        >
          Submit
        </Button>
        {Queryresult}
          <Box component="form"
          sx={{
            width: 400,
            height: 50,
            backgroundColor: 'aliceblue',
            '&:hover': {
              backgroundColor: 'aliceblue',
              opacity: [0.9, 0.8, 0.7],
            },
          }}
          noValidate
          style={{ justifyContent:'center', alignItems:'center'}}
          autoComplete="off">
            <p > No.of top <TextField
          label="Number"
          id="outlined-size-small"
          size="small"
          onChange={this.MovieNum}
        /> Movies </p>
        </Box>
        <p> </p>
        <Button
          variant="contained"
          onClick={this.OnMovieSubmit}
        >
          Submit
        </Button>
        
          {movieresult}

          <Box component="form"
          sx={{
            width: 400,
            height: 80,
            backgroundColor: 'aliceblue',
            '&:hover': {
              backgroundColor: 'aliceblue',
              opacity: [0.9, 0.8, 0.7],
            },
          }}
          noValidate
          style={{ justifyContent:'center', alignItems:'center'}}
          autoComplete="off">
            <p > <FormControl  sx={{ m: 1, minWidth: 120 }} >
        <InputLabel id="demo-simple-select-label">Genres</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Genres"
          onChange={this.HandleGenres}
        >
          <MenuItem value={"Action"}>Action</MenuItem>
          <MenuItem value={"Adventure"}>Adventure</MenuItem>
          <MenuItem value={"Animation"}>Animation</MenuItem>
          <MenuItem value={"Biography"}>Biography</MenuItem>
          <MenuItem value={"Comedy"}>Comedy</MenuItem>
          <MenuItem value={"Crime"}>Crime</MenuItem>
          <MenuItem value={"Documentary"}>Documentary</MenuItem>
          <MenuItem value={"Drama"}>Drama</MenuItem>
          <MenuItem value={"Family"}>Family</MenuItem>
          <MenuItem value={"Fantasy"}>Fantasy</MenuItem>
          <MenuItem value={"Game-Show"}>Game-Show</MenuItem>
          <MenuItem value={"History"}>History</MenuItem>
          <MenuItem value={"Horror"}>Horror</MenuItem>
          <MenuItem value={"Music"}>Music</MenuItem>
          <MenuItem value={"Musical"}>Musical</MenuItem>
          <MenuItem value={"Mystery"}>Mystery</MenuItem>
          <MenuItem value={"News"}>News</MenuItem>
          <MenuItem value={"Reality-TV"}>Reality-TV</MenuItem>
          <MenuItem value={"Romance"}>Romance</MenuItem>
          <MenuItem value={"Sci-Fi"}>Sci-Fi</MenuItem>
          <MenuItem value={"Short"}>Short</MenuItem>
          <MenuItem value={"Sport"}>Sport</MenuItem>
          <MenuItem value={"Talk-Show"}>Talk-Show</MenuItem>
          <MenuItem value={"Thriller"}>Thriller</MenuItem>
          <MenuItem value={"War"}>War</MenuItem>
          <MenuItem value={"Western"}>Western</MenuItem>

        </Select>
      </FormControl> Movies </p>
        </Box>
         
          </div>        
    );  
  }  
}  
export default App;  