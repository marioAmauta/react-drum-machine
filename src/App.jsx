import { useState } from 'react'
import { Switch } from './components/Switch'
import { elementClasses, elementIds, elementTestIds, modes, options } from './lib/constants'
import { playSound, setVolume } from './lib/utils'
import { VolumeSlider } from './components/VolumeSlider'
import { useSoundBank } from './hooks/useSoundBank'
import { Controls, ControlsSection } from './components/Controls'
import { Display } from './components/Display'
import { usePower } from './hooks/usePower'
import { DrumPad, DrumPadsContainer } from './components/DrumPad'
import { useVolume } from './hooks/useVolume'

export default function App() {
  const [displayContent, setDisplayContent] = useState('')
  const { currentSoundBank, isSoundBankTwo, setIsSoundBankTwo } = useSoundBank({ setDisplayContent })
  const { isPowerOff, setIsPowerOff } = usePower({ currentSoundBank, setDisplayContent })
  const { currentVolume, setCurrentVolume } = useVolume({ isPowerOff })

  const onPowerChange = () => {
    setIsPowerOff(!isPowerOff)
  }

  const onSoundBankChange = () => {
    setIsSoundBankTwo(!isSoundBankTwo)
    setDisplayContent(isSoundBankTwo ? modes[0] : modes[1])
  }

  const onVolumeChange = event => {
    const volume = Number(event.target.value)

    setVolume({ volume })
    setCurrentVolume(volume)
    setDisplayContent(`Volume ${volume}%`)
  }

  const onDrumPadClick = ({ id, keyTrigger }) => {
    const soundName = id.replaceAll('-', ' ')

    playSound({ id: keyTrigger })
    setDisplayContent(soundName)
  }

  return (
    <main
      id={elementIds.drumMachine}
      className={elementClasses.drumMachine}
    >
      <Controls>
        <ControlsSection title={`Power ${isPowerOff ? 'Off' : 'On'}`}>
          <Switch
            testId={elementTestIds.powerSwitch}
            id={elementIds.powerSwitch}
            isInactive={isPowerOff}
            handleChange={onPowerChange}
          />
        </ControlsSection>
        <Display displayContent={displayContent} />
        <VolumeSlider
          isDisabled={isPowerOff}
          currentVolume={currentVolume}
          onVolumeChange={onVolumeChange}
        />
        <ControlsSection title='Sound Bank'>
          <Switch
            testId={elementTestIds.soundBankSwitch}
            id={elementIds.soundBankSwitch}
            isInactive={isSoundBankTwo}
            isDisabled={isPowerOff}
            handleChange={onSoundBankChange}
          />
        </ControlsSection>
      </Controls>
      <DrumPadsContainer>
        {options[currentSoundBank].map(({ id, keyTrigger, url }) => (
          <DrumPad
            key={id}
            id={id}
            keyTrigger={keyTrigger}
            url={url}
            isPowerOff={isPowerOff}
            currentVolume={currentVolume}
            onClick={() => onDrumPadClick({ id, keyTrigger })}
          />
        ))}
      </DrumPadsContainer>
    </main>
  )
}
