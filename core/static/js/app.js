
requirejs.config({
    baseUrl: window.jsRoot + "vendor",
    paths:{
        app: window.jsRoot + "app",
        templates: "../../template/"
    }
});

requirejs(['app/main']);