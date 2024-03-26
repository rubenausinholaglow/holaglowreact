let me, apikey, url_ecommerce, url_api, langJson, langValue;

async function simulator() {

    frakmenta_init();
    let langJson = await getTextsByLang(getLang());

    let fkdiv = document.getElementById("fk-widget-installments");

    let price_product = fkdiv.getAttribute("data-product_price");
    price_product = (price_product.indexOf('.') > -1) ? price_product.split('.')[0] : price_product;

    fkdiv.innerHTML = getDivInstallmentsHtml();

    const xhr = new XMLHttpRequest();
    xhr.addEventListener("readystatechange", function (data, status) {
        let select;
        let xmlResponse;
        let xmlInstallments;
        let options;
        let comisionMes;
        let installments;
        let total_interest;
        let total_pay;

        if (this.readyState === 4 && this.status == 200) {
            xmlResponse = JSON.parse(this.responseText);
            xmlInstallments = xmlResponse['data']['installments'];
            document.querySelector('.selector-table').innerHTML = `<tr><td>` + capitalizeFirstLetter(langJson['terms']) + `</td><td>` + capitalizeFirstLetter(langJson['import']) + `</td></tr>`;
            select = '<select class="fk-select-plazo" name="cmbPlazo" id="cmbPlazo" onmousedown="showSelect(event)">';
            options = false;
            for (const key in xmlInstallments) {
                for (const key2 in xmlInstallments[key]) {
                    options = true;
                    comisionMes = xmlInstallments[key][key2]['repayment_commission_amount'];
                    installments = xmlInstallments[key][key2]['installments'];
                    total_interest = xmlInstallments[key][key2]['total_interest'];
                    total_pay = xmlInstallments[key][key2]['total_pay'];
                    select += '<option data-total_pay="' + parseFloat(total_pay).toFixed(2)
                        + '" data-total_interest="' + parseFloat(total_interest).toFixed(2)
                        + '" data-comision="' + parseFloat(comisionMes).toFixed(2)
                        + '" data-tin="' + parseFloat(xmlInstallments[key][key2]['TIN']).toFixed(2)
                        + '" data-tae="' + parseFloat(xmlInstallments[key][key2]['TAE']).toFixed(2)
                        + '" value="' + parseFloat(xmlInstallments[key][key2]['repayment_amount'] + comisionMes).toFixed(2) + '">'
                        + xmlInstallments[key][key2]['installments']
                        + '</option>';
                    document.querySelector('.selector-table').innerHTML += `<tr installment="` + installments + `" onclick="SelectPlazo(` + installments + `)">
                            <td>` + xmlInstallments[key][key2]['installments'] + `</td>
                            <td>` + xmlInstallments[key][key2]['total_pay'].toFixed(2) + `â‚¬</td>
                          </tr>`;
                }
            }

            select += '</select>';

            if (options) {
                handlerSetDisplayPropertyById('div-installments', 'block');
                handlerSetDisplayPropertyById('Pagar', 'block');
                handlerSetDisplayHTMLById('fk-div-plazo', select);
                SelectPlazo(cmbPlazo.options[0]);
                initModalPay();
            } else {
                handlerSetDisplayPropertyById('div-installments', 'none');
                handlerSetDisplayPropertyById('Pagar', 'none');
                console.log("OperaciÃ³n no financiable con frakmenta");
            }
        }
    });

    const url = url_api + "/api/fk/v2/installment/simulator?apikey=" + apikey + "&product_price=" + price_product;
    xhr.open("GET", url);
    xhr.send();
}

function frakmenta_init() {
    me = document.querySelector('script[data-apikey][data-name="widgetFK"]');

    if (me != null) {
        apikey = me.getAttribute('data-apikey');

        if (!me.hasAttribute("data-ecommerce-url")) {
            url_ecommerce = 'https://ecomerce.frakmenta.com';
        } else {
            url_ecommerce = me.getAttribute("data-ecommerce-url");
        }

        if (!me.hasAttribute("data-api-url")) {
            url_api = 'https://www.frakmenta.com';
        } else {
            if (me.getAttribute("data-api-url") === 'https://frakmenta.dev') {
                url_api = 'https://test.frakmenta.com';
            } else {
                url_api = me.getAttribute("data-api-url");
            }
        }
    } else {
        apikey = fkApiKey;
        url_api = fkApiUrl;
        url_ecommerce = fkEcommerceUrl;
    }
}

