import React, {Component} from "react"
import axios from 'axios'

class Search extends Component {
     
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            songTitle: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    componentDidMount() {   
        this.setState({loading: true})
        axios.get(`http://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${
          this.state.songTitle}&apikey=${process.env.REACT_APP_MM_KEY}`
      )
            .then(response => response.json())
            .then(data => console.log(data))
            
    }
    
    handleChange(event){
        const {name, value} = event.target;
        this.setState({ [name]: value });
    }
    handleSubmit(event){
        event.preventDefault();
        console.log('I was triggered during submit');
    }
    
    render() {
        return (
            <div>
                <form className="search-form" onSubmit={this.handleSubmit}>
                    <input 
                        name="songTitle"   
                        value={this.state.songTitle}
                        onChange={this.handleChange}
                        placeholder="Song title"
                    /> 
                    <br />
                    
                    <button>Search</button>
            
                </form>
            
            </div>
        );
    }

}
export default Search