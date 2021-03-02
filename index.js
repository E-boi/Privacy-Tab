const { Plugin } = require('powercord/entities');
const Settings = require("./Components/Settings")
var privacyEnabled = false;
let keybind;

module.exports = class PrivacyTab extends Plugin {
	startPlugin() {
		this.loadStylesheet('style.scss')
		const settings = powercord.api.settings._fluxProps('Privacy-Tab');
		settings.getSetting('blur-scale', 1);
		settings.getSetting('grayscale', false);
		settings.getSetting('lock-app', true);
		settings.getSetting('blurTiming', 1);
		keybind = settings.getSetting('keybind', 'F6');

		// init
		document.body.addEventListener("keyup", this.togglePrivacy);

		// register settings
		powercord.api.settings.registerSettings(this.entityID, {
			category: this.entityID,
			label: 'Privacy Tab',
			render: Settings
		});
	}

	pluginWillUnload() {
		powercord.api.settings.unregisterSettings(this.entityID);
		document.body.removeEventListener("keyup", this.togglePrivacy);
		if (privacyEnabled) {
			document.querySelector('.layers-3iHuyZ').classList.remove('blur-window');
		}
	}

	// toggle for privacy
	togglePrivacy(key) {
		const { getSetting: get } = powercord.api.settings._fluxProps('Privacy-Tab')
		const blurElement = document.querySelector('.appMount-3lHmkl');
		// user safety #1 :P
		if (!document.hasFocus()) {
			return;
		}
		if (key.key.toUpperCase() === keybind) {
			privacyEnabled = !privacyEnabled;
			if (privacyEnabled) {
				// enable blur
				let grayscale = "0";
				if (get("grayscale")) {
					grayscale = "100%";
				}
				let interaction = "all";
				if (get("lock-app")) {
					interaction = "none";
				}
				let timing = '1s';
				if (get('blurTiming')) timing = `${get('blurTiming')}s`
				const blurAmount = get("blur-scale") * 3;
				blurElement.style.setProperty('--blur-window', `blur(${blurAmount}px) grayscale(${grayscale})`);
				blurElement.style.setProperty('--pointer', `${interaction}`);
				blurElement.style.setProperty('--blur-timing', `${timing}`);
				blurElement.classList.add('blur-window');
			} else {
				blurElement.classList.replace('blur-window', 'unblur');
				setTimeout(() => blurElement.classList.remove('unblur'), 1000);
			};
		};
		// if keybind gets changed
		if (keybind !== get('keybind')) keybind = get('keybind')
	}
};