function getLang() {
    langValue = document.documentElement.hasAttribute('lang') && document.documentElement.getAttribute('lang') !== 'undefined' ? document.documentElement.getAttribute('lang') : 'es';

    if (langValue !== "es" && langValue !== "ca") {
        langValue = "es";
    }
    return langValue;
}

function getTextsByLang(langValue) {
    return new Promise((resolve, reject) => {
        let element = document.querySelector('script[data-apikey][data-name="widgetFK"]');
        let urlLang = "https://frakmenta.com";
        if (element !== null) {
            urlLang = element.getAttribute("data-api-url");
        }

        fetch(urlLang + "/op/ecommerce/messages/" + langValue, {
            method: 'GET',
        })
            .then(response => response.json())
            .then(data => {
                // CÃ³digo que utiliza los datos recuperados
                langJson = data;

                let btnPagar = document.querySelector("#Pagar");
                if (btnPagar !== null) {
                    btnPagar.innerText = langJson["simulator.button"];
                }


                // Crear y agregar un elemento input
                let inputElement = document.createElement("input");
                inputElement.setAttribute("id", "fk-lang");
                inputElement.setAttribute("type", "hidden");
                inputElement.setAttribute("name", "fk-lang");
                inputElement.value = langValue;

                let formInstallmentsElement = document.getElementById("fk-form-installments");
                if (formInstallmentsElement !== null) {
                    formInstallmentsElement.appendChild(inputElement);
                }
                localStorage.setItem('langJson', JSON.stringify(langJson));

                resolve(langJson); // Resolvemos la promesa con langJson
            })
            .catch((error) => {
                console.log('Error:', error);
                reject(error); // Rechazamos la promesa en caso de error
            });
    });
}

function getDivInstallmentsHtml() {
    let urls_prod = ["https://www.frakmenta.com", "https://frakmenta.com", "https://static.frakmenta.com"];
    let class_test_simulator = (urls_prod.indexOf(url_api) < 0 ? 'fk-installment-test-div' : '');

    let line = '<div id="div-installments" class="' + class_test_simulator + '" > ';
    line += '<div class="simu-container">';
    line += '<img class="fk-img-logo" src="https://beta2.frakmenta.com/img/frakmenta-logo-original.png" alt="fk-logo"> ';
    line += '<div class="fk-div-resultado-pago">';
    line += '<div style="display: flex; justify-content: center;">';
    line += '<div class="fk-p-pagos-fk">' + langJson["simulator.pay_resume"] + ' ' +
        '<span style="display: flex; font-size: larger; align-items: center" >' +
        '<div class="line-break"><label class="label-fk" id="cuota" style="display:contents!important"></label>' +
        '<div style="color: black">&euro;</div>' +
        '</span> ' + langJson["in"] + ' <div id="fk-div-plazo" class="fk-div-plazo"></div> ' + langJson["terms"] + ' <a href="javascript:showMoreInfo();">' +
        '</div><label class="label-fk more-info"> + info</label></a></div>';
    line += '<div class="fk-p-tin-tae" style="display: none">' +
        'TIN: <label class="fk-label-tin" id="tin"></label>  % TAE: <label class="fk-label-tae" id="tae"> </label> % ' +
        '</div>';
    line += '</div>'
    line += '<div class="term-selector">' +
        '<div class="term-selector-pointer"></div>' +
        '<table class="selector-table" style="opacity: 0;"></table>' +
        '</div>';

    if (urls_prod.indexOf(url_api) < 0) {
        line += '<div class="fk-simulator-test">' + langJson["simulator.test"] + '</div>';
    }

    line += '</div>';
    line += '</div>';
    line += '</div>';

    return line;
}

function handlerSetElementValueById(id, value) {
    if (handlerGetElementById(id) !== null)
        handlerGetElementById(id).value = value;
}

function handlerDropElementById(id) {
    let element = handlerGetElementById(id);
    element.remove();
}

function handlerGetElementById(id) {
    return document.getElementById(id);
}

function handlerGetElementsByTagName(tag) {
    return document.getElementsByTagName(tag);
}

function handlerGetValueElementById(id) {
    return handlerGetElementById(id).value;
}

