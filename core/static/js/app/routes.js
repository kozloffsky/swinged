define([], function(){
    return {
        "register": {
            "pattern": "/register",
            "component": "registration"
        },
        "login": {
            "pattern": "/login",
            "component": "login"
        },
        "profile": {
            "pattern": "/profile/{id}",
            "component": "profile"
        }
    }
});