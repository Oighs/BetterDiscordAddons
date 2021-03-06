//META{"name":"CharCounter"}*//

class CharCounter {
	constructor () {
		
		this.selecting = false;
		
		this.css = `
			#charcounter {
				display: block;
				position: absolute;
				right: 0; 
				opacity: .5;
				z-index: 1000;
				bottom: -1.3em;
			}
			#charcounter.edit {
				top: -1.3em;
			}`;
			
		this.selectors = {
			normal: 	"form .channelTextArea-os01xC",
			edit: 		".edit-message .channelTextArea-1HTP3C",
		};
			
		this.counterMarkup = `<div id="charcounter"></div>`;
	}

	getName () {return "CharCounter";}

	getDescription () {return "Adds a charcounter in the chat.";}

	getVersion () {return "1.1.0";}

	getAuthor () {return "DevilBro";}

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
			
			BDfunctionsDevilBro.appendLocalStyle(this.getName(), this.css);
			
			this.TextArea = BDfunctionsDevilBro.WebModules.findByPrototypes(["saveCurrentText"]);
			this.patchCancel = BDfunctionsDevilBro.WebModules.monkeyPatch(this.TextArea.prototype, "componentDidMount", {after: (e) => {
				if (e && e.thisObject && e.thisObject.props && e.thisObject.props.type) this.appendCounter(e.thisObject.props.type);
			}});
			
			for (let type in this.selectors) this.appendCounter(type);
		}
		else {
			console.error(this.getName() + ": Fatal Error: Could not load BD functions!");
		}
	}


	stop () {
		if (typeof BDfunctionsDevilBro === "object") {
			
			$("#charcounter").remove();
			var textinput = document.querySelector(".channelTextArea-os01xC textarea");
			$(textinput).off("keydown." + this.getName()).off("click." + this.getName()).off("mousedown." + this.getName());
			$(document).off("mouseup." + this.getName()).off("mousemove." + this.getName());
			
			BDfunctionsDevilBro.removeLocalStyle(this.getName());
			
			if (typeof this.patchCancel === "function") this.patchCancel();
			
			BDfunctionsDevilBro.unloadMessage(this);
		}
	}
	
	// begin of own functions
	
	appendCounter (type) {
		var textarea = document.querySelector(this.selectors[type]);
		if (textarea && !textarea.querySelector("#charcounter." + type)) {
			var counter = $(this.counterMarkup);
			counter.addClass(type);
			var textinput = textarea.querySelector("textarea");
			$(textinput)
				.off("keydown." + this.getName() + " click." + this.getName())
				.on("keydown." + this.getName() + " click." + this.getName(), e => {
					setTimeout(() => {
						updateCounter();
					},10);
				})
				.off("mousedown." + this.getName())
				.on("mousedown." + this.getName(), e => {
					this.selecting = true;
				});
			$(document)
				.off("mouseup." + this.getName())
				.on("mouseup." + this.getName(), e => {
					if (this.selecting) {
						this.selecting = false;
					}
				})
				.off("mousemove." + this.getName())
				.on("mousemove." + this.getName(), e => {
					if (this.selecting) {
						setTimeout(() => {
							updateCounter();
						},10);
					}
				});
			$(textarea).append(counter);
			
			updateCounter();
			
			function updateCounter () {
				var selection = textinput.selectionEnd - textinput.selectionStart == 0 ? "" : " (" + (textinput.selectionEnd - textinput.selectionStart) + ")";
				counter.text(textinput.value.length + "/2000" + selection);
			}
		}
	}
}
