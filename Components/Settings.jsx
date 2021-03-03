const { React } = require('powercord/webpack')
const { SwitchItem, SliderInput } = require('powercord/components/settings')
const KeybindRecorder = require('./KeybindRecorder')

module.exports = class Settings extends React.PureComponent {
	constructor(props) {
		super(props);
	}


	render() {
		const { getSetting, toggleSetting, updateSetting } = this.props
		return (
			<div>
				<KeybindRecorder value={getSetting('keybind', '6')} 
          onChange={(e) => {
        		this.setState({value: e})
        		updateSetting('keybind', e)
            }}
            onReset={() => {
              this.setState({value: 'F6'})
              updateSetting('keybind', 'F6')
           	}}
          >Toggle Keybind
				</KeybindRecorder>
				<SliderInput
					stickToMarkers
					minValue={0.1}
					maxValue={4}
					initialValue={getSetting('blurTiming', 1)}
					markers={[0.1, 0.2, 0.5, 0.7, 1, 2, 3, 4]}
					defaultValue={1}
					onValueChange={(change) => updateSetting('blurTiming', change)}
      	>Blur Timing (in seconds)</SliderInput>
				<SliderInput
					minValue={0.5}
					maxValue={10}
					stickToMarkers
					markers={[0.5, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
					defaultValue={1}
					initialValue={getSetting('blur-scale', 1)}
					onValueChange={val => updateSetting('blur-scale', val)}
					note='Scale of the blur amount.'
					onMarkerRender={v => `x${v}`}
				>
					Blur Scale
        </SliderInput>
				<SwitchItem
					value={getSetting('lock-app', true)}
					onChange={() => {
						toggleSetting('lock-app')
					}}
					note='Whilist being hidden, you will not be able to interact with discord.'
				>
					Lock Application
        </SwitchItem>
				<br></br>
				<SwitchItem
					value={getSetting('grayscale')}
					onChange={() => {
						toggleSetting('grayscale')
					}}
				>
					Grayscale Enabled
        </SwitchItem>
			</div>
		);
	}
}
