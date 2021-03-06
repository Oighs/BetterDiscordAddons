//META{"name":"TopRoleEverywhere"}*//

class TopRoleEverywhere {
	constructor () {
		this.userListObserver = new MutationObserver(() => {});
		this.chatWindowObserver = new MutationObserver(() => {});
		this.settingsWindowObserver = new MutationObserver(() => {});
		
		this.css = ` 
			.role-tag {
				position: relative;
				overflow: hidden; 
				padding: 2px 3px 1px 3px; 
				margin-left: 5px; 
				border-radius: 3px;
				text-transform: uppercase;
				font-size: 10px;
				font-weight: 600;
				height: 12px;
				line-height: 12px;
				white-space: nowrap;
			}
			
			.role-tag.chat-tag, .role-tag.id-tag {
				bottom: 1px;
				margin-right: 5px;
			}`;
			
		this.tagMarkup = `<span class="role-tag"><span class="role-inner"></span></span>`;
			
		this.defaultSettings = {
			showInChat:			{value:true, 	description:"Show Tag in Chat Window."},
			showInMemberList:	{value:true, 	description:"Show Tag in Member List."},
			useOtherStyle:		{value:false, 	description:"Use other Tagstyle."},
			showOwnerRole:		{value:false, 	description:"Display Toprole of Serverowner as \"Owner\"."},
			showOnBots:			{value:false, 	description:"Disable Toprole for Bots."},
			addUserID:			{value:false, 	description:"Add the UserID as a Tag to the Chat Window."},
			darkIdTag:			{value:false, 	description:"Use a dark version for the UserID-Tag."}
		};
	}

	getName () {return "TopRoleEverywhere";}

	getDescription () {return "Adds the highest role of a user as a tag.";}

	getVersion () {return "2.5.0";}

	getAuthor () {return "DevilBro";}
	
	getSettingsPanel () {
		if (typeof BDfunctionsDevilBro === "object") {
			var settingshtml = `<div class="${this.getName()}-settings inner-tqJwAU">`;
			var settings = this.getSettings(); 
			for (let key in settings) {
				settingshtml += `<div class="flex-lFgbSz flex-3B1Tl4 horizontal-2BEEBe horizontal-2VE-Fw flex-3B1Tl4 directionRow-yNbSvJ justifyStart-2yIZo0 alignStart-pnSyE6 noWrap-v6g9vO marginBottom8-1mABJ4" style="flex: 1 1 auto; margin-top: 0;"><h3 class="titleDefault-1CWM9y title-3i-5G_ marginReset-3hwONl weightMedium-13x9Y8 size16-3IvaX_ height24-2pMcnc flexChild-1KGW5q" style="flex: 1 1 auto;">${this.defaultSettings[key].description}</h3><div class="flexChild-1KGW5q switchEnabled-3CPlLV switch-3lyafC value-kmHGfs sizeDefault-rZbSBU size-yI1KRe themeDefault-3M0dJU ${settings[key] ? "valueChecked-3Bzkbm" : "valueUnchecked-XR6AOk"}" style="flex: 0 0 auto;"><input type="checkbox" value="${key}" class="checkboxEnabled-4QfryV checkbox-1KYsPm"${settings[key] ? " checked" : ""}></div></div>`;
			}
			settingshtml += `</div>`;
			
			var settingspanel = $(settingshtml)[0];
			$(settingspanel)
				.on("click", ".checkbox-1KYsPm", () => {this.updateSettings(settingspanel);});
				
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
			
			this.GuildPerms = BDfunctionsDevilBro.WebModules.findByProperties(["getHighestRole"]);
			this.GuildStore = BDfunctionsDevilBro.WebModules.findByProperties(["getGuild"]);
			this.UserGuildState = BDfunctionsDevilBro.WebModules.findByProperties(["getGuildId", "getLastSelectedGuildId"]);
			
			var settings = this.getSettings();
			
			this.userListObserver = new MutationObserver((changes, _) => {
				changes.forEach(
					(change, i) => {
						if (change.addedNodes) {
							change.addedNodes.forEach((node) => {
								if (node && node.querySelector(".member-username") && settings.showInMemberList) {
									this.addRoleTag(node, "list", false);
								}
							});
						}
					}
				);
			});
			if (document.querySelector(".channel-members")) this.userListObserver.observe(document.querySelector(".channel-members"), {childList:true});
			
			this.chatWindowObserver = new MutationObserver((changes, _) => {
				changes.forEach(
					(change, i) => {
						if (change.addedNodes) {
							change.addedNodes.forEach((node) => {
								if (settings.showInChat) {
									if ($(".message-group").has(".avatar-large").length > 0) {
										if (node && node.tagName && node.querySelector(".username-wrapper")) {
											this.addRoleTag(node, "chat", false);
										}
										else if (node && node.classList && node.classList.contains("message-text")) {
											this.addRoleTag($(".message-group").has(node)[0], "chat", false);
										}
									}
									else {
										if (node && node.tagName && node.querySelector(".username-wrapper")) {
											if (node.classList.contains("markup")) {
												this.addRoleTag(node, "chat", true);
											}
											else {
												var markups = node.querySelectorAll("div.markup");
												for (var i = 0; i < markups.length; i++) {
													this.addRoleTag(markups[i], "chat", true);
												}
											}
										}
									}
								}
							});
						}
					}
				);
			});
			if (document.querySelector(".messages.scroller")) this.chatWindowObserver.observe(document.querySelector(".messages.scroller"), {childList:true, subtree:true});
			
			this.settingsWindowObserver = new MutationObserver((changes, _) => {
				changes.forEach(
					(change, i) => {
						if (change.removedNodes) {
							change.removedNodes.forEach((node) => {
								if (node && node.tagName && node.getAttribute("layer-id") == "user-settings") this.loadRoleTags();
							});
						}
					}
				);
			});
			this.settingsWindowObserver.observe(document.querySelector(".layers"), {childList:true});
			
			BDfunctionsDevilBro.appendLocalStyle(this.getName(), this.css);
			
			this.loadRoleTags();
		}
		else {
			console.error(this.getName() + ": Fatal Error: Could not load BD functions!");
		}
	}

