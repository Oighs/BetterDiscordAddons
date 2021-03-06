//META{"name":"MessageUtilities"}*//

class MessageUtilities {
	constructor () {
		this.actions = {
			"Edit_Message":			{name:"Edit Message",					func:this.doEdit,		default:{click:1, 	key1:0, 	key2:0}},
			"Delete_Message":		{name:"Delete Message",					func:this.doDelete,		default:{click:0, 	key1:46, 	key2:0}},
			"Pin/Unpin_Message":	{name:"Pin/Unpin Message",				func:this.doPinUnPin,	default:{click:0, 	key1:17, 	key2:0}},
			"React_to_Message":		{name:"React to Message",				func:this.doOpenReact,	default:{click:0, 	key1:9, 	key2:0}},
			"__Note_Message":		{name:"Note Message (Pesonal Pins)",	func:this.doNote,		default:{click:0, 	key1:16, 	key2:0}}
		};
		
		this.bindings = {};
		
		this.firedEvents = [];
		
		this.clickMap = ["SINGLE" /*[0]*/, "DOUBLE" /*[1]*/];
		
		this.keyboardMap = [
			"NONE" /*[0]*/, "" /*[1]*/, "" /*[2]*/, "CANCEL" /*[3]*/, "" /*[4]*/, "" /*[5]*/, "HELP" /*[6]*/, "" /*[7]*/, "BACK_SPACE" /*[8]*/, "TAB" /*[9]*/, "" /*[10]*/, "" /*[11]*/, "CLEAR" /*[12]*/, "ENTER" /*[13]*/, "ENTER_SPECIAL" /*[14]*/, "" /*[15]*/, "SHIFT" /*[16]*/, "CONTROL" /*[17]*/, "ALT" /*[18]*/, "PAUSE" /*[19]*/, "CAPS_LOCK" /*[20]*/, "KANA" /*[21]*/, "EISU" /*[22]*/, "JUNJA" /*[23]*/, "FINAL" /*[24]*/, "HANJA" /*[25]*/, "" /*[26]*/, "ESCAPE" /*[27]*/, "CONVERT" /*[28]*/, "NONCONVERT" /*[29]*/, "ACCEPT" /*[30]*/, "MODECHANGE" /*[31]*/, "SPACE" /*[32]*/, "PAGE_UP" /*[33]*/, "PAGE_DOWN" /*[34]*/, "END" /*[35]*/, "HOME" /*[36]*/, "LEFT" /*[37]*/, "UP" /*[38]*/, "RIGHT" /*[39]*/, "DOWN" /*[40]*/, "SELECT" /*[41]*/, "PRINT" /*[42]*/, "EXECUTE" /*[43]*/, "PRINTSCREEN" /*[44]*/, "INSERT" /*[45]*/, "DELETE" /*[46]*/, "" /*[47]*/,"0" /*[48]*/, "1" /*[49]*/, "2" /*[50]*/, "3" /*[51]*/, "4" /*[52]*/, "5" /*[53]*/, "6" /*[54]*/, "7" /*[55]*/, "8" /*[56]*/, "9" /*[57]*/, "COLON" /*[58]*/, "SEMICOLON" /*[59]*/, "LESS_THAN" /*[60]*/, "EQUALS" /*[61]*/, "GREATER_THAN" /*[62]*/, "QUESTION_MARK" /*[63]*/, "AT" /*[64]*/, "A" /*[65]*/, "B" /*[66]*/, "C" /*[67]*/, "D" /*[68]*/, "E" /*[69]*/, "F" /*[70]*/, "G" /*[71]*/, "H" /*[72]*/, "I" /*[73]*/, "J" /*[74]*/, "K" /*[75]*/, "L" /*[76]*/, "M" /*[77]*/, "N" /*[78]*/, "O" /*[79]*/, "P" /*[80]*/, "Q" /*[81]*/, "R" /*[82]*/, "S" /*[83]*/, "T" /*[84]*/, "U" /*[85]*/, "V" /*[86]*/, "W" /*[87]*/, "X" /*[88]*/, "Y" /*[89]*/, "Z" /*[90]*/, "OS_KEY" /*[91]*/, "" /*[92]*/, "CONTEXT_MENU" /*[93]*/, "" /*[94]*/, "SLEEP" /*[95]*/, "NUMPAD0" /*[96]*/, "NUMPAD1" /*[97]*/, "NUMPAD2" /*[98]*/, "NUMPAD3" /*[99]*/, "NUMPAD4" /*[100]*/, "NUMPAD5" /*[101]*/, "NUMPAD6" /*[102]*/, "NUMPAD7" /*[103]*/, "NUMPAD8" /*[104]*/, "NUMPAD9" /*[105]*/, "MULTIPLY" /*[106]*/, "ADD" /*[107]*/, "SEPARATOR" /*[108]*/, "SUBTRACT" /*[109]*/, "DECIMAL" /*[110]*/, "DIVIDE" /*[111]*/, "F1" /*[112]*/, "F2" /*[113]*/, "F3" /*[114]*/, "F4" /*[115]*/, "F5" /*[116]*/, "F6" /*[117]*/, "F7" /*[118]*/, "F8" /*[119]*/, "F9" /*[120]*/, "F10" /*[121]*/, "F11" /*[122]*/, "F12" /*[123]*/, "F13" /*[124]*/, "F14" /*[125]*/, "F15" /*[126]*/, "F16" /*[127]*/, "F17" /*[128]*/, "F18" /*[129]*/, "F19" /*[130]*/, "F20" /*[131]*/, "F21" /*[132]*/, "F22" /*[133]*/, "F23" /*[134]*/, "F24" /*[135]*/, "" /*[136]*/, "" /*[137]*/, "" /*[138]*/, "" /*[139]*/, "" /*[140]*/, "" /*[141]*/, "" /*[142]*/, "" /*[143]*/, "NUM_LOCK" /*[144]*/, "SCROLL_LOCK" /*[145]*/, "WIN_OEM_FJ_JISHO" /*[146]*/, "WIN_OEM_FJ_MASSHOU" /*[147]*/, "WIN_OEM_FJ_TOUROKU" /*[148]*/, "WIN_OEM_FJ_LOYA" /*[149]*/, "WIN_OEM_FJ_ROYA" /*[150]*/, "" /*[151]*/, "" /*[152]*/, "" /*[153]*/, "" /*[154]*/, "" /*[155]*/, "" /*[156]*/, "" /*[157]*/, "" /*[158]*/, "" /*[159]*/, "CIRCUMFLEX" /*[160]*/, "EXCLAMATION" /*[161]*/, "DOUBLE_QUOTE" /*[162]*/, "HASH" /*[163]*/, "DOLLAR" /*[164]*/, "PERCENT" /*[165]*/, "AMPERSAND" /*[166]*/, "UNDERSCORE" /*[167]*/, "OPEN_PAREN" /*[168]*/, "CLOSE_PAREN" /*[169]*/, "ASTERISK" /*[170]*/, "PLUS" /*[171]*/, "PIPE" /*[172]*/, "HYPHEN_MINUS" /*[173]*/, "OPEN_CURLY_BRACKET" /*[174]*/, "CLOSE_CURLY_BRACKET" /*[175]*/, "TILDE" /*[176]*/, "" /*[177]*/, "" /*[178]*/, "" /*[179]*/, "" /*[180]*/, "VOLUME_MUTE" /*[181]*/, "VOLUME_DOWN" /*[182]*/, "VOLUME_UP" /*[183]*/, "" /*[184]*/, "" /*[185]*/, "SEMICOLON" /*[186]*/, "EQUALS" /*[187]*/, "COMMA" /*[188]*/, "MINUS" /*[189]*/, "PERIOD" /*[190]*/, "SLASH" /*[191]*/, "BACK_QUOTE" /*[192]*/, "" /*[193]*/, "" /*[194]*/, "" /*[195]*/, "" /*[196]*/, "" /*[197]*/, "" /*[198]*/, "" /*[199]*/, "" /*[200]*/, "" /*[201]*/, "" /*[202]*/, "" /*[203]*/, "" /*[204]*/, "" /*[205]*/, "" /*[206]*/, "" /*[207]*/, "" /*[208]*/, "" /*[209]*/, "" /*[210]*/, "" /*[211]*/, "" /*[212]*/, "" /*[213]*/, "" /*[214]*/, "" /*[215]*/, "" /*[216]*/, "" /*[217]*/, "" /*[218]*/, "OPEN_BRACKET" /*[219]*/, "BACK_SLASH" /*[220]*/, "CLOSE_BRACKET" /*[221]*/, "QUOTE" /*[222]*/, "" /*[223]*/, "META" /*[224]*/, "ALTGR" /*[225]*/, "" /*[226]*/, "WIN_ICO_HELP" /*[227]*/, "WIN_ICO_00" /*[228]*/, "" /*[229]*/, "WIN_ICO_CLEAR" /*[230]*/, "" /*[231]*/,"" /*[232]*/, "WIN_OEM_RESET" /*[233]*/, "WIN_OEM_JUMP" /*[234]*/, "WIN_OEM_PA1" /*[235]*/, "WIN_OEM_PA2" /*[236]*/, "WIN_OEM_PA3" /*[237]*/, "WIN_OEM_WSCTRL" /*[238]*/,"WIN_OEM_CUSEL" /*[239]*/, "WIN_OEM_ATTN" /*[240]*/, "WIN_OEM_FINISH" /*[241]*/, "WIN_OEM_COPY" /*[242]*/, "WIN_OEM_AUTO" /*[243]*/, "WIN_OEM_ENLW" /*[244]*/, "WIN_OEM_BACKTAB" /*[245]*/, "ATTN" /*[246]*/, "CRSEL" /*[247]*/, "EXSEL" /*[248]*/, "EREOF" /*[249]*/, "PLAY" /*[250]*/, "ZOOM" /*[251]*/, "" /*[252]*/, "PA1" /*[253]*/, "WIN_OEM_CLEAR" /*[254]*/, "" /*[255]*/
		];
		
		this.myID;
		
		this.css = `.MessageUtilities-settings div {margin-top:0 !important;}`;
	}

