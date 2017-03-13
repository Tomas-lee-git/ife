
'use strict';

(function () {  
    // init 
    window.addEventListener('load', () => init());
        
    // const vars 
    const CITY_LIST = [ '北京', '上海', '深圳' ];
    const SCHOOL_LIST = {
        '北京': ['北京大学', '南京大学', '东京大学', '西京大学'], 
        '上海': ['上海大学', '下海大学', '中海大学', '南海大学'],
        '深圳': ['深圳大学', '浅圳大学', '车震大学', '地震大学'], 
    };

    /**
     * initialize.
     */
    function init () {
        /* choose role part */
        const radios = document.querySelectorAll('input[type="radio"]');
        const radioContainer = document.querySelector('.radio');
        const selectContainer = document.querySelector('.select');
        const textContainer = document.querySelector('.text');
        const switchDisplay = isStudent => {
            if (isStudent) {
                selectContainer.style.display = 'block';
                textContainer.style.display = 'none';
            } else {
                selectContainer.style.display = 'none';
                textContainer.style.display = 'block';
            }
        };
        // init 
        radios[0].setAttribute('checked', true);
        switchDisplay(true);
        // add event handle
        radioContainer.addEventListener('change',  e => switchDisplay(radios[0].checked));

        /* choose city and school part  */
        const citySelect = document.querySelector('select[name="city"]');
        const schoolSelect = document.querySelector('select[name="school"]');
        // init
        replaceSelectItems(citySelect, CITY_LIST, 0);
        replaceSelectItems(schoolSelect, SCHOOL_LIST[CITY_LIST[0]]);
        // add event handle
        citySelect.addEventListener('change', e => {  
            const targetCity = e.target.value;          
            replaceSelectItems(schoolSelect, SCHOOL_LIST[targetCity]);
        });
    }

    function replaceSelectItems (selectElem, items, checkedIndex = 0) {
        // clean
        selectElem.innerHTML = '';

        // append 
        const fragment = document.createDocumentFragment();
        //document.createDocumentFragment(),创建一个虚拟节点,相比document.createElement("xxx"),可以提高效率
        items.forEach( (v, i) => {
            let e = document.createElement("OPTION");
            let t = document.createTextNode(items[i]);
            e.setAttribute('value', items[i]);
            e.appendChild(t);
            
            if (i === checkedIndex) {
                e.setAttribute('selected', true);
            }

            fragment.appendChild(e);
        });
        selectElem.appendChild(fragment);
    }
})();
