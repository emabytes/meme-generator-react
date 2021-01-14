import React, { Component } from 'react';

class MemeGenerator extends Component {
    state = {
        topText: "",
        bottomText: "",
        randomImg: "http://i.imgflip.com/1bij.jpg",
        allMemeImages: []
    }
    // you can get rid of bind if you use arrow functions
    // this.handleChange = this.handleChange.bind(this)
    // this.handleSubmit = this.handleSubmit.bind(this)

    componentDidMount() {
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(result => {
                console.log(result.data.memes[0])
                this.setState({ allMemeImages: result.data.memes })
            }
            )
    }

    // use arrow functions!
    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }
    handleSubmit = (e) => {
        e.preventDefault()
        const randomNum = Math.floor(Math.random() * this.state.allMemeImages.length)
        const randomMemeImg = this.state.allMemeImages[randomNum].url
        console.log(randomMemeImg)
        this.setState({ randomImg: randomMemeImg })
    }

    render() {
        return (
            <div>
                <form action="meme-form" onSubmit={this.handleSubmit}>
                    <input type="text" name="topText" id="" placeholder="top text" value={this.state.topText} onChange={this.handleChange} />
                    <input type="text" name="bottomText" id="" placeholder="bottom text" value={this.state.bottomText} onChange={this.handleChange} />
                    <button>Generate</button>
                </form>

                <div className="meme">
                    <img src={this.state.randomImg} alt="" />
                    <h2 className="top">{this.state.topText}</h2>
                    <h2 className="bottom">{this.state.bottomText}</h2>
                </div>
            </div>
        );
    }
}

export default MemeGenerator;