function handlerAppendElementByTag(tag, element) {
    const source = document.querySelector(tag);
    source.appendChild(element);
}

function createElement(element, id, type, rel, href) {
    let newElement = document.createElement(element);
    (id != null ? newElement.id = id : '');
    (type != null ? newElement.type = type : '');
    (rel != null ? newElement.rel = rel : '');
    (href != null ? newElement.href = href : '');

    return newElement;
}

function handlerSetDisplayPropertyById(id, option) {
    if (handlerGetElementById(id) !== null) {
        handlerGetElementById(id).style.display = option;
    }
}

function handlerSetDisplayHTMLById(id, value) {
    if (handlerGetElementById(id) !== null)
        handlerGetElementById(id).innerHTML = value;
}

function handlerAddScript(src) {
    let scr = document.createElement("script");
    scr.setAttribute("src", src);
    handlerAppendElementByTag("head", scr);
}

function SelectPlazo(option) {
    if (typeof option === 'number' && (option % 1) === 0) {
        option = Array.from(document.querySelectorAll('.fk-select-plazo option'))
            .find(el => el.textContent === option.toString());
    }

    let ele = document.getElementsByClassName('term-selector')[0];
    let st = window.getComputedStyle(ele, null).getPropertyValue("display");

    if (st === 'block') {
        ele.style.display = 'none';
    }

    handlerSetDisplayHTMLById('tin', option.dataset.tin.replace('.', ','));
    handlerSetDisplayHTMLById('tae', option.dataset.tae.replace('.', ','));
    handlerSetDisplayHTMLById('cuota', option.value.replace('.', ','));
    handlerSetElementValueById('cmbPlazo', option.value);
}