	getName () {return "MessageUtilities";}

	getDescription () {return "Offers a number of useful message options. Remap the keybindings in the settings.";}

	getVersion () {return "1.2.5";}

	getAuthor () {return "DevilBro";}
	
	getSettingsPanel () {
		if (typeof BDfunctionsDevilBro === "object") {
			var settingshtml = `<div class="${this.getName()}-settings marginTop20-3UscxH">`;
			var settings = this.getSettings(); 
			var clicks = ["click"];
			var keys = ["key1","key2"];
			for (var action in this.actions) {
				var binding = BDfunctionsDevilBro.loadData(action, this.getName(), "bindings");
				settingshtml += `<div class="${action}-key-settings"><div class="flex-lFgbSz flex-3B1Tl4 horizontal-2BEEBe horizontal-2VE-Fw flex-3B1Tl4 directionRow-yNbSvJ justifyStart-2yIZo0 alignStart-pnSyE6 noWrap-v6g9vO marginBottom8-1mABJ4" style="flex: 1 1 auto;"><h3 class="titleDefault-1CWM9y title-3i-5G_ marginReset-3hwONl weightMedium-13x9Y8 size16-3IvaX_ height24-2pMcnc flexChild-1KGW5q" style="flex: 1 1 auto;">${this.actions[action].name}:</h3><div class="flexChild-1KGW5q switchEnabled-3CPlLV switch-3lyafC value-kmHGfs sizeDefault-rZbSBU size-yI1KRe themeDefault-3M0dJU ${settings[action] ? "valueChecked-3Bzkbm" : "valueUnchecked-XR6AOk"}" style="flex: 0 0 auto;"><input type="checkbox" value="${action}" class="checkboxEnabled-4QfryV checkbox-1KYsPm"${settings[action] ? " checked" : ""}></div></div><div class="flex-lFgbSz flex-3B1Tl4 horizontal-2BEEBe horizontal-2VE-Fw flex-3B1Tl4 directionRow-yNbSvJ justifyStart-2yIZo0 alignStart-pnSyE6 noWrap-v6g9vO marginBottom8-1mABJ4" style="flex: 1 1 auto;">`;
				for (var click of clicks) {
					settingshtml += `<div class="ui-form-item flexChild-1KGW5q" style="flex: 1 1 20%;"><h5 class="h5-3KssQU title-1pmpPr size12-1IGJl9 height16-1qXrGy weightSemiBold-T8sxWH defaultMarginh5-2UwwFY marginBottom4-_yArcI">${click}:</h5><div class="ui-select ${click}-select-wrapper"><div type="${action}" option="${click}" value="${binding[click]}" class="Select Select--single has-value"><div class="Select-control"><div class="flex-lFgbSz flex-3B1Tl4 horizontal-2BEEBe horizontal-2VE-Fw flex-3B1Tl4 directionRow-yNbSvJ justifyStart-2yIZo0 alignBaseline-4enZzv noWrap-v6g9vO wrapper-1v8p8a Select-value" style="flex: 1 1 auto;"><div class="title-3I2bY1 medium-2KnC-N size16-3IvaX_ height20-165WbF primary-2giqSn weightNormal-3gw0Lm">${this.clickMap[binding[click]]}</div></div><span class="Select-arrow-zone"><span class="Select-arrow"></span></span></div></div></div></div>`;
				}
				for (var key of keys) {
					settingshtml += `<div class="ui-form-item flexChild-1KGW5q" style="flex: 1 1 40%;"><h5 class="h5-3KssQU title-1pmpPr size12-1IGJl9 height16-1qXrGy weightSemiBold-T8sxWH defaultMarginh5-2UwwFY marginBottom4-_yArcI">${key}:<label class="reset-recorder" style="float:right;padding-right:5px;cursor:pointer;">✖</label></h5><div type="${action}" option="${key}" value="${binding[key]}" class="ui-key-recorder ui-input-button default has-value"><div class="flex-lFgbSz flex-3B1Tl4 horizontal-2BEEBe horizontal-2VE-Fw flex-3B1Tl4 directionRow-yNbSvJ justifyStart-2yIZo0 alignStretch-1hwxMa noWrap-v6g9vO layout" style="flex: 1 1 auto;"><input type="text" placeholder="${this.keyboardMap[binding[key]]}" readonly="" value="${this.keyboardMap[binding[key]]}" class="input" style="flex: 1 1 auto;"><div class="flex-lFgbSz flex-3B1Tl4 horizontal-2BEEBe horizontal-2VE-Fw flex-3B1Tl4 directionRow-yNbSvJ justifyStart-2yIZo0 alignStretch-1hwxMa noWrap-v6g9vO" style="flex: 0 1 auto; margin: 0px;"><button type="button" class="buttonGreyGhostDefault-2h5dqi buttonGhostDefault-2NFSwJ buttonDefault-2OLW-v button-2t3of8 buttonGhost-2Y7zWJ buttonGreyGhost-SfY7zU minGrow-1W9N45 min-K7DTfI ui-input-button-ui-button key-recorder-button"><div class="contentsDefault-nt2Ym5 contents-4L4hQM contentsGhost-2Yp1r8"><span class="key-recorder-button-text">Change Hotkey</span><span class="key-recorder-edit-icon"></span></div></button></div></div></div></div>`;
				}
				settingshtml += `</div></div>`;
			}
			settingshtml += `<div class="flex-lFgbSz flex-3B1Tl4 horizontal-2BEEBe horizontal-2VE-Fw flex-3B1Tl4 directionRow-yNbSvJ justifyStart-2yIZo0 alignStart-pnSyE6 noWrap-v6g9vO marginBottom20-2Ifj-2" style="flex: 0 0 auto;"><h3 class="titleDefault-1CWM9y title-3i-5G_ marginReset-3hwONl weightMedium-13x9Y8 size16-3IvaX_ height24-2pMcnc flexChild-1KGW5q" style="flex: 1 1 auto; padding-top:8px;">Reset all key bindings.</h3><button type="button" class="flexChild-1KGW5q buttonBrandFilledDefault-2Rs6u5 buttonFilledDefault-AELjWf buttonDefault-2OLW-v button-2t3of8 buttonFilled-29g7b5 buttonBrandFilled-3Mv0Ra mediumGrow-uovsMu reset-button" style="flex: 0 0 auto;"><div class="contentsDefault-nt2Ym5 contents-4L4hQM contentsFilled-3M8HCx contents-4L4hQM">Reset</div></button></div>`;
			settingshtml += `</div>`;
			
			
			var settingspanel = $(settingshtml)[0];
			$(settingspanel)
				.on("click", ".checkbox-1KYsPm", () => {this.updateSettings(settingspanel);})
				.on("click", ".Select-control", (e) => {this.openDropdownMenu(settingspanel, e);})
				.on("click", ".ui-key-recorder", (e) => {this.startRecording(settingspanel, e);})
				.on("click", ".reset-recorder", (e) => {this.resetRecorder(settingspanel, e);})
				.on("click", ".reset-button", () => {this.resetAll(settingspanel);})
				.find(".__Note_Message-key-settings").toggle(BDfunctionsDevilBro.isPluginEnabled("PersonalPins"));
				
			return settingspanel;
		}
	}

