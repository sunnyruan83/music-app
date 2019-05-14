import React, { Component } from "react";
import axios from "axios";

const BASE_URL =
  "https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1";
class Search extends Component {
  constructor() {
    super();

    this.state = {
      artist: "",
      songTitle: "",
      showLyrics: "",
      pixel: "",
      backlink: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.doSearch = this.doSearch.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  async doSearch(e) {
    e.preventDefault();
    const { data } = await axios.get(
      `${BASE_URL}/track.search?q_track=${this.state.songTitle}&q_artist=${
        this.state.artist
      }&apikey=${process.env.REACT_APP_MM_KEY}`
    );
    const { track_id, track_share_url } = data.message.body.track_list[0].track;
    const result = await axios.get(
      `${BASE_URL}/track.lyrics.get?track_id=${track_id}&apikey=${
        process.env.REACT_APP_MM_KEY
      }`
    );
    const [backlink] = track_share_url.split("?");

    const [lyrics] = result.data.message.body.lyrics.lyrics_body.split("*");
    this.setState({ backlink });

    this.setState({ showLyrics: lyrics });
    this.setState({
      pixel: result.data.message.body.lyrics.pixel_tracking_url
    });
  }

  render() {
    return (
      <div>
        <form className="search-form" onSubmit={this.doSearch}>
          <input
            type="text"
            value={this.state.artist}
            name="artist"
            onChange={this.handleChange}
            placeholder="Artist"
          />
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
        
          <h2>
            <div>
              {this.state.showLyrics
                ? this.state.showLyrics
                    .split("\n")
                    .map((line, index) => <div key={index}>{line}</div>)
                : ""}
            </div>
            {this.state.backlink ? (
              <a target="_blank" href={this.state.backlink}>
                Click to View More
              </a>
            ) : (
              ""
            )}
          </h2>
        </div>
        {this.state.pixel ? <img src={this.state.pixel} /> : ""}
      </div>
    );
  }
}

export default Search;
