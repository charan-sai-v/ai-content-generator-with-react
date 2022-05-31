import { Configuration, OpenAIApi  } from "openai";
import React from 'react'
import './App.css'

//Add OpenAI api key
const Apiurl = new Configuration({
    apiKey: "yourAPIkey" // here you need to 
});

// Copy button
function Copy() {
    
    var copyText = document.getElementById("Copy");
    copyText.select();
    copyText.setSelectionRange(0, 99999); 
    navigator.clipboard.writeText(copyText.value);
    alert("Copied!")
  }



class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
         opendata: {
                choices:[]
            }
        }
    }

    openAI = async () =>{
        const content = document.querySelector("textarea").value;
        const openai = new OpenAIApi(Apiurl)
        const Response = await openai.createCompletion("text-davinci-001", {
            prompt: `write about ${content}`,
            max_tokens: 75,
            temperature: 0.5,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        })

        // check in the browser console
        console.log(Response.data);

        // updating the response in the opendata object
        this.setState({
            opendata: Response.data 
        })

    }

    



    render(){
        return(
            <>
            <nav className="navbar navbar-expand-lg navbar-light navBarColor">
            <div className="container-fluid">
                <a href="/" className="navbar-brand"><b>AI Content Generator</b></a>
                <button type="button" className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarCollapse9">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarCollapse9">
                    <div className="navbar-nav">
                        <a href="/" className="nav-item nav-link active">Home</a>
                        <a href="https://www.youtube.com/c/MrNick4U/" className="nav-item nav-link">Subscribe to My Youtube Channel</a>
                        <a href="https://wpless.com" className="nav-item nav-link">My Website</a>
                    </div>
                    
                </div>
                
            </div>        
        </nav>
        <br/>
        <div className="container">
        <h1 className="text-center">Content Generator</h1>
        <div className="mb-3">
        
        <textarea className="form-control" rows={10} placeholder="Enter your ideas what you want?" />
        </div>
               
        <button className="btn btn-primary" type="button" onClick={this.openAI}>Click Here</button>
        <div>
           
            <button type="button" className="btn" onClick={Copy}> <img src="data:image/png;base64,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" alt="Copy" width={40} /> </button>
                {this.state.opendata.choices.map((item) => (
                <textarea id="Copy" className="form-control" rows={8} key={item} value={item.text} />
                ))}
           
        
        </div>
        
      </div>
      <footer className="container d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
          <div className="col-md-4 d-flex-wrap align-items-center">
              <span> © 2022 Wpless</span>
          </div>  
          <div className=" nav col-md-4 justify-content-end list-unstyled d-flex">
          <p>Made with ❤️ by </p><a className="px2" style={{paddingLeft:"5px"}} href="https://github.com/charan-sai-v">Charan Sai</a>
          </div>
      </footer>
      </>
        );
    }


    


    



    
}

export default App;