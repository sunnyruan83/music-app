import React, {Component} from 'react';
import axios from 'axios';


class Search extends Component {
    
    constructor() {
        super()
        
        this.state = {
            songTitle: '',
            showLyrics:[],         
        }
        this.handleChange = this.handleChange.bind(this);
        this.doSearch = this.doSearch.bind(this);
       
    }
    componentDidMount() {
       axios
       .get({https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${this.state.songTitle}&apikey=${process.env.REACT_APP_MM_KEY}})
   
    
            .then(response => response.json())
            .then(showLyrics => this.setState({showLyrics}))
    }         
            
    
    
    handleChange(event){
        const {name, value} = event.target;
        this.setState({ [name]: value });
    }
    
    doSearch(event){
        event.preventDefault();
        
       console.log('working')
                  
    }
    
    render() {
        return(
            <div>
                <form className = "search-form" onSubmit={this.doSearch}>
                    <input 
                        type="text"
                        value={this.state.songTitle}
                        name="songTitle"
                        onChange={this.handleChange}
                        placeholder="Song title"
                    /> 
                    <br />
                    
                    <button>Search</button>
                    
                    

                </form>
               <div><h2>{this.state.showLyrics}</h2></div>
            </div>
        );
    }
}



export default Search;