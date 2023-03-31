let listData = []; // declaração da lista de plantas

fetch("./plants.json") // path to file
    .then((response) => response.json()) // return file content
    .then((data) => {
        // attribute info in variable
        listData = data;
    })
    .catch((error) => console.error(error));

// Set value in select, receive id, and set value
function selectSetValue(id, valueToSelect) {
    const element = document.getElementById(id);
    element.value = valueToSelect;
}

// Called by select on change value
function selectFilter(selectObject) {
    switch (selectObject.id) {
        case "sun":
            selectSetValue("water", "");
            selectSetValue("pet", "");
            break;
        case "water":
            selectSetValue("pet", "");
            selectSetValue("sun", "");
            break;
        case "pet":
            selectSetValue("water", "");
            selectSetValue("sun", "");
            break;
    }
    applyFilter(selectObject.id, selectObject.value);
}

// Apply filter in listData
function applyFilter(id, value) {
    // filtered list
    const listFiltered = listData.filter((item) => {
        switch (id) {
            case "sun":
                if (value == item.sun) {
                    return item;
                }
                break;
            case "water":
                if (value == item.water) {
                    return item;
                }
                break;
            case "pet":
                if (value === "true" && !item.toxicity) {
                    return item;
                } else if (value === "false" && item.toxicity) {
                    return item;
                }
                break;
        }
    });

    // rendered list
    const containerResult = document.getElementById("result");
    const containerNoResult = document.getElementById("no-result");
    if (listFiltered.length == 0) {
        // if no plants in list
        containerNoResult.classList.remove("no-show");
        containerResult.className = "no-show";
    } else {
        // case exist plant in list, renderer
        containerNoResult.className = "no-show";
        containerResult.classList.remove("no-show");

        // create div bottom
        const divContainer = document.createElement("div");
        // create div for title
        const divTitle = document.createElement("div");
        // create div for list items
        const divList = document.createElement("div");
        // create text top
        const textTop = document.createElement("p");
        // create image top
        const imgTop = document.createElement("img");

        // add resources and class
        divTitle.className = "div-title";
        textTop.textContent = "Our picks for you";
        imgTop.src = "../images/illustrations/pick.png";
        divList.className = "item-container";
        // add elements in div
        divTitle.appendChild(imgTop);
        divTitle.appendChild(textTop);

        listFiltered.map((item) => {
            // create element tags html
            const divItem = document.createElement("div");
            const img = document.createElement("img");
            const divPrice = document.createElement("div");
            const name = document.createElement("p");
            const price = document.createElement("p");

            // set class in element tags
            img.className = "item-img";
            divItem.className = "item";
            divPrice.className = "item-title";

            // set values in element tags
            img.src = item.url;
            name.textContent = item.name;
            price.textContent = `$ ${item.price}`; // use `` and ${variable} to transform variable in string

            // append element tags in other element tags
            divItem.appendChild(img);
            divPrice.appendChild(name);
            divPrice.appendChild(price);
            divItem.appendChild(divPrice);

            // add create item in div line list, flex
            divList.appendChild(divItem);
        });

        divContainer.appendChild(divTitle);
        divContainer.appendChild(divList);

        // clear content in container
        containerResult.innerHTML = "";
        // set div list with items in container
        containerResult.appendChild(divContainer);
    }
}