	//legacy
	load () {}

	start () {
		if (typeof BDfunctionsDevilBro !== "object" || BDfunctionsDevilBro.isLibraryOutdated()) {
			if (typeof BDfunctionsDevilBro === "object") BDfunctionsDevilBro = "";
			$('head script[src="https://mwittrien.github.io/BetterDiscordAddons/Plugins/BDfunctionsDevilBro.js"]').remove();
			$('head').append('<script src="https://mwittrien.github.io/BetterDiscordAddons/Plugins/BDfunctionsDevilBro.js"></script>');
		}
		if (typeof BDfunctionsDevilBro === "object") {
			BDfunctionsDevilBro.loadMessage(this);
			
			this.myID = BDfunctionsDevilBro.getMyUserData().id;
			
			this.ChannelStore = BDfunctionsDevilBro.WebModules.findByProperties(["getChannel", "getChannels"]);
			this.MessageActions = BDfunctionsDevilBro.WebModules.findByProperties(["startEditMessage", "endEditMessage"]);
			this.PinActions = BDfunctionsDevilBro.WebModules.findByProperties(["pinMessage", "unpinMessage"]);
			this.CurrentUserPerms = BDfunctionsDevilBro.WebModules.findByProperties(["getChannelPermissions", "can"]);
			this.Permissions = BDfunctionsDevilBro.WebModules.findByProperties(["Permissions", "ActivityTypes"]).Permissions;
			
			this.loadBindings();
			
			$(document)
				.on("click." + this.getName(), ".message", (e) => {
					this.onClick(e.currentTarget, 0, "onSglClick");
				})
				.on("dblclick." + this.getName(), ".message", (e) => {
					this.onClick(e.currentTarget, 1, "onDblClick");
				})
				.on("keydown." + this.getName(), ".channelTextArea-os01xC", (e) => {
					this.onKeyDown(e.currentTarget, e.which, "onKeyDown");
				});
				
			BDfunctionsDevilBro.appendLocalStyle(this.getName(), this.css);
		}
		else {
			console.error(this.getName() + ": Fatal Error: Could not load BD functions!");
		}
	}

