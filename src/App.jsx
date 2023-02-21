import axios from 'axios';
import { useRef, useState } from 'react'
import { youtube_parser } from './utils';

function App() {

  const inputUrlRef = useRef();
  const [urlResult, setUrlResult] = useState(null)
  const handleSubmit = (e) => {
    e.preventDefault()
    const youtubeId = youtube_parser(inputUrlRef.current.value)
    const option = {
      method: 'GET',
      url: 'https://youtube-mp36.p.rapidapi.com/dl',
      headers: {
        'X-RapidAPI-Key': import.meta.env.VITE_RAPID_KEY,
        'X-RapidAPI-Host': 'youtube-mp36.p.rapidapi.com'
      },
      params: {
        id: youtubeId
      }
    }
    axios(option)
      .then(res => setUrlResult(res.data.link))
      .catch(err => console.log(err))
    inputUrlRef.current.value = " ";
  }
  return (
    <div className="app">
      <span className='logo'>youth-mp3</span>
      <section className="content">
        <h1 className='content_title'>YouTube to MP3 Converter</h1>
        <p className="content_description">
          transform videos into MP3s!
        </p>
        <form onSubmit={handleSubmit} className='form'>
          <input ref={inputUrlRef} placeholder='input a video URL link' type='text' className='form_input' />
          <button type='submit' className='form_button'>SEARCH</button>
        </form>
        {urlResult ? <a target="_blank" rel="noreferrer" href={urlResult} className='download_btn'>DOWNLOAD</a> : " "}
      </section>
    </div>
  )
}


export default App
