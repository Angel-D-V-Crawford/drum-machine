import { useEffect, useState } from 'react';
import './App.css';

const audioMap = [
  {
    id: 'Q',
    description: 'Heater 1',
    audioSrc: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
  },
  {
    id: 'W',
    description: 'Heater 2',
    audioSrc: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
  },
  {
    id: 'E',
    description: 'Heater 3',
    audioSrc: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
  },
  {
    id: 'A',
    description: 'Heater 4',
    audioSrc: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
  },
  {
    id: 'S',
    description: 'Clap',
    audioSrc: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
  },
  {
    id: 'D',
    description: 'Open HH',
    audioSrc: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
  },
  {
    id: 'Z',
    description: 'Kick n\' Hat',
    audioSrc: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
  },
  {
    id: 'X',
    description: 'Kick',
    audioSrc: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
  },
  {
    id: 'C',
    description: 'Closed HH',
    audioSrc: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
  },
];

function Pad(props) {
  return(
    <button className='drum-pad' id={'drum-' + props.id} onClick={props.onClick}>{props.id}
      <audio className='clip' id={props.id} src={props.audioSrc}></audio>
    </button>
  );
}

function DrumMachine() {
  const [display, setDisplay] = useState('');

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    }
  });

  function handleKeyDown(event) {
    const button = document.getElementById('drum-' + event.key.toUpperCase());
    if(button != null) {
      button.click();
      button.classList.add('button-active');
    }
  }

  function handleKeyUp(event) {
    const button = document.getElementById('drum-' + event.key.toUpperCase());
    if(button != null) {
      button.classList.remove('button-active');
    }
  }

  function handleOnClick(event) {
    playAudio(event.target.innerText);
  }

  async function playAudio(audioId) {
    const audio = audioMap.find((item) => item.id === audioId);
    if(audio) {
      try {
        setDisplay(audio.description);
        await document.getElementById(audio.id).play();
      } catch(err) {
        console.log(err);
      }
    }
  }

  return(
    <div id='drum-machine'>
      <div className='button-grid'>
        {
          audioMap.map((item) => (<Pad key={item.id} id={item.id} audioSrc={item.audioSrc} onClick={handleOnClick} />))
        }
      </div>
      <p id='display'>{display}</p>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <DrumMachine />
    </div>
  );
}

export default App;