function showMoreInfo() {
    let options = document.querySelector('#cmbPlazo').selectedOptions[0].dataset;
    let termImport = document.querySelector('.label-fk').innerText;
    let terms = document.querySelector('#cmbPlazo').selectedOptions[0].innerText;
    let totalImport = document.querySelector('#fk-widget-installments').getAttribute("data-product_price");
    totalImport = parseFloat(totalImport).toFixed(0).toString();
    totalImport = [totalImport.substring(0, totalImport.length - 2), totalImport.substring(totalImport.length - 2, totalImport.length)];
    totalImport = totalImport.join(',');
    let comision = document.querySelector('#cmbPlazo').selectedOptions[0].getAttribute("data-comision");
    let total_interest = document.querySelector('#cmbPlazo').selectedOptions[0].getAttribute("data-total_interest");
    let totalPay = document.querySelector('#cmbPlazo').selectedOptions[0].getAttribute("data-total_pay");
    let pendiente = parseFloat(totalPay) - parseFloat(termImport.replace(",", "."));
    pendiente = pendiente.toFixed(2);
    let selectedIndex = document.querySelector('#cmbPlazo').selectedIndex;

    let footer = 'TIN: ' + options.tin.replace('.', ",") + '% ' + langJson['and']
        + ' <span style="border-bottom: 1px solid grey; font-weight: bold">TAE: ' + options.tae.replace('.', ",") + '%</span>. '
        + langJson['more_info.footer.part1'] + ' ' + totalImport.replace('.', ",") + 'â‚¬ a ' + terms + ' '
        + langJson['more_info.footer.part2'] + ' ' + comision.toString().replace('.', ",") + 'â‚¬. '
        + langJson['more_info.footer.part3'] + ' ' + termImport.replace('.', ",") + 'â‚¬ '
        + langJson['more_info.footer.part4'] + ' ' + termImport.replace('.', ",") + 'â‚¬ '
        + langJson['more_info.footer.part5'] + ' ' + total_interest.replace('.', ",") + 'â‚¬; '
        + langJson['more_info.footer.part6'] + ' ' + totalPay.replace('.', ",") + 'â‚¬. '
        + langJson['more_info.footer.part7'];
    let page = '<div class="modal" id="modal-more-info" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" style="z-index: 9999999999999999999; background-color: #000000a3;">\
    <div class="modal-dialog" role="document">\
        <div class="modal-content modal-content-fk">\
            <div class="modal-body modal-body-fk" style="color: #666666;">\
        <div id="more-info-widget" class="responsive-padre" style=" opacity: 0;">\
            <div class="column is-bg-light is-relative" style="padding: 0px">\
                <div class="modal-sin-borde">\
                    <div class="cross-icon-blue is-color-blue" id="close-modal-more-info" style="cursor: pointer;display: flex;justify-content: end;" onclick="javascript:closeMoreInfo()">\
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>\
                    </div>\
                    <div class="simulator-info-logo"><img id="logo-frakmenta" class="logo-frakmenta" style="width: 30%" src="https://beta2.frakmenta.com/img/frakmenta-logo-original.png" alt="Frakmenta by Findirect"/></div>\
                    <div class="simulator-info">' + langJson['flow.first.title'] + ' <div class="responsive-container"><span class="label-fk info-label">' + totalImport.replace('.', ",") + 'â‚¬</span> ' + langJson['in'] + ' <span class="label-fk info-label">' + terms + '</span> ' + langJson['terms'] + '</div></div>\
                    <div class="commission-info"><span>+</span>' + comision.replace(".", ",") + 'â‚¬ ' + langJson['more_info.commission.title'] + '</div>\
                    <div class="simulator-info-body">\
                        <div class="graph-container" style="display: none"></div>\
                        <div class="statics-container">\
                            <div class="statics-container-frame">\
                                <table class="payment-properties">\
                                    <thead>\
                                    </thead>\
                                    <tbody>\
                                        <tr>\
                                            <td>' + langJson['flow.first.resume.first_term'] + '</td>\
                                            <td>' + termImport.replace('.', ",") + ' â‚¬</td>\
                                        </tr>\
                                        <tr>\
                                            <td>' + langJson['flow.first.resume.next_terms'] + '</td>\
                                            <td>' + termImport.replace('.', ",") + ' â‚¬</td>\
                                        </tr>\
                                        <tr>\
                                            <td>' + langJson['flow.first.resume.commission_total_import'] + '</td>\
                                            <td>' + (parseFloat(terms) * parseFloat(comision)).toFixed(2).toString().replace(".", ",") + ' â‚¬</td>\
                                        </tr>\
                                        <tr>\
                                            <td>' + langJson['flow.first.resume.interests'] + '</td>\
                                            <td>' + parseFloat(total_interest).toFixed(2).toString().replace(".", ",") + ' â‚¬</td>\
                                        </tr>\
                                        <tr>\
                                            <td colspan="2" ><div style="display: flex;justify-content: flex-start;"><div style="font-weight: 400;">TIN&nbsp;<span class="import-span">' + options.tin.replace('.', ",") + '&nbsp;%&nbsp;</span></div> <span class="import-span dashed"><span class="dashed" style="margin-right: 5px;border: none;">TAE</span>' + options.tae.replace('.', ",") + '&nbsp;%</span></div></td>\
                                        </tr>\
                                    </tbody>\
                                </table>\
                                <div class="pending-import-container">\
                                    <div class="import-field"><span class="import-span">' + langJson['flow.first.resume.due_total_amount'] + '</span> <span class="import-span">' + totalPay.replace(".", ",") + ' â‚¬</span></div>\
                                    <div class="pending-import-flag">\
                                        <p></p>\
                                    </div>\
                                    <div class="arrow-right"></div>\
                                </div>\
                            </div>\
                        </div>\
                    </div>\
                    <div class="simulator-info-footer">\
                        ' + footer + '\
                    </div>\
                </div>\
            </div>\
        </div>\
    </div>\
    </div>\
    </div>\
    </div>';

    handlerAppendElementByTag('head', createElement('link', 'fk-css1', 'text/css', 'stylesheet', 'https://cdnjs.cloudflare.com/ajax/libs/bulma/0.9.0/css/bulma-rtl.min.css'));
    handlerAppendElementByTag('head', createElement('link', 'fk-css2', 'text/css', 'stylesheet', 'https://cdnjs.cloudflare.com/ajax/libs/bulma/0.9.0/css/bulma.min.css'));
    handlerAppendElementByTag('head', createElement('link', 'fk-css3', 'text/css', 'stylesheet', url_ecommerce + '/css/ecommerce/style.css'));

    document.body.innerHTML += page;
    handlerSetDisplayPropertyById('modal-more-info', 'block');
    //createChart(totalImport, termImport, pendiente, totalPay);
    document.querySelector('#cmbPlazo').selectedIndex = selectedIndex;

    let infoWidget = document.querySelector('#more-info-widget');
    infoWidget.style.transition = 'opacity 0.5s'; // DuraciÃ³n de la transiciÃ³n

    // Establecer la opacidad al 100%
    setTimeout(function () {
        infoWidget.style.opacity = '1';
    }, 10);
    initModalPay();
}

