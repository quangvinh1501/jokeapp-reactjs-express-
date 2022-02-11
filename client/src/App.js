import React, { useState, useEffect } from 'react';
import axios from 'axios';
const wait = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 200);
  });
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
const App = () => {
  const [votes, setVotes] = useState([]);
  const [idoffset, setidoffset] = useState(parseInt(localStorage.getItem('jokeappoffset')) || 0);

  useEffect(() => {
    console.log(idoffset);
    localStorage.setItem('jokeappoffset', JSON.stringify(idoffset));
    fetchData();
  }, [idoffset])

  const fetchData = async () => {
    console.log('gia tri idoffset o fetchdata: ', idoffset);
    const response = await axios.get("http://localhost:4000/api/getAllVotes",
      {
        params: {
          idoffset
        }
      }
    );
    setVotes(response.data);
  };
  const handlePlusVote = async (item) => {
    setidoffset(idoffset + 1);
    const dataput = {
      vote_id: parseInt(item.vote_id)
    }
    console.log(item.vote_id, 'dddddddddddddddddddddd');
    const response = await axios.put("http://localhost:4000/api/updatevotelike", dataput);
    console.log(response.data, 'dataaaaaaaaaaaaaa');
  }

  const handleMinusVote = async (item) => {
    setidoffset(idoffset + 1);
    const dataput = {
      vote_id: parseInt(item.vote_id)
    }
    console.log(item.vote_id, 'fffffffffffffffffff');
    const response = await axios.put("http://localhost:4000/api/updatevotedisklike", dataput);
    console.log(response.data, 'dataaaaaaaaaaaaaa');
  }
  return (
    <div className='wrapper'>
      <nav className="navbar navbar-dark bg-dark navbar-expand-sm navcustom">
        <a className="navbar-brand" href="#"><img src="../assets/logo/logo1.jpg" style={{ height: '40px', width: '40px' }} alt="logo" /> Joke app</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-list-4" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <a className="nav-link" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{ color: 'white' }}>
                Hi! Vinh <img src="../assets/avatar/avatar1.png" style={{ height: '40px', width: '40px' }} className="rounded-circle" />
              </a>
            </li>
          </ul>
        </div>
      </nav>
      <main role="main">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className='divoutner'>
                <div className='divinner'>
                  <h2>A joke a day keeps the doctor away</h2>
                </div>
                <div style={{ clear: 'both' }}></div>
                <div className='divinnersmall'>
                  <h5>If you joke wrong way, your teeth have a pay. (Serious)</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row" style={{width:'100%'}}>
            <div className="col-md-3">
            <img src="../assets/avatar/baby2.gif" />
            </div>
            <div className="col-md-9">
              <div className='divcontentjoke'>
                <div className='divdetailjoke'>
                  <div className="row">
                    {votes.length ? votes.map((item, index) =>
                    (
                      <div className="rowforeach" key={index}>
                        <div className="rowcontent" id={item.vote_id}>{item.vote_content}</div>
                        <div style={{ clear: 'both' }}></div>
                        <div className="rowbutton" className="divbuttonjoke" style={{ marginTop: '20px' }}>
                          <button className='btn btn-primary' style={{ marginRight: '20px', marginBottom: '10px' }} onClick={() => handlePlusVote(item)}>This is Funny (Total: {item.vote_like})</button>
                          <button className='btn btn-success' style={{ marginRight: '20px', marginBottom: '10px' }} onClick={() => handleMinusVote(item)}>This is not Funny (Total: {item.vote_dislike})</button>
                        </div>
                      </div>
                    )) : (
                      <div className="rowforeach" style={{ width: '100%', textAlign: 'center' }}>
                        <div className="rowcontent"><h3>That's all the jokes for today! Come back another day!</h3></div>
                      </div>
                    )
                    }
                  </div>


                </div>
              </div>
            </div>
          </div>
          </div>
      </main>
    </div>
  )
}

export default App;