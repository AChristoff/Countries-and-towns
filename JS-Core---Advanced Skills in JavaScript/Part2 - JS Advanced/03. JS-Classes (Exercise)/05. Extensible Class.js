(function (){
    let id = 0;

    class Extensible{
        constructor(){
            this.id = id++;
        }

        extend(template){
            let propObj = {};

            Object.keys(template)
                .filter((key) => typeof(template[key]) !== "function")
                .forEach((key) => {
                    propObj[key] = template[key];
                });

            Object.keys(template).filter((key) => typeof(template[key]) === "function")
                .forEach((func) => {
                    propObj.__proto__[func] = template[func];
                });

            Object.assign(this, propObj);
        }
    }

    return Extensible;
})();