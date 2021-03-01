const { React } = require('powercord/webpack')
const { SwitchItem, TextInput, SliderInput, KeybindRecorder } = require('powercord/components/settings')
const { Divider } = require('powercord/components')

module.exports = class Settings extends React.PureComponent {
	constructor(props) {
		super(props);
	}


	render() {
		const { getSetting, toggleSetting, updateSetting } = this.props
		return (
			<div>
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
