const selectcolor = document.querySelector('#color');
const heading = document.querySelector('h2');
const hex = document.querySelector('#hex');
const rgb = document.querySelector('#rgb');
const form = document.querySelectorAll('.form');
const hexDatalist = document.querySelector('datalist');

fetch('./colornames.json')
    .then(response => response.json())
    .then(colors => {
        const hexColors = Object.values(colors).sort();

        // populate the select options

        for (let colorname in colors) {
            const option = document.createElement('option');
            option.value = colorname;
            option.textContent = colorname;
            selectcolor.appendChild(option);
        }

        for (let colorcode of hexColors) {
            const option = document.createElement('option');
            option.value = colorcode;
            option.textContent = getObjKey(colors, colorcode);
            hexDatalist.appendChild(option);
        }

        // initial form values
        const first_color = selectcolor.value
        const first_code = colors[first_color];
        heading.innerHTML = first_color.toUpperCase();
        heading.style.color = first_code;
        hex.value = first_code;
        rgb.value = hex2rgb(first_code);

        selectcolor.onchange = () => {
            const colorname = selectcolor.value;
            const colorcode = colors[colorname];
            heading.style.color = colorcode;
            heading.innerHTML = colorname.toUpperCase();

            form.forEach(element => {
                element.style.boxShadow = `2px 2px 5px ${colorcode}`
            });
            hex.value = colorcode;
            rgb.value = hex2rgb(colorcode);
        }

        hex.onchange = () => {
            const colorcode = hex.value.toUpperCase();
            const colorname = getObjKey(colors, colorcode);
            heading.style.color = colorcode;

            if (colorname !== undefined) {
                heading.innerHTML = colorname.toUpperCase();
                selectcolor.value = colorname;
            } else {
                heading.innerHTML = colorcode;
                selectcolor.value = '';
            }
            form.forEach(element => {
                element.style.boxShadow = `2px 2px 5px ${colorcode}`
            });
            rgb.value = hex2rgb(colorcode);

        }
    });


/**Convert color in HEX format to RGB format */
function hex2rgb(str) {
    const r = parseInt(str.slice(1, 3), 16);
    const g = parseInt(str.slice(3, 5), 16);
    const b = parseInt(str.slice(5, 7), 16);
    return `RGB(${r}, ${g}, ${b})`
}

/**Get an object's key by its value */
function getObjKey(obj, value) {
    return Object.keys(obj).find(key => obj[key] === value);
}