	stop () {
		if (typeof BDfunctionsDevilBro === "object") {
			BDfunctionsDevilBro.unloadMessage(this);
			
			$(document).off("click." + this.getName(), ".message");
			$(document).off("dblclick." + this.getName(), ".message");
			$(document).off("keydown." + this.getName(), ".channelTextArea-os01xC");
			
			BDfunctionsDevilBro.removeLocalStyle(this.getName());
		}
	}

	
	//begin of own functions
	
	getSettings () {
		var oldSettings = BDfunctionsDevilBro.loadAllData(this.getName(), "settings"), newSettings = {}, saveSettings = false;
		for (let action in this.actions) {
			if (oldSettings[action] == null) {
				newSettings[action] = true;
				saveSettings = true;
			}
			else {
				newSettings[action] = oldSettings[action];
			}
		}
		if (saveSettings) BDfunctionsDevilBro.saveAllData(newSettings, this.getName(), "settings");
		return newSettings;
	}

	updateSettings (settingspanel) {
		var settings = {};
		for (var input of settingspanel.querySelectorAll(".checkbox-1KYsPm")) {
			settings[input.value] = input.checked;
			input.parentElement.classList.toggle("valueChecked-3Bzkbm", input.checked);
			input.parentElement.classList.toggle("valueUnchecked-XR6AOk", !input.checked);
		}
		BDfunctionsDevilBro.saveAllData(settings, this.getName(), "settings");
	}
	
