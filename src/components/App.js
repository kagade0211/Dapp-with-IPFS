import React, { Component } from 'react';
import logo from '../logo.png';
import './App.css';
// import installed ipfs-http client using below command 
const ipfsClient = require('ipfs-http-client')
// local host if using local ipfs node but we are using infura free gateway
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: '5001', protocol: 'https' })

class App extends Component {

  constructor (props){
    super (props);
    this.state = {
    buffer : null
    };
  }
  captureFile = (Event) => {
    //1. prevent defaults 2. captureFile to file constant 3. define readerobject 
    // Prevent default events
    Event.preventDefault()
    // fetch file from event and first file to be saved in file constant.
    const File = Event.target.files[0]
    //The FileReader() constructor creates a new FileReader. syntax : new FileReader()
    //file reader object lets web applns read contents of file stored on user computer.
    const reader = new window.FileReader()
    //readAsArrayBuffer() method is used to start reading the contents of a specified Blob or File . 
      //When the read operation is finished, the readyState becomes DONE , and the loadend is triggered. 
    //At that time, the result attribute contains an ArrayBuffer representing the file's data
    reader.readAsArrayBuffer(File)
    //triggers below function to print buffer word and its conversion results in console window.
    reader.onloadend = () => {
    // putting file on ipfs is two step process. first upload then submit . 
    //In order to talk these to eachother, we need to use react state object
    // console.log ('buffer', Buffer(reader.result)) hence we goona put this in state object
    this.setState = ({buffer:Buffer(reader.result)})
    } 
  }
  // Example hash :
  // Example url : 
  onSubmit = (Event) => {
    Event.preventDefault()
    console.log ('submitting the form...')
    ipfs.add (this.state.buffer, (error, result) => {
    console.log('Ipfs result',result)
    if (error) {
      console.error (error)
      return
    }
  // Step-2 store file on blockchain
  })
}

  render() {
    return (  
      <div> 
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <a
            className="navbar-brand col-sm-3 col-md-2 mr-0"
            href="http://www.dappuniversity.com/bootcamp"
            target="_blank"
            rel="noopener noreferrer"
          >
            Meme of the day 
          </a>
        </nav>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
                <a
                  href="http://www.dappuniversity.com/bootcamp"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={logo} className="App-logo" alt="logo" />
                </a>
                <p>&nbsp;</p> 
                 { 
                 //&nbsp is used to give space // also for commenting in app.js file you need to // inside curly braces
                }
               <h2>Meme of the day </h2>
                 {/* whenever form submitted it triggers onsubmit function then file which is in buffer will be put it on ipfs*/}
                   <form onSubmit = {this.onSubmit} >
                 {/* whenever file uploaded  trigger capturefile function which captures file and further converted to buffer*/}
                   <input type='file' onChange={this.captureFile}/> 
                   <input type='submit' />
                   </form>
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}
export default App;
