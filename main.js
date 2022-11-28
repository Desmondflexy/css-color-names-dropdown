const selectcolor = document.querySelector('#color');
const heading = document.querySelector('h2');
const hex = document.querySelector('#hex');
const rgb = document.querySelector('#rgb');
const sliders = document.querySelectorAll(".rgb-slider");

// sliders
const red = document.querySelector('#red');
const green = document.querySelector('#green');
const blue = document.querySelector('#blue');

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
        const first_color = selectcolor.value
        const first_code = colors[first_color];
        heading.innerHTML = first_color.toUpperCase();
        heading.style.color = first_code;
        hex.value = first_code;
        rgb.innerHTML = hex2rgb(first_code);

        sliders.forEach(slider => {
            slider.value = document.getElementById(`rgb-${slider.id}`).textContent;
        })

        selectcolor.onchange = () => {
            const colorname = selectcolor.value;
            const colorcode = colors[colorname];
            heading.style.color = colorcode;
            heading.innerHTML = colorname.toUpperCase();
            hex.value = colorcode;
            rgb.innerHTML = hex2rgb(colorcode);

            sliders.forEach(slider => {
                slider.value = document.getElementById(`rgb-${slider.id}`).textContent;
            })
            document.querySelectorAll('.form, .rgb-slider').forEach(element => {
                element.style.boxShadow = `2px 2px 5px ${colorcode}`
            });
        }

        sliders.forEach(slider => {
            slider.oninput = () => {
                const rr = decimal2hex(red.value);
                const gg = decimal2hex(green.value);
                const bb = decimal2hex(blue.value);
                const colorcode = '#' + rr + gg + bb;
                const colorname = getObjKey(colors, colorcode);
                heading.style.color = colorcode;

                if (colorname !== undefined) {
                    heading.innerHTML = colorname.toUpperCase();
                    selectcolor.value = colorname;
                } else {
                    heading.innerHTML = colorcode;
                    selectcolor.value = no_name.textContent;
                }
                hex.value = colorcode;
                rgb.innerHTML = hex2rgb(colorcode);

                document.querySelectorAll('.form, .rgb-slider').forEach(element => {
                    element.style.boxShadow = `2px 2px 5px ${colorcode}`
                });
            }
        })

        hex.oninput = () => {
            hex.value = hex.value.toUpperCase();
            const colorcode = hex.value;
            const colorname = getObjKey(colors, colorcode);
            heading.style.color = colorcode;

            if (colorname !== undefined) {
                heading.innerHTML = colorname.toUpperCase();
                selectcolor.value = colorname;
            } else {
                heading.innerHTML = colorcode;
                selectcolor.value = no_name.textContent;
            }
            rgb.innerHTML = hex2rgb(colorcode);

            sliders.forEach(slider => {
                slider.value = document.getElementById(`rgb-${slider.id}`).textContent;
            })
            document.querySelectorAll('.form, .rgb-slider').forEach(element => {
                element.style.boxShadow = `2px 2px 5px ${colorcode}`
            });
            if (hex.value.length < 1) {
                hex.value = '#';
                heading.innerHTML = hex.value;
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

/**Get an object's key by its value */
function getObjKey(obj, value) {
    return Object.keys(obj).find(key => obj[key] === value);
}

/**Convert decimal to a 2-digit hexadecimal number */
function decimal2hex(n) {
    let hex = Number(n).toString(16).toUpperCase();
    if (hex.length < 2) {
        hex = '0' + hex;
    }
    return hex;
}