	resetAll (settingspanel) {
		if (confirm("Are you sure you want to delete all key bindings?")) {
			BDfunctionsDevilBro.removeAllData(this.getName(), "bindings");
			this.loadBindings();
			settingspanel.querySelectorAll(".Select").forEach((wrap) => {
				var action = wrap.getAttribute("type");
				var option = wrap.getAttribute("option");
				wrap.setAttribute("value", this.actions[action].default[option]);
				wrap.querySelector(".title-3I2bY1").innerText = this.clickMap[this.actions[action].default[option]];
			});
			settingspanel.querySelectorAll(".ui-key-recorder").forEach((wrap) => {
				var action = wrap.getAttribute("type");
				var option = wrap.getAttribute("option");
				wrap.setAttribute("value", this.actions[action].default[option]);
				wrap.querySelector("input").setAttribute("value", this.keyboardMap[this.actions[action].default[option]]);
			});;
		}
	}
	
	openDropdownMenu (settingspanel, e) {
		var selectControl = e.currentTarget;
		var selectWrap = selectControl.parentElement;
		
		if (selectWrap.classList.contains("is-open")) return;
		
		selectWrap.classList.add("is-open");
		
		var action = selectWrap.getAttribute("type");
		var option = selectWrap.getAttribute("option");
		var value = selectWrap.getAttribute("value");
		
		var selectMenu = this.createDropdownMenu(action, value);
		selectWrap.appendChild(selectMenu);
		
		$(selectMenu).on("mousedown." + this.getName(), ".Select-option", (e2) => {
			var binding = BDfunctionsDevilBro.loadData(action, this.getName(), "bindings");
			var selection = e2.currentTarget.getAttribute("value");
			selectWrap.setAttribute("value", selection);
			selectControl.querySelector(".title-3I2bY1").innerText = e2.currentTarget.textContent;
			binding[option] = parseInt(selection);
			BDfunctionsDevilBro.saveData(action, binding, this.getName(), "bindings");
		});
		$(document).on("mousedown.select" + this.getName(), () => {
			$(document).off("mousedown.select" + this.getName());
			selectMenu.remove()
			setTimeout(() => {selectWrap.classList.remove("is-open");},100);
		});
	}
	