function closeMoreInfo() {
    handlerSetDisplayHTMLById('modal-more-info', 'none');
    handlerDropElementById('modal-more-info');
    handlerDropElementById('fk-css1');
    handlerDropElementById('fk-css2');
    handlerDropElementById('fk-css3');
}

function showSelect(e) {
    e.preventDefault();
    let ele = document.getElementsByClassName('term-selector')[0];
    let st = window.getComputedStyle(ele, null).getPropertyValue("display");
    let table = ele.querySelector('.selector-table');

    if (st === 'block') {
        ele.style.display = 'none';
        table.style.opacity = '0';
    } else {
        ele.style.display = 'block';
        setTimeout(function () {
            table.style.opacity = '1';
        }, 50);
    }

    table.style.transition = 'opacity 0.5s';
}

function createChart(importeTotal, importeCuota, pendiente) {
    importeCuota = parseFloat(importeCuota);
    let chart = anychart.pie();

    // set the data
    chart.data([
        {
            x: "Pago pendiente",
            value: pendiente,
            normal: {fill: "#075da6"},
            legendItem: {iconType: "circle", iconSize: 10}
        },
        {
            x: "Pago inicial",
            value: importeCuota,
            normal: {fill: "#dedede"},
            legendItem: {iconType: "circle", iconSize: 10}
        }
    ]);

    // set chart styles
    chart.innerRadius('70%');

    // set the container element
    chart.container(document.querySelector('.graph-container'));
    chart.background().fill("#f4f4f4");

    let legend = chart.legend();
    legend.itemsLayout("vertical");
    legend.itemsSpacing(2);
    legend.width(150);
    legend.height(50);
    legend.align('center');
    legend.vAlign('middle');
    legend.hAlign('center');

    // create a standalone label
    chart.labels(false);
    var label = anychart.standalones.label();
    var labelText = '<span style = "color: black; font-size:20px; font-weight:bold;">' + pendiente.replace(".", ",") + '</span><span style="color:black">â‚¬</span>' +
        '<br/><br/></br><span style="color:rgba(68,72,87,0.82); font-size: 14px;">Importe <br/>pendiente</span>';

    // configure the label settings
    label
        .useHtml(true)
        .text(
            labelText
        )
        .position('center')
        .anchor('center')
        .hAlign('center')
        .vAlign('middle');

    // set the label as the center content
    chart.center().content(label);

    // initiate chart display
    chart.draw();
}

function initModalPay() {
    try {
        document.getElementById('Pagar').addEventListener('click', function (e) {
            e.preventDefault();

            document.getElementById("loaderDiv").style.display = "inherit";

            let modal = document.getElementById("modalFK");
            modal.style.display = "block";

            if (document.getElementById("token").value !== '' && !document.getElementById('Pagar').getAttribute('data-url')) {
                document.getElementById('fk-form-installments').submit();
                document.getElementById("loaderDiv").style.display = "none";
                document.getElementById("frakmentaEcommerce").style.display = "inherit";

                return false;
            }

            // document.querySelector('.hopscotch-close').click();
            let url

            url = document.getElementById('Pagar').getAttribute('data-url');

            if (document.getElementById('infoTotal')) {
                let total = document.getElementById('infoTotal').value;
                url = document.getElementById('Pagar').getAttribute('data-url') + '?total=' + total;
            }

            fetch(url)
                .then(response => response.json())
                .then(data => {
                    document.getElementById("token").value = data;
                    document.getElementById('fk-form-installments').submit();
                    document.getElementById("loaderDiv").style.display = "none";
                    document.getElementById("frakmentaEcommerce").style.display = "inherit";
                })
                .catch(err => {
                    console.log('Error en la solicitud GET', err);
                });

            return false;
        });
    } catch (err) {
        console.log('ModalPay Event Exception', err);
    }
}

function capitalizeFirstLetter(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}