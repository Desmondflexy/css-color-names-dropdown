const selectcolor = document.querySelector('#color');
const heading = document.querySelector('h2');
const hex = document.querySelector('#hex');
const rgb = document.querySelector('#rgb');
const sliders = document.querySelectorAll(".rgb-slider");

fetch('./colornames.json')
    .then(response => response.json())
    .then(colors => {

        // populate the select options
        Object.keys(colors).sort().forEach(colorname => {
            const option = document.createElement('option');
            option.textContent = colorname;
            selectcolor.appendChild(option);
        })
        const no_name = document.createElement('option');
        no_name.textContent = 'No name defined';
        selectcolor.appendChild(no_name);
        no_name.setAttribute('hidden', 'hidden');

        // initial form values
        hex.value = colors[selectcolor.value].hexcode;
        heading.innerHTML = selectcolor.value.toUpperCase();
        heading.innerHTML += `<p>${colors[selectcolor.value].family}</p>`;
        heading.style.color = hex.value;
        rgb.innerHTML = hex2rgb(hex.value);

        sliders.forEach(slider => {
            slider.value = document.getElementById(`rgb-${slider.id}`).textContent;
        })

        document.querySelectorAll('.form, .rgb-slider').forEach(element => {
            element.style.boxShadow = `2px 2px 5px ${hex.value}`;
        });

        selectcolor.onchange = () => {
            hex.value = colors[selectcolor.value].hexcode;
            heading.innerHTML = selectcolor.value.toUpperCase();
            heading.innerHTML += `<p>${colors[selectcolor.value].family}</p>`;
            heading.style.color = hex.value;
            rgb.innerHTML = hex2rgb(hex.value);

            sliders.forEach(slider => {
                slider.value = document.getElementById(`rgb-${slider.id}`).textContent;
            })

            document.querySelectorAll('.form, .rgb-slider').forEach(element => {
                element.style.boxShadow = `2px 2px 5px ${hex.value}`;
            });
        }

        sliders.forEach(slider => {
            slider.oninput = () => {
                const rr = decimal2hex(document.getElementById('red').value);
                const gg = decimal2hex(document.getElementById('green').value);
                const bb = decimal2hex(document.getElementById('blue').value);
                hex.value = '#' + rr + gg + bb;
                heading.style.color = hex.value;

                const colorname = getObjKey(colors, hex.value);
                let fam;
                if (colorname !== undefined) {
                    selectcolor.value = colorname;
                    heading.innerHTML = selectcolor.value.toUpperCase();
                    fam = `<p>${colors[selectcolor.value].family}</p>`;
                } else {
                    selectcolor.value = no_name.textContent;
                    heading.innerHTML = hex.value;
                    fam = `<p>No defined family</p>`;
                }
                heading.innerHTML += fam;
                rgb.innerHTML = hex2rgb(hex.value);

                document.querySelectorAll('.form, .rgb-slider').forEach(element => {
                    element.style.boxShadow = `2px 2px 5px ${hex.value}`
                });
            }
        })

        hex.oninput = () => {
            hex.value = hex.value.toUpperCase();
            heading.style.color = hex.value;

            const colorname = getObjKey(colors, hex.value);
            if (colorname !== undefined) {
                selectcolor.value = colorname;
                heading.innerHTML = selectcolor.value.toUpperCase();
                heading.innerHTML += `<p>${colors[selectcolor.value].family}</p>`;
            } else {
                selectcolor.value = no_name.textContent;
                heading.innerHTML = hex.value;
                heading.innerHTML += `<p>No defined family</p>`;
            }
            rgb.innerHTML = hex2rgb(hex.value);

            sliders.forEach(slider => {
                slider.value = document.getElementById(`rgb-${slider.id}`).textContent;
            })
            document.querySelectorAll('.form, .rgb-slider').forEach(element => {
                element.style.boxShadow = `2px 2px 5px ${hex.value}`
            });
            if (hex.value.length < 1) {
                heading.innerHTML = '...';
                heading.innerHTML += `<p>No color input!</p>`;
            }
        }
    });


/**Convert color in HEX format to RGB format */
function hex2rgb(str) {
    const r = parseInt(str.slice(1, 3), 16);
    const g = parseInt(str.slice(3, 5), 16);
    const b = parseInt(str.slice(5, 7), 16);
    return `RGB(<span id="rgb-red">${r}</span>, <span id="rgb-green">${g}</span>, <span id="rgb-blue">${b}</span>)`
}

/**Get an object's key by its hexcode value */
function getObjKey(obj, value) {
    return Object.keys(obj).find(key => obj[key]['hexcode'] === value);
}

/**Convert decimal to a 2-digit hexadecimal number */
function decimal2hex(n) {
    let hex = Number(n).toString(16).toUpperCase();
    if (hex.length < 2) {
        hex = '0' + hex;
    }
    return hex;
}
