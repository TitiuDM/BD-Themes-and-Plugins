//META{"name":"TextColors"}*//

class TextColors {

	constructor(){
		this.defaultSettings = {
			redAmount: 255,
      blueAmount: 255,
      greenAmount: 255,
      discordId:""
		};
		this.settings = this.defaultSettings;
	}

    getName() { return "Text Colors"; }
    getDescription() { return "Changes the someone's text color (Client only)."; }
    getVersion() { return "1.0.0"; }
    getAuthor() { return "Titiu"; }

	getSettingsPanel(){
		if(!$(".plugin-settings").length)
			setTimeout(e => { this.getSettingsPanel(e); }, 100);
		else
			this.createSettingsPanel();
	}

	createSettingsPanel(){
		var panel = $(".plugin-settings");
		if(panel.length){
			panel.append(`
				<h style="color: rgb(255, 255, 255); font-size: 30px; font-weight: bold;">Text Colors</h>
				<br><br>

				<p style="color: rgb(255, 255, 255); font-size: 20px;">Discord Id:</p>
				<input id="tc-did" value="` + this.settings.discordId + `" type="number" class="inputDefault-_djjkz input-cIJ7To size16-14cGz5">

				<p style="color: rgb(255, 255, 255); font-size: 20px;">Red Amount:</p>
				<input id="tc-red" value="` + this.settings.redAmount + `" type="number" class="inputDefault-_djjkz input-cIJ7To size16-14cGz5">

				<p style="color: rgb(255, 255, 255); font-size: 20px;">Green Amount: (px):</p>
				<input id="tc-green" value="` + this.settings.greenAmount + `" type="number" class="inputDefault-_djjkz input-cIJ7To size16-14cGz5">

				<p style="color: rgb(255, 255, 255); font-size: 20px;">Blue Amount: (px):</p>
				<input id="tc-blue" value="` + this.settings.blueAmount + `" type="number" class="inputDefault-_djjkz input-cIJ7To size16-14cGz5">

				<div style="text-align: center;">
				<br>
				<button id="tc-reset" style="display: inline-block; margin-right: 25px;" type="button" class="button-38aScr lookFilled-1Gx00P colorBrand-3pXr91 sizeMedium-1AC_Sl grow-q77ONN">
					<div class="contents-4L4hQM">Reset Settings</div>
				</button>
				<button id="tc-save" style="display: inline-block; margin-left: 25px;" type="button" class="button-38aScr lookFilled-1Gx00P colorBrand-3pXr91 sizeMedium-1AC_Sl grow-q77ONN">
					<div class="contents-4L4hQM">Save</div>
				</button>
				</div>
			`);
			var discordid = document.getElementById("tc-did"),
				redAmount = document.getElementById("tc-red"),
				greenAmount = document.getElementById("tc-green"),
			  blueAmount = document.getElementById("tc-blue"),
			$("#tc-reset").on("click", () => {
				this.setings = this.defaultSettings;
				redAmount.value = "255";
				greenAmount.value = "255";
				blueAmount.value = "255";
				discordId.value = "";
			});
			$("#tc-save").on("click", () => {
				this.settings.redAmount = redAmount.value;
				this.settings.greenAmount = greenAmount.value;
				this.settings.blueAmount = blueAmount.value;
				this.settings.discordId = discordId.value;
			});
		}else
			this.getSettingsPanel();
	}
  saveSettings(){
    PluginUtilities.saveSettings("TextColors", this.settings);
    this.update();
  }

    load() {}

    start(){
    var libraryScript = document.getElementById('zeresLibraryScript');
    if (!libraryScript) {
      libraryScript = document.createElement("script");
      libraryScript.setAttribute("type", "text/javascript");
      libraryScript.setAttribute("src", "https://rauenzi.github.io/BetterDiscordAddons/Plugins/PluginLibrary.js");
      libraryScript.setAttribute("id", "zeresLibraryScript");
      document.head.appendChild(libraryScript);
    }
    if (typeof window.ZeresLibrary !== "undefined") this.initialize();
    else libraryScript.addEventListener("load", () => { this.initialize(); });
  }

  initialize(){
    PluginUtilities.checkForUpdate(this.getName(), this.getVersion(), "https://github.com/TitiuDM/BD-Plugins-and-Themes/raw/master/TextColors.plugin.js");
    this.settings = PluginUtilities.loadSettings("TextColors", this.defaultSettings);
    this.update();
  }

  update(){
    BdApi.clearCSS("TextColors");
    BdApi.injectCSS("TextColors",
    `	.message-group .avatar-large[style*=` + this.settings.discordId + `] ~ .comment .markup{
        text-color: rgb(` + this.settings.redAmount + `, ` + this.settings.greenAmount + `, ` +this.settings.blueAmount + `) !important;
    }
    `);
  }

    stop(){
    BdApi.clearCSS("TextColors");
  }

}