	createDropdownMenu (action, value) {
		var menuhtml = `<div class="Select-menu-outer"><div class="Select-menu">`;
		for (var i in this.clickMap) {
			var isSelected = i == value ? " is-selected" : "";
			menuhtml += `<div value="${i}" class="flex-lFgbSz flex-3B1Tl4 horizontal-2BEEBe horizontal-2VE-Fw flex-3B1Tl4 directionRow-yNbSvJ justifyStart-2yIZo0 alignBaseline-4enZzv noWrap-v6g9vO wrapper-1v8p8a Select-option ${isSelected}" style="flex: 1 1 auto;"><div class="title-3I2bY1 medium-2KnC-N size16-3IvaX_ height20-165WbF primary-2giqSn weightNormal-3gw0Lm">${this.clickMap[i]}</div></div>`
		}
		menuhtml += `</div></div>`;
		return $(menuhtml)[0];
	}
	
	startRecording (settingspanel, e) {
		var recorderWrap = e.currentTarget;
		
		if (recorderWrap.classList.contains("recording")) return;
		
		var recorderInput = recorderWrap.querySelector("input");
		var recorderText = recorderWrap.querySelector(".key-recorder-button-text");
		var action = recorderWrap.getAttribute("type");
		var option = recorderWrap.getAttribute("option");
		
		recorderWrap.classList.add("recording");
		recorderWrap.classList.remove("has-value");
		recorderText.innerText = "Stop Recording";
		
		$(document).on("keydown.recorder" + this.getName(), (e) => {
			recorderWrap.setAttribute("value", e.which);
			recorderInput.setAttribute("value", this.keyboardMap[e.which]);
		});
		
		$(document).on("mousedown.recorder" + this.getName(), () => {
			$(document).off("mousedown.recorder" + this.getName());
			$(document).off("keydown.recorder" + this.getName());
			var binding = BDfunctionsDevilBro.loadData(action, this.getName(), "bindings");
			binding[option] = parseInt(recorderWrap.getAttribute("value"));
			BDfunctionsDevilBro.saveData(action, binding, this.getName(), "bindings");
			setTimeout(() => {
				recorderWrap.classList.remove("recording");
				recorderWrap.classList.add("has-value");
				recorderText.innerText = "Change Hotkey";
			},100);
		});
	}
	
