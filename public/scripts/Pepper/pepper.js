/**
 * Pepper Module
 *
 * Copyright (c) 2020 Pepper
 *
 * @category  Payment
 * @author    Pepper
 * @copyright 2020, Pepper
 * @link      https://peppermoney.es/
 *
 * Description:
 *
 * Javascript de inicio de funcionalidad widget
 *
 * --
 */

//Apoyo para trabajo sessionStorage
function setSessionStoragePepper(key, value) {
	if(typeof(Storage) !== "undefined") {
		sessionStorage.setItem(key, value);
	}
}
function getSessionStoragePepper (key) {
	if(typeof(Storage) !== "undefined") {
		return sessionStorage.getItem(key);
	}
	else {
		return null;
	}
}

if (typeof PEPPER !== 'object') {
	var PEPPER = {}
}

PEPPER.config = {
	config: null,
	environment: null,
	language: null,
	currency: null,
	sessionName: 'pepper_config',
	domain: null,
	apiKey: null,
	publicKey: null,
	amount: null,
	where: null,
	position: null,
	widgetType: null,

	init: async function (environment, language, currency, apiKey, publicKey) {
		this.environment = environment;
		this.domain = (environment == "PRD") ? 'https://api.peppermoney.es' : 'https://play-api.peppermoneytest.es';
		this.language = language;
		this.publicKey = publicKey;
		this.apiKey = apiKey;
		this.currency = currency;
		try {
			await this.getConfig();
		} catch (err) {
			console.error(err);
		}
	},
	initDraw: async function(environment, language, currency, apiKey, publicKey, amount, widgetType, where, position)
	{
		this.amount = amount;
		this.widgetType = widgetType;
		this.where = where;
		this.position = position;
		await this.init(environment, language, currency, apiKey, publicKey);
	},
	getConfig: async function() {
		try{
			if (getSessionStoragePepper(this.sessionName) !== null) {
				this.config = JSON.parse(getSessionStoragePepper(this.sessionName)).data;
				if (this.config.enabled === true) {
					await this.injectAssets();
				}
			}
			else {
				await this.getConfigAjax()
				.catch(function(error){
					console.error(error);
				});
			}
		}
		catch (err) {
			console.error(err);
		}
	},
	getConfigAjax: async function () {
        var that = this;
		return new Promise(function(resolve, reject) {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState == 4) {
                var response = JSON.parse(xmlHttp.responseText);
                if (typeof response == 'object') {
                    if (!response.result.errors) {
                        that.config = response.data;
                        setSessionStoragePepper(that.sessionName, JSON.stringify(response));
                        if (that.config.enabled === true) {
								resolve(that.injectAssets());
                        }
                        if (that.config.error) {
								reject(that.config.error);
                        }
                    } else {
							reject (response.result);
                    }
                }
            }
        }
			xmlHttp.onerror = () => reject('Petition error');
			xmlHttp.ontimeout  = () => reject('Timeour error');
			xmlHttp.open('GET', that.domain + '/api-ecommerce/v2/config?language=' + that.language + '&currency=' + that.currency, true);
        xmlHttp.setRequestHeader("x-merchant-key", that.publicKey);
        xmlHttp.setRequestHeader("x-api-key", that.apiKey);
        xmlHttp.setRequestHeader("Content-type", "application/json");
        xmlHttp.send();
			
		});
	},
	injectAssets: async function () {
		try {
			this.getCss();
			await this.getJs();
		} catch (err) {
			throw err;
		}
	},
	getCss: function () {
		var url = this.config.css_version;
		var elmt = document.createElement("link");
		elmt.setAttribute('rel', 'stylesheet');
		elmt.setAttribute('type', 'text/css');
		elmt.setAttribute('href', url);

		document.getElementsByTagName("head")[0].appendChild(elmt);
	},
	getJs: async function () {
		var that = this;
		return new Promise(function(resolve, reject) {
		var elmt = document.createElement("script");
		elmt.setAttribute('type', 'text/javascript');
			elmt.setAttribute('src', that.config.js_version);

		var elmt2 = document.createElement("script");
		elmt2.setAttribute('type', 'text/javascript');
			elmt2.setAttribute('src', that.config.js_platform_version);

		elmt2.addEventListener('load', function() {
			try {
				if (typeof PEPPER === 'object' && typeof PEPPER.widgets === 'object') {
					PEPPER.widgets.init(
						that.config, that.domain, that.publicKey, that.apiKey, that.currency
					);
					if (that.amount){
						PEPPER.widgets.drawWidget(
							that.amount, that.widgetType, that.where, that.position
						);
					}
				} else {
					console.error('PEPPER.widgets is not an object');
				}
			} catch (err) {
				console.error(err);
			}
		});

		var head_element = document.getElementsByTagName("head")[0];
		elmt.addEventListener('load', function() {
			head_element.appendChild(elmt2);
		});
		head_element.appendChild(elmt);
			resolve();
		});
	}
};