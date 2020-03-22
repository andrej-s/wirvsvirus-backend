const Session = require('./session');

class SessionManager {
    constructor() {
        this.sessions = {}
    }

    getSession(id) {
        return this.sessions[id] ? this.sessions[id] : this.createSession(id);
    }

    createSession(id) {
        let newSession = new Session();
        this.sessions[id] = newSession;
        return this.sessions[id];
    }

}

module.exports = SessionManager;