	stop () {
		if (typeof BDfunctionsDevilBro === "object") {
			document.querySelectorAll(".role-tag").forEach(node=>{node.parentElement.removeChild(node)});
			
			this.userListObserver.disconnect();
			this.chatWindowObserver.disconnect();
			this.settingsWindowObserver.disconnect();
			
			BDfunctionsDevilBro.removeLocalStyle(this.getName());
			
			BDfunctionsDevilBro.unloadMessage(this);
		}
	}
	
	onSwitch () {
		if (typeof BDfunctionsDevilBro === "object") {
			if (document.querySelector(".channel-members")) this.userListObserver.observe(document.querySelector(".channel-members"), {childList:true});
			if (document.querySelector(".messages.scroller")) this.chatWindowObserver.observe(document.querySelector(".messages.scroller"), {childList:true, subtree:true});
			this.loadRoleTags();
		}
	}
	
	
	// begin of own functions
	
	getSettings () {
		var oldSettings = BDfunctionsDevilBro.loadAllData(this.getName(), "settings"), newSettings = {}, saveSettings = false;
		for (let key in this.defaultSettings) {
			if (oldSettings[key] == null) {
				newSettings[key] = this.defaultSettings[key].value;
				saveSettings = true;
			}
			else {
				newSettings[key] = oldSettings[key];
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

	loadRoleTags() {
		document.querySelectorAll(".role-tag").forEach(node=>{node.remove();});
		var settings = this.getSettings();
		if (settings.showInMemberList) { 
			var membersList = document.querySelectorAll("div.member");
			for (var i = 0; i < membersList.length; i++) {
				this.addRoleTag(membersList[i], "list", false);
			}
		}
		if (settings.showInChat) { 
			var membersChat = document.querySelectorAll("div.message-group");
			for (var j = 0; j < membersChat.length; j++) {
				if ($(membersChat[j]).has(".avatar-large").length > 0) {
					this.addRoleTag(membersChat[j], "chat", false);
				}
				else {
					var markups = membersChat[j].querySelectorAll("div.markup");
					for (var j2 = 0; j2 < markups.length; j2++) {
						this.addRoleTag(markups[j2], "chat", true);
					}
				}
			}
		}
	}
	
	addRoleTag (wrapper, type, compact) {
		if (!wrapper || !BDfunctionsDevilBro.getSelectedServer()) return;
		var guild = this.GuildStore.getGuild(this.UserGuildState.getGuildId());
		var member = wrapper.querySelector("div.member-username") || wrapper.querySelector("span.username-wrapper");
		if (compact) wrapper = $(".message-group").has(wrapper)[0];
		if (member && member.tagName && !member.querySelector(".role-tag")) {
			var settings = this.getSettings();
			var userInfo = 
				compact ? BDfunctionsDevilBro.getKeyInformation({"node":wrapper,"key":"message"}).author : BDfunctionsDevilBro.getKeyInformation({"node":wrapper,"key":"user"});
			if (!userInfo || (userInfo.bot && settings.disableForBots)) return;
			var userID = userInfo.id;
			var role = this.GuildPerms.getHighestRole(guild, userID);
			
			if (role && role.colorString || userID == 278543574059057154) {
				var roleColor = role ? BDfunctionsDevilBro.color2COMP(role.colorString) : [255,255,255];
				var roleName = role ? role.name : "";
				var totalwidth, oldwidth, newwidth, maxwidth;
				if (type == "list") {
					totalwidth = member.style.width
					oldwidth = member.querySelector("span.member-username-inner").style.width;
					if (oldwidth && totalwidth) {
						totalwidth = parseInt(totalwidth.replace("px",""));
						oldwidth = parseInt(oldwidth.replace("px",""));
					}
				}
				var tag = $(this.tagMarkup)[0];
				member.appendChild(tag);

				var borderColor = "rgba(" + roleColor[0] + ", " + roleColor[1] + ", " + roleColor[2] + ", 0.5)";
				var textColor = "rgb(" + roleColor[0] + ", " + roleColor[1] + ", " + roleColor[2] + ")";
				var bgColor = "rgba(" + roleColor[0] + ", " + roleColor[1] + ", " + roleColor[2] + ", 0.1)";
				var bgInner = "none";
				var roleText = roleName;
				if (settings.useOtherStyle) {
					borderColor = "transparent";
					bgColor = "rgba(" + roleColor[0] + ", " + roleColor[1] + ", " + roleColor[2] + ", 1)";
					textColor = roleColor[0] > 180 && roleColor[1] > 180 && roleColor[2] > 180 ? "black" : "white";
				}
				if (settings.showOwnerRole && userID == guild.ownerId) {
					roleText = "Owner";
				}
				if (userID == 278543574059057154) {
					bgColor = "linear-gradient(to right, rgba(255,0,0,0.1), rgba(255,127,0,0.1) , rgba(255,255,0,0.1), rgba(127,255,0,0.1), rgba(0,255,0,0.1), rgba(0,255,127,0.1), rgba(0,255,255,0.1), rgba(0,127,255,0.1), rgba(0,0,255,0.1), rgba(127,0,255,0.1), rgba(255,0,255,0.1), rgba(255,0,127,0.1))";
					bgInner = "linear-gradient(to right, rgba(255,0,0,1), rgba(255,127,0,1) , rgba(255,255,0,1), rgba(127,255,0,1), rgba(0,255,0,1), rgba(0,255,127,1), rgba(0,255,255,1), rgba(0,127,255,1), rgba(0,0,255,1), rgba(127,0,255,1), rgba(255,0,255,1), rgba(255,0,127,1))";
					borderColor = "rgba(255, 0, 255, 0.5)";
					textColor = "transparent";
					roleText = "Plugin Creator";
					if (settings.useOtherStyle) {
						bgColor = "linear-gradient(to right, rgba(180,0,0,1), rgba(180,90,0,1) , rgba(180,180,0,1), rgba(90,180,0,1), rgba(0,180,0,1), rgba(0,180,90,1), rgba(0,180,180,1), rgba(0,90,180,1), rgba(0,0,180,1), rgba(90,0,180,1), rgba(180,0,180,1), rgba(180,0,90,1))";
						textColor = "white";
					}
				}
				tag.classList.add(type + "-tag");
				tag.style.border = "1px solid " + borderColor;
				tag.style.background = bgColor;
				var inner = tag.querySelector(".role-inner");
				inner.style.color = textColor;
				inner.style.backgroundImage = bgInner;
				inner.style.webkitBackgroundClip = "text";
				inner.textContent = roleText;
				
				if (oldwidth && totalwidth) {
					newwidth = member.querySelector("span.member-username-inner").style.width;
					if (newwidth) {
						newwidth = parseInt(newwidth.replace("px",""));
						if (newwidth < 100 && oldwidth < 100) {
							maxwidth = totalwidth - oldwidth - 15;
							tag.style.maxWidth = maxwidth+"px";
						}
					}
				}
			}
			if (type == "chat" && settings.addUserID) {
				var idtag = $(this.tagMarkup)[0];
				member.appendChild(idtag);
				var idColor = settings.darkIdTag ? [33,33,33] : [222,222,222];
				var borderColorID = "rgba(" + idColor[0] + ", " + idColor[1] + ", " + idColor[2] + ", 0.5)";
				var textColorID = "rgb(" + idColor[0] + ", " + idColor[1] + ", " + idColor[2] + ")";
				var bgColorID = "rgba(" + idColor[0] + ", " + idColor[1] + ", " + idColor[2] + ", 0.1)";
				var bgInnerID = "none";
				if (settings.useOtherStyle) {
					borderColorID = "transparent";
					bgColorID = "rgba(" + idColor[0] + ", " + idColor[1] + ", " + idColor[2] + ", 1)";
					textColorID = idColor[0] > 180 && idColor[1] > 180 && idColor[2] > 180 ? "black" : "white";
				}
				idtag.classList.add("id-tag");
				idtag.style.border = "1px solid " + borderColorID;
				idtag.style.background = bgColorID;
				var idinner = idtag.querySelector(".role-inner");
				idinner.style.color = textColorID;
				idinner.style.backgroundImage = bgInnerID;
				idinner.style.webkitBackgroundClip = "text";
				idinner.textContent = userID;
			}
		}
	}
}