	resetRecorder (settingspanel, e) {
		var resetButton = e.currentTarget;
		var recorderWrap = e.currentTarget.parentElement.parentElement.querySelector(".ui-key-recorder");
		var recorderInput = recorderWrap.querySelector("input");
		var action = recorderWrap.getAttribute("type");
		var option = recorderWrap.getAttribute("option");
		recorderWrap.setAttribute("value", 0);
		recorderInput.setAttribute("value", this.keyboardMap[0]);
		var binding = BDfunctionsDevilBro.loadData(action, this.getName(), "bindings");
		binding[option] = parseInt(recorderWrap.getAttribute("value"));
		BDfunctionsDevilBro.saveData(action, binding, this.getName(), "bindings");
	}
	
	loadBindings () {
		for (var action in this.actions) {
			var binding = BDfunctionsDevilBro.loadData(action, this.getName(), "bindings");
			if (!binding) binding = this.actions[action].default;
			BDfunctionsDevilBro.saveData(action, binding, this.getName(), "bindings");
		}
	}
	
	onClick (div, click, name) {
		if (!this.isEventFired(name)) {
			this.fireEvent(name);
			var bindings = BDfunctionsDevilBro.loadAllData(this.getName(), "bindings");
			var settings = this.getSettings();
			for (let action in bindings) {
				var binding = bindings[action];
				console.log();
				if (settings[action] && binding.click == click && this.checkIfKeyPressed(binding.key1) && this.checkIfKeyPressed(binding.key2)) {
					var message = this.getMessageData(div)
					if (message) this.actions[action].func.bind(this)(message);
					break;
				}
			}
			this.cancelEvent(name);
		}
	}
	
	doDelete (message) {
		var channel = this.ChannelStore.getChannel(message.channel_id);
		if ((channel && this.CurrentUserPerms.can(this.Permissions.MANAGE_MESSAGES, channel)) || message.author.id == this.myID) {
			this.MessageActions.deleteMessage(message.channel_id, message.id);
		}
	}
	
	doEdit (message) {
		if (message.author.id == this.myID) {
			this.MessageActions.startEditMessage(message.channel_id, message.id, message.content);
		}
	}
	
	doOpenReact (message) {
		var reactButton = message.div.parentElement.querySelector(".btn-reaction");
		if (reactButton) reactButton.click();
	}
	
	doPinUnPin (message) {
		var channel = this.ChannelStore.getChannel(message.channel_id);
		if (channel && this.CurrentUserPerms.can(this.Permissions.MANAGE_MESSAGES, channel)) {
			if (message.pinned) 	this.PinActions.unpinMessage(channel, message.id);
			else 					this.PinActions.pinMessage(channel, message.id);
		}
	}
	
	doNote (message) {
		if (BDfunctionsDevilBro.isPluginEnabled("PersonalPins") == true) {
			var PersonalPins = window.bdplugins["PersonalPins"].plugin;
			PersonalPins.getMessageData(message.div);
			PersonalPins.addMessageToNotes();
		}
	}
	
	checkIfKeyPressed (key) {
		return BDfunctionsDevilBro.pressedKeys.includes(key) || key == 0;
	}
	
	onKeyDown (div, key, name) {
		if (!this.isEventFired(name)) {
			this.fireEvent(name);
			if (key == 27) {
				var instance = BDfunctionsDevilBro.getOwnerInstance({"node":div, "name":"ChannelTextAreaForm", "up":true});
				if (instance) instance.setState({textValue:""});
			}
			this.cancelEvent(name);
		}
	}
	
	getMessageData (div) {
		if (div) {
			var messagegroup = $(".message-group").has(div);
			var pos = messagegroup.find(".message").index(div);
			if (messagegroup[0] && pos > -1) {
				var info = BDfunctionsDevilBro.getKeyInformation({"node":messagegroup[0],"key":"messages","time":1000});
				if (info) return Object.assign({},info[pos],{"div":div, "group":messagegroup[0], "pos":pos});
			}
		}
		return null;
	}
	
	fireEvent (name) {
		this.firedEvents.push(name);
	}
	
	isEventFired (name) {
		return this.firedEvents.includes(name);
	}
	
	cancelEvent (name) {
		BDfunctionsDevilBro.removeFromArray(this.firedEvents, name);
	}
}
