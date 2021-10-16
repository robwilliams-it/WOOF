import React from 'react';
import "./styles.css";

import Header from './components/header.jsx';
import Footer from './components/footer.jsx';
import HomePage from './components/homePage.jsx';
import UserPage from './components/userProfile/userPage.jsx';
import SearchForPets from './components/searchForPets.jsx';
import ResearchPage from './components/researchPage.jsx';
import AnimalPage from './components/animalPage.jsx';
import DogCard from './components/card/dogCard.jsx';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Container from '@mui/material/Container';


const App = () => {
  return (
    <>
    <Router>
<<<<<<< HEAD
      <Header />
      <Container id='appContainer'>
        <Switch>
          <Route path='/' exact component={HomePage}/>
          <Route path='/user' exact component={UserPage}/>
          <Route path='/research' exact component={ResearchPage}/>
          <Route path='/animal' component={AnimalPage}/>
          <Route path='/search' component={SearchForPets}/>
        </Switch>
      </Container>
      <Footer />
=======
      <div className="app">
        <Header />
        <Route path='/user'/>
        <Route path='/research'/>
        <Route path='/dogProfile' />
      </div>
>>>>>>> main
    </Router>
    </>
  )
};

export default App;


