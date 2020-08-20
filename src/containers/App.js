import React from 'react';
import Cardlist from '../components/Cardlist';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import { render } from '@testing-library/react';
import ErrorBoundry from '../components/ErrorBoundry'
import './App.css';





class App extends React.Component{
    constructor(){
        super()
        this.state={
            robots: [],
            searchfield: ''

        }

    }


    componentDidMount(){
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response=> {
            return response.json();
            })
            .then(users =>{
                this.setState({ robots: users})
        })
    }

    onSearchChange=(event) =>{
        this.setState({ searchfield: event.target.value})
        
        
        

    }

    render(){
        const{robots, searchfield} = this.state;
        const filteredRobots = robots.filter(robots =>{
            return robots.name.toLowerCase().includes(searchfield.toLowerCase())
        })
        if (!robots.length){
            return <h1>Loading</h1>
        } else{
            return(
                <div className='tc'>
                    <h1 className='f1'>RoboFriends</h1>
                    <SearchBox searchChange={this.onSearchChange}/>
                    <Scroll>
                        <ErrorBoundry>
                            <Cardlist robots={filteredRobots}/>
                        </ErrorBoundry>
                    </Scroll>
                </div>   
        )
    }
    }
}
        
    



export default App;
