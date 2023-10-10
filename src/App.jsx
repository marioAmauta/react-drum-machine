import { useEffect, useState } from 'react';
import { Switch } from './components/Switch';
import { modes, options } from './lib/constants';
import { changeVolume, playSound } from './lib/utils';

export default function App() {
  const [isPowerOff, setIsPowerOff] = useState(false);
  const [isSoundBankTwo, setIsSoundBankTwo] = useState(false);
  const [displayContent, setDisplayContent] = useState('');
  const [currentSoundBank, setCurrentSoundBank] = useState(modes[0]);

  useEffect(() => {
    if (isSoundBankTwo) {
      setCurrentSoundBank(modes[1]);
    } else {
      setCurrentSoundBank(modes[0]);
    }
  }, [isSoundBankTwo]);

  useEffect(() => {
    setDisplayContent(currentSoundBank);

    if (isPowerOff) {
      setDisplayContent('');
      return;
    }

    function handleKeyDown(event) {
      const key = event.key.toUpperCase();
      const isKeyValid = options[currentSoundBank].find(({ keyTrigger }) => keyTrigger === key);
      const selectedSoundName = isKeyValid.id.replaceAll('-', ' ');

      if (isKeyValid) {
        playSound({ id: key });
        setDisplayContent(selectedSoundName);
      }
    }

    document.addEventListener('keydown', event => handleKeyDown(event));

    return () => document.removeEventListener('keydown', event => handleKeyDown(event));
  }, [currentSoundBank, isPowerOff]);

  return (
    <main
      id='drum-machine'
      className='drum-machine'
    >
      <header className='controls'>
        <section className='controls-section'>
          <h3>Power {isPowerOff ? 'Off' : 'On'}</h3>
          <Switch
            id='power-switch'
            isInactive={isPowerOff}
            handleChange={() => setIsPowerOff(!isPowerOff)}
          />
        </section>
        <div
          id='display'
          className='display'
        >
          {displayContent}
        </div>
        <input
          disabled={isPowerOff}
          className='volume-slider'
          type='range'
          onChange={event => {
            changeVolume({ event });
            setDisplayContent(`Volume ${event.target.value}%`);
          }}
        />
        <section className='controls-section'>
          <h3>Sound Bank</h3>
          <Switch
            id='sound-bank-switch'
            isInactive={isSoundBankTwo}
            isDisabled={isPowerOff}
            handleChange={() => setIsSoundBankTwo(!isSoundBankTwo)}
          />
        </section>
      </header>
      <div className='drum-pads-container'>
        {options[currentSoundBank].map(({ id, keyTrigger, url }) => (
          <button
            key={id}
            id={id}
            className='drum-pad'
            onClick={() => {
              const soundName = id.replaceAll('-', ' ');

              playSound({ id: keyTrigger });
              setDisplayContent(soundName);
            }}
            disabled={isPowerOff}
          >
            {keyTrigger}
            <audio
              id={keyTrigger}
              src={url}
            ></audio>
          </button>
        ))}
      </div>
    </main>
  );
}
