const { Plugin } = require('powercord/entities');
const Settings = require("./Settings")
var privacyEnabled = false;

module.exports = class PrivacyTab extends Plugin {
	startPlugin() {
		this.loadStylesheet('style.scss')
		const settings = powercord.api.settings._fluxProps('Privacy-Tab')
		settings.getSetting('blur-scale', 1)
		settings.getSetting('grayscale', false)
		settings.getSetting('lock-app', true)

		// init
		document.onkeyup = this.togglePrivacy;

		// register settings
		powercord.api.settings.registerSettings(this.entityID, {
			category: this.entityID,
			label: 'Privacy Tab',
			render: Settings
		});
	}

	pluginWillUnload() {
		powercord.api.settings.unregisterSettings(this.entityID);
		if (privacyEnabled) {
			document.querySelector('.layers-3iHuyZ').classList.remove('blur-window');
		}
	}

	// toggle for privacy
	togglePrivacy(key) {
		const { getSetting: get } = powercord.api.settings._fluxProps('Privacy-Tab')
		const blurElement = document.querySelector('.layers-3iHuyZ');
		// user safety #1 :P
		if (!document.hasFocus()) {
			return;
		}
		if (key.key === 'F6') {
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
				const blurAmount = get("blur-scale") * 3;
				blurElement.style.setProperty('--blur-window', `blur(${blurAmount}px) grayscale(${grayscale})`);
				blurElement.style.setProperty('--pointer', `${interaction}`);
				blurElement.classList.add('blur-window');
			} else {
				blurElement.classList.replace('blur-window', 'unblur');
				setTimeout(() => blurElement.classList.remove('unblur'), 1000);
			};
		}
	}
};
